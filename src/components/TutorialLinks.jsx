import React from 'react';
import { Play } from 'lucide-react';
import { TUTORIALS, SECTION_TUTORIALS, ytUrl } from '../data/tutorials.js';

// زر «شوف الشرح» — لينك عادي بيفتح الفيديو على يوتيوب في تاب جديدة
export function TutorialButton({ tKey, compact = false }) {
  const t = TUTORIALS[tKey];
  if (!t) return null;
  return (
    <a
      href={ytUrl(t.id)}
      target="_blank"
      rel="noopener"
      title={`شرح ${t.title} على يوتيوب`}
      className={`group inline-flex items-center gap-2.5 rounded-full font-cairo font-bold
        bg-white dark:bg-darkcard text-slate-800 dark:text-slate-100
        border border-tangerine-200 dark:border-tangerine-900/70
        shadow-sm hover:shadow-glow-tangerine hover:border-tangerine-400 hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tangerine-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-darkbg
        transition-all duration-200
        ${compact ? 'ps-1.5 pe-4 py-1.5 text-xs sm:text-sm' : 'ps-2 pe-5 py-2 text-sm'}`}
    >
      <span
        className={`flex items-center justify-center rounded-full bg-gradient-to-br from-tangerine-400 to-tangerine-600 text-white shadow-sm
          group-hover:scale-110 transition-transform duration-200 ${compact ? 'w-7 h-7' : 'w-8 h-8'}`}
      >
        <Play className="w-3.5 h-3.5 fill-white translate-x-[-1px]" />
      </span>
      <span>
        <span className="text-tangerine-600 dark:text-tangerine-400">شوف الشرح:</span> {t.title}
      </span>
    </a>
  );
}

// صف زراير الشرح تحت عنوان كل قسم
export default function TutorialLinks({ section, className = '' }) {
  const keys = SECTION_TUTORIALS[section] || [];
  if (!keys.length) return null;
  return (
    <div className={`mt-6 flex flex-wrap items-center justify-center gap-2.5 ${className}`}>
      {keys.map((k) => (
        <TutorialButton key={k} tKey={k} compact />
      ))}
    </div>
  );
}
