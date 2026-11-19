// Loja de skins: desconto e aumento em dois passos (quanto é a %? qual o preço final?).
// Loja.mount(el, [{ name:'Espada', emoji:'🗡', price:60, pct:30, mode:'desconto'|'aumento' }, ...])
// O preço aparece como 10 blocos de 10%; no desconto os blocos tirados ficam riscados,
// no aumento aparecem blocos extras. Depende opcionalmente de xp.js.
(function () {
  const norm = (s) => String(s).trim().replace(/\s+/g, '').replace(',', '.');

  window.Loja = {
    mount(root, items) {
      const sold = new Set();
      root.classList.add('loja');
      root.innerHTML = '<div class="loja-items"></div><div class="loja-stage"></div>';
      const list = root.querySelector('.loja-items');
      const stage = root.querySelector('.loja-stage');

      function drawList(active) {
        list.innerHTML = '';
        items.forEach((it, k) => {
          const b = document.createElement('button');
          b.className = 'loja-item' + (k === active ? ' sel' : '') + (sold.has(k) ? ' sold' : '');
          b.innerHTML =
            '<span class="loja-emoji">' + it.emoji + '</span>' +
            '<span class="loja-name">' + it.name + '</span>' +
            '<span class="loja-price">' + it.price + ' 🪙</span>' +
            '<span class="loja-tag ' + it.mode + '">' + (it.mode === 'desconto' ? '−' : '+') + it.pct + '%</span>' +
            (sold.has(k) ? '<span class="loja-ok">✔</span>' : '');
          b.onclick = () => open(k);
          list.appendChild(b);
        });
      }

      function open(k) {
        const it = items[k];
        const off = it.mode === 'desconto';
        const block = it.price / 10;
        const nBlocks = it.pct / 10; // blocos afetados (a % é sempre múltiplo de 10 na barra; 5% vira meio bloco)
        const part = (it.price * it.pct) / 100;
        const final = off ? it.price - part : it.price + part;
        drawList(k);
        stage.innerHTML =
          '<p class="loja-title">' + it.emoji + ' <strong>' + it.name + '</strong>: ' + it.price + ' moedas, ' +
          (off ? 'com <strong>' + it.pct + '% de desconto</strong>' : 'mas o preço <strong>subiu ' + it.pct + '%</strong>') + '</p>' +
          '<div class="loja-bar"></div>' +
          '<p class="loja-cap">Cada bloco = 10% = ' + block + ' moedas</p>' +
          '<div class="loja-step s1"><p>1) Quanto é <strong>' + it.pct + '% de ' + it.price + '</strong>?</p>' +
          '<div class="input-row"><input class="answer" inputmode="decimal" autocomplete="off" aria-label="Valor da porcentagem"><button class="primary">Conferir</button></div><p class="loja-msg"></p></div>' +
          '<div class="loja-step s2" hidden><p>2) Qual é o <strong>preço final</strong>?</p>' +
          '<div class="input-row"><input class="answer" inputmode="decimal" autocomplete="off" aria-label="Preço final"><button class="primary">Conferir</button></div><p class="loja-msg"></p></div>';

        const bar = stage.querySelector('.loja-bar');
        for (let i = 0; i < 10; i++) {
          const c = document.createElement('i');
          c.textContent = block;
          bar.appendChild(c);
        }

        function step(sel, expected, onOk, wrongMsg) {
          const box = stage.querySelector(sel);
          const inp = box.querySelector('input');
          const btn = box.querySelector('button');
          const msg = box.querySelector('.loja-msg');
          const check = () => {
            if (!inp.value.trim()) return;
            if (Number(norm(inp.value)) === expected) {
              inp.disabled = btn.disabled = true;
              onOk(msg);
            } else {
              msg.innerHTML = wrongMsg(Number(norm(inp.value)));
            }
          };
          btn.onclick = check;
          inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
          return inp;
        }

        step('.s1', part, (msg) => {
          msg.innerHTML = '✔ ' + it.pct + '% de ' + it.price + ' = <strong>' + part + '</strong> moedas.';
          // Mostra na barra: riscando (desconto) ou acrescentando (aumento) os blocos.
          const cells = bar.querySelectorAll('i');
          if (off) {
            for (let i = 0; i < Math.ceil(nBlocks); i++) cells[9 - i].classList.add('cut');
          } else {
            for (let i = 0; i < Math.ceil(nBlocks); i++) {
              const c = document.createElement('i');
              c.className = 'extra';
              c.textContent = block;
              bar.appendChild(c);
            }
            bar.style.gridTemplateColumns = 'repeat(' + (10 + Math.ceil(nBlocks)) + ', 1fr)';
          }
          stage.querySelector('.s2').hidden = false;
          stage.querySelector('.s2 input').focus();
        }, (v) => '💭 Ainda não. Dica: 10% de ' + it.price + ' é ' + block + '. Quantos blocos de 10% formam ' + it.pct + '%?');

        step('.s2', final, (msg) => {
          msg.innerHTML = '🛒 Comprado! ' + it.price + (off ? ' − ' : ' + ') + part + ' = <strong>' + final + ' moedas</strong>.';
          if (!sold.has(k)) { sold.add(k); window.XP && XP.add(5, 'compra'); }
          drawList(k);
        }, (v) => v === part
          ? '💭 Esse é o valor ' + (off ? 'do desconto' : 'do aumento') + '. Agora ' + (off ? 'tire' : 'some') + ' do preço: ' + it.price + (off ? ' − ' : ' + ') + part + ' = ?'
          : '💭 Ainda não. ' + (off ? 'Desconto: o preço fica menor.' : 'Aumento: o preço fica maior.') + ' Faça ' + it.price + (off ? ' − ' : ' + ') + part + '.');
      }

      drawList(-1);
      stage.innerHTML = '<p class="muted" style="text-align:center">☝ Toque em um item da loja para comprar.</p>';
    },
  };
})();
