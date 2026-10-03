import React, { useState, useEffect } from 'react';
import { 
  Download, Play, ShieldCheck, Zap, TrendingUp, Users, 
  ShoppingCart, Sparkles, Clock, ArrowUpRight, Award, 
  Database, Bot, LayoutDashboard, PackageSearch, Building2, Store,
  Send, Wallet, AlertTriangle, Package
} from 'lucide-react';

export default function Hero({ darkMode }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const whatsappUrl = "https://wa.me/201060945097?text=" + encodeURIComponent("السلام عليكم، أود تجربة برنامج CREDO PHARMA وتحميل النسخة التجريبية والتفعيل.");

  return (
    <section id="hero" className="relative pt-24 pb-14 lg:pt-32 lg:pb-20 overflow-hidden font-cairo">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 right-5 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-cyan-400/15 dark:bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-tangerine-400/15 dark:bg-tangerine-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag Badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-300/60 dark:border-cyan-500/30 text-xs sm:text-sm font-semibold text-primary-800 dark:text-cyan-300 shadow-2xs animate-pulse-subtle font-cairo">
            <Sparkles className="w-3.5 h-3.5 text-tangerine-500" />
            <span>المصنف كأفضل وأسرع سيستم إدارة صيدليات في مصر</span>
            <span className="w-1.5 h-1.5 rounded-full bg-tangerine-500" />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[54px] font-black tracking-normal text-slate-900 dark:text-white font-cairo mb-6 sm:mb-8">
            <span className="flex flex-col items-center justify-center gap-3 sm:gap-4.5">
              <span className="leading-[1.3] sm:leading-[1.25]">
                صيدليتك في أعلى درجات السرعة والذكاء مع
              </span>
              <span 
                dir="ltr" 
                className="gradient-text-tangerine font-black font-cairo inline-block tracking-wide"
              >
                CREDO PHARMA
              </span>
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 font-normal leading-[1.8] sm:leading-[1.9] max-w-3xl mx-auto mb-8 font-cairo">
            الخيار الأول لصيادلة مصر: يجمع بين <span className="font-bold text-slate-900 dark:text-white">أفضل برنامج صيدليات في مصر</span> و<span className="font-semibold text-primary-700 dark:text-cyan-400">أسرع سيستم إدارة صيدليات</span> بالذكاء الاصطناعي مع <span className="font-semibold text-tangerine-600 dark:text-tangerine-400">مساعد واتساب</span> يتابع فروعك، وأضخم مرجع لـ <span className="font-semibold text-primary-700 dark:text-cyan-400">+26 ألف دواء وبديل معتمد</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-tangerine-500 via-tangerine-600 to-tangerine-700 hover:from-tangerine-600 hover:to-tangerine-800 shadow-glow-tangerine transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تحميل وتجربة النسخة المجانية</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-medium">واتساب مباشر</span>
            </a>

            <a
              href="#pos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-primary-900 dark:text-slate-100 glass-panel border border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/50 shadow-2xs transition hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 text-cyan-500 fill-cyan-500" />
              <span>جولة تفاعلية في شاشات السيستم</span>
            </a>
          </div>

          {/* 8 Core Feature Navigation Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3.5 max-w-5xl mx-auto mb-14 text-right">
            {[
              {
                id: 'pos',
                title: 'أقل من 3 ثوانٍ',
                subtitle: 'لإنهاء وطباعة فاتورة البيع',
                icon: Zap,
                iconBg: 'bg-cyan-100 dark:bg-cyan-950/80',
                iconColor: 'text-cyan-600 dark:text-cyan-400',
              },
              {
                id: 'ai',
                title: 'مساعد واتساب ذكي',
                subtitle: 'متابعة أرباحك وفروعك من جيبك',
                icon: Bot,
                iconBg: 'bg-tangerine-100 dark:bg-tangerine-950/80',
                iconColor: 'text-tangerine-600 dark:text-tangerine-400',
              },
              {
                id: 'clients',
                title: 'متابعة العملاء وقفل الآجل',
                subtitle: 'إشعار فواتير وسداد وقفل تلقائي للحد الأقصى',
                icon: Users,
                iconBg: 'bg-primary-100 dark:bg-primary-950/80',
                iconColor: 'text-primary-600 dark:text-cyan-400',
              },
              {
                id: 'drugs',
                title: 'البحث بالسوق المصري',
                subtitle: '+26,000 دواء بأسعارها وبدائلها',
                icon: Database,
                iconBg: 'bg-cyan-100 dark:bg-cyan-950/80',
                iconColor: 'text-cyan-600 dark:text-cyan-400',
              },
              {
                id: 'shortages',
                title: 'إرسال النواقص بضغطة زر',
                subtitle: 'طلبيات فورية للمخازن والشركات',
                icon: Send,
                iconBg: 'bg-emerald-100 dark:bg-emerald-950/80',
                iconColor: 'text-emerald-600 dark:text-emerald-400',
              },
              {
                id: 'warehouses',
                title: 'إمكانية تعدد الفروع',
                subtitle: 'ربط سحابي ومزامنة حية للمخزون',
                icon: Building2,
                iconBg: 'bg-tangerine-100 dark:bg-tangerine-950/80',
                iconColor: 'text-tangerine-600 dark:text-tangerine-400',
              },
              {
                id: 'security',
                title: 'أوفلاين 100% بدون نت',
                subtitle: 'مع نسخ احتياطي مشفر سحابياً',
                icon: ShieldCheck,
                iconBg: 'bg-emerald-100 dark:bg-emerald-950/80',
                iconColor: 'text-emerald-600 dark:text-emerald-400',
              },
              {
                id: 'calculator',
                title: 'حاسبة التوفير والأرباح',
                subtitle: 'منع خسائر الرواكد والصلاحية',
                icon: TrendingUp,
                iconBg: 'bg-primary-100 dark:bg-primary-950/80',
                iconColor: 'text-primary-600 dark:text-cyan-400',
              },
            ].map((feat) => (
              <a
                key={feat.id}
                href={`#${feat.id}`}
                className="p-3 sm:p-3.5 rounded-2xl glass-card border border-primary-200/80 dark:border-primary-800/80 hover:border-cyan-400 dark:hover:border-cyan-400 flex items-center justify-between gap-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-cyan-950/50 group cursor-pointer text-right select-none"
                title={`انتقل إلى قسم ${feat.title}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${feat.iconBg} ${feat.iconColor} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110 shadow-2xs`}>
                    <feat.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {feat.title}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate leading-tight">
                      {feat.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-all transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Live System Preview Mockup */}
        <div className="relative max-w-6xl mx-auto rounded-3xl p-2 sm:p-3 glass-panel border border-cyan-400/40 dark:border-cyan-500/30 shadow-2xl">
          
          <div className="rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-inner">
            
            {/* Title Bar */}
            <div className="px-4 py-2 bg-slate-100/90 dark:bg-darkbg/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="font-semibold text-slate-600 dark:text-slate-300 mr-2">CREDO PHARMA Desktop</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-jakarta font-bold">
                  <Clock className="w-3.5 h-3.5 text-cyan-500" />
                  {time}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-[11px]">
                  وردية الصباح مفتوحة
                </span>
              </div>
            </div>

            {/* Window Content */}
            <div className="flex flex-col lg:flex-row">
              
              {/* REALISTIC SIDEBAR */}
              <div className="w-full lg:w-56 bg-slate-50/80 dark:bg-darkbg/95 border-b lg:border-b-0 lg:border-l border-slate-200 dark:border-slate-800/80 flex flex-col p-3 flex-shrink-0 select-none">
                
                {/* Logo Section */}
                <div className="border-b border-slate-200 dark:border-slate-800/60 pb-3 mb-3 text-center">
                  <img
                    src={darkMode ? '/logo-dark.png' : '/logo-light.png'}
                    alt="Credo Logo"
                    className="w-full max-h-20 sm:max-h-24 object-contain select-none mx-auto"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1.5">
                    جميع حساباتك في أمان
                  </p>
                </div>

                {/* Branch Chip */}
                <div className="py-2 px-2.5 rounded-xl bg-cyan-50 dark:bg-slate-800/70 border border-cyan-200 dark:border-slate-700/80 flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Store className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="text-[10px] text-primary-700 dark:text-slate-400 font-semibold whitespace-nowrap">الفرع:</span>
                    <span className="text-[11px] font-bold text-primary-900 dark:text-white truncate">الفرع الرئيسي</span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-1 text-xs font-semibold hidden sm:block">
                  <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 flex items-center gap-2 border border-cyan-500/30">
                    <LayoutDashboard className="w-3.5 h-3.5 text-cyan-500" />
                    <span>لوحة التحكم الرئيسية</span>
                  </div>
                  <div className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 flex items-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5 text-emerald-500" />
                    <span>نقطة البيع (POS)</span>
                  </div>
                  <div className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-blue-500" />
                    <span>المشتريات وفواتير الشركات</span>
                  </div>
                  <div className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 flex items-center gap-2">
                    <Wallet className="w-3.5 h-3.5 text-amber-500" />
                    <span>الخزينة وحسابات الدرج</span>
                  </div>
                  <div className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    <span>النواقص والطلبيات</span>
                  </div>
                  <div className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-cyan-600" />
                    <span>العملاء والآجل</span>
                  </div>
                  <div className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 flex items-center gap-2">
                    <PackageSearch className="w-3.5 h-3.5 text-indigo-500" />
                    <span>دليل استعلام الأدوية</span>
                  </div>
                  <div className="p-2 rounded-xl text-tangerine-600 dark:text-tangerine-400 bg-tangerine-50/50 dark:bg-tangerine-950/20 flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5" />
                    <span>مساعد الذكاء والواتساب</span>
                  </div>
                </div>

              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-4 sm:p-5 bg-slate-50/40 dark:bg-darkcard/40 space-y-4">
                
                {/* 4 Real System Dashboard Tiles (Exact Colors: Sales=Green, Purchases=Blue, Cash=Orange, Shortages=Red) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  
                  {/* Tile 1: المبيعات (أخضر / Green) */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-emerald-950/40 dark:via-darksurface dark:to-emerald-950/20 border-2 border-emerald-400 dark:border-emerald-500/70 shadow-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 text-xs mb-1.5 font-bold">
                      <span className="text-emerald-800 dark:text-emerald-300 font-extrabold text-xs">المبيعات</span>
                      <span className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                        <ShoppingCart className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 font-jakarta">
                      18,450.00 <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-cairo">ج.م</span>
                    </div>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold flex items-center gap-1 font-jakarta">
                      <ArrowUpRight className="w-3 h-3" /> +14.2% (142 فاتورة)
                    </p>
                  </div>

                  {/* Tile 2: المشتريات (أزرق / Blue) */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50/30 dark:from-blue-950/40 dark:via-darksurface dark:to-blue-950/20 border-2 border-blue-400 dark:border-blue-500/70 shadow-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 text-xs mb-1.5 font-bold">
                      <span className="text-blue-800 dark:text-blue-300 font-extrabold text-xs">المشتريات</span>
                      <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Package className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-blue-700 dark:text-blue-400 font-jakarta">
                      9,280.00 <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-cairo">ج.م</span>
                    </div>
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 font-semibold flex items-center gap-1">
                      3 فواتير توريد مستلمة
                    </p>
                  </div>

                  {/* Tile 3: الخزينة والدرج (برتقالي / Orange) */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-orange-50/30 dark:from-amber-950/40 dark:via-darksurface dark:to-amber-950/20 border-2 border-amber-400 dark:border-amber-500/70 shadow-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 text-xs mb-1.5 font-bold">
                      <span className="text-amber-800 dark:text-amber-300 font-extrabold text-xs">الخزينة والدرج</span>
                      <span className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                        <Wallet className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-amber-700 dark:text-amber-400 font-jakarta">
                      12,370.00 <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-cairo">ج.م</span>
                    </div>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1">
                      رصيد الدرج الفعلي (مطابق)
                    </p>
                  </div>

                  {/* Tile 4: النواقص (أحمر / Red) */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-50 via-white to-red-50/30 dark:from-rose-950/40 dark:via-darksurface dark:to-rose-950/20 border-2 border-rose-400 dark:border-rose-500/70 shadow-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 text-xs mb-1.5 font-bold">
                      <span className="text-rose-800 dark:text-rose-300 font-extrabold text-xs">النواقص</span>
                      <span className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center shadow-xs">
                        <AlertTriangle className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-rose-700 dark:text-rose-400 font-jakarta">
                      16 <span className="text-xs font-bold text-rose-600 font-cairo">صنف ناقص</span>
                    </div>
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-semibold flex items-center gap-1">
                      تنبيه فوري لعمل طلبيات
                    </p>
                  </div>

                </div>

                {/* Sales & Purchases Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
                  <div className="lg:col-span-2 p-3.5 rounded-2xl bg-white dark:bg-darksurface border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <ShoppingCart className="w-4 h-4 text-emerald-500" />
                        آخر العمليات والفواتير الصادرة لحظياً (Live Feed)
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">تحديث تلقائي</span>
                    </div>

                    <div className="space-y-1.5 text-xs font-jakarta">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-darkcard/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700 dark:text-slate-200">#INV-8941</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold font-cairo">فاتورة بيع</span>
                          <span className="text-slate-500 text-[11px] font-cairo">أوجمنتين 1 جم + بانادول إكسترا</span>
                        </div>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">179.00 ج.م</span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-darkcard/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700 dark:text-slate-200">#INV-8940</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold font-cairo">آجل عميل</span>
                          <span className="text-slate-500 text-[11px] font-cairo">أ/ محمود السيد (إشعار واتساب مُرسل)</span>
                        </div>
                        <span className="font-bold text-amber-600 dark:text-amber-400">340.50 ج.م</span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-darkcard/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700 dark:text-slate-200">#PO-512</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold font-cairo">فاتورة مشتريات</span>
                          <span className="text-slate-500 text-[11px] font-cairo">شركة ابن سينا فارما (توريد مخزن)</span>
                        </div>
                        <span className="font-bold text-blue-600 dark:text-blue-400">4,120.00 ج.م</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-darksurface border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-white">حالة الفروع والمخازن</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="font-semibold text-slate-700 dark:text-slate-200">الفرع الرئيسي</span>
                            <span className="text-emerald-600 font-bold font-jakarta">12,150 ج.م</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: '75%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="font-semibold text-slate-700 dark:text-slate-200">فرع المحطة</span>
                            <span className="text-emerald-600 font-bold font-jakarta">6,300 ج.م</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full bg-tangerine-500 rounded-full" style={{ width: '45%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="font-semibold text-slate-700 dark:text-slate-200">مخزن الأدوية العام</span>
                            <span className="text-cyan-600 font-bold">مخزون مكتمل</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>مزامنة سحابية Google Drive</span>
                      <span className="text-emerald-500 font-bold">ناجحة ✓</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
