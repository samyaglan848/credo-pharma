import React, { useState } from 'react';
import { 
  Bot, MessageSquare, Send, Sparkles, CheckCheck, 
  HelpCircle, Globe, Shield, Smartphone, ArrowRight
} from 'lucide-react';

const mockAiPrompts = [
  {
    q: "مبيعات اليوم وأرباح الوردية كام؟",
    reply: "📊 مرحباً دكتور! إجمالي مبيعات اليوم حتى الآن: 18,450.00 ج.م موزعة على (وردية الصباح: 12,150 ج.م، وردية المساء: 6,300 ج.م). صافي الأرباح المحققة: 4,820.00 ج.م بهامش ربح 26.1%. الصنف الأكثر مبيعاً هو Augmentin 1g."
  },
  {
    q: "هل دواء كونكور 5 مجم متوفر في الفرع الثاني؟",
    reply: "💊 نعم دكتور، كونكور 5 بلس متوفر في 'فرع المحطة' برصيد (14 علبة)، وسعره 64.00 ج.م وتاريخ الصلاحية ينتهي في 11/2027. كما يوجد في المخزن العام 40 علبة."
  },
  {
    q: "مين أكتر مورد عليه مستحقات ومتأخرات مالية؟",
    reply: "🏢 تقرير الموردين الحالي: شركة المتحدة للأدوية لها مستحق قدره 8,400 ج.م يستحق السداد بعد 4 أيام، تليها شركة ابن سينا فارما بمستحق 4,200 ج.م. هل تود استخراج شيك أو تأجيل الفاتورة؟"
  },
  {
    q: "إيه النواقص والأصناف اللي قربت تخلص؟",
    reply: "⚠️ تم رصد 4 أصناف وصلت لحد الطلب الأدنى: 1) كتافلام 50 مجم (متبقي 3 علب فقط)، 2) بانادول إكسترا (متبقي 6 علب)، 3) انتينال كبسول (متبقي 2 علبة). تم إنشاء مسودة طلب شراء للموردين تلقائياً."
  }
];

export default function AiWhatsAppDemo() {
  const [messages, setMessages] = useState([
    { sender: 'user', text: mockAiPrompts[0].q, time: '11:42 ص' },
    { sender: 'bot', text: mockAiPrompts[0].reply, time: '11:42 ص' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSelectPrompt = (prompt) => {
    const timeNow = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: prompt.q, time: timeNow }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: prompt.reply, time: timeNow }]);
    }, 900);
  };

  const whatsappDirectUrl = "https://wa.me/201060945097?text=" + encodeURIComponent("مرحباً، أود الاستفسار عن ميزة الذكاء الاصطناعي وربط الواتساب في CREDO PHARMA");

  return (
    <section id="ai" className="py-16 lg:py-24 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-tangerine-100 dark:bg-tangerine-950/80 text-tangerine-700 dark:text-tangerine-300 text-xs font-bold mb-3 border border-tangerine-300 dark:border-tangerine-800">
            <Sparkles className="w-3.5 h-3.5 text-tangerine-500" />
            <span>الميزة الأكثر ثورية: مساعد الواتساب والذكاء الاصطناعي</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            تحدث مع صيدليتك وأنت في أي مكان في العالم عبر الواتساب!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            سواء كنت في منزلك، في عطلة، أو مسافراً خارج البلاد؛ أرسل رسالة عادية على الواتساب ليسرد لك المساعد الذكي كل ما يدور في صيدليتك وفروعك بدقة متناهية ولحظياً.
          </p>
        </div>

        {/* Content Grid: Features on Right, WhatsApp Simulator on Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 7 Cols: WhatsApp Interactive Phone Simulator */}
          <div className="lg:col-span-7 flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-md rounded-3xl bg-[#0b141a] text-slate-100 border-4 border-slate-700/80 shadow-2xl overflow-hidden flex flex-col h-[580px]">
              
              {/* WhatsApp Header */}
              <div className="px-4 py-3 bg-[#1f2c34] flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-primary-600 flex items-center justify-center p-0.5">
                      <img src="/favicon.png" alt="Credo AI" className="w-full h-full object-contain rounded-full" />
                    </div>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-[#1f2c34]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white flex items-center gap-1.5">
                      CREDO AI Assistant
                      <span className="text-[10px] px-1 rounded bg-cyan-900 text-cyan-300 font-normal">Bot</span>
                    </p>
                    <p className="text-[11px] text-emerald-400">متصل الآن (Online 24/7)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>عالمي</span>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0b141a] bg-opacity-95 text-xs">
                <div className="text-center my-1">
                  <span className="px-3 py-1 rounded-lg bg-[#182229] text-[10px] text-slate-400">
                    محادثة مشفرة تماماً ومحمية بينك وبين صيدليتك
                  </span>
                </div>

                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                      msg.sender === 'user' 
                        ? 'bg-[#005c4b] text-white rounded-bl-sm' 
                        : 'bg-[#202c33] text-slate-100 rounded-br-sm'
                    }`}>
                      <p className="leading-relaxed font-sans">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-300/70">
                        <span>{msg.time}</span>
                        {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-cyan-400" />}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#202c33] w-24 text-[11px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-200" />
                    <span>يكتب...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompts Pills for Demo */}
              <div className="p-2.5 bg-[#182229] border-t border-slate-800">
                <p className="text-[10px] text-cyan-400 font-bold mb-1.5">اختر سؤالاً لتجربة الرد التلقائي الفوري:</p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {mockAiPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPrompt(p)}
                      className="px-2.5 py-1 rounded-lg bg-[#202c33] hover:bg-[#2a3942] text-slate-200 text-[10px] whitespace-nowrap border border-slate-700 transition"
                    >
                      {p.q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-[#202c33] flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  placeholder="انقر على أحد الأسئلة بالأعلى للتجربة..."
                  className="flex-1 bg-[#2a3942] text-xs text-slate-300 px-3 py-2 rounded-xl border-none outline-none cursor-pointer"
                  onClick={() => handleSelectPrompt(mockAiPrompts[1])}
                />
                <button 
                  onClick={() => handleSelectPrompt(mockAiPrompts[1])}
                  className="w-9 h-9 rounded-xl bg-[#00a884] text-white flex items-center justify-center hover:bg-[#06cf9c] transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* 5 Cols: Strategic Explanations */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2 text-right">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                لماذا تعتبر هذه الميزة هي السلاح الأقوى لمالك الصيدلية؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                لا داعي للقلق أو الاتصال المتكرر بالصيدلي المناوب. نظام Credo AI مربوط مباشرة بقاعدة بياناتك ويفهم اللغة العربية العامية ويسرد لك تقارير فورية على هاتفك.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl glass-card flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">من أي مكان في العالم</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    سواء كنت داخل مصر أو في رحلة عمل بالخارج، طالما هاتفك به واتساب يمكنك استجواب نظامك في أي لحظة.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-tangerine-100 dark:bg-tangerine-950/80 text-tangerine-600 dark:text-tangerine-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">أمان وخصوصية فائقة</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    الرد فقط على أرقام هواتف الملاك والمدراء المعتمدين والمشفرة لمنع تسريب أي بيانات مالية.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">تنبؤ بالرواكد والنواقص</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    ينبهك الذكاء الاصطناعي مسبقاً بالأدوية التي قاربت على انتهاء الصلاحية أو النفاذ لاقتراح خطة شراء مثالية.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-tangerine-600 dark:text-tangerine-400 hover:text-tangerine-700 underline"
              >
                <span>تحدث معنا عبر الواتساب لتجربة البوت الحي مباشرة (01060945097)</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
