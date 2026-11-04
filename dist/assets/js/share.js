/* Share with a friend.
   Phones open the share sheet; computers copy to the clipboard (or download a file, then copy the link).
   tdliShare(button, getPayload, statusEl)          wire up an existing button
   tdliShareRow({...})                              create a button + status and place it on the page
   Payload: { text, url?, title?, makeFile?: () => Promise<File> } */
(function () {
  var LIVE = 'https://ka-chowf1.github.io/dumb-little-internet/';

  function pageUrl() {
    if (/^https?:$/.test(location.protocol)) return location.origin + location.pathname.replace(/index\.html$/, '');
    var parts = location.pathname.split('/').filter(Boolean);
    var folder = parts.length > 1 ? parts[parts.length - 2] + '/' : '';
    return LIVE + folder;
  }
  function usesShareSheet() {
    return !!navigator.share && window.matchMedia && matchMedia('(pointer: coarse)').matches;
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    ta.remove();
    return ok;
  }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }
  function download(file) {
    var a = document.createElement('a');
    var href = URL.createObjectURL(file);
    a.href = href; a.download = file.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(href); }, 4000);
  }

  window.tdliShare = function (button, getPayload, status) {
    var timer;
    function say(msg) {
      if (!status) return;
      status.textContent = msg;
      clearTimeout(timer);
      if (msg) timer = setTimeout(function () { status.textContent = ''; }, 3500);
    }
    button.addEventListener('click', function () {
      var p = getPayload();
      if (!p) return;
      if (typeof p === 'string') { say(p); return; }       // a plain message instead of a payload, e.g. "Crack the cookie first!"
      var url = p.url || pageUrl();
      var filePromise = p.makeFile ? Promise.resolve().then(p.makeFile).catch(function () { return null; }) : Promise.resolve(null);
      filePromise.then(function (file) {
        if (usesShareSheet()) {
          var data = { title: p.title || 'The Dumb Little Internet', text: p.text, url: url };
          if (file && navigator.canShare && navigator.canShare({ files: [file] })) data.files = [file];
          return navigator.share(data).catch(function () {});
        }
        var full = (p.text ? p.text + '\n\n' : '') + url;
        if (file) {
          download(file);
          return copy(full).then(function (ok) { say(ok ? 'PDF saved and link copied!' : 'PDF saved.'); });
        }
        return copy(full).then(function (ok) {
          say(ok ? 'Copied to clipboard!' : 'Could not copy. Please copy it by hand.');
        });
      });
    });
  };

  /* A ready-made button for the games. opts:
       anchor: element to place the row next to      position: 'after' (default) | 'before' | 'append'
       label: button text                            vars: { bg, fg, bd, sh } colours
       getPayload: function                          watch: { el, attr, show(value) } hides the row until true */
  var cssAdded = false;
  function addCss() {
    if (cssAdded) return; cssAdded = true;
    var st = document.createElement('style');
    st.textContent =
      '.tdli-share-row{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin:22px auto;text-align:center}' +
      '.tdli-share-row[hidden]{display:none}' +
      '.tdli-share-btn{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:0 24px;border-radius:var(--ts-r,999px);' +
      'background:var(--ts-bg,#222);color:var(--ts-fg,#fff);border:2px solid var(--ts-bd,transparent);box-shadow:0 3px 0 var(--ts-sh,rgba(0,0,0,.25));' +
      'font:700 15px/1.2 system-ui,-apple-system,"Segoe UI",Arial,sans-serif;cursor:pointer;transition:transform .12s}' +
      '.tdli-share-btn:hover{transform:translateY(-2px)}.tdli-share-btn:active{transform:translateY(2px);box-shadow:none}' +
      '.tdli-share-btn:focus-visible{outline:3px solid var(--ts-fg,#fff);outline-offset:3px}' +
      '.tdli-share-btn svg{width:18px;height:18px}' +
      '.tdli-share-status{min-width:10ch;font:700 14px/1.3 system-ui,-apple-system,"Segoe UI",Arial,sans-serif;color:var(--ts-st,inherit)}';
    document.head.appendChild(st);
  }
  window.tdliShareRow = function (opts) {
    addCss();
    var row = document.createElement('div');
    row.className = 'tdli-share-row';
    var v = opts.vars || {};
    ['bg', 'fg', 'bd', 'sh', 'st', 'r'].forEach(function (k) { if (v[k]) row.style.setProperty('--ts-' + k, v[k]); });
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'tdli-share-btn';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>';
    btn.appendChild(document.createTextNode(opts.label || 'Share with a friend'));
    var status = document.createElement('span');
    status.className = 'tdli-share-status'; status.setAttribute('role', 'status');
    row.append(btn, status);
    if (opts.position === 'append') opts.anchor.appendChild(row);
    else if (opts.position === 'before') opts.anchor.insertAdjacentElement('beforebegin', row);
    else opts.anchor.insertAdjacentElement('afterend', row);
    tdliShare(btn, opts.getPayload, status);
    if (opts.watch) {
      var w = opts.watch;
      var sync = function () { row.hidden = !w.show(w.el.getAttribute(w.attr)); };
      sync();
      new MutationObserver(sync).observe(w.el, { attributes: true, attributeFilter: [w.attr] });
    }
    return { row: row, button: btn, status: status };
  };
})();
