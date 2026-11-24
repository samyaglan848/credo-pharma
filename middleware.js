// =============================================================
// middleware.js — حماية «النسخة التجريبية» (/demo) من السيرفر (Vercel Routing Middleware)
//
// - أي حاجة تحت /demo (الصفحة، الكود، الصور، الداتا) مابتتبعتش غير بعد كلمة السر
//   الطلب من غير كوكي صالح: الصفحات → صفحة كلمة السر، وأي ملف تاني → 401
// - كلمة السر مش موجودة في الكود: السيرفر عنده بس بصمة (SHA-256 لـ PBKDF2 بـ 210 ألف لفة) في demo-auth.config.js
//   المتصفح بيحسب K = PBKDF2(كلمة السر) وقت الدخول، والسيرفر بيقارن بصمته
// - بعد الدخول: كوكي HttpOnly + Secure + SameSite=Strict لمدة 7 أيام، عليه توقيع HMAC بـ K وتاريخ انتهاء
// - محاولات غلط كتير من نفس العنوان → وقف مؤقت (429)
// - الكود نفسه متشفّر (AES-256-GCM) بمفتاح = HMAC(K) — بيتبعت بس لكوكي صالح (/demo/__k)
// - ملفات .map / .env / src وأي ملف مخفي → 404 حتى بعد الدخول
// =============================================================
import { DEMO_AUTH } from './demo-auth.config.js';

export const config = { matcher: ['/demo', '/demo/:path*'] };

const COOKIE = 'credo_demo';
const MAX_AGE = 7 * 24 * 60 * 60; // 7 أيام
const enc = new TextEncoder();

const b64ToU8 = (s) => { const bin = atob(s); const a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; };
const u8ToB64 = (u8) => btoa(String.fromCharCode(...u8));
const toUrl = (s) => s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromUrl = (s) => { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return s; };

function safeEqual(a, b) {
  a = String(a); b = String(b);
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

// K صحيح؟ (بصمته = البصمة المتخزنة)
async function kIsValid(k) {
  if (!(k instanceof Uint8Array) || k.length !== 32) return false;
  const pre = enc.encode('credo-demo|verify|v2|');
  const buf = new Uint8Array(pre.length + k.length); buf.set(pre); buf.set(k, pre.length);
  const h = u8ToB64(new Uint8Array(await crypto.subtle.digest('SHA-256', buf)));
  return safeEqual(h, DEMO_AUTH.verify);
}
async function hmacWith(k, label) {
  const key = await crypto.subtle.importKey('raw', k, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(label)));
}

