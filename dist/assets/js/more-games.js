/* "Other games" teaser row. Shows 3 random games (never the current one), each linking to its page.
   tdliMoreGames({ current: '67-calculator', before: element, gap: [desktopPx, phonePx], theme: { label, ink, card, border, muted, font } }) */
(function () {
  var SRC = (document.currentScript && document.currentScript.getAttribute('src')) || 'assets/js/more-games.js';
  var ROOT = SRC.replace('assets/js/more-games.js', '');
  var INK = '#1a1d1e';
  var GAMES = [
    { id: '67-calculator', name: '67 Calculator', teaser: 'All roads lead to 67.', bg: '#ece9e1',
      art: '<rect x="40" y="8" width="40" height="64" rx="7" fill="#1a1d1e"/><rect x="46" y="14" width="28" height="16" rx="3" fill="#c5fa66"/><text x="70" y="27" text-anchor="end" font-family="monospace" font-weight="700" font-size="13" fill="#1a1d1e">67</text><g fill="#ece9e1"><circle cx="52" cy="42" r="3.4"/><circle cx="60" cy="42" r="3.4"/><circle cx="68" cy="42" r="3.4"/><circle cx="52" cy="52" r="3.4"/><circle cx="60" cy="52" r="3.4"/><circle cx="68" cy="52" r="3.4"/><circle cx="52" cy="62" r="3.4"/><circle cx="60" cy="62" r="3.4"/></g><circle cx="68" cy="62" r="3.4" fill="#f2a44b"/>' },
    { id: 'excuse-generator', name: 'Excuse Generator', teaser: 'Believability sold separately.', bg: '#5342df', fg: '#ffffff',
      art: '<path d="M22 14h76a8 8 0 0 1 8 8v30a8 8 0 0 1-8 8H58l-16 14v-14H22a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8z" fill="#ffffff"/><text x="60" y="43" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="13.5" fill="#5342df">my dog ate…</text>' },
    { id: 'rock-paper-scissors', name: 'Rock Paper Scissors', teaser: 'Three choices. One finger gun.', bg: '#f2a44b',
      art: '<path d="M14 52c0-9 6-16 15-16s14 5 14 13-5 15-14 15-15-3-15-12z" fill="#1a1d1e"/><path d="M50 22h28v38H50z" fill="#fffaf0" stroke="#1a1d1e" stroke-width="3"/><path d="M68 22v10h10" fill="#e8e0cf" stroke="#1a1d1e" stroke-width="3" stroke-linejoin="round"/><circle cx="92" cy="58" r="6" fill="none" stroke="#1a1d1e" stroke-width="4"/><circle cx="108" cy="58" r="6" fill="none" stroke="#1a1d1e" stroke-width="4"/><path d="M95 52l12-30M105 52L93 22" stroke="#1a1d1e" stroke-width="4" stroke-linecap="round"/>' },
    { id: 'wordle-for-dummies', name: 'Wordle for Dummies', teaser: 'Five letters. Six chances.', bg: '#eeff63',
      art: '<g font-family="Arial,sans-serif" font-weight="800" font-size="17" text-anchor="middle"><rect x="6" y="26" width="20" height="26" rx="4" fill="#1a1d1e"/><text x="16" y="45" fill="#fff">T</text><rect x="28" y="26" width="20" height="26" rx="4" fill="#f2c94c"/><text x="38" y="45" fill="#1a1d1e">R</text><rect x="50" y="26" width="20" height="26" rx="4" fill="#1a1d1e"/><text x="60" y="45" fill="#fff">Y</text><rect x="72" y="26" width="20" height="26" rx="4" fill="#5fbf6a"/><text x="82" y="45" fill="#1a1d1e">M</text><rect x="94" y="26" width="20" height="26" rx="4" fill="none" stroke="#1a1d1e" stroke-width="3"/><text x="104" y="45" fill="#1a1d1e">?</text></g>' },
    { id: 'fortune-cookie', name: 'Fortune Cookie', teaser: 'A little wisdom. A little disrespect.', bg: '#ffc2df',
      art: '<g transform="rotate(-8 60 62)"><rect x="36" y="52" width="48" height="16" rx="1.5" fill="#fffaf0" stroke="#1a1d1e" stroke-width="2.5"/><path d="M42 58h36M42 63h24" stroke="#1a1d1e" stroke-width="2" stroke-linecap="round"/></g><path d="M10 40C10 16 50 10 60 34 70 10 110 16 110 40 110 56 84 62 60 50 36 62 10 56 10 40z" fill="#e9b05a" stroke="#1a1d1e" stroke-width="3" stroke-linejoin="round"/><path d="M60 34c-4 6-4 12 0 16" fill="none" stroke="#1a1d1e" stroke-width="2.5" stroke-linecap="round"/><path d="M24 30c6-6 14-8 22-5" fill="none" stroke="#fbe0a8" stroke-width="3" stroke-linecap="round"/>' },
    { id: 'iq-test', name: 'IQ Test', teaser: 'Ten questions. One confident verdict.', bg: '#c9bfff',
      art: '<circle cx="60" cy="40" r="30" fill="#fffaf0" stroke="#1a1d1e" stroke-width="3"/><text x="60" y="38" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="22" fill="#1a1d1e">IQ</text><text x="60" y="58" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="18" fill="#5342df">???</text><path d="M60 6v-4M30 14l-3-3M90 14l3-3" stroke="#1a1d1e" stroke-width="3" stroke-linecap="round"/>' },
    { id: 'horoscope', name: 'Horoscope', teaser: 'Written in the stars. Probably a typo.', bg: '#ece9e1',
      art: '<path d="M72 12a28 28 0 1 0 12 50A24 24 0 0 1 72 12z" fill="#1a1d1e"/><g fill="#5342df"><path d="M92 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/><path d="M104 50l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2z"/></g><g fill="#1a1d1e"><circle cx="20" cy="22" r="2.5"/><circle cx="32" cy="64" r="2"/><circle cx="104" cy="12" r="2"/></g>' },
    { id: 'sorting-hat', name: 'The Sorting Hat', teaser: 'One very opinionated hat.', bg: '#5342df', fg: '#ffffff',
      art: '<path d="M26 62c10-3 18-14 22-30l8-22c4 8 8 16 12 28 4 12 14 20 24 24z" fill="#8a5a2b" stroke="#1a1d1e" stroke-width="3" stroke-linejoin="round"/><ellipse cx="60" cy="66" rx="46" ry="9" fill="#6b4220" stroke="#1a1d1e" stroke-width="3"/><circle cx="52" cy="46" r="2.8" fill="#1a1d1e"/><circle cx="68" cy="46" r="2.8" fill="#1a1d1e"/><path d="M50 55q10 6 20 0" fill="none" stroke="#1a1d1e" stroke-width="3" stroke-linecap="round"/>' },
    { id: 'to-do-tabloid', name: 'To-Do Tabloid', teaser: 'Tomorrow’s front-page scandal.', bg: '#ece9e1',
      art: '<rect x="22" y="8" width="76" height="64" rx="3" fill="#fffaf0" stroke="#1a1d1e" stroke-width="3"/><rect x="22" y="8" width="76" height="14" fill="#d72d22"/><text x="60" y="19" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="9" fill="#fff">EXTRA! EXTRA!</text><rect x="30" y="28" width="60" height="7" fill="#1a1d1e"/><rect x="30" y="39" width="26" height="22" fill="#cfc7b4"/><path d="M62 41h28M62 48h28M62 55h28" stroke="#1a1d1e" stroke-width="3"/>' },
    { id: 'dog-time-converter', name: 'Dog Time Converter', teaser: 'Your errand was a whole saga.', bg: '#eeff63',
      art: '<path d="M30 22L18 44l16 6zM90 22l12 22-16 6z" fill="#8a5a2b" stroke="#1a1d1e" stroke-width="3" stroke-linejoin="round"/><ellipse cx="60" cy="46" rx="30" ry="26" fill="#e2b77a" stroke="#1a1d1e" stroke-width="3"/><ellipse cx="60" cy="58" rx="14" ry="10" fill="#fffaf0" stroke="#1a1d1e" stroke-width="2.5"/><ellipse cx="60" cy="53" rx="5" ry="3.6" fill="#1a1d1e"/><circle cx="48" cy="40" r="3.4" fill="#1a1d1e"/><circle cx="72" cy="40" r="3.4" fill="#1a1d1e"/><circle cx="100" cy="16" r="11" fill="#fffaf0" stroke="#1a1d1e" stroke-width="3"/><path d="M100 9v8l5 3" fill="none" stroke="#1a1d1e" stroke-width="2.5" stroke-linecap="round"/>' },
    { id: 'laundry-label-decoder', name: 'Laundry Label Decoder', teaser: 'Your sweater has firm boundaries.', bg: '#c9bfff',
      art: '<path d="M30 12h60l6 8v44a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6V20z" fill="#fffaf0" stroke="#1a1d1e" stroke-width="3" stroke-linejoin="round"/><path d="M40 30h40l-5 22H45z" fill="none" stroke="#1a1d1e" stroke-width="3.5" stroke-linejoin="round"/><path d="M40 36q5 4 10 0t10 0 10 0" fill="none" stroke="#1a1d1e" stroke-width="2.5"/><text x="60" y="64" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="10" fill="#1a1d1e">30°</text>' }
  ];

  // Even distribution: each visitor's browser remembers how often each game has been suggested,
  // and the three least-suggested games (ties broken at random) are shown next. Everything is
  // optional: without storage it simply picks three at random.
  var KEY = 'tdli-more-counts';
  function loadCounts() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function saveCounts(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} }
  function pick(current, n) {
    var counts = loadCounts();
    var pool = GAMES.filter(function (g) { return g.id !== current; });
    for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
    pool.sort(function (x, y) { return (counts[x.id] || 0) - (counts[y.id] || 0); }); // stable: shuffled order breaks ties
    var chosen = pool.slice(0, n);
    chosen.forEach(function (g) { counts[g.id] = (counts[g.id] || 0) + 1; });
    saveCounts(counts);
    return chosen;
  }

  window.tdliMoreGames = function (opts) {
    var th = opts.theme || {};
    var css = document.createElement('style');
    css.textContent =
      '.tdli-more{box-sizing:border-box;width:100%;max-width:960px;margin:var(--tdli-gap-d,104px) auto 0;padding:0 20px clamp(40px,6vw,64px);font-family:' + (th.font || 'Arial,Helvetica,sans-serif') + '}' +
      '.tdli-more *{box-sizing:border-box}' +
      '.tdli-more-label{display:inline-block;width:auto;height:auto;min-height:0;max-width:100%;margin:0 0 16px;padding:8px 14px;box-shadow:none;transform:none;position:static;text-align:left;border:1px solid ' + (th.border || 'rgba(255,255,255,.22)') + ';border-radius:8px;font:700 12px/1 ' + (th.mono || 'monospace') + ';letter-spacing:1.6px;text-transform:uppercase;color:' + (th.label || '#c5fa66') + ';background:' + (th.labelBg || 'transparent') + '}' +
      '.tdli-more-row{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(10px,2vw,20px);list-style:none;margin:0;padding:0}' +
      '.tdli-more-card{display:flex;flex-direction:column;height:100%;text-decoration:none;color:' + (th.ink || '#f0f1ed') + ';background:' + (th.card || '#20231f') + ';border:1px solid ' + (th.border || 'rgba(255,255,255,.14)') + ';border-radius:16px;overflow:hidden;transition:transform .18s ease,border-color .18s ease}' +
      '.tdli-more-card:hover,.tdli-more-card:focus-visible{transform:translateY(-4px);border-color:' + (th.label || '#c5fa66') + '}' +
      '.tdli-more-card:focus-visible{outline:3px solid ' + (th.label || '#c5fa66') + ';outline-offset:3px}' +
      '.tdli-more-art{display:block;width:100%;aspect-ratio:3/2;padding:clamp(6px,1.5vw,14px)}' +
      '.tdli-more-art svg{display:block;width:100%;height:100%}' +
      '.tdli-more-body{display:flex;flex-direction:column;gap:4px;padding:12px 14px 14px}' +
      '.tdli-more-name{font-weight:700;font-size:clamp(13px,1.6vw,16px);line-height:1.2}' +
      '.tdli-more-teaser{font-size:13px;line-height:1.35;color:' + (th.muted || '#a7ada1') + '}' +
      '.tdli-more-play{margin-top:4px;font:700 12px/1 ' + (th.mono || 'monospace') + ';letter-spacing:1px;text-transform:uppercase;color:' + (th.label || '#c5fa66') + '}' +
      '@media (max-width:560px){.tdli-more{margin-top:var(--tdli-gap-m,80px);padding-left:14px;padding-right:14px}.tdli-more-teaser{display:none}.tdli-more-body{padding:9px 9px 11px}.tdli-more-name{font-size:12px}.tdli-more-play{font-size:10px}}' +
      '@media (prefers-reduced-motion:reduce){.tdli-more-card{transition:none}.tdli-more-card:hover{transform:none}}';
    document.head.appendChild(css);

    var sec = document.createElement('section');
    sec.className = 'tdli-more'; if (opts.gap) sec.style.cssText = '--tdli-gap-d:' + opts.gap[0] + 'px;--tdli-gap-m:' + opts.gap[1] + 'px'; sec.setAttribute('aria-labelledby', 'tdli-more-h');
    var label = document.createElement('div'); label.id = 'tdli-more-h'; label.className = 'tdli-more-label'; label.setAttribute('role', 'heading'); label.setAttribute('aria-level', '2'); label.textContent = 'Other games';
    var row = document.createElement('ul'); row.className = 'tdli-more-row';
    pick(opts.current, 3).forEach(function (g) {
      var li = document.createElement('li');
      li.innerHTML = '<a class="tdli-more-card" href="' + (opts.base || ROOT) + g.id + '/">' +
        '<span class="tdli-more-art" style="background:' + g.bg + '"><svg viewBox="0 0 120 80" role="img" aria-label="' + g.name + '" focusable="false">' + g.art + '</svg></span>' +
        '<span class="tdli-more-body"><span class="tdli-more-name">' + g.name + '</span><span class="tdli-more-teaser">' + g.teaser + '</span><span class="tdli-more-play">Play ↗</span></span></a>';
      row.appendChild(li);
    });
    sec.appendChild(label); sec.appendChild(row);
    var ref = opts.before || document.querySelector('footer');
    if (!ref) { var m = document.querySelector('main'); ref = m ? m.nextSibling : null; if (m && !ref) { m.parentNode.appendChild(sec); return; } }
    if (ref && ref.parentNode) ref.parentNode.insertBefore(sec, ref); else document.body.appendChild(sec);
  };
})();
