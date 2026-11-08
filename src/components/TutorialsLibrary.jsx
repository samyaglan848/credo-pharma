import React from 'react';
import { Play, Youtube, ArrowUpLeft, GraduationCap } from 'lucide-react';
import { TUTORIALS, LIBRARY_GROUPS, PLAYLIST_URL, ytUrl } from '../data/tutorials.js';

// مكتبة الشرح: كل صفحة في السيستم ليها كارت فيه لينك فيديو الشرح على يوتيوب
export default function TutorialsLibrary() {
  return (
    <section
      id="tutorials"
      className="py-16 lg:py-24 relative overflow-hidden bg-white/40 dark:bg-darkbg/40 border-t border-primary-100 dark:border-primary-900/50 font-cairo"
    >
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-tangerine-400/10 dark:bg-tangerine-500/5 blur-3xl pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tangerine-100 dark:bg-tangerine-950/80 text-tangerine-700 dark:text-tangerine-300 text-xs font-bold mb-3 border border-tangerine-300 dark:border-tangerine-800">
            <GraduationCap className="w-3.5 h-3.5 text-tangerine-500" />
            <span>مكتبة الشرح</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            كل صفحة في السيستم ليها فيديو شرح
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            فيديوهات قصيرة بتشرح كل شاشة في كريدو خطوة بخطوة، من فاتورة البيع لحد التقارير والمساعد الذكي. اختار الصفحة اللي عايز تتعلمها وهتفتحلك على يوتيوب.
          </p>
        </div>

        {/* Groups */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {LIBRARY_GROUPS.map((g) => (
            <div
              key={g.title}
              className="break-inside-avoid mb-5 rounded-3xl glass-card border border-primary-200/90 dark:border-primary-800 p-5 sm:p-6 shadow-sm"
            >
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-tangerine-400 to-tangerine-600" />
                {g.title}
              </h3>
              <ul className="space-y-2.5">
                {g.items.map((k) => {
                  const t = TUTORIALS[k];
                  if (!t) return null;
                  return (
                    <li key={k}>
                      <a
                        href={ytUrl(t.id)}
                        target="_blank"
                        rel="noopener"
                        title={`شرح ${t.title} على يوتيوب`}
                        className="group flex items-start gap-3 rounded-2xl p-3 -mx-1
                          bg-white/70 dark:bg-darkcard/70 border border-transparent
                          hover:border-tangerine-300 dark:hover:border-tangerine-800 hover:bg-white dark:hover:bg-darksurface
                          hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tangerine-400
                          transition-all duration-200"
                      >
                        <span className="shrink-0 mt-0.5 flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-tangerine-400 to-tangerine-600 text-white shadow-sm group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 fill-white translate-x-[-1px]" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-bold text-sm text-slate-900 dark:text-white group-hover:text-tangerine-600 dark:group-hover:text-tangerine-400 transition-colors">
                            {t.title}
                          </span>
                          <span className="block text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                            {t.desc}
                          </span>
                        </span>
                        <ArrowUpLeft className="shrink-0 w-4 h-4 mt-1 text-slate-300 group-hover:text-tangerine-500 transition-colors" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Playlist CTA card */}
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener"
            className="group break-inside-avoid mb-5 rounded-3xl p-6 flex flex-col justify-between gap-6
              bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-glow-primary
              hover:-translate-y-1 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tangerine-400"
          >
            <div>
              <Youtube className="w-9 h-9 text-tangerine-300 mb-3" />
              <h3 className="text-lg font-black mb-2">كل الشروحات في قائمة واحدة</h3>
              <p className="text-sm text-primary-100 leading-relaxed">
                شوف قائمة «شرح كريدو» كاملة على قناتنا، وأي فيديو جديد بينزل فيها أول بأول.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-tangerine-500 group-hover:bg-tangerine-600 px-5 py-2.5 text-sm font-bold transition-colors">
              <Play className="w-4 h-4 fill-white" />
              افتح القائمة على يوتيوب
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
