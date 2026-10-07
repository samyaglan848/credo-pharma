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
import DownloadLeadModal from './components/DownloadLeadModal.jsx';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('credo_theme_mode');
    if (saved) return saved === 'dark';
    return false; // Default to clean, modern daytime light mode
  });

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('credo_theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('credo_theme_mode', 'light');
    }
  }, [darkMode]);

  // Live website visitor tracking
  useEffect(() => {
    let visitorId = localStorage.getItem('credo_visitor_id');
    if (!visitorId) {
      visitorId = 'vis_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
      localStorage.setItem('credo_visitor_id', visitorId);
    }

    const isWindows = /windows/i.test(navigator.userAgent);
    const isMobile = /mobile|iphone|android/i.test(navigator.userAgent);
    const deviceType = isWindows ? 'DESKTOP_WINDOWS' : (isMobile ? 'MOBILE' : 'DESKTOP');

    const sendPing = () => {
      try {
        fetch('http://localhost:3001/api/leads/public/track-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId,
            page: window.location.pathname,
            referrer: document.referrer || null,
            deviceType
          })
        }).catch(() => {});
      } catch (e) {
        // silent fail
      }
    };

    // Send initial visit ping
    sendPing();

    // Ping every 3 minutes while page is open to keep active status updated
    const interval = setInterval(sendPing, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f8fa] text-slate-800 dark:bg-[#01141c] dark:text-slate-100 transition-colors duration-300 font-cairo overflow-x-hidden selection:bg-tangerine-500 selection:text-white">
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)} 
      />
      <main>
        <Hero 
          darkMode={darkMode} 
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)} 
        />
        <InteractivePos />
        <AiWhatsAppDemo />
        <ClientLedgerDemo />
        <DrugSearchDemo />
        <ShortagesOrdersDemo />
        <WarehouseCompare />
        <CloudSecurity />
        <RoiCalculator />
        <TestimonialsFaq />
        <PricingCtaSection 
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)} 
        />
      </main>
      <Footer darkMode={darkMode} />
      <FloatingWhatsApp />
      <DownloadLeadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
      />
    </div>
  );
}
