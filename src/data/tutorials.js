// فيديوهات شرح كريدو على يوتيوب (قناة Credo Pharma)
// لإضافة فيديو جديد: ضيف سطر في TUTORIALS، وحط الـ key بتاعه في SECTION_TUTORIALS لو عايزه يظهر جنب قسم معين.

export const CHANNEL_URL = 'https://www.youtube.com/@CredoPharma';
export const PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLDSaZiildA-o';

export const ytUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

export const TUTORIALS = {
  home:        { id: 'hGzwnvPztms', title: 'الصفحة الرئيسية', desc: 'جولة سريعة على الشاشة الرئيسية وأهم الأرقام اللي بتظهرلك أول ما تفتح السيستم.' },
  sale:        { id: 'QSjilH2JNgo', title: 'فاتورة البيع', desc: 'البيع بالباركود والعلبة والشريط، الخصم، وطباعة الفاتورة في ثواني.' },
  returns:     { id: 'R8ZFuEYXuUQ', title: 'المرتجعات', desc: 'مرتجع البيع ومرتجع الشراء من أي فاتورة قديمة بدقة ومن غير ما تدوّر.' },
  shift:       { id: 'U5Ar4aiuwfg', title: 'الوردية والصندوق', desc: 'تسجيل المصروفات وإغلاق الوردية وحساب العجز والزيادة.' },
  purchase:    { id: '-eKuhJyHV4g', title: 'فاتورة الشراء', desc: 'إدخال فاتورة الشراء خطوة بخطوة مع آخر سعر وآخر خصم لكل صنف.' },
  importInv:   { id: 'aWRHsN5PLDA', title: 'استيراد فاتورة المورد', desc: 'صوّر الفاتورة أو ارفعها والسيستم يقرأ الأصناف بدالك.' },
  suppliers:   { id: 'SUSOKTZUt-Y', title: 'إدارة الموردين', desc: 'تسجيل السداد وإضافة مورد جديد بمناديبه.' },
  addItem:     { id: 'fjlQ8119DD8', title: 'إضافة صنف يدوي', desc: 'إضافة صنف بالباركود من قاعدة ستة وعشرين ألف صنف.' },
  quickUpdate: { id: 'keM1aGohcME', title: 'التحديث السريع للأرصدة', desc: 'تحديث الكميات وتواريخ الصلاحية بسرعة زي شيت الإكسيل.' },
  inquiry:     { id: 'XuGzUT2Tbnw', title: 'الاستعلام عن صنف', desc: 'ابحث عن أي صنف وشوف البدائل المتوفرة عندك وفي السوق.' },
  shortages:   { id: 'N1sW-d9rx0U', title: 'النواقص والطلبيات', desc: 'جهّز الطلبية وابعتها للمورد على الواتساب بزر واحد.' },
  stocktake:   { id: 'VFtxExKg6fc', title: 'الجرد والمركز المالي', desc: 'قيمة البضاعة والمركز المالي الشامل لصيدليتك في شاشة واحدة.' },
  statements:  { id: 'uEcLidbva5A', title: 'كشوفات الحساب', desc: 'كشف حساب العميل والمورد بالتفصيل.' },
  reports:     { id: '2CJ5Rtoic0A', title: 'التقارير', desc: 'تقرير تقييم الموردين وتقرير أداء الموظفين.' },
  aiAssistant: { id: 'qQYXDQz5mAc', title: 'مستشار المشتريات الذكي', desc: 'اسأل السيستم بالكلام العادي عن مبيعاتك ومخزونك.' },
  aiDashboard: { id: '4DaZd6held8', title: 'لوحة تحليلات الذكاء الاصطناعي', desc: 'توصيات وتنبيهات المخزون والمبيعات أول بأول.' },
  branches:    { id: '1GQmLWhhvFY', title: 'إدارة الفروع', desc: 'تحويل البضاعة بين الفروع وإضافة فرع جديد.' },
  staff:       { id: 'ePnNsCcXWjQ', title: 'العضوية والموظفين والصلاحيات', desc: 'باقتك، وحسابات الموظفين، وصلاحيات كل واحد.' },
  settings:    { id: 'bx4xXpOulig', title: 'إعدادات النظام والتشغيل', desc: 'النسخ الاحتياطي، والواتساب وقوالب الرسائل، وإعدادات المساعد الذكي.' },
};

// الفيديوهات اللي بتظهر كزراير جنب كل قسم في الصفحة الرئيسية
export const SECTION_TUTORIALS = {
  pos:        ['sale', 'returns', 'shift'],
  ai:         ['aiAssistant', 'aiDashboard'],
  clients:    ['statements'],
  drugs:      ['inquiry', 'addItem', 'quickUpdate'],
  shortages:  ['shortages'],
  warehouses: ['branches', 'stocktake'],
  security:   ['staff', 'settings'],
};

// تقسيم مكتبة الشرح
export const LIBRARY_GROUPS = [
  { title: 'البداية', items: ['home'] },
  { title: 'البيع والكاشير', items: ['sale', 'returns', 'shift'] },
  { title: 'الشراء والموردين', items: ['purchase', 'importInv', 'suppliers'] },
  { title: 'الأصناف والمخزون', items: ['addItem', 'quickUpdate', 'inquiry', 'shortages', 'stocktake'] },
  { title: 'الحسابات والتقارير', items: ['statements', 'reports'] },
  { title: 'الذكاء الاصطناعي', items: ['aiAssistant', 'aiDashboard'] },
  { title: 'الإدارة والفروع', items: ['branches', 'staff', 'settings'] },
];
