/* Cookie notice. Analytics (Microsoft Clarity) only loads after the visitor clicks Accept.
   The choice is remembered in localStorage under "tdli-consent" ("yes" | "no"). */
(function () {
  var KEY = 'tdli-consent', CLARITY_ID = 'z7n9svtson';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function loadClarity() {
    if (window.__tdliClarity) return; window.__tdliClarity = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }
  function banner() {
    var css = document.createElement('style');
    css.textContent =
      '.tdli-cookie{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2000;box-sizing:border-box;width:min(640px,calc(100vw - 24px));' +
      'display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding:16px 18px;border-radius:14px;background:#1f2326;color:#f0efe9;' +
      'border:1px solid rgba(255,255,255,.18);box-shadow:0 12px 40px rgba(0,0,0,.45);font:500 14px/1.45 system-ui,-apple-system,"Segoe UI",Arial,sans-serif}' +
      '.tdli-cookie p{margin:0;flex:1 1 260px}.tdli-cookie b{font-weight:700}' +
      '.tdli-cookie .tdli-ck-btns{display:flex;gap:10px;flex:0 0 auto}' +
      '.tdli-cookie button{all:unset;box-sizing:border-box;cursor:pointer;padding:10px 18px;border-radius:999px;font:700 14px/1 system-ui,-apple-system,"Segoe UI",Arial,sans-serif;border:2px solid #f0efe9}' +
      '.tdli-cookie .tdli-ck-yes{background:#f0efe9;color:#1f2326}.tdli-cookie .tdli-ck-no{background:transparent;color:#f0efe9}' +
      '.tdli-cookie button:focus-visible{outline:3px solid #c5fa66;outline-offset:2px}';
    document.head.appendChild(css);
    var b = document.createElement('div');
    b.className = 'tdli-cookie'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Cookie notice');
    b.innerHTML = '<p><b>Cookies, but make it tiny.</b> We use one analytics cookie to see which games get played. No ads, no selling anything. Okay?</p>' +
      '<div class="tdli-ck-btns"><button type="button" class="tdli-ck-no">No thanks</button><button type="button" class="tdli-ck-yes">Accept</button></div>';
    function done(v) { set(v); if (v === 'yes') loadClarity(); b.remove(); }
    b.querySelector('.tdli-ck-yes').onclick = function () { done('yes'); };
    b.querySelector('.tdli-ck-no').onclick = function () { done('no'); };
    document.body.appendChild(b);
  }
  var c = get();
  if (c === 'yes') loadClarity();
  else if (c !== 'no') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner); else banner();
  }
  window.tdliCookieChoice = function () { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); };
})();
