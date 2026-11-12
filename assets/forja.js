// Forja de frações: escolha o "multiplicador mágico" que transforma o denominador em 100.
// Forja.mount(el, [[1,4],[3,5],...], {mults:[2,4,5,10,20,25,50]})
(function () {
  const frac = (a, b) => '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>';

  window.Forja = {
    mount(root, fracs, cfg) {
      cfg = cfg || {};
      const mults = cfg.mults || [2, 4, 5, 10, 20, 25, 50];
      const forged = new Set();
      let cur = null;
      root.classList.add('forja');
      root.innerHTML =
        '<p class="muted" style="text-align:center">1) Escolha uma fração</p><div class="pick"></div>' +
        '<div class="eq"></div>' +
        '<p class="muted" style="text-align:center">2) Escolha o multiplicador mágico</p><div class="mults"></div>' +
        '<p class="msg"></p><div class="vis"></div>';
      const pick = root.querySelector('.pick');
      const eq = root.querySelector('.eq');
      const ms = root.querySelector('.mults');
      const msg = root.querySelector('.msg');
      const vis = root.querySelector('.vis');

      fracs.forEach(([a, b]) => {
        const btn = document.createElement('button');
        btn.innerHTML = frac(a, b);
        btn.onclick = () => {
          cur = [a, b];
          pick.querySelectorAll('button').forEach((x) => x.classList.toggle('sel', x === btn));
          eq.innerHTML = frac(a, b) + '<span class="op">=</span>' + frac('?', 100) + '<span class="op">=</span><span class="hl">?%</span>';
          msg.textContent = 'Qual número vezes ' + b + ' dá 100?';
          vis.innerHTML = '';
        };
        pick.appendChild(btn);
      });

      mults.forEach((m) => {
        const btn = document.createElement('button');
        btn.textContent = '× ' + m;
        btn.onclick = () => {
          if (!cur) { msg.textContent = 'Primeiro escolha uma fração lá em cima ☝'; return; }
          const [a, b] = cur;
          if (b * m === 100) {
            const p = a * m;
            eq.innerHTML = frac(a, b) + '<span class="op">× ' + m + '</span>' + '<span class="op">=</span>' + frac(p, 100) + '<span class="op">=</span><span class="hl">' + p + '%</span>';
            msg.innerHTML = '✨ Forjado! ' + b + ' × ' + m + ' = 100, e ' + a + ' × ' + m + ' = ' + p + '.';
            Grid100.render(vis, p);
            const key = a + '/' + b;
            if (!forged.has(key)) { forged.add(key); window.XP && XP.add(5, 'forja'); }
          } else {
            msg.innerHTML = '💥 ' + b + ' × ' + m + ' = ' + b * m + (b * m > 100 ? ' — passou de 100!' : ' — ainda não chegou em 100.') + ' Tente outro.';
          }
        };
        ms.appendChild(btn);
      });
    },
  };
})();
