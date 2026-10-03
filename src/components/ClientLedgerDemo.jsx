import React, { useState } from 'react';
import { 
  Users, MessageCircle, FileText, Send, CheckCircle, 
  AlertCircle, ShieldCheck, UserCheck, ArrowUpRight, Smartphone,
  ShieldAlert, Lock, Ban, Calendar, Bell, Clock, Receipt, 
  CreditCard, DollarSign, AlertTriangle, Sparkles, CheckCheck, 
  RefreshCw, Check, Info, ChevronRight, Zap
} from 'lucide-react';

const scenarios = [
  {
    id: 'invoice',
    label: 'إشعار فاتورة شراء',
    badge: 'لحظي فور البيع',
    icon: Receipt,
    color: 'emerald',
    title: 'إشعار فوري بالفواتير المسحوبة',
    summary: 'إرسال تفاصيل الفاتورة، الأصناف، القيمة الإجمالية، والرصيد المتبقي بمجرد طباعة الفاتورة في الكاشير.'
  },
  {
    id: 'payment',
    label: 'إشعار سداد دفعة',
    badge: 'إيصال قبض رسمي',
    icon: DollarSign,
    color: 'cyan',
    title: 'تأكيد استلام النقدية والدفعات',
    summary: 'إشعار العميل فوراً بأي مبلغ يتم دفعه، مع رقم إيصال القبض، وإظهار الرصيد قبل وبعد السداد لضمان الشفافية المطلقة.'
  },
  {
    id: 'limit_lock',
    label: 'قفل الحساب (الحد الأقصى)',
    badge: 'إيقاف أوتوماتيكي صارم 🔒',
    icon: Ban,
    color: 'rose',
    title: 'إيقاف المعاملة تلقائياً عند تجاوز الحد الائتماني',
    summary: 'عند وصول مديونية العميل للحد الأقصى المسموح، يوقف السيستم صرف الأدوية بالآجل فورياً وينبه الكاشير والعميل بلباقة.'
  },
  {
    id: 'mid_month',
    label: 'تنبيه منتصف الشهر (يوم 15)',
    badge: 'تذكير ودي استباقي',
    icon: Calendar,
    color: 'amber',
    title: 'متابعة دورية في منتصف الشهر',
    summary: 'رسالة ودية تلقائية تحيط العميل بمسحوباته للنصف الأول من الشهر حتى لا تتراكم عليه الأرقام فجأة بنهاية الشهر.'
  },
  {
    id: 'end_month',
    label: 'كشف حساب وتسوية نهاية الشهر',
    badge: 'PDF رسمي + رابط سداد',
    icon: FileText,
    color: 'primary',
    title: 'مطالبة نهاية الشهر الأنيقة مع ملف PDF',
    summary: 'إرسال كشف حساب مالي تفصيلي PDF مع موعد الاستحقاق وطرق السداد الفوري (إنستاباي / فودافون كاش) بدون أي إحراج.'
  }
];

