// Banco de perguntas do Mundo 2 (Estatística e Probabilidade). Precisa de charts.js antes.
// M2.m6 … M2.m10 = quiz de cada missão; M2.todas() = tudo junto (Chefão 2 sorteia daqui).
// Pergunta { triple:[parte, total] } pede fração (mais simples), decimal e %.
// Regra: só frações que "chegam em 100" (denominador simplificado 2, 4, 5, 10, 20, 25 ou 50).
(function () {
  const F = (a, b) => '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>';
  const C = window.Charts;
  const QL = 'Qualitativa', QT = 'Quantitativa';

  // ---------- Missão 6: A pesquisa do clã ----------
  const jogos = C.table({ head: ['Jogo favorito', 'Votos'], rows: [['Minecraft', 8], ['Roblox', 6], ['Fortnite', 4], ['Outros', 2]] });
  const esportes = C.table({ head: ['Esporte favorito', 'Alunos'], rows: [['Futebol', 10], ['Vôlei', 5], ['Basquete', 7], ['Natação', 3]] });
  const m6 = [
    { tag: 'variável', text: 'Na pesquisa, perguntaram: <strong>“Qual é a sua cor favorita?”</strong> Essa variável é…', options: [QL, QT], answer: 0,
      hint: 'A resposta é um número ou uma palavra?', explain: 'A resposta é uma palavra (azul, roxo…): <strong>qualitativa</strong>.' },
    { tag: 'variável', text: '<strong>“Quantos anos você tem?”</strong> Essa variável é…', options: [QL, QT], answer: 1,
      hint: 'A resposta é um número?', explain: 'Idade é um número: <strong>quantitativa</strong>.' },
    { tag: 'variável', text: '<strong>“Quantos irmãos você tem?”</strong> Essa variável é…', options: [QL, QT], answer: 1,
      hint: 'Dá para contar?', explain: 'É uma contagem (0, 1, 2…): <strong>quantitativa</strong>.' },
    { tag: 'variável', text: '<strong>“Qual é o seu jogo favorito?”</strong> Essa variável é…', options: [QL, QT], answer: 0,
      hint: 'Minecraft, Roblox… são números?', explain: 'Nome de jogo é uma categoria: <strong>qualitativa</strong>.' },
    { tag: 'variável', text: '<strong>Altura dos alunos (em cm)</strong>. Essa variável é…', options: [QL, QT], answer: 1,
      hint: 'Altura se mede com régua ou fita.', explain: 'É uma medida (ex.: 148 cm): <strong>quantitativa</strong>.' },
    { tag: 'variável', text: '<strong>Tamanho da camiseta (P, M ou G)</strong>. Essa variável é…', options: [QL, QT], answer: 0,
      hint: 'P, M e G são números?', explain: 'P, M e G são <strong>categorias</strong>, não números: <strong>qualitativa</strong>. Pegadinha clássica!' },
    { tag: 'variável', text: 'Qual destas variáveis é <strong>quantitativa</strong>?', options: ['Time do coração', 'Sabor de sorvete favorito', 'Horas jogando por semana', 'Cor dos olhos'], answer: 2,
      hint: 'Procure a resposta que é um número.', explain: 'Horas por semana é um número (ex.: 5 horas): quantitativa. As outras são categorias.' },
    { tag: 'pesquisa', text: 'A escola tem <strong>400 alunos</strong>. Para descobrir o lanche favorito, o grêmio entrevistou <strong>50</strong> deles. Qual é a <strong>população</strong> da pesquisa?', options: ['Os 50 entrevistados', 'Os 400 alunos da escola', 'Os lanches', 'O grêmio'], answer: 1,
      hint: 'População = o grupo inteiro sobre o qual queremos saber.', explain: 'A população é o grupo todo: os <strong>400 alunos</strong>.' },
    { tag: 'pesquisa', text: 'Na mesma pesquisa (400 alunos na escola, 50 entrevistados), qual é a <strong>amostra</strong>?', options: ['Os 400 alunos', 'Os 50 entrevistados', 'Os professores', 'Os lanches mais vendidos'], answer: 1,
      hint: 'Amostra = a parte da população que foi realmente perguntada.', explain: 'A amostra é o pedaço que respondeu: os <strong>50 entrevistados</strong>.' },
    { tag: 'frequência', text: 'Pesquisa na turma:' + jogos + 'Quantos alunos responderam no total?', input: true, answer: ['20'],
      hint: 'Some todos os votos.', explain: '8 + 6 + 4 + 2 = 20 alunos.' },
    { tag: 'frequência', text: jogos + 'Que parte da turma escolheu <strong>Minecraft</strong>? (frequência relativa)', triple: [8, 20],
      hint: 'Parte em cima (8), total embaixo (20).', explain: F(8, 20) + ' → ' + F(2, 5) + ' = 0,4 = 40%.' },
    { tag: 'frequência', text: jogos + 'Que parte da turma escolheu <strong>Roblox</strong>?', triple: [6, 20],
      hint: F(6, 20) + ': os dois são pares.', explain: F(6, 20) + ' → ' + F(3, 10) + ' = 0,3 = 30%.' },
    { tag: 'frequência', text: jogos + 'Que parte da turma escolheu <strong>Fortnite</strong>?', triple: [4, 20],
      hint: F(4, 20) + ': divida os dois por 4.', explain: F(4, 20) + ' → ' + F(1, 5) + ' = 0,2 = 20%.' },
    { tag: 'frequência', text: 'Numa tabela de frequência, se você somar <strong>todas as frequências relativas</strong> (as porcentagens), dá…', options: ['50%', '100%', 'O número de alunos', 'Depende da tabela'], answer: 1,
      hint: 'Todas as partes juntas formam o quê?', explain: 'Todas as partes juntas formam o inteiro: <strong>100%</strong> (ou 1). Ex.: 40% + 30% + 20% + 10% = 100%.' },
    { tag: 'frequência', text: 'Pesquisa com 25 alunos:' + esportes + 'Que parte escolheu <strong>Basquete</strong>?', triple: [7, 25],
      hint: '25 × 4 = 100.', explain: F(7, 25) + ' = ' + F(28, 100) + ' = 0,28 = 28%.' },
    { tag: 'frequência', text: esportes + 'Que parte escolheu <strong>Natação</strong>?', triple: [3, 25],
      hint: '25 × 4 = 100.', explain: F(3, 25) + ' = ' + F(12, 100) + ' = 0,12 = 12%.' },
    { tag: 'frequência', text: esportes + 'Que parte escolheu <strong>Futebol</strong>?', triple: [10, 25],
      hint: F(10, 25) + ': os dois dividem por 5.', explain: F(10, 25) + ' → ' + F(2, 5) + ' = 0,4 = 40%.' },
    { tag: 'decimal', text: 'O decimal <strong>0,35</strong> é quantos por cento?', input: true, answer: ['35'], suffix: '%',
      hint: 'Decimal → %: a vírgula anda 2 casas para a direita (× 100).', explain: '0,35 = 35 centésimos = 35%.' },
  ];

  // ---------- Missão 7: Lendo gráficos ----------
  const fases = C.bar({ title: 'Moedas coletadas por fase', labels: ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4'], values: [30, 45, 20, 50] });
  const votos = C.bar({ title: 'Votos: jogo favorito (20 alunos)', labels: ['Minecraft', 'Roblox', 'Fortnite', 'Among Us'], values: [8, 5, 4, 3], horizontal: true, max: 10 });
  const online = C.line({ title: 'Jogadores online no servidor', labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'], values: [20, 35, 30, 50, 45] });
  const tempo = C.pie({ title: 'Meu tempo no jogo', labels: ['Explorar', 'Lutar', 'Construir'], values: [2, 1, 1] });
  const classes = C.pie({ title: 'Classe escolhida (40 jogadores)', labels: ['Guerreiro: 20', 'Mago: 10', 'Arqueiro: 6', 'Curandeiro: 4'], values: [20, 10, 6, 4] });
  const lanche = C.pie({ title: 'Lanche favorito (200 alunos)', labels: ['Pizza', 'Hambúrguer', 'Salada'], values: [50, 30, 20], showPct: true });
  const BAR = 'Barras ou colunas', LIN = 'Linhas', PIZ = 'Pizza (setores)';
  const m7 = [
    { tag: 'gráficos', text: 'Você quer mostrar como a <strong>temperatura mudou ao longo da semana</strong>. Qual gráfico é o melhor?', options: [BAR, LIN, PIZ], answer: 1,
      hint: 'Mudança ao longo do tempo…', explain: '<strong>Linhas</strong>: mostram a mudança com o tempo (subiu, desceu).' },
    { tag: 'gráficos', text: 'Você quer mostrar <strong>como gastou toda a sua mesada</strong> (as partes de um total). Qual gráfico é o melhor?', options: [BAR, LIN, PIZ], answer: 2,
      hint: 'Partes de um inteiro…', explain: '<strong>Pizza</strong>: cada fatia é uma parte do todo, e o todo é 100%.' },
    { tag: 'gráficos', text: 'Você quer <strong>comparar quantos votos</strong> cada um de 5 jogos recebeu. Qual gráfico é o melhor?', options: [BAR, LIN, PIZ], answer: 0,
      hint: 'Comparar categorias, lado a lado…', explain: '<strong>Barras/colunas</strong>: comparam quantidades de categorias diferentes.' },
    { tag: 'gráficos', text: 'Qual gráfico <strong>NÃO</strong> é bom para mostrar seu XP <strong>mês a mês</strong>?', options: [BAR, LIN, PIZ], answer: 2,
      hint: 'Mês a mês é ao longo do tempo. Qual deles mostra só partes de um todo?', explain: 'Pizza mostra partes de um todo, não a evolução no tempo. Linhas (ou colunas) funcionam bem.' },
    { tag: 'gráficos', text: fases + 'Em qual fase você coletou <strong>mais</strong> moedas?', options: ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4'], answer: 3,
      hint: 'Procure a coluna mais alta.', explain: 'A coluna mais alta é a Fase 4, com 50 moedas.' },
    { tag: 'gráficos', text: fases + 'Quantas moedas a <strong>mais</strong> você pegou na Fase 2 do que na Fase 3?', input: true, answer: ['25'],
      hint: 'Subtraia: Fase 2 − Fase 3.', explain: '45 − 20 = 25 moedas.' },
    { tag: 'gráficos', text: fases + 'Quantas moedas no <strong>total</strong>, somando as 4 fases?', input: true, answer: ['145'],
      hint: 'Some as 4 colunas.', explain: '30 + 45 + 20 + 50 = 145 moedas.' },
    { tag: 'gráficos', text: votos + 'Que parte dos votos foi para <strong>Roblox</strong>?', triple: [5, 20],
      hint: 'Total de votos: 20.', explain: F(5, 20) + ' → ' + F(1, 4) + ' = 0,25 = 25%.' },
    { tag: 'gráficos', text: votos + 'Que parte dos votos foi para <strong>Minecraft</strong>?', triple: [8, 20],
      hint: 'Total de votos: 20.', explain: F(8, 20) + ' → ' + F(2, 5) + ' = 0,4 = 40%.' },
    { tag: 'gráficos', text: online + 'De <strong>quarta para quinta</strong>, quantos jogadores a mais entraram?', input: true, answer: ['20'],
      hint: 'Quinta − quarta.', explain: '50 − 30 = 20 jogadores a mais.' },
    { tag: 'gráficos', text: online + 'De <strong>quinta para sexta</strong>, o número de jogadores…', options: ['Subiu', 'Desceu', 'Ficou igual'], answer: 1,
      hint: 'A linha vai para cima ou para baixo?', explain: 'Foi de 50 para 45: a linha <strong>desceu</strong>.' },
    { tag: 'gráficos', text: online + 'Em qual dia houve o <strong>maior aumento</strong> em relação ao dia anterior?', options: ['Terça', 'Quarta', 'Quinta', 'Sexta'], answer: 2,
      hint: 'Calcule quanto subiu de um dia para o outro.', explain: 'Terça subiu 15 (20 → 35); quinta subiu 20 (30 → 50). Maior aumento: <strong>quinta</strong>.' },
    { tag: 'pizza', text: tempo + 'Que parte do tempo você passa <strong>lutando</strong>?', triple: [1, 4],
      hint: 'A fatia de “Lutar” é que pedaço da pizza inteira?', explain: 'É um quarto da pizza: ' + F(1, 4) + ' = 0,25 = 25%.' },
    { tag: 'pizza', text: tempo + 'Que parte do tempo você passa <strong>explorando</strong>?', triple: [1, 2],
      hint: 'A fatia de “Explorar” ocupa quanto da pizza?', explain: 'Metade da pizza: ' + F(1, 2) + ' = 0,5 = 50%.' },
    { tag: 'pizza', text: classes + 'Que parte dos jogadores escolheu <strong>Mago</strong>?', triple: [10, 40],
      hint: 'Total: 40 jogadores.', explain: F(10, 40) + ' → ' + F(1, 4) + ' = 0,25 = 25%.' },
    { tag: 'pizza', text: classes + 'Que parte dos jogadores escolheu <strong>Arqueiro</strong>?', triple: [6, 40],
      hint: F(6, 40) + ': divida os dois por 2. Depois leve o de baixo até 100.', explain: F(6, 40) + ' → ' + F(3, 20) + ' = ' + F(15, 100) + ' = 0,15 = 15%.' },
    { tag: 'pizza', text: classes + 'Que parte dos jogadores escolheu <strong>Curandeiro</strong>?', triple: [4, 40],
      hint: F(4, 40) + ': divida os dois por 4.', explain: F(4, 40) + ' → ' + F(1, 10) + ' = 0,1 = 10%.' },
    { tag: 'pizza', text: lanche + 'Quantos alunos escolheram <strong>Hambúrguer</strong>?', input: true, answer: ['60'],
      hint: '30% de 200: o bloco de 10% de 200 é 20.', explain: '10% de 200 = 20; 30% = 3 × 20 = 60 alunos.' },
    { tag: 'pizza', text: 'Num gráfico de pizza, <strong>todas as fatias juntas</strong> valem…', options: ['50%', '100%', '360%', 'Depende'], answer: 1,
      hint: 'A pizza inteira é o total.', explain: 'A pizza inteira é o todo: <strong>100%</strong> = 1.' },
  ];

  // ---------- Missão 8: Amplitude e média ----------
  const gols = C.bar({ title: 'Gols por partida', labels: ['1ª', '2ª', '3ª', '4ª', '5ª'], values: [2, 4, 3, 5, 1], max: 6, step: 1 });
  const m8 = [
    { tag: 'amplitude', text: 'Pontos de 5 partidas: <strong>12, 30, 18, 25, 9</strong>. Qual é a amplitude?', input: true, answer: ['21'],
      hint: 'Amplitude = maior − menor.', explain: 'Maior 30, menor 9: 30 − 9 = 21.' },
    { tag: 'amplitude', text: 'Temperaturas da semana: <strong>18°, 25°, 22°, 15°, 20°</strong>. Qual é a amplitude?', input: true, answer: ['10'], suffix: '°',
      hint: 'Ache a maior e a menor.', explain: '25 − 15 = 10 graus.' },
    { tag: 'amplitude', text: 'Idades do time: <strong>11, 12, 11, 13, 12</strong>. Qual é a amplitude?', input: true, answer: ['2'],
      hint: 'Maior − menor.', explain: '13 − 11 = 2 anos.' },
    { tag: 'amplitude', text: 'Qual é a amplitude de <strong>7, 3, 10, 3</strong>?', options: ['4', '7', '10', '13'], answer: 1,
      hint: 'Não é o último menos o primeiro: é o MAIOR menos o MENOR.', explain: 'Maior 10, menor 3: 10 − 3 = 7.' },
    { tag: 'amplitude', text: C.line({ title: 'Jogadores online', labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'], values: [20, 35, 30, 50, 45] }) + 'Qual é a amplitude do número de jogadores?', input: true, answer: ['30'],
      hint: 'Ponto mais alto − ponto mais baixo.', explain: '50 − 20 = 30 jogadores.' },
    { tag: 'amplitude', text: 'Num dia, a mínima foi <strong>12°</strong> e a máxima foi <strong>31°</strong>. Qual foi a amplitude térmica?', input: true, answer: ['19'], suffix: '°',
      hint: 'Máxima − mínima.', explain: '31 − 12 = 19 graus.' },
    { tag: 'amplitude', text: 'O que a <strong>amplitude</strong> mostra?', options: ['O valor que mais aparece', 'A distância entre o maior e o menor valor', 'A soma de todos os valores', 'O valor do meio'], answer: 1,
      hint: 'Pense no cálculo: maior − menor.', explain: 'Ela mostra o quanto os dados estão <strong>espalhados</strong>: a distância do menor ao maior.' },
    { tag: 'média', text: 'Qual é a média de <strong>6, 8 e 10</strong>?', input: true, answer: ['8'],
      hint: 'Some tudo e divida pela quantidade de números.', explain: '6 + 8 + 10 = 24; 24 ÷ 3 = 8.' },
    { tag: 'média', text: 'Qual é a média de <strong>10, 20, 30 e 40</strong>?', input: true, answer: ['25'],
      hint: 'Soma ÷ 4.', explain: '10 + 20 + 30 + 40 = 100; 100 ÷ 4 = 25.' },
    { tag: 'média', text: 'Notas da Vicky: <strong>7, 9, 8, 6 e 10</strong>. Qual é a média?', input: true, answer: ['8'],
      hint: 'Soma ÷ 5.', explain: '7 + 9 + 8 + 6 + 10 = 40; 40 ÷ 5 = 8.' },
    { tag: 'média', text: 'Em 4 partidas você fez <strong>12, 8, 10 e 14</strong> pontos. Qual é a média de pontos por partida?', options: ['10', '11', '12', '44'], answer: 1,
      hint: 'Soma ÷ 4. Cuidado: 44 é só a soma!', explain: '12 + 8 + 10 + 14 = 44; 44 ÷ 4 = 11.' },
    { tag: 'média', text: 'A média de <strong>3 partidas</strong> foi <strong>10 pontos</strong>. Quantos pontos no <strong>total</strong>?', input: true, answer: ['30'],
      hint: 'Média = total ÷ 3. Então o total é…', explain: 'Total = média × quantidade = 10 × 3 = 30.' },
    { tag: 'média', text: gols + 'Qual é a <strong>média</strong> de gols por partida?', input: true, answer: ['3'],
      hint: 'Some os gols das 5 partidas e divida por 5.', explain: '2 + 4 + 3 + 5 + 1 = 15; 15 ÷ 5 = 3 gols.' },
    { tag: 'amplitude', text: gols + 'Qual é a <strong>amplitude</strong> dos gols?', input: true, answer: ['4'],
      hint: 'Coluna mais alta − coluna mais baixa.', explain: '5 − 1 = 4.' },
    { tag: 'média', text: gols + 'A média é 3 gols. Que parte das partidas teve gols <strong>acima da média</strong>?', triple: [2, 5],
      hint: 'Quantas colunas passam de 3? Total de partidas: 5.', explain: 'A 2ª (4) e a 4ª (5): ' + F(2, 5) + ' = 0,4 = 40%.' },
    { tag: 'amplitude', text: 'Altura de 4 plantas: <strong>15 cm, 22 cm, 9 cm e 30 cm</strong>. Qual é a amplitude?', input: true, answer: ['21'], suffix: 'cm',
      hint: 'Maior − menor.', explain: '30 − 9 = 21 cm.' },
  ];

  // ---------- Missão 9: Sorte ou azar (probabilidade) ----------
  const m9 = [
    { tag: 'probabilidade', text: 'Você joga uma moeda. Qual a probabilidade de sair <strong>cara</strong>?', triple: [1, 2],
      hint: 'Casos favoráveis: 1 (cara). Casos possíveis: 2 (cara ou coroa).', explain: F(1, 2) + ' = 0,5 = 50%.' },
    { tag: 'probabilidade', text: 'Você joga um dado (1 a 6). Qual a probabilidade de sair um número <strong>par</strong>?', triple: [3, 6],
      hint: 'Pares: 2, 4, 6. Possíveis: 6.', explain: F(3, 6) + ' → ' + F(1, 2) + ' = 0,5 = 50%.' },
    { tag: 'probabilidade', text: 'No dado (1 a 6), qual a probabilidade de sair um número <strong>maior que 3</strong>?', triple: [3, 6],
      hint: 'Maiores que 3: 4, 5, 6.', explain: '4, 5 e 6: ' + F(3, 6) + ' → ' + F(1, 2) + ' = 0,5 = 50%.' },
    { tag: 'probabilidade', text: 'No dado (1 a 6), qual a probabilidade de sair o número <strong>7</strong>?', options: ['0 = 0%', F(1, 6), '1 = 100%'], answer: 0,
      hint: 'Existe a face 7 no dado?', explain: 'Não existe 7 no dado: evento <strong>impossível</strong> = 0 = 0%.' },
    { tag: 'probabilidade', text: 'No dado (1 a 6), qual a probabilidade de sair um número <strong>menor que 7</strong>?', options: ['0 = 0%', '1 = 100%', F(6, 7)], answer: 1,
      hint: 'Todas as faces são menores que 7?', explain: 'Todas as 6 faces servem: ' + F(6, 6) + ' = 1 = 100%. Evento <strong>certo</strong>.' },
    { tag: 'probabilidade', text: 'Uma roleta tem <strong>4 partes iguais</strong>: vermelho, verde, amarelo e azul. Qual a probabilidade de parar no <strong>azul</strong>?' + C.pie({ labels: ['Vermelho', 'Verde', 'Amarelo', 'Azul'], values: [1, 1, 1, 1] }), triple: [1, 4],
      hint: '1 parte azul de 4 partes.', explain: F(1, 4) + ' = 0,25 = 25%.' },
    { tag: 'probabilidade', text: 'Uma roleta tem <strong>5 partes iguais</strong>, e <strong>2</strong> são douradas. Qual a probabilidade de parar no <strong>dourado</strong>?', triple: [2, 5],
      hint: 'Favoráveis: 2. Possíveis: 5.', explain: F(2, 5) + ' = 0,4 = 40%.' },
    { tag: 'probabilidade', text: 'Numa sacola há <strong>3 bolas vermelhas, 5 azuis e 2 verdes</strong>. Sorteando uma, qual a probabilidade de ser <strong>azul</strong>?', triple: [5, 10],
      hint: 'Total de bolas: 3 + 5 + 2.', explain: 'Total 10: ' + F(5, 10) + ' → ' + F(1, 2) + ' = 0,5 = 50%.' },
    { tag: 'probabilidade', text: 'Mesma sacola (3 vermelhas, 5 azuis, 2 verdes). Probabilidade de ser <strong>verde</strong>?', triple: [2, 10],
      hint: 'Verdes: 2. Total: 10.', explain: F(2, 10) + ' → ' + F(1, 5) + ' = 0,2 = 20%.' },
    { tag: 'probabilidade', text: 'Mesma sacola (3 vermelhas, 5 azuis, 2 verdes). Probabilidade de <strong>NÃO</strong> ser vermelha?', triple: [7, 10],
      hint: 'Não vermelha = azul ou verde: 5 + 2.', explain: F(7, 10) + ' = 0,7 = 70%.' },
    { tag: 'probabilidade', text: 'Um baú tem <strong>20 itens</strong>: 1 lendário, 4 raros e 15 comuns. Qual a chance de tirar o <strong>lendário</strong>?', triple: [1, 20],
      hint: '20 × 5 = 100.', explain: F(1, 20) + ' = ' + F(5, 100) + ' = 0,05 = 5%. Cuidado: 5% é 0,05, não 0,5!' },
    { tag: 'probabilidade', text: 'Mesmo baú (1 lendário, 4 raros, 15 comuns). Chance de tirar um item <strong>raro</strong>?', triple: [4, 20],
      hint: F(4, 20) + ': divida os dois por 4.', explain: F(4, 20) + ' → ' + F(1, 5) + ' = 0,2 = 20%.' },
    { tag: 'probabilidade', text: 'Mesmo baú (1 lendário, 4 raros, 15 comuns). Chance de tirar um item <strong>comum</strong>?', triple: [15, 20],
      hint: F(15, 20) + ': divida os dois por 5.', explain: F(15, 20) + ' → ' + F(3, 4) + ' = 0,75 = 75%.' },
    { tag: 'probabilidade', text: 'Cartas numeradas de <strong>1 a 20</strong>. Qual a probabilidade de sortear um <strong>múltiplo de 5</strong>?', triple: [4, 20],
      hint: 'Múltiplos de 5 até 20: 5, 10, 15, 20.', explain: '4 cartas: ' + F(4, 20) + ' → ' + F(1, 5) + ' = 0,2 = 20%.' },
    { tag: 'probabilidade', text: 'Cartas de <strong>1 a 10</strong>. Qual a probabilidade de sortear um número <strong>primo</strong>?', triple: [4, 10],
      hint: 'Primos até 10: 2, 3, 5, 7.', explain: '4 primos: ' + F(4, 10) + ' → ' + F(2, 5) + ' = 0,4 = 40%.' },
    { tag: 'probabilidade', text: 'A turma tem <strong>25 alunos</strong>, e <strong>10</strong> são meninas. Sorteando um aluno, qual a probabilidade de ser <strong>menina</strong>?', triple: [10, 25],
      hint: F(10, 25) + ': divida por 5.', explain: F(10, 25) + ' → ' + F(2, 5) + ' = 0,4 = 40%.' },
    { tag: 'probabilidade', text: 'Mesma turma (25 alunos, 10 meninas). Probabilidade de ser <strong>menino</strong>?', triple: [15, 25],
      hint: 'Meninos: 25 − 10.', explain: '15 meninos: ' + F(15, 25) + ' → ' + F(3, 5) + ' = 0,6 = 60%.' },
    { tag: 'probabilidade', text: 'Onde é <strong>mais provável</strong> tirar vermelho? Sacola A: 3 vermelhas em 10 bolas. Sacola B: 1 vermelha em 4 bolas.', options: ['Sacola A', 'Sacola B', 'Tanto faz'], answer: 0,
      hint: 'Transforme as duas em porcentagem.', explain: 'A: ' + F(3, 10) + ' = 30%. B: ' + F(1, 4) + ' = 25%. A sacola A ganha.' },
    { tag: 'probabilidade', text: 'Uma probabilidade pode ser <strong>120%</strong>?', options: ['Sim', 'Não: vai de 0% (impossível) a 100% (certo)'], answer: 1,
      hint: 'O mais garantido que existe é o evento certo…', explain: 'Probabilidade vai de 0 a 1, ou seja, de 0% a 100%.' },
  ];

  // ---------- Missão 10: Diagrama de Venn ----------
  const v1 = C.venn({ a: 'Minecraft', b: 'Roblox', onlyA: 14, both: 8, onlyB: 10, out: 8, label: 'Turma de 40 alunos' });
  const v2 = C.venn({ a: 'Pizza', b: 'Hambúrguer', onlyA: '?', both: 10, onlyB: '?', out: '?', label: '50 alunos' });
  const v3 = C.venn({ a: 'Gato', b: 'Cachorro', onlyA: 7, both: '?', onlyB: 9, out: 2, label: '25 pessoas' });
  const m10 = [
    { tag: 'venn', text: v1 + 'Quantos alunos jogam <strong>só Minecraft</strong>?', input: true, answer: ['14'],
      hint: 'É a parte do círculo do Minecraft que fica fora do meio.', explain: 'Só Minecraft = 14 (parte do círculo roxo fora do meio).' },
    { tag: 'venn', text: v1 + 'Quantos alunos jogam <strong>Minecraft</strong> (no total)?', input: true, answer: ['22'],
      hint: 'O círculo inteiro: “só Minecraft” + o meio.', explain: '14 + 8 = 22. O meio também joga Minecraft!' },
    { tag: 'venn', text: v1 + 'Quantos alunos jogam <strong>Roblox</strong> (no total)?', input: true, answer: ['18'],
      hint: 'O círculo inteiro do Roblox.', explain: '10 + 8 = 18.' },
    { tag: 'venn', text: v1 + 'Quantos jogam <strong>os dois</strong> jogos?', input: true, answer: ['8'],
      hint: 'Onde os círculos se cruzam.', explain: 'O meio (interseção) = 8.' },
    { tag: 'venn', text: v1 + 'Quantos jogam <strong>pelo menos um</strong> dos dois?', input: true, answer: ['32'],
      hint: 'Tudo o que está dentro dos círculos (sem contar o meio duas vezes!).', explain: '14 + 8 + 10 = 32. (Ou: 40 − 8 que não jogam nenhum.)' },
    { tag: 'venn', text: v1 + 'Sorteando um aluno, qual a probabilidade de ele jogar <strong>os dois</strong>?', triple: [8, 40],
      hint: 'Meio ÷ total da turma (40).', explain: F(8, 40) + ' → ' + F(1, 5) + ' = 0,2 = 20%.' },
    { tag: 'venn', text: v1 + 'Que parte da turma <strong>não joga nenhum</strong> dos dois?', triple: [8, 40],
      hint: 'O número fora dos círculos ÷ 40.', explain: F(8, 40) + ' → ' + F(1, 5) + ' = 0,2 = 20%.' },
    { tag: 'venn', text: v1 + 'Que parte da turma joga <strong>só Minecraft</strong>?', triple: [14, 40],
      hint: F(14, 40) + ': os dois são pares.', explain: F(14, 40) + ' → ' + F(7, 20) + ' = ' + F(35, 100) + ' = 0,35 = 35%.' },
    { tag: 'venn', text: v1 + 'Que parte da turma joga <strong>Minecraft</strong> (no total)?', triple: [22, 40],
      hint: 'Minecraft no total = 14 + 8.', explain: F(22, 40) + ' → ' + F(11, 20) + ' = 0,55 = 55%.' },
    { tag: 'venn', text: 'Numa turma de <strong>50</strong> alunos, <strong>30</strong> gostam de pizza, <strong>25</strong> de hambúrguer e <strong>10</strong> gostam dos dois.' + v2 + 'Quantos gostam <strong>só de pizza</strong>?', input: true, answer: ['20'],
      hint: 'Os 30 da pizza incluem os 10 do meio.', explain: '30 − 10 = 20.' },
    { tag: 'venn', text: 'Turma de 50: 30 gostam de pizza, 25 de hambúrguer, 10 dos dois.' + v2 + 'Quantos gostam <strong>só de hambúrguer</strong>?', input: true, answer: ['15'],
      hint: 'Tire o meio dos 25.', explain: '25 − 10 = 15.' },
    { tag: 'venn', text: 'Turma de 50: 30 gostam de pizza, 25 de hambúrguer, 10 dos dois.' + v2 + 'Quantos <strong>não gostam de nenhum</strong>?', input: true, answer: ['5'],
      hint: 'Só pizza (20) + meio (10) + só hambúrguer (15) = ? Quanto falta para 50?', explain: '20 + 10 + 15 = 45; 50 − 45 = 5.' },
    { tag: 'venn', text: 'Turma de 50: 30 gostam de pizza, 25 de hambúrguer, 10 dos dois. Por que <strong>30 + 25 = 55</strong> passa de 50?', options: ['A conta está errada', 'Quem gosta dos dois foi contado duas vezes', 'Faltou contar quem não gosta de nenhum', 'Porque 55 é a média'], answer: 1,
      hint: 'Os 10 do meio estão nos 30 e também nos 25.', explain: 'Os 10 do meio entram nos 30 <strong>e</strong> nos 25: foram contados duas vezes. Por isso o Venn é tão útil!' },
    { tag: 'venn', text: 'Turma de 50, e 5 não gostam nem de pizza nem de hambúrguer. Sorteando um aluno, qual a probabilidade de ser um desses 5?', triple: [5, 50],
      hint: F(5, 50) + ': divida os dois por 5.', explain: F(5, 50) + ' → ' + F(1, 10) + ' = 0,1 = 10%.' },
    { tag: 'venn', text: 'Turma de 50, e 20 gostam <strong>só de pizza</strong>. Que parte da turma é essa?', triple: [20, 50],
      hint: F(20, 50) + ': divida por 10.', explain: F(20, 50) + ' → ' + F(2, 5) + ' = 0,4 = 40%.' },
    { tag: 'venn', text: v3 + 'São <strong>25</strong> pessoas no total. Quantas têm <strong>gato e cachorro</strong>?', input: true, answer: ['7'],
      hint: 'Some o que você conhece (7 + 9 + 2) e veja quanto falta para 25.', explain: '7 + 9 + 2 = 18; 25 − 18 = 7.' },
    { tag: 'venn', text: v3 + 'Com o meio = 7, quantas pessoas têm <strong>cachorro</strong> (no total)?', input: true, answer: ['16'],
      hint: 'Círculo do cachorro inteiro.', explain: '9 + 7 = 16.' },
    { tag: 'venn', text: v3 + 'Que parte das 25 pessoas tem <strong>cachorro</strong> (no total, 16)?', triple: [16, 25],
      hint: '25 × 4 = 100.', explain: F(16, 25) + ' = ' + F(64, 100) + ' = 0,64 = 64%.' },
  ];

  const tagAll = (arr, m) => arr.map((q) => Object.assign({ mission: m }, q));
  window.M2 = {
    m6, m7, m8, m9, m10,
    todas() { return [].concat(tagAll(m6, 6), tagAll(m7, 7), tagAll(m8, 8), tagAll(m9, 9), tagAll(m10, 10)); },
  };
})();
