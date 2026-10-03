import React from 'react';
import { Download, MessageCircle, Phone, CheckCircle2, Sparkles, Shield, Gift } from 'lucide-react';

export default function PricingCtaSection() {
  const whatsappUrl = "https://wa.me/201060945097?text=" + encodeURIComponent("السلام عليكم، أود تجربة برنامج CREDO PHARMA وتحميل النسخة التجريبية والحصول على عرض الإطلاق الخاص.");

  return (
    <section id="download" className="py-16 lg:py-24 relative overflow-hidden">
      
      {/* Background radial glows */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-tangerine-500/15 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Card */}
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 glass-panel border-2 border-cyan-400/40 dark:border-cyan-500/30 shadow-2xl relative text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs font-bold mb-4 border border-cyan-300 dark:border-cyan-800">
            <Gift className="w-4 h-4 text-tangerine-500" />
            <span>عرض الإطلاق التجريبي المجاني متاح لفترة محدودة</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            ابدأ تجربة <span className="gradient-text-ocean">CREDO PHARMA</span> الآن بضغطة زر
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            انضم الآن لمئات الصيادلة واكتشف لماذا يعتبر CREDO PHARMA <span className="font-bold text-slate-900 dark:text-white">أفضل برنامج صيدليات في مصر</span> و<span className="font-bold text-slate-900 dark:text-white">أسرع سيستم إدارة صيدليات</span> بالذكاء الاصطناعي. احصل على نسختك التجريبية الشاملة مع قاعدة بيانات الأدوية المصرية كاملة وتدريب مجاني.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-base sm:text-lg text-white bg-gradient-to-r from-tangerine-500 via-tangerine-600 to-tangerine-700 hover:from-tangerine-600 hover:to-tangerine-800 shadow-glow-tangerine transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-5 h-5" />
              <span>تحميل وتجربة النسخة (عبر الواتساب)</span>
            </a>

            <a
              href="tel:01001329131"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-base text-primary-800 dark:text-slate-100 glass-card border border-primary-300 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/50 shadow-sm transition"
            >
              <Phone className="w-4 h-4 text-cyan-500" />
              <span className="font-mono" dir="ltr">01001329131</span>
              <span>اتصال هاتفي مباشر</span>
            </a>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 text-right">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>تثبيت وتشغيل في أقل من 5 دقائق</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>نقل بيانات الأدوية والعملاء من برنامجك القديم</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>ضمان فني ودعم مباشر 7 أيام في الأسبوع</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
