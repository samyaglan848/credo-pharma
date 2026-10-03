import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import InteractivePos from './components/InteractivePos.jsx';
import AiWhatsAppDemo from './components/AiWhatsAppDemo.jsx';
import ClientLedgerDemo from './components/ClientLedgerDemo.jsx';
import DrugSearchDemo from './components/DrugSearchDemo.jsx';
import ShortagesOrdersDemo from './components/ShortagesOrdersDemo.jsx';
import WarehouseCompare from './components/WarehouseCompare.jsx';
import CloudSecurity from './components/CloudSecurity.jsx';
import RoiCalculator from './components/RoiCalculator.jsx';
import TestimonialsFaq from './components/TestimonialsFaq.jsx';
import PricingCtaSection from './components/PricingCtaSection.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('credo_theme_mode');
    if (saved) return saved === 'dark';
    return false; // Default to clean, modern daytime light mode
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('credo_theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('credo_theme_mode', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#f0f8fa] text-slate-800 dark:bg-[#01141c] dark:text-slate-100 transition-colors duration-300 font-cairo overflow-x-hidden selection:bg-tangerine-500 selection:text-white">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero darkMode={darkMode} />
        <InteractivePos />
        <AiWhatsAppDemo />
        <ClientLedgerDemo />
        <DrugSearchDemo />
        <ShortagesOrdersDemo />
        <WarehouseCompare />
        <CloudSecurity />
        <RoiCalculator />
        <TestimonialsFaq />
        <PricingCtaSection />
      </main>
      <Footer darkMode={darkMode} />
      <FloatingWhatsApp />
    </div>
  );
}
