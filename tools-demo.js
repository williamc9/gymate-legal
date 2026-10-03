(() => {
  const $ = id => document.getElementById(id);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const make = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  // Fictional recipients. No messages, permissions, persistence or API calls.
  const people = ['Jo', 'Kai', 'Ava', 'Sam', 'May', 'Leo'];
  // Authored demo characters, not inferred data about real people.
  const genders = ['woman', 'woman', 'man', 'man', 'woman', 'man'];
  let preference = 'anyone';
  const eligible = index => preference === 'anyone' || genders[index] === preference;
  const audience = () => preference === 'anyone' ? 'people' : preference === 'man' ? 'men' : 'women';
  let spotState = 'idle';
  let station = 'Bench';
  let pending = [];
  const recipients = people.map((name, index) => {
    const button = make('button', undefined, 'spot-recipient');
    button.type = 'button'; button.disabled = true;
    button.style.setProperty('--person', index);
    const peep = make('span', undefined, 'spot-peep');
    peep.setAttribute('aria-hidden', 'true');
    const cell = [18, 42, 67, 24, 80, 36][index];
    peep.style.backgroundPosition = `${cell % 15 / 14 * 100}% ${Math.floor(cell / 15) / 6 * 100}%`;
    const badge = make('span', '', 'spot-ping');
    button.append(peep, make('strong', name), badge);
    button.setAttribute('aria-label', `${name}, in the same gym`);
    button.addEventListener('click', () => {
      if (spotState !== 'delivered' || !eligible(index)) return;
      spotState = 'accepted'; $('spot-network').dataset.state = spotState;
      recipients.forEach((person, i) => {
        person.button.disabled = true;
        person.button.classList.toggle('is-helper', i === index);
        person.badge.textContent = i === index ? 'On my way!' : eligible(i) ? 'Taken' : '';
        person.button.setAttribute('aria-label', !eligible(i) ? `${people[i]}, not included in this request` : i === index ? `${name} accepted and is on the way` : `${people[i]}: request taken by ${name}`);
      });
      $('spot-status').textContent = `${name} accepted. “On my way to the ${station === 'Squat' ? 'squat rack' : 'bench'}!” One helper takes it; the request closes for everyone else. (Demo)`;
      $('send-spot-demo').textContent = 'Try another request';
      $('send-spot-demo').focus({ preventScroll: true });
    });
    $('spot-recipients').append(button);
    return { button, badge };
  });
  const clearDelivery = () => { pending.forEach(clearTimeout); pending = []; };
  function updateAudience() {
    const paths = document.querySelectorAll('.spot-connections path');
    recipients.forEach(({button}, i) => {
      button.classList.toggle('is-excluded', !eligible(i));
      paths[i].classList.toggle('is-excluded', !eligible(i));
      button.setAttribute('aria-label', eligible(i) ? `${people[i]}, in the same gym` : `${people[i]}, not included in this request`);
    });
    $('spot-status').textContent = `Mina needs a hand. Ask the ${audience()} in her gym.`;
  }
  function resetSpot() {
    clearDelivery(); spotState = 'idle'; $('spot-network').dataset.state = spotState;
    recipients.forEach(({button, badge}, i) => {
      button.disabled = true; button.classList.remove('is-received', 'is-helper'); badge.textContent = '';
      button.setAttribute('aria-label', `${people[i]}, in the same gym`);
    });
    document.querySelectorAll('[data-station], [data-spot-preference]').forEach(button => button.disabled = false);
    $('send-spot-demo').disabled = false; $('send-spot-demo').textContent = 'Send spot request';
    updateAudience();
  }
  function deliver(index) {
    if (!eligible(index)) return;
    const {button, badge} = recipients[index];
    button.classList.add('is-received'); badge.textContent = 'Spot?';
    button.setAttribute('aria-label', `${people[index]} received Mina’s ${station.toLowerCase()} request. Accept as ${people[index]}`);
  }
  function finishDelivery() {
    if (spotState !== 'sending') return;
    clearDelivery(); recipients.forEach((_, i) => deliver(i));
    spotState = 'delivered'; $('spot-network').dataset.state = spotState;
    recipients.forEach(({button}, i) => button.disabled = !eligible(i));
    $('send-spot-demo').disabled = false; $('send-spot-demo').textContent = 'Reset request';
    $('spot-status').textContent = `${preference === 'anyone' ? 'Six' : 'Three'} ${audience()} in Mina’s gym received it. Tap one of them to play the helper.`;
  }
  $('send-spot-demo').addEventListener('click', () => {
    if (spotState !== 'idle') { resetSpot(); return; }
    spotState = 'sending'; $('spot-network').dataset.state = spotState;
    document.querySelectorAll('[data-station], [data-spot-preference]').forEach(button => button.disabled = true);
    $('send-spot-demo').disabled = true; $('send-spot-demo').textContent = 'Asking the gym…';
    $('spot-status').textContent = `One request, reaching the ${audience()} in this gym…`;
    if (reducedMotion.matches) { finishDelivery(); return; }
    recipients.map((_, i) => i).filter(eligible).forEach((index, order) => pending.push(setTimeout(() => deliver(index), 250 + order * 220)));
    pending.push(setTimeout(finishDelivery, 1700));
  });
  document.querySelectorAll('[data-station]').forEach(button => button.addEventListener('click', () => {
    if (spotState !== 'idle') return;
    station = button.dataset.station;
    document.querySelectorAll('[data-station]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    $('spot-station-label').textContent = `${station} · a little help?`;
  }));
  document.querySelectorAll('[data-spot-preference]').forEach(button => button.addEventListener('click', () => {
    if (spotState !== 'idle') return;
    preference = button.dataset.spotPreference;
    document.querySelectorAll('[data-spot-preference]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    updateAudience();
  }));
  document.addEventListener('visibilitychange', () => { if (document.hidden) finishDelivery(); });
  new IntersectionObserver(entries => { if (!entries[0].isIntersecting) finishDelivery(); }).observe($('panel-spot'));

  // Native flow, intentionally reduced to a small in-memory playground.
  const catalogue = {
    Chest: ['Bench press', 'Push-up', 'Chest fly'],
    Back: ['Lat pulldown', 'Seated row', 'Pull-up'],
    Legs: ['Squat', 'Leg press', 'Lunge'],
    Shoulders: ['Shoulder press', 'Lateral raise'],
    Arms: ['Bicep curl', 'Tricep pushdown'],
    Core: ['Crunch', 'Leg raise']
  };
  const moves = [];
  [['demo-sets', 'Sets'], ['demo-reps', 'Reps'], ['demo-rest', 'Rest']].forEach(([id, label]) => $(id).setAttribute('aria-label', label));
  let nextId = 1;
  const nameInput = $('demo-program-name');
  nameInput.addEventListener('input', () => $('create-demo-button').disabled = !nameInput.value.trim());
  $('create-demo-program').addEventListener('submit', event => {
    event.preventDefault(); const name = nameInput.value.trim(); if (!name) return;
    $('demo-program-title').textContent = name;
    $('create-demo-program').hidden = true; $('demo-program-builder').hidden = false;
    $('program-status').textContent = `“${name}” is ready. Add your first exercise.`;
    $('open-exercise-picker').focus({ preventScroll: true });
  });
  function closePicker() {
    $('demo-exercise-picker').hidden = true;
    $('open-exercise-picker').setAttribute('aria-expanded', 'false');
  }
  $('open-exercise-picker').addEventListener('click', () => {
    if (moves.length >= 6) return;
    $('demo-exercise-picker').reset(); $('demo-exercise-choice').hidden = true; $('demo-exercise-config').hidden = true;
    $('demo-exercise-picker').hidden = false;
    $('open-exercise-picker').setAttribute('aria-expanded', 'true');
    $('demo-muscle').focus({ preventScroll: true });
  });
  $('cancel-exercise').addEventListener('click', () => { closePicker(); $('open-exercise-picker').focus({preventScroll:true}); });
  $('demo-muscle').addEventListener('change', () => {
    const options = catalogue[$('demo-muscle').value];
    $('demo-exercise-choice').hidden = !options; $('demo-exercise-config').hidden = true;
    const placeholder = make('option', 'Choose a move…'); placeholder.value = '';
    $('demo-exercise').replaceChildren(placeholder, ...(options ?? []).map(name => make('option', name)));
  });
  $('demo-exercise').addEventListener('change', () => $('demo-exercise-config').hidden = !$('demo-exercise').value);
  function renderMoves(focusId, focusAction) {
    const rows = moves.map((move, index) => {
      const row = make('li'); row.dataset.moveId = String(move.id);
      const copy = make('span', undefined, 'move-copy');
      copy.append(make('strong', move.name), make('small', `${move.sets} sets · ${move.reps} reps · ${move.rest}s rest`));
      const actions = make('span', undefined, 'move-actions');
      [['up', '↑', 'Move up'], ['down', '↓', 'Move down'], ['remove', '×', 'Remove']].forEach(([action, glyph, label]) => {
        const button = make('button', glyph); button.type = 'button'; button.dataset.action = action;
        button.setAttribute('aria-label', `${label}: ${move.name}, exercise ${index + 1}`);
        button.disabled = (action === 'up' && index === 0) || (action === 'down' && index === moves.length - 1);
        actions.append(button);
      });
      row.append(copy, actions); return row;
    });
    $('exercise-order').replaceChildren(...rows);
    $('empty-program').hidden = moves.length > 0;
    $('open-exercise-picker').disabled = moves.length >= 6;
    $('open-exercise-picker').textContent = moves.length >= 6 ? 'Your 6-move demo is ready' : '+ Add exercise';
    if (focusId !== undefined) {
      const row = rows.find(item => Number(item.dataset.moveId) === focusId);
      const button = row?.querySelector(`[data-action="${focusAction}"]`);
      if (button && !button.disabled) button.focus({preventScroll:true});
      else if (row) { row.tabIndex = -1; row.focus({preventScroll:true}); }
      else $('open-exercise-picker').focus({preventScroll:true});
    }
  }
  $('demo-exercise-picker').addEventListener('submit', event => {
    event.preventDefault();
    const name = $('demo-exercise').value;
    if (moves.length >= 6 || !catalogue[$('demo-muscle').value]?.includes(name)) return;
    moves.push({id:nextId++, name, sets:$('demo-sets').value, reps:$('demo-reps').value, rest:$('demo-rest').value});
    renderMoves(); closePicker();
    $('program-status').textContent = `${name} added. ${moves.length} ${moves.length === 1 ? 'exercise' : 'exercises'} in your program. Keep adding, or use the arrows to change the order.`;
    if (moves.length < 6) $('open-exercise-picker').focus({preventScroll:true});
    else $('demo-program-title').focus({preventScroll:true});
  });
  $('exercise-order').addEventListener('click', event => {
    const button = event.target.closest('button[data-action]'); if (!button || button.disabled) return;
    const index = moves.findIndex(move => move.id === Number(button.closest('li').dataset.moveId));
    if (index < 0) return;
    const move = moves[index]; const action = button.dataset.action;
    if (action === 'remove') moves.splice(index, 1);
    else { const next = index + (action === 'up' ? -1 : 1); if (next < 0 || next >= moves.length) return; [moves[index], moves[next]] = [moves[next], moves[index]]; }
    renderMoves(move.id, action);
    $('program-status').textContent = action === 'remove' ? `${move.name} removed.` : `${move.name} is now exercise ${moves.indexOf(move) + 1}. Your workout, your order.`;
  });
  $('reset-demo-program').addEventListener('click', () => {
    moves.length = 0; renderMoves(); closePicker();
    $('demo-program-builder').hidden = true; $('create-demo-program').hidden = false;
    $('create-demo-program').reset(); $('create-demo-button').disabled = true;
    $('program-status').textContent = 'A fresh page. What will you call this one?'; nameInput.focus({preventScroll:true});
  });
})();
