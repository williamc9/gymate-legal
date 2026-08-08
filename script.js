const controls = [...document.querySelectorAll('[data-language]')];
const documents = [...document.querySelectorAll('[data-document]')];
const navLinks = [...document.querySelectorAll('[data-nav]')];

const targetFor = (section, language) => `#${section}-${language === 'zh-HK' ? 'zh' : 'en'}`;

function setLanguage(language, preserveHash = false) {
  const next = language === 'zh-HK' ? 'zh-HK' : 'en';
  document.documentElement.lang = next;
  documents.forEach(documentNode => {
    documentNode.hidden = documentNode.dataset.document !== next;
  });
  controls.forEach(control => {
    control.setAttribute('aria-pressed', String(control.dataset.language === next));
  });
  navLinks.forEach(link => {
    link.href = targetFor(link.dataset.nav, next);
  });
  const primary = document.querySelector('.hero-actions .primary-action');
  const secondary = document.querySelector('.hero-actions .secondary-action');
  const skip = document.querySelector('.skip-link');
  if (next === 'zh-HK') {
    primary.textContent = '閱讀私隱政策';
    secondary.textContent = '刪除帳戶';
    skip.textContent = '跳至主要內容';
    skip.href = '#main-zh';
  } else {
    primary.textContent = 'Read the privacy policy';
    secondary.textContent = 'Delete an account';
    skip.textContent = 'Skip to content';
    skip.href = '#main-en';
  }
  primary.href = targetFor('privacy', next);
  secondary.href = targetFor('delete', next);
  localStorage.setItem('gymate-legal-language', next);
  if (!preserveHash && location.hash) history.replaceState(null, '', location.pathname);
}

controls.forEach(control => {
  control.addEventListener('click', () => setLanguage(control.dataset.language));
});

const saved = localStorage.getItem('gymate-legal-language');
const preferred = saved || (navigator.language?.toLowerCase().startsWith('zh') ? 'zh-HK' : 'en');
setLanguage(preferred, true);
