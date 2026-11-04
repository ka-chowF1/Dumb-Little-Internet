/* Share with a friend. Phones open the share sheet; computers copy to the clipboard.
   Usage: tdliShare(button, () => ({ text: 'Sentence to send', url: optionalLink })) */
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
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallback(text); });
    }
    return Promise.resolve(fallback(text));
  }
  function fallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    ta.remove();
    return ok;
  }
  window.tdliShare = function (button, getPayload, status) {
    var timer;
    function say(msg) {
      if (!status) return;
      status.textContent = msg;
      clearTimeout(timer);
      if (msg) timer = setTimeout(function () { status.textContent = ''; }, 3000);
    }
    button.addEventListener('click', function () {
      var p = getPayload() || {};
      var url = p.url || pageUrl();
      if (usesShareSheet()) {
        navigator.share({ title: p.title || 'The Dumb Little Internet', text: p.text, url: url }).catch(function () {});
      } else {
        copy((p.text ? p.text + '\n\n' : '') + url).then(function (ok) {
          say(ok ? 'Copied to clipboard!' : 'Could not copy. Please copy it by hand.');
        });
      }
    });
  };
})();
