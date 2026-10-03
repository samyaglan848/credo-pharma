import React from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

export default function Footer({ darkMode }) {
  const whatsappUrl = "https://wa.me/201060945097?text=" + encodeURIComponent("السلام عليكم، أود التواصل بخصوص برنامج CREDO PHARMA");

  return (
    <footer className="pt-12 pb-8 bg-gradient-to-b from-[#e8f4f8] to-[#d4ebf2] text-slate-700 border-t border-cyan-200/90 dark:bg-gradient-to-b dark:from-[#021017] dark:to-[#010a0f] dark:text-slate-300 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-cyan-200/80 dark:border-slate-800/80 text-right">
          
          {/* Brand Info with clean, natural logo */}
          <div className="md:col-span-2 space-y-3">
            <a href="#hero" className="inline-block mb-1">
              <img 
                src={darkMode ? '/logo-dark.png' : '/logo-light.png'} 
                alt="CREDO PHARMA Logo" 
                className="h-11 sm:h-14 w-auto object-contain select-none transition-all"
              />
            </a>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed font-tajawal">
              المنظومة المصنفة كأفضل برنامج صيدليات في مصر وأسرع سيستم إدارة صيدليات؛ سرعة فائقة في الكاشير، ذكاء اصطناعي تفاعلي، ومتابعة كاملة لصيدليتك من الواتساب في أي مكان في العالم.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 pt-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>الإصدار 1.0.31 - دعم فني متواصل على مدار الأسبوع</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-primary-950 dark:text-white uppercase tracking-wider mb-3 font-readex">أقسام النظام</h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium font-tajawal">
              <li><a href="#hero" className="hover:text-cyan-400 transition">الرئيسية</a></li>
              <li><a href="#pos" className="hover:text-cyan-400 transition">شاشة البيع السريع (POS)</a></li>
              <li><a href="#ai" className="hover:text-cyan-400 transition">مساعد الواتساب الذكي</a></li>
              <li><a href="#clients" className="hover:text-cyan-400 transition">نظام الآجل والديون</a></li>
              <li><a href="#drugs" className="hover:text-cyan-400 transition">دليل 26,000 دواء مصري</a></li>
              <li><a href="#warehouses" className="hover:text-cyan-400 transition">المقارنة بين المخازن</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-primary-950 dark:text-white uppercase tracking-wider mb-3 font-readex">تواصل مباشر</h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-tajawal">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-emerald-400 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="font-jakarta font-bold text-slate-800 dark:text-slate-200">01060945097 (واتساب)</span>
              </a>

              <a 
                href="tel:01001329131" 
                className="flex items-center gap-2 hover:text-cyan-400 transition"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span className="font-jakarta font-bold text-slate-800 dark:text-slate-200">01001329131 (مبيعات)</span>
              </a>

              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-tangerine-500" />
                <span>جمهورية مصر العربية - متاح لكافة المحافظات</span>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keywords Tag Cloud */}
        <div className="py-4 border-b border-cyan-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-tajawal">
          <span className="font-bold text-slate-700 dark:text-slate-300">الكلمات الأكثر بحثاً:</span>
          <a href="#hero" className="px-2.5 py-1 rounded-md bg-white/70 dark:bg-slate-800/70 border border-cyan-200/60 dark:border-slate-700/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition">افضل برنامج صيدليات في مصر</a>
          <a href="#hero" className="px-2.5 py-1 rounded-md bg-white/70 dark:bg-slate-800/70 border border-cyan-200/60 dark:border-slate-700/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition">افضل سيستم صيدليات في مصر</a>
          <a href="#hero" className="px-2.5 py-1 rounded-md bg-white/70 dark:bg-slate-800/70 border border-cyan-200/60 dark:border-slate-700/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition">افضل سيستم ادارة صيدليات في مصر</a>
          <a href="#hero" className="px-2.5 py-1 rounded-md bg-white/70 dark:bg-slate-800/70 border border-cyan-200/60 dark:border-slate-700/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition">اسرع سيستم ادارة صيدليات في مصر</a>
          <a href="#pos" className="px-2.5 py-1 rounded-md bg-white/70 dark:bg-slate-800/70 border border-cyan-200/60 dark:border-slate-700/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition">برنامج كاشير صيدلية</a>
          <a href="#drugs" className="px-2.5 py-1 rounded-md bg-white/70 dark:bg-slate-800/70 border border-cyan-200/60 dark:border-slate-700/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition">دليل أدوية وبدائل مصر</a>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-500 font-tajawal">
          <p>© {new Date().getFullYear()} CREDO PHARMA. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            صُنع بعناية فائقة لخدمة صيادلة مصر والوطن العربي
          </p>
        </div>

      </div>
    </footer>
  );
}
