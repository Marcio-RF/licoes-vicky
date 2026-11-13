// Quiz com feedback imediato, uma pergunta por vez. Feito para toque.
// Quiz.mount(el, perguntas, { id:'0001', xp:10, title:'Chefão' })
// Pergunta de escolha: { text, options:['25%','40%','75%','20%'], answer:2, explain, grid:75 }
// Pergunta de fração: { text, fraction:[2,5], explain }  -> duas caixas; só aceita a forma mais simples
// Pergunta digitada:   { text, input:true, answer:['75'], suffix:'%', explain, grid:75 }
//   - grid (opcional): número de quadradinhos para pintar na grade 10x10 depois do acerto.
(function () {
  function norm(s) {
    return String(s).trim().toLowerCase().replace(/\s+/g, '').replace(/%$/, '').replace(',', '.');
  }

  // Converte o HTML de uma resposta em texto simples ("3/5" em vez da fração empilhada).
  function plain(html) {
    return String(html)
      .replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g, '$1/$2')
      .replace(/<[^>]+>/g, '');
  }

  window.Quiz = {
    mount(root, questions, cfg) {
      cfg = cfg || {};
      const xpEach = cfg.xp || 10;
      const id = cfg.id || 'x';
      const P = window.Progress;
      let i = 0, firstTry = 0, missed = [], triedNow = false, resumed = false;
      root.classList.add('quiz');

      // Retoma um quiz deixado pela metade (aba recarregada, celular bloqueado…).
      const saved = P && P.loadState(id);
      if (saved && saved.n === questions.length && saved.i > 0 && saved.i < questions.length) {
        i = saved.i; firstTry = saved.firstTry; missed = saved.missed || []; triedNow = !!saved.tried; resumed = true;
      } else if (saved && saved.tried && saved.i === 0) {
        missed = saved.missed || []; triedNow = true; resumed = true;
      }
      // Salva o andamento: assim um erro não "some" se a página recarregar.
      const persist = (tried) => P && P.saveState(id, { i, firstTry, missed, tried, n: questions.length });

      function show() {
        const q = questions[i];
        let tried = triedNow, done = false;
        triedNow = false;
        const box = document.createElement('div');
        box.className = 'q';
        box.innerHTML =
          '<div class="q-head"><span>' + (cfg.title || 'Desafio') + '</span><span>' + (i + 1) + ' / ' + questions.length + '</span></div>' +
          '<div class="q-text">' + q.text + '</div>' +
          '<div class="body"></div>' +
          '<div class="feedback"></div>' +
          '<div class="vis"></div>';
        root.innerHTML = '';
        if (resumed) {
          resumed = false;
          const note = document.createElement('p');
          note.className = 'muted resume';
          note.innerHTML = '↩ Continuando de onde você parou. <button class="link">Recomeçar do zero</button>';
          note.querySelector('button').onclick = () => { i = 0; firstTry = 0; missed = []; P && P.clearState(id); show(); };
          root.appendChild(note);
        }
        root.appendChild(box);
        const body = box.querySelector('.body');
        const fb = box.querySelector('.feedback');

        function finish(ok, hint, given) {
          if (ok) {
            done = true;
            if (!tried) { firstTry++; window.XP && XP.add(xpEach); }
            // Pergunta resolvida: se sair agora, volta já na próxima.
            i++; persist(false); i--;
            fb.className = 'feedback show ok';
            fb.innerHTML = '<strong>' + (tried ? '✔ Isso! Agora foi.' : '✔ Acertou de primeira!') + '</strong> ' + (q.explain || '');
            if (typeof q.grid === 'number' && window.Grid100) Grid100.render(box.querySelector('.vis'), q.grid);
            const nx = document.createElement('button');
            nx.className = 'primary next';
            nx.textContent = i + 1 < questions.length ? 'Próxima ➜' : 'Ver resultado ➜';
            nx.onclick = () => { i++; i < questions.length ? show() : result(); };
            box.appendChild(nx);
            nx.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            // Guarda a 1ª resposta errada de cada pergunta: mostra ao adulto onde ela tropeçou.
            if (!tried) missed.push((i + 1) + ' (respondeu ' + plain(given) + ')');
            tried = true;
            persist(true);
            fb.className = 'feedback show no';
            fb.innerHTML = '<strong>Quase!</strong> ' + (hint || q.hint || 'Tente de novo — pense em quanto falta para chegar em 100.');
          }
        }

        if (q.fraction) {
          // Resposta em fração: duas caixas (em cima / embaixo). Aceita só a forma mais simples.
          body.innerHTML =
            '<div class="input-row"><span class="frac-input">' +
            '<input class="answer" inputmode="numeric" autocomplete="off" aria-label="Número de cima">' +
            '<input class="answer" inputmode="numeric" autocomplete="off" aria-label="Número de baixo">' +
            '</span><button class="primary">Conferir</button></div>';
          const [top, bot] = body.querySelectorAll('input');
          const btn = body.querySelector('button');
          const [tn, td] = q.fraction;
          const gcd = (a, b) => (b ? gcd(b, a % b) : a);
          const check = () => {
            const a = parseInt(top.value, 10), b = parseInt(bot.value, 10);
            if (done || !a || !b) return;
            if (a * td !== b * tn) return finish(false, null, a + '/' + b);
            if (gcd(a, b) !== 1) return finish(false, 'O valor está certo, mas <strong>' + a + '/' + b + '</strong> ainda dá para encolher! Divida em cima e embaixo pelo mesmo número.', a + '/' + b);
            top.disabled = bot.disabled = btn.disabled = true;
            finish(true);
          };
          btn.onclick = check;
          [top, bot].forEach((x) => x.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); }));
        } else if (q.input) {
          body.innerHTML =
            '<div class="input-row"><input class="answer" inputmode="decimal" autocomplete="off" aria-label="Sua resposta"> ' +
            '<span class="big">' + (q.suffix || '') + '</span><button class="primary">Conferir</button></div>';
          const inp = body.querySelector('input');
          const btn = body.querySelector('button');
          const answers = [].concat(q.answer).map(norm);
          const check = () => {
            if (done || !inp.value.trim()) return;
            const ok = answers.includes(norm(inp.value));
            if (ok) { inp.disabled = true; btn.disabled = true; }
            finish(ok, null, inp.value.trim() + (q.suffix || ''));
          };
          btn.onclick = check;
          inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
        } else {
          const opts = document.createElement('div');
          opts.className = 'opts';
          q.options.forEach((o, k) => {
            const b = document.createElement('button');
            b.innerHTML = o;
            b.onclick = () => {
              if (done || b.classList.contains('wrong')) return;
              const ok = k === q.answer;
              b.classList.add(ok ? 'right' : 'wrong');
              if (ok) opts.querySelectorAll('button').forEach((x) => (x.disabled = x !== b));
              finish(ok, null, o);
            };
            opts.appendChild(b);
          });
          body.appendChild(opts);
        }
      }

      function result() {
        const n = questions.length;
        const ratio = firstTry / n;
        const stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;
        if (P) { P.saveResult(id, firstTry, n, missed); P.clearState(id); }
        const rec = P ? P.result(id) : null;
        const bestLine = rec && rec.attempts > 1
          ? '<p class="muted">Seu recorde: ' + rec.best.firstTry + ' / ' + rec.best.n + ' · tentativa nº ' + rec.attempts + '</p>' : '';
        const boss = /chef/i.test(cfg.title || '');
        const msg = stars === 3 ? (boss ? 'Chefão derrotado sem levar dano!' : 'Mandou muito bem!') : stars === 2 ? 'Vitória! Mais uma rodada e você zera.' : 'Você chegou ao fim — jogue de novo para pegar mais estrelas.';
        root.innerHTML =
          '<div class="q result"><div class="stars">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</div>' +
          '<p class="big">' + firstTry + ' / ' + n + ' de primeira</p><p>' + msg + '</p>' + bestLine +
          (missed.length ? '<p class="muted">Errou de primeira: nº ' + missed.join('; nº ') + '</p>' : '') +
          '<p class="muted">Mostre esta tela para um adulto 😉</p>' +
          '<button class="primary">Jogar de novo</button></div>';
        root.querySelector('.result button').onclick = () => { i = 0; firstTry = 0; missed = []; show(); };
        if (cfg.onFinish) cfg.onFinish(firstTry, n);
      }

      show();
    },
  };
})();
