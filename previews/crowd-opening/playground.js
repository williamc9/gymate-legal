(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const tabs = [...document.querySelectorAll('[data-tool]')];
  const panels = [...document.querySelectorAll('.tool-panel')];
  const offer = document.getElementById('offer-spot');
  const reply = document.getElementById('spot-reply');
  const spotStatus = document.getElementById('spot-status');
  const order = document.getElementById('exercise-order');
  const timerButton = document.getElementById('start-breather');
  const timerDisplay = document.getElementById('breather-time');
  const timerRing = document.getElementById('breather-progress');
  const timerStatus = document.getElementById('breather-status');
  let remaining = 8000;
  let deadline = 0;
  let timer = null;

  function paintTimer() {
    timerDisplay.textContent = `0:${String(Math.ceil(remaining / 1000)).padStart(2, '0')}`;
    timerRing.style.strokeDashoffset = String(100 - remaining / 80);
  }
  function pauseTimer() {
    if (timer === null) return;
    remaining = Math.max(0, deadline - performance.now());
    clearInterval(timer);
    timer = null;
    paintTimer();
    timerButton.textContent = 'Resume your breather';
    timerStatus.textContent = 'Paused. Take your time.';
  }
  function activateTool(tab, moveFocus = false) {
    pauseTimer();
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => panel.hidden = panel.id !== tab.getAttribute('aria-controls'));
    if (moveFocus) tab.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTool(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activateTool(tabs[next], true); }
    });
  });
  document.querySelectorAll('[data-pick-tool]').forEach(button => button.addEventListener('click', () => {
    activateTool(tabs.find(tab => tab.dataset.tool === button.dataset.pickTool));
  }));
  offer.addEventListener('click', () => {
    const reset = !reply.hidden;
    reply.hidden = reset;
    offer.textContent = reset ? 'I’ve got you' : 'Try that hello again';
    spotStatus.textContent = reset ? 'A little backup, right when you need it.' : 'A little help. A less awkward hello. (Demo only.)';
  });
  order.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const row = button.closest('li');
    const before = [...order.children].map(item => [item, item.getBoundingClientRect().top]);
    if (!row.previousElementSibling) return;
    order.insertBefore(row, row.previousElementSibling);
    [...order.children].forEach((item, index) => item.querySelector('button').disabled = index === 0);
    if (!reduceMotion.matches) before.forEach(([item, top]) => {
      const delta = top - item.getBoundingClientRect().top;
      item.animate([{ transform: `translateY(${delta}px)` }, { transform: 'translateY(0)' }], { duration: 280, easing: 'ease-out' });
    });
    document.getElementById('program-status').textContent = `${row.querySelector('strong').textContent} is now ${[...order.children].indexOf(row) + 1} of 3. Your plan, your order.`;
    if (button.disabled) { row.tabIndex = -1; row.focus({ preventScroll: true }); }
    else button.focus({ preventScroll: true });
  });
  order.firstElementChild.querySelector('button').disabled = true;
  timerButton.addEventListener('click', () => {
    if (timer !== null) { pauseTimer(); return; }
    if (remaining <= 0) remaining = 8000;
    deadline = performance.now() + remaining;
    timerButton.textContent = 'Pause your breather';
    timerStatus.textContent = 'Breathe in. Breathe out.';
    timer = setInterval(() => {
      remaining = Math.max(0, deadline - performance.now());
      paintTimer();
      if (remaining <= 0) {
        clearInterval(timer); timer = null;
        timerButton.textContent = 'Take another breather';
        timerStatus.textContent = 'Ready when you are. You’ve got this.';
      }
    }, 80);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pauseTimer(); });
  new IntersectionObserver(entries => { if (!entries[0].isIntersecting) pauseTimer(); }).observe(document.getElementById('panel-rest'));

  // Fictional, fixed marketing demo data. No location permission or backend request.
  const gyms = {
    harbour: { name: 'Your gym · Harbour Fit', count: 4, distance: 0, detail: 'Your starting point. A familiar room, a few new faces.', spriteOffset: 2 },
    corner: { name: 'Corner Club', count: 7, distance: 1.2, detail: '1.2 km away in this demo. Just around the corner.', spriteOffset: 18 },
    park: { name: 'Park Studio', count: 12, distance: 7.4, detail: '7.4 km away in this demo. Different gym. More people to meet.', spriteOffset: 35 },
    loft: { name: 'The Loft', count: 6, distance: 15.6, detail: '15.6 km away in this demo. A little further, still within reach.', spriteOffset: 59 }
  };
  const rangeButtons = [...document.querySelectorAll('.reach-controls button')];
  const gymButtons = [...document.querySelectorAll('[data-gym]')];
  const map = document.querySelector('.neighbourhood-map');
  const crowd = document.getElementById('snapshot-crowd');
  let selectedGym = 'harbour';
  function selectGym(id) {
    selectedGym = id;
    const gym = gyms[id];
    gymButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.gym === id)));
    document.getElementById('snapshot-title').textContent = gym.name;
    document.getElementById('snapshot-count').replaceChildren();
    const count = document.createElement('strong'); count.textContent = String(gym.count);
    document.getElementById('snapshot-count').append(count, ' Gymley members checked in');
    document.getElementById('snapshot-detail').textContent = gym.detail;
    const peeps = Array.from({ length: gym.count }, (_, i) => {
      const cell = (gym.spriteOffset + i * 3) % 105;
      const peep = document.createElement('span'); peep.className = 'snapshot-peep';
      peep.style.backgroundPosition = `${(cell % 15) / 14 * 100}% ${Math.floor(cell / 15) / 6 * 100}%`;
      peep.style.animationDelay = `${i * 24}ms`;
      return peep;
    });
    crowd.replaceChildren(...peeps);
    const gathering = document.getElementById('map-gathering');
    const point = { harbour: [53, 62], corner: [37, 78], park: [40, 35], loft: [83, 47] }[id];
    gathering.style.left = `${point[0]}%`;
    gathering.style.top = `${point[1]}%`;
    gathering.replaceChildren(...peeps.map(peep => peep.cloneNode()));
  }
  rangeButtons.forEach(button => button.addEventListener('click', () => {
    const range = Number(button.dataset.range);
    map.dataset.range = String(range);
    rangeButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    gymButtons.forEach(item => item.disabled = gyms[item.dataset.gym].distance > range);
    if (gyms[selectedGym].distance > range) selectGym('harbour');
    const within = Object.values(gyms).filter(gym => gym.distance <= range);
    const total = within.reduce((sum, gym) => sum + gym.count, 0);
    const strong = document.createElement('strong'); strong.textContent = `${total} people`;
    document.getElementById('reach-summary').replaceChildren(strong, ` across ${within.length} gyms in this demo.`);
  }));
  gymButtons.forEach(button => button.addEventListener('click', () => selectGym(button.dataset.gym)));
  selectGym(selectedGym);
})();