export default function ClientLedgerDemo() {
  const [activeTab, setActiveTab] = useState('invoice');
  const [sentToast, setSentToast] = useState(false);

  const currentScenario = scenarios.find(s => s.id === activeTab) || scenarios[0];

  const handleSimulateSend = (scenarioId) => {
    setActiveTab(scenarioId);
    setSentToast(true);
    setTimeout(() => setSentToast(false), 3500);
  };

  return (
    <section id="clients" className="py-16 lg:py-24 relative overflow-hidden bg-white/40 dark:bg-darkbg/40 border-t border-primary-100 dark:border-primary-900/50 font-cairo">
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-cyan-400/10 dark:bg-cyan-500/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-tangerine-400/10 dark:bg-tangerine-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-bold mb-4 border border-cyan-300 dark:border-cyan-800 shadow-2xs">
            <Users className="w-4 h-4 text-cyan-500" />
            <span>منظومة إدارة الديون ومتابعة حسابات العملاء الذكية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-normal mb-4 sm:mb-6 leading-tight">
            متابعة ذكية تتواصل مع عملائك بالواتساب وتوقف الآجل تلقائياً عند الحد الأقصى
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            وداعاً لدفاتر الشكك المفقودة وخسائر الديون المعدومة. نظام <span className="font-bold text-slate-900 dark:text-white">CREDO PHARMA</span> يتابع العميل خطوة بخطوة بفواتيره ودفعاته، ويجمد المعاملات فور تجاوز السقف المسموح، مع تنبيهات دورية في منتصف ونهاية كل شهر.
          </p>
        </div>

        {/* Interactive Scenario Tabs Bar */}
        <div className="mb-8">
          <p className="text-center text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-tangerine-500" />
            <span>انقر على أحد السيناريوهات بالأسفل لتجربة المحاكاة الحية للنظام ورسائل الواتساب:</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {scenarios.map((sc) => {
              const Icon = sc.icon;
              const isActive = activeTab === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSimulateSend(sc.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-600 to-primary-700 text-white border-cyan-500 shadow-lg shadow-cyan-500/20 scale-105' 
                      : 'glass-card text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-800 hover:border-cyan-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-500'}`} />
                  <span>{sc.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {sc.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Simulation Playground: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-16">
          
          {/* 6 Cols: Realistic System Profile & Cashier Control */}
          <div className="lg:col-span-6 rounded-3xl glass-panel border border-primary-200 dark:border-primary-800/80 p-5 sm:p-7 shadow-xl space-y-5">
            
            {/* Customer Header Info */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow-md font-sans">
                  م.س
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-slate-900 dark:text-white">أ/ محمود السيد عبد اللطيف</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 font-bold">VIP</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5" dir="ltr">01098765432</p>
                </div>
              </div>

              {/* Status Badge Dynamically Toggled */}
              {activeTab === 'limit_lock' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100 dark:bg-rose-950/90 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 animate-pulse">
                  <Lock className="w-3.5 h-3.5 text-rose-600" />
                  <span>الآجل موقوف برمجياً</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>حساب آجل نشط</span>
                </span>
              )}
            </div>

            {/* Financial Balances Display */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* Current Debt Box */}
              <div className={`p-4 rounded-2xl border transition-all ${
                activeTab === 'limit_lock'
                  ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
                  : 'bg-white dark:bg-darksurface border-slate-200 dark:border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>إجمالي المديونية الحالية</span>
                  {activeTab === 'limit_lock' && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                </div>
                <p className={`text-2xl font-black font-inter mt-1.5 ${
                  activeTab === 'limit_lock' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
                }`}>
                  {activeTab === 'limit_lock' ? '2,500.00' : activeTab === 'payment' ? '1,450.00' : '1,450.00'}{' '}
                  <span className="text-xs text-slate-500 font-bold font-cairo">ج.م</span>
                </p>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  {activeTab === 'payment' ? 'تم خصم 500 ج.م نقدية' : activeTab === 'limit_lock' ? 'بلغ الحد الأقصى تماماً (100%)' : 'آخر سداد: منذ 3 أيام'}
                </span>
              </div>

              {/* Credit Limit Box */}
              <div className="p-4 rounded-2xl bg-white dark:bg-darksurface border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>الحد الائتماني الأقصى</span>
                  <ShieldAlert className="w-4 h-4 text-cyan-500" />
                </div>
                <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400 font-inter mt-1.5">
                  2,500.00 <span className="text-xs text-slate-500 font-bold font-cairo">ج.م</span>
                </p>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-2.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      activeTab === 'limit_lock' ? 'bg-rose-500 w-full animate-pulse' : 'bg-amber-500 w-[58%]'
                    }`}
                  />
                </div>
              </div>

            </div>

            {/* Dynamic System Action Banner */}
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 transition-all ${
              activeTab === 'limit_lock'
                ? 'bg-rose-100/90 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                : activeTab === 'payment'
                ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200'
                : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {activeTab === 'limit_lock' ? (
                  <>
                    <Ban className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                    <span>تنبيه الكاشير: تم حظر عملية البيع بالآجل لهذا العميل</span>
                  </>
                ) : activeTab === 'payment' ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                    <span>تم تسجيل إيصال القبض وتحديث الرصيد اللحظي</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>السيناريو النشط: {currentScenario.title}</span>
                  </>
                )}
              </div>
              <p className="text-[12px] opacity-90">
                {activeTab === 'limit_lock'
                  ? 'محاولة إضافة فاتورة بقيمة 180 ج.م -> تم رفض المعاملة أوتوماتيكياً. لا يمكن التمرير على الحساب الآجل إلا بعد سداد دفعة تخفض الرصيد، أو إدخال كود استثناء المدير المشفر.'
                  : currentScenario.summary}
              </p>
            </div>

            {/* Action Simulator buttons */}
            <div className="pt-2">
              <button
                onClick={() => handleSimulateSend(activeTab)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>إعادة إرسال إشعار الواتساب التلقائي لهذا السيناريو</span>
              </button>
            </div>

            {sentToast && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>تم إرسال إشعار الواتساب المباشر بنجاح إلى رقم هاتف العميل (01098765432) ✓✓</span>
              </div>
            )}

            {/* Feature Highlights Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <Lock className="w-3.5 h-3.5 text-rose-500" />
                <span>قفل الحد الأقصى مشفر</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <Bell className="w-3.5 h-3.5 text-amber-500" />
                <span>تنبيهات يوم 15 و 30 مجدولة</span>
              </div>
            </div>

          </div>

          {/* 6 Cols: WhatsApp Customer Real Smartphone Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md rounded-[32px] bg-[#0b141a] text-slate-100 border-[6px] border-slate-800 shadow-2xl p-4 space-y-3 font-sans">
              
              {/* WhatsApp App Bar */}
              <div className="px-3.5 py-2.5 bg-[#1f2c34] rounded-2xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-black text-white shadow-xs">
                    ✙
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1">
                      <span>صيدلية الرعاية الذكية</span>
                      <CheckCircle className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                    </p>
                    <p className="text-[10px] text-emerald-400 font-medium">حساب تجاري معتمد (WhatsApp Verified)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 font-mono font-bold">24/7 Auto</span>
                </div>
              </div>

              {/* Dynamic WhatsApp Chat Messages Area */}
              <div className="min-h-[380px] p-2 sm:p-3 space-y-3 flex flex-col justify-start">
                
                {/* Date stamp */}
                <div className="text-center my-1">
                  <span className="px-3 py-1 rounded-lg bg-[#182229] text-[10px] text-slate-400 font-mono">
                    اليوم • محادثة آلية مشفرة من CREDO PHARMA
                  </span>
                </div>

                {/* Scenario 1: Invoice */}
                {activeTab === 'invoice' && (
                  <div className="bg-[#005c4b] p-3.5 rounded-2xl rounded-tr-none text-xs space-y-2 text-white shadow-md animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/20 pb-1.5">
                      <span className="font-bold flex items-center gap-1.5">
                        <Receipt className="w-3.5 h-3.5 text-cyan-300" />
                        <span>فاتورة مشتريات جديدة</span>
                      </span>
                      <span className="font-mono text-[10px] text-cyan-200">#INV-8942</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      عميلنا العزيز أ/ <span className="font-bold">محمود السيد</span>، شكراً لزيارتك صيدلية الرعاية الذكية 🌸 تم صرف الأدوية التالية لحسابكم:
                    </p>
                    <div className="p-2.5 rounded-xl bg-black/25 font-mono text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span>• أوجمنتين 1 جم (1 علبة):</span>
                        <span>131.00 ج.م</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• بانادول إكسترا (2 شريط):</span>
                        <span>48.00 ج.م</span>
                      </div>
                      <div className="border-t border-white/20 pt-1 flex justify-between font-bold text-white text-xs">
                        <span>إجمالي الفاتورة:</span>
                        <span className="text-cyan-300">179.00 ج.م</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10 text-[10.5px] space-y-0.5">
                      <div className="flex justify-between text-slate-200">
                        <span>رصيدكم الإجمالي الجديد:</span>
                        <span className="font-bold text-amber-300 font-mono">1,450.00 ج.م</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-emerald-200">
                        <span>المتبقي في حدكم الائتماني:</span>
                        <span className="font-mono">1,050.00 ج.م</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[9px] text-white/70">
                      <span>صيدلية الرعاية الذكية تتمنى لكم دوام الصحة والعافية</span>
                      <span className="font-mono flex items-center gap-0.5">11:45 ص <CheckCheck className="w-3 h-3 text-cyan-300" /></span>
                    </div>
                  </div>
                )}

                {/* Scenario 2: Payment */}
                {activeTab === 'payment' && (
                  <div className="bg-[#005c4b] p-3.5 rounded-2xl rounded-tr-none text-xs space-y-2 text-white shadow-md animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/20 pb-1.5">
                      <span className="font-bold flex items-center gap-1.5 text-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                        <span>إيصال استلام نقدية وسداد</span>
                      </span>
                      <span className="font-mono text-[10px] text-emerald-200">#REC-4091</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      عميلنا الكريم أ/ <span className="font-bold">محمود السيد</span>، تم بنجاح استلام وتوريد دفعتكم النقدية في الخزينة:
                    </p>
                    <div className="p-2.5 rounded-xl bg-black/25 font-mono text-[11px] space-y-1.5">
                      <div className="flex justify-between text-emerald-300 font-bold text-sm">
                        <span>المبلغ المستلم:</span>
                        <span>500.00 ج.م</span>
                      </div>
                      <div className="flex justify-between text-slate-300 text-[10.5px]">
                        <span>الرصيد السابق قبل السداد:</span>
                        <span>1,950.00 ج.م</span>
                      </div>
                      <div className="border-t border-white/20 pt-1 flex justify-between font-bold text-white text-xs">
                        <span>الرصيد المتبقي المطلوب:</span>
                        <span className="text-cyan-300 text-sm">1,450.00 ج.م</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-500/40 text-[10px] text-emerald-100 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>تم تحديث حسابكم فورياً وإتاحة سقف مشتريات إضافي بقيمة 500 ج.م.</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[9px] text-white/70">
                      <span>شكراً لالتزامكم الدائم والمقدر 🌸</span>
                      <span className="font-mono flex items-center gap-0.5">02:15 م <CheckCheck className="w-3 h-3 text-cyan-300" /></span>
                    </div>
                  </div>
                )}

                {/* Scenario 3: Limit Exceeded & Hard-Lock */}
                {activeTab === 'limit_lock' && (
                  <div className="bg-[#4a151b] p-3.5 rounded-2xl rounded-tr-none text-xs space-y-2.5 text-white shadow-md border border-rose-500/50 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-rose-400/30 pb-1.5 text-rose-200">
                      <span className="font-bold flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                        <span>تنبيه: بلوغ الحد الائتماني المعتمد</span>
                      </span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                        حظر الآجل 🔒
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      عزيزنا العميل أ/ <span className="font-bold">محمود السيد</span>، تحية طيبة من إدارة صيدلية الرعاية الذكية 🌿
                    </p>
                    <div className="p-2.5 rounded-xl bg-black/35 font-mono text-[11px] space-y-1.5 border border-rose-500/30">
                      <div className="flex justify-between text-rose-300 font-bold">
                        <span>الحد الائتماني الأقصى المعتمد:</span>
                        <span>2,500.00 ج.م</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>إجمالي المديونية الحالية:</span>
                        <span className="text-rose-400 font-bold">2,500.00 ج.م</span>
                      </div>
                      <div className="border-t border-white/10 pt-1 text-[10px] text-rose-200">
                        نسبة استهلاك السقف: 100% (تم إيقاف فتح فواتير جديدة على الحساب برمجياً).
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10 text-[10px] text-slate-200 leading-relaxed">
                      نرجو من سيادتكم التكرم بسداد دفعة لتسوية الحساب حتى نتمكن من إعادة تفعيل الشراء بالآجل فورياً، أو يمكنكم زيارتنا والشراء نقداً في أي وقت.
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[9px] text-rose-300/80">
                      <span>نظام الحماية الآلي - CREDO PHARMA</span>
                      <span className="font-mono flex items-center gap-0.5">04:30 م <CheckCheck className="w-3 h-3 text-cyan-300" /></span>
                    </div>
                  </div>
                )}

                {/* Scenario 4: Mid-Month Reminder */}
                {activeTab === 'mid_month' && (
                  <div className="bg-[#005c4b] p-3.5 rounded-2xl rounded-tr-none text-xs space-y-2 text-white shadow-md animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/20 pb-1.5">
                      <span className="font-bold flex items-center gap-1.5 text-amber-200">
                        <Calendar className="w-3.5 h-3.5 text-amber-300" />
                        <span>تذكير دوري بمنتصف الشهر (15 أكتوبر)</span>
                      </span>
                      <span className="font-mono text-[10px] text-amber-300">منتصف الشهر 📅</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      مرحباً أ/ <span className="font-bold">محمود السيد</span>، نأمل أن تكون بأفضل حال وأتم صحة 🌸
                    </p>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      حرصاً منا على دقة ومتابعة حساباتكم أولاً بأول وحتى لا تتراكم عليكم المبالغ بنهاية الشهر، نود إحاطتكم بملخص مسحوباتكم للنصف الأول:
                    </p>
                    <div className="p-2.5 rounded-xl bg-black/25 font-mono text-[11px] space-y-1">
                      <div className="flex justify-between text-slate-200">
                        <span>مسحوبات النصف الأول (1-15 أكتوبر):</span>
                        <span>650.00 ج.م</span>
                      </div>
                      <div className="flex justify-between text-amber-300 font-bold">
                        <span>إجمالي رصيدكم الكلي الحالي:</span>
                        <span>1,450.00 ج.م</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-300">
                        <span>الحد الأقصى المسموح لكم:</span>
                        <span>2,500.00 ج.م</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10 text-[10px] text-slate-200">
                      يمكنكم السداد في أي وقت يناسبكم بالصيدلية أو التحويل عبر إنستاباي / المحافظ الذكية.
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[9px] text-white/70">
                      <span>صيدلية الرعاية الذكية في خدمتكم دائماً</span>
                      <span className="font-mono flex items-center gap-0.5">10:00 ص <CheckCheck className="w-3 h-3 text-cyan-300" /></span>
                    </div>
                  </div>
                )}

                {/* Scenario 5: End-Month Statement */}
                {activeTab === 'end_month' && (
                  <div className="bg-[#005c4b] p-3.5 rounded-2xl rounded-tr-none text-xs space-y-2 text-white shadow-md animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/20 pb-1.5">
                      <span className="font-bold flex items-center gap-1.5 text-cyan-200">
                        <FileText className="w-3.5 h-3.5 text-cyan-300" />
                        <span>كشف الحساب الشهري الرسمي والتسوية</span>
                      </span>
                      <span className="font-mono text-[10px] text-cyan-300">نهاية الشهر 📊</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      عميلنا العزيز أ/ <span className="font-bold">محمود السيد</span>، تحية طيبة من صيدلية الرعاية الذكية 🌸
                    </p>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      نرفق لسيادتكم كشف الحساب المالي المعتمد عن شهر أكتوبر، متضمناً كافة الفواتير المسحوبة والإيصالات المسددة:
                    </p>
                    <div className="p-2.5 rounded-xl bg-black/25 font-mono text-[11px] space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>إجمالي مسحوبات الشهر:</span>
                        <span>1,950.00 ج.م</span>
                      </div>
                      <div className="flex justify-between text-emerald-300">
                        <span>إجمالي المسدد نقداً:</span>
                        <span>-500.00 ج.م</span>
                      </div>
                      <div className="border-t border-white/20 pt-1 flex justify-between font-bold text-white text-xs">
                        <span>المبلغ المستحق للتسوية:</span>
                        <span className="text-amber-300 text-sm">1,450.00 ج.م</span>
                      </div>
                    </div>
                    {/* PDF attachment card */}
                    <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-[10px]">
                          PDF
                        </div>
                        <div>
                          <p className="font-bold text-white">كشف_حساب_أكتوبر_محمود_السيد.pdf</p>
                          <p className="text-[9px] text-slate-300 font-mono">142 KB • تقرير مالي رسمي</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="p-2 rounded-xl bg-cyan-900/60 text-[10px] text-cyan-200">
                      💡 موعد التسوية المعتاد حتى 5 نوفمبر. يمكنكم السداد كاش بالصيدلية أو عبر إنستاباي برقمنا المعتمد.
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[9px] text-white/70">
                      <span>شاكرين ثقتكم الغالية وتعاونكم المثمر 🌿</span>
                      <span className="font-mono flex items-center gap-0.5">11:59 م <CheckCheck className="w-3 h-3 text-cyan-300" /></span>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom System Footer Guarantee */}
              <div className="text-center pt-1 border-t border-slate-800">
                <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>توليد وإرسال تلقائي 100% بواسطة CREDO PHARMA دون تدخل بشري</span>
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Deep-Dive Pillars of the Credit System (1000% Precision) */}
        <div className="mt-8 pt-12 border-t border-primary-200/80 dark:border-primary-800/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              كيف تحميك هذه المنظومة من خسائر الديون المعدومة بنسبة 1000%؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              أربع ركائز صلبة تضمن لك تحصيل أموالك بالكامل دون أدنى إحراج أو مجاملات من فريق الكاشير
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-right">
            
            {/* Pillar 1 */}
            <div className="p-5 rounded-3xl glass-card border border-rose-200/80 dark:border-rose-900/40 relative overflow-hidden group hover:border-rose-400 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold mb-3 shadow-xs">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-2">
                1. قفل برمجي صارم (Hard-Stop)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                لا مجال للمجاملات أو النسيان! بمجرد أن يصل رصيد العميل للحد الأقصى (مثلاً 2,500 ج.م)، السيستم يقفل شاشة البيع بالآجل تلقائياً، ولا يمكن لأي كاشير تمرير الفاتورة إلا بسداد نقدي أو بباسورد المدير المباشر.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 rounded-3xl glass-card border border-emerald-200/80 dark:border-emerald-900/40 relative overflow-hidden group hover:border-emerald-400 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-3 shadow-xs">
                <Receipt className="w-5 h-5" />
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-2">
                2. إشعار فوري لكل فاتورة ودَفعة
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                يقضي تماماً على مقولة «أنا ما أخدتش الكلام ده» أو «أنا سددت وأنتم مسجلتوش»! فور أخذ أي صنف أو دفع أي قرش، يصله إشعار واتساب بالأصناف المسحوبة والرصيد المتبقي بدقة متناهية.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 rounded-3xl glass-card border border-amber-200/80 dark:border-amber-900/40 relative overflow-hidden group hover:border-amber-400 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-3 shadow-xs">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-2">
                3. تنبيهات منتصف ونهاية الشهر
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                متابعة دورية مبرمجة: رسالة لطيفة يوم 15 في الشهر لتذكيره بمسحوباته الحالية لتفادي صدمة الأرقام، تليها مطالبة أنيقة مع كشف حساب PDF يوم 30 في الشهر تحدد موعد التسوية بدقة واحترافية.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-5 rounded-3xl glass-card border border-cyan-200/80 dark:border-cyan-900/40 relative overflow-hidden group hover:border-cyan-400 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold mb-3 shadow-xs">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-2">
                4. السداد الرقمي (InstaPay & كاش)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                الرسالة تتضمن خيارات السداد الفوري عبر محفظة الصيدلية (فودافون كاش أو حساب إنستاباي)، مما يُمكّن العميل من تسوية حسابه فوراً بضغطة زر من منزله دون الحاجة للانتظار حتى ينزل للصيدلية.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
