import React, { useState } from 'react';
import { 
  Send, Truck, CheckCircle2, FileSpreadsheet, PackageCheck, 
  AlertTriangle, MessageCircle, Building, RefreshCw, ShoppingCart, 
  ArrowRight, ShieldCheck, Check
} from 'lucide-react';

export default function ShortagesOrdersDemo() {
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [orderSent, setOrderSent] = useState(false);
  const [sending, setSending] = useState(false);

  const suppliers = [
    { id: 'all', name: 'جميع الشركات والمخازن', count: 5 },
    { id: 'ibnsina', name: 'ابن سينا فارما (Ibn Sina)', count: 2 },
    { id: 'ucp', name: 'المتحدة للصيادلة (UCP)', count: 2 },
    { id: 'overseas', name: 'فارما أوفرسيز (Overseas)', count: 1 },
  ];

  const shortageItems = [
    {
      id: 1,
      name: 'أوجمنتين 1 جم 14 قرص (Augmentin 1g)',
      category: 'مضاد حيوي',
      currentStock: 1,
      minLimit: 15,
      suggestedQty: 20,
      supplier: 'ابن سينا فارما',
      supplierId: 'ibnsina',
      discount: '21.5%',
      priority: 'urgent',
    },
    {
      id: 2,
      name: 'بانادول إكسترا أحمر 24 قرص (Panadol Extra)',
      category: 'مسكن وخافض حرارة',
      currentStock: 0,
      minLimit: 25,
      suggestedQty: 30,
      supplier: 'المتحدة للصيادلة',
      supplierId: 'ucp',
      discount: '18.0%',
      priority: 'critical',
    },
    {
      id: 3,
      name: 'كونجستال 20 قرص (Congestal Tablets)',
      category: 'أدوية البرد والإنفلونزا',
      currentStock: 2,
      minLimit: 20,
      suggestedQty: 25,
      supplier: 'فارما أوفرسيز',
      supplierId: 'overseas',
      discount: '20.0%',
      priority: 'urgent',
    },
    {
      id: 4,
      name: 'ألفينترن 30 قرص (Alphintern Tablets)',
      category: 'مضاد للالتهاب والتورم',
      currentStock: 1,
      minLimit: 30,
      suggestedQty: 40,
      supplier: 'المتحدة للصيادلة',
      supplierId: 'ucp',
      discount: '22.0%',
      priority: 'critical',
    },
    {
      id: 5,
      name: 'كيتوفان 50 مجم 24 كبسولة (Ketofan 50mg)',
      category: 'مسكن ومضاد للروماتيزم',
      currentStock: 3,
      minLimit: 12,
      suggestedQty: 15,
      supplier: 'ابن سينا فارما',
      supplierId: 'ibnsina',
      discount: '19.5%',
      priority: 'medium',
    },
  ];

  const filteredItems = selectedSupplier === 'all' 
    ? shortageItems 
    : shortageItems.filter(item => item.supplierId === selectedSupplier);

  const handleSendOrder = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setOrderSent(true);
      setTimeout(() => setOrderSent(false), 5000);
    }, 900);
  };

  return (
    <section id="shortages" className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white/90 via-[#f0f8fa]/80 to-white/90 dark:from-darkbg/70 dark:via-[#011e2b]/60 dark:to-darkbg/95 border-t border-primary-100 dark:border-primary-900/50 font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
            <Truck className="w-3.5 h-3.5 text-emerald-500" />
            <span>نظام طلبيات النواقص الذكي للشركات والمخازن</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            إرسال النواقص للمخازن والشركات بضغطة زر واحدة
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            السيستم يرصد الأصناف التي وصلت لحد الطلب أو طلبها العملاء تلقائياً، ويجهز طلبيات دقيقة ومقسمة لكل شركة توزيع (ابن سينا، المتحدة، فارما أوفرسيز) لترسلها عبر الواتساب أو شيت إلكتروني فوراً دون كتابة يدوية.
          </p>
        </div>

        {/* Real Interactive Order Screen Mockup */}
        <div className="rounded-3xl glass-panel border-2 border-primary-200/90 dark:border-cyan-500/30 p-4 sm:p-7 shadow-2xl space-y-6">
          
          {/* Top Bar: Supplier Selector + Action Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
            {/* Supplier Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
              {suppliers.map((sup) => (
                <button
                  key={sup.id}
                  onClick={() => setSelectedSupplier(sup.id)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    selectedSupplier === sup.id
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                      : 'bg-white/80 dark:bg-darksurface text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-primary-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Building className="w-3 h-3 text-cyan-400" />
                  <span>{sup.name}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedSupplier === sup.id 
                      ? 'bg-white/25 text-white' 
                      : 'bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-cyan-300'
                  }`}>
                    {sup.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleSendOrder}
                disabled={sending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 shadow-md transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-75 cursor-pointer"
              >
                {sending ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>إرسال الطلبية للشركات (واتساب مباشر)</span>
              </button>
            </div>
          </div>

          {/* Toast Alert on Send */}
          {orderSent && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-400 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fadeIn shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                تم تجميع وإرسال طلبيات النواقص لمندوبي شركات التوزيع المحددة بنجاح عبر الواتساب بصيغة فاتورة طلب معتمدة!
              </span>
            </div>
          )}

          {/* Table / Shortages List */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-right text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-primary-50/80 dark:bg-[#012836] text-primary-900 dark:text-cyan-200 font-bold border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-3.5">اسم الصنف الناقص</th>
                  <th className="py-3 px-3">التصنيف</th>
                  <th className="py-3 px-3 text-center">الرصيد الحالي</th>
                  <th className="py-3 px-3 text-center">حد الأمان</th>
                  <th className="py-3 px-3 text-center">الكمية المطلوبة</th>
                  <th className="py-3 px-3">شركة التوزيع</th>
                  <th className="py-3 px-3 text-center">خصم المورد</th>
                  <th className="py-3 px-3 text-center">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/70 dark:bg-darkcard/60">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-primary-50/40 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400 text-xs">
                      {item.category}
                    </td>
                    <td className="py-3 px-3 text-center font-bold font-mono">
                      <span className={`px-2 py-0.5 rounded-md ${
                        item.currentStock === 0 
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-400' 
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400'
                      }`}>
                        {item.currentStock} علبة
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300 font-mono">
                      {item.minLimit} علبة
                    </td>
                    <td className="py-3 px-3 text-center font-black text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                      {item.suggestedQty} علبة
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-200">
                      {item.supplier}
                    </td>
                    <td className="py-3 px-3 text-center text-cyan-600 dark:text-cyan-400 font-bold font-mono">
                      {item.discount}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.priority === 'critical'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                      }`}>
                        <AlertTriangle className="w-2.5 h-2.5" />
                        {item.priority === 'critical' ? 'نفد تماماً' : 'ناقص حرج'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3 Value Highlights Underneath */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">تجميع آلي حسب حد الأمان</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">لن تحتاج لحساب النواقص ورقة وقلم بعد اليوم</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">إرسال مباشر لواتساب المندوب</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">الطلبية تصل لمندوب الشركة فوراً بكامل التفاصيل</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tangerine-100 dark:bg-tangerine-950/80 text-tangerine-600 dark:text-tangerine-400 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">تصدير Excel / PDF بضغطة زر</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">جاهز للتحميل والطباعة ومطابقة الفواتير عند الاستلام</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
