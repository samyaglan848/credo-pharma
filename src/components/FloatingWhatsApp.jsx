import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const whatsappUrl = "https://wa.me/201060945097?text=" + encodeURIComponent("السلام عليكم، أود تجربة برنامج CREDO PHARMA وتحميل النسخة التجريبية");

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      
      {tooltipVisible && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-darkcard text-slate-800 dark:text-slate-100 text-xs font-bold shadow-xl border border-emerald-400/40 animate-bounce">
          <span>اطلب نسختك التجريبية وتفعيلك الآن عبر الواتساب!</span>
          <button 
            onClick={() => setTooltipVisible(false)} 
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-110 active:scale-95 group relative"
        title="تواصل معنا عبر الواتساب"
        aria-label="WhatsApp Contact"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-tangerine-500 border-2 border-white dark:border-darkcard animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-tangerine-500 border-2 border-white dark:border-darkcard" />
        <MessageCircle className="w-7 h-7" />
      </a>

    </div>
  );
}
