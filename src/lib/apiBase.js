// عنوان سيرفر التراخيص اللي الموقع بيكلمه.
// - لو VITE_API_URL متحدد وقت البناء → نستخدمه (مثال: https://license.example.com/api).
// - على الموقع الحقيقي (credo-pharma.com) → نفس الدومين: الطلبات بتروح /api/...
//   وVercel بيوصّلها لسيرفر التراخيص (شوف rewrites في vercel.json).
// - على الجهاز (localhost) → سيرفر التراخيص المحلي.
export function getApiBase() {
  const fromEnv = import.meta.env?.VITE_API_URL;
  if (fromEnv) {
    const cleaned = String(fromEnv).replace(/\/api\/.*$/, '').replace(/\/api\/?$/, '').replace(/\/+$/, '');
    if (cleaned) return cleaned;
  }
  if (typeof window === 'undefined') return null;
  if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    return 'http://localhost:3001';
  }
  return window.location.origin;
}
