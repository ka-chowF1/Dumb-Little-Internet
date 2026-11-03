(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const games = window.GAMES || [];

  /* ---------- Pick a game for me ---------- */
  const pick = $('#pick'), again = $('#spin-again'), face = $('#face'), reel = $('#face-reel'), status = $('#pick-status');
  let spinning = false, last = -1;

  function choose() {
    let i;
    do { i = Math.floor(Math.random() * games.length); } while (games.length > 1 && i === last);
    return i;
  }
  function spin(event) {
    if (pick.dataset.ready === 'true' && event?.currentTarget === pick) return; // a landed pick is a normal link
    event?.preventDefault();
    if (spinning || !games.length) return;
    spinning = true;
    const target = choose();
    last = target;
    face.classList.remove('is-picked');
    face.classList.add('is-spinning');
    pick.dataset.ready = 'false';
    pick.removeAttribute('href');
    pick.setAttribute('aria-disabled', 'true');
    pick.textContent = 'Choosing…';
    again.hidden = true;
    status.textContent = '';
    const ticks = reduced ? 1 : 16;
    let t = 0, idx = Math.floor(Math.random() * games.length);
    const step = () => {
      t++;
      idx = t >= ticks ? target : (idx + 1) % games.length;
      reel.textContent = games[idx].name;
      const delay = t <= 6 ? 340 : 200 + (t - 7) * 30; // a long, clearly visible opening, then a quicker finish
      if (t < ticks) setTimeout(step, delay);
      else land(games[target]);
    };
    step();
  }
  function land(game) {
    spinning = false;
    face.classList.remove('is-spinning');
    face.classList.add('is-picked');
    pick.dataset.ready = 'true';
    pick.href = game.url;
    pick.target = '_blank';
    pick.rel = 'noopener';
    pick.removeAttribute('aria-disabled');
    pick.textContent = `Play ${game.name}`;
    again.hidden = false;
    status.textContent = `The internet has chosen ${game.name}.`;
    pick.focus({ preventScroll: true });
  }
  if (pick && face) {
    pick.addEventListener('click', spin);
    again.addEventListener('click', spin);
  }

  /* ---------- Eased scroll to in-page sections (nav, footer, back to top) ---------- */
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function glideTo(y) {
    if (reduced) { window.scrollTo(0, y); return; }
    const start = window.scrollY, distance = y - start;
    const duration = Math.min(1400, Math.max(600, 400 + Math.abs(distance) * 0.35));
    const t0 = performance.now();
    const frame = now => {
      const k = Math.min(1, (now - t0) / duration);
      window.scrollTo(0, start + distance * easeInOut(k));
      if (k < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.id === 'pick') return; // the picker has its own behaviour
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = id === 'top' ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const y = id === 'top' ? 0 : Math.min(maxY, target.getBoundingClientRect().top + window.scrollY);
      glideTo(y);
      history.replaceState(null, '', id === 'top' ? '#top' : '#' + id);
    });
  });

  /* ---------- reveals ---------- */
  document.querySelectorAll('.chapter').forEach(ch => ch.querySelectorAll('[data-reveal]').forEach((el, n) => el.style.setProperty('--n', n)));
  const targets = document.querySelectorAll('[data-reveal], .shutter');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
    targets.forEach(t => io.observe(t));
  } else targets.forEach(t => t.classList.add('is-in'));

  /* ---------- hero face drifts with the scroll ---------- */
  const wrap = $('.face-wrap');
  if (wrap && !reduced) {
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => { const y = Math.min(scrollY, innerHeight); wrap.style.setProperty('transform', `translateY(${y * 0.18}px) rotate(${y * 0.02}deg)`); ticking = false; });
    }, { passive: true });
  }
})();