// الكوكي: v2.<exp>.<K>.<HMAC(K, exp)>
async function makeCookie(k) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const sig = toUrl(u8ToB64(await hmacWith(k, 'credo-demo|cookie|v2|' + exp)));
  return `v2.${exp}.${toUrl(u8ToB64(k))}.${sig}`;
}
async function cookieKey(value) {
  if (!value) return null;
  const p = String(value).split('.');
  if (p.length !== 4 || p[0] !== 'v2') return null;
  const exp = Number(p[1]);
  if (!Number.isFinite(exp) || exp < Date.now() / 1000) return null;
  let k;
  try { k = b64ToU8(fromUrl(p[2])); } catch (e) { return null; }
  if (!(await kIsValid(k))) return null;
  const sig = toUrl(u8ToB64(await hmacWith(k, 'credo-demo|cookie|v2|' + exp)));
  return safeEqual(sig, p[3]) ? k : null;
}
function readCookie(req, name) {
  const raw = req.headers.get('cookie') || '';
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

// ---------- الحد من المحاولات الغلط (لكل نسخة من السيرفر) ----------
const FAILS = new Map(); // ip → { n, until, first }
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 5;
function clientIp(req) {
  return (req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
}
function blockedFor(ip) {
  const r = FAILS.get(ip);
  if (!r) return 0;
  if (r.until && r.until > Date.now()) return Math.ceil((r.until - Date.now()) / 1000);
  if (Date.now() - r.first > WINDOW_MS) FAILS.delete(ip);
  return 0;
}
function noteFail(ip) {
  const now = Date.now();
  const r = FAILS.get(ip) || { n: 0, first: now, until: 0 };
  if (now - r.first > WINDOW_MS) { r.n = 0; r.first = now; }
  r.n++;
  if (r.n >= MAX_FAILS) r.until = now + WINDOW_MS;
  FAILS.set(ip, r);
  if (FAILS.size > 5000) FAILS.clear();
}

// ---------- الردود ----------
const BASE_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'private, no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
};
function respond(body, status, extra = {}) {
  return new Response(body, { status, headers: { ...BASE_HEADERS, ...extra } });
}
const pass = () => new Response(null, { headers: { 'x-middleware-next': '1' } });

function loginPage(message = '', status = 200) {
  const html = `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<meta name="color-scheme" content="light dark" />
<link rel="icon" type="image/png" href="/favicon.png" />
<title>Credo — تجربة البرنامج</title>
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
html,body{background:#eef5f8;color:#0f2a35}
body{margin:0;min-height:100vh;font-family:Cairo,Tahoma,'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;padding:16px}
.card{width:100%;max-width:420px;background:#fff;border-radius:24px;padding:28px 24px;box-shadow:0 20px 60px rgba(2,71,94,.18);text-align:center}
.logo{width:170px;max-width:65%;margin:0 auto 6px;display:block}
h1{font-size:20px;margin:8px 0 4px;color:#0f2a35}
p{margin:0 0 18px;color:#5b7380;font-size:13px;line-height:1.7}
input{width:100%;padding:12px 14px;border-radius:14px;border:1.5px solid #cfe0e7;font-weight:600;font-size:15px;font-family:inherit;background:#fff;color:#0f2a35;text-align:center;letter-spacing:1px;color-scheme:light}
input:focus{outline:none;border-color:#00607a}
button{margin-top:12px;width:100%;padding:12px;border:0;border-radius:14px;background:linear-gradient(90deg,#02475e,#00607a);color:#fff;font-weight:800;font-size:15px;font-family:inherit;cursor:pointer}
button:disabled{opacity:.6;cursor:wait}
.err{color:#be123c;font-size:13px;font-weight:700;margin-top:10px;min-height:18px}
</style></head><body>
<form class="card" id="f" method="POST" action="/demo/login" autocomplete="off">
<img class="logo" src="/logo-light.png" alt="Credo" onerror="this.style.display='none'" />
<h1>تجربة برنامج Credo</h1>
<p>نسخة كاملة من البرنامج تقدر تجرّبها من المتصفح — بيع وشراء وأصناف ونواقص وتقارير.<br />اكتب كلمة السر اللي وصلتك علشان تدخل.</p>
<input id="pw" type="password" placeholder="كلمة السر" autofocus required maxlength="64" />
<input id="k" name="k" type="hidden" />
<button id="go" type="submit">ادخل على التجربة</button>
<div class="err" id="err">${message}</div>
</form>
<script>
(function(){
  var A=${JSON.stringify({ iter: DEMO_AUTH.iter, salt: DEMO_AUTH.salt })};
  var f=document.getElementById('f'),b=document.getElementById('go'),e=document.getElementById('err');
  var u8=function(s){var x=atob(s),a=new Uint8Array(x.length);for(var i=0;i<x.length;i++)a[i]=x.charCodeAt(i);return a;};
  f.addEventListener('submit',async function(ev){
    if(document.getElementById('k').value)return;
    ev.preventDefault();b.disabled=true;b.textContent='بيفتح...';e.textContent='';
    try{
      var pw=document.getElementById('pw').value.trim();
      var base=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveBits']);
      var bits=new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:u8(A.salt),iterations:A.iter,hash:'SHA-256'},base,256));
      document.getElementById('k').value=btoa(String.fromCharCode.apply(null,bits));
      document.getElementById('pw').value='';
      f.submit();
    }catch(x){b.disabled=false;b.textContent='ادخل على التجربة';e.textContent='المتصفح ده مش بيدعم التشفير — جرّب كروم أو سفاري';}
  });
})();
</script></body></html>`;
  return respond(html, status, { 'Content-Type': 'text/html; charset=utf-8' });
}

// ---------- الطلب ----------
export default async function middleware(req) {
  const url = new URL(req.url);
  const path = url.pathname;

  // ملفات مش المفروض تتطلب أبداً (حتى بعد الدخول)
  if (/\.(map|env)$/i.test(path) || /\/(\.|src\/|node_modules\/)/i.test(path)) {
    return respond('Not found', 404, { 'Content-Type': 'text/plain; charset=utf-8' });
  }

  // صفحة كلمة السر
  if (path === '/demo/login') {
    if (req.method === 'POST') {
      const ip = clientIp(req);
      const wait = blockedFor(ip);
      if (wait) return loginPage(`محاولات كتير غلط — جرّب تاني بعد ${Math.ceil(wait / 60)} دقيقة`, 429);
      let k = null;
      try {
        const form = await req.formData();
        k = b64ToU8(String(form.get('k') || '').slice(0, 64));
      } catch (e) {}
      if (!(await kIsValid(k))) {
        noteFail(ip);
        await new Promise((r) => setTimeout(r, 700)); // تبطئة التخمين
        return loginPage('كلمة السر مش صحيحة', 401);
      }
      FAILS.delete(ip);
      return respond(null, 303, {
        Location: '/demo/',
        'Set-Cookie': `${COOKIE}=${encodeURIComponent(await makeCookie(k))}; Path=/demo; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Strict`,
      });
    }
    if (await cookieKey(readCookie(req, COOKIE))) return respond(null, 303, { Location: '/demo/' });
    return loginPage();
  }
  if (path === '/demo/logout') {
    return respond(null, 303, { Location: '/demo/login', 'Set-Cookie': `${COOKIE}=; Path=/demo; Max-Age=0; HttpOnly; Secure; SameSite=Strict` });
  }

  const k = await cookieKey(readCookie(req, COOKIE));
  if (!k) {
    const isPage = path === '/demo' || path.endsWith('/') || /\.html?$/i.test(path) || (req.headers.get('accept') || '').includes('text/html');
    if (isPage && req.method === 'GET') return respond(null, 302, { Location: '/demo/login' });
    return respond('Unauthorized', 401, { 'Content-Type': 'text/plain; charset=utf-8' });
  }

  // مفتاح فك تشفير الكود — لكوكي صالح بس
  if (path === '/demo/__k') {
    return respond(JSON.stringify({ k: u8ToB64(await hmacWith(k, 'credo-demo|bundle|v2')) }), 200, { 'Content-Type': 'application/json' });
  }
  return pass();
}
