// Baú de 10 blocos: cada bloco vale 10% do total. Toque nos blocos para pegar a porcentagem pedida.
// Barra10.mount(el, [{ total: 250, pct: 30, item: 'moedas' }, ...])
// Depende opcionalmente de xp.js.
(function () {
  const fmt = (x) => String(Math.round(x * 100) / 100).replace('.', ',');

  window.Barra10 = {
    mount(root, challenges) {
      let c = 0;
      root.classList.add('barra10');

      function show() {
        const ch = challenges[c];
        const item = ch.item || 'moedas';
        const block = ch.total / 10;
        const sel = new Array(10).fill(false);
        let solved = false;
        root.innerHTML =
          '<p class="b10-goal">Desafio ' + (c + 1) + ' de ' + challenges.length + ': pegue <strong>' + ch.pct + '%</strong> de <strong>' + ch.total + ' ' + item + '</strong></p>' +
          '<p class="b10-info">Cada bloco = 10% = ' + ch.total + ' ÷ 10 = <strong>' + fmt(block) + '</strong></p>' +
          '<div class="b10-bar"></div>' +
          '<p class="b10-sum"></p>' +
          '<div class="b10-actions"><button class="primary">Pegar o loot!</button></div>' +
          '<p class="b10-msg"></p>';
        const bar = root.querySelector('.b10-bar');
        const sum = root.querySelector('.b10-sum');
        const msg = root.querySelector('.b10-msg');
        const go = root.querySelector('.b10-actions button');

        function update() {
          const k = sel.filter(Boolean).length;
          sum.innerHTML = k + (k === 1 ? ' bloco' : ' blocos') + ' = <strong>' + k * 10 + '%</strong> = ' + k + ' × ' + fmt(block) + ' = <strong>' + fmt(k * block) + ' ' + item + '</strong>';
        }

        for (let i = 0; i < 10; i++) {
          const b = document.createElement('button');
          b.className = 'b10-block';
          b.textContent = fmt(block);
          b.setAttribute('aria-label', 'Bloco ' + (i + 1) + ', vale ' + fmt(block));
          b.onclick = () => {
            if (solved) return;
            sel[i] = !sel[i];
            b.classList.toggle('on', sel[i]);
            update();
          };
          bar.appendChild(b);
        }
        update();

        go.onclick = () => {
          if (solved) return;
          const k = sel.filter(Boolean).length;
          if (k * 10 === ch.pct) {
            solved = true;
            msg.innerHTML = '💰 Loot coletado! <strong>' + ch.pct + '% de ' + ch.total + ' = ' + fmt(k * block) + '</strong>.';
            window.XP && XP.add(5, 'loot');
            go.textContent = c + 1 < challenges.length ? 'Próximo baú ➜' : 'Recomeçar';
            go.onclick = () => { c = (c + 1) % challenges.length; show(); };
          } else {
            msg.innerHTML = k * 10 < ch.pct
              ? '🔎 Você pegou ' + k * 10 + '%. Faltam ' + (ch.pct - k * 10) + '%, ou seja, mais ' + (ch.pct - k * 10) / 10 + ' bloco(s).'
              : '🎒 Pegou demais: ' + k * 10 + '%. Devolva ' + (k * 10 - ch.pct) / 10 + ' bloco(s).';
          }
        };
      }

      show();
    },
  };
})();
