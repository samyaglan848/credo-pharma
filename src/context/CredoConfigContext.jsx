import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_CONFIG = {
  plans: {
    basic: {
      id: 'basic',
      name: 'الباقة العادية',
      englishName: 'Credo Standard',
      prices: {
        monthly: 300,
        quarterly: 800,
        yearly: 2500,
        lifetime: 6500
      }
    },
    pro: {
      id: 'pro',
      name: 'باقة برو الاحترافية',
      englishName: 'Credo Pro ⭐',
      prices: {
        monthly: 450,
        quarterly: 1500,
        yearly: 3500,
        lifetime: 7500
      }
    },
    ultra: {
      id: 'ultra',
      name: 'باقة ألترا الشاملة',
      englishName: 'Credo Ultra 🚀',
      prices: {
        monthly: 750,
        quarterly: 2100,
        yearly: 5000,
        lifetime: 9000
      }
    }
  },
  trial: {
    durationDays: 14,
    enabled: true,
    includeAi: true,
    includeWhatsapp: true
  },
  whatsapp: {
    number: '201060945097',
    phone: '01060945097'
  },
  paymentDetails: {
    vodafoneCash: '01001329131',
    instapay: '01001329131'
  },
  downloadUrl: 'https://github.com/credo-pharma/releases/download/v1.0.0/CredoPharma-Setup.exe'
};

const CredoConfigContext = createContext({
  config: DEFAULT_CONFIG,
  plans: DEFAULT_CONFIG.plans,
  trial: DEFAULT_CONFIG.trial,
  trialDays: 14,
  whatsappNumber: '201060945097',
  contactPhone: '01060945097',
  paymentDetails: DEFAULT_CONFIG.paymentDetails,
  downloadUrl: DEFAULT_CONFIG.downloadUrl,
  isLiveConnected: false,
  lastUpdated: null
});

const getApiBase = () => {
  if (typeof window === 'undefined') return 'http://localhost:3001';
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/api\/.*$/, '').replace(/\/api$/, '');
  }
  return 'http://localhost:3001';
};

export function CredoConfigProvider({ children }) {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const applyConfig = (newConfig) => {
    if (!newConfig || !newConfig.plans) return;
    setConfig((prev) => ({
      ...prev,
      ...newConfig,
      plans: {
        basic: {
          ...prev.plans.basic,
          ...(newConfig.plans?.basic || {}),
          prices: {
            ...prev.plans.basic.prices,
            ...(newConfig.plans?.basic?.prices || {})
          }
        },
        pro: {
          ...prev.plans.pro,
          ...(newConfig.plans?.pro || {}),
          prices: {
            ...prev.plans.pro.prices,
            ...(newConfig.plans?.pro?.prices || {})
          }
        },
        ultra: {
          ...prev.plans.ultra,
          ...(newConfig.plans?.ultra || {}),
          prices: {
            ...prev.plans.ultra.prices,
            ...(newConfig.plans?.ultra?.prices || {})
          }
        }
      },
      trial: {
        ...prev.trial,
        ...(newConfig.trial || {})
      },
      whatsapp: {
        ...prev.whatsapp,
        ...(newConfig.whatsapp || {})
      },
      paymentDetails: {
        ...prev.paymentDetails,
        ...(newConfig.paymentDetails || {})
      },
      downloadUrl: newConfig.downloadUrl || prev.downloadUrl
    }));
    setLastUpdated(new Date());
  };

  useEffect(() => {
    const apiBase = getApiBase();

    // 1. Initial snapshot fetch
    fetch(`${apiBase}/api/plans/website-config`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch config');
        return res.json();
      })
      .then((json) => {
        if (json?.data) {
          applyConfig(json.data);
          setIsLiveConnected(true);
        }
      })
      .catch(() => {
        // Graceful fallback to DEFAULT_CONFIG
      });

    // 2. Real-time stream using native Server-Sent Events (SSE)
    let eventSource = null;
    try {
      eventSource = new EventSource(`${apiBase}/api/plans/live-stream`);

      eventSource.onopen = () => {
        setIsLiveConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const freshData = JSON.parse(event.data);
          applyConfig(freshData);
          setIsLiveConnected(true);
        } catch (e) {
          console.error('[Credo Live Stream] Parse error:', e);
        }
      };

      eventSource.onerror = () => {
        setIsLiveConnected(false);
      };
    } catch (e) {
      // EventSource failed or unsupported
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const value = {
    config,
    plans: config.plans,
    trial: config.trial,
    trialDays: config.trial?.durationDays || 14,
    whatsappNumber: config.whatsapp?.number || '201060945097',
    contactPhone: config.whatsapp?.phone || '01060945097',
    paymentDetails: config.paymentDetails,
    downloadUrl: config.downloadUrl,
    isLiveConnected,
    lastUpdated
  };

  return (
    <CredoConfigContext.Provider value={value}>
      {children}
    </CredoConfigContext.Provider>
  );
}

export function useCredoConfig() {
  const context = useContext(CredoConfigContext);
  return context || {
    config: DEFAULT_CONFIG,
    plans: DEFAULT_CONFIG.plans,
    trial: DEFAULT_CONFIG.trial,
    trialDays: 14,
    whatsappNumber: '201060945097',
    contactPhone: '01060945097',
    paymentDetails: DEFAULT_CONFIG.paymentDetails,
    downloadUrl: DEFAULT_CONFIG.downloadUrl,
    isLiveConnected: false,
    lastUpdated: null
  };
}
