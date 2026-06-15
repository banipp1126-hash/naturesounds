/* Shared "back to top" floating button — injected on every page. */
(function () {
  if (window.__toTopInit) return;
  window.__toTopInit = true;

  var css = ''
    + '.to-top{position:fixed;right:40px;bottom:40px;z-index:90;width:52px;height:52px;'
    + 'opacity:0;visibility:hidden;transform:translateY(14px);'
    + 'transition:opacity .35s ease,transform .35s ease,visibility .35s ease;}'
    + '.to-top.is-visible{opacity:1;visibility:visible;transform:none;}'
    + '.to-top__btn{position:relative;display:block;width:52px;height:52px;padding:0;border:0;'
    + 'background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;}'
    + '.to-top__btn svg{display:block;width:52px;height:52px;'
    + 'filter:drop-shadow(0 8px 20px rgba(58,122,54,0.30));transition:transform .25s ease;}'
    + '.to-top__btn:hover svg{transform:translateY(-3px);}'
    + '@media (max-width:860px){.to-top{right:20px;bottom:20px;}}'
    + '@media (prefers-reduced-motion:reduce){.to-top,.to-top__btn svg{transition:none;}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var svg = ''
    + '<svg viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    + '<rect y="33" width="33" height="34" rx="16.5" transform="rotate(-90 0 33)" fill="url(#topGrad)"/>'
    + '<path d="M17.5 8.74598C17.7133 8.74598 17.8893 8.87932 18.028 9.14598L19.644 12.186C19.772 12.4313 19.7933 12.634 19.708 12.794C19.6227 12.9647 19.4307 13.05 19.132 13.05L17.98 13.05L17.98 22.554C17.98 22.6927 17.932 22.8047 17.836 22.89C17.74 22.986 17.628 23.034 17.5 23.034C17.3613 23.034 17.2493 22.986 17.164 22.89C17.068 22.8047 17.02 22.6927 17.02 22.554L17.02 13.05L15.868 13.05C15.5693 13.05 15.3773 12.9647 15.292 12.794C15.2067 12.634 15.228 12.4313 15.356 12.186L16.972 9.14598C17.132 8.87932 17.308 8.74598 17.5 8.74598Z" fill="white"/>'
    + '<defs><linearGradient id="topGrad" x1="0" y1="50" x2="33" y2="50" gradientUnits="userSpaceOnUse">'
    + '<stop stop-color="#57B38A"/><stop offset="1" stop-color="#C3D974"/></linearGradient></defs></svg>';

  function build() {
    var wrap = document.createElement('div');
    wrap.className = 'to-top';
    wrap.innerHTML =
      '<button class="to-top__btn" type="button" aria-label="ページ上部に戻る">' + svg + '</button>';
    document.body.appendChild(wrap);

    wrap.querySelector('.to-top__btn').addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function onScroll() {
      // appear once scrolled roughly into the next section
      var trigger = Math.min(window.innerHeight * 0.6, 520);
      wrap.classList.toggle('is-visible', window.scrollY > trigger);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
