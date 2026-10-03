import React, { useState } from 'react';
import { 
  Database, Search, Pill, Sparkles, Check, ArrowRight, 
  Layers, AlertTriangle, ShieldCheck
} from 'lucide-react';

const drugDatabase = [
  {
    name: 'Augmentin 1g Tablets',
    arName: 'أوجمنتين 1 جم أقراص',
    activeSubstance: 'Amoxicillin 875mg + Clavulanic Acid 125mg',
    price: 131.00,
    company: 'GSK',
    substitutes: [
      { name: 'Curam 1g Tablets (كيورام)', price: 110.00 },
      { name: 'Hibiotic 1g Tablets (هاي بيوتك)', price: 105.00 },
      { name: 'Megamox 1g Tablets (ميجاموكس)', price: 98.00 }
    ]
  },
  {
    name: 'Panadol Extra Tablets',
    arName: 'بانادول إكسترا أحمر أقراص',
    activeSubstance: 'Paracetamol 500mg + Caffeine 65mg',
    price: 48.00,
    company: 'Haleon',
    substitutes: [
      { name: 'Abimol Extra (أبيمول إكسترا)', price: 21.00 },
      { name: 'Cetal Extra (سيتال إكسترا)', price: 24.00 },
      { name: 'Adol Extra (أدول إكسترا)', price: 32.00 }
    ]
  },
  {
    name: 'Cataflam 50mg Tablets',
    arName: 'كتافلام 50 مجم أقراص',
    activeSubstance: 'Diclofenac Potassium 50mg',
    price: 56.50,
    company: 'Novartis',
    substitutes: [
      { name: 'Declophen 50mg (ديكلوفين)', price: 28.00 },
      { name: 'Dolphin 50mg (دولفين)', price: 25.00 },
      { name: 'Voltaren 50mg (فولتارين)', price: 62.00 }
    ]
  },
  {
    name: 'Concor 5 Plus Tablets',
    arName: 'كونكور 5 بلس أقراص',
    activeSubstance: 'Bisoprolol 5mg + Hydrochlorothiazide 12.5mg',
    price: 64.00,
    company: 'Merck',
    substitutes: [
      { name: 'Bisor 5 Plus (بيزور بلس)', price: 42.00 },
      { name: 'Lodoz 5mg (لودوز)', price: 54.00 }
    ]
  },
];

export default function DrugSearchDemo() {
  const [searchTerm, setSearchTerm] = useState('Augmentin');
  const [selectedDrug, setSelectedDrug] = useState(drugDatabase[0]);

  const handleSelectDrug = (drug) => {
    setSelectedDrug(drug);
    setSearchTerm(drug.name.split(' ')[0]);
  };

  return (
    <section id="drugs" className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white/90 via-[#edf6fa]/90 to-white/90 dark:from-darkbg/70 dark:to-darkbg/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950/80 text-primary-900 dark:text-cyan-300 text-xs font-bold mb-3 border border-primary-300 dark:border-primary-800 shadow-2xs">
            <Database className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>محرك استعلام الأدوية والبدائل (26,000+ صنف)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            أكبر موسوعة دوائية مصرية مدمجة بالأسعار والبدائل
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            ابحث بالاسم التجاري، العلمي، أو المادة الفعالة. عندما ينقص صنف معين، يعرض لك السيستم البدائل المتوفرة فوراً بنفس المادة وبأسعارها الحالية لتلبية احتياج المريض دون خسارة البيعة.
          </p>
        </div>

        {/* Live Search Interactive Box */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-cyan-300 dark:border-cyan-800/60 p-6 sm:p-9 shadow-2xl">
          
          {/* Search Input Bar */}
          <div className="relative mb-6">
            <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-400 absolute top-4 right-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن أي دواء أو مادة فعالة (مثل: أوجمنتين، بانادول، كتافلام، كونكور)..."
              className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-white dark:bg-darksurface border-2 border-primary-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15 shadow-sm transition"
            />
          </div>

          {/* Quick Select Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-7">
            <span className="text-xs text-primary-900 dark:text-slate-400 font-bold">أصناف شائعة للتجربة:</span>
            {drugDatabase.map((drug, i) => (
              <button
                key={i}
                onClick={() => handleSelectDrug(drug)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  selectedDrug.name === drug.name
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                }`}
              >
                <Pill className="w-3.5 h-3.5" />
                <span>{drug.arName.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Drug Details Card */}
          {selectedDrug && (
            <div className="rounded-2xl bg-white dark:bg-darksurface border-2 border-primary-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-jakarta">
                      {selectedDrug.name}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 font-bold border border-emerald-300 dark:border-emerald-800">
                      متوفر في الصيدلية
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 font-bold">
                    {selectedDrug.arName} • الشركة: {selectedDrug.company}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">السعر الرسمي الحالي</span>
                  <span className="text-3xl font-black text-tangerine-600 dark:text-tangerine-500 font-jakarta">
                    {selectedDrug.price.toFixed(2)} <span className="text-xs text-slate-600 font-bold font-readex">ج.م</span>
                  </span>
                </div>
              </div>

              {/* Active Substance */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-50 to-primary-50 dark:from-darkcard dark:to-darkcard border border-cyan-200 dark:border-slate-800/60 mb-5">
                <span className="text-[11px] font-bold text-cyan-800 dark:text-slate-400 block mb-1">المادة الفعالة والتركيز (Active Ingredient):</span>
                <p className="text-xs font-bold text-primary-900 dark:text-cyan-400 font-jakarta">
                  {selectedDrug.activeSubstance}
                </p>
              </div>

              {/* Substitutes */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    البدائل والمثائل المتاحة بنفس المادة الفعالة والتركيز (Substitutes):
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedDrug.substitutes.map((sub, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/80 to-teal-50/70 dark:bg-emerald-950/20 flex flex-col justify-between shadow-2xs"
                    >
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-200">{sub.name}</p>
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-emerald-200 dark:border-emerald-900/40">
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">سعر البديل:</span>
                        <span className="text-xs font-black text-emerald-800 dark:text-emerald-400 font-jakarta">
                          {sub.price.toFixed(2)} ج.م
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
