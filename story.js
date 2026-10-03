(() => {
  const story = document.querySelector('.wave-story');
  const stage = story.querySelector('.story-stage');
  const captions = [...story.querySelectorAll('.story-caption')];
  const screens = [...story.querySelectorAll('.story-screen')];
  const messages = [...story.querySelectorAll('[data-message]')];
  const lateMessages = [...story.querySelectorAll('[data-late]')];
  const steps = [...story.querySelectorAll('[data-step]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const shortViewport = matchMedia('(max-height: 620px)');
  const duration = 14;
  const chapters = [0, 1.4, 3.05, 4.15, 5.35, 8.45, 11.5];
  const chapterStops = [.65, 2.3, 3.65, 4.8, 6.1, 9.5, 13.35];
  const screenStarts = [0, 2, 4.15, 5.35, 11.5];
  const messageStarts = [5.55, 6.45, 7.35];
  let timeline;
  let frame = 0;
  let currentChapter = -1;
  const q = selector => story.querySelector(selector);
  const indexAt = (time, points) => points.reduce((index, at, i) => time >= at ? i : index, 0);

  function render() {
    frame = 0;
    if (!timeline) return;
    const distance = Math.max(1, story.offsetHeight - stage.offsetHeight);
    const progress = Math.min(1, Math.max(0, -story.getBoundingClientRect().top / distance));
    const time = progress * duration;
    timeline.time(time);
    const chapter = indexAt(time, chapters);
    if (chapter !== currentChapter) {
      currentChapter = chapter;
      story.dataset.step = String(chapter);
      captions.forEach((caption, i) => caption.setAttribute('aria-hidden', String(i !== chapter)));
      steps.forEach((button, i) => i === chapter ? button.setAttribute('aria-current', 'step') : button.removeAttribute('aria-current'));
    }
    screens.forEach((screen, i) => screen.setAttribute('aria-hidden', String(i !== indexAt(time, screenStarts))));
    messages.forEach((message, i) => message.setAttribute('aria-hidden', String(time < messageStarts[i])));
    lateMessages.forEach((message, i) => message.setAttribute('aria-hidden', String(time < [12.05,12.85][i])));
    q('.anonymous-wave').setAttribute('aria-hidden', String(time < .15 || time >= 1.35));
    q('.gymate-choice').setAttribute('aria-hidden', String(time < 8.45 || time >= 11.5));
    q('.gymate-confirmation').setAttribute('aria-hidden', String(time < 10.45));
    q('.you-yes').setAttribute('aria-hidden', String(time < 9.05));
    q('.mina-yes').setAttribute('aria-hidden', String(time < 10.05));
  }

  function schedule() { if (!frame) frame = requestAnimationFrame(render); }

  function configure() {
    timeline?.kill();
    timeline = null;
    story.classList.remove('story-enhanced');
    const animated = [...screens, ...captions, ...messages, ...lateMessages,
      ...story.querySelectorAll('.anonymous-wave,.mina-card,.profile-wave,.wave-before,.wave-after,.gymate-choice,.choice-initial,.choice-wait,.choice-yes,.gymate-confirmation')];
    if (window.gsap) gsap.set(animated, { clearProps: 'all' });
    story.querySelectorAll('[aria-hidden]').forEach(element => {
      if (animated.includes(element)) element.removeAttribute('aria-hidden');
    });
    // Normal-flow transcript and completed chat remain available without motion or enough height.
    if (reducedMotion.matches || shortViewport.matches || !window.gsap) return;
    story.classList.add('story-enhanced');
    timeline = gsap.timeline({ paused: true });
    const reveal = (element, at, length = .23) => timeline.fromTo(element,
      { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: length, ease: 'power2.out' }, at);
    const hide = (element, at, length = .18) => timeline.to(element, { autoAlpha: 0, y: -12, duration: length }, at);
    const switchScreen = (from, to, at) => { hide(screens[from], at - .18); reveal(screens[to], at); };
    timeline.set([...screens.slice(1), ...captions.slice(1), ...messages, ...lateMessages,
      q('.anonymous-wave'), q('.wave-after'), q('.gymate-choice'), q('.you-yes'), q('.mina-yes'), q('.gymate-confirmation')], { autoAlpha: 0 });
    reveal(q('.anonymous-wave'), .15, .3);
    hide(q('.anonymous-wave'), 1.1, .25);
    // Only select a profile after the anonymous notice has gone; it is not a sender reveal.
    timeline.to(q('.mina-card'), { borderColor: '#ffb100', backgroundColor: '#fff7dc', duration: .25 }, 1.6);
    switchScreen(0, 1, 2);
    timeline.to(q('.profile-wave'), { scale: .95, duration: .15 }, 3.05);
    timeline.to(q('.profile-wave'), { scale: 1, backgroundColor: '#c2efdb', duration: .25 }, 3.2);
    hide(q('.wave-before'), 3.12, .13);
    reveal(q('.wave-after'), 3.25, .18);
    switchScreen(1, 2, 4.15);
    switchScreen(2, 3, 5.35);
    messageStarts.forEach((at, i) => reveal(messages[i], at, .35));
    reveal(q('.gymate-choice'), 8.45, .3);
    hide(q('.choice-initial'), 8.9, .15);
    reveal(q('.you-yes'), 9.05, .2);
    hide(q('.choice-wait'), 9.9, .15);
    reveal(q('.mina-yes'), 10.05, .2);
    reveal(q('.gymate-confirmation'), 10.45, .3);
    switchScreen(3, 4, 11.5);
    reveal(lateMessages[0], 12.05, .35);
    reveal(lateMessages[1], 12.85, .35);
    chapters.slice(1).forEach((at, i) => {
      hide(captions[i], at - .18);
      reveal(captions[i + 1], at, .22);
    });
    timeline.to({}, { duration: .8 }, 13.2);
    currentChapter = -1;
    schedule();
  }

  steps.forEach((button, index) => button.addEventListener('click', () => {
    if (!timeline) return;
    const top = window.scrollY + story.getBoundingClientRect().top;
    window.scrollTo({ top: top + (story.offsetHeight - stage.offsetHeight) * chapterStops[index] / duration, behavior: 'instant' });
  }));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  new ResizeObserver(schedule).observe(stage);
  reducedMotion.addEventListener('change', configure);
  shortViewport.addEventListener('change', configure);
  configure();
})();
