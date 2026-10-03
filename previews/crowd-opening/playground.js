(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const tabs = [...document.querySelectorAll('[data-tool]')];
  const panels = [...document.querySelectorAll('.tool-panel')];
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
    harbour: { name: 'Your gym · Harbour Fit', range: '20–30', busy: 'Moderate', women: 40, peak: 'Mon 18:00–20:00 UTC', peeps: 6, distance: 0, detail: 'Your starting point. A familiar room, a few new faces.', spriteOffset: 2 },
    corner: { name: 'Corner Club', range: '0–10', busy: 'Quiet', women: null, peak: null, peeps: 3, distance: 1.2, detail: '1.2 km away in this demo. Just around the corner.', spriteOffset: 18 },
    park: { name: 'Park Studio', range: '30–40', busy: 'Busy', women: 55, peak: 'Sat 10:00–12:00 UTC', peeps: 9, distance: 7.4, detail: '7.4 km away in this demo. Different gym. More people to meet.', spriteOffset: 35 },
    loft: { name: 'The Loft', range: '10–20', busy: 'Moderate', women: 65, peak: 'Thu 16:00–18:00 UTC', peeps: 5, distance: 15.6, detail: '15.6 km away in this demo. A little further, still within reach.', spriteOffset: 59 }
  };
  const rangeButtons = [...document.querySelectorAll('.reach-controls button')];
  const gymButtons = [...document.querySelectorAll('[data-gym]')];
  const map = document.querySelector('.neighbourhood-map');
  const crowd = document.getElementById('snapshot-crowd');
  let selectedGym = 'harbour';
  // The same four categories as Favorite Gyms, with fictional banded values.
  gymButtons.forEach(button => {
    const gym = gyms[button.dataset.gym];
    const stats = document.createElement('span'); stats.className = 'pin-stats';
    const range = document.createElement('strong'); range.textContent = gym.range;
    const busy = document.createElement('span'); busy.className = 'pin-busy'; busy.textContent = gym.busy;
    const population = document.createElement('span'); population.className = 'pin-population';
    const unit = document.createElement('span'); unit.className = 'pin-unit'; unit.textContent = 'people';
    population.append(range, unit);
    stats.append(population, busy);
    const mix = document.createElement('span'); mix.className = 'pin-mix';
    if (gym.women !== null) {
      const bar = document.createElement('span'); bar.className = 'mix-bar'; bar.setAttribute('aria-hidden', 'true');
      const women = document.createElement('span'); women.style.width = `${gym.women}%`;
      const men = document.createElement('span'); men.style.width = `${100 - gym.women}%`;
      bar.append(women, men);
      const labels = document.createElement('span'); labels.textContent = `Women ≈${gym.women}% · Men ≈${100 - gym.women}%`;
      mix.append(bar, labels);
    } else mix.textContent = 'Mix private · small crowd';
    button.append(stats, mix);
    button.dataset.busy = gym.busy.toLowerCase();
  });
  function selectGym(id) {
    selectedGym = id;
    const gym = gyms[id];
    gymButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.gym === id)));
    document.getElementById('snapshot-title').textContent = gym.name;
    document.getElementById('snapshot-count').replaceChildren();
    const count = document.createElement('strong'); count.textContent = gym.range;
    document.getElementById('snapshot-count').append(count, ' people checked in');
    document.getElementById('snapshot-detail').textContent = gym.detail;
    const busy = document.getElementById('snapshot-busy');
    busy.textContent = gym.busy; busy.dataset.busy = gym.busy.toLowerCase();
    document.getElementById('snapshot-mix').hidden = gym.women === null;
    document.getElementById('mix-unavailable').hidden = gym.women !== null;
    if (gym.women !== null) {
      document.getElementById('mix-women').style.width = `${gym.women}%`;
      document.getElementById('mix-men').style.width = `${100 - gym.women}%`;
      document.getElementById('women-label').textContent = `Women ≈${gym.women}%`;
      document.getElementById('men-label').textContent = `Men ≈${100 - gym.women}%`;
    }
    document.getElementById('snapshot-peak').textContent = gym.peak ? `Peak hours · ${gym.peak}` : 'Peak hours · Not enough data yet';
    const peeps = Array.from({ length: gym.peeps }, (_, i) => {
      const cell = (gym.spriteOffset + i * 3) % 105;
      const peep = document.createElement('span'); peep.className = 'snapshot-peep';
      peep.style.backgroundPosition = `${(cell % 15) / 14 * 100}% ${Math.floor(cell / 15) / 6 * 100}%`;
      peep.style.animationDelay = `${i * 24}ms`;
      return peep;
    });
    crowd.replaceChildren(...peeps);
    const gathering = document.getElementById('map-gathering');
    const point = { harbour: [53, 55], corner: [37, 89], park: [40, 33], loft: [83, 51] }[id];
    gathering.style.left = `${point[0]}%`;
    gathering.style.top = `${point[1]}%`;
    gathering.replaceChildren(...peeps.map(peep => peep.cloneNode()));
  }
  rangeButtons.forEach(button => button.addEventListener('click', () => {
    const range = Number(button.dataset.range);
    map.dataset.range = String(range);
    rangeButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    gymButtons.forEach(item => {
      item.disabled = gyms[item.dataset.gym].distance > range;
      item.setAttribute('aria-label', item.disabled ? `${gyms[item.dataset.gym].name}, outside selected range` : `${gyms[item.dataset.gym].name}, ${gyms[item.dataset.gym].range} people, ${gyms[item.dataset.gym].busy}. Show sample Crowd Insights`);
    });
    if (gyms[selectedGym].distance > range) selectGym('harbour');
    const within = Object.values(gyms).filter(gym => gym.distance <= range);
    const strong = document.createElement('strong'); strong.textContent = `${within.length} gyms`;
    document.getElementById('reach-summary').replaceChildren(strong, ' within reach. Tap one for a little inside look.');
  }));
  gymButtons.forEach(button => button.addEventListener('click', () => selectGym(button.dataset.gym)));
  selectGym(selectedGym);
  rangeButtons.find(button => button.getAttribute('aria-pressed') === 'true').click();
})();
