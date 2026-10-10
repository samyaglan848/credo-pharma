import React, { useState, useEffect } from 'react';
import { useCredoConfig } from '../context/CredoConfigContext.jsx';
import { Moon, Sun, Download, Menu, X } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, onOpenDownloadModal }) {
  const { whatsappNumber, trialDays } = useCredoConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'شاشة البيع', href: '#pos' },
    { name: 'الذكاء والواتساب', href: '#ai' },
    { name: 'العملاء والآجل', href: '#clients' },
    { name: 'دليل الأدوية', href: '#drugs' },
    { name: 'المخازن والفروع', href: '#warehouses' },
    { name: 'الباقات والأسعار', href: '#pricing' },
    { name: 'حاسبة التوفير', href: '#calculator' },
    { name: 'الأسئلة الشائعة', href: '#faq' },
  ];

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=` + encodeURIComponent(`السلام عليكم، أود تجربة برنامج CREDO PHARMA وتحميل النسخة التجريبية (${trialDays} يوماً) والتفعيل.`);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-2 shadow-lg shadow-primary-950/15 dark:shadow-black/70 bg-white/95 dark:bg-[#02475e]/95 backdrop-blur-md' 
        : 'py-2 sm:py-2.5 shadow-md shadow-primary-950/10 dark:shadow-black/60 bg-white dark:bg-[#02475e]'
    } border-b-2 border-primary-600 dark:border-cyan-400/80`}>
      {/* Sharp Decorative Top Strip echoing the brand logo gradient */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-amber-400 to-tangerine-500" />

      <div className="w-full max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-5 xl:px-8">
        
        {/* Single Row: Logo + Nav Items + Actions */}
        <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-5">
          {/* Right (Start in RTL): Logo with Version Badge tucked underneath at the corner */}
          <div className="relative shrink-0">
            <a 
              href="#hero" 
              className="flex items-center select-none transition-transform duration-200 hover:scale-[1.02] active:scale-95 shrink-0"
              title="CREDO PHARMA"
            >
              <img 
                src={darkMode ? '/logo-dark.png' : '/logo-light.png'} 
                alt="CREDO PHARMA Logo" 
                className="h-8 sm:h-9 lg:h-8 xl:h-9.5 w-auto object-contain select-none transition-all duration-300 drop-shadow-sm"
              />
            </a>

            {/* Version Badge - Under the logo at the corner, compact and stylish */}
            <span className="absolute -bottom-2.5 start-1 inline-flex items-center text-[7.5px] sm:text-[8px] font-extrabold font-jakarta tracking-wider px-1 py-[0.5px] leading-tight rounded bg-cyan-100/90 text-primary-950 border border-cyan-300/80 dark:bg-[#013545]/90 dark:text-cyan-200 dark:border-cyan-300/60 shadow-2xs select-none pointer-events-none">
              v1.0.31
            </span>
          </div>

          {/* Center: Desktop Navigation Links (Properly balanced font size, tight padding & spacing to avoid any crowding) */}
          <nav className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1.5 2xl:gap-2.5 flex-1 min-w-0 font-readex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-1.5 xl:px-2 2xl:px-2.5 py-1 text-[10px] xl:text-[11px] 2xl:text-[11.5px] font-bold rounded-lg text-slate-800 hover:text-cyan-700 hover:bg-cyan-100/80 dark:text-slate-100 dark:hover:text-cyan-200 dark:hover:bg-white/10 transition-all duration-200 whitespace-nowrap shrink-0 tracking-tight"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Left (End in RTL): Actions (Theme Toggle, WhatsApp CTA Button, Mobile Hamburger) */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 sm:p-2 rounded-xl border-2 border-primary-200 dark:border-cyan-300/60 bg-primary-50 dark:bg-[#013545] text-slate-800 dark:text-amber-300 hover:bg-primary-100 dark:hover:bg-[#012d3b] transition shadow-xs cursor-pointer shrink-0"
              title={darkMode ? "التبديل إلى وضع النهار" : "التبديل إلى وضع الليل"}
              aria-label="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-spin-slow" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-700" />}
            </button>

            {/* Download CTA Button */}
            <button
              onClick={onOpenDownloadModal}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl font-bold font-readex text-[11px] xl:text-xs text-white bg-gradient-to-r from-tangerine-500 via-tangerine-600 to-tangerine-700 hover:from-tangerine-600 hover:to-tangerine-800 shadow-glow-tangerine transition-all duration-200 hover:scale-[1.02] active:scale-95 border border-white/25 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap tracking-normal">تحميل البرنامج</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border-2 border-primary-200 dark:border-cyan-400/80 lg:hidden text-slate-800 dark:text-white bg-primary-50 dark:bg-[#013545] shrink-0"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-white dark:bg-[#02475e] border-2 border-primary-600 dark:border-cyan-400 shadow-2xl space-y-2 animate-fadeIn font-readex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-bold rounded-xl text-slate-800 hover:text-cyan-700 hover:bg-cyan-100 dark:text-white dark:hover:bg-white/15 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDownloadModal();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-xs text-white bg-tangerine-500 hover:bg-tangerine-600 shadow-glow-tangerine cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تحميل وتجربة البرنامج</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
