(() => {
  const story = document.querySelector('.wave-story');
  const stage = story.querySelector('.story-stage');
  const captions = [...story.querySelectorAll('.story-caption')];
  const messages = [...story.querySelectorAll('.story-message')];
  const steps = [...story.querySelectorAll('[data-step]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const shortViewport = matchMedia('(max-height: 560px)');
  let timeline;
  let frame = 0;
  let currentStep = -1;
  const beatPositions = [0.10, 0.43, 0.64, 0.88];

  function setStep(index) {
    if (index === currentStep) return;
    currentStep = index;
    story.dataset.step = String(index);
    captions.forEach((caption, i) => caption.setAttribute('aria-hidden', String(i !== index)));
    steps.forEach((button, i) => {
      if (i === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
  }

  function render() {
    frame = 0;
    if (!timeline) return;
    const rect = story.getBoundingClientRect();
    const distance = Math.max(1, story.offsetHeight - stage.offsetHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / distance));
    timeline.progress(progress);
    setStep(progress < .34 ? 0 : progress < .57 ? 1 : progress < .78 ? 2 : 3);
    messages.forEach((message, i) => message.setAttribute('aria-hidden', String(progress < [.34,.57,.78][i])));
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  function configure() {
    timeline?.kill();
    timeline = null;
    story.classList.remove('story-enhanced');
    // Revert only this preview's animated inline styles when accessibility preferences change.
    const animated = [...captions, ...messages, story.querySelector('.mutual-screen'), story.querySelector('.chat-screen')];
    if (window.gsap) gsap.set(animated, { clearProps: 'all' });
    captions.forEach((caption, i) => caption.setAttribute('aria-hidden', String(i !== 0)));
    messages.forEach(message => message.removeAttribute('aria-hidden'));
    // A short landscape window gets the complete readable chat in normal flow.
    // Never pin a phone taller than the available viewport.
    if (reducedMotion.matches || shortViewport.matches || !window.gsap) return;
    story.classList.add('story-enhanced');
    timeline = gsap.timeline({ paused: true });
    timeline.set(messages, { autoAlpha: 0, y: 22, scale: .96 });
    timeline.to('.mutual-screen', { autoAlpha: 0, y: -18, duration: .08 }, .23);
    timeline.fromTo('.chat-screen', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .09 }, .28);
    [0.34, 0.57, 0.78].forEach((at, i) => {
      timeline.to(captions[i], { autoAlpha: 0, y: -12, duration: .04 }, at - .04);
      timeline.fromTo(captions[i + 1], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .05 }, at);
      timeline.to(messages[i], { autoAlpha: 1, y: 0, scale: 1, duration: .065, ease: 'power2.out' }, at);
    });
    // Keep the last message on screen for a short final reading beat.
    timeline.to({}, { duration: .155 }, .845);
    currentStep = -1;
    schedule();
  }

  steps.forEach((button, index) => button.addEventListener('click', () => {
    if (!timeline) return;
    const top = window.scrollY + story.getBoundingClientRect().top;
    const distance = story.offsetHeight - stage.offsetHeight;
    // Exact scroll position, not a second time-based animation: touch, keys and buttons agree.
    window.scrollTo({ top: top + distance * beatPositions[index], behavior: 'instant' });
  }));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  new ResizeObserver(schedule).observe(stage);
  reducedMotion.addEventListener('change', configure);
  shortViewport.addEventListener('change', configure);
  configure();
})();
