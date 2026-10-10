import React, { useState } from 'react';
import { useCredoConfig } from '../context/CredoConfigContext.jsx';
import { 
  Check, 
  Sparkles, 
  Bot, 
  Zap, 
  ShieldCheck, 
  Infinity as InfinityIcon, 
  Building2, 
  Store, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Star, 
  Flame, 
  PhoneCall, 
  BadgePercent, 
  RefreshCw, 
  Gift,
  Network
} from 'lucide-react';

export default function PricingSection({ onOpenDownloadModal }) {
  const { plans: livePlans, whatsappNumber, trialDays, isLiveConnected } = useCredoConfig();
  // Billing cycle for Core Software: 'monthly' | 'quarterly' | 'yearly' | 'lifetime'
  const [coreCycle, setCoreCycle] = useState('yearly');

  // Selected core tier for active highlight: 'basic' | 'pro' | 'ultra'
  const [selectedTier, setSelectedTier] = useState('pro');

  // Comparison table toggle
  const [showComparison, setShowComparison] = useState(false);

  // Plans Data Matrix
  const corePlans = {
    basic: {
      id: 'basic',
      name: 'الباقة العادية',
      englishName: 'Credo Standard',
      icon: Store,
      badge: 'الأساس المتكامل لكل صيدلية',
      description: 'نظام متكامل يشمل كل ما تحتاجه الصيدلية لإدارة البيع، الشراء، المخازن، حسابات الموردين، والذكاء الاصطناعي.',
      prices: {
        monthly: livePlans?.basic?.prices?.monthly ?? 300,
        quarterly: livePlans?.basic?.prices?.quarterly ?? 800,
        yearly: livePlans?.basic?.prices?.yearly ?? 2500,
        lifetime: livePlans?.basic?.prices?.lifetime ?? 6500,
      },
      hasWhatsapp: false,
      hasMultiBranch: false,
      maxDevices: 'جهاز كاشير رئيسي واحد (1 Device)',
      specs: [
        { label: 'نقطة بيع كاشير فائقة السرعة (POS) وإصدار الفواتير', included: true },
        { label: 'قاعدة بيانات شاملة 26,000+ دواء محدثة', included: true },
        { label: 'إدارة المبيعات، المشتريات، المخزون، والجرد الدوري', included: true },
        { label: 'حسابات الموردين المتقدمة، الفواتير الآجلة، والشيكات', included: true },
        { label: 'تقارير أرباح يومية وشهرية وتحليل هوامش الربح', included: true },
        { label: 'المساعد الصيدلي بالذكاء الاصطناعي', included: true, ai: true },
        { label: 'تنبيهات الصلاحيات، رواكد الأدوية، والنسخ الاحتياطي', included: true },
        { label: 'جهاز كاشير رئيسي واحد (1 Device)', included: true },
        { label: 'دعم فني وتدريب صيدلي كامل مجاناً', included: true },
        { label: 'ربط منظومة الواتساب السحابية وكروت العملاء', included: false },
        { label: 'تعدد الفروع والربط السحابي المركزي', included: false },
      ],
      highlight: false,
    },
    pro: {
      id: 'pro',
      name: 'باقة برو الاحترافية',
      englishName: 'Credo Pro ⭐',
      icon: Zap,
      badge: 'الأكثر طلباً ومبيعاً بين الصيادلة',
      popular: true,
      description: 'كل مميزات النظام الأساسي والذكاء الاصطناعي + منظومة الواتساب الخارقة للتواصل التلقائي ومضاعفة المبيعات.',
      prices: {
        monthly: livePlans?.pro?.prices?.monthly ?? 450,
        quarterly: livePlans?.pro?.prices?.quarterly ?? 1500,
        yearly: livePlans?.pro?.prices?.yearly ?? 3500,
        lifetime: livePlans?.pro?.prices?.lifetime ?? 7500,
      },
      hasWhatsapp: true,
      hasMultiBranch: false,
      maxDevices: 'حتى 3 أجهزة على نفس الشبكة المحلية',
      specs: [
        { label: 'كل مميزات النظام الأساسي وإدارة الصيدلية بالكامل', included: true },
        { label: 'المساعد الصيدلي بالذكاء الاصطناعي', included: true, ai: true },
        { label: 'ترخيص حتى 3 أجهزة كاشير وصيادلة على نفس الشبكة', included: true },
        { label: 'التواصل مع العملاء تلقائياً وإرسال الفواتير عبر الواتساب', included: true, super: true },
        { label: 'كروت العملاء الرقمية وإرسال التنبيهات الشهرية للحسابات والعملاء', included: true, super: true },
        { label: 'إرسال النواقص بضغطة زر للموردين عبر الواتساب', included: true, super: true },
        { label: 'سؤال واستشارة المساعد الذكي مباشرة من الهاتف عبر الواتساب', included: true, super: true },
        { label: 'دعم فني سريع بأولوية متقدمة', included: true },
        { label: 'تعدد الفروع والربط السحابي المركزي', included: false },
      ],
      highlight: true,
    },
    ultra: {
      id: 'ultra',
      name: 'باقة ألترا الشاملة',
      englishName: 'Credo Ultra 🚀',
      icon: Building2,
      badge: 'للسلاسل والفروع والنمو السريع',
      popular: false,
      description: 'الباقة الخارقة الشاملة: كل مميزات السيستم والذكاء الاصطناعي ومنظومة الواتساب + إدارة مركزية للفروع المتعددة.',
      prices: {
        monthly: livePlans?.ultra?.prices?.monthly ?? 750,
        quarterly: livePlans?.ultra?.prices?.quarterly ?? 2100,
        yearly: livePlans?.ultra?.prices?.yearly ?? 5000,
        lifetime: livePlans?.ultra?.prices?.lifetime ?? 9000,
      },
      hasWhatsapp: true,
      hasMultiBranch: true,
      maxDevices: 'عدد أجهزة وصيادلة غير محدود',
      specs: [
        { label: 'كل مميزات باقة برو ومنظومة الواتساب بالكامل', included: true },
        { label: 'المساعد الصيدلي بالذكاء الاصطناعي', included: true, ai: true },
        { label: 'منظومة الواتساب الشاملة بكامل خصائصها', included: true, super: true },
        { label: 'إدارة وربط الفروع المتعددة مركزياً في شاشة تحكم واحدة', included: true, super: true },
        { label: 'مزامنة سحابية لحظية بين الفروع والمخزن الرئيسي', included: true, super: true },
        { label: 'تحويل ونقل الأدوية والنواقص بين الصيدليات بنقرة زر', included: true, super: true },
        { label: 'تقارير أرباح ومبيعات مجمعة ومقارنة أداء الفروع لحظياً', included: true, super: true },
        { label: 'عدد أجهزة وصيادلة غير محدود لجميع الفروع', included: true, super: true },
        { label: 'مدير حساب مخصص (Dedicated Account Manager)', included: true },
        { label: 'أولوية دعم فني قصوى VIP على مدار الساعة', included: true },
      ],
      highlight: false,
    }
  };

  // Helpers for labels
  const getCycleLabel = (cycle) => {
    switch (cycle) {
      case 'monthly': return 'شهرياً';
      case 'quarterly': return 'كل 3 شهور';
      case 'yearly': return 'سنوياً';
      case 'lifetime': return 'دفعة واحدة (مدى الحياة)';
      default: return '';
    }
  };

  // Construct dynamic WhatsApp checkout link directly for each plan
  const buildPlanOrderLink = (planId) => {
    const activePlan = corePlans[planId];
    const price = activePlan.prices[coreCycle];

    let msg = `السلام عليكم ورحمة الله،\nأود الاشتراك في برنامج CREDO PHARMA:\n\n`;
    msg += `📌 الباقة المختارة: ${activePlan.name} (${activePlan.englishName})\n`;
    msg += `⏱️ دورة الدفع: ${getCycleLabel(coreCycle)}\n`;
    msg += `💰 القيمة: ${price.toLocaleString('ar-EG')} ج.م\n\n`;

    if (activePlan.hasWhatsapp) {
      msg += `💬 المميزات المفعلة في الباقة:\n`;
      msg += `   • التواصل مع العملاء تلقائياً وإرسال الفواتير عبر الواتساب\n`;
      msg += `   • كروت العملاء الرقمية وإرسال التنبيهات الشهرية للحسابات والعملاء\n`;
      msg += `   • إرسال النواقص بضغطة زر للموردين عبر الواتساب\n`;
      msg += `   • سؤال واستشارة المساعد الذكي من الهاتف عبر الواتساب\n`;
    }

    if (activePlan.hasMultiBranch) {
      msg += `🏢 منظومة السلاسل والفروع: مفعلة (ربط مركزي ومزامنة سحابية)\n`;
    }

    msg += `\nبرجاء تأكيد الطلب وتحديد موعد التفعيل والتدريب. شكراً لكم!`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="pricing" className="py-20 lg:py-28 relative overflow-hidden font-cairo">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/10 dark:bg-cyan-400/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-0 w-[550px] h-[550px] rounded-full bg-tangerine-500/10 dark:bg-tangerine-400/5 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm font-bold mb-4 border border-cyan-300 dark:border-cyan-800/80 shadow-xs">
            <BadgePercent className="w-4 h-4 text-tangerine-500 animate-bounce" />
            <span>باقات واضحة وعادلة تناسب ميزانية واحتياج كل صيدلية</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-5 leading-tight">
            اختر باقتك.. <span className="gradient-text-ocean">وانطلق بإمكانيات خارقة في إدارة صيدليتك</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-tajawal">
            جميع الباقات تشمل أساسيات البيع، الشراء، المخازن، حسابات الموردين، والذكاء الاصطناعي. اختر باقة <span className="font-bold text-tangerine-600 dark:text-tangerine-400">برو</span> لمنظومة الواتساب الخارقة، أو باقة <span className="font-bold text-cyan-600 dark:text-cyan-400">ألترا</span> لإدارة السلاسل والفروع.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 1. Global Billing Cycle Switcher */}
        {/* ======================================================== */}
        <div className="flex justify-center mb-16">
          <div className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-slate-200/80 dark:bg-[#022838] border border-slate-300 dark:border-cyan-500/30 shadow-inner flex flex-wrap items-center justify-center gap-1 sm:gap-2 max-w-2xl w-full">
            
            {/* Monthly */}
            <button
              onClick={() => setCoreCycle('monthly')}
              className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer text-center ${
                coreCycle === 'monthly'
                  ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-white shadow-md scale-102'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              شهرياً
            </button>

            {/* Quarterly */}
            <button
              onClick={() => setCoreCycle('quarterly')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer relative text-center ${
                coreCycle === 'quarterly'
                  ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-white shadow-md scale-102'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>ربع سنوي</span>
              <span className="block text-[10px] text-cyan-700 dark:text-cyan-300 font-extrabold font-mono">كل 3 شهور</span>
            </button>

            {/* Yearly (Best Value) */}
            <button
              onClick={() => setCoreCycle('yearly')}
              className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer relative text-center ${
                coreCycle === 'yearly'
                  ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-white shadow-md scale-102 ring-2 ring-tangerine-500'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <span>سنوياً</span>
                <Flame className="w-3.5 h-3.5 text-tangerine-500 animate-pulse" />
              </div>
              <span className="block text-[10px] text-tangerine-600 dark:text-amber-300 font-extrabold">أكبر توفير مالي 🔥</span>
            </button>

            {/* Lifetime */}
            <button
              onClick={() => setCoreCycle('lifetime')}
              className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer relative text-center ${
                coreCycle === 'lifetime'
                  ? 'bg-gradient-to-r from-amber-500 to-tangerine-600 text-white shadow-md scale-102'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <InfinityIcon className="w-3.5 h-3.5" />
                <span>شراء دائم</span>
              </div>
              <span className="block text-[10px] text-amber-700 dark:text-amber-200 font-extrabold">ترخيص مدى الحياة 💎</span>
            </button>

          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. Core Pricing Cards Grid (Basic, Pro, Ultra) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          
          {Object.values(corePlans).map((plan) => {
            const Icon = plan.icon;
            const price = plan.prices[coreCycle];
            const isSelected = selectedTier === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedTier(plan.id)}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col cursor-pointer ${
                  plan.popular 
                    ? 'glass-panel border-2 border-tangerine-500 shadow-2xl lg:-translate-y-3 dark:shadow-tangerine-500/10' 
                    : isSelected
                    ? 'glass-card border-2 border-cyan-500 shadow-xl dark:border-cyan-400'
                    : 'glass-card border border-slate-200 dark:border-cyan-900/60 hover:border-cyan-400/60 shadow-lg'
                } p-6 sm:p-8`}
              >
                {/* Popular Ribbon for Pro */}
                {plan.popular && (
                  <div className="absolute -top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-tangerine-500 to-amber-500 text-white text-xs font-black shadow-glow-tangerine flex items-center gap-1.5 whitespace-nowrap">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>الباقة الأكثر اختياراً بين الصيادلة ⭐</span>
                  </div>
                )}

                {/* Ultra Ribbon */}
                {plan.id === 'ultra' && (
                  <div className="absolute -top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-black shadow-glow-cyan flex items-center gap-1.5 whitespace-nowrap">
                    <Network className="w-3.5 h-3.5" />
                    <span>الباقة الأقوى للسلاسل والفروع 🚀</span>
                  </div>
                )}

                {/* Card Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg mb-2 ${
                      plan.popular
                        ? 'bg-tangerine-100 dark:bg-tangerine-950/80 text-tangerine-800 dark:text-tangerine-300'
                        : 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300'
                    }`}>
                      {plan.badge}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      {plan.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-600 dark:text-cyan-200 font-bold mt-0.5">
                      {plan.englishName}
                    </p>
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    plan.popular
                      ? 'bg-tangerine-100 dark:bg-tangerine-950/60 text-tangerine-600 dark:text-tangerine-400'
                      : plan.id === 'ultra'
                      ? 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400'
                      : 'bg-slate-100 dark:bg-[#02354a] text-slate-700 dark:text-cyan-300'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-tajawal min-h-[44px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="py-5 px-4 rounded-2xl bg-slate-50 dark:bg-[#01222f] border border-slate-200/80 dark:border-cyan-800/60 mb-6 text-center">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
                      {price.toLocaleString('ar-EG')}
                    </span>
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      ج.م
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 mt-1">
                    {coreCycle === 'lifetime' 
                      ? 'دفع لمرة واحدة • ترخيص دائم مدى الحياة'
                      : `تدفع ${getCycleLabel(coreCycle)}`
                    }
                  </div>
                </div>

                {/* Direct Action Buttons on Card */}
                <div className="space-y-2.5 mb-6">
                  <a
                    href={buildPlanOrderLink(plan.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full py-3.5 px-4 rounded-xl font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      plan.popular
                        ? 'bg-gradient-to-r from-tangerine-500 to-tangerine-600 hover:from-tangerine-600 hover:to-tangerine-700 text-white shadow-glow-tangerine'
                        : plan.id === 'ultra'
                        ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white shadow-glow-cyan'
                        : 'bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>طلب وتفعيل {plan.name}</span>
                    <Send className="w-4 h-4 rtl:rotate-180" />
                  </a>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDownloadModal();
                    }}
                    className="w-full py-2 px-3 rounded-lg text-xs font-bold text-slate-600 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Gift className="w-3.5 h-3.5 text-tangerine-500" />
                    <span>أو ابدأ التجربة المجانية {trialDays} يوماً</span>
                  </button>
                </div>

                {/* Specs List */}
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex-1">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                    المواصفات والمميزات المفعلة:
                  </span>
                  {plan.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      {spec.super ? (
                        <Sparkles className="w-4 h-4 text-tangerine-500 shrink-0 mt-0.5 animate-pulse" />
                      ) : spec.ai ? (
                        <Bot className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      ) : spec.included ? (
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-slate-400">
                          -
                        </div>
                      )}
                      <span className={`leading-snug ${
                        spec.super 
                          ? 'text-tangerine-700 dark:text-tangerine-300 font-bold' 
                          : spec.ai
                          ? 'text-cyan-700 dark:text-cyan-300 font-bold'
                          : spec.included 
                          ? 'text-slate-700 dark:text-slate-200 font-medium' 
                          : 'text-slate-400 dark:text-slate-500 line-through'
                      }`}>
                        {spec.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}

        </div>

        {/* ======================================================== */}
        {/* 3. Detailed Feature Comparison Accordion */}
        {/* ======================================================== */}
        <div className="mb-20">
          <div className="text-center mb-6">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-[#022838] border-2 border-cyan-400/60 dark:border-cyan-500/50 text-slate-800 dark:text-cyan-200 font-bold text-sm shadow-md hover:bg-cyan-50 dark:hover:bg-[#02354a] transition cursor-pointer"
            >
              <span>{showComparison ? 'إخفاء جدول المقارنة التفصيلي' : 'عرض جدول المقارنة التفصيلي بين الباقات الثلاث'}</span>
              {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showComparison && (
            <div className="rounded-3xl glass-panel border border-slate-200 dark:border-cyan-900 overflow-x-auto shadow-xl animate-fadeIn">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-[#01222f]">
                    <th className="p-4 sm:p-5 font-black text-slate-900 dark:text-white">الميزة والخاصية</th>
                    <th className="p-4 sm:p-5 font-black text-slate-900 dark:text-white text-center">
                      الباقة العادية
                      <span className="block text-[11px] font-mono text-cyan-600 font-bold">{corePlans.basic.prices[coreCycle]?.toLocaleString("ar-EG")} ج/{getCycleLabel(coreCycle)}</span>
                    </th>
                    <th className="p-4 sm:p-5 font-black text-tangerine-600 dark:text-tangerine-400 text-center">
                      باقة برو ⭐
                      <span className="block text-[11px] font-mono text-tangerine-500 font-bold">{corePlans.pro.prices[coreCycle]?.toLocaleString("ar-EG")} ج/{getCycleLabel(coreCycle)}</span>
                    </th>
                    <th className="p-4 sm:p-5 font-black text-cyan-600 dark:text-cyan-400 text-center">
                      باقة ألترا 🚀
                      <span className="block text-[11px] font-mono text-cyan-500 font-bold">{corePlans.ultra.prices[coreCycle]?.toLocaleString("ar-EG")} ج/{getCycleLabel(coreCycle)}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                  
                  {/* Category: Core System */}
                  <tr className="bg-slate-50/50 dark:bg-slate-900/30">
                    <td colSpan={4} className="p-2.5 px-4 font-black text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">
                      أولاً: الوظائف الأساسية لإدارة الصيدلية (مشمولة في الجميع)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">نقطة البيع (POS) وقاعدة بيانات 26,000+ دواء</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">إدارة المشتريات، المخازن، والجرد الدوري بالباركود</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">حسابات الموردين والشيكات والفواتير الآجلة والتقارير المالية</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">المساعد الصيدلي بالذكاء الاصطناعي</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>

                  {/* Category: WhatsApp Ecosystem */}
                  <tr className="bg-emerald-50/50 dark:bg-emerald-950/20">
                    <td colSpan={4} className="p-2.5 px-4 font-black text-emerald-700 dark:text-emerald-300 text-[11px] uppercase tracking-wider">
                      ثانياً: منظومة الواتساب الخارقة وكروت العملاء (الميزة الحصرية لباقة برو وألترا)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">التواصل مع العملاء تلقائياً وإرسال الفواتير عبر الواتساب</td>
                    <td className="p-4 text-center text-slate-400">-</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">كروت العملاء الرقمية وإرسال التنبيهات الشهرية للحسابات والعملاء</td>
                    <td className="p-4 text-center text-slate-400">-</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">إرسال النواقص بضغطة زر للموردين عبر الواتساب</td>
                    <td className="p-4 text-center text-slate-400">-</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">سؤال واستشارة المساعد الذكي مباشرة من الهاتف عبر الواتساب</td>
                    <td className="p-4 text-center text-slate-400">-</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>

                  {/* Category: Multi-Branch */}
                  <tr className="bg-cyan-50/50 dark:bg-cyan-950/20">
                    <td colSpan={4} className="p-2.5 px-4 font-black text-cyan-700 dark:text-cyan-300 text-[11px] uppercase tracking-wider">
                      ثالثاً: تعدد الفروع والمزامنة المركزية (حصري لباقة ألترا)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">ربط الفروع المتعددة والمخزن الرئيسي سحابياً</td>
                    <td className="p-4 text-center text-slate-400">-</td>
                    <td className="p-4 text-center text-slate-400">-</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">تحويل ونقل النواقص والأدوية بين الصيدليات بنقرة زر</td>
                    <td className="p-4 text-center text-slate-400">-</td>
                    <td className="p-4 text-center text-slate-400">-</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">تقارير مجمعة ومقارنة أداء ومبيعات الفروع لحظياً</td>
                    <td className="p-4 text-center text-slate-400">-</td>
                    <td className="p-4 text-center text-slate-400">-</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  </tr>

                  {/* Category: Licences & Hardware */}
                  <tr className="bg-slate-50/50 dark:bg-slate-900/30">
                    <td colSpan={4} className="p-2.5 px-4 font-black text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">
                      رابعاً: الأجهزة والدعم الفني
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">عدد الأجهزة المرخصة على الشبكة</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">جهاز رئيسي واحد</td>
                    <td className="p-4 text-center font-bold text-tangerine-600 dark:text-tangerine-400">حتى 3 أجهزة</td>
                    <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400">أجهزة غير محدودة</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">مستوى الدعم الفني والتدريب</td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">صيدلي متخصص مجاناً</td>
                    <td className="p-4 text-center font-bold text-tangerine-600 dark:text-tangerine-400">أولوية سريعة</td>
                    <td className="p-4 text-center font-bold text-cyan-600 dark:text-cyan-400">مدير حساب VIP 24/7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 4. Trust Badges */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200 dark:border-slate-800 text-right">
          
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/60 dark:bg-[#01222f]/60 border border-slate-200 dark:border-cyan-900/60">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                بياناتك مشفرة ومحمية 100%
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-tajawal">
                بيانات صيدليتك، عملائك، وفواتيرك ملكك بالكامل ولا يتم مسحها أو فقدانها حتى في حال انتهاء الاشتراك.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/60 dark:bg-[#01222f]/60 border border-slate-200 dark:border-cyan-900/60">
            <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                مرونة الترقية في أي وقت
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-tajawal">
                يمكنك الترقية من العادية إلى برو أو ألترا في أي وقت مع احتساب المدة المتبقية من اشتراكك تلقائياً.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/60 dark:bg-[#01222f]/60 border border-slate-200 dark:border-cyan-900/60">
            <div className="p-2.5 rounded-xl bg-tangerine-100 dark:bg-tangerine-950 text-tangerine-600 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                نقل مجاني للبيانات من برنامجك القديم
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-tajawal">
                يقوم فريقنا بنقل بيانات أدويتك وأرصدتك وعملائك من أي برنامج صيدليات قديم بدون أي رسوم إضافية.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
