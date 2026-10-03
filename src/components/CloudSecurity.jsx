import React from 'react';
import { ShieldCheck, Cloud, WifiOff, RefreshCcw, Lock, HardDrive, CheckCircle2 } from 'lucide-react';

export default function CloudSecurity() {
  return (
    <section id="security" className="py-16 lg:py-24 relative overflow-hidden font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>الأمان الفائق والنسخ الاحتياطي السحابي</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            بيانات صيدليتك في أمان تام ولا تضيع أبداً حتى لو تعطل جهازك
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            تم بناء Credo Pharma بمعمارية هجينة تعمل أوفلاين دون الحاجة للإنترنت، مع نسخ تلقائي مشفر إلى Google Drive و Mega في الخلفية دون أي مجهود منك.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-3xl glass-card border border-primary-200 dark:border-primary-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
                <WifiOff className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-slate-900 dark:text-white mb-2">يعمل 100% بدون إنترنت</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                انقطاع الإنترنت في الصيدلية لن يعطل البيع أبداً. استمر في إصدار الفواتير وتسجيل الآجل بكامل السرعة محلياً.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>استقرار دائم دون توقف</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-primary-200 dark:border-primary-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-slate-900 dark:text-white mb-2">نسخ تلقائي Google Drive & Mega</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                يقوم النظام برفع نسخة احتياطية يومية مشفرة على حسابك الخاص في جوجل درايف تلقائياً عند غلق الوردية.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>حماية من سرقة أو تلف القرص الصلب</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-primary-200 dark:border-primary-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-tangerine-100 dark:bg-tangerine-950/80 text-tangerine-600 dark:text-tangerine-400 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-slate-900 dark:text-white mb-2">صلاحيات كاشير ومراقبة تامة</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                تحكم دقيق فيما يراه المساعد أو الصيدلي؛ حجب تعديل الأسعار، إلغاء الفواتير إلا بإذن، ومراجعة تقفيل درج النقدية.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-tangerine-600 dark:text-tangerine-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>منع أي هدر أو تلاعب</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-primary-200 dark:border-primary-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/80 text-primary-600 dark:text-cyan-400 flex items-center justify-center mb-4">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-slate-900 dark:text-white mb-2">تحديثات تلقائية سحابية</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                بضغطة زر واحدة داخل البرنامج، يتم ترقية النظام لأحدث إصدار وميزات دون الحاجة لزيارة فني أو توقف الصيدلية.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-primary-600 dark:text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>تحديثات مستمرة لأسعار الأدوية</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
