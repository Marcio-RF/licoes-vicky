// Progresso salvo no navegador: XP compartilhado entre lições + placares e quiz em andamento.
// XP.mount(el); XP.add(10)
// Progress.saveResult(id, firstTry, n, missed) -> guarda a última tentativa e a MELHOR
// Progress.result(id) -> { best, last, attempts } ou null
// Progress.saveState(id, estado) / Progress.loadState(id) / Progress.clearState(id) -> quiz pela metade
(function () {
  const KEY = 'vicky-xp';
  const PER_LEVEL = 100;
  let hud = null;

  function read(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function get() { return parseInt(localStorage.getItem(KEY) || '0', 10) || 0; }
  function set(v) { try { localStorage.setItem(KEY, String(v)); } catch (e) {} }

  function render() {
    if (!hud) return;
    const xp = get();
    const lvl = Math.floor(xp / PER_LEVEL) + 1;
    const into = xp % PER_LEVEL;
    hud.innerHTML =
      '<span class="lvl">Nível ' + lvl + '</span>' +
      '<span class="bar"><i style="width:' + into + '%"></i></span>' +
      '<span class="num">' + xp + ' XP</span>';
  }

  function pop(text) {
    const el = document.createElement('div');
    el.className = 'xp-pop';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }

  window.XP = {
    mount(el) { hud = el; hud.classList.add('xp-hud'); render(); },
    refresh: render,
    add(n, label) {
      const before = Math.floor(get() / PER_LEVEL);
      set(get() + n);
      render();
      const after = Math.floor(get() / PER_LEVEL);
      pop(after > before ? '⬆ SUBIU DE NÍVEL! Nível ' + (after + 1) : '+' + n + ' XP' + (label ? ' · ' + label : ''));
    },
    get,
  };

  window.Progress = {
    result(id) {
      const r = read('vicky-lesson-' + id);
      if (!r) return null;
      if (!r.best) return { best: r, last: r, attempts: 1 }; // formato antigo (só a última tentativa)
      return r;
    },
    saveResult(id, firstTry, n, missed) {
      const prev = this.result(id);
      const last = { firstTry, n, missed, when: new Date().toISOString() };
      const best = !prev || firstTry / n >= prev.best.firstTry / prev.best.n ? last : prev.best;
      write('vicky-lesson-' + id, { best, last, attempts: (prev ? prev.attempts : 0) + 1 });
    },
    stars(r) { const x = r.firstTry / r.n; return x >= 0.9 ? 3 : x >= 0.6 ? 2 : 1; },
    saveState(id, s) { write('vicky-quiz-' + id, s); },
    loadState(id) { return read('vicky-quiz-' + id); },
    clearState(id) { try { localStorage.removeItem('vicky-quiz-' + id); } catch (e) {} },
  };

  // Ao voltar para uma página pelo botão "voltar", o navegador pode mostrar a versão em cache:
  // atualiza o XP para não exibir número velho.
  window.addEventListener('pageshow', render);

  // Pede ao navegador para não apagar os dados do site quando faltar espaço.
  try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) {}
})();
