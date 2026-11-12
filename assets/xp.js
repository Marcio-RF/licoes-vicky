// XP compartilhado entre lições (salvo no navegador).
// Uso: <div id="xp"></div> ... XP.mount(document.getElementById('xp')); XP.add(10);
(function () {
  const KEY = 'vicky-xp';
  const PER_LEVEL = 100;
  let hud = null;

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
    add(n, label) {
      const before = Math.floor(get() / PER_LEVEL);
      set(get() + n);
      render();
      const after = Math.floor(get() / PER_LEVEL);
      pop(after > before ? '⬆ SUBIU DE NÍVEL! Nível ' + (after + 1) : '+' + n + ' XP' + (label ? ' · ' + label : ''));
    },
    get,
  };
})();
