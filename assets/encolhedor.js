// Encolhedor: transforma uma porcentagem em fração e encolhe até a forma mais simples.
// Encolhedor.mount(el, [40, 50, 25, ...], {divs:[2,4,5,10,20,25,50]})
// Depende de visuals.js (Grid100) e, opcionalmente, xp.js.
(function () {
  const frac = (a, b) => '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>';
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  window.Encolhedor = {
    mount(root, percents, cfg) {
      cfg = cfg || {};
      const divs = cfg.divs || [2, 4, 5, 10, 20, 25, 50];
      const won = new Set();
      let p = null, n = 0, d = 0, steps = [];
      root.classList.add('encolhedor', 'forja');
      root.innerHTML =
        '<p class="muted" style="text-align:center">1) Escolha uma porcentagem</p><div class="pick"></div>' +
        '<div class="vis"></div>' +
        '<div class="eq"></div><p class="trail"></p>' +
        '<p class="muted" style="text-align:center">2) Encolha: divida em cima e embaixo</p><div class="divs"></div>' +
        '<p class="msg"></p>';
      const pick = root.querySelector('.pick');
      const vis = root.querySelector('.vis');
      const eq = root.querySelector('.eq');
      const trail = root.querySelector('.trail');
      const msg = root.querySelector('.msg');
      const dv = root.querySelector('.divs');

      function draw() {
        eq.innerHTML = '<span class="hl">' + p + '%</span><span class="op">=</span>' + frac(n, d);
        trail.innerHTML = steps.join(' → ');
      }

      percents.forEach((v) => {
        const b = document.createElement('button');
        b.textContent = v + '%';
        b.onclick = () => {
          p = v; n = v; d = 100; steps = [v + '/100'];
          pick.querySelectorAll('button').forEach((x) => x.classList.toggle('sel', x === b));
          Grid100.render(vis, v);
          draw();
          msg.textContent = 'Por qual número dá para dividir ' + n + ' E ' + d + '?';
        };
        pick.appendChild(b);
      });

      divs.forEach((k) => {
        const b = document.createElement('button');
        b.textContent = '÷ ' + k;
        b.onclick = () => {
          if (p === null) { msg.textContent = 'Primeiro escolha uma porcentagem lá em cima ☝'; return; }
          if (gcd(n, d) === 1) { msg.textContent = '🏁 Já está no menor tamanho possível!'; return; }
          if (n % k || d % k) {
            const who = n % k && d % k ? n + ' e ' + d : n % k ? String(n) : String(d);
            msg.innerHTML = '💥 ' + who + ' não divide certinho por ' + k + '. Tente outro.';
            return;
          }
          n /= k; d /= k; steps.push(n + '/' + d);
          draw();
          if (gcd(n, d) === 1) {
            msg.innerHTML = '🏁 Forma mais simples! ' + p + '% = ' + n + '/' + d + '.';
            if (!won.has(p)) { won.add(p); window.XP && XP.add(5, 'encolheu'); }
          } else {
            msg.textContent = 'Encolheu! Ainda dá para dividir mais?';
          }
        };
        dv.appendChild(b);
      });
    },
  };
})();
