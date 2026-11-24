// =============================================================
// middleware.js — حماية «النسخة التجريبية» (/demo) من السيرفر (Vercel Routing Middleware)
//
// - أي حاجة تحت /demo (الصفحة، الكود، الصور، الداتا) مابتتبعتش غير بعد كلمة السر
//   الطلب من غير كوكي صالح: الصفحات → صفحة كلمة السر، وأي ملف تاني → 401
// - كلمة السر الصح → كوكي موقّع (HMAC-SHA256) HttpOnly + Secure + SameSite=Strict لمدة 7 أيام
// - محاولات غلط كتير من نفس العنوان → وقف مؤقت (429)
// - الكود نفسه متشفّر (AES-256-GCM) — مفتاح فك التشفير بيتبعت بس لكوكي صالح (/demo/__k)
// - ملفات .map / .env / src وأي ملف مخفي → 404 حتى بعد الدخول
//
// السر الوحيد: متغير البيئة DEMO_SECRET في إعدادات Vercel (مش في الكود ولا في الريبو).
// كلمة السر ومفتاح الكوكي ومفتاح فك تشفير الكود كلهم مشتقين منه (HMAC) — لو اتغير، كل ده بيتغير.
// من غير DEMO_SECRET: التجربة كلها مقفولة (503) — مابتفتحش أبداً من غير حماية.
// =============================================================

export const config = { matcher: ['/demo', '/demo/:path*'] };

const COOKIE = 'credo_demo';
const MAX_AGE = 7 * 24 * 60 * 60; // 7 أيام
const enc = new TextEncoder();

// ---------- مفاتيح مشتقة من DEMO_SECRET ----------
const keyCache = new Map();
async function hmacKey(secret) {
  if (!keyCache.has(secret)) {
    keyCache.set(secret, crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']));
  }
  return keyCache.get(secret);
}
async function hmac(secret, label) {
  const k = await hmacKey(secret);
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, enc.encode(label)));
}
const b64url = (u8) => btoa(String.fromCharCode(...u8)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64 = (u8) => btoa(String.fromCharCode(...u8));

// كلمة السر: Credo-xxxx-xxxx-xxxx (من غير حروف بتتلخبط زي 0/O و 1/l)
const ALPHA = 'abcdefghjkmnpqrstuvwxyz23456789';
export async function derivePassword(secret) {
  const h = await hmac(secret, 'credo-demo|password|v1');
  let s = '';
  for (let i = 0; i < 12; i++) s += ALPHA[h[i] % ALPHA.length];
  return 'Credo-' + s.slice(0, 4) + '-' + s.slice(4, 8) + '-' + s.slice(8, 12);
}
export async function deriveBundleKey(secret) {
  return b64(await hmac(secret, 'credo-demo|bundle|v1'));
}
async function sign(secret, payload) {
  return b64url(await hmac(secret, 'credo-demo|cookie|v1|' + payload));
}

function safeEqual(a, b) {
  a = String(a); b = String(b);
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

async function makeCookie(secret) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = 'v1.' + exp;
  return payload + '.' + (await sign(secret, payload));
}
async function validCookie(secret, value) {
  if (!value) return false;
  const parts = String(value).split('.');
  if (parts.length !== 3 || parts[0] !== 'v1') return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Date.now() / 1000) return false;
  return safeEqual(parts[2], await sign(secret, parts[0] + '.' + parts[1]));
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
.err{color:#be123c;font-size:13px;font-weight:700;margin-top:10px;min-height:18px}
</style></head><body>
<form class="card" method="POST" action="/demo/login" autocomplete="off">
<img class="logo" src="/logo-light.png" alt="Credo" onerror="this.style.display='none'" />
<h1>تجربة برنامج Credo</h1>
<p>نسخة كاملة من البرنامج تقدر تجرّبها من المتصفح — بيع وشراء وأصناف ونواقص وتقارير.<br />اكتب كلمة السر اللي وصلتك علشان تدخل.</p>
<input name="password" type="password" placeholder="كلمة السر" autofocus required maxlength="64" />
<button type="submit">ادخل على التجربة</button>
<div class="err">${message}</div>
</form></body></html>`;
  return respond(html, status, { 'Content-Type': 'text/html; charset=utf-8' });
}

// ---------- الطلب ----------
export default async function middleware(req) {
  const url = new URL(req.url);
  const path = url.pathname;
  // لازم process.env.DEMO_SECRET بالاسم ده بالظبط (Vercel بيحط القيمة وقت البناء)
  let secret = '';
  try { secret = String(process.env.DEMO_SECRET || '').trim(); } catch (e) {}

  // ملفات مش المفروض تتطلب أبداً (حتى بعد الدخول)
  if (/\.(map|env)$/i.test(path) || /\/(\.|src\/|node_modules\/)/i.test(path)) {
    return respond('Not found', 404, { 'Content-Type': 'text/plain; charset=utf-8' });
  }
  if (!secret || secret.length < 32) {
    return respond('التجربة مقفولة مؤقتاً', 503, { 'Content-Type': 'text/plain; charset=utf-8' });
  }

  // صفحة كلمة السر
  if (path === '/demo/login') {
    if (req.method === 'POST') {
      const ip = clientIp(req);
      const wait = blockedFor(ip);
      if (wait) return loginPage(`محاولات كتير غلط — جرّب تاني بعد ${Math.ceil(wait / 60)} دقيقة`, 429);
      let pw = '';
      try {
        const form = await req.formData();
        pw = String(form.get('password') || '').trim().slice(0, 64);
      } catch (e) {}
      if (!safeEqual(pw, await derivePassword(secret))) {
        noteFail(ip);
        await new Promise((r) => setTimeout(r, 700)); // تبطئة التخمين
        return loginPage('كلمة السر مش صحيحة', 401);
      }
      FAILS.delete(ip);
      return respond(null, 303, {
        Location: '/demo/',
        'Set-Cookie': `${COOKIE}=${encodeURIComponent(await makeCookie(secret))}; Path=/demo; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Strict`,
      });
    }
    if (await validCookie(secret, readCookie(req, COOKIE))) return respond(null, 303, { Location: '/demo/' });
    return loginPage();
  }
  if (path === '/demo/logout') {
    return respond(null, 303, { Location: '/demo/login', 'Set-Cookie': `${COOKIE}=; Path=/demo; Max-Age=0; HttpOnly; Secure; SameSite=Strict` });
  }

  const ok = await validCookie(secret, readCookie(req, COOKIE));
  if (!ok) {
    const isPage = path === '/demo' || path.endsWith('/') || /\.html?$/i.test(path) || (req.headers.get('accept') || '').includes('text/html');
    if (isPage && req.method === 'GET') return respond(null, 302, { Location: '/demo/login' });
    return respond('Unauthorized', 401, { 'Content-Type': 'text/plain; charset=utf-8' });
  }

  // مفتاح فك تشفير الكود — لكوكي صالح بس
  if (path === '/demo/__k') {
    return respond(JSON.stringify({ k: await deriveBundleKey(secret) }), 200, { 'Content-Type': 'application/json' });
  }
  return pass();
}
