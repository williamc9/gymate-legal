/* Original Canvas Crowd artwork and GSAP walking rhythm from Skiper39.
 * https://skiper-ui.com/registry/skiper39.json
 * Inspired by https://codepen.io/zadvorsky/pen/xxwbBQV
 * Illustrations: https://www.openpeeps.com/
 * Free version: attribution to Skiper UI required (included in the page footer).
 * Adaptations: responsive stage/density, DPR cap, reduced motion and pause controls.
 */
(() => {
  'use strict';
  const canvas = document.querySelector('#crowd');
  const ctx = canvas.getContext('2d');
  const control = document.querySelector('#motion-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const sprite = new Image();
  const columns = 15;
  const rows = 7;
  const stage = { width: 0, height: 0, scale: 1, dpr: 1 };
  const allPeeps = [];
  let crowd = [];
  let paused = reducedMotion.matches;
  let inView = true;
  let ready = false;
  let observing = false;
  let resizeTimer;
  let rendering = false;
  const random = (min, max) => min + Math.random() * (max - min);

  function newWalk(peep, progress = 0) {
    const direction = peep.direction;
    // Keep Skiper's power2 depth distribution and its quarter-second bob.
    const offsetY = 100 - 250 * gsap.parseEase('power2.in')(peep.depth);
    const startY = stage.height - peep.height + offsetY;
    const startX = direction === 1 ? -peep.width : stage.width + peep.width;
    const endX = direction === 1 ? stage.width : 0;
    peep.x = startX;
    peep.y = startY;
    peep.anchorY = startY;
    peep.scaleX = direction;
    const walk = gsap.timeline({ paused: true });
    walk.timeScale(peep.speed);
    walk.to(peep, { duration: 10, x: endX, ease: 'none' }, 0);
    walk.to(peep, { duration: 0.25, repeat: 40, yoyo: true, y: startY - 10 }, 0);
    walk.eventCallback('onComplete', () => {
      peep.depth = Math.random();
      peep.direction = Math.random() > 0.5 ? 1 : -1;
      peep.speed = random(0.5, 1.5);
      peep.walk.kill();
      peep.walk = newWalk(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      if (shouldMove()) peep.walk.play();
    });
    walk.progress(progress);
    return walk;
  }

  function render() {
    ctx.setTransform(stage.dpr, 0, 0, stage.dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width / stage.dpr, canvas.height / stage.dpr);
    ctx.scale(stage.scale, stage.scale);
    crowd.forEach((peep) => {
      ctx.save();
      ctx.translate(peep.x, peep.y);
      ctx.scale(peep.scaleX, 1);
      ctx.drawImage(sprite, peep.sx, peep.sy, peep.width, peep.height, 0, 0, peep.width, peep.height);
      ctx.restore();
    });
  }

  function shouldMove() { return ready && !paused && inView && !document.hidden; }
  function syncMotion() {
    const moving = shouldMove();
    crowd.forEach((peep) => moving ? peep.walk.resume() : peep.walk.pause());
    if (moving && !rendering) { gsap.ticker.add(render); rendering = true; }
    if (!moving && rendering) { gsap.ticker.remove(render); rendering = false; }
    control.setAttribute('aria-pressed', String(paused));
    control.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
    control.querySelector('.motion-label').textContent = paused ? 'Play' : 'Pause';
    control.querySelector('.motion-symbol').textContent = paused ? '▶' : 'Ⅱ';
    render();
  }

  function resize() {
    if (!ready) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    // Physical drawing size, not a CSS-scaled desktop canvas. Faces stay legible.
    const figureWidth = Math.min(188, Math.max(130, rect.width * 0.2));
    const scale = figureWidth / allPeeps[0].width;
    const count = Math.min(105, Math.max(20, Math.round(rect.width / figureWidth * 7)));
    const existing = new Map(crowd.map((peep) => [peep.id, { peep, progress: peep.walk.progress() }]));
    crowd.forEach((peep) => peep.walk.kill());
    stage.scale = scale;
    stage.width = rect.width / scale;
    stage.height = rect.height / scale;
    stage.dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * stage.dpr);
    canvas.height = Math.round(rect.height * stage.dpr);
    crowd = allPeeps.slice(0, count).map((source) => {
      const previous = existing.get(source.id);
      const peep = previous ? previous.peep : { ...source, depth: Math.random(), direction: Math.random() > 0.5 ? 1 : -1, speed: random(0.5, 1.5) };
      peep.walk = newWalk(peep, previous ? previous.progress : Math.random());
      return peep;
    });
    crowd.sort((a, b) => a.anchorY - b.anchorY);
    canvas.dataset.people = String(count);
    canvas.dataset.figureWidth = String(Math.round(figureWidth));
    syncMotion();
  }

  sprite.onload = () => {
    const width = sprite.naturalWidth / columns;
    const height = sprite.naturalHeight / rows;
    for (let id = 0; id < columns * rows; id++) {
      allPeeps.push({ id, sx: (id % columns) * width, sy: Math.floor(id / columns) * height, width, height });
    }
    // Shuffle once. Keep the selected original characters through screen rotations.
    for (let index = allPeeps.length - 1; index > 0; index--) {
      const target = Math.floor(Math.random() * (index + 1));
      [allPeeps[index], allPeeps[target]] = [allPeeps[target], allPeeps[index]];
    }
    ready = true;
    resize();
    if (!observing) {
      new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 100); }).observe(canvas);
      observing = true;
    }
  };
  sprite.onerror = () => { control.hidden = true; };
  sprite.src = 'assets/all-peeps.png';
  control.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reducedMotion.addEventListener('change', (event) => { paused = event.matches; syncMotion(); });
  document.addEventListener('visibilitychange', syncMotion);
  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (ready) syncMotion(); }).observe(canvas);
})();
