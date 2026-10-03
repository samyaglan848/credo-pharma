import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const faqs = [
  {
    q: "لماذا يُعتبر CREDO PHARMA أفضل برنامج صيدليات في مصر وأسرع سيستم إدارة صيدليات؟",
    a: "يُعد CREDO PHARMA أفضل سيستم صيدليات في مصر وأسرع سيستم ادارة صيدليات بشهادة مئات الصيادلة؛ حيث يجمع بين إنهاء فاتورة البيع في أقل من 3 ثوانٍ، والعمل أوفلاين 100%، ومساعد واتساب ذكي يتابع أرباحك وخزينتك لحظياً، وقاعدة بيانات متكاملة لـ 26,000 دواء مصري وبدائلها الرسمية وأسعارها."
  },
  {
    q: "كيف يتعامل السيستم مع ديون العملاء وتجاوز الحد الأقصى للآجل؟",
    a: "يتيح لك CREDO PHARMA تحديد سقف ائتماني دقيق لكل عميل؛ وبمجرد أن يصل حسابه لهذا السقف، يُجمّد السيستم إمكانية البيع بالآجل تلقائياً ويمنع الكاشير من تمرير الفاتورة لحماية أموال الصيدلية. كما يُرسل النظام إشعارات واتساب فورية للعميل عند أخذ أي فاتورة وعند سداد أي دفعة، مع تنبيهات مجدولة في منتصف الشهر (يوم 15) وكشف حساب شهري PDF يوم 30 مع إمكانية السداد عبر إنستاباي وفودافون كاش."
  },
  {
    q: "هل أحتاج لمواصفات كمبيوتر عالية لتشغيل CREDO PHARMA؟",
    a: "إطلاقاً! البرنامج فائق الخفة ومُحسّن ليعمل بكفاءة وسرعة فائقة على أي جهاز كمبيوتر عادي (حتى بمعالجات Core i3 القديمة وذاكرة 4GB RAM) ويعمل على نظام ويندوز 10 و 11."
  },
  {
    q: "هل يمكنني نقل بيانات الأدوية والعملاء من برنامجي القديم؟",
    a: "نعم بكل سهولة، يوفر Credo ميزة استيراد شيتات الإكسل (Excel Import) بضغطة زر واحدة، ويقوم فريق الدعم الفني بمساعدتك في نقل كافة أرصدتك وأسماء عملائك وحساباتهم دون أي مجهود منك."
  },
  {
    q: "كيف يعمل مساعد الواتساب والذكاء الاصطناعي؟ وهل يحتاج جهازاً خاصاً؟",
    a: "يرتبط النظام برقم واتساب الصيدلية أو رقمك الشخصي عبر رمز QR بسيط. بعد الربط، يتولى المساعد الذكي الرد على استفساراتك اليومية وإرسال الفواتير وكشوف الحساب تلقائياً دون الحاجة لأي خوادم خارجية مكلفة."
  },
  {
    q: "هل يعمل البرنامج إذا انقطع الإنترنت في الصيدلية؟",
    a: "نعم، 100%! تم تصميم قاعدة البيانات لتعمل محلياً في الصيدلية، فتستمر عمليات البيع والطباعة وإدارة الدرج دون أدنى تأثر بانقطاع الإنترنت. وعند عودة النت يقوم البرنامج بمزامنة النسخ السحابية فقط."
  },
  {
    q: "ما هي الأجهزة المتوافقة (طابعات وباركود)؟",
    a: "النظام متوافق مع كافة طابعات الإيصالات الحرارية (Thermal 80mm & 58mm)، قارئات الباركود USB و Wireless، طابعات الليزر العادية، وأدراج النقدية الأوتوماتيكية."
  }
];

export default function TestimonialsFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 lg:py-24 relative overflow-hidden bg-white/40 dark:bg-darkbg/40 border-t border-primary-100 dark:border-primary-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs font-bold mb-3 border border-cyan-300 dark:border-cyan-800">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
            <span>الأسئلة الأكثر شيوعاً</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            كل ما تريد معرفته عن نظام CREDO PHARMA
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            إجابات واضحة ومباشرة لأهم التساؤلات التي يطرحها زملاؤنا الصيادلة قبل الانضمام.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="rounded-2xl glass-card border border-primary-200 dark:border-primary-800/80 overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition"
              >
                <span>{faq.q}</span>
                <span className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 text-slate-500">
                  {openIndex === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {openIndex === i && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
