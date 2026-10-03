import React, { useState } from 'react';
import { 
  Barcode, ShoppingCart, Plus, Minus, Trash2, Printer, 
  Sparkles, CheckCircle2, Zap, Tag, RefreshCw, Layers
} from 'lucide-react';

const sampleMedicines = [
  { id: 1, name: 'أوجمنتين 1 جم أقراص (Augmentin 1g)', barcode: '622100123456', boxPrice: 131.00, stripsPerBox: 2, stock: 45 },
  { id: 2, name: 'بانادول إكسترا أقراص (Panadol Extra)', barcode: '622100789012', boxPrice: 48.00, stripsPerBox: 2, stock: 120 },
  { id: 3, name: 'كتافلام 50 مجم أقراص (Cataflam 50mg)', barcode: '622100456789', boxPrice: 56.50, stripsPerBox: 2, stock: 68 },
  { id: 4, name: 'كونكور 5 مجم بلس (Concor 5 Plus)', barcode: '622100987654', boxPrice: 64.00, stripsPerBox: 3, stock: 32 },
];

export default function InteractivePos() {
  const [cart, setCart] = useState([
    { ...sampleMedicines[0], unit: 'box', qty: 1, price: 131.00 },
    { ...sampleMedicines[1], unit: 'strip', qty: 2, price: 24.00 }
  ]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [printedBill, setPrintedBill] = useState(null);
  const [successToast, setSuccessToast] = useState(false);

  const addItem = (item) => {
    const existingIndex = cart.findIndex(c => c.id === item.id && c.unit === 'box');
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].qty += 1;
      setCart(updated);
    } else {
      setCart([...cart, { ...item, unit: 'box', qty: 1, price: item.boxPrice }]);
    }
  };

  const updateUnit = (index, unit) => {
    const updated = [...cart];
    const item = updated[index];
    item.unit = unit;
    if (unit === 'box') {
      item.price = item.boxPrice;
    } else if (unit === 'strip') {
      item.price = Number((item.boxPrice / item.stripsPerBox).toFixed(2));
    } else if (unit === 'tablet') {
      item.price = Number((item.boxPrice / (item.stripsPerBox * 10)).toFixed(2));
    }
    setCart(updated);
  };

  const updateQty = (index, delta) => {
    const updated = [...cart];
    const newQty = updated[index].qty + delta;
    if (newQty <= 0) {
      updated.splice(index, 1);
    } else {
      updated[index].qty = newQty;
    }
    setCart(updated);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = Number(((subtotal * discountPercent) / 100).toFixed(2));
  const finalTotal = Number((subtotal - discountAmount).toFixed(2));

  const handlePrint = () => {
    if (cart.length === 0) return;
    const billData = {
      id: Math.floor(1000 + Math.random() * 9000),
      items: [...cart],
      subtotal,
      discountAmount,
      finalTotal,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('ar-EG')
    };
    setPrintedBill(billData);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3500);
  };

  return (
    <section id="pos" className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-[#eaf4f8]/80 via-[#f4fafd]/90 to-white/90 dark:from-darkbg/60 dark:to-darkbg/90 border-y border-primary-200/80 dark:border-primary-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 text-xs font-bold mb-3 border border-cyan-300 dark:border-cyan-800 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 fill-cyan-500" />
            <span>نقطة البيع الخاطفة (Ultra-Fast POS)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            سرعة خيالية وبساطة تامة لا تتطلب أي تدريب مسبق
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            صُممت واجهة البيع ليعمل عليها أي مساعد أو صيدلي من الدقيقة الأولى؛ بيع بالباركود، بالعلبة أو الشريط أو القرص بنقرة زر، مع خصومات فورية وطباعة في جزء من الثانية.
          </p>
        </div>

        {/* Live Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (7 cols): Cashier Screen */}
          <div className="lg:col-span-7 rounded-3xl glass-panel border border-primary-300/90 dark:border-primary-800/80 p-5 sm:p-7 shadow-xl relative">
            <div className="flex items-center justify-between border-b border-primary-100 dark:border-slate-800 pb-3.5 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">شاشة الكاشير السريع (جرب بنفسك الآن)</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-cyan-300 font-bold border border-primary-200 dark:border-primary-800">
                فاتورة مبيعات #8942
              </span>
            </div>

            {/* Quick Add Meds Buttons */}
            <div className="mb-4">
              <span className="text-xs font-bold text-primary-800 dark:text-slate-400 block mb-2">
                انقر على أي دواء لإضافته للفاتورة فوراً وتجربة السرعة:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {sampleMedicines.map((med) => (
                  <button
                    key={med.id}
                    onClick={() => addItem(med)}
                    className="p-3 rounded-2xl border border-primary-200 dark:border-slate-800 bg-white dark:bg-darksurface hover:border-cyan-500 hover:shadow-md transition text-right group cursor-pointer"
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate group-hover:text-cyan-600 transition">
                      {med.name.split('(')[0]}
                    </p>
                    <div className="flex justify-between items-center mt-1.5">
                      <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 font-jakarta">{med.boxPrice} ج.م</span>
                      <span className="p-1 rounded-lg bg-cyan-50 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition">
                        <Plus className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Table with Vivid Light Colors */}
            <div className="border border-primary-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-4 bg-white dark:bg-darkcard/70 shadow-2xs">
              <div className="p-2.5 bg-gradient-to-r from-primary-100/90 via-cyan-100/80 to-primary-100/90 dark:from-darkbg dark:to-darkbg text-xs font-extrabold text-primary-950 dark:text-slate-300 grid grid-cols-12 gap-2 text-center border-b border-primary-200 dark:border-slate-800">
                <span className="col-span-5 text-right pr-2">الصنف</span>
                <span className="col-span-3">الوحدة</span>
                <span className="col-span-2">الكمية</span>
                <span className="col-span-2">الإجمالي</span>
              </div>

              <div className="divide-y divide-primary-100/80 dark:divide-slate-800 max-h-56 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    الفاتورة فارغة حالياً، انقر على الأصناف بالأعلى لتجربة البيع!
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="p-2.5 text-xs grid grid-cols-12 gap-2 items-center text-center hover:bg-cyan-50/50 dark:hover:bg-slate-800/40 transition">
                      <div className="col-span-5 text-right pr-1 truncate font-semibold text-slate-900 dark:text-slate-200">
                        {item.name.split('(')[0]}
                      </div>
                      
                      {/* Unit Selector */}
                      <div className="col-span-3 flex justify-center gap-1">
                        <button
                          onClick={() => updateUnit(index, 'box')}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                            item.unit === 'box'
                              ? 'bg-primary-600 text-white shadow-2xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          علبة
                        </button>
                        <button
                          onClick={() => updateUnit(index, 'strip')}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                            item.unit === 'strip'
                              ? 'bg-cyan-600 text-white shadow-2xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          شريط
                        </button>
                        <button
                          onClick={() => updateUnit(index, 'tablet')}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                            item.unit === 'tablet'
                              ? 'bg-tangerine-600 text-white shadow-2xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          قرص
                        </button>
                      </div>

                      {/* Qty Controls */}
                      <div className="col-span-2 flex items-center justify-center gap-1 font-jakarta">
                        <button 
                          onClick={() => updateQty(index, -1)}
                          className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 font-extrabold text-slate-900 dark:text-white">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(index, 1)}
                          className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="col-span-2 font-jakarta font-extrabold text-emerald-700 dark:text-emerald-400">
                        {(item.price * item.qty).toFixed(1)} ج.م
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Calculations & Discount Bar */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-darksurface border border-primary-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-400">خصم سريع:</span>
                {[0, 5, 10, 15].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setDiscountPercent(pct)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold font-jakarta transition cursor-pointer ${
                      discountPercent === pct 
                        ? 'bg-tangerine-500 text-white shadow-2xs' 
                        : 'bg-primary-50 dark:bg-slate-800 text-primary-900 dark:text-slate-300 hover:bg-primary-100'
                    }`}
                  >
                    {pct === 0 ? 'بدون' : `${pct}%`}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs font-bold">
                {discountPercent > 0 && (
                  <span className="text-rose-600 font-jakarta font-extrabold">خصم: -{discountAmount} ج.م</span>
                )}
                <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-jakarta">
                  الصافي: <span className="text-cyan-700 dark:text-cyan-400">{finalTotal} ج.م</span>
                </div>
              </div>
            </div>

            {/* Print Button */}
            <div className="mt-4">
              <button
                onClick={handlePrint}
                disabled={cart.length === 0}
                className="w-full py-3.5 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                <Printer className="w-5 h-5" />
                <span>إصدار وطباعة الفاتورة الفورية (F12)</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Thermal Receipt */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl bg-white text-slate-900 p-6 shadow-2xl border-2 border-primary-200/90 relative text-xs font-mono">
              
              {/* Receipt Header */}
              <div className="border-b-2 border-dashed border-primary-200 pb-3.5 text-center mb-3.5">
                <p className="font-black text-base text-primary-950 font-readex">صيدلية الرعاية الذكية</p>
                <p className="text-[11px] font-bold text-cyan-700 font-readex mt-0.5">نظام CREDO PHARMA المتطور</p>
                <p className="text-[10px] text-slate-500 mt-1 font-jakarta">هاتف: 01060945097</p>
                <p className="text-[10px] text-slate-400 font-jakarta">{new Date().toLocaleDateString('ar-EG')} - {new Date().toLocaleTimeString('ar-EG')}</p>
              </div>

              {/* Items List */}
              <div className="space-y-2 mb-3.5 max-h-48 overflow-y-auto">
                {printedBill ? (
                  printedBill.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-900 font-readex">{it.name.split('(')[0]}</p>
                        <p className="text-[10px] text-slate-500 font-jakarta">{it.qty} × {it.price} ج.م ({it.unit === 'box' ? 'علبة' : it.unit === 'strip' ? 'شريط' : 'قرص'})</p>
                      </div>
                      <span className="font-bold text-slate-950 font-jakarta">{(it.qty * it.price).toFixed(1)}</span>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-slate-500 font-readex text-xs">
                    اضغط زر "إصدار وطباعة الفاتورة" لمشاهدة إيصال الكاشير الحراري فورياً
                  </div>
                )}
              </div>

              {/* Receipt Total */}
              <div className="border-t-2 border-dashed border-primary-200 pt-3.5 space-y-1.5 text-right font-jakarta">
                <div className="flex justify-between text-slate-600 text-xs">
                  <span className="font-readex">إجمالي الأصناف:</span>
                  <span className="font-bold">{printedBill ? printedBill.subtotal.toFixed(2) : finalTotal.toFixed(2)} ج.م</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-rose-600 text-xs font-bold">
                    <span className="font-readex">الخصم الممنوح:</span>
                    <span>-{discountAmount} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-base text-primary-950 pt-1.5 border-t border-slate-200">
                  <span className="font-readex">المبلغ المطلوب:</span>
                  <span className="text-emerald-700">{printedBill ? printedBill.finalTotal.toFixed(2) : finalTotal.toFixed(2)} ج.م</span>
                </div>
              </div>

              <div className="border-t border-dashed border-primary-200 mt-4 pt-3.5 text-center text-[10px] text-slate-500 font-readex">
                <p>شكراً لزيارتكم ونتمنى لكم دوام الصحة والعافية</p>
                <p className="font-jakarta mt-1 text-[9px] text-slate-400">Powered by CREDO PHARMA v1.0.31</p>
              </div>

            </div>

            {/* Badges under receipt */}
            <div className="mt-4 w-full max-w-sm space-y-2 text-xs">
              <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-slate-800 dark:text-slate-300 font-semibold">دعم كافة طابعات الفواتير الحرارية وباركود USB / Wireless</span>
              </div>
              <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-slate-800 dark:text-slate-300 font-semibold">إمكانية تعليق الفواتير (Hold) وتعدد العملاء بدون بطء</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
