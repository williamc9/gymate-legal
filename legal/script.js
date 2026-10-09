const hongKongDocument = document.querySelector('[data-document="zh-HK"]');

const taiwanReplacements = [
  ['只得你睇到', '只有你看得到'], ['流動及網頁應用程式', '行動與網頁應用程式'],
  ['最愛房間', '收藏健身房'], ['健身室房間', '健身房房間'], ['健身室', '健身房'],
  ['私隱', '隱私'], ['電郵', '電子郵件'], ['帳戶', '帳號'], ['網絡', '網路'],
  ['訓練計劃', '訓練課表'], ['相片', '照片'], ['網上', '網路'],
  ['舉報', '檢舉'], ['身份', '身分'], ['冷靜時間', '冷卻期間'], ['確實人數', '確切人數'],
  ['確實報到', '實際報到'], ['報到', '打卡'], ['呢啲', '這些'], ['你嘅', '你的'], ['用嚟', '用來'],
  ['係咪', '是否'], ['喺', '在'], ['唔會', '不會'], ['唔', '不'], ['冇', '沒有'],
  ['睇到', '看到'], ['嘅', '的'], ['同另一', '與另一'], ['同實際打卡房間', '與實際打卡房間'],
  ['個人資料同實際', '個人資料與實際'], ['Wave 套裝係', 'Wave 套裝是'], ['用戶', '使用者'],
];

function taiwanize(value) {
  return taiwanReplacements.reduce((text, [from, to]) => text.split(from).join(to), value)
    .replace(/嘅/g, '的');
}

function createTaiwanDocument() {
  const clone = hongKongDocument.cloneNode(true);
  clone.id = 'main-tw';
  clone.dataset.document = 'zh-TW';
  clone.hidden = true;
  clone.querySelectorAll('[id]').forEach(node => {
    node.id = node.id.endsWith('-zh') ? node.id.replace(/-zh$/, '-tw') : node.id;
  });
  clone.querySelectorAll('[aria-labelledby]').forEach(node => {
    node.setAttribute('aria-labelledby', node.getAttribute('aria-labelledby').replace(/-zh$/, '-tw'));
  });
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) walker.currentNode.nodeValue = taiwanize(walker.currentNode.nodeValue);
  hongKongDocument.after(clone);
}

createTaiwanDocument();

const controls = [...document.querySelectorAll('[data-language]')];
const documents = [...document.querySelectorAll('[data-document]')];
const navLinks = [...document.querySelectorAll('[data-nav]')];
const localeContent = {
  en: {
    eyebrow: 'PRIVACY · SAFETY · SUPPORT',
    heading: 'Your gym,<br><span>minus the awkward.</span>',
    lede: 'Gymley is designed for low-pressure, in-person connection. This page explains what we collect, what we never expose, and how to get help or delete your account.',
    primary: 'Read the privacy policy', secondary: 'Delete an account', skip: 'Skip to content',
    nav: ['Privacy', 'Terms', 'Community', 'Support', 'Delete'],
    principle: 'Private by design · 以私隱為核心', operator: 'Operated by William Chow · ', title: 'Gymley · Privacy & Support',
    description: 'Gymley privacy policy, terms, community guidelines, support, and account deletion information.',
  },
  'zh-HK': {
    eyebrow: '私隱 · 安全 · 支援',
    heading: '你嘅健身室，<br><span>少一點尷尬。</span>',
    lede: 'Gymley 為低壓力、面對面嘅連繫而設。呢一頁解釋我哋會收集甚麼、絕不會公開甚麼，以及點樣取得協助或刪除帳戶。',
    primary: '閱讀私隱政策', secondary: '刪除帳戶', skip: '跳至主要內容',
    nav: ['私隱', '條款', '社群', '支援', '刪除'],
    principle: '以私隱為核心', operator: '由 William Chow 營運 · ', title: 'Gymley · 私隱與支援',
    description: 'Gymley 私隱政策、使用條款、社群守則、支援及刪除帳戶資料。',
  },
  'zh-TW': {
    eyebrow: '隱私 · 安全 · 支援',
    heading: '你的健身房，<br><span>少一點尷尬。</span>',
    lede: 'Gymley 專為低壓力、面對面的交流而設計。本頁說明我們會收集哪些資料、絕不會公開哪些內容，以及如何取得協助或刪除帳號。',
    primary: '閱讀隱私權政策', secondary: '刪除帳號', skip: '跳至主要內容',
    nav: ['隱私', '條款', '社群', '支援', '刪除'],
    principle: '隱私融入每個設計', operator: '營運者：William Chow · ', title: 'Gymley · 隱私與支援',
    description: 'Gymley 隱私權政策、使用條款、社群守則、支援與刪除帳號資訊。',
  },
};

const suffixFor = language => language === 'en' ? 'en' : language === 'zh-TW' ? 'tw' : 'zh';
const targetFor = (section, language) => `#${section}-${suffixFor(language)}`;

function setLanguage(language, preserveHash = false) {
  const next = localeContent[language] ? language : 'en';
  const copy = localeContent[next];
  document.documentElement.lang = next;
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.description;
  documents.forEach(documentNode => { documentNode.hidden = documentNode.dataset.document !== next; });
  controls.forEach(control => control.setAttribute('aria-pressed', String(control.dataset.language === next)));
  navLinks.forEach((link, index) => {
    link.href = targetFor(link.dataset.nav, next);
    link.textContent = copy.nav[index];
  });
  document.querySelector('.hero-copy .eyebrow').textContent = copy.eyebrow;
  document.querySelector('.hero-copy h1').innerHTML = copy.heading;
  document.querySelector('.hero-copy .lede').textContent = copy.lede;
  const primary = document.querySelector('.hero-actions .primary-action');
  const secondary = document.querySelector('.hero-actions .secondary-action');
  const skip = document.querySelector('.skip-link');
  primary.textContent = copy.primary;
  secondary.textContent = copy.secondary;
  skip.textContent = copy.skip;
  skip.href = `#main-${suffixFor(next)}`;
  primary.href = targetFor('privacy', next);
  secondary.href = targetFor('delete', next);
  document.getElementById('footer-principle').textContent = copy.principle;
  document.getElementById('footer-operator').firstChild.nodeValue = copy.operator;
  localStorage.setItem('gymley-language', next);
  if (!preserveHash && location.hash) history.replaceState(null, '', location.pathname);
}

controls.forEach(control => control.addEventListener('click', () => setLanguage(control.dataset.language)));

const hashLocale = location.hash.endsWith('-tw') ? 'zh-TW' : location.hash.endsWith('-zh') ? 'zh-HK' : null;
const browserLocale = navigator.language?.toLowerCase();
const preferred = hashLocale || localStorage.getItem('gymley-language') || (browserLocale === 'zh-tw' ? 'zh-TW' : browserLocale?.startsWith('zh') ? 'zh-HK' : 'en');
setLanguage(preferred, true);
