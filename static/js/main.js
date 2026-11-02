// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukážka formulára: nič sa neodosiela. Po spustení webu príde správa na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odosielam…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Ďakujeme, správa bola odoslaná.'; })
        .catch(function () { stav.textContent = 'Odoslanie sa nepodarilo. Napíšte nám prosím e-mailom.'; });
    });
  });
})();

(function () {
  var b = document.querySelector('.menu-tlacitko'), n = document.getElementById('hl-menu');
  if (!b || !n) return;
  function zavri() { n.classList.remove('otvorene'); b.setAttribute('aria-expanded', 'false'); }
  b.addEventListener('click', function () { var o = n.classList.toggle('otvorene'); b.setAttribute('aria-expanded', o ? 'true' : 'false'); });
  n.addEventListener('click', function (e) { if (e.target.tagName === 'A') zavri(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zavri(); });
})();
