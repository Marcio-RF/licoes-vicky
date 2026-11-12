// Visuais reutilizáveis: grade de 100 slots e barra de HP.
// Grid100.render(el, n, {alt:false})  -> pinta n de 100 quadradinhos
// HPBar.render(el, atual, max, {label:'HP'})
(function () {
  window.Grid100 = {
    render(el, n, opts) {
      opts = opts || {};
      if (!el.querySelector('.grid100')) {
        const g = document.createElement('div');
        g.className = 'grid100';
        g.setAttribute('role', 'img');
        for (let i = 0; i < 100; i++) g.appendChild(document.createElement('i'));
        el.appendChild(g);
        const lab = document.createElement('div');
        lab.className = 'grid100-label';
        el.appendChild(lab);
      }
      const cells = el.querySelectorAll('.grid100 > i');
      cells.forEach((c, i) => {
        // delay curto em cascata para dar sensação de "carregando"
        setTimeout(() => {
          c.classList.toggle('on', i < n);
          c.classList.toggle('alt', !!opts.alt && i < n);
        }, i * 6);
      });
      el.querySelector('.grid100').setAttribute('aria-label', n + ' de 100 quadradinhos pintados');
      el.querySelector('.grid100-label').innerHTML = opts.label !== undefined ? opts.label : n + ' de 100 = ' + n + '%';
    },
  };

  window.HPBar = {
    render(el, cur, max, opts) {
      opts = opts || {};
      const pct = Math.round((cur / max) * 100);
      el.classList.add('hpbar');
      el.innerHTML =
        '<div class="cap"><span>' + (opts.label || '❤ HP') + '</span><span class="num">' + cur + ' / ' + max + '</span></div>' +
        '<div class="track"><div class="fill' + (pct <= 25 ? ' low' : '') + '" style="width:' + pct + '%"></div></div>';
    },
  };
})();
