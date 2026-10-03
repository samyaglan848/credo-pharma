import React, { useState } from 'react';
import { 
  Building2, ArrowLeftRight, BarChart3, TrendingUp, 
  Layers, Package, Check, RefreshCw
} from 'lucide-react';

export default function WarehouseCompare() {
  const [transferDone, setTransferDone] = useState(false);

  const handleSimulateTransfer = () => {
    setTransferDone(true);
    setTimeout(() => setTransferDone(false), 3000);
  };

  return (
    <section id="warehouses" className="py-16 lg:py-24 relative overflow-hidden bg-white/40 dark:bg-darkbg/40 border-t border-primary-100 dark:border-primary-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs font-bold mb-3 border border-cyan-300 dark:border-cyan-800">
            <Building2 className="w-3.5 h-3.5 text-cyan-500" />
            <span>إدارة الفروع والمخازن والتحويلات الداخلية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            مقارنة لحظية بين فروعك ومخازنك وتحويلات بضاعة بضغطة زر
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            سواء كنت تدير صيدلية واحدة بمخزن فرعي أو سلسلة فروع متعددة؛ يمنحك Credo السيطرة الكاملة على نقل البضاعة، جرد الأرصدة، ومنع العجز والسرقات.
          </p>
        </div>

        {/* 3 Branches Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          
          {/* Branch 1 */}
          <div className="p-5 rounded-3xl glass-card border border-primary-300/80 dark:border-primary-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/60 text-primary-800 dark:text-cyan-300">
                الفرع الرئيسي
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">قيمة المخزون الحالي</span>
                <p className="text-xl font-black text-slate-900 dark:text-white font-inter">485,200 <span className="text-xs text-slate-400">ج.م</span></p>
              </div>
              <div className="flex justify-between text-xs py-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">مبيعات اليوم:</span>
                <span className="font-bold text-emerald-600">12,150 ج.م</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">نواقص حرجة:</span>
                <span className="font-bold text-rose-500">2 صنف</span>
              </div>
            </div>
          </div>

          {/* Branch 2 */}
          <div className="p-5 rounded-3xl glass-card border border-cyan-300/80 dark:border-cyan-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300">
                فرع المحطة (فرع 2)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">قيمة المخزون الحالي</span>
                <p className="text-xl font-black text-slate-900 dark:text-white font-inter">240,800 <span className="text-xs text-slate-400">ج.م</span></p>
              </div>
              <div className="flex justify-between text-xs py-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">مبيعات اليوم:</span>
                <span className="font-bold text-emerald-600">6,300 ج.م</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">نواقص حرجة:</span>
                <span className="font-bold text-amber-500">4 أصناف</span>
              </div>
            </div>
          </div>

          {/* Central Warehouse */}
          <div className="p-5 rounded-3xl glass-card border border-tangerine-300/80 dark:border-tangerine-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-tangerine-100 dark:bg-tangerine-900/60 text-tangerine-800 dark:text-tangerine-300">
                مخزن الأدوية العام
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">قيمة البضاعة المخزنة</span>
                <p className="text-xl font-black text-slate-900 dark:text-white font-inter">890,000 <span className="text-xs text-slate-400">ج.م</span></p>
              </div>
              <div className="flex justify-between text-xs py-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">تحويلات منتهية اليوم:</span>
                <span className="font-bold text-cyan-600">8 فواتير نقل</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">حالة الجرد:</span>
                <span className="font-bold text-emerald-600">مطابق 100%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Transfer Action Simulator Bar */}
        <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-white">تجربة تحويل بضاعة سريع بين الفروع:</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">نقل 10 علب (أوجمنتين 1 جم) من المخزن العام إلى فرع المحطة</p>
            </div>
          </div>

          <button
            onClick={handleSimulateTransfer}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-primary-600 hover:bg-primary-700 shadow-sm transition flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${transferDone ? 'animate-spin' : ''}`} />
            <span>تنفيذ أمر التحويل الفوري</span>
          </button>
        </div>

        {transferDone && (
          <div className="max-w-md mx-auto mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center animate-fadeIn">
            ✓ تم خصم الكمية من المخزن وإضافتها لرصيد الفرع وتحديث التقارير فوراً!
          </div>
        )}

      </div>
    </section>
  );
}
