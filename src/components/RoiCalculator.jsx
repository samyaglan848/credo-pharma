import React, { useState } from 'react';
import { Calculator, Clock, DollarSign, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export default function RoiCalculator() {
  const [dailyBills, setDailyBills] = useState(120);

  // Math models:
  // Traditional POS takes ~45 seconds per bill. Credo takes ~10 seconds.
  // Time saved per bill: 35 seconds.
  const secondsSavedPerMonth = dailyBills * 35 * 30;
  const hoursSavedPerMonth = Math.round(secondsSavedPerMonth / 3600);
  
  // Expiry prevention & debt leakage savings estimated ~ 1,800 to 7,500 EGP per month
  const debtRecoveredPerMonth = Math.round(dailyBills * 35);
  const expirySaved = Math.round(dailyBills * 20);

  return (
    <section id="calculator" className="py-16 lg:py-24 relative overflow-hidden bg-white/40 dark:bg-darkbg/40 border-t border-primary-100 dark:border-primary-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-tangerine-100 dark:bg-tangerine-950/80 text-tangerine-700 dark:text-tangerine-300 text-xs font-bold mb-3 border border-tangerine-300 dark:border-tangerine-800">
            <Calculator className="w-3.5 h-3.5 text-tangerine-500" />
            <span>حاسبة العائد الاستثماري وتوفير الوقت</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            كم ساعة وجنيه يوفرها لك Credo Pharma شهرياً؟
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            حرك المؤشر حسب متوسط عدد الفواتير اليومية في صيدليتك لترى الحجم الحقيقي للوقت والمال المسترد.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-primary-200 dark:border-primary-800 p-6 sm:p-10 shadow-xl">
          
          {/* Slider */}
          <div className="mb-10 text-center">
            <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 block mb-3">
              متوسط عدد فواتير الصيدلية يومياً:
            </label>
            <div className="text-4xl sm:text-5xl font-black text-tangerine-500 font-inter mb-4">
              {dailyBills} <span className="text-base text-slate-500 font-bold">فاتورة/يوم</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="400" 
              step="10"
              value={dailyBills}
              onChange={(e) => setDailyBills(Number(e.target.value))}
              className="w-full max-w-xl h-3 rounded-lg bg-slate-200 dark:bg-slate-700 accent-tangerine-500 cursor-pointer"
            />
            <div className="flex justify-between max-w-xl mx-auto text-[10px] text-slate-400 mt-2 font-mono">
              <span>20 فاتورة</span>
              <span>200 فاتورة</span>
              <span>400 فاتورة</span>
            </div>
          </div>

          {/* Results Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <div className="p-5 rounded-2xl bg-white dark:bg-darksurface border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">ساعات توفير في الكاشير</span>
              <p className="text-3xl font-black text-slate-900 dark:text-white font-inter mt-1">
                {hoursSavedPerMonth} <span className="text-xs text-cyan-500 font-bold">ساعة/شهر</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">وقت مهدر تم استبداله بخدمة أفضل للزبائن</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-darksurface border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">ديون مستردة برسائل الواتس</span>
              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-inter mt-1">
                {debtRecoveredPerMonth.toLocaleString()} <span className="text-xs text-slate-500 font-bold">ج.م/شهر</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">بفضل تذكيرات كشف الحساب التلقائية</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-darksurface border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-tangerine-100 dark:bg-tangerine-950/80 text-tangerine-600 dark:text-tangerine-400 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">حماية من هدر انتهاء الصلاحية</span>
              <p className="text-3xl font-black text-tangerine-500 font-inter mt-1">
                {expirySaved.toLocaleString()} <span className="text-xs text-slate-500 font-bold">ج.م/شهر</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">تنبيه بالرواكد قبل موعد انتهائها بـ 6 أشهر</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
