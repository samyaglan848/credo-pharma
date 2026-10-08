// =============================================================
// src/components/DownloadLeadModal.jsx — Smart Download Gate & Lead Tracker
// =============================================================
import React, { useState, useEffect } from 'react';
import { 
  X, Download, CheckCircle2, AlertCircle, Building2, User, 
  Phone, Mail, MapPin, Monitor, Smartphone, ArrowRight,
  Sparkles, ShieldCheck, Copy, ExternalLink, Loader2, Send
} from 'lucide-react';

const EGYPT_GOVERNORATES = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الشرقية', 
  'المنوفية', 'القليوبية', 'البحيرة', 'الغربية', 'بورسعيد', 
  'دمياط', 'الإسماعيلية', 'السويس', 'كفر الشيخ', 'الفيوم', 
  'بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 'قنا', 
  'الأقصر', 'أسوان', 'البحر الأحمر', 'الوادي الجديد', 'مطروح', 
  'شمال سيناء', 'جنوب سيناء'
];

export default function DownloadLeadModal({ isOpen, onClose }) {
  // Device Detection
  const [deviceInfo, setDeviceInfo] = useState({ isWindows: true, isMobile: false, deviceType: 'DESKTOP_WINDOWS' });
  
  useEffect(() => {
    const ua = navigator.userAgent || '';
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const win = ua.includes('Windows') && !mobile;
    setDeviceInfo({
      isWindows: win,
      isMobile: mobile,
      deviceType: win ? 'DESKTOP_WINDOWS' : (mobile ? 'MOBILE' : 'DESKTOP')
    });
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    doctorName: '',
    pharmacyName: '',
    phone: '',
    email: '',
    governorate: 'القاهرة'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadResult, setLeadResult] = useState(null);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Validation
  const validate = () => {
    const errs = {};
    if (!formData.doctorName.trim() || formData.doctorName.trim().length < 3) {
      errs.doctorName = 'يرجى كتابة الاسم ثلاثياً بشكل صحيح';
    }
    if (!formData.pharmacyName.trim() || formData.pharmacyName.trim().length < 3) {
      errs.pharmacyName = 'يرجى كتابة اسم الصيدلية بالكامل';
    }

    const cleanPhone = formData.phone.replace(/[\s\-\+]/g, '');
    const isEgyptianPhone = /^(010|011|012|015)[0-9]{8}$/.test(cleanPhone);
    if (!isEgyptianPhone) {
      errs.phone = 'يرجى إدخال رقم محمول مصري صحيح (11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015)';
    }

    if (formData.email.trim()) {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
      if (!isEmail) errs.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }

    if (!formData.governorate) {
      errs.governorate = 'يرجى اختيار المحافظة';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const PUBLIC_RELEASE_DOWNLOAD_URL = 'https://github.com/samyaglan848/credo-pharma/releases/download/v1.0.33/Credo-Setup-1.0.33.exe';

  // Trigger download - direct download into browser's downloads manager without opening any tabs or pages
  const triggerActualDownload = (data = leadResult) => {
    setDownloadStarted(true);

    const leadId = data?.lead?.id || '';
    let finalUrl = data?.release?.downloadUrl;

    if (!finalUrl || finalUrl.includes('localhost') || finalUrl.includes('127.0.0.1')) {
      finalUrl = PUBLIC_RELEASE_DOWNLOAD_URL;
    } else if (finalUrl.includes('download-file')) {
      const apiBase = import.meta.env.VITE_API_URL;
      finalUrl = apiBase 
        ? `${apiBase}/leads/download-file?leadId=${encodeURIComponent(leadId)}`
        : PUBLIC_RELEASE_DOWNLOAD_URL;
    }

    // Trigger browser download directly in the current page
    // Note: NEVER set target="_blank" because it forces the browser to open an external GitHub tab/page.
    const link = document.createElement('a');
    link.href = finalUrl;
    link.setAttribute('download', 'Credo-Setup-1.0.33.exe');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      try {
        document.body.removeChild(link);
      } catch (e) {}
    }, 1000);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    const fallbackData = {
      lead: { 
        id: 'lead-' + Date.now(), 
        doctorName: formData.doctorName.trim(), 
        pharmacyName: formData.pharmacyName.trim(), 
        phone: formData.phone.trim(),
        governorate: formData.governorate
      },
      release: { 
        version: '1.0.33', 
        downloadUrl: PUBLIC_RELEASE_DOWNLOAD_URL, 
        fileSizeBytes: '101 MB' 
      }
    };

    // Immediately trigger direct silent download in the same page for desktop users
    if (!deviceInfo.isMobile) {
      triggerActualDownload(fallbackData);
    }

    const apiUrl = import.meta.env.VITE_API_URL 
      ? `${import.meta.env.VITE_API_URL}/leads/submit` 
      : (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3001/api/leads/submit' : null);

    if (apiUrl) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            doctorName: formData.doctorName.trim(),
            pharmacyName: formData.pharmacyName.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim() || null,
            country: 'مصر',
            governorate: formData.governorate,
            deviceType: deviceInfo.deviceType
          })
        });

        const resData = await response.json();

        if (response.ok && resData.success) {
          const leadData = resData.data;
          setLeadResult(leadData);
          setSubmitted(true);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API sync warning:', err);
      }
    }

    // Direct download guarantee
    setLeadResult(fallbackData);
    setSubmitted(true);
    setLoading(false);
  };

  // Copy link
  const handleCopy = () => {
    const linkToCopy = leadResult?.release?.downloadUrl || PUBLIC_RELEASE_DOWNLOAD_URL;
    navigator.clipboard.writeText(linkToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Open WhatsApp to send link to doctor's own number
  const handleSendToDoctorWhatsApp = () => {
    let cleanPhone = formData.phone.replace(/[\s\-\+]/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = '2' + cleanPhone;
    if (!cleanPhone.startsWith('20')) cleanPhone = '20' + cleanPhone;

    const downloadLink = leadResult?.release?.downloadUrl || PUBLIC_RELEASE_DOWNLOAD_URL;
    const text = encodeURIComponent(
      `مرحباً دكتور ${formData.doctorName}،\n` +
      `رابط تحميل برنامج نظام Credo Pharma المباشر لصيدليتك (${formData.pharmacyName}):\n` +
      `💻 ${downloadLink}\n\n` +
      `افتح هذا الرابط من جهاز الكمبيوتر في الصيدلية لبدء التنزيل المباشر والتثبيت التلقائي فوراً (Setup .exe) بضغطة واحدة وبدون الحاجة لفك ضغط.\n` +
      `الموقع الرسمي: https://credo-pharma.com`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-fadeIn" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#023142] border-2 border-primary-600/80 dark:border-cyan-400 rounded-3xl shadow-2xl overflow-hidden z-10 transition-all font-cairo my-auto">
        
        {/* Top Decorative Gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-amber-400 to-tangerine-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 start-4 p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 transition cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-7">
          
          {/* HEADER */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-3 shadow-inner">
              <Download className="w-6 h-6 animate-bounce-subtle" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1.5 font-cairo">
              {submitted ? 'تم تجهيز نسختك بنجاح! 🚀' : 'طلب تحميل وتجربة برنامج Credo'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              {submitted 
                ? 'اتبع الخطوات أدناه لتشغيل النظام في صيدليتك خلال دقيقتين فقط'
                : 'أدخل بيانات صيدليتك للتحقق وإتاحة رابط التنزيل المباشر لأحدث إصدار فوراً'}
            </p>
          </div>

          {/* STEP 1: FORM (Before Submission) */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errors.form && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Doctor Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  اسم الطبيب / الصيدلي المسؤول <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute start-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="مثال: د. أحمد محمود علي"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className={`w-full ps-10 pe-4 py-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-[#01222e] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${
                      errors.doctorName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                </div>
                {errors.doctorName && <p className="text-[11px] text-red-500 mt-1">{errors.doctorName}</p>}
              </div>

              {/* Pharmacy Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  اسم الصيدلية <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute start-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="مثال: صيدلية الشفاء الحديثة"
                    value={formData.pharmacyName}
                    onChange={(e) => setFormData({ ...formData, pharmacyName: e.target.value })}
                    className={`w-full ps-10 pe-4 py-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-[#01222e] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${
                      errors.pharmacyName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                </div>
                {errors.pharmacyName && <p className="text-[11px] text-red-500 mt-1">{errors.pharmacyName}</p>}
              </div>

              {/* Mobile Phone & WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  رقم الهاتف المحمول (واتساب) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute start-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="01012345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full ps-10 pe-16 py-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-[#01222e] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-left font-mono transition ${
                      errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  <span className="absolute end-3 top-2.5 text-xs font-bold text-slate-400 flex items-center gap-1 select-none pointer-events-none">
                    🇪🇬 +20
                  </span>
                </div>
                {errors.phone ? (
                  <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                ) : (
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1">
                    سنرسل كود التفعيل والدعم الفني السريع عبر هذا الرقم على واتساب
                  </p>
                )}
              </div>

              {/* Email & Governorate Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Governorate */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    المحافظة <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute start-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                      value={formData.governorate}
                      onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                      className="w-full ps-10 pe-8 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-[#01222e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition cursor-pointer"
                    >
                      {EGYPT_GOVERNORATES.map(gov => (
                        <option key={gov} value={gov} className="text-slate-900 dark:bg-[#01222e] dark:text-white">
                          {gov}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    البريد الإلكتروني <span className="text-slate-400 font-normal">(اختياري)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute start-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="email"
                      dir="ltr"
                      placeholder="doctor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full ps-10 pe-4 py-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-[#01222e] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-left transition ${
                        errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Device Hint Banner */}
              <div className="p-3 rounded-xl bg-cyan-50/80 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-800/60 flex items-center gap-2.5 text-xs text-primary-900 dark:text-cyan-200">
                {deviceInfo.isWindows ? (
                  <>
                    <Monitor className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span>تم رصد جهاز كمبيوتر (Windows) 💻 — سيبدأ التنزيل المباشر فور تأكيد البيانات.</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>أنت تتصفح من الهاتف 📱 — سنوفر لك رابط التنزيل المباشر لإرساله لواتسابك لفتحه من كمبيوتر الصيدلية.</span>
                  </>
                )}
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-6 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-tangerine-500 via-tangerine-600 to-tangerine-700 hover:from-tangerine-600 hover:to-tangerine-800 shadow-glow-tangerine transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري التحقق وتجهيز رابط التحميل...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>تأكيد البيانات وإتاحة التحميل المباشر</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>بياناتك مؤمنة 100% ومشفرة ولن يتم مشاركتها إطلاقاً</span>
              </div>
            </form>
          ) : (
            /* STEP 2: DOWNLOAD SCREEN (After Successful Submission) */
            <div className="space-y-5 animate-fadeIn">
              
              {/* Doctor Salutation Card */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200">
                <div className="flex items-center gap-2.5 mb-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-bold text-sm">تم تسجيل صيدلية ({formData.pharmacyName}) بنجاح!</span>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 ps-7">
                  أهلاً بك د. {formData.doctorName}، نسختك التجريبية جاهزة للتحميل الآن بكامل الميزات وبدون أي قيود.
                </p>
              </div>

              {/* If Desktop: Show Direct Download Trigger */}
              {!deviceInfo.isMobile ? (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#01222e] border border-slate-200 dark:border-slate-700 text-center space-y-3">
                  
                  <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-bold">
                    <span>الإصدار: v{leadResult?.release?.version || '1.0.33'}</span>
                    <span>•</span>
                    <span>الحجم: {leadResult?.release?.fileSizeBytes || '101 MB'}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">تثبيت مباشر (.exe)</span>
                    <span>•</span>
                    <span>ويندوز 64-bit</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 animate-pulse" /> تم إرسال ملف التثبيت إلى قائمة التنزيلات (Downloads) في متصفحك مباشرة!
                    </span>
                  </p>

                  <button
                    onClick={() => triggerActualDownload()}
                    className="w-full py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 shadow-lg shadow-cyan-600/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Download className="w-5 h-5 animate-bounce-subtle" />
                    <span>إعادة التنزيل (Credo-Setup-1.0.33.exe)</span>
                  </button>

                  {/* Quick Installation Steps */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-start space-y-2">
                    <span className="text-[11.5px] font-bold text-slate-700 dark:text-slate-300 block">
                      📋 خطوات تشغيل النظام في صيدليتك:
                    </span>
                    <ol className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal list-inside">
                      <li>اضغط نقرتين على ملف <strong>Credo-Setup-1.0.33.exe</strong> فور انتهاء التحميل (تثبيت مباشر بدون فك ضغط).</li>
                      <li>اتبع خطوات التثبيت بالضغط على Next ثم Install.</li>
                      <li>سيفتح البرنامج تلقائياً ومعه الباك اند المحمي وقاعدة بيانات الـ <strong>27,829 صنفاً</strong>.</li>
                      <li>اضغط على <strong>"تفعيل عبر واتساب"</strong> للحصول على كود ترخيصك التجريبي فوراً.</li>
                    </ol>
                  </div>
                </div>
              ) : (
                /* If Mobile: Smart Warning + WhatsApp Share Button */
                <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
                    <Monitor className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                      البرنامج مخصص للتشغيل على أجهزة الكمبيوتر (Windows) 💻
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                      حفاظاً على باقة هاتفك ولأن ملفات (.exe) لا تعمل على الموبايل، تم تجهيز رابط التنزيل المباشر لتفتحه من كمبيوتر الصيدلية:
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* Send Link to WhatsApp Button */}
                    <button
                      onClick={handleSendToDoctorWhatsApp}
                      className="w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>إرسال رابط التحميل إلى رقم واتسابي 📲</span>
                    </button>

                    {/* Copy Link Button */}
                    <button
                      onClick={handleCopy}
                      className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-white/10 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 font-bold">تم نسخ رابط التحميل المباشر!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>نسخ رابط التحميل المباشر للكمبيوتر</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
