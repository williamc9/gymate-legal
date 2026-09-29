(() => {
  const copyNodes = [...document.querySelectorAll('[data-copy]')];
  const english = Object.fromEntries(copyNodes.map((node) => [node.dataset.copy, node.textContent.trim()]));
  const cantonese = {
    skip: '跳到內容',
    navHow: '點樣開始',
    navInside: '睇下入面',
    navPrivacy: '私隱',
    coming: '即將登陸 iPhone',
    heroEyebrow: '為真實健身室相遇而設 · 18+',
    heroLine1: '你已經見過佢幾次。',
    heroLine2: '或者今日，終於講聲 Hi。',
    heroLede: 'Gymley 令健身室識人少一點尷尬，多一點自然。',
    heroCta: '睇下感覺係點',
    iphoneSoon: 'iPhone 優先 · 即將推出',
    heroNote: '私密 Wave。雙向連結。冇公開拒絕。',
    manifestoEyebrow: '健身室本身已經充滿相遇，最難只係第一步。',
    manifestoTitle: 'Gymley 為第一聲 Hi 留低一個舒服嘅位置。',
    manifestoBody: '唔需要諗完美開場白，亦唔使估對方想唔想識人。只係一個安靜訊號，等雙方都有同樣感覺先揭曉。',
    storyEyebrow: '一次到訪，一個細小可能。',
    storyTitle: '等個 moment 自然發生。',
    step1Title: '你嚟到。',
    step1Body: '見到同一間健身室入面嘅人，而唔係全城陌生人嘅目錄。',
    step2Title: '有人吸引到你注意。',
    step2Body: '送出一個低調 Wave。對方知道有人留意佢，但唔會知道係邊個。',
    step3Title: '原來大家都有同樣感覺。',
    step3Body: '如果對方都向你 Wave，你哋就會一齊知道。對話由呢度開始。',
    step4Title: '之後點行，由你哋一齊揀。',
    step4Body: '只有雙方都揀「Add Gymate」，今日嘅相遇先會留低。',
    momentEyebrow: '有啲 moment，只會停留到今次訓練完。',
    momentTitle: '趁大家仲喺度，捉住呢一刻。',
    momentBody: 'Waveie 對話只會喺你哋都身處健身室時存在。任何一方離開，對話就會消失——除非你哋已經雙向選擇成為 Gymates。',
    momentClose: '如果傾得投契，就唔好等到下次先講第二聲 Hi。',
    tourEyebrow: '入面係點',
    tourTitle: '七個畫面，一個自然節奏。',
    tour1Title: '有人吸引到你注意',
    tour1Body: '感受到場內有人，但唔會變成鬥人氣。',
    tour2Title: '低調行出第一步',
    tour2Body: '有足夠個性令人感覺真實，但唔會似做訪問。',
    tour3Title: '原來大家都有同樣感覺',
    tour3Body: '你哋都 Wave 咗。已經比任何開場白更自然。',
    tour4Title: '有時，一切由幫手睇位開始',
    tour4Body: '實際、冇壓力，而且同配對完全分開。',
    tour5Title: 'Gymley 都係為你訓練而設',
    tour5Body: '就算今日唔想識人，你嘅訓練計劃仍然準備好。',
    tour6Title: '一次專心一個動作',
    tour6Body: '組數、次數、下一個動作，一目了然，冇示範片阻住節奏。',
    tour7Title: '你嘅 Wave 都有自己性格',
    tour7Body: '一個只屬於你嘅小進度，唔係公開分數。',
    trainingEyebrow: '有啲日子，你只係想專心操？',
    trainingTitle: '完全冇問題。',
    trainingBody: '訓練計劃已經準備好，組數整齊記住。如果支 bar 突然比想像中重，Ask a Spot 可以幫你搵附近一隻手。',
    trainingClose: '想識人時，社交功能就喺度；唔想時，訓練一樣照常。',
    privacyEyebrow: '由設計開始保障私隱',
    privacyTitle: '冇公開拒絕，冇尷尬等待。',
    privacyIntro: '有啲事，留喺兩個人之間會更好。',
    privacy1Title: 'Wave 會先替你保密。',
    privacy1Body: '除非對方都向你 Wave，否則冇人會知道係你。',
    privacy2Title: '保持聯絡，需要兩個 Yes。',
    privacy2Body: '單方面 Add Gymate，對方永遠唔會見到。',
    privacy3Title: '你嘅數字只屬於你。',
    privacy3Body: 'Wave 總數同等級都係私人，永遠唔係排行榜。',
    privacyLink: '了解 Gymley 點樣保障你嘅私隱',
    faqTitle: '第一次 Wave 之前，你可能會問。',
    faq1Q: 'Gymley 係約會 app 嗎？',
    faq1A: 'Gymley 幫成年人認識同一間健身室嘅人。一次對話可以變成約會、訓練伙伴，或者只係下次見面時更自然嘅一聲 Hi。',
    faq2Q: '對方會知道係我 Wave 佢嗎？',
    faq2A: '對方只會知道收到一個 Wave，但唔知道係邊個。只有佢都向你 Wave，你嘅身份先會出現。',
    faq3Q: '其中一個人離開會點？',
    faq3A: '任何一方離開健身室，Waveie 對話就會完結，除非你哋已經雙向成為 Gymates。',
    faq4Q: '一定要 check in 先用到訓練計劃？',
    faq4A: '唔需要。即使冇 check in 或者唔想識人，Programs 同訓練工具一樣用得到。',
    faq5Q: 'Ask a Spot 會唔會變成配對？',
    faq5A: '唔會。呢個只係為咗搵到對方同幫手睇位嘅短暫實用對話，唔會建立 Wave 或連結。',
    footerEyebrow: '你下一個最鍾意嘅人，可能已經喺呢度訓練。',
    footerTitle: '你帶嚟訓練。Gymley 令第一聲 Hi 更容易。',
    legalPrivacy: '私隱政策',
    legalTerms: '使用條款',
    legalCommunity: '社群守則',
    legalSupport: '支援',
    legalDelete: '刪除帳戶'
  };

  function setLanguage(language) {
    const isChinese = language === 'zh-HK';
    const source = isChinese ? cantonese : english;
    copyNodes.forEach((node) => {
      const value = source[node.dataset.copy];
      if (value) node.textContent = value;
    });
    document.documentElement.lang = isChinese ? 'zh-HK' : 'en';
    document.querySelectorAll('[data-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    document.querySelectorAll('a[href*="#privacy-"], a[href*="#terms-"], a[href*="#community-"], a[href*="#support-"], a[href*="#delete-"]').forEach((link) => {
      link.href = link.href.replace(/-(en|zh)$/, isChinese ? '-zh' : '-en');
    });
    try { localStorage.setItem('gymley-site-language', language); } catch (_) {}
  }

  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });
  let savedLanguage = 'en';
  try { savedLanguage = localStorage.getItem('gymley-site-language') || 'en'; } catch (_) {}
  setLanguage(savedLanguage === 'zh-HK' ? 'zh-HK' : 'en');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealNodes = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealNodes.forEach((node) => node.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealNodes.forEach((node) => revealObserver.observe(node));
  }

  const tour = document.querySelector('.tour-track');
  document.querySelectorAll('[data-tour]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = tour.querySelector('.tour-card');
      const distance = card ? card.getBoundingClientRect().width + 24 : tour.clientWidth * 0.8;
      tour.scrollBy({ left: button.dataset.tour === 'next' ? distance : -distance, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  const canvas = document.querySelector('#crowd-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  const sprite = new Image();
  const columns = 15;
  const rows = 7;
  let people = [];
  let frame = 0;
  let previousTime = 0;
  let canvasVisible = true;

  function makePeople(width, height) {
    const count = width < 620 ? 15 : width < 1000 ? 22 : 30;
    people = Array.from({ length: count }, (_, index) => {
      const size = width < 620 ? 72 + Math.random() * 46 : 90 + Math.random() * 82;
      return {
        sprite: Math.floor(Math.random() * columns * rows),
        x: (index / count) * width + (Math.random() - 0.5) * (width / count),
        y: height * (0.12 + Math.random() * 0.66),
        size,
        speed: (8 + Math.random() * 18) * (Math.random() > 0.5 ? 1 : -1),
        bob: Math.random() * Math.PI * 2,
        flip: Math.random() > 0.5
      };
    }).sort((a, b) => a.y - b.y);
  }

  function resizeCanvas() {
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.max(1, Math.round(bounds.width * ratio));
    canvas.height = Math.max(1, Math.round(bounds.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    makePeople(bounds.width, bounds.height);
    drawCrowd(0);
  }

  function drawCrowd(time) {
    const bounds = canvas.getBoundingClientRect();
    context.clearRect(0, 0, bounds.width, bounds.height);
    if (!sprite.complete || !sprite.naturalWidth) return;
    const sourceWidth = sprite.naturalWidth / columns;
    const sourceHeight = sprite.naturalHeight / rows;
    people.forEach((person) => {
      const column = person.sprite % columns;
      const row = Math.floor(person.sprite / columns);
      const height = person.size * 1.46;
      const y = person.y + Math.sin(time / 800 + person.bob) * 4;
      context.save();
      context.translate(person.x, y);
      if (person.flip) context.scale(-1, 1);
      context.drawImage(sprite, column * sourceWidth, row * sourceHeight, sourceWidth, sourceHeight, -person.size / 2, -height / 2, person.size, height);
      context.restore();
    });
  }

  function animate(time) {
    if (!previousTime) previousTime = time;
    const elapsed = Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    const width = canvas.getBoundingClientRect().width;
    people.forEach((person) => {
      person.x += person.speed * elapsed;
      if (person.speed > 0 && person.x - person.size / 2 > width) person.x = -person.size / 2;
      if (person.speed < 0 && person.x + person.size / 2 < 0) person.x = width + person.size / 2;
    });
    drawCrowd(time);
    if (canvasVisible) frame = requestAnimationFrame(animate);
  }

  sprite.addEventListener('load', () => {
    resizeCanvas();
    if (!reduceMotion) frame = requestAnimationFrame(animate);
  });
  sprite.src = 'assets/all-peeps.png';
  window.addEventListener('resize', resizeCanvas, { passive: true });
  if ('IntersectionObserver' in window && !reduceMotion) {
    new IntersectionObserver(([entry]) => {
      canvasVisible = entry.isIntersecting;
      if (canvasVisible && !frame) frame = requestAnimationFrame(animate);
      if (!canvasVisible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { threshold: 0 }).observe(canvas);
  }
})();
