// Gráficos em SVG (devolvem texto HTML, para usar dentro das perguntas do quiz).
// Charts.bar({ title, labels:[..], values:[..], horizontal:false, unit:'', hide:[índices com "?"] })
// Charts.line({ title, labels:[..], values:[..], unit:'' })
// Charts.pie({ title, labels:[..], values:[..], showPct:false })
// Charts.venn({ a:'Futebol', b:'Vôlei', onlyA, both, onlyB, out, hide:['both'] })  -> regiões com "?" em hide
// Charts.table({ head:['Cor','Votos'], rows:[['Azul',8],…] })
// Montador.mount(el, { labels, values, max, item }) -> montar barras tocando em + e −
(function () {
  const COLORS = ['#6c3cf0', '#2bb673', '#f5a524', '#e5484d', '#2f80ed', '#8a8aa3'];
  const esc = (s) => String(s);

  function niceMax(m) {
    const steps = [5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];
    for (const s of steps) if (m <= s) return s;
    return Math.ceil(m / 100) * 100;
  }
  function tick(max) { return max <= 5 ? 1 : max <= 10 ? 2 : max <= 20 ? 5 : max <= 50 ? 10 : max <= 100 ? 20 : max / 5; }

  function bar(o) {
    const n = o.values.length, hide = o.hide || [];
    const max = o.max || niceMax(Math.max(...o.values));
    const step = o.step || tick(max);
    if (o.horizontal) {
      const W = 400, rowH = 36, L = 90, R = 40, T = o.title ? 30 : 10;
      const H = T + n * rowH + 30, pw = W - L - R;
      let s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.title || 'Gráfico de barras') + '">';
      if (o.title) s += '<text class="ttl" x="' + W / 2 + '" y="18" text-anchor="middle">' + esc(o.title) + '</text>';
      for (let v = 0; v <= max; v += step) {
        const x = L + (v / max) * pw;
        s += '<line class="gl" x1="' + x + '" y1="' + T + '" x2="' + x + '" y2="' + (T + n * rowH) + '"/>';
        s += '<text class="muted" x="' + x + '" y="' + (T + n * rowH + 18) + '" text-anchor="middle">' + v + '</text>';
      }
      o.values.forEach((v, i) => {
        const y = T + i * rowH + 6, w = (v / max) * pw;
        s += '<text x="' + (L - 8) + '" y="' + (y + 17) + '" text-anchor="end">' + esc(o.labels[i]) + '</text>';
        s += '<rect x="' + L + '" y="' + y + '" width="' + w + '" height="' + (rowH - 12) + '" rx="4" fill="' + (o.color || COLORS[0]) + '"/>';
        if (o.showValues !== false) s += '<text class="val" x="' + (L + w + 6) + '" y="' + (y + 17) + '">' + (hide.includes(i) ? '?' : v) + '</text>';
      });
      s += '<line class="ax" x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + (T + n * rowH) + '"/></svg>';
      return s;
    }
    const W = 400, H = 250, L = 40, R = 10, T = o.title ? 34 : 14, B = 40;
    const pw = W - L - R, ph = H - T - B, slot = pw / n, bw = Math.min(56, slot * 0.6);
    let s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.title || 'Gráfico de colunas') + '">';
    if (o.title) s += '<text class="ttl" x="' + W / 2 + '" y="20" text-anchor="middle">' + esc(o.title) + '</text>';
    for (let v = 0; v <= max; v += step) {
      const y = T + ph - (v / max) * ph;
      s += '<line class="gl" x1="' + L + '" y1="' + y + '" x2="' + (W - R) + '" y2="' + y + '"/>';
      s += '<text class="muted" x="' + (L - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + v + '</text>';
    }
    o.values.forEach((v, i) => {
      const h = (v / max) * ph, x = L + i * slot + (slot - bw) / 2, y = T + ph - h;
      s += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + h + '" rx="4" fill="' + (o.color || COLORS[i % COLORS.length]) + '"/>';
      if (o.showValues !== false) s += '<text class="val" x="' + (x + bw / 2) + '" y="' + (y - 5) + '" text-anchor="middle">' + (hide.includes(i) ? '?' : v) + '</text>';
      s += '<text x="' + (x + bw / 2) + '" y="' + (T + ph + 18) + '" text-anchor="middle">' + esc(o.labels[i]) + '</text>';
    });
    s += '<line class="ax" x1="' + L + '" y1="' + (T + ph) + '" x2="' + (W - R) + '" y2="' + (T + ph) + '"/></svg>';
    return s;
  }

  function line(o) {
    const n = o.values.length;
    const max = o.max || niceMax(Math.max(...o.values));
    const step = o.step || tick(max);
    const W = 400, H = 250, L = 40, R = 16, T = o.title ? 34 : 14, B = 40;
    const pw = W - L - R, ph = H - T - B, dx = pw / (n - 1 || 1);
    const pt = (v, i) => [L + i * dx, T + ph - (v / max) * ph];
    let s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.title || 'Gráfico de linhas') + '">';
    if (o.title) s += '<text class="ttl" x="' + W / 2 + '" y="20" text-anchor="middle">' + esc(o.title) + '</text>';
    for (let v = 0; v <= max; v += step) {
      const y = T + ph - (v / max) * ph;
      s += '<line class="gl" x1="' + L + '" y1="' + y + '" x2="' + (W - R) + '" y2="' + y + '"/>';
      s += '<text class="muted" x="' + (L - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + v + '</text>';
    }
    s += '<polyline fill="none" stroke="' + COLORS[0] + '" stroke-width="3" points="' + o.values.map((v, i) => pt(v, i).join(',')).join(' ') + '"/>';
    o.values.forEach((v, i) => {
      const [x, y] = pt(v, i);
      s += '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + COLORS[0] + '"/>';
      if (o.showValues !== false) s += '<text class="val" x="' + x + '" y="' + (y - 10) + '" text-anchor="middle">' + v + '</text>';
      s += '<text x="' + x + '" y="' + (T + ph + 18) + '" text-anchor="middle">' + esc(o.labels[i]) + '</text>';
    });
    s += '<line class="ax" x1="' + L + '" y1="' + (T + ph) + '" x2="' + (W - R) + '" y2="' + (T + ph) + '"/></svg>';
    return s;
  }

  function pie(o) {
    const total = o.values.reduce((a, b) => a + b, 0);
    const W = 260, H = o.title ? 250 : 224, cx = 130, cy = o.title ? 136 : 112, r = 100;
    let s = '<svg class="chart" style="max-width:280px" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.title || 'Gráfico de setores (pizza)') + '">';
    if (o.title) s += '<text class="ttl" x="' + cx + '" y="18" text-anchor="middle">' + esc(o.title) + '</text>';
    let a0 = -Math.PI / 2;
    o.values.forEach((v, i) => {
      const a1 = a0 + (v / total) * 2 * Math.PI;
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      const big = a1 - a0 > Math.PI ? 1 : 0;
      s += v === total
        ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + COLORS[i % COLORS.length] + '"/>'
        : '<path d="M' + cx + ',' + cy + ' L' + x0 + ',' + y0 + ' A' + r + ',' + r + ' 0 ' + big + ' 1 ' + x1 + ',' + y1 + ' Z" fill="' + COLORS[i % COLORS.length] + '" stroke="#fff" stroke-width="2"/>';
      if (o.showPct) {
        const am = (a0 + a1) / 2;
        s += '<text class="val" x="' + (cx + r * 0.62 * Math.cos(am)) + '" y="' + (cy + r * 0.62 * Math.sin(am) + 5) + '" text-anchor="middle" style="fill:#fff">' + Math.round((v / total) * 100) + '%</text>';
      }
      a0 = a1;
    });
    s += '</svg><div class="legend">' + o.labels.map((l, i) => '<span><i style="background:' + COLORS[i % COLORS.length] + '"></i>' + esc(l) + '</span>').join('') + '</div>';
    return s;
  }

  function venn(o) {
    const hide = o.hide || [];
    const show = (k) => (hide.includes(k) ? '?' : o[k]);
    const W = 400, H = 240;
    let s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Diagrama de Venn: ' + esc(o.a) + ' e ' + esc(o.b) + '">';
    s += '<rect x="2" y="2" width="' + (W - 4) + '" height="' + (H - 4) + '" rx="14" style="fill:#fff;stroke:#e4e0f5;stroke-width:2"/>';
    s += '<circle cx="155" cy="128" r="88" fill="' + COLORS[0] + '" fill-opacity=".22" stroke="' + COLORS[0] + '" stroke-width="3"/>';
    s += '<circle cx="245" cy="128" r="88" fill="' + COLORS[1] + '" fill-opacity=".22" stroke="' + COLORS[1] + '" stroke-width="3"/>';
    s += '<text class="ttl" x="110" y="30" text-anchor="middle" style="fill:' + COLORS[0] + '">' + esc(o.a) + '</text>';
    s += '<text class="ttl" x="290" y="30" text-anchor="middle" style="fill:#1d8a55">' + esc(o.b) + '</text>';
    s += '<text class="val" style="font-size:22px" x="115" y="136" text-anchor="middle">' + show('onlyA') + '</text>';
    s += '<text class="val" style="font-size:22px" x="200" y="136" text-anchor="middle">' + show('both') + '</text>';
    s += '<text class="val" style="font-size:22px" x="285" y="136" text-anchor="middle">' + show('onlyB') + '</text>';
    if (o.out !== undefined) s += '<text class="val" style="font-size:20px" x="372" y="222" text-anchor="middle">' + show('out') + '</text>';
    if (o.label) s += '<text class="muted" x="16" y="226">' + esc(o.label) + '</text>';
    return s + '</svg>';
  }

  function table(o) {
    return '<table class="freq"><tr>' + o.head.map((h) => '<th>' + h + '</th>').join('') + '</tr>' +
      o.rows.map((r) => '<tr>' + r.map((c) => '<td>' + c + '</td>').join('') + '</tr>').join('') + '</table>';
  }

  window.Charts = { bar, line, pie, venn, table, COLORS };

  // Montar um gráfico de barras: cada categoria tem + e −. Confere quando todas batem.
  window.Montador = {
    mount(root, cfg) {
      const max = cfg.max || 10, cur = cfg.labels.map(() => 0);
      let done = false;
      root.classList.add('montador');
      root.innerHTML = '<div class="mb-rows"></div><div class="mb-msg muted">Toque em + e − até cada barra mostrar o valor da tabela.</div>';
      const rows = root.querySelector('.mb-rows'), msg = root.querySelector('.mb-msg');
      cfg.labels.forEach((l, i) => {
        rows.insertAdjacentHTML('beforeend',
          '<span class="mb-name">' + l + '</span><div class="mb-track"><div class="mb-fill"></div></div>' +
          '<span class="mb-btns"><button aria-label="Menos ' + l + '">−</button><button aria-label="Mais ' + l + '">+</button></span>');
      });
      const fills = rows.querySelectorAll('.mb-fill'), btns = rows.querySelectorAll('.mb-btns');
      function draw() {
        cur.forEach((v, i) => { fills[i].style.width = (v / max) * 100 + '%'; fills[i].textContent = v || ''; });
        if (!done && cur.every((v, i) => v === cfg.values[i])) {
          done = true;
          msg.className = 'mb-msg';
          msg.innerHTML = '✔ Gráfico montado! ' + (cfg.done || '');
          window.XP && XP.add(10, 'gráfico');
        }
      }
      btns.forEach((b, i) => {
        const [minus, plus] = b.querySelectorAll('button');
        minus.onclick = () => { if (cur[i] > 0) { cur[i]--; draw(); } };
        plus.onclick = () => { if (cur[i] < max) { cur[i]++; draw(); } };
      });
      draw();
    },
  };
})();
