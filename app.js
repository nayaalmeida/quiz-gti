/* ============================================================
   Quiz GTI · lógica do app (HTML, CSS e JS puros, sem dependências)
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.CONFIG || {};
  var DISC = window.DISCIPLINAS || [];
  var Q = window.QUESTOES || [];
  var QMAP = {};
  Q.forEach(function (q) { QMAP[q.id] = q; });
  var META = CFG.creditosParaColar || 1000;
  var CHAVE = "quizgti:v1";
  var LETRAS = "ABCDEFGHIJ";

  var NIVEIS = [
    { min: 0,    nome: "Boas-vindas" },
    { min: 100,  nome: "Pegando o ritmo" },
    { min: 250,  nome: "Estágio" },
    { min: 450,  nome: "Monitoria" },
    { min: 700,  nome: "Reta final" },
    { min: META, nome: "Colação de grau" },
    { min: Math.round(META * 1.4), nome: "Oratória da turma" },
    { min: Math.round(META * 1.9), nome: "Láurea acadêmica" }
  ];

  var CONQUISTAS = [
    { id: "primeira",  icone: "✓",  nome: "Primeira de muitas", desc: "Acerte sua primeira questão" },
    { id: "combo5",    icone: "5×", nome: "Embalou",            desc: "Faça 5 acertos seguidos" },
    { id: "combo10",   icone: "10×",nome: "Imparável",          desc: "Faça 10 acertos seguidos" },
    { id: "perfeita",  icone: "100",nome: "Gabaritou",          desc: "Feche uma rodada de 5+ questões sem errar" },
    { id: "segunda",   icone: "↺",  nome: "Segunda chamada",    desc: "Recupere 5 questões que tinha errado" },
    { id: "metade",    icone: "½",  nome: "Meio caminho",       desc: "Responda metade do banco" },
    { id: "tudo",      icone: "∞",  nome: "Zerou o banco",      desc: "Responda todas as questões" },
    { id: "gsc",       icone: "SEG",nome: "Blue team",          desc: "Domine todas de Segurança Cibernética" },
    { id: "fsc",       icone: "FSC",nome: "Cifrou, tá seguro", desc: "Domine todas de Fundamentos de Segurança e Criptografia" },
    { id: "gov",       icone: "GOV",nome: "Conselho aprovou",   desc: "Domine todas de Governança em TI" },
    { id: "eag",       icone: "EAG",nome: "Visão do todo",      desc: "Domine todas de Estudos Avançados" },
    { id: "enade",     icone: "EN", nome: "Dia de prova",       desc: "Domine todo o Simulado ENADE" },
    { id: "constancia",icone: "3d", nome: "Constância",         desc: "Estude em 3 dias diferentes" },
    { id: "colacao",   icone: "🎓", nome: "Colou grau",         desc: "Chegue a " + META + " créditos" }
  ];

  /* ---------- estado ---------- */
  function estadoInicial() {
    return {
      nome: "", tema: null, creditos: 0, q: {}, combo: 0, maxCombo: 0,
      recuperadas: 0, conquistas: {}, rodada: null, ultima: null, dias: [],
      rodadas: 0, colou: false,
      filtros: { disc: [], unidade: 0, modo: "todas", qtd: 10, prova: false }
    };
  }
  var S = carregar();
  var V = { sel: null, ordem: null, fb: null, confirmaReset: false }; // estado da tela (não salvo)

  function carregar() {
    var base = estadoInicial();
    try {
      var bruto = localStorage.getItem(CHAVE);
      if (bruto) {
        var d = JSON.parse(bruto);
        Object.keys(base).forEach(function (k) { if (d[k] !== undefined && d[k] !== null) base[k] = d[k]; });
        base.tema = d.tema || null;
        base.rodada = d.rodada || null;
        base.ultima = d.ultima || null;
      }
    } catch (e) { /* sem armazenamento: segue só em memória */ }
    if (base.rodada) { // descarta questões que saíram do banco
      base.rodada.ids = base.rodada.ids.filter(function (id) { return QMAP[id]; });
      if (!base.rodada.ids.length) base.rodada = null;
    }
    return base;
  }
  function salvar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(S)); } catch (e) { /* ignora */ }
  }

  /* ---------- utilitários ---------- */
  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function embaralhar(lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function disc(id) { return DISC.filter(function (d) { return d.id === id; })[0] || { nome: id, sigla: id, cor: "#888" }; }
  function nivelDe(creditos) {
    var n = 0;
    NIVEIS.forEach(function (nv, i) { if (creditos >= nv.min) n = i; });
    return n;
  }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function hoje() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function dificil(q) { return q.tipo === "lacuna" || q.tipo === "associacao" || q.tipo === "multipla"; }
  function erradas() { return Q.filter(function (q) { return S.q[q.id] && S.q[q.id].ok === false; }); }
  function respondidas() { return Q.filter(function (q) { return S.q[q.id]; }); }
  function dominadas(lista) { return lista.filter(function (q) { return S.q[q.id] && S.q[q.id].ok === true; }); }
  function unidades() {
    var u = {};
    Q.forEach(function (q) { u[q.unidade] = true; });
    return Object.keys(u).sort();
  }

  var FILA = []; // avisos guardados durante o modo prova, para não entregar o gabarito
  function emProva() { return !!(S.rodada && S.rodada.prova); }
  function avisar(texto, tipo) {
    if (emProva()) { FILA.push([texto, tipo]); return; }
    var cx = document.getElementById("avisos");
    var el = document.createElement("div");
    el.className = "aviso" + (tipo ? " aviso-" + tipo : "");
    el.textContent = texto;
    cx.appendChild(el);
    setTimeout(function () { el.classList.add("some"); }, 3600);
    setTimeout(function () { el.remove(); }, 4100);
  }

  /* ---------- confete ---------- */
  function confete(qtd) {
    if (emProva()) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var c = document.getElementById("confete"), ctx = c.getContext("2d");
    var L = c.width = window.innerWidth, A = c.height = window.innerHeight;
    var cores = ["#ffb84d", "#6d4de6", "#0f9d8a", "#e2603a", "#f6f1e7"];
    var ps = [];
    for (var i = 0; i < (qtd || 90); i++) {
      ps.push({ x: Math.random() * L, y: -20 - Math.random() * A * 0.4, vx: (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 4, t: 5 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
        cor: cores[i % cores.length] });
    }
    var ini = performance.now();
    c.style.display = "block";
    (function quadro(agora) {
      ctx.clearRect(0, 0, L, A);
      ps.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vy += 0.04;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.cor; ctx.fillRect(-p.t / 2, -p.t / 4, p.t, p.t / 2); ctx.restore();
      });
      if (agora - ini < 2800) requestAnimationFrame(quadro);
      else { ctx.clearRect(0, 0, L, A); c.style.display = "none"; }
    })(ini);
  }

  /* ---------- tema ---------- */
  function aplicarTema() {
    var escuro = S.tema ? S.tema === "escuro"
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute("data-tema", escuro ? "escuro" : "claro");
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", escuro ? "#14132b" : "#f6f1e7");
    document.getElementById("btn-tema").innerHTML = escuro
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  }

  /* ---------- cabeçalho e rodapé ---------- */
  function placar() {
    if (emProva() && rotaAtual() === "quiz") {
      document.getElementById("placar").innerHTML = '<span class="placar-cred">prova</span>';
      return;
    }
    var n = nivelDe(S.creditos);
    document.getElementById("placar").innerHTML =
      '<span class="placar-cred">' + S.creditos + '<small> cr</small></span>' +
      '<span class="placar-nivel">' + esc(NIVEIS[n].nome) + "</span>" +
      (S.combo >= 3 ? '<span class="placar-combo" title="Acertos seguidos">' + S.combo + "×</span>" : "");
  }
  function rodape() {
    var h = "";
    if (CFG.link) h += '<a class="rodape-link" href="' + esc(CFG.link) + '" target="_blank" rel="noopener">' + esc(CFG.linkTexto || CFG.link) + "</a>";
    if (CFG.link2) h += '<a class="rodape-link" href="' + esc(CFG.link2) + '" target="_blank" rel="noopener">' + esc(CFG.linkTexto2 || CFG.link2) + "</a>";
    var linha = [CFG.autora, CFG.curso].filter(Boolean).join(" · ");
    if (linha) h += "<p>" + esc(linha) + "</p>";
    h += '<p class="fraco">Projeto independente de estudo, feito por estudante. Não é material oficial de nenhuma instituição. ' +
      "As questões são de treino; confira sempre com o material da disciplina.</p>";
    document.getElementById("rodape").innerHTML = h;
  }

  /* ============================================================
     TELAS
     ============================================================ */
  function barra(valor, total, cor) {
    return '<div class="barra" role="progressbar" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + valor + '">' +
      '<i style="width:' + pct(valor, total) + "%;" + (cor ? "background:" + cor : "") + '"></i></div>';
  }

  function telaInicio() {
    var n = nivelDe(S.creditos), err = erradas().length, r = S.rodada;
    var cta = r
      ? '<a class="btn btn-forte" href="#quiz">Continuar rodada <span class="btn-nota">' + Math.min(r.res.length + 1, r.ids.length) + "/" + r.ids.length + "</span></a>" +
        '<a class="btn" href="#estudar">Nova rodada</a>'
      : '<a class="btn btn-forte" href="#estudar">Começar a estudar</a>';
    if (err) cta += '<button class="btn" data-acao="revisar-erros">Revisar as que errei <span class="btn-nota">' + err + "</span></button>";

    var folha = "";
    for (var i = 0; i < 5; i++) {
      folha += '<div class="folha-linha"><b>' + (i + 1) + "</b>";
      for (var j = 0; j < 4; j++) folha += '<span class="bolha' + ((i * 3 + 1) % 4 === j ? " cheia" : "") + '">' + LETRAS[j] + "</span>";
      folha += "</div>";
    }

    var cards = DISC.map(function (d) {
      var lista = Q.filter(function (q) { return q.disc === d.id; });
      var dom = dominadas(lista).length;
      return '<article class="card disc" style="--cor:' + d.cor + '">' +
        '<span class="disc-sigla">' + esc(d.sigla) + "</span>" +
        "<h3>" + esc(d.nome) + "</h3>" +
        '<p class="fraco">' + lista.length + " questões · " + dom + " dominadas</p>" +
        barra(dom, lista.length, d.cor) +
        '<button class="btn btn-linha" data-acao="estudar-disc" data-id="' + d.id + '">Estudar esta</button></article>';
    }).join("");

    var marcos = NIVEIS.slice(0, 6).map(function (nv, i) {
      return '<li class="' + (i <= n ? "feito" : "") + (i === n ? " atual" : "") + '"><span></span>' + esc(nv.nome) + "</li>";
    }).join("");

    return '<section class="heroi">' +
      '<div class="heroi-texto">' +
        (CFG.curso ? '<p class="sobre">' + esc(CFG.curso) + "</p>" : "") +
        "<h1>" + esc(CFG.titulo || "Quiz") + "</h1>" +
        '<p class="lead">' + esc(CFG.subtitulo || "") + "</p>" +
        '<div class="acoes">' + cta + "</div>" +
      "</div>" +
      '<div class="folha" aria-hidden="true"><p class="folha-titulo">GABARITO</p>' + folha + "</div>" +
      "</section>" +

      '<section class="card trilha"><div class="trilha-topo"><h2>Rumo à colação</h2>' +
        "<p><b>" + S.creditos + "</b> de " + META + " créditos</p></div>" +
        barra(Math.min(S.creditos, META), META) +
        '<ol class="marcos">' + marcos + "</ol></section>" +

      '<h2 class="titulo-secao">Disciplinas</h2><div class="grade">' + cards + "</div>" +

      '<h2 class="titulo-secao">Como funciona</h2><div class="grade regras">' +
        '<div class="card"><b>+10 créditos</b><p>no primeiro acerto de cada questão. Questões de lacuna, associação ou múltipla resposta valem +5.</p></div>' +
        '<div class="card"><b>Combo a partir de 3</b><p>acertos seguidos: +5 por questão. Errar zera o combo, mas nunca tira créditos.</p></div>' +
        '<div class="card"><b>Segunda chamada</b><p>acertar uma questão que você tinha errado dá +5 de bônus. Tudo fica salvo no seu navegador.</p></div>' +
      "</div>";
  }

  /* ---------- Estudar ---------- */
  function selecao() {
    var f = S.filtros;
    return Q.filter(function (q) {
      if (f.disc.length && f.disc.indexOf(q.disc) < 0) return false;
      if (f.unidade && String(q.unidade) !== String(f.unidade)) return false;
      if (f.modo === "erradas") return S.q[q.id] && S.q[q.id].ok === false;
      if (f.modo === "novas") return !S.q[q.id];
      return true;
    });
  }
  function chip(rotulo, acao, valor, ativo) {
    return '<button class="chip' + (ativo ? " ativo" : "") + '" data-acao="' + acao + '" data-v="' + esc(valor) + '" aria-pressed="' + !!ativo + '">' + esc(rotulo) + "</button>";
  }
  function telaEstudar() {
    var f = S.filtros, sel = selecao();
    var qtd = f.qtd ? Math.min(f.qtd, sel.length) : sel.length;
    var h = '<section class="estreita"><h1 class="titulo-pagina">Montar rodada</h1>';

    h += '<div class="card bloco"><h2>Disciplina</h2><div class="chips">' +
      chip("Todas", "f-disc", "", !f.disc.length) +
      DISC.map(function (d) { return chip(d.nome, "f-disc", d.id, f.disc.indexOf(d.id) >= 0); }).join("") + "</div></div>";

    h += '<div class="card bloco"><h2>Unidade</h2><div class="chips">' +
      chip("Todas", "f-uni", "0", !f.unidade) +
      unidades().map(function (u) { return chip(/^\d+$/.test(u) ? "Unidade " + u : u, "f-uni", u, String(f.unidade) === u); }).join("") + "</div></div>";

    h += '<div class="card bloco"><h2>Quais questões</h2><div class="chips">' +
      chip("Todas", "f-modo", "todas", f.modo === "todas") +
      chip("Só as que errei", "f-modo", "erradas", f.modo === "erradas") +
      chip("Ainda não respondidas", "f-modo", "novas", f.modo === "novas") + "</div></div>";

    h += '<div class="card bloco"><h2>Tamanho da rodada</h2><div class="chips">' +
      [5, 10, 20].map(function (n) { return chip(n + " questões", "f-qtd", n, f.qtd === n); }).join("") +
      chip("Todas", "f-qtd", "0", !f.qtd) + "</div></div>";

    h += '<div class="card bloco"><h2>Correção</h2><div class="chips">' +
      chip("Na hora, com explicação", "f-prova", "0", !f.prova) +
      chip("Só no final (modo prova)", "f-prova", "1", !!f.prova) + "</div>" +
      (f.prova ? '<p class="fraco dica">Você responde tudo sem ver o gabarito, como no ENADE. A correção comentada aparece no resultado.</p>' : "") + "</div>";

    h += '<div class="iniciar">' +
      (sel.length
        ? "<p><b>" + sel.length + "</b> " + (sel.length === 1 ? "questão encontrada" : "questões encontradas") + ". A rodada terá <b>" + qtd + "</b>, em ordem aleatória.</p>" +
          '<button class="btn btn-forte btn-grande" data-acao="iniciar">Iniciar rodada</button>'
        : '<p>Nenhuma questão com esses filtros. ' + (f.modo === "erradas" ? "Você não tem erros pendentes aqui." : "Tente outra combinação.") + "</p>") +
      (S.rodada ? '<p class="fraco">Iniciar uma nova rodada encerra a que está em andamento.</p>' : "") +
      "</div></section>";
    return h;
  }
  function iniciarRodada(lista, semProva) {
    var f = S.filtros;
    var ids = embaralhar(lista).map(function (q) { return q.id; });
    if (f.qtd) ids = ids.slice(0, f.qtd);
    S.rodada = { ids: ids, i: 0, res: [], ganho: 0, prova: !!f.prova && !semProva };
    FILA = [];
    V.sel = null; V.ordem = null; V.fb = null;
    salvar();
    location.hash = "#quiz";
    if (rotaAtual() === "quiz") render();
  }

  /* ---------- Quiz ---------- */
  function prepararQuestao(q) {
    V.fb = null;
    if (q.tipo === "unica") { V.sel = null; V.ordem = q.opcoes.map(function (_, i) { return i; }); if (!q.fixa) V.ordem = embaralhar(V.ordem); }
    else if (q.tipo === "multipla") { V.sel = []; V.ordem = embaralhar(q.opcoes.map(function (_, i) { return i; })); }
    else if (q.tipo === "vf") { V.sel = null; V.ordem = null; }
    else if (q.tipo === "lacuna") { V.sel = q.corretas.map(function () { return ""; }); V.ordem = embaralhar(q.banco); }
    else if (q.tipo === "associacao") {
      V.sel = q.pares.map(function () { return ""; });
      V.ordem = embaralhar(q.pares.map(function (p) { return p[1]; }).concat(q.extras || []));
    }
    V.id = q.id;
  }
  function pronto(q) {
    if (q.tipo === "unica" || q.tipo === "vf") return V.sel !== null;
    if (q.tipo === "multipla") return V.sel.length > 0;
    return V.sel.every(function (s) { return s !== ""; });
  }
  function corrigir(q) {
    if (q.tipo === "unica" || q.tipo === "vf") return V.sel === q.correta;
    if (q.tipo === "multipla") {
      return V.sel.length === q.corretas.length && q.corretas.every(function (c) { return V.sel.indexOf(c) >= 0; });
    }
    if (q.tipo === "lacuna") return q.corretas.every(function (c, i) { return V.sel[i] === c; });
    return q.pares.every(function (p, i) { return V.sel[i] === p[1]; });
  }
  var ROTULO_TIPO = { unica: "Múltipla escolha", multipla: "Mais de uma correta", vf: "Verdadeiro ou falso", lacuna: "Lacunas", associacao: "Associação" };

  function corpoQuestao(q) {
    var fb = V.fb, h = "";
    if (q.tipo === "unica" || q.tipo === "multipla") {
      var multi = q.tipo === "multipla";
      h += '<div class="opcoes" role="' + (multi ? "group" : "radiogroup") + '" aria-label="Alternativas">';
      V.ordem.forEach(function (idx, pos) {
        var marcada = multi ? V.sel.indexOf(idx) >= 0 : V.sel === idx;
        var certa = multi ? q.corretas.indexOf(idx) >= 0 : q.correta === idx;
        var cls = "opcao" + (marcada ? " marcada" : "");
        if (fb) cls += certa ? " certa" : (marcada ? " errada" : " apagada");
        h += '<button type="button" class="' + cls + '" data-acao="opcao" data-i="' + idx + '" role="' + (multi ? "checkbox" : "radio") +
          '" aria-checked="' + marcada + '"' + (fb ? " disabled" : "") + ">" +
          '<span class="bolha' + (multi ? " quadrada" : "") + '">' + LETRAS[pos] + "</span>" +
          '<span class="opcao-texto">' + esc(q.opcoes[idx]) +
          (fb && !certa && q.porque && q.porque[idx] ? '<small class="porque">' + esc(q.porque[idx]) + "</small>" : "") +
          (fb && certa ? '<small class="porque ok">Resposta correta</small>' : "") +
          "</span></button>";
      });
      h += "</div>";
    } else if (q.tipo === "vf") {
      h += '<div class="opcoes vf" role="radiogroup" aria-label="Verdadeiro ou falso">';
      [true, false].forEach(function (v) {
        var marcada = V.sel === v, certa = q.correta === v;
        var cls = "opcao" + (marcada ? " marcada" : "");
        if (fb) cls += certa ? " certa" : (marcada ? " errada" : " apagada");
        h += '<button type="button" class="' + cls + '" data-acao="vf" data-v="' + v + '" role="radio" aria-checked="' + marcada + '"' + (fb ? " disabled" : "") + ">" +
          '<span class="bolha">' + (v ? "V" : "F") + '</span><span class="opcao-texto">' + (v ? "Verdadeiro" : "Falso") + "</span></button>";
      });
      h += "</div>";
    } else if (q.tipo === "lacuna") {
      var partes = esc(q.texto).split(/\{\{(\d+)\}\}/);
      h += '<p class="lacunas">';
      partes.forEach(function (p, k) {
        if (k % 2 === 0) { h += p; return; }
        var i = parseInt(p, 10) - 1;
        var cls = "campo" + (fb ? (V.sel[i] === q.corretas[i] ? " certa" : " errada") : "");
        h += '<select class="' + cls + '" data-acao="campo" data-i="' + i + '" aria-label="Lacuna ' + (i + 1) + '"' + (fb ? " disabled" : "") + '><option value="">lacuna ' + (i + 1) + "</option>" +
          V.ordem.map(function (o) { return '<option' + (V.sel[i] === o ? " selected" : "") + ">" + esc(o) + "</option>"; }).join("") + "</select>" +
          (fb && V.sel[i] !== q.corretas[i] ? ' <span class="correcao">' + esc(q.corretas[i]) + "</span>" : "");
      });
      h += "</p>";
    } else {
      h += '<div class="pares">';
      q.pares.forEach(function (p, i) {
        var ok = V.sel[i] === p[1];
        h += '<div class="par' + (fb ? (ok ? " certa" : " errada") : "") + '"><span class="par-item">' + esc(p[0]) + "</span>" +
          '<select class="campo" data-acao="campo" data-i="' + i + '" aria-label="Resposta para ' + esc(p[0]) + '"' + (fb ? " disabled" : "") + '><option value="">escolha…</option>' +
          V.ordem.map(function (o) { return '<option' + (V.sel[i] === o ? " selected" : "") + ">" + esc(o) + "</option>"; }).join("") + "</select>" +
          (fb && !ok ? '<span class="correcao">' + esc(p[1]) + "</span>" : "") + "</div>";
      });
      h += "</div>";
    }
    return h;
  }

  function telaQuiz() {
    var r = S.rodada;
    if (!r) return '<section class="estreita vazio"><h1 class="titulo-pagina">Nenhuma rodada em andamento</h1><a class="btn btn-forte" href="#estudar">Montar uma rodada</a></section>';
    if (!V.fb && r.res.length > r.i) { r.i = r.res.length; salvar(); } // recarregou depois de responder
    if (r.i >= r.ids.length) { encerrarRodada(); return ""; }
    var q = QMAP[r.ids[r.i]];
    if (V.id !== q.id) prepararQuestao(q);
    var d = disc(q.disc), fb = V.fb, ultima = r.i === r.ids.length - 1;

    var h = '<section class="estreita quiz" style="--cor:' + d.cor + '">' +
      '<div class="quiz-topo"><a class="link-fraco" href="#inicio">← Pausar</a>' +
      "<span>Questão <b>" + (r.i + 1) + "</b> de " + r.ids.length + "</span>" +
      '<span class="combo' + (!r.prova && S.combo >= 3 ? " quente" : "") + '">' + (r.prova ? "prova" : (S.combo >= 2 ? S.combo + " seguidas" : "")) + "</span></div>" +
      barra(r.i + (fb ? 1 : 0), r.ids.length, d.cor) +
      '<article class="card questao">' +
      '<p class="etiquetas"><span class="etiqueta cor">' + esc(d.sigla) + "</span>" +
      '<span class="etiqueta">' + (/^\d+$/.test(String(q.unidade)) ? "Unidade " + q.unidade : esc(q.unidade)) + "</span>" +
      '<span class="etiqueta">' + ROTULO_TIPO[q.tipo] + "</span>" +
      (S.q[q.id] && S.q[q.id].ok === false && !fb ? '<span class="etiqueta alerta">Segunda chamada</span>' : "") + "</p>" +
      '<h1 class="enunciado" id="enunciado" tabindex="-1">' + esc(q.enunciado) + "</h1>" +
      (q.codigo ? '<pre class="codigo"><code>' + esc(q.codigo) + "</code></pre>" : "") +
      corpoQuestao(q);

    if (fb) {
      h += '<div class="retorno ' + (fb.ok ? "ok" : "ruim") + '" role="status">' +
        '<p class="retorno-titulo">' + (fb.ok ? "Acertou" : "Não foi dessa vez") +
        (fb.ganho ? ' <span class="ganho">+' + fb.ganho + " cr</span>" : "") + "</p>" +
        (fb.detalhe.length ? '<p class="fraco">' + esc(fb.detalhe.join(" · ")) + "</p>" : "") +
        '<p class="tema-linha">' + esc(q.tema) + "</p>" +
        "<p>" + esc(q.explicacao) + "</p></div>" +
        '<div class="quiz-acoes"><button class="btn btn-forte btn-grande" data-acao="proxima" id="btn-principal">' + (ultima ? "Ver resultado" : "Próxima questão") + "</button></div>";
    } else {
      h += '<div class="quiz-acoes"><button class="btn btn-forte btn-grande" data-acao="responder" id="btn-principal"' + (pronto(q) ? "" : " disabled") + ">" + (r.prova ? (ultima ? "Confirmar e ver resultado" : "Confirmar e avançar") : "Responder") + "</button></div>";
    }
    return h + "</article></section>";
  }

  function responder() {
    var r = S.rodada, q = QMAP[r.ids[r.i]];
    if (!pronto(q) || V.fb) return;
    var ok = corrigir(q), antes = S.q[q.id], ganho = 0, det = [];
    var nivelAntes = nivelDe(S.creditos);
    var reg = antes || { t: 0, a: 0, ok: null, dom: false };
    reg.t++;
    if (ok) {
      reg.a++;
      if (!reg.dom) { ganho += 10; det.push("+10 primeiro acerto"); if (dificil(q)) { ganho += 5; det.push("+5 questão difícil"); } }
      else { ganho += 2; det.push("+2 revisão"); }
      if (antes && antes.ok === false) { ganho += 5; det.push("+5 segunda chamada"); S.recuperadas++; }
      S.combo++;
      if (S.combo >= 3) { ganho += 5; det.push("+5 combo de " + S.combo); }
      if (S.combo > S.maxCombo) S.maxCombo = S.combo;
      reg.dom = true;
    } else {
      if (S.combo >= 3) det.push("combo zerado");
      S.combo = 0;
    }
    reg.ok = ok;
    S.q[q.id] = reg;
    S.creditos += ganho;
    r.res.push({ id: q.id, ok: ok, ganho: ganho, sel: JSON.parse(JSON.stringify(V.sel)) });
    r.ganho += ganho;
    if (S.dias.indexOf(hoje()) < 0) S.dias.push(hoje());
    V.fb = { ok: ok, ganho: ganho, detalhe: det };

    var nivelDepois = nivelDe(S.creditos);
    if (nivelDepois > nivelAntes) { avisar("Novo nível: " + NIVEIS[nivelDepois].nome, "nivel"); confete(70); }
    if (!S.colou && S.creditos >= META) { S.colou = true; confete(220); avisar("Você colou grau! Seu diploma está em Desempenho.", "nivel"); }
    conferirConquistas();
    if (r.prova) { proxima(); return; }
    salvar(); render();
    var alvo = document.getElementById("btn-principal");
    if (alvo) alvo.focus({ preventScroll: true });
    var ret = document.querySelector(".retorno");
    if (ret && ret.scrollIntoView) ret.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  function proxima() {
    var r = S.rodada;
    if (!r || !V.fb) return;
    r.i++; V.fb = null; V.id = null;
    if (r.i >= r.ids.length) { encerrarRodada(); return; }
    salvar(); render();
    window.scrollTo(0, 0);
    var e = document.getElementById("enunciado"); if (e) e.focus({ preventScroll: true });
  }
  function encerrarRodada() {
    var r = S.rodada;
    var certos = r.res.filter(function (x) { return x.ok; }).length;
    S.ultima = { res: r.res, ganho: r.ganho, certos: certos, total: r.res.length };
    S.rodada = null; S.rodadas++;
    V.fb = null; V.id = null;
    var pendentes = FILA; FILA = [];
    pendentes.slice(-3).forEach(function (a) { avisar(a[0], a[1]); });
    if (r.res.length >= 5 && certos === r.res.length) { ganhar("perfeita"); confete(140); }
    else if (r.prova && pendentes.length) confete(70);
    salvar();
    if (rotaAtual() === "resultado") render(); else location.hash = "#resultado";
  }

  function ganhar(id) {
    if (S.conquistas[id]) return;
    S.conquistas[id] = Date.now();
    var c = CONQUISTAS.filter(function (x) { return x.id === id; })[0];
    if (c) avisar("Conquista: " + c.nome, "conquista");
  }
  function conferirConquistas() {
    var resp = respondidas().length;
    if (Q.some(function (q) { return S.q[q.id] && S.q[q.id].dom; })) ganhar("primeira");
    if (S.maxCombo >= 5) ganhar("combo5");
    if (S.maxCombo >= 10) ganhar("combo10");
    if (S.recuperadas >= 5) ganhar("segunda");
    if (resp >= Math.ceil(Q.length / 2)) ganhar("metade");
    if (resp >= Q.length) ganhar("tudo");
    DISC.forEach(function (d) {
      var lista = Q.filter(function (q) { return q.disc === d.id; });
      if (lista.length && dominadas(lista).length === lista.length) ganhar(d.id);
    });
    if (S.dias.length >= 3) ganhar("constancia");
    if (S.colou) ganhar("colacao");
  }

  /* ---------- Resultado ---------- */
  // devolve a resposta em texto: a correta (gabarito = true) ou a que a pessoa marcou
  function textoResposta(q, sel, gabarito) {
    if (!gabarito && (sel === undefined || sel === null)) return "";
    var linhas;
    if (q.tipo === "unica") linhas = [q.opcoes[gabarito ? q.correta : sel]];
    else if (q.tipo === "multipla") linhas = (gabarito ? q.corretas : sel).map(function (i) { return q.opcoes[i]; });
    else if (q.tipo === "vf") linhas = [(gabarito ? q.correta : sel) ? "Verdadeiro" : "Falso"];
    else if (q.tipo === "lacuna") linhas = [(gabarito ? q.corretas : sel).join(" · ")];
    else linhas = q.pares.map(function (p, i) { return p[0] + " → " + (gabarito ? p[1] : sel[i]); });
    return linhas.map(function (l) { return "<span class=\"linha-resp\">" + esc(l === undefined ? "" : l) + "</span>"; }).join("");
  }
  function telaResultado() {
    var u = S.ultima;
    if (!u) return '<section class="estreita vazio"><h1 class="titulo-pagina">Ainda não há resultado</h1><a class="btn btn-forte" href="#estudar">Montar uma rodada</a></section>';
    var p = pct(u.certos, u.total);
    var frase = p === 100 ? "Gabaritou. Pode ir com calma pra prova." : p >= 70 ? "Bom resultado. Vale revisar o que escapou." : p >= 40 ? "Dá pra subir. Refaça as que errou enquanto está fresco." : "Faz parte. Leia as explicações e tente de novo.";
    var errs = u.res.filter(function (x) { return !x.ok && QMAP[x.id]; });
    var lista = u.res.filter(function (x) { return QMAP[x.id]; }).map(function (x) {
      var q = QMAP[x.id], sua = textoResposta(q, x.sel, false);
      return '<li class="' + (x.ok ? "ok" : "ruim") + '"><details><summary><span class="marca-res">' + (x.ok ? "✓" : "✕") + "</span>" +
        '<span class="res-titulo"><b>' + esc(q.tema) + "</b><small>" + esc(disc(q.disc).nome) + (x.ganho ? " · +" + x.ganho + " cr" : "") + "</small></span>" +
        '<span class="res-seta" aria-hidden="true">▾</span></summary>' +
        '<div class="revisao"><p class="revisao-enunciado">' + esc(q.enunciado) + "</p>" +
        (q.codigo ? '<pre class="codigo"><code>' + esc(q.codigo) + "</code></pre>" : "") +
        (sua && !x.ok ? '<p><span class="sobre">Sua resposta</span>' + sua + "</p>" : "") +
        '<p><span class="sobre">Resposta correta</span>' + textoResposta(q, null, true) + "</p>" +
        '<p><span class="sobre">Explicação</span>' + esc(q.explicacao) + "</p></div></details></li>";
    }).join("");
    return '<section class="estreita resultado">' +
      '<div class="card nota"><p class="sobre">Resultado da rodada</p>' +
      '<p class="nota-num">' + u.certos + "<small>/" + u.total + "</small></p>" +
      barra(u.certos, u.total) +
      "<p>" + frase + "</p>" +
      '<p class="fraco">' + p + "% de aproveitamento · +" + u.ganho + " créditos</p></div>" +
      '<div class="acoes centro">' +
      (errs.length ? '<button class="btn btn-forte" data-acao="refazer-erros">Refazer as ' + errs.length + " que errei</button>" : "") +
      '<a class="btn' + (errs.length ? "" : " btn-forte") + '" href="#estudar">Nova rodada</a>' +
      '<a class="btn" href="#desempenho">Ver desempenho</a></div>' +
      '<h2 class="titulo-secao">Questão por questão <small>toque para ver a correção</small></h2><ul class="lista-res">' + lista + "</ul></section>";
  }

  /* ---------- Desempenho ---------- */
  function telaDesempenho() {
    var n = nivelDe(S.creditos), prox = NIVEIS[n + 1];
    var resp = respondidas(), tent = 0, ac = 0;
    resp.forEach(function (q) { tent += S.q[q.id].t; ac += S.q[q.id].a; });

    var h = '<section class="estreita"><h1 class="titulo-pagina">Desempenho</h1>';

    h += '<div class="card bloco nivel"><p class="sobre">Nível ' + (n + 1) + " de " + NIVEIS.length + "</p>" +
      "<h2>" + esc(NIVEIS[n].nome) + "</h2>" +
      (prox ? barra(S.creditos - NIVEIS[n].min, prox.min - NIVEIS[n].min) +
        '<p class="fraco">Faltam ' + (prox.min - S.creditos) + " créditos para " + esc(prox.nome) + ".</p>"
        : '<p class="fraco">Você chegou ao último nível.</p>') + "</div>";

    h += '<div class="numeros">' +
      '<div class="card"><b>' + S.creditos + "</b><span>créditos</span></div>" +
      '<div class="card"><b>' + resp.length + "<small>/" + Q.length + "</small></b><span>respondidas</span></div>" +
      '<div class="card"><b>' + pct(ac, tent) + "%</b><span>aproveitamento</span></div>" +
      '<div class="card"><b>' + S.maxCombo + "</b><span>maior sequência</span></div></div>";

    if (S.colou) {
      h += '<div class="card diploma" id="diploma"><p class="sobre">Diploma (não oficial)</p>' +
        "<p>Certificamos que</p>" +
        '<p class="diploma-nome">' + esc(S.nome || "escreva seu nome abaixo") + "</p>" +
        "<p>acumulou " + META + " créditos no " + esc(CFG.titulo || "Quiz") + " e está oficialmente pronta(o) para a prova.</p>" +
        '<p class="fraco">' + new Date(S.conquistas.colacao || Date.now()).toLocaleDateString("pt-BR") + "</p>" +
        '<button class="btn nao-imprime" data-acao="imprimir">Imprimir ou salvar em PDF</button></div>';
    }

    h += '<div class="card bloco"><label class="rotulo" for="nome">Seu nome (aparece no diploma)</label>' +
      '<input class="entrada" id="nome" type="text" maxlength="60" autocomplete="name" value="' + esc(S.nome) + '" placeholder="Como você quer ser chamada(o)"></div>';

    h += '<h2 class="titulo-secao">Por disciplina</h2>';
    DISC.forEach(function (d) {
      var lista = Q.filter(function (q) { return q.disc === d.id; });
      var dom = dominadas(lista).length;
      var us = {};
      lista.forEach(function (q) { (us[q.unidade] = us[q.unidade] || []).push(q); });
      h += '<div class="card bloco" style="--cor:' + d.cor + '"><div class="linha-disc"><h3>' + esc(d.nome) + "</h3><b>" + dom + "/" + lista.length + "</b></div>" +
        barra(dom, lista.length, d.cor) + '<ul class="unidades">' +
        Object.keys(us).sort().map(function (u) {
          var du = dominadas(us[u]).length, eu = us[u].filter(function (q) { return S.q[q.id] && S.q[q.id].ok === false; }).length;
          return "<li><span>" + (/^\d+$/.test(u) ? "Unidade " + u : esc(u)) + "</span><span>" + du + "/" + us[u].length + " dominadas" + (eu ? ' · <em>' + eu + " para rever</em>" : "") + "</span></li>";
        }).join("") + "</ul></div>";
    });

    h += '<h2 class="titulo-secao">Conquistas <small>' + Object.keys(S.conquistas).length + "/" + CONQUISTAS.length + '</small></h2><div class="conquistas">' +
      CONQUISTAS.map(function (c) {
        var tem = !!S.conquistas[c.id];
        return '<div class="conquista' + (tem ? " tem" : "") + '"><span class="conquista-icone" aria-hidden="true">' + c.icone + "</span><b>" + esc(c.nome) + "</b><small>" + esc(c.desc) + "</small>" +
          '<span class="oculto">' + (tem ? "Conquistada" : "Bloqueada") + "</span></div>";
      }).join("") + "</div>";

    h += '<h2 class="titulo-secao">Seus dados</h2><div class="card bloco"><p class="fraco">O progresso fica salvo só neste navegador. Use o backup para levar a outro aparelho.</p>' +
      '<div class="acoes"><button class="btn" data-acao="exportar">Baixar backup</button>' +
      '<label class="btn" for="arquivo">Restaurar backup</label><input class="oculto" id="arquivo" type="file" accept="application/json,.json">' +
      (V.confirmaReset
        ? '<button class="btn btn-perigo" data-acao="zerar-sim">Confirmar: apagar tudo</button><button class="btn" data-acao="zerar-nao">Cancelar</button>'
        : '<button class="btn btn-perigo" data-acao="zerar">Zerar progresso</button>') +
      "</div></div></section>";
    return h;
  }

  /* ============================================================
     ROTAS E EVENTOS
     ============================================================ */
  var ROTAS = { inicio: telaInicio, estudar: telaEstudar, quiz: telaQuiz, resultado: telaResultado, desempenho: telaDesempenho };
  function rotaAtual() {
    var r = (location.hash || "#inicio").slice(1);
    return ROTAS[r] ? r : "inicio";
  }
  function render() {
    var rota = rotaAtual();
    var html = ROTAS[rota]();
    if (rotaAtual() !== rota) return; // a tela redirecionou
    document.getElementById("app").innerHTML = html;
    document.body.setAttribute("data-rota", rota);
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      var ativo = a.getAttribute("data-nav") === rota || (a.getAttribute("data-nav") === "estudar" && (rota === "quiz" || rota === "resultado"));
      a.classList.toggle("ativo", ativo);
      if (ativo) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    placar();
  }

  window.addEventListener("hashchange", function () {
    V.confirmaReset = false;
    render(); window.scrollTo(0, 0);
    var app = document.getElementById("app"); if (app) app.focus({ preventScroll: true });
  });

  function alternar(lista, v) {
    var i = lista.indexOf(v);
    if (i >= 0) lista.splice(i, 1); else lista.push(v);
  }

  document.addEventListener("click", function (ev) {
    var el = ev.target.closest("[data-acao]");
    if (!el || el.tagName === "SELECT") return;
    var acao = el.getAttribute("data-acao"), f = S.filtros, q;
    switch (acao) {
      case "f-disc":
        if (!el.dataset.v) f.disc = []; else alternar(f.disc, el.dataset.v);
        if (f.disc.length === DISC.length) f.disc = [];
        salvar(); render(); break;
      case "f-uni": f.unidade = el.dataset.v === "0" ? 0 : el.dataset.v; salvar(); render(); break;
      case "f-modo": f.modo = el.dataset.v; salvar(); render(); break;
      case "f-prova": f.prova = el.dataset.v === "1"; salvar(); render(); break;
      case "f-qtd": f.qtd = parseInt(el.dataset.v, 10) || 0; salvar(); render(); break;
      case "iniciar": iniciarRodada(selecao()); break;
      case "estudar-disc":
        f.disc = [el.dataset.id]; f.unidade = 0; f.modo = "todas"; salvar(); location.hash = "#estudar"; break;
      case "revisar-erros":
        f.disc = []; f.unidade = 0; f.modo = "erradas"; salvar(); location.hash = "#estudar"; break;
      case "refazer-erros":
        var lista = S.ultima.res.filter(function (x) { return !x.ok && QMAP[x.id]; }).map(function (x) { return QMAP[x.id]; });
        var qtdAntes = f.qtd; f.qtd = 0; iniciarRodada(lista, true); f.qtd = qtdAntes; salvar(); break;
      case "opcao":
        if (V.fb) break;
        q = QMAP[S.rodada.ids[S.rodada.i]];
        var idx = parseInt(el.dataset.i, 10);
        if (q.tipo === "multipla") alternar(V.sel, idx); else V.sel = idx;
        atualizarOpcoes(q); break;
      case "vf":
        if (V.fb) break;
        q = QMAP[S.rodada.ids[S.rodada.i]];
        V.sel = el.dataset.v === "true"; atualizarOpcoes(q); break;
      case "responder": responder(); break;
      case "proxima": proxima(); break;
      case "exportar": exportar(); break;
      case "imprimir": window.print(); break;
      case "zerar": V.confirmaReset = true; render(); break;
      case "zerar-nao": V.confirmaReset = false; render(); break;
      case "zerar-sim":
        var tema = S.tema; S = estadoInicial(); S.tema = tema; V.confirmaReset = false;
        salvar(); render(); avisar("Progresso zerado."); break;
    }
  });

  // marca/desmarca alternativas sem redesenhar a tela (mantém o foco do teclado)
  function atualizarOpcoes(q) {
    document.querySelectorAll(".opcao").forEach(function (b) {
      var m;
      if (q.tipo === "vf") m = V.sel === (b.dataset.v === "true");
      else if (q.tipo === "multipla") m = V.sel.indexOf(parseInt(b.dataset.i, 10)) >= 0;
      else m = V.sel === parseInt(b.dataset.i, 10);
      b.classList.toggle("marcada", m);
      b.setAttribute("aria-checked", m);
    });
    var bt = document.getElementById("btn-principal");
    if (bt) bt.disabled = !pronto(q);
  }

  document.addEventListener("change", function (ev) {
    var el = ev.target;
    if (el.matches && el.matches('select[data-acao="campo"]')) {
      var q = QMAP[S.rodada.ids[S.rodada.i]];
      V.sel[parseInt(el.dataset.i, 10)] = el.value;
      var bt = document.getElementById("btn-principal");
      if (bt) bt.disabled = !pronto(q);
    } else if (el.id === "arquivo" && el.files && el.files[0]) {
      importar(el.files[0]);
    }
  });
  document.addEventListener("input", function (ev) {
    if (ev.target.id === "nome") {
      S.nome = ev.target.value.trim(); salvar();
      var dn = document.querySelector(".diploma-nome");
      if (dn) dn.textContent = S.nome || "escreva seu nome abaixo";
    }
  });

  // atalhos: 1-9 ou A-J escolhem a alternativa, Enter confirma/avança
  document.addEventListener("keydown", function (ev) {
    if (rotaAtual() !== "quiz" || !S.rodada || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var tag = ev.target.tagName;
    if (tag === "SELECT" || tag === "INPUT" || tag === "TEXTAREA") return;
    if (ev.key === "Enter" && tag !== "BUTTON" && tag !== "A") {
      ev.preventDefault();
      if (V.fb) proxima(); else responder();
      return;
    }
    if (V.fb) return;
    var k = ev.key.toLowerCase(), pos = -1;
    if (/^[1-9]$/.test(k)) pos = parseInt(k, 10) - 1;
    else if (k.length === 1 && "abcdefghij".indexOf(k) >= 0) pos = "abcdefghij".indexOf(k);
    var botoes = document.querySelectorAll(".opcoes:not(.vf) .opcao");
    if (pos >= 0 && botoes[pos]) { botoes[pos].click(); botoes[pos].focus(); }
    if (document.querySelector(".opcoes.vf")) {
      if (k === "v") document.querySelector('.opcao[data-v="true"]').click();
      if (k === "f") document.querySelector('.opcao[data-v="false"]').click();
    }
  });

  /* ---------- backup ---------- */
  function exportar() {
    var blob = new Blob([JSON.stringify({ app: CHAVE, quando: new Date().toISOString(), dados: S }, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "quiz-gti-backup.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    avisar("Backup baixado.");
  }
  function importar(arquivo) {
    var leitor = new FileReader();
    leitor.onload = function () {
      try {
        var d = JSON.parse(leitor.result);
        if (!d || d.app !== CHAVE || !d.dados || typeof d.dados.creditos !== "number") throw new Error("formato");
        localStorage.setItem(CHAVE, JSON.stringify(d.dados));
        S = carregar(); V = { sel: null, ordem: null, fb: null, confirmaReset: false };
        aplicarTema(); render(); avisar("Backup restaurado.");
      } catch (e) { avisar("Esse arquivo não é um backup válido deste quiz.", "erro"); }
    };
    leitor.readAsText(arquivo);
  }

  /* ---------- início ---------- */
  document.getElementById("btn-tema").addEventListener("click", function () {
    S.tema = document.documentElement.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
    salvar(); aplicarTema();
  });
  document.title = CFG.titulo || document.title;
  document.getElementById("marca-texto").textContent = CFG.titulo || "Quiz";
  aplicarTema(); rodape(); render();
})();
