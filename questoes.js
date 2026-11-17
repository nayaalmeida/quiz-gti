/* ============================================================
   BANCO DE QUESTÕES + CONFIGURAÇÃO
   Edite este arquivo para personalizar o quiz. Veja o README.md.
   ============================================================ */

window.CONFIG = {
  titulo: "Quiz GTI",
  subtitulo: "Estude para as provas do 5º período e para o ENADE respondendo questões comentadas.",
  autora: "Aynoã Naya Almeida",   // seu nome, aparece no rodapé
  curso: "GTI · 5º período",
  link: "https://www.linkedin.com/in/aynoa-almeida/",
  linkTexto: "linkedin.com/in/aynoa-almeida",
  link2: "https://github.com/nayaalmeida",
  linkTexto2: "github.com/nayaalmeida",
  creditosParaColar: 1000
};

window.DISCIPLINAS = [
  { id: "gsc", nome: "Gestão de Segurança Cibernética", sigla: "SEG", cor: "#0f9d8a" },
  { id: "gov", nome: "Governança em TI",                sigla: "GOV", cor: "#6d4de6" },
  { id: "eag", nome: "Estudos Avançados em GTI",        sigla: "EAG", cor: "#e2603a" },
  { id: "fsc", nome: "Fundamentos de Segurança da Informação e Criptografia", sigla: "FSC", cor: "#b7791f" },
  { id: "enade", nome: "Simulado ENADE",                sigla: "ENADE", cor: "#2a6fdb" }
];

/* Tipos de questão
   unica      -> opcoes[], correta: índice
   multipla   -> opcoes[], corretas: [índices]
   vf         -> correta: true | false
   lacuna     -> texto com {{1}}, {{2}}...; banco[] de palavras; corretas[] na ordem das lacunas
   associacao -> pares: [[item, resposta], ...]; extras[] (respostas sobrando, opcional)
   Campos comuns: id, disc, unidade, tema, enunciado, explicacao
   Opcionais: codigo (trecho exibido em bloco), porque {índice: "por que está errada"},
              fixa: true (não embaralha as alternativas; use em "I e II, apenas" e asserção-razão)
*/
window.QUESTOES = [

  /* ---------------- Gestão de Segurança Cibernética ---------------- */
  {
    id: "gsc-01", disc: "gsc", unidade: 1, tema: "Tríade CID", tipo: "unica",
    enunciado: "Um ransomware criptografou o servidor de arquivos de uma clínica. Nenhum dado foi alterado nem vazado, mas a equipe passou dois dias sem conseguir abrir os prontuários. Qual pilar da segurança foi mais diretamente afetado?",
    opcoes: ["Confidencialidade", "Integridade", "Disponibilidade", "Não repúdio"],
    correta: 2,
    explicacao: "Disponibilidade é a garantia de que a informação está acessível a quem tem direito quando precisa. O enunciado descarta vazamento (confidencialidade) e alteração (integridade): o dano foi ficar sem acesso.",
    porque: {
      0: "Confidencialidade seria afetada se alguém não autorizado tivesse lido os dados, e o enunciado diz que nada vazou.",
      1: "Integridade trata de alteração indevida do conteúdo, o que o enunciado também descarta.",
      3: "Não repúdio é a impossibilidade de negar a autoria de uma ação; não tem relação com o cenário."
    }
  },
  {
    id: "gsc-02", disc: "gsc", unidade: 1, tema: "Legislação (LGPD)", tipo: "vf",
    enunciado: "A LGPD só se aplica a dados pessoais tratados em meio digital; fichas em papel ficam fora do alcance da lei.",
    correta: false,
    explicacao: "A LGPD trata do tratamento de dados pessoais \"inclusive nos meios digitais\", ou seja, vale também para meios físicos. Uma ficha cadastral em papel com nome e CPF é dado pessoal protegido pela lei."
  },
  {
    id: "gsc-03", disc: "gsc", unidade: 1, tema: "Camadas da segurança", tipo: "multipla",
    enunciado: "Quais dos itens abaixo são controles de natureza administrativa (organizacional)? Marque todos os corretos.",
    opcoes: [
      "Política de Segurança da Informação aprovada pela diretoria",
      "Programa de conscientização sobre phishing",
      "Firewall de borda",
      "Catraca com leitor biométrico na sala de servidores"
    ],
    corretas: [0, 1],
    explicacao: "Controles administrativos são normas, processos e ações voltadas a pessoas: políticas, treinamentos, termos de responsabilidade. Eles orientam o comportamento em vez de bloquear tecnicamente ou fisicamente.",
    porque: {
      2: "Firewall é um controle técnico (lógico).",
      3: "Catraca biométrica é um controle físico de acesso ao ambiente."
    }
  },
  {
    id: "gsc-04", disc: "gsc", unidade: 2, tema: "Tratamento de riscos", tipo: "unica",
    enunciado: "Depois de avaliar o risco de um ataque que paralise o e-commerce, a empresa decide contratar um seguro cibernético que cobre as perdas financeiras. Que estratégia de tratamento de risco é essa?",
    opcoes: ["Mitigar", "Transferir", "Aceitar", "Evitar"],
    correta: 1,
    explicacao: "Transferir (ou compartilhar) é repassar a um terceiro o impacto financeiro do risco, como em seguros e contratos de terceirização. O risco continua existindo, mas a perda é dividida.",
    porque: {
      0: "Mitigar seria aplicar controles para reduzir a probabilidade ou o impacto, como um WAF ou redundância.",
      2: "Aceitar é conviver com o risco sem ação adicional, normalmente quando ele está dentro do apetite de risco.",
      3: "Evitar seria eliminar a atividade que gera o risco, por exemplo deixar de vender on-line."
    }
  },
  {
    id: "gsc-05", disc: "gsc", unidade: 2, tema: "Evento x incidente", tipo: "lacuna",
    enunciado: "Complete a frase com os termos corretos.",
    texto: "Um {{1}} é qualquer ocorrência observável em um sistema ou rede. Ele passa a ser tratado como {{2}} de segurança quando compromete ou ameaça a confidencialidade, a integridade ou a disponibilidade.",
    banco: ["evento", "incidente", "ativo", "controle"],
    corretas: ["evento", "incidente"],
    explicacao: "Todo incidente é um evento, mas nem todo evento é um incidente. Um login registrado em log é um evento; mil tentativas de login falhas seguidas de um acesso indevido formam um incidente."
  },
  {
    id: "gsc-06", disc: "gsc", unidade: 2, tema: "Gestão de incidentes (fases)", tipo: "unica",
    enunciado: "O time de resposta identifica uma estação infectada e a primeira ação é desconectá-la da rede para que o malware não alcance outras máquinas. Em que fase da resposta a incidentes essa ação se encaixa?",
    opcoes: ["Preparação", "Contenção", "Erradicação", "Lições aprendidas"],
    correta: 1,
    explicacao: "Contenção busca limitar o alcance do incidente enquanto ele ainda acontece. Isolar a máquina não remove o malware, apenas impede que o estrago aumente.",
    porque: {
      0: "Preparação acontece antes do incidente: planos, ferramentas, treinamento do time.",
      2: "Erradicação é remover a causa (limpar o malware, corrigir a vulnerabilidade), depois de contido.",
      3: "Lições aprendidas é a etapa final, de revisão do que aconteceu e melhoria do processo."
    }
  },
  {
    id: "gsc-07", disc: "gsc", unidade: 3, tema: "Malware", tipo: "associacao",
    enunciado: "Associe cada tipo de malware à sua característica principal.",
    pares: [
      ["Ransomware", "Bloqueia ou criptografa dados e exige pagamento"],
      ["Worm", "Propaga-se sozinho pela rede, sem ação do usuário"],
      ["Cavalo de Troia", "Finge ser um programa legítimo para ser instalado"],
      ["Spyware", "Coleta informações do usuário sem consentimento"]
    ],
    explicacao: "A diferença clássica de prova é worm x vírus: o vírus precisa de um arquivo hospedeiro e de alguém que o execute; o worm se replica sozinho explorando falhas na rede."
  },
  {
    id: "gsc-08", disc: "gsc", unidade: 3, tema: "Pentest (tipos de teste)", tipo: "unica",
    enunciado: "Em um teste de intrusão, a equipe contratada recebe apenas o nome da empresa, sem credenciais, diagramas ou código-fonte. Esse tipo de teste é chamado de:",
    opcoes: ["Caixa-branca (white box)", "Caixa-cinza (gray box)", "Caixa-preta (black box)", "Teste de regressão"],
    correta: 2,
    explicacao: "No teste caixa-preta o testador parte do zero, simulando um atacante externo. É o cenário mais realista, mas também o que mais consome tempo com reconhecimento.",
    porque: {
      0: "Na caixa-branca o testador tem acesso total: código, arquitetura e credenciais.",
      1: "Na caixa-cinza há conhecimento parcial, como um usuário comum e parte da documentação.",
      3: "Teste de regressão é de qualidade de software, não um tipo de pentest."
    }
  },
  {
    id: "gsc-09", disc: "gsc", unidade: 3, tema: "Armazenamento de senhas (salt)", tipo: "unica",
    enunciado: "Qual é a principal finalidade de adicionar um salt antes de calcular o hash de uma senha?",
    opcoes: [
      "Permitir que a senha original seja recuperada pelo administrador",
      "Fazer com que senhas iguais gerem hashes diferentes, dificultando ataques com tabelas pré-computadas",
      "Reduzir o tamanho do hash armazenado no banco",
      "Substituir a necessidade de usar um algoritmo de hash"
    ],
    correta: 1,
    explicacao: "O salt é um valor aleatório e único por usuário, combinado à senha antes do hash. Assim, dois usuários com a mesma senha têm hashes diferentes e rainbow tables perdem a utilidade.",
    porque: {
      0: "Hash é de mão única; o salt não o torna reversível.",
      2: "O salt não altera o tamanho da saída do algoritmo e ainda precisa ser guardado junto.",
      3: "O salt complementa o hash, não o substitui."
    }
  },
  {
    id: "gsc-10", disc: "gsc", unidade: 3, tema: "Criptografia híbrida (TLS)", tipo: "unica",
    enunciado: "O TLS usa criptografia assimétrica no início da conexão e criptografia simétrica para o restante da sessão. Por quê?",
    opcoes: [
      "Porque a criptografia simétrica é mais segura que a assimétrica em qualquer situação",
      "Porque a assimétrica resolve a troca segura de chaves, e a simétrica é muito mais rápida para cifrar o volume de dados",
      "Porque a criptografia assimétrica não consegue cifrar textos",
      "Porque certificados digitais só funcionam com algoritmos simétricos"
    ],
    correta: 1,
    explicacao: "É a chamada criptografia híbrida: usa-se o que cada modelo tem de melhor. A assimétrica autentica o servidor e combina uma chave de sessão; a simétrica (como AES) cifra o tráfego com baixo custo computacional.",
    porque: {
      0: "Não existe essa superioridade absoluta; cada modelo resolve um problema diferente.",
      2: "A assimétrica cifra dados, mas é lenta e limitada para grandes volumes.",
      3: "Certificados X.509 carregam chaves públicas, ou seja, são baseados em criptografia assimétrica."
    }
  },

  /* ---------------- Governança em TI ---------------- */
  {
    id: "gov-01", disc: "gov", unidade: 1, tema: "Gestão x governança", tipo: "unica",
    enunciado: "No modelo do COBIT, quais atividades caracterizam a governança (e não a gestão)?",
    opcoes: [
      "Planejar, construir, executar e monitorar",
      "Avaliar, dirigir e monitorar",
      "Desenvolver, testar e implantar",
      "Registrar, classificar e resolver"
    ],
    correta: 1,
    explicacao: "Governança avalia as necessidades das partes interessadas, dirige por meio de priorização e decisão e monitora o desempenho (EDM). A gestão planeja, constrói, executa e monitora as atividades alinhadas a essa direção.",
    porque: {
      0: "Esse é o ciclo da gestão no COBIT.",
      2: "São etapas de desenvolvimento de software.",
      3: "São passos típicos do gerenciamento de incidentes."
    }
  },
  {
    id: "gov-02", disc: "gov", unidade: 1, tema: "Eficácia x eficiência", tipo: "unica",
    enunciado: "A equipe entregou o novo sistema de matrículas funcionando e no prazo, mas gastou o dobro do orçamento previsto. A entrega foi:",
    opcoes: [
      "Eficiente, mas não eficaz",
      "Eficaz, mas não eficiente",
      "Eficaz e eficiente",
      "Nem eficaz nem eficiente"
    ],
    correta: 1,
    explicacao: "Eficácia é atingir o resultado esperado (o sistema foi entregue). Eficiência é fazer isso usando bem os recursos, o que não ocorreu com o estouro de orçamento.",
    porque: {
      0: "Seria o inverso: gastar pouco, mas não entregar o que foi pedido.",
      2: "O desperdício de recursos impede classificar como eficiente.",
      3: "O objetivo foi alcançado, então houve eficácia."
    }
  },
  {
    id: "gov-03", disc: "gov", unidade: 1, tema: "Caso Enron e SOX", tipo: "vf",
    enunciado: "A lei Sarbanes-Oxley (SOX) foi criada nos Estados Unidos em 2002 como resposta a escândalos contábeis como o da Enron, e aumentou a responsabilidade dos executivos sobre os controles internos e as demonstrações financeiras.",
    correta: true,
    explicacao: "A SOX tornou os controles internos, inclusive os de TI que sustentam os relatórios financeiros, uma obrigação legal para empresas com ações negociadas nos EUA. Por isso ela é sempre citada como marco da governança corporativa e de TI."
  },
  {
    id: "gov-04", disc: "gov", unidade: 2, tema: "Análise SWOT", tipo: "associacao",
    enunciado: "Classifique cada situação no quadrante correto da análise SWOT.",
    pares: [
      ["Equipe de TI com várias certificações", "Força"],
      ["Sistemas legados sem documentação", "Fraqueza"],
      ["Novo edital de fomento à transformação digital", "Oportunidade"],
      ["Concorrente lança plataforma mais barata", "Ameaça"]
    ],
    explicacao: "Forças e fraquezas são fatores internos, que a organização controla. Oportunidades e ameaças vêm do ambiente externo. A pergunta-chave é: isso está dentro ou fora da organização?"
  },
  {
    id: "gov-05", disc: "gov", unidade: 2, tema: "Missão, visão e valores", tipo: "unica",
    enunciado: "\"Ser reconhecida até 2030 como a principal referência em educação tecnológica do Nordeste.\" Essa declaração corresponde a qual elemento do planejamento estratégico?",
    opcoes: ["Missão", "Visão", "Valores", "Objetivo operacional"],
    correta: 1,
    explicacao: "A visão descreve onde a organização quer chegar, um estado futuro desejado, geralmente com horizonte de tempo. A missão diz por que ela existe hoje.",
    porque: {
      0: "A missão descreve a razão de existir no presente (o que faz, para quem).",
      2: "Valores são princípios que orientam o comportamento, como ética e transparência.",
      3: "Objetivos operacionais são metas de curto prazo e bem mais específicas."
    }
  },
  {
    id: "gov-06", disc: "gov", unidade: 2, tema: "Cinco forças de Porter", tipo: "multipla",
    enunciado: "Quais dos itens abaixo fazem parte das cinco forças de Porter? Marque todos os corretos.",
    opcoes: [
      "Ameaça de novos entrantes",
      "Poder de barganha dos fornecedores",
      "Ameaça de produtos substitutos",
      "Maturidade dos processos internos",
      "Missão e valores da organização"
    ],
    corretas: [0, 1, 2],
    explicacao: "As cinco forças são: rivalidade entre concorrentes, ameaça de novos entrantes, ameaça de substitutos, poder de barganha dos fornecedores e poder de barganha dos clientes. Todas olham para o setor, fora da empresa.",
    porque: {
      3: "Maturidade de processos é um fator interno, não uma força competitiva do setor.",
      4: "Missão e valores pertencem à identidade organizacional do planejamento estratégico."
    }
  },
  {
    id: "gov-07", disc: "gov", unidade: 3, tema: "ITIL (utilidade x garantia)", tipo: "unica",
    enunciado: "O novo portal do aluno tem todas as funcionalidades pedidas, mas fica fora do ar em toda época de matrícula. Segundo a ITIL, o serviço falha em:",
    opcoes: ["Utilidade", "Garantia", "Utilidade e garantia", "Nenhuma das duas"],
    correta: 1,
    explicacao: "Utilidade é o que o serviço faz (adequado ao propósito). Garantia é como ele entrega: disponibilidade, capacidade, continuidade e segurança (adequado ao uso). O portal faz o que deve, mas não aguenta a demanda.",
    porque: {
      0: "As funcionalidades atendem ao que foi pedido, então a utilidade está presente.",
      2: "Só a garantia está comprometida.",
      3: "Um serviço indisponível no pico não entrega valor, mesmo sendo completo."
    }
  },
  {
    id: "gov-08", disc: "gov", unidade: 3, tema: "ITIL 4 (quatro dimensões)", tipo: "lacuna",
    enunciado: "Complete as quatro dimensões do gerenciamento de serviços da ITIL 4.",
    texto: "As quatro dimensões são: {{1}} e pessoas; informação e tecnologia; parceiros e {{2}}; fluxos de valor e {{3}}.",
    banco: ["organizações", "fornecedores", "processos", "estratégias", "produtos"],
    corretas: ["organizações", "fornecedores", "processos"],
    explicacao: "A ITIL 4 pede uma visão holística: um serviço não depende só de tecnologia, mas também de pessoas, terceiros e da forma como o trabalho flui."
  },
  {
    id: "gov-09", disc: "gov", unidade: 3, tema: "COBIT (domínios)", tipo: "unica",
    enunciado: "No COBIT 2019, qual é o único domínio que pertence à governança?",
    opcoes: [
      "APO (Alinhar, Planejar e Organizar)",
      "BAI (Construir, Adquirir e Implementar)",
      "EDM (Avaliar, Dirigir e Monitorar)",
      "DSS (Entregar, Serviço e Suporte)"
    ],
    correta: 2,
    explicacao: "O COBIT 2019 tem cinco domínios: EDM é o de governança; APO, BAI, DSS e MEA (Monitorar, Avaliar e Analisar) são os de gestão.",
    porque: {
      0: "APO é domínio de gestão, voltado a estratégia e organização da TI.",
      1: "BAI é domínio de gestão, voltado a soluções e mudanças.",
      3: "DSS é domínio de gestão, voltado à operação e ao suporte."
    }
  },
  {
    id: "gov-10", disc: "gov", unidade: 4, tema: "Implantação da governança", tipo: "unica",
    enunciado: "Qual fator é considerado mais crítico para o sucesso da implantação da governança de TI em uma organização?",
    opcoes: [
      "Comprar a ferramenta de dashboards mais completa do mercado",
      "Patrocínio e envolvimento ativo da alta gestão",
      "Implantar todos os processos do framework de uma só vez",
      "Deixar a iniciativa restrita à equipe técnica de TI"
    ],
    correta: 1,
    explicacao: "Governança mexe com decisão, prioridade e orçamento. Sem o apoio visível da alta gestão, a iniciativa perde autoridade e recursos, e tende a virar burocracia que ninguém segue.",
    porque: {
      0: "Ferramenta apoia, mas não substitui direção e cultura.",
      2: "A recomendação é implantar de forma gradual, priorizando o que gera mais valor.",
      3: "Governança de TI é assunto do negócio; isolá-la na área técnica é um erro comum."
    }
  },

  /* ---------------- Estudos Avançados em GTI ---------------- */
  {
    id: "eag-01", disc: "eag", unidade: 1, tema: "Operadores lógicos (teste de mesa)", tipo: "unica",
    enunciado: "Faça o teste de mesa. O que o trecho abaixo escreve?",
    codigo: "a = 4\nb = 9\nse (a > 5 OU b > 5) E NÃO (a == 4) então\n    escreva \"X\"\nsenão\n    escreva \"Y\"",
    opcoes: ["X", "Y", "X e depois Y", "Nada, ocorre erro"],
    correta: 1,
    explicacao: "(a > 5 OU b > 5) = (falso OU verdadeiro) = verdadeiro. NÃO (a == 4) = NÃO verdadeiro = falso. Verdadeiro E falso = falso, então executa o senão e escreve \"Y\".",
    porque: {
      0: "Seria X se as duas partes do E fossem verdadeiras, mas NÃO (a == 4) é falso.",
      2: "Uma estrutura se/senão executa apenas um dos ramos.",
      3: "A expressão é válida e não gera erro."
    }
  },
  {
    id: "eag-02", disc: "eag", unidade: 1, tema: "Virtualização", tipo: "unica",
    enunciado: "Um hypervisor do tipo 1 (bare metal) se caracteriza por:",
    opcoes: [
      "Rodar como um aplicativo dentro de um sistema operacional hospedeiro",
      "Ser instalado diretamente sobre o hardware, sem sistema operacional hospedeiro",
      "Dispensar o uso de processador com suporte a virtualização",
      "Permitir apenas uma máquina virtual por servidor físico"
    ],
    correta: 1,
    explicacao: "O tipo 1 roda direto no hardware (VMware ESXi, Hyper-V, KVM), com menos sobrecarga, e é o padrão em data centers. O tipo 2 roda sobre um sistema operacional (VirtualBox, VMware Workstation).",
    porque: {
      0: "Essa é a definição do hypervisor tipo 2.",
      2: "O suporte do processador à virtualização melhora o desempenho nos dois tipos.",
      3: "O objetivo é justamente consolidar várias máquinas virtuais no mesmo servidor."
    }
  },
  {
    id: "eag-03", disc: "eag", unidade: 1, tema: "Escalonamento de processos", tipo: "vf",
    enunciado: "No escalonamento Round Robin, cada processo ocupa a CPU até terminar, e só então o próximo da fila é atendido.",
    correta: false,
    explicacao: "Essa descrição é do FCFS (primeiro a chegar, primeiro a ser servido). No Round Robin cada processo recebe uma fatia de tempo (quantum); se não terminar, volta para o fim da fila e a CPU passa ao próximo."
  },
  {
    id: "eag-04", disc: "eag", unidade: 2, tema: "Consultas SQL", tipo: "unica",
    enunciado: "O que a consulta abaixo retorna?",
    codigo: "SELECT cidade, COUNT(*) AS total\nFROM clientes\nGROUP BY cidade\nHAVING COUNT(*) > 10;",
    opcoes: [
      "Os 10 primeiros clientes de cada cidade",
      "As cidades que têm mais de 10 clientes, com a quantidade de cada uma",
      "Todos os clientes cujo código é maior que 10",
      "Um erro, porque HAVING só pode ser usado junto com WHERE"
    ],
    correta: 1,
    explicacao: "GROUP BY agrupa as linhas por cidade, COUNT(*) conta os clientes de cada grupo e HAVING filtra os grupos depois da agregação. WHERE filtra linhas antes do agrupamento e não aceita funções de agregação.",
    porque: {
      0: "Limitar linhas seria com LIMIT ou TOP, e não por grupo dessa forma.",
      2: "Não há filtro por código; a condição é sobre a contagem do grupo.",
      3: "HAVING não depende de WHERE; os dois podem aparecer juntos ou separados."
    }
  },
  {
    id: "eag-05", disc: "eag", unidade: 2, tema: "Cascata x incremental", tipo: "unica",
    enunciado: "Em relação ao momento em que o cliente valida o software, qual afirmação diferencia corretamente o modelo em cascata do desenvolvimento incremental?",
    opcoes: [
      "No cascata, o cliente valida partes funcionais a cada poucas semanas",
      "No incremental, a validação só acontece depois que todo o sistema está pronto",
      "No incremental, o cliente valida entregas parciais ao longo do projeto, enquanto no cascata a validação se concentra no final",
      "Nos dois modelos a validação ocorre exatamente no mesmo momento"
    ],
    correta: 2,
    explicacao: "No cascata as fases são sequenciais e o cliente só vê o produto funcionando perto do fim, quando corrigir é caro. No incremental cada entrega é validada, e o retorno do cliente ajusta as próximas.",
    porque: {
      0: "Essa é uma característica do incremental e dos métodos ágeis.",
      1: "Essa é a característica do cascata.",
      3: "A diferença no momento da validação é justamente o ponto central entre os dois."
    }
  },
  {
    id: "eag-06", disc: "eag", unidade: 2, tema: "Estratégia de testes", tipo: "associacao",
    enunciado: "Associe cada nível ou tipo de teste ao que ele verifica.",
    pares: [
      ["Teste unitário", "Uma função ou classe isolada"],
      ["Teste de integração", "A comunicação entre módulos ou sistemas"],
      ["Teste de carga", "O comportamento com muitos usuários simultâneos"],
      ["Teste de aceitação", "Se o sistema atende ao que o usuário pediu"]
    ],
    explicacao: "Em sistemas integrados e de alta concorrência, testes de integração e de carga ganham peso: a maioria das falhas aparece na conversa entre módulos e sob volume, não em funções isoladas."
  },
  {
    id: "eag-07", disc: "eag", unidade: 3, tema: "Nuvem (SaaS e responsabilidade compartilhada)", tipo: "unica",
    enunciado: "Uma empresa contrata um CRM no modelo SaaS. No modelo de responsabilidade compartilhada, o que continua sendo responsabilidade do cliente?",
    opcoes: [
      "Aplicar correções no sistema operacional dos servidores",
      "Gerenciar os usuários, as permissões de acesso e os dados que insere no sistema",
      "Garantir a segurança física do data center",
      "Manter o código-fonte da aplicação atualizado"
    ],
    correta: 1,
    explicacao: "No SaaS o provedor cuida de infraestrutura, plataforma e aplicação. O cliente segue responsável por quem acessa, com quais permissões, e pelos dados que coloca lá. Grande parte dos vazamentos em nuvem vem de configuração e acesso mal geridos pelo cliente.",
    porque: {
      0: "No SaaS o sistema operacional é responsabilidade do provedor (seria do cliente em IaaS).",
      2: "A segurança física é sempre do provedor.",
      3: "A aplicação é mantida pelo provedor no modelo SaaS."
    }
  },
  {
    id: "eag-08", disc: "eag", unidade: 3, tema: "Modelagem de processos (BPMN)", tipo: "unica",
    enunciado: "Em um diagrama BPMN, um losango com um \"X\" indica um gateway exclusivo. O que ele representa?",
    opcoes: [
      "Todos os caminhos de saída são executados em paralelo",
      "Apenas um dos caminhos de saída é seguido, conforme uma condição",
      "O fim do processo",
      "Uma tarefa realizada por um sistema, sem intervenção humana"
    ],
    correta: 1,
    explicacao: "O gateway exclusivo (XOR) é um ponto de decisão: só um caminho segue adiante. O paralelo (com \"+\") ativa todos os caminhos ao mesmo tempo.",
    porque: {
      0: "Essa é a função do gateway paralelo, marcado com \"+\".",
      2: "O fim do processo é um evento de fim, um círculo de borda grossa.",
      3: "Isso seria uma tarefa de serviço, representada por um retângulo arredondado."
    }
  },
  {
    id: "eag-09", disc: "eag", unidade: 3, tema: "Gerenciamento de projetos (TAP)", tipo: "multipla",
    enunciado: "O que normalmente consta no Termo de Abertura do Projeto (TAP)? Marque todos os corretos.",
    opcoes: [
      "Justificativa e objetivos do projeto",
      "Premissas e restrições de alto nível",
      "Principais marcos",
      "Cronograma detalhado de todas as atividades",
      "Casos de teste do sistema"
    ],
    corretas: [0, 1, 2],
    explicacao: "O TAP autoriza formalmente o projeto e dá uma visão de alto nível: por que existe, o que pretende, premissas, restrições, marcos, riscos gerais e quem é o gerente. O detalhamento vem depois, no plano de gerenciamento.",
    porque: {
      3: "O cronograma detalhado é produzido no planejamento, depois da abertura.",
      4: "Casos de teste são artefatos técnicos da execução, muito posteriores ao TAP."
    }
  },
  {
    id: "eag-10", disc: "eag", unidade: 4, tema: "Controles gerais de TI e auditoria", tipo: "unica",
    enunciado: "Em uma auditoria, qual dos itens abaixo é um exemplo de controle geral de TI (e não de controle de aplicação)?",
    opcoes: [
      "Validação que impede CPF com dígito verificador inválido em um formulário",
      "Processo formal de aprovação e registro de mudanças antes de ir para produção",
      "Regra que bloqueia pedidos acima do limite de crédito do cliente",
      "Cálculo automático do imposto na emissão da nota fiscal"
    ],
    correta: 1,
    explicacao: "Controles gerais de TI valem para o ambiente como um todo: gestão de mudanças, controle de acesso lógico, backup, operação. Controles de aplicação estão dentro de um sistema específico e tratam das transações dele (validações, cálculos, limites).",
    porque: {
      0: "Validação de campo é controle de aplicação (entrada de dados).",
      2: "Regra de negócio dentro do sistema é controle de aplicação.",
      3: "Cálculo automático é controle de aplicação (processamento)."
    }
  },

  /* ---------------- Segurança Cibernética · lote 2 ---------------- */
  {
    id: "gsc-11", disc: "gsc", unidade: 1, tema: "Tríade CID (integridade)", tipo: "unica",
    enunciado: "Um estagiário com acesso indevido ao banco de dados acadêmico alterou a própria nota de 5,0 para 8,0. Ninguém de fora viu os dados e o sistema continuou no ar. Qual pilar da segurança foi violado?",
    opcoes: ["Confidencialidade", "Integridade", "Disponibilidade", "Autenticidade do servidor"],
    correta: 1,
    explicacao: "Integridade é a garantia de que a informação só é alterada por quem tem autorização e de forma correta. A nota foi modificada indevidamente, mesmo sem vazamento e sem parada do sistema.",
    porque: {
      0: "Confidencialidade envolve exposição da informação a quem não deveria vê-la.",
      2: "O sistema permaneceu acessível, então a disponibilidade não foi afetada.",
      3: "Não houve servidor falso nem questão de identidade do servidor no cenário."
    }
  },
  {
    id: "gsc-12", disc: "gsc", unidade: 2, tema: "Política de Segurança da Informação (PSI)", tipo: "unica",
    enunciado: "Para que uma Política de Segurança da Informação tenha força dentro da organização, ela deve ser:",
    opcoes: [
      "Escrita pela equipe técnica e mantida restrita ao setor de TI",
      "Aprovada pela alta direção, comunicada a todos e revisada periodicamente",
      "Publicada uma única vez e nunca alterada, para evitar confusão",
      "Aplicada apenas a quem tem acesso administrativo aos sistemas"
    ],
    correta: 1,
    explicacao: "A PSI expressa o compromisso da organização com a segurança. Sem aprovação da direção ela não tem autoridade; sem comunicação ninguém a cumpre; sem revisão ela fica desatualizada frente a novos riscos.",
    porque: {
      0: "Segurança é assunto de toda a organização; restringir à TI esvazia a política.",
      2: "A política precisa acompanhar mudanças de tecnologia, negócio e legislação.",
      3: "Vale para todos os colaboradores e terceiros, não só administradores."
    }
  },
  {
    id: "gsc-13", disc: "gsc", unidade: 2, tema: "Gestão de riscos (priorização)", tipo: "unica",
    enunciado: "Numa matriz em que risco = probabilidade × impacto (escala de 1 a 5), qual risco deve ser tratado primeiro?",
    opcoes: [
      "Risco A: probabilidade 2, impacto 5",
      "Risco B: probabilidade 4, impacto 4",
      "Risco C: probabilidade 5, impacto 2",
      "Risco D: probabilidade 3, impacto 3"
    ],
    correta: 1,
    explicacao: "Calculando: A = 10, B = 16, C = 10, D = 9. O risco B tem o maior nível e entra primeiro na fila de tratamento. Obs.: no material da disciplina a equação é Risco = Ameaça × Vulnerabilidade, interpretada de forma qualitativa; a matriz probabilidade × impacto é a forma mais usada para priorizar na prática.",
    porque: {
      0: "A tem impacto máximo, mas probabilidade baixa: 2 × 5 = 10.",
      2: "C é muito provável, mas de baixo impacto: 5 × 2 = 10.",
      3: "D resulta em 9, o menor nível entre os quatro."
    }
  },
  {
    id: "gsc-14", disc: "gsc", unidade: 2, tema: "Análise quantitativa e custo-benefício", tipo: "unica",
    enunciado: "Um ativo vale R$ 200.000. Um incidente causaria perda de 25% desse valor e a expectativa é de uma ocorrência a cada dois anos. Um controle que elimina o risco custa R$ 30.000 por ano. Pela análise quantitativa, o controle:",
    opcoes: [
      "Compensa, pois a perda anual esperada é de R$ 50.000",
      "Não se justifica só pelo critério financeiro, pois a perda anual esperada é de R$ 25.000",
      "Compensa, pois a perda anual esperada é de R$ 100.000",
      "Não pode ser avaliado, porque análise quantitativa não usa valores em dinheiro"
    ],
    correta: 1,
    explicacao: "Perda por ocorrência (SLE) = 200.000 × 25% = 50.000. Frequência anual (ARO) = 0,5. Perda anual esperada (ALE) = 50.000 × 0,5 = R$ 25.000. Gastar R$ 30.000 por ano para evitar R$ 25.000 não fecha a conta, a menos que existam outros fatores, como exigência legal ou reputação.",
    porque: {
      0: "R$ 50.000 é a perda por ocorrência, não a anual: falta multiplicar pela frequência de 0,5.",
      2: "Esse valor não corresponde a nenhuma etapa do cálculo.",
      3: "É o contrário: a análise quantitativa trabalha justamente com valores monetários."
    }
  },
  {
    id: "gsc-15", disc: "gsc", unidade: 3, tema: "Engenharia social (princípios psicológicos)", tipo: "unica",
    enunciado: "O setor financeiro recebe um e-mail que parece vir do diretor: \"Estou em reunião e não posso falar. Preciso que façam esta transferência nos próximos 20 minutos.\" Quais gatilhos psicológicos o golpista está explorando?",
    opcoes: ["Reciprocidade e simpatia", "Autoridade e urgência", "Escassez e prova social", "Curiosidade e compromisso"],
    correta: 1,
    explicacao: "O atacante se passa por alguém com poder (autoridade) e impõe prazo curto (urgência) para que a vítima não pare para verificar. A defesa é ter um procedimento de confirmação por outro canal.",
    porque: {
      0: "Não há troca de favores nem tentativa de criar afinidade.",
      2: "Não há oferta limitada nem menção ao que outras pessoas estão fazendo.",
      3: "O e-mail não desperta curiosidade nem cobra coerência com algo já prometido."
    }
  },
  {
    id: "gsc-16", disc: "gsc", unidade: 3, tema: "Metodologia de ataque (fases)", tipo: "lacuna",
    enunciado: "Complete com as fases de um ataque, na ordem em que acontecem.",
    texto: "Na fase de {{1}}, o atacante coleta informações públicas sobre o alvo, como e-mails e domínios. Em seguida, no {{2}}, ele identifica portas abertas e serviços ativos. Só então vem a {{3}}, explorando as vulnerabilidades encontradas.",
    banco: ["reconhecimento", "escaneamento", "obtenção de acesso", "contenção", "erradicação"],
    corretas: ["reconhecimento", "escaneamento", "obtenção de acesso"],
    explicacao: "As cinco etapas de um ataque são: reconhecimento (levantar informações), escaneamento (mapear o que está exposto), obtenção de acesso, manutenção do acesso e eliminação de rastros. Contenção e erradicação são fases da defesa, na resposta a incidentes."
  },
  {
    id: "gsc-17", disc: "gsc", unidade: 4, tema: "Nuvem (responsabilidade compartilhada, IaaS)", tipo: "unica",
    enunciado: "Uma empresa contrata máquinas virtuais em um provedor de nuvem (IaaS). Um atacante invade uma delas explorando uma falha antiga do sistema operacional, que estava sem atualização. De quem era a responsabilidade por aplicar a correção?",
    opcoes: [
      "Do provedor, que responde por tudo o que roda na nuvem",
      "Do cliente, que em IaaS administra o sistema operacional, as aplicações e os dados",
      "De ninguém, pois em nuvem as atualizações são sempre automáticas",
      "Do fabricante do processador do servidor físico"
    ],
    correta: 1,
    explicacao: "Em IaaS o provedor cuida da infraestrutura física, da rede e da virtualização. Do sistema operacional da máquina virtual para cima (patches, firewall do host, aplicações, dados, acessos) a responsabilidade é do cliente.",
    porque: {
      0: "O provedor responde pela segurança \"da\" nuvem, não pelo que o cliente coloca nela.",
      2: "Em IaaS as atualizações do sistema operacional convidado dependem do cliente.",
      3: "O fabricante de hardware não administra o sistema operacional das máquinas virtuais."
    }
  },
  {
    id: "gsc-18", disc: "gsc", unidade: 3, tema: "Funções hash (propriedades)", tipo: "multipla",
    enunciado: "Quais são propriedades de uma boa função hash criptográfica? Marque todas as corretas.",
    opcoes: [
      "Gera saída de tamanho fixo, qualquer que seja o tamanho da entrada",
      "É inviável encontrar duas entradas diferentes com o mesmo hash",
      "É inviável descobrir a entrada a partir do hash",
      "Pode ser revertida por quem possui a chave privada",
      "Entradas parecidas geram hashes parecidos"
    ],
    corretas: [0, 1, 2],
    explicacao: "Hash criptográfico tem saída de tamanho fixo, é de mão única (resistência à pré-imagem) e resiste a colisões. Além disso, tem efeito avalanche: mudar um único bit da entrada muda o hash por completo.",
    porque: {
      3: "Hash não usa chave e não é reversível; quem usa chave privada é a criptografia assimétrica.",
      4: "É o oposto: pelo efeito avalanche, entradas quase iguais geram hashes totalmente diferentes."
    }
  },

  /* ---------------- Segurança Cibernética · Unidades 1 e 2 (questionários, estudo de caso e textos da disciplina) ---------------- */

  /* Questionário da Unidade 1 */
  {
    id: "gsc-19", disc: "gsc", unidade: 1, tema: "Aspectos da segurança (físico)", tipo: "unica",
    enunciado: "Uma startup de tecnologia percebeu que, embora seus servidores fossem robustos, qualquer pessoa podia entrar na sala de máquinas sem identificação. Com base nos aspectos de segurança, qual camada está sendo negligenciada?",
    opcoes: ["Aspecto físico", "Aspecto estratégico", "Aspecto humano", "Aspecto lógico"],
    correta: 0,
    explicacao: "O controle de acesso físico às instalações faz parte da segurança predial, que pertence ao aspecto físico. Servidores robustos não compensam uma sala aberta: quando um aspecto fica subdimensionado, forma-se um ponto de vulnerabilidade.",
    porque: {
      1: "Os aspectos da segurança da informação são três: físico, lógico e humano. \"Estratégico\" não é um deles.",
      2: "O aspecto humano trata de treinamento, políticas de pessoal e cultura de segurança.",
      3: "O aspecto lógico trata de controles por software, como firewall, antivírus e criptografia."
    }
  },
  {
    id: "gsc-20", disc: "gsc", unidade: 1, tema: "Fator humano", tipo: "unica",
    enunciado: "Um gestor de TI precisa decidir entre comprar um firewall de última geração ou treinar a equipe, sabendo que 80% dos riscos vêm de dentro da empresa. Considerando o fator humano, qual deve ser o foco para mitigar a maior fonte de riscos?",
    opcoes: ["Focar na criptografia", "Investir apenas em hardware", "Treinamento e conscientização", "Ignorar ameaças externas"],
    correta: 2,
    explicacao: "O material trata o fator humano como o elo mais vulnerável da cadeia e cita que a maioria dos entrevistados aponta empregados como fonte potencial de danos. A resposta a isso é capacitação contínua, políticas de pessoal e cultura de segurança.",
    porque: {
      0: "Criptografia é ferramenta tecnológica e não resolve o comportamento dos usuários.",
      1: "Só hardware deixa o aspecto humano subdimensionado, justamente a maior fonte de risco no cenário.",
      3: "O texto pede equilíbrio: investir contra ameaças externas sem negligenciar as internas, e não ignorar nenhuma delas."
    }
  },
  {
    id: "gsc-21", disc: "gsc", unidade: 1, tema: "Tríade CID (disponibilidade)", tipo: "unica",
    enunciado: "Uma empresa sofre um ataque de negação de serviço (DoS) e seu site de vendas fica fora do ar por 48 horas durante a Black Friday. Considerando o comprometimento da continuidade do serviço, qual pilar da segurança foi afetado?",
    opcoes: ["Confidencialidade", "Legalidade", "Disponibilidade", "Integridade"],
    correta: 2,
    explicacao: "Disponibilidade é a garantia de que a informação e os serviços estejam acessíveis quando necessários. Um DoS ataca justamente isso, sem precisar vazar nem alterar dados.",
    porque: {
      0: "Confidencialidade trata de acesso apenas por pessoas autorizadas; nada indica vazamento.",
      1: "Legalidade não é um dos pilares da tríade CID.",
      3: "Integridade trata de alterações não autorizadas; os dados não foram modificados."
    }
  },
  {
    id: "gsc-22", disc: "gsc", unidade: 1, tema: "Tríade CID (confidencialidade)", tipo: "unica",
    enunciado: "Um colaborador de uma empresa de RH enviou por engano a folha de pagamento de toda a diretoria para um grupo público de mensagens. Qual pilar da tríade CID foi diretamente violado neste caso?",
    opcoes: ["Disponibilidade", "Conformidade", "Integridade", "Confidencialidade"],
    correta: 3,
    explicacao: "Confidencialidade garante que a informação fique acessível apenas a quem está autorizado. Divulgar dados sensíveis a quem não deveria vê-los, mesmo por engano, viola esse pilar.",
    porque: {
      0: "Os dados continuaram acessíveis a quem precisava deles.",
      1: "Conformidade não é pilar da tríade; pode ser consequência (LGPD), mas o pilar violado é outro.",
      2: "Nenhum dado foi alterado, apenas exposto."
    }
  },
  {
    id: "gsc-23", disc: "gsc", unidade: 1, tema: "Tríade CID (integridade)", tipo: "unica",
    enunciado: "Durante uma atualização de sistema, um banco de dados foi corrompido, o que resultou na alteração dos saldos das contas de clientes, mesmo sem a ocorrência de um ataque externo. O incidente descrito afetou qual princípio fundamental da segurança?",
    opcoes: ["Conformidade", "Continuidade", "Integridade", "Disponibilidade"],
    correta: 2,
    explicacao: "Integridade assegura que a informação esteja completa e livre de alterações não autorizadas. O material inclui expressamente a corrupção de dados e as alterações acidentais, e não só as maliciosas.",
    porque: {
      0: "Conformidade não é um dos três pilares.",
      1: "Continuidade é objetivo de planos de continuidade, não pilar da tríade.",
      3: "O sistema não ficou inacessível; o problema foi o conteúdo estar errado."
    }
  },
  {
    id: "gsc-24", disc: "gsc", unidade: 1, tema: "Planos de continuidade", tipo: "unica",
    enunciado: "A gestão de incidentes é uma parte vital da estratégia de segurança, pois assume que falhas podem ocorrer apesar das proteções. Em um plano de continuidade de negócio, o objetivo principal é:",
    opcoes: ["Comprar novos servidores físicos", "Instalar novos softwares antivírus", "Manter as operações durante crises", "Punir os responsáveis pelo erro"],
    correta: 2,
    explicacao: "Planos de continuidade são estratégias para manter as operações durante crises. Eles fazem parte das ferramentas de gestão e dos mecanismos que garantem disponibilidade.",
    porque: {
      0: "Comprar equipamento pode ser uma ação de recuperação, mas não é o objetivo do plano.",
      1: "Antivírus é ferramenta tecnológica de prevenção.",
      3: "Punição não é função do plano de continuidade; o foco é a operação."
    }
  },
  {
    id: "gsc-25", disc: "gsc", unidade: 1, tema: "Análise custo-benefício", tipo: "unica",
    enunciado: "A implementação de controles de segurança não deve ser vista como um custo isolado, mas como um investimento estratégico. Sobre a análise custo-benefício na proteção da informação, é correto afirmar que:",
    opcoes: [
      "O investimento em segurança deve ser proporcional ao valor dos ativos e à redução de riscos",
      "A segurança deve ser implementada independentemente dos custos envolvidos",
      "O custo do controle deve ser sempre superior ao valor do ativo",
      "Controles tecnológicos dispensam a análise de viabilidade financeira"
    ],
    correta: 0,
    explicacao: "Os controles devem \"se pagar\" por meio da redução de riscos: o gasto precisa ser coerente com o valor do que se protege e com o risco que se reduz.",
    porque: {
      1: "Ignorar custos leva a gastar mais do que o ativo vale.",
      2: "Um controle mais caro que o ativo não se justifica financeiramente.",
      3: "Todo controle, inclusive tecnológico, passa por análise de custo-benefício."
    }
  },
  {
    id: "gsc-26", disc: "gsc", unidade: 1, tema: "Cultura organizacional", tipo: "unica",
    enunciado: "A proteção da informação em grandes corporações enfrenta obstáculos que vão além da tecnologia. Qual fator dificulta a implementação de políticas de segurança globais em organizações multinacionais?",
    opcoes: ["A diversidade de culturas locais", "A ausência de internet nas filiais", "A falta de hardware no mercado", "O uso excessivo de criptografia"],
    correta: 0,
    explicacao: "O material explica que organizações maiores enfrentam desafios por causa da diversidade de culturas organizacionais, da complexidade das estruturas hierárquicas e da necessidade de adaptar localmente as políticas globais.",
    porque: {
      1: "O obstáculo descrito é cultural, e não de infraestrutura básica.",
      2: "Hardware não é o fator citado.",
      3: "Criptografia não dificulta a adoção de políticas; é um controle."
    }
  },
  {
    id: "gsc-27", disc: "gsc", unidade: 1, tema: "Dimensões da segurança da informação", tipo: "unica",
    enunciado: "A segurança da informação é descrita como um continuum que vai de políticas de alto nível até configurações técnicas detalhadas. Sobre a dimensão técnica da segurança da informação, assinale a alternativa correta.",
    opcoes: [
      "Refere-se apenas à proteção física de prédios e no-breaks",
      "Trata exclusivamente da legislação e de marcos regulatórios como a LGPD",
      "Foca apenas no treinamento de usuários e na mudança de cultura",
      "Envolve a configuração de controles tecnológicos e permissões de acesso"
    ],
    correta: 3,
    explicacao: "A dimensão técnica é a implementação de controles tecnológicos e configurações de segurança, como firewalls e permissões em arquivos. As outras dimensões são a processual, a humana e a legal.",
    porque: {
      0: "Proteção física de prédios e no-breaks é o aspecto físico.",
      1: "Legislação e marcos normativos formam a dimensão legal.",
      2: "Treinamento e cultura formam a dimensão humana."
    }
  },
  {
    id: "gsc-28", disc: "gsc", unidade: 1, tema: "Política de segurança (Fraser, 1997)", tipo: "unica",
    enunciado: "De acordo com Fraser (1997), a política de segurança é uma declaração formal de regras para o acesso a bens de tecnologia e informação. Um elemento essencial que deve constar em uma Política de Segurança da Informação eficaz é:",
    opcoes: ["O código-fonte dos sistemas", "A lista de salários da TI", "A classificação das informações", "O histórico de navegação dos diretores"],
    correta: 2,
    explicacao: "Uma política eficaz inclui declaração de propósito, classificação de informações, controles de acesso, procedimentos de incidentes e responsabilidades. A classificação define os critérios para categorizar os dados.",
    porque: {
      0: "Código-fonte é um ativo a ser protegido, não conteúdo da política.",
      1: "Dados de pessoal não compõem a política.",
      3: "Histórico de navegação de pessoas específicas não é elemento de política."
    }
  },
  {
    id: "gsc-29", disc: "gsc", unidade: 1, tema: "Não conformidade e melhoria contínua", tipo: "unica",
    enunciado: "Estudos indicam que a grande maioria das organizações tem itens em desconformidade com suas próprias políticas de segurança. Diante dessa realidade, qual abordagem é necessária para manter a eficácia dos controles?",
    opcoes: ["Focar apenas em ameaças externas", "Eliminar as políticas de segurança", "Substituir todos os funcionários", "Melhoria contínua e monitoramento"],
    correta: 3,
    explicacao: "A desconformidade mostra a necessidade de monitoramento e controle contínuos. O material destaca que as políticas devem ser revisadas e atualizadas sempre e que a melhoria contínua é essencial para manter os controles eficazes.",
    porque: {
      0: "Ignora a fonte interna de desconformidade.",
      1: "Sem política não há regra a cumprir nem base para controle.",
      2: "Trocar pessoas não resolve falhas de processo, cultura e monitoramento."
    }
  },
  {
    id: "gsc-30", disc: "gsc", unidade: 1, tema: "Ameaças externas (hackers e crackers)", tipo: "unica",
    enunciado: "Hackers e crackers representam uma ameaça externa persistente, embora as estatísticas mostrem que o volume de ataques internos seja superior. Com base na gestão de riscos e ameaças externas, é correto afirmar que:",
    opcoes: [
      "Exigem o fim do uso de redes de computadores",
      "Devem ser ignoradas por representarem poucos ataques",
      "São irrelevantes frente ao fator humano organizacional",
      "Possuem alto potencial destrutivo e exigem investimento equilibrado"
    ],
    correta: 3,
    explicacao: "Mesmo sendo uma parcela pequena dos ataques, a ameaça externa não deve ser subestimada por causa do seu potencial destrutivo. O texto pede equilíbrio na alocação de recursos: proteger-se das ameaças externas sem negligenciar as vulnerabilidades internas.",
    porque: {
      0: "Deixar de usar redes seria inviável; o caminho é gerir o risco.",
      1: "Poucos ataques não significa baixo dano.",
      2: "As duas fontes importam; nenhuma é irrelevante."
    }
  },
  {
    id: "gsc-31", disc: "gsc", unidade: 1, tema: "Legislação (LGPD)", tipo: "unica",
    enunciado: "O ordenamento jurídico brasileiro evoluiu para punir o uso inadequado de recursos tecnológicos e proteger a privacidade dos dados. Qual legislação regula especificamente o tratamento de dados pessoais no Brasil?",
    opcoes: ["O Código de Defesa do Consumidor", "O Decreto de Segurança Nacional", "A Lei Geral de Proteção de Dados (LGPD)", "O Marco Civil da Internet"],
    correta: 2,
    explicacao: "A LGPD (Lei nº 13.709/2018) é a lei que regula o tratamento de dados pessoais. O Marco Civil da Internet (Lei nº 12.965/2014) trata de direitos e deveres no uso da internet, e o Decreto nº 9.637/2018 institui a Política Nacional de Segurança da Informação.",
    porque: {
      0: "O CDC protege a relação de consumo, e não regula especificamente o tratamento de dados pessoais.",
      1: "Não é o instrumento que trata de dados pessoais.",
      3: "O Marco Civil regula o uso da internet em geral; a lei específica de dados pessoais é a LGPD."
    }
  },

  /* Questionário da Unidade 2 */
  {
    id: "gsc-32", disc: "gsc", unidade: 2, tema: "Benefício estratégico da PSI", tipo: "unica",
    enunciado: "O diretor de TI de uma empresa precisa apresentar à diretoria um argumento para a criação de uma Política de Segurança da Informação formal. Qual é o principal benefício estratégico da PSI que deve ser destacado?",
    opcoes: [
      "Estabelece diretrizes claras e responsabilidades, alinhando a segurança aos objetivos do negócio",
      "Permite a eliminação completa de todos os riscos de segurança",
      "Substitui a necessidade de investimentos em tecnologia de segurança",
      "Garante conformidade automática com todas as legislações vigentes"
    ],
    correta: 0,
    explicacao: "A PSI é um instrumento estratégico que formaliza o comprometimento da organização com a segurança, definindo diretrizes e responsabilidades alinhadas ao negócio.",
    porque: {
      1: "Nenhum documento elimina todos os riscos; a PSI ajuda a geri-los.",
      2: "A política orienta os controles e não substitui investimento em tecnologia.",
      3: "Conformidade exige ação e verificação; não é automática."
    }
  },
  {
    id: "gsc-33", disc: "gsc", unidade: 2, tema: "Desafios da PSI (segurança x usabilidade)", tipo: "unica",
    enunciado: "Uma organização implementou uma política que exige autenticação multifator para todos os sistemas, mas os colaboradores estão compartilhando tokens de autenticação por conveniência. Esse cenário ilustra qual desafio na implementação da PSI?",
    opcoes: [
      "Falta de recursos tecnológicos adequados",
      "Ausência de regulamentação legal aplicável",
      "Desequilíbrio entre segurança e usabilidade, gerando contorno dos controles pelos usuários",
      "Falha na segregação de funções do departamento de TI"
    ],
    correta: 2,
    explicacao: "Políticas excessivamente restritivas, sem considerar a usabilidade, levam os usuários a buscar atalhos que comprometem a segurança. A tecnologia existe; o problema é a forma como ela é usada.",
    porque: {
      0: "A empresa tem a tecnologia (autenticação multifator).",
      1: "O problema descrito não é legal.",
      3: "Segregação de funções na TI não aparece no cenário."
    }
  },
  {
    id: "gsc-34", disc: "gsc", unidade: 2, tema: "Gestão de riscos (priorização com orçamento limitado)", tipo: "unica",
    enunciado: "Uma empresa de comércio eletrônico identificou que seus servidores web estão expostos a ataques de força bruta, mas não tem recursos financeiros para implementar todas as correções ao mesmo tempo. Considerando a gestão de riscos, qual abordagem deve ser priorizada?",
    opcoes: [
      "Ignorar o risco até que um incidente ocorra, para justificar o investimento",
      "Transferir toda a responsabilidade para o provedor de hospedagem",
      "Desativar os servidores até que o orçamento seja aprovado",
      "Aplicar controles proporcionais ao risco, priorizando os ativos mais críticos"
    ],
    correta: 3,
    explicacao: "A gestão de riscos recomenda priorizar controles com base no nível de risco e no valor dos ativos, otimizando os recursos disponíveis.",
    porque: {
      0: "Esperar o incidente é aceitar o risco sem avaliação e pode custar muito mais.",
      1: "A responsabilidade pela segurança dos próprios ativos não se transfere por completo.",
      2: "Parar o e-commerce gera prejuízo certo para evitar um risco apenas provável."
    }
  },
  {
    id: "gsc-35", disc: "gsc", unidade: 2, tema: "Gestão de incidentes (após a recuperação)", tipo: "unica",
    enunciado: "Após um ataque de ransomware que paralisou as operações por 72 horas, a equipe de resposta conseguiu restaurar os sistemas a partir de backups. Qual fase do framework de gestão de incidentes deve ser conduzida imediatamente após a recuperação?",
    opcoes: ["Lições aprendidas", "Planejamento e preparação", "Contenção do incidente", "Detecção e reporte"],
    correta: 0,
    explicacao: "Depois da resolução, a organização conduz a análise de lições aprendidas para identificar falhas nos controles e oportunidades de melhoria.",
    porque: {
      1: "Preparação vem antes do incidente (embora seja realimentada pelas lições aprendidas).",
      2: "A contenção já ocorreu: os sistemas foram restaurados.",
      3: "A detecção acontece no começo do ciclo."
    }
  },
  {
    id: "gsc-36", disc: "gsc", unidade: 2, tema: "Evento x incidente (SIEM)", tipo: "unica",
    enunciado: "Uma instituição financeira detectou, pelo seu SIEM, múltiplas tentativas de acesso a contas de clientes originadas de endereços IP de países onde a empresa não opera. Considerando o framework de gestão de incidentes, essa situação deve ser classificada inicialmente como:",
    opcoes: [
      "Um evento de segurança que deve ser avaliado para determinar se constitui um incidente",
      "Um incidente de segurança confirmado de severidade crítica",
      "Uma situação sem indícios de falso positivo: o incidente deve ser investigado",
      "Uma falha de sistema que requer manutenção preventiva"
    ],
    correta: 0,
    explicacao: "Tentativas de acesso suspeitas são eventos de segurança, que precisam ser avaliados antes de serem classificados como incidentes, conforme a distinção da ISO/IEC 27000.",
    porque: {
      1: "Ainda não há confirmação de comprometimento nem de severidade.",
      2: "Afirmar que não há falso positivo antes da análise é precipitado.",
      3: "O padrão aponta para atividade suspeita, e não para defeito de equipamento."
    }
  },

  /* Estudo de caso 01: ataque à MGM Resorts (2023) */
  {
    id: "gsc-37", disc: "gsc", unidade: 1, tema: "Caso MGM: tríade CID", tipo: "associacao",
    enunciado: "No ataque à MGM Resorts, os pilares da tríade CID foram atingidos de formas diferentes. Associe cada pilar ao fato do caso que o ilustra.",
    pares: [
      ["Confidencialidade", "Dados pessoais de clientes (nome, CPF, passaporte) foram acessados"],
      ["Integridade", "Credenciais e MFA foram alterados e um ransomware foi implantado nos sistemas"],
      ["Disponibilidade", "Check-in manual, chaves de quartos e sistemas de pagamento fora do ar"]
    ],
    explicacao: "O impacto mais visível para os hóspedes foi de disponibilidade: chaves, caça-níqueis, reservas e pagamentos inoperantes. A confidencialidade foi atingida pelo acesso aos dados pessoais. Quanto à integridade, o caso não cita adulteração de registros, mas houve alteração não autorizada dos sistemas (reset de senha e MFA e instalação do ransomware)."
  },
  {
    id: "gsc-38", disc: "gsc", unidade: 1, tema: "Caso MGM: aspectos da segurança (origem)", tipo: "unica",
    enunciado: "No caso MGM, os atacantes usaram o LinkedIn para obter dados de um funcionário de TI e ligaram para o Help Desk fingindo ser ele. Sob a ótica dos três aspectos da segurança, qual foi o ponto de origem da invasão?",
    opcoes: ["Aspecto humano", "Aspecto físico", "Aspecto lógico", "Nenhum: foi uma falha de hardware"],
    correta: 0,
    explicacao: "A invasão começou pela manipulação de uma pessoa (engenharia social): o atendente foi convencido a resetar a senha e a fornecer um novo código MFA. Os controles tecnológicos funcionaram como projetados; o elo vulnerável foi o humano.",
    porque: {
      1: "Ninguém precisou entrar fisicamente em uma instalação.",
      2: "Os controles lógicos (senha e MFA) foram contornados por meio de uma pessoa, e não quebrados.",
      3: "Não houve falha de equipamento na origem."
    }
  },
  {
    id: "gsc-39", disc: "gsc", unidade: 1, tema: "Caso MGM: efeito sobre as chaves eletrônicas", tipo: "unica",
    enunciado: "Durante o ataque à MGM, as chaves eletrônicas dos quartos e os elevadores pararam de responder aos cartões. Qual leitura dessa situação é a mais completa?",
    opcoes: [
      "A causa foi lógica (o ransomware), mas o impacto atingiu a infraestrutura física, o que mostra que os aspectos são interdependentes",
      "Foi uma falha puramente física, sem relação com software",
      "Foi falha humana dos hóspedes ao usar os cartões",
      "Foi um problema de conformidade legal"
    ],
    correta: 0,
    explicacao: "O caso lista elevadores e chaves entre os impactos sobre a infraestrutura física, mas quem parou esses equipamentos foi um ataque lógico, iniciado por uma falha humana. Por isso os três aspectos precisam estar em equilíbrio. Se a professora cobrar uma única categoria, o material do caso usa o rótulo \"Infraestrutura Física\" para esse efeito.",
    porque: {
      1: "Os equipamentos pararam porque os sistemas que os controlam foram paralisados.",
      2: "Os hóspedes usaram os cartões normalmente; o problema estava nos sistemas.",
      3: "Conformidade não explica a parada dos equipamentos."
    }
  },
  {
    id: "gsc-40", disc: "gsc", unidade: 1, tema: "Caso MGM: etapas do ataque", tipo: "associacao",
    enunciado: "Mapeie as ações dos atacantes da MGM nas etapas de um ataque.",
    pares: [
      ["Usaram o LinkedIn para obter nome e dados de um funcionário de TI", "Reconhecimento"],
      ["Convenceram o Help Desk a resetar a senha e a fornecer um novo código MFA", "Obtenção de acesso"],
      ["Escalaram privilégios dentro da rede depois de entrar", "Manutenção do acesso"]
    ],
    extras: ["Escaneamento", "Eliminação de rastros"],
    explicacao: "Coletar informações públicas sobre o alvo é reconhecimento. Entrar na rede com credenciais obtidas por engenharia social (que a aula inclui entre as técnicas de obtenção de acesso) é obtenção de acesso. Escalar privilégios é técnica de manutenção do acesso. O caso não descreve varredura de portas nem apagamento de logs, por isso essas etapas não aparecem aqui."
  },
  {
    id: "gsc-41", disc: "gsc", unidade: 1, tema: "Caso MGM: engenharia social", tipo: "unica",
    enunciado: "Golpes como o da MGM, em que o atacante liga ao Help Desk fingindo ser um colega que perdeu o acesso, exploram principalmente qual característica humana?",
    opcoes: [
      "A disposição natural de ajudar e a confiança em quem se apresenta como colega",
      "A ganância por uma recompensa financeira",
      "A curiosidade de abrir um arquivo desconhecido",
      "A falta de conhecimento técnico sobre criptografia"
    ],
    correta: 0,
    explicacao: "O trabalho do Help Desk é ajudar, e o atacante usa isso a seu favor com uma história plausível (perdi meu acesso) e dados reais obtidos no LinkedIn. A defesa é um procedimento que não dependa da boa-fé de quem atende.",
    porque: {
      1: "Não há oferta de ganho: o gatilho foi o pedido de ajuda.",
      2: "Não houve arquivo ou link a ser aberto.",
      3: "O atendente não foi enganado por detalhe técnico, e sim por uma história convincente."
    }
  },
  {
    id: "gsc-42", disc: "gsc", unidade: 1, tema: "Caso MGM: defesa contra engenharia social", tipo: "unica",
    enunciado: "Qual procedimento específico teria evitado que o suporte técnico da MGM entregasse o acesso aos atacantes?",
    opcoes: [
      "Verificar a identidade por um canal independente (por exemplo, ligar de volta ao número cadastrado ou confirmar com o gestor) antes de resetar senha e MFA",
      "Bloquear o acesso ao LinkedIn para todos os funcionários",
      "Pagar o resgate assim que o ransomware fosse detectado",
      "Reiniciar os servidores toda semana"
    ],
    correta: 0,
    explicacao: "O reset de senha e de MFA é uma operação crítica e não pode depender só do que a pessoa diz ao telefone. Uma verificação por canal independente quebra o golpe, porque o atacante não controla o telefone cadastrado nem o gestor.",
    porque: {
      1: "Os dados de um funcionário continuariam disponíveis por outros meios, e a falha estava no procedimento do Help Desk.",
      2: "O pagamento acontece depois do dano e não impede o acesso inicial.",
      3: "Reiniciar servidores não tem relação com a fraude de identidade."
    }
  },
  {
    id: "gsc-43", disc: "gsc", unidade: 1, tema: "Caso MGM: regras para a política de segurança (RFC 2196)", tipo: "multipla",
    enunciado: "A RFC 2196 (Fraser) define política de segurança como uma declaração formal de regras de acesso. Se você fosse gestor de TI da MGM, quais regras acrescentaria à política para que o Help Desk não fosse enganado novamente? Marque todas as corretas.",
    opcoes: [
      "Reset de senha ou MFA só após verificação de identidade em mais de um fator, por canal independente",
      "Pedidos de reset de contas privilegiadas exigem aprovação do gestor e ficam registrados",
      "Treinamento periódico do Help Desk em engenharia social",
      "Priorizar a rapidez do atendimento, dispensando a verificação quando o solicitante parecer urgente",
      "Aceitar o novo código MFA por telefone se o solicitante souber o nome do seu gestor"
    ],
    corretas: [0, 1, 2],
    explicacao: "A política deve estabelecer verificação rigorosa, aprovação e registro para operações críticas, além de capacitação (aspecto humano). Informações como nome do gestor são fáceis de achar em redes sociais, então não servem de prova de identidade.",
    porque: {
      3: "Urgência é justamente o gatilho que o atacante cria para pular a verificação.",
      4: "O nome do gestor é público e não prova identidade."
    }
  },

  /* Unidade 1 · Texto 1: Conceitos básicos de segurança da informação */
  {
    id: "gsc-44", disc: "gsc", unidade: 1, tema: "Dimensões da segurança da informação", tipo: "associacao",
    enunciado: "Associe cada dimensão do escopo da segurança da informação ao que ela abrange.",
    pares: [
      ["Dimensão técnica", "Controles tecnológicos e configurações de segurança"],
      ["Dimensão processual", "Procedimentos e fluxos de trabalho seguros"],
      ["Dimensão humana", "Capacitação e conscientização dos usuários"],
      ["Dimensão legal", "Conformidade com regulamentações e marcos normativos"]
    ],
    explicacao: "A abordagem multidimensional é o que permite um programa de segurança eficaz e sustentável: nenhuma dimensão dá conta sozinha."
  },
  {
    id: "gsc-45", disc: "gsc", unidade: 1, tema: "Mecanismos por pilar (CID)", tipo: "associacao",
    enunciado: "Associe cada pilar da tríade CID a mecanismos que o sustentam.",
    pares: [
      ["Confidencialidade", "Criptografia e controle de acesso baseado em papéis (RBAC)"],
      ["Integridade", "Funções hash e assinaturas digitais"],
      ["Disponibilidade", "Redundância, backup e planos de continuidade"]
    ],
    explicacao: "Hash e assinatura digital detectam alterações (integridade). Criptografia, autenticação e RBAC restringem quem acessa (confidencialidade). Redundância, backup e continuidade mantêm o serviço no ar (disponibilidade)."
  },
  {
    id: "gsc-46", disc: "gsc", unidade: 1, tema: "Aspectos lógicos", tipo: "multipla",
    enunciado: "Quais dos itens abaixo são controles do aspecto lógico da segurança? Marque todos os corretos.",
    opcoes: [
      "Firewall",
      "Antivírus",
      "Sistema de detecção de intrusão (IDS)",
      "No-break (UPS)",
      "Programa de conscientização dos usuários"
    ],
    corretas: [0, 1, 2],
    explicacao: "Os aspectos lógicos são os controles por software e configuração: firewall, antivírus, IDS e ferramentas de criptografia.",
    porque: {
      3: "Proteção elétrica é aspecto físico.",
      4: "Conscientização é aspecto humano."
    }
  },

  /* Unidade 1 · Texto 2: Elementos de proteção e riscos às redes */
  {
    id: "gsc-47", disc: "gsc", unidade: 1, tema: "Elementos essenciais da proteção da informação", tipo: "associacao",
    enunciado: "Associe cada elemento essencial da proteção da informação à sua descrição.",
    pares: [
      ["Lealdade organizacional", "Decisões de segurança priorizam os interesses legítimos da organização"],
      ["Preservação de recursos", "Medidas mantêm a integridade dos recursos e reduzem risco de perda ou dano"],
      ["Análise custo-benefício", "Controles precisam se pagar por meio da redução de riscos"],
      ["Clareza de responsabilidades", "Funções de todos os envolvidos são definidas e comunicadas"]
    ],
    explicacao: "A proteção deve servir de facilitadora dos processos de negócio, e não de obstáculo."
  },
  {
    id: "gsc-48", disc: "gsc", unidade: 1, tema: "Ciclo de vida da informação", tipo: "associacao",
    enunciado: "Associe cada estágio do ciclo de vida da informação ao cuidado de segurança correspondente.",
    pares: [
      ["Criação", "Classificação e rotulagem inicial"],
      ["Armazenamento", "Proteção durante a retenção"],
      ["Transmissão", "Segurança durante a transferência"],
      ["Destruição", "Eliminação segura ao final do ciclo de vida"]
    ],
    explicacao: "Um programa abrangente cobre todo o ciclo: criação, processamento, armazenamento, transmissão e destruição."
  },
  {
    id: "gsc-49", disc: "gsc", unidade: 1, tema: "Marcos legais brasileiros", tipo: "associacao",
    enunciado: "Associe cada marco legal brasileiro citado no material ao seu número.",
    pares: [
      ["LGPD", "Lei nº 13.709/2018"],
      ["Marco Civil da Internet", "Lei nº 12.965/2014"],
      ["Política Nacional de Segurança da Informação", "Decreto nº 9.637/2018"]
    ],
    explicacao: "O gestor de segurança precisa conhecer a legislação vigente e as responsabilidades e punições ligadas ao uso e ao tratamento da informação."
  },
  {
    id: "gsc-50", disc: "gsc", unidade: 1, tema: "Ameaças internas e externas (números do material)", tipo: "lacuna",
    enunciado: "Complete com os números citados no material.",
    texto: "Estudos indicam que {{1}} dos ambientes organizacionais têm pelo menos um item em desconformidade com suas políticas, enquanto hackers e crackers respondem por cerca de {{2}} dos ataques a redes.",
    banco: ["90 a 95%", "5%", "50%", "80%", "20%"],
    corretas: ["90 a 95%", "5%"],
    explicacao: "O material usa esses números para mostrar que a desconformidade interna é muito comum e que a ameaça externa, embora menos frequente, tem alto potencial destrutivo. O 80% é outro dado: a proporção de entrevistados que apontam empregados como fonte potencial de danos."
  },
  {
    id: "gsc-51", disc: "gsc", unidade: 1, tema: "Ferramentas de proteção por aspecto", tipo: "associacao",
    enunciado: "Associe cada grupo de ferramentas ao aspecto da segurança em que o material o classifica.",
    pares: [
      ["Firewall e antivírus", "Tecnológico"],
      ["Controle de acesso físico e climatização", "Físico"],
      ["Acordos de confidencialidade e planos de continuidade", "Humano"]
    ],
    explicacao: "No material, o aspecto humano reúne ferramentas de gestão: análise de risco, forense computacional, acordos de confidencialidade, políticas de segurança e planos de continuidade."
  },

  /* Unidade 2 · Texto 1: Fundamentos da análise de riscos */
  {
    id: "gsc-52", disc: "gsc", unidade: 2, tema: "Equação do risco", tipo: "unica",
    enunciado: "No material da disciplina, o risco é tradicionalmente calculado pela equação fundamental:",
    opcoes: [
      "Risco = Ameaça × Vulnerabilidade",
      "Risco = Ativo + Controle",
      "Risco = Custo ÷ Benefício",
      "Risco = Impacto − Probabilidade"
    ],
    correta: 0,
    explicacao: "O texto pede que a equação seja interpretada em termos qualitativos e relativos, e não como um problema puramente matemático. Em outras fontes o risco aparece como probabilidade × impacto; para a disciplina, a referência é ameaça × vulnerabilidade.",
    porque: {
      1: "Somar ativo e controle não representa risco.",
      2: "Custo ÷ benefício é critério de decisão sobre controles, não a equação do risco.",
      3: "A subtração de impacto e probabilidade não é usada."
    }
  },
  {
    id: "gsc-53", disc: "gsc", unidade: 2, tema: "Conceitos da ITIL (ROI, TCO, MTBF, MTTR)", tipo: "associacao",
    enunciado: "Associe cada sigla usada na análise de riscos ao seu significado.",
    pares: [
      ["ROI", "Retorno financeiro dos investimentos em segurança"],
      ["TCO", "Custo total de propriedade dos ativos tecnológicos"],
      ["MTBF", "Tempo médio entre falhas dos sistemas"],
      ["MTTR", "Tempo médio de recuperação ou reparo"]
    ],
    explicacao: "MTBF e MTTR se complementam: quanto maior o tempo entre falhas e menor o tempo de reparo, maior a disponibilidade do sistema."
  },
  {
    id: "gsc-54", disc: "gsc", unidade: 2, tema: "Categorias de ameaças", tipo: "associacao",
    enunciado: "Associe cada exemplo à categoria de ameaça em que o material o classifica.",
    pares: [
      ["Enchente e vendaval", "Fenômenos climáticos"],
      ["Pico de energia ou incêndio", "Incidentes com infraestrutura"],
      ["Falha de software ou de conectividade de rede", "Componentes lógicos"],
      ["Erro de configuração em um servidor", "Erros operacionais"]
    ],
    explicacao: "As ameaças se dividem em desastres naturais e não naturais, falhas de sistemas e falhas humanas. Estas incluem erros operacionais, falhas procedimentais (como backup) e ações intencionais (insider threats)."
  },
  {
    id: "gsc-55", disc: "gsc", unidade: 2, tema: "Ameaças (ação intencional interna)", tipo: "unica",
    enunciado: "Um funcionário descontente apaga de propósito os dados de um servidor antes de ser desligado. Em qual categoria de ameaça isso se enquadra?",
    opcoes: ["Ações intencionais (insider threat)", "Fenômenos climáticos", "Falhas de componentes físicos", "Erros operacionais"],
    correta: 0,
    explicacao: "É uma ação maliciosa intencional de alguém de dentro da organização, categoria que o material chama de insider threat e que faz parte das falhas humanas.",
    porque: {
      1: "Não envolve fenômeno da natureza.",
      2: "Não há defeito de equipamento.",
      3: "Erro operacional é involuntário, como um comando errado; aqui houve intenção."
    }
  },
  {
    id: "gsc-56", disc: "gsc", unidade: 2, tema: "Valoração de ativos", tipo: "unica",
    enunciado: "Ao definir o valor de um recurso da organização na análise de riscos, o material orienta considerar, além dos aspectos financeiros diretos:",
    opcoes: [
      "O impacto potencial na reputação, na continuidade operacional e na vantagem competitiva",
      "Somente o preço de compra do equipamento",
      "Apenas a opinião do fornecedor",
      "O tempo de uso do recurso, sem relação com o negócio"
    ],
    correta: 0,
    explicacao: "Valorar um ativo é entender o que a organização perde sem ele. As perguntas-guia do texto são: quais recursos são primordiais, como definir o valor de cada um e quem tem autoridade para defini-lo.",
    porque: {
      1: "O preço de compra ignora o impacto no negócio.",
      2: "O fornecedor não define o valor do ativo para a organização.",
      3: "O valor deve estar ligado ao negócio, e não à idade do recurso."
    }
  },
  {
    id: "gsc-57", disc: "gsc", unidade: 2, tema: "Metodologia de análise de riscos (cinco etapas)", tipo: "associacao",
    enunciado: "A análise de riscos segue cinco etapas. Associe cada atividade à etapa em que ela acontece.",
    pares: [
      ["Perguntar à diretoria qual é a principal fonte de receita e a tolerância a riscos", "Entrevista com executivos seniores"],
      ["Verificar idade e modelos dos servidores e a qualidade do cabeamento", "Levantamento da infraestrutura"],
      ["Revisar contratos com fornecedores e licenças de software", "Análise documental"],
      ["Conferir a configuração do firewall e as rotinas de backup", "Análise dos sistemas"]
    ],
    extras: ["Entrevista com funcionários"],
    explicacao: "As cinco etapas são: entrevista com executivos seniores, levantamento da infraestrutura, entrevista com funcionários (problemas do dia a dia e percepção sobre os controles), análise documental e análise dos sistemas."
  },
  {
    id: "gsc-58", disc: "gsc", unidade: 2, tema: "Análise quantitativa x qualitativa", tipo: "unica",
    enunciado: "Qual afirmação diferencia corretamente a análise de riscos quantitativa da qualitativa?",
    opcoes: [
      "A quantitativa calcula os riscos de forma numérica (probabilidade e impacto) e gera tabelas de valores para priorizar investimentos; a qualitativa se apoia no conhecimento e na experiência do analista, sem cálculos complexos",
      "A qualitativa gera tabelas de valores e a quantitativa depende só da experiência do analista",
      "Só a qualitativa considera ameaças, vulnerabilidades e controles",
      "As duas são idênticas, mudando apenas o nome"
    ],
    correta: 0,
    explicacao: "Ambas consideram ameaças, vulnerabilidades e controles. A diferença está na forma de avaliar: números e tabelas de prioridade na quantitativa; julgamento fundamentado do analista na qualitativa, que é mais flexível quando medir com precisão é difícil.",
    porque: {
      1: "Inverte as definições.",
      2: "As duas abordagens consideram os mesmos elementos.",
      3: "A forma de avaliar é diferente."
    }
  },
  {
    id: "gsc-59", disc: "gsc", unidade: 2, tema: "Estratégias de tratamento de riscos", tipo: "associacao",
    enunciado: "Associe cada situação à estratégia de tratamento de riscos adotada.",
    pares: [
      ["Contratar um seguro contra perdas por ataques", "Transferir"],
      ["Instalar firewall e aplicar correções para reduzir o risco a nível aceitável", "Mitigar (aplicar controles)"],
      ["Descontinuar um serviço antigo que gera o risco", "Evitar"],
      ["Conviver com um risco porque o custo de tratá-lo é maior que o benefício", "Aceitar"]
    ],
    explicacao: "As quatro estratégias são: aplicar controles, aceitar conscientemente, evitar (eliminando a atividade que causa o risco) e transferir (seguros ou contratos). Aceitar só faz sentido quando é uma decisão consciente, após a análise."
  },

  /* Unidade 2 · Texto 3: Política de Segurança da Informação */
  {
    id: "gsc-60", disc: "gsc", unidade: 2, tema: "Política, norma, procedimento e diretriz", tipo: "associacao",
    enunciado: "Associe cada documento do sistema documental de segurança ao seu papel.",
    pares: [
      ["Política", "Nível estratégico: define intenções e direções gerais (o quê e por quê)"],
      ["Norma", "Nível tático: regras obrigatórias para áreas ou tecnologias específicas"],
      ["Procedimento", "Nível operacional: passo a passo de como executar"],
      ["Diretriz", "Orientações que ajudam a interpretar e aplicar políticas e normas"]
    ],
    explicacao: "A política responde o quê e por quê; a norma, o que deve ser feito; o procedimento, como fazer. Por isso detalhes técnicos devem ficar em normas e procedimentos, e não na PSI."
  },
  {
    id: "gsc-61", disc: "gsc", unidade: 2, tema: "ISO/IEC 27002:2022 (estrutura)", tipo: "unica",
    enunciado: "A versão 2022 da ISO/IEC 27002 reorganizou seus controles. Como ficou a estrutura?",
    opcoes: [
      "93 controles em 4 categorias, simplificando os 114 controles em 14 domínios da versão anterior",
      "114 controles em 14 domínios, ampliando a versão anterior",
      "93 controles em 14 domínios",
      "37 controles em 4 categorias"
    ],
    correta: 0,
    explicacao: "As quatro categorias são organizacionais, de pessoas, físicos e tecnológicos. A reestruturação facilita a aplicação prática e o mapeamento dos controles às necessidades da organização.",
    porque: {
      1: "Esse é o formato da versão anterior.",
      2: "Os 14 domínios eram da versão anterior; a nova usa 4 categorias.",
      3: "37 é só a quantidade de controles organizacionais."
    }
  },
  {
    id: "gsc-62", disc: "gsc", unidade: 2, tema: "ISO/IEC 27002:2022 (categorias)", tipo: "associacao",
    enunciado: "Associe cada categoria de controles da ISO/IEC 27002:2022 à quantidade de controles.",
    pares: [
      ["Controles organizacionais", "37 controles"],
      ["Controles de pessoas", "8 controles"],
      ["Controles físicos", "14 controles"],
      ["Controles tecnológicos", "34 controles"]
    ],
    explicacao: "37 + 8 + 14 + 34 = 93 controles. Exemplos: políticas e gestão de incidentes (organizacionais), conscientização (pessoas), perímetros de segurança (físicos), criptografia e segurança de redes (tecnológicos)."
  },
  {
    id: "gsc-63", disc: "gsc", unidade: 2, tema: "Controles da ISO/IEC 27002 ligados à PSI", tipo: "associacao",
    enunciado: "Associe cada controle da ISO/IEC 27002:2022 ao seu assunto.",
    pares: [
      ["5.1", "Políticas de segurança da informação"],
      ["5.2", "Papéis e responsabilidades pela segurança"],
      ["5.10", "Uso aceitável de informações e ativos"],
      ["5.12", "Classificação da informação"],
      ["6.3", "Conscientização, educação e treinamento"]
    ],
    explicacao: "O 5.1 exige políticas aprovadas pela direção, publicadas, comunicadas e revisadas. O 5.2 pede papéis definidos e, quando aplicável, segregação de funções. O 6.3 exige treinamentos regulares para todos."
  },
  {
    id: "gsc-64", disc: "gsc", unidade: 2, tema: "Elementos constituintes da PSI", tipo: "multipla",
    enunciado: "Quais itens fazem parte dos elementos constituintes de uma PSI completa? Marque todos os corretos.",
    opcoes: [
      "Escopo",
      "Sanções para o descumprimento",
      "Classificação da informação",
      "Código-fonte dos sistemas",
      "Senhas dos administradores"
    ],
    corretas: [0, 1, 2],
    explicacao: "A PSI traz escopo, objetivos, princípios, papéis e responsabilidades, classificação da informação, controle de acesso, gestão de incidentes, continuidade de negócios, conformidade e sanções.",
    porque: {
      3: "Código-fonte é ativo a ser protegido, e não conteúdo da política.",
      4: "Senhas nunca devem constar em documento de política."
    }
  },
  {
    id: "gsc-65", disc: "gsc", unidade: 2, tema: "Elaboração da PSI (aprovação da alta direção)", tipo: "unica",
    enunciado: "Segundo a ISO/IEC 27002, por que a aprovação formal da PSI pela alta direção é fundamental?",
    opcoes: [
      "Demonstra o comprometimento da liderança, dá legitimidade e autoridade ao documento, garante recursos e sustenta a aplicação de sanções",
      "Dispensa a comunicação da política aos colaboradores",
      "Torna desnecessárias as revisões periódicas",
      "Transfere à alta direção toda a execução técnica dos controles"
    ],
    correta: 0,
    explicacao: "Sem a aprovação da direção a política não tem autoridade. É a aprovação que sustenta o pedido de recursos e a aplicação de sanções em caso de descumprimento.",
    porque: {
      1: "Depois de aprovada, a PSI ainda precisa ser amplamente comunicada.",
      2: "A revisão periódica (no mínimo anual) continua necessária.",
      3: "A execução técnica continua com as equipes responsáveis."
    }
  },
  {
    id: "gsc-66", disc: "gsc", unidade: 2, tema: "Elaboração da PSI (comunicação)", tipo: "unica",
    enunciado: "A PSI acabou de ser aprovada pela alta direção. Qual é a etapa seguinte do processo de elaboração?",
    opcoes: [
      "Comunicação e conscientização, com publicação, treinamentos, integração de novos colaboradores e termos de aceite",
      "Análise do contexto organizacional",
      "Revisão e melhoria contínua",
      "Definição do escopo e dos objetivos"
    ],
    correta: 0,
    explicacao: "A ordem é: análise do contexto, definição de escopo e objetivos, redação, aprovação pela alta direção, comunicação e conscientização, e revisão e melhoria contínua.",
    porque: {
      1: "É a primeira etapa, anterior à redação.",
      2: "É a última etapa do processo.",
      3: "É a segunda etapa e vem antes da redação."
    }
  },
  {
    id: "gsc-67", disc: "gsc", unidade: 2, tema: "Revisão da PSI", tipo: "multipla",
    enunciado: "Em quais situações a PSI deve ser revisada? Marque todas as corretas.",
    opcoes: [
      "Em intervalos regulares preestabelecidos (no mínimo, anualmente)",
      "Após incidentes de segurança significativos",
      "Quando houver mudanças no negócio, na tecnologia ou no cenário de ameaças",
      "Quando houver alterações nos requisitos legais ou como resultado de auditorias",
      "Somente quando o diretor de TI for substituído",
      "Nunca, para preservar a estabilidade do documento"
    ],
    corretas: [0, 1, 2, 3],
    explicacao: "A revisão garante a adequação contínua da política: ela precisa acompanhar o ambiente, os riscos e a legislação.",
    porque: {
      4: "A troca de um cargo não é critério de revisão.",
      5: "Uma política parada fica desatualizada e perde eficácia."
    }
  },

  /* ---------------- Segurança Cibernética · Unidades 2 e 3 (questionários colados e textos da Unidade 3) ---------------- */

  /* Questionários: análise de riscos, incidentes e PSI */
  {
    id: "gsc-68", disc: "gsc", unidade: 2, tema: "Análise qualitativa", tipo: "unica",
    enunciado: "A análise de riscos pode seguir abordagens quantitativas ou qualitativas. A respeito da abordagem qualitativa, assinale a alternativa correta.",
    opcoes: [
      "Produz resultados mais precisos do que a análise quantitativa em todos os cenários",
      "Baseia-se no conhecimento e na experiência do analista para classificar riscos por prioridade",
      "Requer investimento em ferramentas de simulação computacional avançada",
      "Utiliza exclusivamente cálculos matemáticos e estatísticos para determinar o nível de risco"
    ],
    correta: 1,
    explicacao: "A análise qualitativa considera os mesmos elementos da quantitativa (ameaças, vulnerabilidades, controles), mas não exige cálculos complexos: apoia-se no julgamento e na experiência do analista para definir prioridades de investimento.",
    porque: {
      0: "Nenhuma abordagem é mais precisa em todos os cenários; a qualitativa é útil justamente quando quantificar é difícil.",
      2: "Simulação avançada não é requisito da qualitativa.",
      3: "Cálculos matemáticos e estatísticos caracterizam a quantitativa."
    }
  },
  {
    id: "gsc-69", disc: "gsc", unidade: 2, tema: "Cálculo de risco", tipo: "unica",
    enunciado: "A gestão de riscos de segurança da informação envolve a identificação sistemática de ameaças e vulnerabilidades que possam impactar os ativos organizacionais. Sobre o cálculo de risco, assinale a alternativa correta.",
    opcoes: [
      "A avaliação de riscos deve ser realizada apenas por empresas de consultoria externa",
      "O risco é calculado pela relação entre ameaça e vulnerabilidade, considerando o impacto potencial",
      "Riscos com baixa probabilidade devem ser ignorados no processo de análise",
      "O risco é determinado exclusivamente pelo valor monetário do ativo afetado"
    ],
    correta: 1,
    explicacao: "O risco resulta da combinação entre a ameaça e a vulnerabilidade que ela pode explorar, e o impacto potencial sobre o negócio dá a dimensão da prioridade.",
    porque: {
      0: "A análise exige conhecimento do negócio e pode ser feita pela própria organização, com ou sem apoio externo.",
      2: "Riscos improváveis mas de impacto alto não podem ser descartados sem avaliação.",
      3: "O valor do ativo é um fator, mas não o único: também contam ameaça, vulnerabilidade, reputação e continuidade."
    }
  },
  {
    id: "gsc-70", disc: "gsc", unidade: 2, tema: "Evento x incidente", tipo: "vf",
    enunciado: "A ISO/IEC 27002 define que a organização deve estabelecer procedimentos claros para a gestão de incidentes de segurança. Sobre a distinção entre evento e incidente, avalie: todo evento de segurança constitui um incidente.",
    correta: false,
    explicacao: "Evento é qualquer ocorrência observável; ele só é tratado como incidente quando compromete ou ameaça a confidencialidade, a integridade ou a disponibilidade. Todo incidente é um evento, mas nem todo evento é um incidente."
  },
  {
    id: "gsc-71", disc: "gsc", unidade: 2, tema: "Gestão de incidentes (preparação, ISO 27002 5.24)", tipo: "unica",
    enunciado: "O controle 5.24 da ISO/IEC 27002:2022 orienta o planejamento e a preparação da gestão de incidentes. Qual das alternativas representa uma ação recomendada na fase de preparação?",
    opcoes: [
      "Restringir o conhecimento dos procedimentos de resposta apenas ao departamento de TI",
      "Eliminar todos os sistemas de monitoramento para reduzir custos operacionais",
      "Designar responsabilidades claras e treinar uma equipe de resposta a incidentes (CSIRT)",
      "Aguardar a ocorrência de um incidente para então definir os procedimentos de resposta"
    ],
    correta: 2,
    explicacao: "Preparar é definir antes do incidente quem faz o quê: responsabilidades, procedimentos, ferramentas e uma equipe de resposta treinada.",
    porque: {
      0: "Os procedimentos precisam ser conhecidos pelos envolvidos em toda a organização.",
      1: "Sem monitoramento não há detecção.",
      3: "Definir procedimentos durante a crise é improvisar; a preparação existe para evitar isso."
    }
  },
  {
    id: "gsc-72", disc: "gsc", unidade: 2, tema: "Gestão de incidentes (contenção)", tipo: "unica",
    enunciado: "Durante o tratamento de um incidente de segurança, a fase de contenção tem como principal objetivo limitar a propagação e o impacto da ameaça. Qual ação é tipicamente realizada nesta fase?",
    opcoes: [
      "Conduzir a análise de lições aprendidas com toda a equipe",
      "Isolar os sistemas afetados para evitar a disseminação do ataque",
      "Aplicar patches de segurança em todos os servidores da organização",
      "Publicar um comunicado de imprensa detalhando o incidente"
    ],
    correta: 1,
    explicacao: "Isolar os sistemas afetados limita o alcance enquanto o incidente acontece. A correção definitiva da causa vem na erradicação, e a análise de lições aprendidas vem por último.",
    porque: {
      0: "Lições aprendidas é a fase final.",
      2: "Aplicar correções de forma ampla é parte da erradicação e da recuperação.",
      3: "A comunicação externa segue um plano próprio e não é a ação típica da contenção."
    }
  },
  {
    id: "gsc-73", disc: "gsc", unidade: 2, tema: "Equipe de resposta (CSIRT)", tipo: "unica",
    enunciado: "Na estrutura organizacional para resposta a incidentes, o Computer Security Incident Response Team (CSIRT) desempenha um papel central. Sobre o CSIRT, é correto afirmar que:",
    opcoes: [
      "É um grupo multidisciplinar responsável pela coordenação da resposta a incidentes de segurança",
      "Opera de forma independente, sem necessidade de reportar à alta direção",
      "Sua atuação se restringe ao monitoramento de redes, sem envolvimento na resposta",
      "Deve ser composto exclusivamente por profissionais de desenvolvimento de software"
    ],
    correta: 0,
    explicacao: "O CSIRT reúne competências diversas (técnicas, jurídicas, de comunicação, de negócio) e coordena a resposta ao incidente, reportando à gestão.",
    porque: {
      1: "Decisões de impacto exigem comunicação com a alta direção.",
      2: "O CSIRT responde aos incidentes, e não só monitora.",
      3: "A composição é multidisciplinar."
    }
  },
  {
    id: "gsc-74", disc: "gsc", unidade: 2, tema: "Características da PSI", tipo: "unica",
    enunciado: "A Política de Segurança da Informação (PSI) é o documento estratégico que norteia todas as ações de proteção dos ativos informacionais. A PSI deve:",
    opcoes: [
      "Ser construída exclusivamente pela equipe de TI, sendo um documento técnico",
      "Ser um documento privado da organização, protegido pelo sigilo",
      "Conter todos os procedimentos organizacionais referentes à TI",
      "Ser aprovada pela alta direção e comunicada a todos os colaboradores da organização"
    ],
    correta: 3,
    explicacao: "A aprovação da alta direção dá legitimidade e autoridade à política, e a comunicação a todos é o que a torna cumprível. Ela é concisa e estratégica, e não um manual técnico.",
    porque: {
      0: "A PSI não é um documento meramente técnico e deve ser compreendida por todos os níveis.",
      1: "Ela precisa ser divulgada a colaboradores e partes relevantes, e não mantida em sigilo.",
      2: "Procedimentos detalhados ficam em normas e procedimentos complementares."
    }
  },
  {
    id: "gsc-75", disc: "gsc", unidade: 2, tema: "ISO/IEC 27002:2022 (quatro categorias)", tipo: "unica",
    enunciado: "A ISO/IEC 27002:2022 reorganizou seus controles em quatro categorias principais. Qual das alternativas apresenta corretamente essas categorias?",
    opcoes: [
      "Controles preventivos, detectivos, corretivos e compensatórios",
      "Controles organizacionais, de pessoas, físicos e tecnológicos",
      "Controles de rede, de aplicação, de banco de dados e de endpoint",
      "Controles financeiros, operacionais, estratégicos e táticos"
    ],
    correta: 1,
    explicacao: "São 93 controles distribuídos em organizacionais (37), de pessoas (8), físicos (14) e tecnológicos (34).",
    porque: {
      0: "Essa classificação por tipo de ação é usada em outros contextos, não na estrutura da 27002:2022.",
      2: "É uma divisão por tecnologia, que não é a da norma.",
      3: "São categorias de gestão em geral, sem relação com a norma."
    }
  },
  {
    id: "gsc-76", disc: "gsc", unidade: 2, tema: "Melhoria contínua (PDCA)", tipo: "unica",
    enunciado: "O processo de melhoria contínua da Política de Segurança da Informação é essencial para mantê-la atualizada. Qual ciclo é recomendado como base para essa evolução constante?",
    opcoes: [
      "Ciclo ITIL (Incident, Transition, Implementation, Learning)",
      "Ciclo SDLC (Software Development Life Cycle)",
      "Ciclo PDCA (Plan, Do, Check, Act)",
      "Ciclo OODA (Observe, Orient, Decide, Act)"
    ],
    correta: 2,
    explicacao: "O PDCA (planejar, executar, verificar, agir) é o ciclo clássico de melhoria contínua, adotado em sistemas de gestão, como os da família ISO/IEC 27000.",
    porque: {
      0: "A sigla apresentada como \"ciclo ITIL\" não corresponde a um ciclo de melhoria da ITIL.",
      1: "SDLC é o ciclo de vida de desenvolvimento de software.",
      3: "OODA é um modelo de decisão em ambientes dinâmicos, e não o ciclo-base de melhoria de políticas."
    }
  },

  /* Questionários: ataques, malware, pentest e criptografia */
  {
    id: "gsc-77", disc: "gsc", unidade: 3, tema: "Reconhecimento passivo", tipo: "unica",
    enunciado: "Uma empresa de e-commerce sofreu um ataque em que hackers coletaram informações sobre a infraestrutura de TI por meio de redes sociais de funcionários e registros de domínio públicos, sem interagir diretamente com os sistemas. Qual fase da metodologia de ataques essa ação representa?",
    opcoes: ["Reconhecimento passivo", "Obtenção de acesso", "Escaneamento", "Manutenção do acesso"],
    correta: 0,
    explicacao: "No reconhecimento passivo o atacante reúne informações publicamente disponíveis, como sites, registros de domínio, redes sociais e documentos, sem interação direta com os sistemas do alvo.",
    porque: {
      1: "Obtenção de acesso é a exploração efetiva das vulnerabilidades.",
      2: "Escaneamento envolve interação com os sistemas para identificar serviços e vulnerabilidades.",
      3: "Manutenção do acesso acontece depois que o atacante já entrou."
    }
  },
  {
    id: "gsc-78", disc: "gsc", unidade: 3, tema: "Ransomware", tipo: "unica",
    enunciado: "Um hospital teve seus sistemas paralisados após funcionários abrirem um anexo de e-mail aparentemente legítimo. Os arquivos médicos foram criptografados e os atacantes exigiram pagamento em Bitcoin para liberar o acesso. Que tipo de malware foi utilizado neste ataque?",
    opcoes: ["Worm", "Cavalo de Tróia", "Vírus de macro", "Ransomware"],
    correta: 3,
    explicacao: "Ransomware é o malware que criptografa arquivos e exige resgate para devolver o acesso. A entrada por anexo disfarçado lembra um cavalo de Tróia, mas o que define o ataque é a criptografia seguida de extorsão.",
    porque: {
      0: "Worm é definido pela propagação autônoma em rede, e não pela extorsão.",
      1: "O cavalo de Tróia disfarça um programa malicioso; aqui o efeito característico é o sequestro de dados.",
      2: "Vírus de macro infecta documentos com macros e não tem a exigência de resgate."
    }
  },
  {
    id: "gsc-79", disc: "gsc", unidade: 3, tema: "Tipos de teste de penetração (white box)", tipo: "unica",
    enunciado: "Durante um teste de penetração autorizado, o auditor recebeu acesso completo ao código-fonte, à documentação técnica e aos diagramas de rede da empresa. Que tipo de teste de penetração está sendo realizado?",
    opcoes: ["Red Team Testing", "Black Box Testing", "Gray Box Testing", "White Box Testing"],
    correta: 3,
    explicacao: "No White Box o testador tem acesso completo às informações sobre os sistemas, inclusive ao código-fonte.",
    porque: {
      0: "Red Team não é um dos três tipos de teste por nível de conhecimento do material.",
      1: "No Black Box não há nenhum conhecimento prévio.",
      2: "No Gray Box o conhecimento é apenas parcial."
    }
  },
  {
    id: "gsc-80", disc: "gsc", unidade: 3, tema: "Engenharia social (personificação)", tipo: "unica",
    enunciado: "Um atacante ligou para o help desk de uma empresa se passando por um diretor de TI e, usando tom de autoridade e urgência, convenceu o atendente a resetar a senha de um administrador do sistema. Qual técnica de ataque foi empregada?",
    opcoes: ["Phishing", "Ataque de força bruta", "Engenharia social por personificação", "Dumpster diving"],
    correta: 2,
    explicacao: "O atacante manipulou uma pessoa fingindo ser outra, o que é personificação. É o mesmo padrão do caso da MGM.",
    porque: {
      0: "Phishing usa mensagens fraudulentas, em geral por e-mail, e não uma ligação em que alguém finge outra identidade.",
      1: "Força bruta testa senhas sistematicamente, sem manipular ninguém.",
      3: "Dumpster diving é vasculhar o lixo atrás de informações."
    }
  },
  {
    id: "gsc-81", disc: "gsc", unidade: 3, tema: "Ataque DDoS", tipo: "unica",
    enunciado: "Um site de vendas on-line ficou inacessível após receber tráfego massivo originado de milhares de computadores comprometidos em diversos países. Qual tipo de ataque foi realizado?",
    opcoes: ["Ataque DDoS (Distributed Denial of Service)", "Phishing", "SYN Flood", "SQL Injection"],
    correta: 0,
    explicacao: "No DDoS vários sistemas comprometidos (zumbis), organizados em botnets, atacam o mesmo alvo ao mesmo tempo. O SYN Flood é uma técnica de DoS; o que o enunciado descreve é o ataque distribuído.",
    porque: {
      1: "Phishing visa enganar pessoas, e não derrubar um serviço.",
      2: "SYN Flood é técnica de DoS tradicional, a partir de uma única origem; o cenário descreve milhares de origens.",
      3: "SQL Injection explora falhas de entrada de dados para acessar o banco."
    }
  },
  {
    id: "gsc-82", disc: "gsc", unidade: 3, tema: "Fase de escaneamento", tipo: "unica",
    enunciado: "A metodologia de ataques a sistemas de informação é composta por cinco fases sequenciais. Sobre a fase de escaneamento, assinale a alternativa correta.",
    opcoes: [
      "Envolve a coleta de informações em redes sociais dos funcionários",
      "Foca na eliminação de evidências da presença do atacante",
      "Tem como objetivo identificar vulnerabilidades específicas nos serviços e sistemas descobertos",
      "Consiste na instalação de backdoors para acesso contínuo"
    ],
    correta: 2,
    explicacao: "No escaneamento o atacante identifica versões de software, sistemas operacionais, configurações, serviços desnecessários e vulnerabilidades conhecidas (CVE) nos alvos encontrados no reconhecimento.",
    porque: {
      0: "Coletar informações em redes sociais é reconhecimento (passivo).",
      1: "Eliminar evidências é a fase final (eliminação de rastros).",
      3: "Instalar backdoors é manutenção do acesso."
    }
  },
  {
    id: "gsc-83", disc: "gsc", unidade: 3, tema: "Worms x vírus", tipo: "unica",
    enunciado: "Os worms se diferenciam dos vírus tradicionais por uma característica fundamental. Assinale a alternativa que identifica corretamente essa diferença.",
    opcoes: [
      "Worms não podem causar sobrecarga em sistemas",
      "Worms necessitam de arquivo hospedeiro para se propagar",
      "Worms possuem capacidade de propagação autônoma por meio de redes",
      "Worms só infectam documentos com macros"
    ],
    correta: 2,
    explicacao: "Worms se propagam sozinhos pela rede, explorando falhas de segurança, sem arquivo hospedeiro. Podem sobrecarregar sistemas e redes. O Nimda (2001) é um exemplo.",
    porque: {
      0: "Podem, sim: a propagação intensa sobrecarrega sistemas e redes.",
      1: "Essa é a característica dos vírus.",
      3: "Infectar documentos com macros é característica de vírus de macro."
    }
  },
  {
    id: "gsc-84", disc: "gsc", unidade: 3, tema: "Engenharia social (princípios psicológicos)", tipo: "unica",
    enunciado: "A engenharia social explora vulnerabilidades no comportamento humano para obter acesso não autorizado. Qual dos princípios psicológicos abaixo é explorado quando um atacante se passa por um executivo para pressionar um funcionário?",
    opcoes: [
      "Curiosidade tecnológica",
      "Tendência de acreditar nas pessoas e deferir à autoridade",
      "Desejo de compartilhar informações",
      "Busca por eficiência"
    ],
    correta: 1,
    explicacao: "Quem se passa por um executivo usa a autoridade e a tendência natural de confiar em quem parece legítimo, muitas vezes junto com o medo das consequências de desobedecer.",
    porque: {
      0: "Curiosidade seria explorada em iscas como um pen drive ou um arquivo \"misterioso\".",
      2: "O funcionário não está querendo compartilhar; está sendo pressionado.",
      3: "A busca por eficiência é explorada quando se oferece um atalho, e não a pressão de um superior."
    }
  },
  {
    id: "gsc-85", disc: "gsc", unidade: 3, tema: "Ethical hacking (autorização)", tipo: "unica",
    enunciado: "No contexto do ethical hacking, qual é o requisito fundamental que diferencia um teste de penetração legítimo de uma invasão criminosa?",
    opcoes: [
      "O uso de ferramentas como Metasploit",
      "O relatório final entregue ao cliente",
      "A capacidade técnica do profissional",
      "A autorização explícita e documentada dos proprietários dos sistemas"
    ],
    correta: 3,
    explicacao: "O hacking ético usa as mesmas técnicas e ferramentas dos atacantes, mas com autorização explícita dos proprietários, escopo definido por escrito e limites claros.",
    porque: {
      0: "Atacantes também usam essas ferramentas.",
      1: "O relatório é produto do teste, não o que o torna legal.",
      2: "Habilidade técnica não confere permissão."
    }
  },
  {
    id: "gsc-86", disc: "gsc", unidade: 3, tema: "Criptografia x esteganografia", tipo: "unica",
    enunciado: "A criptografia e a esteganografia são técnicas distintas de proteção da informação. Sobre a diferença fundamental entre elas, assinale a alternativa correta.",
    opcoes: [
      "Ambas utilizam a mesma técnica de substituição de caracteres",
      "A criptografia oculta a existência da mensagem, enquanto a esteganografia transforma seu conteúdo",
      "A esteganografia oculta a existência da comunicação, enquanto a criptografia torna seu conteúdo ininteligível",
      "A criptografia é mais antiga que a esteganografia"
    ],
    correta: 2,
    explicacao: "A esteganografia esconde que existe uma mensagem; a criptografia assume que o adversário vê a mensagem e garante que ela não possa ser decifrada sem a chave.",
    porque: {
      0: "Têm princípios diferentes.",
      1: "Está invertida.",
      3: "Os dois métodos são antigos; o texto cita exemplos esteganográficos de Heródoto, na Antiguidade."
    }
  },
  {
    id: "gsc-87", disc: "gsc", unidade: 3, tema: "Cifra de Vigenère", tipo: "unica",
    enunciado: "A cifra de Vigenère representou um avanço significativo na história da criptografia. Qual característica principal a tornou superior às cifras monoalfabéticas?",
    opcoes: [
      "Foi desenvolvida por Alan Turing",
      "Era imune à análise de frequência por ser polialfabética",
      "Utilizava dispositivos eletromecânicos",
      "Usava chaves de 256 bits"
    ],
    correta: 1,
    explicacao: "A Vigenère usa vários alfabetos, escolhidos por uma palavra-chave repetida, o que esconde a frequência das letras. Mais tarde, Babbage e Kasiski descobriram como determinar o tamanho da chave e quebrá-la.",
    porque: {
      0: "Foi criada por Blaise de Vigenère, no século XVI; Turing ficou conhecido pela quebra da Enigma.",
      2: "Dispositivos eletromecânicos caracterizam a Enigma.",
      3: "Chaves de 256 bits remetem a algoritmos modernos, como o AES."
    }
  },
  {
    id: "gsc-88", disc: "gsc", unidade: 3, tema: "Computação quântica e criptografia pós-quântica", tipo: "unica",
    enunciado: "A computação quântica representa uma ameaça potencial à criptografia moderna. Qual algoritmo quântico poderia quebrar o RSA e como a comunidade científica está respondendo?",
    opcoes: [
      "Algoritmo de Dijkstra, desenvolvendo firewalls quânticos",
      "Algoritmo de Shor, desenvolvendo criptografia pós-quântica baseada em reticulados",
      "Algoritmo de Grover, aumentando o tamanho das chaves simétricas para 512 bits",
      "Algoritmo de Turing, substituindo o RSA por cifras monoalfabéticas"
    ],
    correta: 1,
    explicacao: "O algoritmo de Shor poderia quebrar RSA, DSA e ECC. A resposta é a criptografia pós-quântica, com algoritmos como CRYSTALS-Kyber e CRYSTALS-Dilithium, baseados em reticulados e padronizados pelo NIST.",
    porque: {
      0: "Dijkstra é um algoritmo de caminho mínimo em grafos.",
      2: "O de Grover afeta chaves simétricas, mas não é o que quebra o RSA.",
      3: "Não existe \"algoritmo de Turing\" para isso, e cifras monoalfabéticas são fracas."
    }
  },

  /* Unidade 3 · Texto 1: Ataques e hacking ético */
  {
    id: "gsc-89", disc: "gsc", unidade: 3, tema: "As cinco fases de um ataque", tipo: "associacao",
    enunciado: "Associe cada fase da metodologia de ataque ao que o atacante faz nela.",
    pares: [
      ["1 · Reconhecimento", "Coleta o máximo de informações sobre o alvo"],
      ["2 · Escaneamento", "Identifica vulnerabilidades nos serviços e sistemas descobertos"],
      ["3 · Obtenção de acesso", "Explora de fato as vulnerabilidades identificadas"],
      ["4 · Manutenção do acesso", "Cria backdoors e contas ocultas e escala privilégios para permanecer no sistema"],
      ["5 · Eliminação de rastros", "Apaga ou altera logs e outras evidências da presença do atacante"]
    ],
    explicacao: "A compreensão dessa sequência permite criar contramedidas específicas para cada fase."
  },
  {
    id: "gsc-90", disc: "gsc", unidade: 3, tema: "Reconhecimento ativo x passivo", tipo: "unica",
    enunciado: "Qual das técnicas abaixo é um exemplo de reconhecimento ativo?",
    opcoes: [
      "Port scanning (varredura de portas) nos sistemas do alvo",
      "Ler o perfil público dos funcionários em redes sociais",
      "Consultar registros públicos de domínio",
      "Analisar o site institucional da empresa"
    ],
    correta: 0,
    explicacao: "No reconhecimento ativo há interação direta com os sistemas do alvo (Ping Sweep, Port Scanning, DNS Enumeration, SNMP Querying). No passivo, só se analisam fontes públicas.",
    porque: {
      1: "É reconhecimento passivo: não há contato com os sistemas.",
      2: "Também é passivo.",
      3: "Também é passivo."
    }
  },
  {
    id: "gsc-91", disc: "gsc", unidade: 3, tema: "Obtenção de acesso (técnicas)", tipo: "unica",
    enunciado: "Exploração de falhas em aplicações web, buffer overflow, injeção de código, força bruta e spear phishing são técnicas típicas de qual fase do ataque?",
    opcoes: ["Obtenção de acesso", "Reconhecimento", "Manutenção do acesso", "Eliminação de rastros"],
    correta: 0,
    explicacao: "Na obtenção de acesso o atacante explora as vulnerabilidades encontradas, seja por falhas de software, por tentativa sistemática de senhas ou pela manipulação de pessoas (engenharia social, phishing).",
    porque: {
      1: "Reconhecimento é coleta de informação, anterior à exploração.",
      2: "A manutenção vem depois do acesso inicial e usa backdoors, contas ocultas e escalada de privilégios.",
      3: "A eliminação de rastros é a fase final."
    }
  },
  {
    id: "gsc-92", disc: "gsc", unidade: 3, tema: "Manutenção do acesso (técnicas)", tipo: "multipla",
    enunciado: "Quais técnicas são típicas da fase de manutenção do acesso? Marque todas as corretas.",
    opcoes: [
      "Instalação de backdoors",
      "Criação de contas de usuário ocultas",
      "Escalada de privilégios",
      "Modificação ou exclusão de arquivos de log",
      "Análise de registros públicos de domínio"
    ],
    corretas: [0, 1, 2],
    explicacao: "Para manter presença persistente, o atacante usa backdoors, contas ocultas, escalada de privilégios e canais de comando e controle.",
    porque: {
      3: "Mexer em logs é eliminação de rastros.",
      4: "Analisar registros públicos é reconhecimento passivo."
    }
  },
  {
    id: "gsc-93", disc: "gsc", unidade: 3, tema: "Eliminação de rastros", tipo: "unica",
    enunciado: "Depois de invadir um servidor, o atacante apaga entradas dos arquivos de log e altera as datas (timestamps) dos arquivos que modificou. Em qual fase ele está?",
    opcoes: ["Eliminação de rastros", "Manutenção do acesso", "Escaneamento", "Obtenção de acesso"],
    correta: 0,
    explicacao: "A fase final remove evidências da presença do atacante: edição ou exclusão de logs, alteração de timestamps, remoção de ferramentas usadas e modificação de utilitários do sistema para evitar detecção.",
    porque: {
      1: "A manutenção busca permanência, e não esconder o que já foi feito.",
      2: "O escaneamento ocorre antes de invadir.",
      3: "A obtenção de acesso é o momento da invasão."
    }
  },
  {
    id: "gsc-94", disc: "gsc", unidade: 3, tema: "Tipos de vírus", tipo: "associacao",
    enunciado: "Associe cada tipo de vírus ao que ele infecta.",
    pares: [
      ["Vírus de arquivo", "Executáveis"],
      ["Vírus de setor de boot", "O setor de inicialização do disco"],
      ["Vírus de macro", "Documentos com suporte a macros"]
    ],
    explicacao: "Todo vírus precisa de um programa hospedeiro e geralmente depende de ação do usuário para ser ativado."
  },
  {
    id: "gsc-95", disc: "gsc", unidade: 3, tema: "Cavalos de Tróia", tipo: "vf",
    enunciado: "Os cavalos de Tróia, assim como os vírus e os worms, têm capacidade de autorreplicação.",
    correta: false,
    explicacao: "O cavalo de Tróia disfarça funções maliciosas em um programa aparentemente legítimo, mas não se autorreplica. Existem Trojans de acesso remoto (RAT), bancários e downloaders."
  },
  {
    id: "gsc-96", disc: "gsc", unidade: 3, tema: "WannaCry", tipo: "unica",
    enunciado: "O WannaCry (2017) se espalhou por mais de 200 mil computadores em mais de 150 países. Que característica do ataque explica essa velocidade?",
    opcoes: [
      "Era um ransomware que usava técnicas de propagação de worm",
      "Dependia de cada vítima abrir pessoalmente um anexo",
      "Funcionava apenas com acesso físico às máquinas",
      "Atuava somente por engenharia social por telefone"
    ],
    correta: 0,
    explicacao: "O WannaCry combinou o sequestro de arquivos (ransomware) com a propagação autônoma de um worm, o que explica o alcance global. As defesas citadas são backup, antivírus e treinamento de usuários.",
    porque: {
      1: "A propagação foi autônoma, sem depender de cada usuário.",
      2: "Espalhou-se pela rede, sem acesso físico.",
      3: "Não usava telefone nem engenharia social para se espalhar."
    }
  },
  {
    id: "gsc-97", disc: "gsc", unidade: 3, tema: "DoS e DDoS", tipo: "associacao",
    enunciado: "Associe cada termo de ataques de negação de serviço à sua descrição.",
    pares: [
      ["SYN Flood", "Explora o handshake do protocolo TCP"],
      ["Ping Flood", "Envio massivo de pacotes ICMP"],
      ["Smurf Attack", "Amplificação por broadcast ICMP"],
      ["Botnet", "Rede de sistemas comprometidos (zumbis) usada em ataques DDoS"]
    ],
    explicacao: "O DoS tradicional parte de um único atacante; o DDoS usa múltiplos sistemas comprometidos. A defesa contra DDoS envolve filtragem de tráfego, distribuição de carga por CDNs e acordos de filtragem com provedores."
  },
  {
    id: "gsc-98", disc: "gsc", unidade: 3, tema: "Tipos de engenharia social", tipo: "associacao",
    enunciado: "Associe cada situação à técnica de engenharia social correspondente.",
    pares: [
      ["Vasculhar o lixo da empresa em busca de documentos descartados", "Dumpster diving"],
      ["Espiar a tela ou o teclado de alguém por cima do ombro", "Shoulder surfing"],
      ["Fingir ser um diretor para obter acesso ou informação", "Personificação"]
    ],
    explicacao: "O material cita ainda a imitação de suporte técnico. A eficácia vem de características humanas: desejo de ser prestativo, tendência a acreditar nas pessoas, medo de consequências e busca por eficiência."
  },
  {
    id: "gsc-99", disc: "gsc", unidade: 3, tema: "Condições de um teste de penetração", tipo: "multipla",
    enunciado: "O que deve constar em um teste de penetração legítimo? Marque todos os corretos.",
    opcoes: [
      "Documentação escrita de escopo e limitações",
      "Aprovação dos stakeholders",
      "Definição clara de janelas de teste",
      "Procedimentos de emergência estabelecidos",
      "Liberdade para testar qualquer sistema, inclusive de terceiros",
      "Dispensa de autorização quando o objetivo é encontrar falhas"
    ],
    corretas: [0, 1, 2, 3],
    explicacao: "O hacking ético só é ético e legal com autorização explícita e limites claros. No Brasil, deve-se considerar também a Lei 12.737/2012, o Marco Civil da Internet, a LGPD e o Código Penal.",
    porque: {
      4: "O escopo precisa ser definido e limitado; testar sistemas de terceiros sem autorização é crime.",
      5: "A boa intenção não substitui a autorização."
    }
  },
  {
    id: "gsc-100", disc: "gsc", unidade: 3, tema: "Legislação aplicável ao hacking ético", tipo: "associacao",
    enunciado: "Associe cada lei citada no material ao seu nome.",
    pares: [
      ["Lei 12.737/2012", "Lei de Crimes Cibernéticos"],
      ["Lei 12.965/2014", "Marco Civil da Internet"],
      ["Lei 13.709/2018", "Lei Geral de Proteção de Dados (LGPD)"]
    ],
    explicacao: "Essas leis, somadas ao Código Penal, delimitam o que pode ser feito em atividades de ethical hacking."
  },
  {
    id: "gsc-101", disc: "gsc", unidade: 3, tema: "Ferramentas de pentest", tipo: "associacao",
    enunciado: "Associe cada ferramenta à sua função.",
    pares: [
      ["Whois", "Informações de registro de domínios"],
      ["Nmap", "Scanner de portas e descoberta de hosts"],
      ["Nessus", "Plataforma comercial de avaliação de vulnerabilidades"],
      ["Burp Suite", "Análise de aplicações web"],
      ["Metasploit Framework", "Desenvolvimento e execução de exploits"],
      ["Kali Linux", "Distribuição focada em testes de penetração"]
    ],
    explicacao: "Whois e Nmap são de reconhecimento; Nessus, OpenVAS, Burp Suite e OWASP ZAP, de análise de vulnerabilidades; Metasploit, Kali e Parrot, de frameworks de teste de penetração."
  },
  {
    id: "gsc-102", disc: "gsc", unidade: 3, tema: "Metodologia PTES", tipo: "lacuna",
    enunciado: "Complete as fases do PTES (Penetration Testing Execution Standard).",
    texto: "O PTES começa com {{1}}, passa por Intelligence Gathering, Threat Modeling, Vulnerability Analysis, {{2}} e Post Exploitation, e termina com {{3}}.",
    banco: ["Pre-engagement Interactions", "Exploitation", "Reporting", "Authentication Testing", "Session Management Testing"],
    corretas: ["Pre-engagement Interactions", "Exploitation", "Reporting"],
    explicacao: "Authentication Testing e Session Management Testing são fases da metodologia OWASP para aplicações web, não do PTES."
  },
  {
    id: "gsc-103", disc: "gsc", unidade: 3, tema: "Teste de penetração (gray box)", tipo: "unica",
    enunciado: "Em um teste de penetração, o auditor recebe as credenciais de um usuário comum e parte da documentação do sistema, mas não o código-fonte. Que tipo de teste é esse?",
    opcoes: ["Gray Box Testing", "White Box Testing", "Black Box Testing", "Teste de regressão"],
    correta: 0,
    explicacao: "No Gray Box o conhecimento sobre o alvo é parcial. No Black Box não há conhecimento prévio (simula um atacante externo) e no White Box o acesso é completo.",
    porque: {
      1: "No White Box há acesso completo, inclusive ao código-fonte.",
      2: "No Black Box o auditor não recebe credenciais nem documentação.",
      3: "Teste de regressão é um conceito de qualidade de software."
    }
  },

  /* Unidade 3 · Texto 2: Criptografia e cifragem */
  {
    id: "gsc-104", disc: "gsc", unidade: 3, tema: "Esteganografia (exemplo histórico)", tipo: "unica",
    enunciado: "Segundo Heródoto, Histieu raspou a cabeça de um mensageiro, tatuou a mensagem no couro cabeludo e esperou o cabelo crescer antes de enviá-lo. Que técnica esse exemplo ilustra?",
    opcoes: ["Esteganografia", "Criptografia simétrica", "Cifra polialfabética", "Função hash"],
    correta: 0,
    explicacao: "A mensagem não foi embaralhada; foi escondida, de modo que ninguém soubesse que ela existia. Hoje a esteganografia digital insere dados nos bits menos significativos de imagens, áudio ou vídeo.",
    porque: {
      1: "Criptografia simétrica transforma o conteúdo com uma chave compartilhada.",
      2: "Cifra polialfabética é um tipo de criptografia que substitui letras.",
      3: "Hash gera um resumo de tamanho fixo e não transporta a mensagem."
    }
  },
  {
    id: "gsc-105", disc: "gsc", unidade: 3, tema: "Segurança por obscuridade", tipo: "vf",
    enunciado: "A segurança de um sistema criptográfico deve depender principalmente de manter secreto o algoritmo utilizado.",
    correta: false,
    explicacao: "A segurança criptográfica não pode se basear só em esconder o algoritmo (segurança por obscuridade); deve estar em chaves suficientemente complexas, assumindo que o adversário conhece o método e tem acesso à mensagem cifrada."
  },
  {
    id: "gsc-106", disc: "gsc", unidade: 3, tema: "História da criptografia", tipo: "associacao",
    enunciado: "Associe cada cifra ou máquina ao que a caracteriza e a como foi quebrada.",
    pares: [
      ["Cifra monoalfabética", "Cada letra é trocada por outra; quebrada pela análise de frequência, de Al-Kindi"],
      ["Cifra de Vigenère", "Polialfabética, com palavra-chave repetida; quebrada por Babbage e Kasiski"],
      ["Máquina Enigma", "Cifra polialfabética por rotores usada na 2ª Guerra; quebrada em Bletchley Park, com Alan Turing"]
    ],
    explicacao: "A análise de frequência (século IX) mostrou que as características estatísticas da língua sobrevivem à cifragem monoalfabética. A Vigenère foi chamada de \"cifra indecifrável\" até o século XIX."
  },
  {
    id: "gsc-107", disc: "gsc", unidade: 3, tema: "Algoritmos simétricos e assimétricos", tipo: "associacao",
    enunciado: "Associe cada algoritmo à sua descrição.",
    pares: [
      ["AES", "Simétrico, adotado pelo NIST em 2001, com chaves de 128, 192 ou 256 bits"],
      ["3DES", "Aplicação tripla do DES, com segurança efetiva de 112 bits"],
      ["ChaCha20", "Cifra de fluxo moderna, usada no TLS 1.3 e em comunicações móveis"],
      ["RSA", "Assimétrico, baseado na dificuldade de fatorar inteiros grandes"]
    ],
    explicacao: "Os três primeiros são simétricos: usam a mesma chave para cifrar e decifrar. O RSA, de 1977, é assimétrico."
  },
  {
    id: "gsc-108", disc: "gsc", unidade: 3, tema: "Criptografia simétrica (desafio)", tipo: "unica",
    enunciado: "A criptografia simétrica é muito mais rápida que a assimétrica e ideal para grandes volumes de dados. Qual é o seu principal desafio?",
    opcoes: [
      "Estabelecer previamente uma chave secreta compartilhada entre as partes",
      "Ser incapaz de garantir confidencialidade",
      "Exigir um par de chaves, uma pública e uma privada",
      "Depender sempre de certificados digitais"
    ],
    correta: 0,
    explicacao: "Como a mesma chave cifra e decifra, as duas partes precisam combiná-la em segredo antes. É por isso que protocolos como o TLS usam criptografia assimétrica para estabelecer a chave e a simétrica para cifrar os dados.",
    porque: {
      1: "A confidencialidade de grandes volumes de dados é justamente o seu uso principal.",
      2: "Par de chaves é característica da assimétrica.",
      3: "Certificados vinculam chaves públicas e não são requisito da simétrica."
    }
  },
  {
    id: "gsc-109", disc: "gsc", unidade: 3, tema: "Criptografia assimétrica (conceito)", tipo: "unica",
    enunciado: "Diffie, Hellman e Merkle revolucionaram a criptografia, na década de 1970, com as cifras assimétricas. O que as caracteriza?",
    opcoes: [
      "O conhecimento necessário para cifrar é diferente do necessário para decifrar: a chave pública cifra e a privada decifra",
      "A mesma chave cifra e decifra, mas é trocada a cada mensagem",
      "Dispensam o uso de chaves",
      "Só servem para gerar resumos de tamanho fixo"
    ],
    correta: 0,
    explicacao: "A chave pública pode ser divulgada; só quem tem a chave privada decifra. Isso resolve o problema de distribuir a chave, ao custo de ser bem mais lenta que a simétrica.",
    porque: {
      1: "Essa é a lógica da simétrica.",
      2: "Todas as cifras dependem de chaves.",
      3: "Gerar resumos é função de hash."
    }
  },
  {
    id: "gsc-110", disc: "gsc", unidade: 3, tema: "Certificados digitais e PKI", tipo: "unica",
    enunciado: "O que é um certificado digital no contexto da Infraestrutura de Chave Pública (PKI)?",
    opcoes: [
      "Uma estrutura de dados que vincula uma entidade a uma chave pública, emitida e assinada por uma Autoridade Certificadora confiável",
      "Um arquivo que guarda a chave privada de todos os usuários da empresa",
      "Um programa antivírus homologado",
      "Um backup criptografado dos dados do servidor"
    ],
    correta: 0,
    explicacao: "A hierarquia de confiança inclui certificados-raiz (autoassinados), certificados intermediários e certificados de entidade final.",
    porque: {
      1: "A chave privada deve permanecer secreta com o seu titular.",
      2: "Certificado não é um programa de proteção.",
      3: "Certificado não é uma cópia de segurança."
    }
  },
  {
    id: "gsc-111", disc: "gsc", unidade: 3, tema: "Serviços do TLS", tipo: "associacao",
    enunciado: "Associe cada garantia fornecida pelo TLS ao mecanismo que a sustenta.",
    pares: [
      ["Confidencialidade", "Cifragem simétrica"],
      ["Integridade", "Códigos de autenticação de mensagem"],
      ["Autenticação", "Certificados digitais X.509"]
    ],
    explicacao: "O handshake TLS combina criptografia assimétrica (autenticação e estabelecimento seguro da chave) com simétrica (cifragem eficiente dos dados)."
  },
  {
    id: "gsc-112", disc: "gsc", unidade: 3, tema: "Hash para armazenar senhas", tipo: "unica",
    enunciado: "Entre as opções abaixo, quais algoritmos são indicados para o armazenamento seguro de senhas?",
    opcoes: ["bcrypt, scrypt ou Argon2", "AES", "RSA", "Base64"],
    correta: 0,
    explicacao: "O material cita bcrypt, scrypt e Argon2 entre as aplicações de funções hash. Outras aplicações são verificação de integridade de arquivos, assinaturas digitais e blockchain.",
    porque: {
      1: "O AES é cifra simétrica e reversível; senhas não devem ser armazenadas de forma reversível.",
      2: "O RSA é assimétrico, e não é usado para guardar senhas.",
      3: "Base64 é apenas uma codificação, não oferece nenhuma proteção."
    }
  },
  {
    id: "gsc-113", disc: "gsc", unidade: 3, tema: "Criptografia homomórfica", tipo: "unica",
    enunciado: "Qual é a característica da criptografia homomórfica, tendência citada para a preservação de privacidade?",
    opcoes: [
      "Permite realizar computação sobre dados cifrados sem decifrá-los",
      "Elimina a necessidade de chaves",
      "Substitui o hash na verificação de integridade",
      "Esconde a existência da mensagem dentro de uma imagem"
    ],
    correta: 0,
    explicacao: "Com ela, um serviço pode processar dados sem nunca vê-los em claro, o que ajuda na privacidade, por exemplo em análises feitas na nuvem.",
    porque: {
      1: "Ainda usa chaves.",
      2: "Não é uma função hash.",
      3: "Isso é esteganografia."
    }
  },

  /* ---------------- Segurança Cibernética · Unidade 4 (algoritmos, hash, certificados e tendências) ---------------- */

  /* Questões no estilo das oficiais do professor */
  {
    id: "gsc-114", disc: "gsc", unidade: 4, tema: "Hash de senhas (salt)", tipo: "unica",
    enunciado: "Um desenvolvedor precisa armazenar senhas de usuários em um banco de dados. Ele decide usar SHA-256 diretamente sobre as senhas. Qual vulnerabilidade essa implementação apresenta?",
    opcoes: [
      "Senhas iguais gerarão hashes idênticos, permitindo ataques de rainbow tables",
      "Não há vulnerabilidade; SHA-256 é adequado para armazenamento de senhas",
      "O SHA-256 é um algoritmo obsoleto e inseguro",
      "O hash SHA-256 pode ser revertido facilmente para a senha original"
    ],
    correta: 0,
    explicacao: "Hash puro é determinístico: a mesma senha gera sempre o mesmo digest, o que permite rainbow tables e ataques em massa. O recomendado é usar bcrypt, scrypt ou Argon2, com salt aleatório e múltiplas iterações.",
    porque: {
      1: "SHA-256 sozinho, sem salt e sem iterações, não é a prática recomendada para senhas.",
      2: "O SHA-256 (família SHA-2) é considerado seguro; o problema é o uso inadequado para senhas.",
      3: "A resistência à pré-imagem torna a reversão inviável; o risco está na comparação com tabelas pré-calculadas."
    }
  },
  {
    id: "gsc-115", disc: "gsc", unidade: 4, tema: "Responsabilidade compartilhada (IaaS)", tipo: "unica",
    enunciado: "Uma empresa está migrando seus servidores para a nuvem e o CISO levantou preocupações sobre a segurança dos dados. Considerando o modelo de responsabilidade compartilhada, em um modelo IaaS, a criptografia dos dados em repouso é responsabilidade de quem?",
    opcoes: [
      "Exclusivamente do provedor de nuvem",
      "Do fabricante do hardware dos servidores",
      "Da autoridade certificadora",
      "Do cliente (organização)"
    ],
    correta: 3,
    explicacao: "No IaaS o provedor cuida da infraestrutura física; o cliente responde pelo que roda sobre ela, como sistema operacional, aplicações e dados, inclusive a criptografia dos dados em repouso.",
    porque: {
      0: "A divisão varia conforme o modelo de serviço; no IaaS grande parte da responsabilidade é do cliente.",
      1: "O fabricante do hardware não gerencia os dados da organização.",
      2: "A autoridade certificadora emite certificados e não cifra dados em repouso."
    }
  },
  {
    id: "gsc-116", disc: "gsc", unidade: 4, tema: "Simétrica x assimétrica (desempenho)", tipo: "unica",
    enunciado: "Uma empresa de e-commerce precisa proteger as transações de pagamento de seus clientes. O arquiteto de segurança propõe usar apenas criptografia assimétrica (RSA) para cifrar todo o tráfego. Qual é o principal problema dessa abordagem?",
    opcoes: [
      "A criptografia assimétrica não garante confidencialidade",
      "A criptografia assimétrica é 100-1000× mais lenta, tornando inviável cifrar todo o tráfego",
      "Não há problemas, pois o RSA é suficiente para todas as necessidades",
      "O RSA não pode ser usado em comunicações pela internet"
    ],
    correta: 1,
    explicacao: "Por isso se usam sistemas híbridos: a assimétrica estabelece a chave de sessão e a simétrica, muito mais rápida, cifra o tráfego real.",
    porque: {
      0: "Ela garante confidencialidade: cifra com a chave pública, e só a privada decifra.",
      2: "O desempenho é um limitador importante.",
      3: "O RSA é amplamente usado na internet, por exemplo no TLS."
    }
  },
  {
    id: "gsc-117", disc: "gsc", unidade: 4, tema: "Verificação de integridade com hash", tipo: "unica",
    enunciado: "Uma organização recebe um arquivo importante por e-mail e deseja verificar se ele não foi adulterado durante o envio. O remetente forneceu o hash SHA-256 do arquivo original. Qual propriedade da função hash está sendo utilizada nessa verificação?",
    opcoes: [
      "Autenticação da identidade do remetente",
      "Garantia de confidencialidade dos dados",
      "Criptografia simétrica do conteúdo",
      "Verificação de integridade por resistência à segunda pré-imagem"
    ],
    correta: 3,
    explicacao: "Se o hash calculado do arquivo recebido bate com o informado, o arquivo não foi alterado. Isso depende de ser inviável criar outro arquivo com o mesmo hash (segunda pré-imagem). Atenção: o hash sozinho não prova quem enviou.",
    porque: {
      0: "Hash sozinho não autentica o remetente; para isso seria preciso assinatura digital.",
      1: "Hash não cifra nem esconde o conteúdo.",
      2: "Hash não é criptografia simétrica."
    }
  },
  {
    id: "gsc-118", disc: "gsc", unidade: 4, tema: "Harvest now, decrypt later", tipo: "unica",
    enunciado: "Um banco está preocupado com a ameaça \"harvest now, decrypt later\", na qual atacantes capturam dados criptografados hoje para decifrá-los no futuro com computadores quânticos. Qual medida proativa é mais adequada para mitigar esse risco?",
    opcoes: [
      "Usar apenas criptografia simétrica AES-128",
      "Iniciar a migração para algoritmos de criptografia pós-quântica como CRYSTALS-Kyber",
      "Abandonar completamente o uso de criptografia",
      "Aumentar o tamanho das chaves RSA para 8192 bits"
    ],
    correta: 1,
    explicacao: "O correto é planejar a migração para algoritmos pós-quânticos, com crypto agility. A urgência é maior para dados de longo ciclo de vida.",
    porque: {
      0: "AES-128 reduziria para cerca de 64 bits efetivos contra o algoritmo de Grover, e não resolve a troca de chaves assimétrica.",
      2: "Sem criptografia os dados ficariam expostos a qualquer um.",
      3: "Chaves RSA maiores não resolvem: o algoritmo de Shor quebra o RSA em tempo polinomial, qualquer que seja o tamanho."
    }
  },
  {
    id: "gsc-119", disc: "gsc", unidade: 4, tema: "ISO/IEC 27002 e nuvem (SLA)", tipo: "unica",
    enunciado: "A computação em nuvem opera sob o modelo de responsabilidade compartilhada entre provedor e cliente. Segundo a ISO/IEC 27002, qual é uma recomendação fundamental para segurança em ambientes de nuvem?",
    opcoes: [
      "Armazenar dados exclusivamente em um único data center para simplificar a gestão",
      "Eliminar completamente o uso de criptografia para reduzir latência",
      "Transferir toda a responsabilidade de segurança exclusivamente ao provedor",
      "Estabelecer SLAs que contemplem requisitos de segurança e criptografia de dados"
    ],
    correta: 3,
    explicacao: "O controle 5.23 recomenda acordo de nível de serviço com requisitos de segurança, gestão de incidentes, criptografia em repouso e em trânsito e portabilidade de dados.",
    porque: {
      0: "Um único data center reduz a redundância e a disponibilidade.",
      1: "A criptografia é parte das recomendações.",
      2: "A responsabilidade é compartilhada, e não transferida por inteiro."
    }
  },
  {
    id: "gsc-120", disc: "gsc", unidade: 4, tema: "CRYSTALS-Kyber", tipo: "unica",
    enunciado: "A criptografia pós-quântica busca algoritmos resistentes a ataques por computadores quânticos. O CRYSTALS-Kyber, selecionado pelo NIST como padrão primário para criptografia de chave pública pós-quântica, é baseado em:",
    opcoes: [
      "Reticulados criptográficos (lattice-based)",
      "Logaritmos discretos em grupos cíclicos",
      "Fatoração de números primos grandes",
      "Curvas elípticas sobre corpos finitos"
    ],
    correta: 0,
    explicacao: "O Kyber é um mecanismo de encapsulamento de chave baseado em reticulados. O Dilithium (assinatura) também é baseado em reticulados; o SPHINCS+ se baseia em funções hash.",
    porque: {
      1: "Logaritmos discretos são vulneráveis ao algoritmo de Shor.",
      2: "A fatoração sustenta o RSA, vulnerável a Shor.",
      3: "Curvas elípticas (ECC) também são quebradas por Shor."
    }
  },
  {
    id: "gsc-121", disc: "gsc", unidade: 4, tema: "Algoritmo RSA", tipo: "unica",
    enunciado: "A criptografia assimétrica resolveu o problema histórico de distribuição de chaves ao introduzir o conceito de pares de chaves. Sobre o algoritmo RSA, é correto afirmar que:",
    opcoes: [
      "É utilizado exclusivamente para cifragem de dados, sem aplicação em assinaturas digitais",
      "Foi desenvolvido na década de 1990 como substituto do AES",
      "Utiliza chaves idênticas para cifrar e decifrar mensagens",
      "Sua segurança baseia-se na dificuldade de fatorar números inteiros grandes"
    ],
    correta: 3,
    explicacao: "O RSA (Rivest, Shamir e Adleman, 1977) usa chaves de 2048 a 4096 bits e serve para certificados, assinaturas digitais e estabelecimento de chaves de sessão.",
    porque: {
      0: "Também é usado em assinaturas digitais.",
      1: "É de 1977, e o AES é simétrico, de outra família.",
      2: "Chaves idênticas caracterizam a criptografia simétrica."
    }
  },
  {
    id: "gsc-122", disc: "gsc", unidade: 4, tema: "AES e algoritmos simétricos", tipo: "unica",
    enunciado: "A criptografia simétrica utiliza a mesma chave para cifragem e decifragem, sendo amplamente aplicada em cenários que demandam alto desempenho. Sobre os algoritmos de criptografia simétrica, é correto afirmar que:",
    opcoes: [
      "Algoritmos simétricos não necessitam de gerenciamento de chaves entre as partes",
      "O RSA é o principal exemplo de algoritmo simétrico utilizado em comunicações seguras",
      "A criptografia simétrica é mais lenta que a assimétrica em todos os cenários",
      "O AES é o padrão atual adotado pelo NIST, suportando chaves de 128, 192 ou 256 bits"
    ],
    correta: 3,
    explicacao: "O AES foi adotado pelo NIST em 2001 e é o padrão mais usado (TLS, IPsec, armazenamento criptografado).",
    porque: {
      0: "A chave compartilhada precisa ser combinada e mantida em segredo pelas partes.",
      1: "O RSA é assimétrico.",
      2: "A simétrica é tipicamente muito mais rápida."
    }
  },
  {
    id: "gsc-123", disc: "gsc", unidade: 4, tema: "Salt aleatório", tipo: "unica",
    enunciado: "Sobre o armazenamento seguro de senhas, a prática recomendada utiliza funções de derivação de chave como bcrypt ou Argon2. A principal razão para usar salt aleatório em conjunto com o hash é:",
    opcoes: [
      "Aumentar a velocidade de verificação das senhas",
      "Prevenir ataques de rainbow tables, garantindo hashes únicos mesmo para senhas idênticas",
      "Permitir que senhas possam ser recuperadas em texto claro quando necessário",
      "Reduzir o tamanho do digest armazenado no banco de dados"
    ],
    correta: 1,
    explicacao: "O salt aleatório torna únicos os hashes de senhas iguais e inutiliza tabelas pré-calculadas.",
    porque: {
      0: "As funções de derivação são deliberadamente lentas, para dificultar ataques de força bruta.",
      2: "Senhas nunca devem ser recuperáveis em texto claro.",
      3: "O salt não reduz o digest."
    }
  },
  {
    id: "gsc-124", disc: "gsc", unidade: 4, tema: "TLS: papel da assimétrica", tipo: "unica",
    enunciado: "Sistemas híbridos combinam criptografia simétrica e assimétrica para obter vantagens de ambas as abordagens. No protocolo TLS, a criptografia assimétrica é utilizada para:",
    opcoes: [
      "Cifrar todo o tráfego de dados da sessão",
      "Estabelecer a chave de sessão simétrica de forma segura",
      "Substituir completamente a criptografia simétrica",
      "Realizar verificação de integridade dos pacotes transmitidos"
    ],
    correta: 1,
    explicacao: "A assimétrica estabelece a chave de sessão (e autentica); a simétrica cifra a comunicação real. Resultado: segurança da assimétrica com a velocidade da simétrica. O mesmo padrão aparece em S/MIME e PGP.",
    porque: {
      0: "Cifrar todo o tráfego seria lento; isso é papel da simétrica.",
      2: "Ela não substitui a simétrica: as duas se complementam.",
      3: "A integridade é garantida por códigos de autenticação de mensagem ou por modos como o GCM."
    }
  },
  {
    id: "gsc-125", disc: "gsc", unidade: 4, tema: "Certificados X.509", tipo: "unica",
    enunciado: "Os certificados digitais são componentes fundamentais da Infraestrutura de Chave Pública (PKI). Sobre certificados X.509, é correto afirmar que:",
    opcoes: [
      "Contêm apenas a chave privada do titular para fins de autenticação",
      "São emitidos e assinados por Autoridades Certificadoras (CAs) confiáveis",
      "Dispensam verificação de cadeia de confiança hierárquica",
      "Não possuem prazo de validade, sendo permanentes"
    ],
    correta: 1,
    explicacao: "O certificado vincula uma entidade a uma chave pública e é assinado pela CA. A validade é um dos campos do certificado, e a cadeia de confiança precisa ser verificada.",
    porque: {
      0: "Contêm a chave pública; a privada nunca deve estar no certificado.",
      2: "A cadeia de confiança é verificada até a CA raiz.",
      3: "Têm período de validade, com datas de início e término."
    }
  },
  {
    id: "gsc-126", disc: "gsc", unidade: 4, tema: "Algoritmo de Shor", tipo: "unica",
    enunciado: "O algoritmo de Shor, executado em um computador quântico suficientemente poderoso, representa uma ameaça significativa para a criptografia atual porque:",
    opcoes: [
      "Torna todas as funções hash completamente inseguras",
      "Pode fatorar números inteiros grandes em tempo polinomial, quebrando RSA e ECC",
      "Elimina a necessidade de chaves criptográficas",
      "Pode quebrar qualquer tipo de criptografia, incluindo simétrica e assimétrica"
    ],
    correta: 1,
    explicacao: "Shor fatora inteiros grandes e resolve logaritmos discretos em tempo polinomial, o que afeta RSA, DSA e ECC. A simétrica é afetada pelo Grover, que só reduz a força pela metade.",
    porque: {
      0: "Não torna as funções hash inseguras de forma geral.",
      2: "Não elimina a necessidade de chaves.",
      3: "A simétrica é menos vulnerável; o AES-256 mantém cerca de 128 bits de segurança."
    }
  },
  {
    id: "gsc-127", disc: "gsc", unidade: 4, tema: "Resistência a colisões", tipo: "unica",
    enunciado: "Funções hash criptográficas possuem propriedades essenciais para garantir a segurança da informação. A propriedade que torna computacionalmente inviável encontrar duas entradas distintas que produzam o mesmo hash é denominada:",
    opcoes: ["Determinismo", "Efeito avalanche", "Resistência a colisões", "Resistência à pré-imagem"],
    correta: 2,
    explicacao: "Resistência a colisões: é inviável achar quaisquer m₁ ≠ m₂ com hash(m₁) = hash(m₂).",
    porque: {
      0: "Determinismo significa que a mesma entrada gera sempre a mesma saída.",
      1: "Efeito avalanche é a mudança drástica do digest após uma alteração mínima.",
      3: "Pré-imagem: dado um hash, é inviável achar uma entrada que o produza."
    }
  },
  {
    id: "gsc-128", disc: "gsc", unidade: 4, tema: "IA no uso ofensivo", tipo: "unica",
    enunciado: "A inteligência artificial apresenta uso dual na segurança da informação, podendo fortalecer defesas ou sofisticar ataques. Um exemplo de uso ofensivo da IA é:",
    opcoes: [
      "A detecção de anomalias em tráfego de rede",
      "A priorização automatizada de patches de segurança",
      "A resposta automatizada a incidentes de segurança",
      "A geração de e-mails de phishing altamente personalizados por modelos de linguagem"
    ],
    correta: 3,
    explicacao: "As três primeiras são usos defensivos. Modelos de linguagem geram phishing convincente e personalizado, o que aumenta as taxas de sucesso da engenharia social.",
    porque: {
      0: "Uso defensivo.",
      1: "Uso defensivo.",
      2: "Uso defensivo."
    }
  },

  /* Derivadas dos textos e dos slides */
  {
    id: "gsc-129", disc: "gsc", unidade: 4, tema: "IA: defesa x ataque", tipo: "multipla",
    enunciado: "Quais destes são usos DEFENSIVOS da inteligência artificial na segurança da informação? Marque todos os corretos.",
    opcoes: [
      "Detecção de anomalias em tráfego de rede e comportamento de usuários",
      "Análise de malware zero-day por padrões comportamentais",
      "Deepfakes para burlar autenticação por voz ou rosto",
      "Automatização da descoberta de vulnerabilidades e criação de exploits por atacantes"
    ],
    corretas: [0, 1],
    explicacao: "É o uso dual da IA: as mesmas capacidades fortalecem defesas e sofisticam ataques. Outros usos defensivos: resposta automatizada a incidentes e priorização de vulnerabilidades.",
    porque: {
      2: "Deepfakes são uso ofensivo (fraude de identidade).",
      3: "Automatizar ataques é uso ofensivo."
    }
  },
  {
    id: "gsc-130", disc: "gsc", unidade: 4, tema: "Ataques adversariais", tipo: "unica",
    enunciado: "Perturbações imperceptíveis nos dados de entrada que fazem um modelo de IA classificar um malware como software legítimo caracterizam:",
    opcoes: ["Ataque adversarial", "Ataque de força bruta", "SQL Injection", "Spear phishing"],
    correta: 0,
    explicacao: "Em ataques adversariais, pequenas alterações enganam o modelo. A ISO/IEC 27002 recomenda proteger modelos de IA contra manipulação e manter decisões automatizadas auditáveis e transparentes.",
    porque: {
      1: "Força bruta testa senhas ou chaves sistematicamente.",
      2: "SQL Injection explora falhas de entrada em consultas a bancos de dados.",
      3: "Spear phishing é engenharia social dirigida."
    }
  },
  {
    id: "gsc-131", disc: "gsc", unidade: 4, tema: "Nuvem: vantagens e desafios", tipo: "multipla",
    enunciado: "Quais destes são VANTAGENS da nuvem para a segurança, segundo o material? Marque todas as corretas.",
    opcoes: [
      "Atualizações automáticas de patches pelo provedor",
      "Criptografia em repouso e em trânsito nativa",
      "Buckets de armazenamento públicos por erro de configuração",
      "Vendor lock-in (dependência do provedor)"
    ],
    corretas: [0, 1],
    explicacao: "Outras vantagens: redundância e disponibilidade, e monitoramento avançado com SIEM. Os desafios incluem responsabilidade compartilhada mal compreendida, soberania dos dados (LGPD), configurações incorretas e vendor lock-in.",
    porque: {
      2: "É um desafio: configuração incorreta é uma das principais causas de vazamento de dados.",
      3: "É um desafio: a migração entre provedores é complexa e custosa."
    }
  },
  {
    id: "gsc-132", disc: "gsc", unidade: 4, tema: "Soberania dos dados", tipo: "unica",
    enunciado: "Qual desafio de segurança em nuvem está ligado a requisitos regulatórios como a LGPD, que exigem controle sobre onde os dados são armazenados e processados?",
    opcoes: [
      "Soberania e localização dos dados",
      "Atualizações automáticas",
      "Redundância geográfica",
      "Monitoramento com SIEM"
    ],
    correta: 0,
    explicacao: "Em ambientes multirregião, saber onde o dado está e é processado pode ser complexo, mas é uma exigência regulatória.",
    porque: {
      1: "São uma vantagem, e não um desafio regulatório.",
      2: "É uma vantagem de disponibilidade, que pode inclusive complicar a localização dos dados.",
      3: "O SIEM dá visibilidade centralizada; não tem relação direta com localização de dados."
    }
  },
  {
    id: "gsc-133", disc: "gsc", unidade: 4, tema: "Algoritmo de Grover", tipo: "unica",
    enunciado: "O algoritmo de Grover oferece aceleração quadrática para buscas não estruturadas. Qual é o efeito disso sobre uma chave AES-256 diante de um atacante quântico?",
    opcoes: [
      "Reduz a segurança efetiva a 128 bits, o que ainda é considerado seguro",
      "Quebra completamente o AES em tempo polinomial",
      "Não tem nenhum efeito sobre algoritmos simétricos",
      "Reduz a segurança a zero bits"
    ],
    correta: 0,
    explicacao: "Grover reduz a força efetiva da simétrica pela metade, por isso a criptografia simétrica é menos vulnerável à ameaça quântica do que RSA, DSA e ECC.",
    porque: {
      1: "Quebra em tempo polinomial é o que Shor faz com a fatoração, e não o Grover com o AES.",
      2: "Há efeito: a força efetiva cai pela metade.",
      3: "Fica em 128 bits, nível ainda seguro."
    }
  },
  {
    id: "gsc-134", disc: "gsc", unidade: 4, tema: "Padrões pós-quânticos do NIST", tipo: "associacao",
    enunciado: "Associe cada algoritmo pós-quântico à sua função e base matemática.",
    pares: [
      ["CRYSTALS-Kyber", "Encapsulamento de chave, baseado em reticulados"],
      ["CRYSTALS-Dilithium", "Assinatura digital, baseada em reticulados"],
      ["SPHINCS+", "Assinatura digital, baseada em funções hash"]
    ],
    explicacao: "O SPHINCS+ é uma alternativa que não depende de suposições sobre reticulados."
  },
  {
    id: "gsc-135", disc: "gsc", unidade: 4, tema: "Crypto agility", tipo: "unica",
    enunciado: "O que é crypto agility?",
    opcoes: [
      "A capacidade de trocar algoritmos criptográficos de forma ágil quando necessário",
      "O uso de chaves criptográficas muito curtas para ganhar velocidade",
      "A técnica de esconder mensagens dentro de imagens",
      "Um tipo de certificado digital de curta duração"
    ],
    correta: 0,
    explicacao: "É a habilidade de adaptar rapidamente a infraestrutura criptográfica diante de vulnerabilidades ou novas ameaças, apoiada por um inventário dos ativos criptográficos. É essencial para migrar para algoritmos pós-quânticos.",
    porque: {
      1: "Chaves curtas enfraquecem a segurança.",
      2: "Isso é esteganografia.",
      3: "Não é um tipo de certificado."
    }
  },
  {
    id: "gsc-136", disc: "gsc", unidade: 4, tema: "Criptografia baseada em atributos (ABE)", tipo: "unica",
    enunciado: "Na criptografia baseada em atributos (ABE), os dados são cifrados:",
    opcoes: [
      "Segundo políticas baseadas em atributos, e não para destinatários específicos",
      "Apenas com a chave privada do remetente",
      "Sem uso de nenhuma chave",
      "Somente com funções hash"
    ],
    correta: 0,
    explicacao: "A ABE implementa controle de acesso refinado na própria camada criptográfica.",
    porque: {
      1: "Não é o princípio da ABE.",
      2: "Toda cifra usa chaves.",
      3: "Hash não cifra dados."
    }
  },
  {
    id: "gsc-137", disc: "gsc", unidade: 4, tema: "Escala de chaves simétricas", tipo: "unica",
    enunciado: "Quantas chaves simétricas distintas são necessárias para que 10 pessoas se comuniquem com segurança entre si, aos pares, usando n(n−1)/2?",
    opcoes: ["45", "10", "90", "20"],
    correta: 0,
    explicacao: "10 × 9 / 2 = 45. Esse crescimento é um problema de escala da simétrica; na assimétrica, cada pessoa precisa de apenas um par de chaves.",
    porque: {
      1: "Seria uma chave por pessoa, o que não permite comunicação segura em pares.",
      2: "É 10 × 9 sem dividir por 2.",
      3: "Não corresponde à fórmula."
    }
  },
  {
    id: "gsc-138", disc: "gsc", unidade: 4, tema: "Simétrica x assimétrica (comparação)", tipo: "multipla",
    enunciado: "Quais características pertencem à criptografia ASSIMÉTRICA? Marque todas as corretas.",
    opcoes: [
      "Utiliza um par de chaves, pública e privada",
      "É de 100 a 1000 vezes mais lenta que a simétrica",
      "Resolve o problema de distribuição de chaves",
      "Usa a mesma chave para cifrar e decifrar",
      "Exige n(n−1)/2 chaves para n partes"
    ],
    corretas: [0, 1, 2],
    explicacao: "Exemplos de assimétricas: RSA e ECC. A simétrica (AES, ChaCha20) é muito rápida, mas tem o problema de distribuir a chave.",
    porque: {
      3: "Isso descreve a simétrica.",
      4: "Essa escala é da simétrica; na assimétrica cada parte precisa de um par de chaves."
    }
  },
  {
    id: "gsc-139", disc: "gsc", unidade: 4, tema: "Modos de operação (GCM)", tipo: "unica",
    enunciado: "Qual modo de operação de cifras de bloco fornece simultaneamente confidencialidade e integridade dos dados, sendo muito usado no TLS 1.3?",
    opcoes: ["GCM (Galois/Counter Mode)", "ECB (Electronic Codebook)", "CBC (Cipher Block Chaining)", "CTR (Counter)"],
    correta: 0,
    explicacao: "O GCM combina cifragem e autenticação. Os outros modos citados no material são ECB, CBC e CTR.",
    porque: {
      1: "ECB é o modo mais simples e não fornece integridade.",
      2: "CBC fornece confidencialidade, mas não integridade por si só.",
      3: "CTR também não fornece integridade por si só."
    }
  },
  {
    id: "gsc-140", disc: "gsc", unidade: 4, tema: "Algoritmos simétricos", tipo: "associacao",
    enunciado: "Associe cada algoritmo simétrico à sua descrição.",
    pares: [
      ["AES", "Padrão do NIST (2001), chaves de 128, 192 ou 256 bits"],
      ["3DES", "Aplicação tripla do DES, segurança efetiva de 112 bits, em sistemas legados"],
      ["Blowfish", "Cifra de bloco de domínio público, chaves de até 448 bits, de Bruce Schneier"],
      ["ChaCha20", "Cifra de fluxo usada no TLS 1.3, ótima em dispositivos sem aceleração AES"]
    ],
    explicacao: "Todos usam a mesma chave para cifrar e decifrar."
  },
  {
    id: "gsc-141", disc: "gsc", unidade: 4, tema: "Modos da criptografia assimétrica", tipo: "associacao",
    enunciado: "Associe cada objetivo ao modo de operação da criptografia assimétrica.",
    pares: [
      ["Confidencialidade", "Cifra com a chave pública do destinatário"],
      ["Assinatura / autenticação", "Cifra com a chave privada do remetente"]
    ],
    explicacao: "Na confidencialidade, só o dono da chave privada decifra. Na assinatura, qualquer pessoa verifica com a chave pública, mas só o dono da privada poderia ter criado a assinatura."
  },
  {
    id: "gsc-142", disc: "gsc", unidade: 4, tema: "Algoritmos assimétricos", tipo: "associacao",
    enunciado: "Associe cada algoritmo assimétrico à sua característica.",
    pares: [
      ["RSA", "Baseado na fatoração de inteiros grandes (2048 a 4096 bits)"],
      ["DSA", "Especializado em assinaturas digitais (padrão DSS, do NIST)"],
      ["ECC", "Curvas elípticas: 256 bits equivalem a cerca de 3072 bits de RSA"],
      ["Diffie-Hellman", "Acordo de chave sobre um canal inseguro, sem transmitir a chave"]
    ],
    explicacao: "O ECC dá a mesma segurança com chaves bem menores, o que resulta em operações mais rápidas e menos overhead."
  },
  {
    id: "gsc-143", disc: "gsc", unidade: 4, tema: "Assinatura digital e hash", tipo: "unica",
    enunciado: "Em uma assinatura digital de uma mensagem longa, o que é efetivamente assinado com a chave privada?",
    opcoes: [
      "O hash da mensagem",
      "A mensagem inteira, para evitar perda de informação",
      "A chave pública do destinatário",
      "O certificado da CA raiz"
    ],
    correta: 0,
    explicacao: "Calcula-se o hash da mensagem e assina-se apenas o hash. É mais eficiente e preserva a integridade, pois qualquer mudança na mensagem muda o hash.",
    porque: {
      1: "Assinar a mensagem inteira seria lento; o hash resolve isso.",
      2: "A chave pública do destinatário serve para cifrar e não para assinar.",
      3: "O certificado raiz é assinado pela própria CA raiz."
    }
  },
  {
    id: "gsc-144", disc: "gsc", unidade: 4, tema: "Algoritmos de hash", tipo: "associacao",
    enunciado: "Associe cada algoritmo de hash à sua situação atual.",
    pares: [
      ["MD5", "Digest de 128 bits, inseguro por colisões conhecidas"],
      ["SHA-1", "Digest de 160 bits, depreciado para assinaturas após colisões práticas"],
      ["SHA-256 / SHA-512", "Família SHA-2, amplamente usada e considerada segura"],
      ["SHA-3", "Baseado na construção Keccak, alternativa independente ao SHA-2"]
    ],
    explicacao: "Para novas aplicações, usam-se SHA-2 ou SHA-3."
  },
  {
    id: "gsc-145", disc: "gsc", unidade: 4, tema: "Propriedades do hash", tipo: "associacao",
    enunciado: "Associe cada propriedade da função hash à sua definição.",
    pares: [
      ["Determinismo", "A mesma entrada sempre produz a mesma saída"],
      ["Resistência à pré-imagem", "Dado um hash h, é inviável achar m tal que hash(m) = h"],
      ["Resistência à segunda pré-imagem", "Dado m₁, é inviável achar m₂ ≠ m₁ com o mesmo hash"],
      ["Efeito avalanche", "Mudança mínima na entrada muda drasticamente o digest"]
    ],
    explicacao: "A resistência a colisões é mais forte: é inviável achar quaisquer m₁ ≠ m₂ com hash(m₁) = hash(m₂)."
  },
  {
    id: "gsc-146", disc: "gsc", unidade: 4, tema: "Aplicações de hash", tipo: "multipla",
    enunciado: "Quais são aplicações práticas de funções hash na segurança da informação? Marque todas as corretas.",
    opcoes: [
      "Verificação de integridade de arquivos",
      "Armazenamento seguro de senhas (com bcrypt, scrypt ou Argon2)",
      "Assinaturas digitais (assina-se o hash)",
      "Blockchain e criptomoedas (cadeia imutável, proof-of-work, Merkle trees)",
      "Cifrar grandes volumes de dados para depois decifrá-los com a mesma chave"
    ],
    corretas: [0, 1, 2, 3],
    explicacao: "Hash é de mão única: serve para verificar e ligar dados, e não para cifrar e decifrar.",
    porque: {
      4: "Isso descreve criptografia simétrica; hash não é reversível."
    }
  },
  {
    id: "gsc-147", disc: "gsc", unidade: 4, tema: "Campos do certificado X.509", tipo: "associacao",
    enunciado: "Associe cada componente de um certificado X.509 ao que ele representa.",
    pares: [
      ["Número de série", "Identificador único atribuído pela CA"],
      ["Emissor", "Identificação da CA emissora"],
      ["Sujeito", "Entidade para a qual o certificado foi emitido"],
      ["Validade", "Datas de início e término"],
      ["Assinatura", "Assinatura digital da CA sobre os campos anteriores"]
    ],
    explicacao: "O certificado também traz a versão do padrão, o algoritmo de assinatura e a informação da chave pública."
  },
  {
    id: "gsc-148", disc: "gsc", unidade: 4, tema: "Cadeia de confiança da PKI", tipo: "associacao",
    enunciado: "Associe cada tipo de certificado ao seu papel na cadeia de confiança.",
    pares: [
      ["Certificado raiz", "Auto-assinado, pertence à CA raiz"],
      ["Certificado intermediário", "Emitido pela CA raiz"],
      ["Certificado de entidade final", "Emitido por CAs intermediárias para usuários ou sistemas"]
    ],
    explicacao: "A confiança na CA raiz se estende transitivamente a todos os certificados que ela valida."
  },
  {
    id: "gsc-149", disc: "gsc", unidade: 4, tema: "Web of Trust (PGP/GPG)", tipo: "unica",
    enunciado: "No modelo Web of Trust, implementado pelo PGP/GPG, como a confiança é estabelecida?",
    opcoes: [
      "Os usuários assinam as chaves públicas uns dos outros, de forma descentralizada",
      "Por uma única CA raiz centralizada",
      "Por um servidor central que guarda as chaves privadas",
      "Não há nenhum mecanismo de confiança"
    ],
    correta: 0,
    explicacao: "Esse modelo elimina pontos únicos de falha, mas aumenta a complexidade de gerenciamento. O modelo hierárquico de PKI usa CAs.",
    porque: {
      1: "Isso descreve o modelo hierárquico de PKI.",
      2: "Chaves privadas nunca devem ser centralizadas.",
      3: "A confiança vem das assinaturas entre usuários."
    }
  },
  {
    id: "gsc-150", disc: "gsc", unidade: 4, tema: "Bits de segurança", tipo: "unica",
    enunciado: "Qual conjunto oferece aproximadamente 128 bits de segurança, segundo o material?",
    opcoes: ["AES-128, RSA-3072 e ECC-256", "AES-128, RSA-1024 e ECC-128", "AES-256, RSA-2048 e ECC-512", "3DES, RSA-512 e ECC-64"],
    correta: 0,
    explicacao: "Algoritmos diferentes exigem tamanhos de chave diferentes para a mesma força. Os bits de segurança são o log₂ do número de operações necessárias para quebrá-lo pelo melhor ataque conhecido.",
    porque: {
      1: "RSA-1024 está muito abaixo de 128 bits de segurança.",
      2: "Os tamanhos não se equivalem a 128 bits.",
      3: "Nenhum deles oferece 128 bits."
    }
  },
  {
    id: "gsc-151", disc: "gsc", unidade: 4, tema: "Recomendações da ISO/IEC 27002 sobre criptografia", tipo: "multipla",
    enunciado: "Quais recomendações a ISO/IEC 27002 faz sobre criptografia? Marque todas as corretas.",
    opcoes: [
      "Selecionar algoritmos adequados ao nível de classificação dos dados",
      "Gerenciar chaves de forma robusta, com rotação periódica",
      "Utilizar protocolos atualizados, como o TLS 1.3",
      "Manter inventário dos ativos criptográficos",
      "Usar o mesmo algoritmo e a mesma chave para todos os dados, para simplificar"
    ],
    corretas: [0, 1, 2, 3],
    explicacao: "Também é fundamental desenvolver crypto agility.",
    porque: {
      4: "Reutilizar a mesma chave para tudo amplia o impacto de um comprometimento; a escolha deve seguir a classificação dos dados."
    }
  },

  /* ---------------- Governança em TI · lote 2 ---------------- */
  {
    id: "gov-11", disc: "gov", unidade: 1, tema: "Retorno sobre o investimento (ROI)", tipo: "unica",
    enunciado: "Um projeto de automação custou R$ 200.000 e gerou R$ 260.000 em ganhos. Qual foi o ROI?",
    opcoes: ["23%", "30%", "60%", "130%"],
    correta: 1,
    explicacao: "ROI = (ganho − investimento) ÷ investimento = (260.000 − 200.000) ÷ 200.000 = 0,30, ou 30%. O ROI ajuda a governança a comparar iniciativas e justificar onde investir.",
    porque: {
      0: "23% seria dividir o lucro pelo ganho (60 ÷ 260), não pelo investimento.",
      2: "60 é o lucro em milhares de reais, não o percentual.",
      3: "130% é a razão ganho ÷ investimento, sem descontar o valor investido."
    }
  },
  {
    id: "gov-12", disc: "gov", unidade: 1, tema: "Compliance", tipo: "unica",
    enunciado: "No contexto de governança, compliance significa:",
    opcoes: [
      "Reduzir ao máximo o custo operacional da área de TI",
      "Estar em conformidade com leis, regulamentos, normas e políticas internas aplicáveis",
      "Entregar os projetos de TI antes do prazo",
      "Adotar sempre a tecnologia mais recente do mercado"
    ],
    correta: 1,
    explicacao: "Compliance vem de \"to comply\": cumprir. É o conjunto de práticas que garante que a organização segue as regras externas (como LGPD e SOX) e internas (políticas, códigos de conduta), e consegue comprovar isso.",
    porque: {
      0: "Isso é eficiência de custos, não conformidade.",
      2: "Isso é desempenho de projetos.",
      3: "Atualização tecnológica não tem relação direta com conformidade."
    }
  },
  {
    id: "gov-13", disc: "gov", unidade: 1, tema: "Papel da governança", tipo: "vf",
    enunciado: "A governança de TI é responsabilidade exclusiva do gerente de TI, cabendo à alta administração apenas aprovar o orçamento anual da área.",
    correta: false,
    explicacao: "A governança de TI é parte da governança corporativa e responsabilidade da alta administração (conselho e diretoria), que avalia, dirige e monitora o uso da TI. O gerente de TI atua na gestão, executando a direção definida."
  },
  {
    id: "gov-14", disc: "gov", unidade: 2, tema: "PEI x PETIC", tipo: "unica",
    enunciado: "Qual é a relação correta entre o Planejamento Estratégico Institucional (PEI) e o Planejamento Estratégico de TIC (PETIC)?",
    opcoes: [
      "O PETIC é elaborado primeiro e o PEI se adapta à tecnologia disponível",
      "O PETIC deriva do PEI e define como a TI vai apoiar os objetivos estratégicos da organização",
      "São documentos independentes, feitos por áreas que não precisam conversar",
      "O PETIC substitui o PEI nas organizações de base tecnológica"
    ],
    correta: 1,
    explicacao: "Primeiro a organização define para onde vai (PEI). O PETIC desdobra isso para a TI: que iniciativas, recursos e capacidades de tecnologia são necessários para sustentar cada objetivo. Esse encadeamento é o alinhamento estratégico na prática.",
    porque: {
      0: "A estratégia do negócio orienta a TI, não o contrário.",
      2: "Planos desconectados são justamente o sintoma de falta de alinhamento.",
      3: "O PETIC complementa o PEI; não o substitui."
    }
  },
  {
    id: "gov-15", disc: "gov", unidade: 2, tema: "Normas (ISO)", tipo: "associacao",
    enunciado: "Associe cada norma ao seu assunto principal.",
    pares: [
      ["ISO/IEC 27001", "Requisitos para um sistema de gestão de segurança da informação"],
      ["ISO/IEC 27002", "Catálogo de controles de segurança da informação"],
      ["ISO/IEC 20000", "Gerenciamento de serviços de TI"],
      ["ISO/IEC 38500", "Governança corporativa de TI"]
    ],
    explicacao: "A 27001 traz requisitos e é certificável; a 27002 detalha os controles que apoiam a 27001. A 20000 trata de serviços de TI (bem próxima da ITIL) e a 38500 dá princípios de governança de TI para a alta direção."
  },
  {
    id: "gov-16", disc: "gov", unidade: 3, tema: "ITIL 4 (cadeia de valor de serviço)", tipo: "unica",
    enunciado: "Qual das opções abaixo NÃO é uma das atividades da cadeia de valor de serviço da ITIL 4?",
    opcoes: ["Engajar", "Obter/construir", "Entregar e suportar", "Auditar"],
    correta: 3,
    explicacao: "As seis atividades são: planejar, melhorar, engajar, desenho e transição, obter/construir e entregar e suportar. Auditoria pode acontecer dentro delas, mas não é uma atividade da cadeia.",
    porque: {
      0: "Engajar é a atividade de relacionamento com as partes interessadas.",
      1: "Obter/construir garante que os componentes do serviço estejam disponíveis.",
      2: "Entregar e suportar garante que o serviço seja entregue conforme o combinado."
    }
  },
  {
    id: "gov-17", disc: "gov", unidade: 3, tema: "ITIL (gerenciamento de disponibilidade)", tipo: "unica",
    enunciado: "Um acordo de nível de serviço (SLA) define disponibilidade de 99% para um sistema que opera 24 horas por dia. Em um mês de 30 dias, qual é o tempo máximo de indisponibilidade tolerado?",
    opcoes: ["43 minutos", "3,6 horas", "7,2 horas", "72 horas"],
    correta: 2,
    explicacao: "30 dias × 24 h = 720 horas. O 1% permitido de indisponibilidade equivale a 7,2 horas no mês. Cada \"nove\" a mais reduz muito essa margem: com 99,9% seriam cerca de 43 minutos.",
    porque: {
      0: "43 minutos corresponde a um SLA de 99,9%.",
      1: "3,6 horas corresponderia a 99,5%.",
      3: "72 horas seria 10% do mês, ou seja, 90% de disponibilidade."
    }
  },
  {
    id: "gov-18", disc: "gov", unidade: 4, tema: "Resistência à governança", tipo: "unica",
    enunciado: "Ao implantar novos controles de governança, a equipe reage dizendo que \"isso é só burocracia\". Qual abordagem tende a reduzir essa resistência?",
    opcoes: [
      "Impor os controles sem explicação, para ganhar tempo",
      "Comunicar o propósito, capacitar as pessoas e envolvê-las na definição dos processos",
      "Suspender a implantação até que não exista mais nenhuma reclamação",
      "Aplicar os controles apenas aos colaboradores recém-contratados"
    ],
    correta: 1,
    explicacao: "Resistência costuma vir de não entender o porquê e de sentir que a mudança foi imposta. Comunicação clara, treinamento e participação constroem uma cultura de governança, em vez de mera obediência a regras.",
    porque: {
      0: "Imposição sem explicação reforça a percepção de burocracia.",
      2: "Esperar consenso total paralisa a iniciativa.",
      3: "Governança parcial cria tratamento desigual e não resolve o problema."
    }
  },

  /* ---------------- Governança em TI · Unidade 1: "Governança: por que precisamos?" ---------------- */
  {
    id: "gov-19", disc: "gov", unidade: 1, tema: "Caso Enron (a fraude)", tipo: "unica",
    enunciado: "A Enron era vista como uma empresa de energia forte e inovadora, até que se descobriu como seus resultados eram produzidos. Em que consistia, basicamente, a fraude?",
    opcoes: [
      "Vendia energia abaixo do custo para eliminar os concorrentes",
      "Registrava receitas futuras como lucro já realizado e transferia dívidas e prejuízos para empresas de fachada",
      "Deixava de pagar impostos por não emitir notas fiscais",
      "Usava software sem licença em toda a operação"
    ],
    correta: 1,
    explicacao: "A empresa contabilizava como vendido o que ainda iria vender, inflando os lucros, e escondia dívidas e prejuízos em empresas de fachada. O balanço mostrava uma situação fictícia, que enganou o mercado enquanto os gestores recebiam bônus milionários.",
    porque: {
      0: "O problema não foi a política de preços, e sim a contabilidade fantasiosa.",
      2: "O escândalo foi de manipulação de balanços, não de sonegação por falta de notas.",
      3: "Licenciamento de software não tem relação com o caso."
    }
  },
  {
    id: "gov-20", disc: "gov", unidade: 1, tema: "Caso Enron (auditoria)", tipo: "unica",
    enunciado: "A Arthur Andersen, empresa que auditava a Enron, participou das fraudes e chegou a esconder e destruir documentos. O que esse desfecho ensina sobre governança?",
    opcoes: [
      "Auditorias externas são dispensáveis quando a empresa dá lucro",
      "A auditoria só cumpre seu papel se for independente e confiável; sem isso, deixa de ser um mecanismo de controle",
      "A auditoria deve ser subordinada aos gestores que ela fiscaliza",
      "Destruir documentos é aceitável quando protege o valor das ações"
    ],
    correta: 1,
    explicacao: "Confiabilidade é pré-requisito de qualquer empresa de auditoria. Ao se envolver na fraude, a Arthur Andersen perdeu essa condição e acabou fechando. Um controle que se alia a quem deveria fiscalizar não controla nada.",
    porque: {
      0: "O caso mostra o contrário: o lucro aparente era justamente o que precisava ser verificado.",
      2: "Subordinar o auditor ao auditado cria o conflito de interesses que permitiu a fraude.",
      3: "A destruição de documentos foi parte do crime e levou ao fim da própria auditoria."
    }
  },
  {
    id: "gov-21", disc: "gov", unidade: 1, tema: "Lei Sarbanes-Oxley (papel dos conselhos)", tipo: "unica",
    enunciado: "Antes da Lei Sarbanes-Oxley, os conselhos das empresas praticamente só referendavam o que os gestores faziam. O que mudou com a lei?",
    opcoes: [
      "Os conselhos foram extintos e os gestores passaram a decidir sozinhos",
      "Executivos e conselhos passaram a responder pelo controle e monitoramento da gestão, com controles internos fortalecidos",
      "As empresas ficaram dispensadas de divulgar suas informações financeiras",
      "A responsabilidade pelos balanços passou a ser somente da auditoria externa"
    ],
    correta: 1,
    explicacao: "A SOX nasceu dos escândalos da Enron e de outras empresas, como a WorldCom, para aumentar a transparência e a responsabilidade. Executivos e conselhos passaram a ser cobrados pelo controle da gestão, e os controles internos ganharam força, o que ajudou a restaurar a confiança do mercado.",
    porque: {
      0: "Os conselhos ganharam responsabilidade, em vez de desaparecer.",
      2: "A lei aumentou a exigência de transparência.",
      3: "A lei reforçou a responsabilidade dos próprios executivos e conselhos."
    }
  },
  {
    id: "gov-22", disc: "gov", unidade: 1, tema: "O que faltou nos casos Enron e subprime", tipo: "associacao",
    enunciado: "Os casos Enron e subprime mostram a falta de quatro aspectos da governança. Associe cada aspecto à situação que revela sua ausência.",
    pares: [
      ["Transparência", "As empresas escondiam do mercado seus problemas financeiros"],
      ["Prestação de contas", "Ninguém relatava à alta gestão o que estava acontecendo"],
      ["Gestão de riscos", "Emprestava-se a quem não podia pagar, de olho só no lucro imediato"],
      ["Conformidade", "Leis e normas eram ignoradas, porque não havia punição"]
    ],
    explicacao: "Transparência, prestação de contas, gestão de riscos e conformidade são os quatro aspectos que faltaram nos dois casos. A saída encontrada foi mais controle e mais transparência, que é o que a governança entrega."
  },
  {
    id: "gov-23", disc: "gov", unidade: 1, tema: "Crise do subprime (premissa dos bancos)", tipo: "unica",
    enunciado: "Na crise das hipotecas, os bancos emprestaram em massa a pessoas sem capacidade de pagamento. Em que premissa eles se apoiavam, e por que ela falhou?",
    opcoes: [
      "Que o governo proibiria a inadimplência; falhou porque a lei não foi aprovada",
      "Que, mesmo sem receber, ficariam com imóveis valorizados; falhou porque a retomada em massa derrubou os preços",
      "Que os juros cairiam a zero; falhou porque os juros dobraram",
      "Que os clientes pagariam à vista; falhou porque preferiram parcelar"
    ],
    correta: 1,
    explicacao: "A aposta era que o imóvel sempre valeria mais do que a dívida. Com a inadimplência, milhares de imóveis foram retomados ao mesmo tempo, sobrou oferta e os preços despencaram. Títulos e empréstimos deixaram de ser pagos e os bancos começaram a quebrar.",
    porque: {
      0: "Não havia essa expectativa; o problema foi justamente a falta de regulamentação.",
      2: "A premissa central era a valorização contínua dos imóveis, não o nível dos juros.",
      3: "Os imóveis eram financiados; a questão foi a incapacidade de pagar as hipotecas."
    }
  },
  {
    id: "gov-24", disc: "gov", unidade: 1, tema: "Ganhos esperados com a governança", tipo: "multipla",
    enunciado: "Quais são ganhos esperados com a adoção de boa governança? Marque todos os corretos.",
    opcoes: [
      "Aumento da confiança dos investidores",
      "Redução de conflitos de interesses entre gestores e acionistas",
      "Melhoria da eficiência operacional e do controle",
      "Eliminação completa de todos os riscos do negócio",
      "Dispensa de auditorias e de prestação de contas"
    ],
    corretas: [0, 1, 2],
    explicacao: "Governança traz conformidade, transparência e gestão responsável. Isso aumenta a confiança dos investidores (e, por consequência, o valor da empresa), alinha os interesses da alta gestão aos dos acionistas e melhora a eficiência e a supervisão.",
    porque: {
      3: "A governança gerencia e reduz riscos; não existe eliminação completa.",
      4: "Auditoria e prestação de contas são instrumentos da governança, não algo que ela dispensa."
    }
  },
  {
    id: "gov-25", disc: "gov", unidade: 1, tema: "Depois da SOX", tipo: "vf",
    enunciado: "Com a aprovação da Lei Sarbanes-Oxley, os escândalos financeiros causados por falta de controle chegaram ao fim.",
    correta: false,
    explicacao: "A SOX trouxe avanços e ajudou a restaurar a confiança, mas não bastou. Em 2008 veio a crise do subprime, com empréstimos a quem não podia pagar e pouca regulamentação. Leis ajudam, mas precisam de regulamentação e de governança efetiva."
  },
  {
    id: "gov-26", disc: "gov", unidade: 1, tema: "Gestão operacional não basta", tipo: "unica",
    enunciado: "Com a transformação digital, as empresas dependem cada vez mais de tecnologia. Por que uma gestão com foco apenas operacional deixa de ser suficiente?",
    opcoes: [
      "Porque a operação perde importância e pode ser abandonada",
      "Porque alguém precisa controlar a gestão, corrigir rumos e avaliar custos, riscos e retorno sobre o investimento",
      "Porque a tecnologia elimina a necessidade de tomar decisões",
      "Porque só empresas de tecnologia precisam de controle"
    ],
    correta: 1,
    explicacao: "A gestão cuida do dia a dia. As perguntas que ela sozinha não responde (quem controla a gestão, o que fazer quando o rumo está errado, quanto custa não controlar, qual o retorno) são o campo da governança.",
    porque: {
      0: "A operação continua essencial; o que falta é uma camada de direção e controle acima dela.",
      2: "Mais tecnologia aumenta a quantidade e o peso das decisões.",
      3: "A necessidade de controle vale para qualquer organização."
    }
  },
  {
    id: "gov-27", disc: "gov", unidade: 1, tema: "Governança e valor da empresa", tipo: "lacuna",
    enunciado: "Complete o raciocínio sobre os efeitos da boa governança.",
    texto: "Quando a empresa comprova que é bem controlada, cresce a {{1}} dos investidores, o que tende a aumentar o seu {{2}}. Além disso, auditorias e outros mecanismos reduzem os {{3}} entre a alta gestão e os acionistas.",
    banco: ["confiança", "valor de mercado", "conflitos de interesses", "endividamento", "bônus"],
    corretas: ["confiança", "valor de mercado", "conflitos de interesses"],
    explicacao: "O encadeamento é: controle e transparência geram confiança; confiança aumenta o valor da empresa; e interesses alinhados dificultam fraudes e decisões que favorecem os gestores em prejuízo dos acionistas."
  },
  {
    id: "gov-28", disc: "gov", unidade: 1, tema: "Crise do subprime (quem pagou a conta)", tipo: "unica",
    enunciado: "Sobre a crise de 2008, costuma-se dizer que \"os lucros foram privados e os prejuízos, socializados\". O que essa frase significa?",
    opcoes: [
      "Os lucros foram divididos igualmente entre toda a população",
      "Os ganhos ficaram com instituições e gestores, e as perdas foram cobertas com dinheiro público",
      "O governo lucrou com a crise e as empresas ficaram com as perdas",
      "As empresas privadas foram proibidas de ter lucro depois da crise"
    ],
    correta: 1,
    explicacao: "Enquanto o esquema funcionou, bancos e executivos ficaram com lucros e bônus. Quando quebrou, foi preciso intervenção governamental, paga com o dinheiro dos impostos. É o argumento central a favor de regulamentação e governança: lucrar, mas de forma responsável.",
    porque: {
      0: "Os lucros ficaram concentrados em quem operava o esquema.",
      2: "Foi o inverso: o poder público arcou com o prejuízo.",
      3: "Não houve proibição de lucro; a discussão é sobre regras e responsabilidade."
    }
  },

  /* ---------------- Estudos Avançados em GTI · lote 2 ---------------- */
  {
    id: "eag-11", disc: "eag", unidade: 1, tema: "Laço de repetição (teste de mesa)", tipo: "unica",
    enunciado: "Considere que \"div\" é a divisão inteira. O que o trecho abaixo escreve?",
    codigo: "n = 10\ncont = 0\nenquanto n > 1 faça\n    n = n div 2\n    cont = cont + 1\nescreva cont",
    opcoes: ["2", "3", "4", "5"],
    correta: 1,
    explicacao: "Teste de mesa: n = 10 → 5 (cont 1) → 2 (cont 2) → 1 (cont 3). Com n = 1 a condição n > 1 é falsa e o laço termina. Escreve 3.",
    porque: {
      0: "Faltou contar a última passagem, de 2 para 1.",
      2: "O laço não executa quando n já vale 1.",
      3: "5 é o valor de n após a primeira divisão, não o contador."
    }
  },
  {
    id: "eag-12", disc: "eag", unidade: 1, tema: "Equação de tempo de CPU", tipo: "unica",
    enunciado: "Um programa executa 2 bilhões de instruções, com média de 2 ciclos por instrução, em um processador de 2 GHz. Qual é o tempo de CPU?",
    opcoes: ["0,5 segundo", "1 segundo", "2 segundos", "4 segundos"],
    correta: 2,
    explicacao: "Tempo de CPU = instruções × ciclos por instrução ÷ frequência = (2 × 10⁹ × 2) ÷ (2 × 10⁹) = 2 segundos. Para reduzir o tempo, dá para diminuir instruções, baixar o CPI ou aumentar o clock.",
    porque: {
      0: "Esse valor inverte parte da conta, dividindo quando deveria multiplicar pelo CPI.",
      1: "Seria o resultado com CPI igual a 1.",
      3: "Seria o resultado com um processador de 1 GHz."
    }
  },
  {
    id: "eag-13", disc: "eag", unidade: 2, tema: "Carga da plataforma analítica (ETL)", tipo: "unica",
    enunciado: "Ao carregar dados de três sistemas em um data warehouse, a equipe encontra o campo sexo preenchido como \"M\", \"Masc\" e \"masculino\". Em que etapa do ETL esses valores são padronizados?",
    opcoes: ["Extração", "Transformação", "Carga", "Visualização"],
    correta: 1,
    explicacao: "Na transformação os dados são limpos, padronizados e convertidos para um formato único antes de entrar no data warehouse. Sem isso, as análises contam a mesma categoria como se fossem três.",
    porque: {
      0: "A extração apenas coleta os dados das fontes, como estão.",
      2: "A carga grava os dados já tratados no destino.",
      3: "Visualização não faz parte do ETL; vem depois, nas ferramentas de BI."
    }
  },
  {
    id: "eag-14", disc: "eag", unidade: 2, tema: "Sistema integrado de gestão (ERP)", tipo: "unica",
    enunciado: "Uma empresa usa um sistema para vendas, outro para estoque e outro para o financeiro, e os dados são redigitados entre eles. Qual é o principal ganho de adotar um ERP?",
    opcoes: [
      "Eliminar a necessidade de treinar os usuários",
      "Integrar os processos em uma base de dados única, reduzindo retrabalho e inconsistências",
      "Garantir que a empresa nunca mais precise de suporte de TI",
      "Substituir o planejamento estratégico da organização"
    ],
    correta: 1,
    explicacao: "O ERP integra os processos transacionais das áreas sobre uma mesma base de dados. Uma venda registrada atualiza estoque e financeiro automaticamente, sem redigitação.",
    porque: {
      0: "A implantação de ERP exige bastante treinamento e gestão da mudança.",
      2: "Sistemas integrados continuam exigindo suporte e manutenção.",
      3: "O ERP apoia a operação; não define a estratégia."
    }
  },
  {
    id: "eag-15", disc: "eag", unidade: 3, tema: "Planejamento de entregas com Scrum", tipo: "unica",
    enunciado: "No meio de uma sprint, um diretor pede diretamente a um desenvolvedor que inclua uma nova funcionalidade \"para ontem\". Segundo o Scrum, qual é o encaminhamento adequado?",
    opcoes: [
      "O desenvolvedor inclui a funcionalidade e avisa o time na próxima daily",
      "O pedido vai ao Product Owner, que o avalia e prioriza no backlog do produto",
      "O Scrum Master decide sozinho se a funcionalidade entra na sprint",
      "A sprint é cancelada automaticamente sempre que surge um pedido novo"
    ],
    correta: 1,
    explicacao: "O Product Owner é o responsável por ordenar o backlog do produto e maximizar o valor entregue. Mudanças que ameaçam a meta da sprint não entram no meio dela; são priorizadas para as próximas.",
    porque: {
      0: "Aceitar pedidos por fora quebra o compromisso do time com a meta da sprint.",
      2: "O Scrum Master facilita o processo, mas não decide prioridades de produto.",
      3: "Cancelar a sprint é exceção, decidida pelo Product Owner quando a meta perde o sentido."
    }
  },
  {
    id: "eag-16", disc: "eag", unidade: 4, tema: "Arranjos decisórios", tipo: "unica",
    enunciado: "Em uma empresa, as decisões sobre investimentos em TI são tomadas em conjunto pelos executivos de TI e pelos líderes de uma unidade de negócio. Na classificação de arranjos decisórios de Weill e Ross, esse modelo é chamado de:",
    opcoes: ["Monarquia de TI", "Duopólio de TI", "Feudalismo", "Anarquia"],
    correta: 1,
    explicacao: "No duopólio, a decisão resulta de um acordo entre os executivos de TI e outro grupo (em geral, líderes de negócio). É um arranjo que favorece o alinhamento porque as duas partes dividem a decisão.",
    porque: {
      0: "Na monarquia de TI, apenas os profissionais de TI decidem.",
      2: "No feudalismo, cada unidade de negócio decide por conta própria.",
      3: "Na anarquia, indivíduos ou pequenos grupos decidem isoladamente, conforme sua necessidade."
    }
  },

  /* ============================================================
     SIMULADO ENADE · questões inéditas no estilo da prova
     Componente específico: um item para cada objeto de conhecimento
     da Portaria Inep nº 171/2026 (GTI). Formação geral: ética,
     cidadania, direitos humanos e responsabilidade social.
     ============================================================ */

  /* ---------------- ENADE · Componente específico ---------------- */
  {
    id: "en-01", disc: "enade", unidade: "Componente específico", tema: "Algoritmos", tipo: "unica",
    enunciado: "Um analista escreveu o algoritmo abaixo para conferir um relatório. Considere que \"mod\" é o resto da divisão inteira. Qual valor será escrito?",
    codigo: "soma = 0\npara i de 1 até 5 faça\n    se i mod 2 == 1 então\n        soma = soma + i\nescreva soma",
    opcoes: ["6", "9", "15", "5"],
    correta: 1,
    explicacao: "A condição i mod 2 == 1 só é verdadeira para os ímpares. O laço soma 1 + 3 + 5 = 9.",
    porque: {
      0: "6 é a soma dos pares (2 + 4), que a condição descarta.",
      2: "15 seria a soma de todos os valores de 1 a 5, sem a condição.",
      3: "5 é apenas o último valor de i, não o acumulado."
    }
  },
  {
    id: "en-02", disc: "enade", unidade: "Componente específico", tema: "Arquitetura de computadores", tipo: "unica",
    enunciado: "Um servidor de aplicação ficou muito lento. O monitoramento mostra processador com uso baixo, memória RAM totalmente ocupada e disco com atividade intensa e constante. Qual é a explicação mais provável?",
    opcoes: [
      "O processador está subdimensionado para a carga",
      "Falta memória RAM e o sistema está usando área de troca em disco, que é muito mais lenta",
      "A placa de rede está limitando a velocidade do processador",
      "A memória cache do processador está desativada"
    ],
    correta: 1,
    explicacao: "Quando a RAM se esgota, o sistema operacional move páginas de memória para o disco (memória virtual). Como o disco é ordens de grandeza mais lento que a RAM, o desempenho despenca mesmo com CPU ociosa. A solução passa por mais RAM ou por reduzir o consumo.",
    porque: {
      0: "Se o processador fosse o gargalo, o uso de CPU estaria alto.",
      2: "Rede não explica RAM cheia e disco em atividade constante.",
      3: "Cache desativada elevaria o uso de CPU, sem relação com o disco."
    }
  },
  {
    id: "en-03", disc: "enade", unidade: "Componente específico", tema: "Sistemas operacionais", tipo: "unica",
    enunciado: "O processo A bloqueou o arquivo de clientes e aguarda a liberação do arquivo de pedidos. O processo B bloqueou o arquivo de pedidos e aguarda a liberação do arquivo de clientes. Nenhum dos dois avança. Essa situação é chamada de:",
    opcoes: ["Inanição (starvation)", "Impasse (deadlock)", "Condição de corrida", "Troca de contexto"],
    correta: 1,
    explicacao: "No deadlock há espera circular: cada processo segura um recurso e espera outro que está com o processo seguinte do ciclo. Sem intervenção (ou sem uma política de prevenção, como ordem fixa de bloqueio), nenhum prossegue.",
    porque: {
      0: "Na inanição um processo espera indefinidamente porque outros sempre têm prioridade, sem espera circular.",
      2: "Condição de corrida é o resultado depender da ordem de execução em acesso concorrente sem controle.",
      3: "Troca de contexto é a operação normal de alternar a CPU entre processos."
    }
  },
  {
    id: "en-04", disc: "enade", unidade: "Componente específico", tema: "Banco de dados", tipo: "unica",
    enunciado: "Uma tabela de pedidos tem a chave primária id_pedido e as colunas data, id_cliente, nome_cliente e cidade_cliente. O nome e a cidade dependem de id_cliente, e não diretamente de id_pedido. Qual forma normal está sendo violada e como corrigir?",
    opcoes: [
      "Primeira forma normal; basta remover a coluna data",
      "Segunda forma normal; é preciso criar uma chave composta",
      "Terceira forma normal; os dados do cliente devem ir para uma tabela própria",
      "Nenhuma; a tabela já está normalizada"
    ],
    correta: 2,
    explicacao: "Há dependência transitiva: id_pedido → id_cliente → nome_cliente. A 3FN exige que atributos não chave dependam apenas da chave. Separar uma tabela de clientes evita repetir e desatualizar o nome a cada pedido.",
    porque: {
      0: "A 1FN trata de valores atômicos e grupos repetitivos, que não aparecem aqui.",
      1: "A 2FN trata de dependência parcial de chave composta; a chave aqui é simples.",
      3: "A redundância dos dados do cliente mostra que há anomalias de atualização."
    }
  },
  {
    id: "en-05", disc: "enade", unidade: "Componente específico", tema: "Engenharia de software", tipo: "unica", fixa: true,
    enunciado: "Na especificação de um sistema de matrículas, avalie as afirmações:\n\nI. \"O sistema deve emitir o comprovante de matrícula em PDF\" é um requisito funcional.\nII. \"As páginas devem carregar em até 2 segundos\" é um requisito não funcional.\nIII. \"O sistema deve estar disponível 99,5% do tempo\" é um requisito funcional.\n\nÉ correto o que se afirma em:",
    opcoes: ["I, apenas", "I e II, apenas", "II e III, apenas", "I, II e III"],
    correta: 1,
    explicacao: "Requisito funcional descreve o que o sistema faz (emitir comprovante). Requisito não funcional descreve qualidades e restrições: desempenho, disponibilidade, segurança, usabilidade. Por isso a afirmação III está errada: disponibilidade é não funcional.",
    porque: {
      0: "A afirmação II também está correta.",
      2: "A III está errada, e a I está correta.",
      3: "A III classifica disponibilidade como funcional, o que é incorreto."
    }
  },
  {
    id: "en-06", disc: "enade", unidade: "Componente específico", tema: "Gestão de projetos", tipo: "unica",
    enunciado: "Um projeto tem quatro atividades: A (3 dias) é a primeira; B (4 dias) e C (6 dias) começam depois de A e podem ocorrer em paralelo; D (2 dias) só começa quando B e C terminam. Qual é a duração mínima do projeto e que atividade tem folga?",
    opcoes: [
      "9 dias; C tem folga de 2 dias",
      "11 dias; B tem folga de 2 dias",
      "15 dias; nenhuma atividade tem folga",
      "11 dias; C tem folga de 2 dias"
    ],
    correta: 1,
    explicacao: "Caminhos: A-B-D = 3 + 4 + 2 = 9 dias; A-C-D = 3 + 6 + 2 = 11 dias. O caminho crítico é o mais longo (A-C-D), que define os 11 dias. B pode atrasar até 2 dias sem afetar o prazo.",
    porque: {
      0: "9 dias é o caminho mais curto; o projeto só termina quando o mais longo termina.",
      2: "15 dias seria somar tudo, ignorando que B e C ocorrem em paralelo.",
      3: "C está no caminho crítico, então não tem folga."
    }
  },
  {
    id: "en-07", disc: "enade", unidade: "Componente específico", tema: "Gestão de pessoas", tipo: "unica",
    enunciado: "Uma analista sênior domina a tecnologia do projeto, está motivada e entrega com autonomia. Mesmo assim, o gestor acompanha cada tarefa dela em detalhe e exige aprovação para todas as decisões técnicas. Pela liderança situacional, qual estilo seria mais adequado a essa profissional?",
    opcoes: [
      "Direção: dizer exatamente o que fazer e como",
      "Delegação: definir os resultados esperados e dar autonomia",
      "Ausência: deixar de acompanhar o trabalho por completo",
      "Persuasão: explicar cada decisão já tomada pelo gestor"
    ],
    correta: 1,
    explicacao: "A liderança situacional ajusta o estilo à maturidade do liderado. Para alta competência e alto comprometimento, o indicado é delegar: combinar objetivos e acompanhar resultados. Microgerenciar quem já tem autonomia costuma gerar desmotivação.",
    porque: {
      0: "Direção cabe a quem ainda não tem competência na tarefa.",
      2: "Delegar não é abandonar; o gestor continua responsável pelos resultados.",
      3: "Persuasão cabe a quem ainda está desenvolvendo a competência e precisa de orientação próxima."
    }
  },
  {
    id: "en-08", disc: "enade", unidade: "Componente específico", tema: "Gerenciamento de serviços de TI", tipo: "unica", fixa: true,
    enunciado: "Toda segunda-feira o sistema de ponto trava. A central de serviços reinicia o servidor e o sistema volta. Avalie as asserções e a relação entre elas:\n\nI. Reiniciar o servidor a cada ocorrência é uma ação coerente com o gerenciamento de incidentes.\n\nPORQUE\n\nII. O gerenciamento de incidentes tem como objetivo identificar e eliminar a causa raiz das falhas recorrentes.",
    opcoes: [
      "As asserções I e II são verdadeiras, e a II justifica a I",
      "As asserções I e II são verdadeiras, mas a II não justifica a I",
      "A asserção I é verdadeira e a II é falsa",
      "A asserção I é falsa e a II é verdadeira"
    ],
    correta: 2,
    explicacao: "O gerenciamento de incidentes busca restaurar o serviço o mais rápido possível, então reiniciar é coerente (I verdadeira). Investigar e eliminar a causa raiz é papel do gerenciamento de problemas, não de incidentes (II falsa). A recorrência semanal indica que falta abrir um problema.",
    porque: {
      0: "A II descreve o gerenciamento de problemas.",
      1: "A II é falsa, então não pode ser considerada verdadeira.",
      3: "A I está correta: restaurar o serviço é o foco do tratamento de incidentes."
    }
  },
  {
    id: "en-09", disc: "enade", unidade: "Componente específico", tema: "Tecnologias de inteligência de negócios", tipo: "associacao",
    enunciado: "Uma rede de lojas vai montar um ambiente de inteligência de negócios. Associe cada elemento à sua função.",
    pares: [
      ["Tabela fato", "Guarda as medidas numéricas, como valor e quantidade vendida"],
      ["Tabela dimensão", "Descreve o contexto da análise, como produto, loja e período"],
      ["ETL", "Extrai, trata e carrega os dados vindos dos sistemas de origem"],
      ["OLAP", "Permite cruzar os dados por várias perspectivas e níveis de detalhe"]
    ],
    explicacao: "No modelo estrela, a tabela fato fica no centro com as métricas e se liga às dimensões, que respondem \"o quê, onde, quando\". O ETL alimenta o data warehouse e o OLAP permite operações como drill-down e roll-up."
  },
  {
    id: "en-10", disc: "enade", unidade: "Componente específico", tema: "Governança de TI", tipo: "unica", fixa: true,
    enunciado: "Sobre a distinção entre governança e gestão de TI, avalie as afirmações:\n\nI. Decidir quais projetos de TI recebem investimento, de acordo com a estratégia da organização, é uma decisão de governança.\nII. Corrigir um erro em um sistema em produção é uma atividade de governança.\nIII. Monitorar se a TI está entregando o valor esperado ao negócio é responsabilidade da governança.\n\nÉ correto o que se afirma em:",
    opcoes: ["I, apenas", "II, apenas", "I e III, apenas", "I, II e III"],
    correta: 2,
    explicacao: "Governança avalia, dirige e monitora: define prioridades de investimento (I) e acompanha a entrega de valor (III). Corrigir um erro em produção é operação do dia a dia, portanto gestão (II está errada).",
    porque: {
      0: "A III também está correta.",
      1: "A II descreve uma atividade de gestão operacional.",
      3: "A II não é atividade de governança."
    }
  },
  {
    id: "en-11", disc: "enade", unidade: "Componente específico", tema: "Gestão estratégica organizacional", tipo: "unica",
    enunciado: "Uma empresa adota o Balanced Scorecard (BSC). O indicador \"horas de capacitação por colaborador da TI\" pertence a qual perspectiva?",
    opcoes: ["Financeira", "Clientes", "Processos internos", "Aprendizado e crescimento"],
    correta: 3,
    explicacao: "A perspectiva de aprendizado e crescimento reúne pessoas, competências, cultura e infraestrutura que sustentam as demais. A lógica do BSC é encadeada: pessoas capacitadas melhoram processos, que satisfazem clientes, que geram resultado financeiro.",
    porque: {
      0: "A financeira mede receita, custos, margem e retorno.",
      1: "A de clientes mede satisfação, retenção e participação de mercado.",
      2: "A de processos internos mede eficiência e qualidade das operações."
    }
  },
  {
    id: "en-12", disc: "enade", unidade: "Componente específico", tema: "Processos organizacionais", tipo: "unica",
    enunciado: "A diretoria quer automatizar o processo de compras, que hoje tem aprovações duplicadas e muito retrabalho. Qual deve ser o primeiro passo da equipe de TI?",
    opcoes: [
      "Comprar a ferramenta de automação mais usada no mercado",
      "Mapear o processo atual (AS-IS) para identificar gargalos e etapas que não agregam valor",
      "Programar o sistema exatamente como o processo funciona hoje",
      "Desenhar o processo futuro (TO-BE) sem consultar quem executa as atividades"
    ],
    correta: 1,
    explicacao: "Automatizar um processo ruim só faz o problema acontecer mais rápido. Primeiro se entende a situação atual (AS-IS), depois se redesenha (TO-BE) eliminando desperdícios, e só então se automatiza.",
    porque: {
      0: "Escolher ferramenta antes de entender o processo inverte a ordem.",
      2: "Isso informatiza as aprovações duplicadas e o retrabalho.",
      3: "Sem ouvir quem executa, o desenho futuro tende a ignorar a realidade da operação."
    }
  },
  {
    id: "en-13", disc: "enade", unidade: "Componente específico", tema: "Redes de computadores", tipo: "unica",
    enunciado: "Uma filial vai usar a sub-rede 192.168.10.0/26. Quantos endereços podem ser atribuídos a equipamentos nessa sub-rede?",
    opcoes: ["30", "62", "64", "126"],
    correta: 1,
    explicacao: "Uma máscara /26 deixa 32 − 26 = 6 bits para hosts: 2⁶ = 64 endereços. Tirando o endereço de rede e o de broadcast, sobram 62 utilizáveis.",
    porque: {
      0: "30 hosts corresponde a uma /27.",
      2: "64 é o total de endereços, incluindo rede e broadcast, que não são atribuídos a equipamentos.",
      3: "126 hosts corresponde a uma /25."
    }
  },
  {
    id: "en-14", disc: "enade", unidade: "Componente específico", tema: "Segurança da informação", tipo: "unica",
    enunciado: "Depois de um vazamento de senhas, uma empresa decide exigir autenticação multifator no acesso remoto. Qual combinação atende de fato a esse requisito?",
    opcoes: [
      "Senha e pergunta secreta",
      "Senha e código gerado por aplicativo autenticador no celular",
      "Duas senhas diferentes, digitadas em sequência",
      "Senha e PIN numérico de seis dígitos"
    ],
    correta: 1,
    explicacao: "Multifator exige categorias diferentes: algo que você sabe (senha), algo que você tem (celular, token) ou algo que você é (biometria). Senha mais código do aplicativo combina \"saber\" com \"ter\".",
    porque: {
      0: "Senha e pergunta secreta são, as duas, algo que você sabe.",
      2: "Duas senhas continuam sendo um único fator, repetido.",
      3: "PIN também é algo que você sabe; não adiciona um segundo fator."
    }
  },
  {
    id: "en-15", disc: "enade", unidade: "Componente específico", tema: "Sistemas de informações gerenciais", tipo: "unica",
    enunciado: "Os gerentes regionais de uma rede varejista recebem todo mês um relatório consolidado de vendas por loja, gerado a partir dos registros do caixa, para comparar com as metas. Esse relatório é produto típico de qual tipo de sistema?",
    opcoes: [
      "Sistema de processamento de transações (SPT)",
      "Sistema de informação gerencial (SIG)",
      "Sistema de apoio à decisão (SAD)",
      "Sistema de apoio ao executivo (SAE)"
    ],
    correta: 1,
    explicacao: "O SIG atende o nível tático: resume os dados das transações em relatórios periódicos e padronizados para acompanhamento e controle. Ele se alimenta do SPT, que registra cada venda no caixa.",
    porque: {
      0: "O SPT registra as operações do dia a dia (cada venda), no nível operacional.",
      2: "O SAD apoia decisões pouco estruturadas, com simulações e análises do tipo \"e se\".",
      3: "O SAE atende a alta direção, com visão estratégica e dados externos."
    }
  },
  {
    id: "en-16", disc: "enade", unidade: "Componente específico", tema: "Ética, tecnologia e sociedade", tipo: "unica", fixa: true,
    enunciado: "Uma loja on-line coletou endereço e telefone dos clientes para entregar pedidos. Agora o marketing propõe vender essa base a empresas parceiras. Com base na LGPD, avalie as afirmações:\n\nI. Usar os dados para finalidade diferente da informada ao titular contraria o princípio da finalidade.\nII. Como coletou os dados de forma lícita, a loja passa a ser dona deles e pode comercializá-los livremente.\nIII. O titular pode pedir acesso aos seus dados e a eliminação daqueles tratados com base no consentimento.\n\nÉ correto o que se afirma em:",
    opcoes: ["I, apenas", "II, apenas", "I e III, apenas", "I, II e III"],
    correta: 2,
    explicacao: "Pela LGPD, o tratamento deve seguir a finalidade informada ao titular (I) e o titular mantém direitos como acesso e eliminação (III). A empresa é controladora, não proprietária: os dados pertencem ao titular, e um novo uso exige base legal própria (II está errada).",
    porque: {
      0: "A III também está correta.",
      1: "A II está errada: coleta lícita não transfere a titularidade dos dados.",
      3: "A II contraria os princípios da finalidade e da adequação."
    }
  },

  /* ---------------- ENADE · Formação geral ---------------- */
  {
    id: "fg-01", disc: "enade", unidade: "Formação geral", tema: "Inclusão digital e cidadania", tipo: "unica",
    enunciado: "Uma prefeitura passou a oferecer o agendamento de consultas apenas por aplicativo e fechou os guichês presenciais. Meses depois, a procura caiu entre idosos e moradores de áreas sem boa conexão. A interpretação mais adequada da situação é que:",
    opcoes: [
      "A queda mostra que esses grupos deixaram de precisar do serviço",
      "A digitalização, sem canais alternativos e sem políticas de acesso, pode ampliar desigualdades no exercício de direitos",
      "O problema se resolve sozinho com o tempo, sem necessidade de ação pública",
      "Serviços digitais são sempre excludentes e deveriam ser abandonados"
    ],
    correta: 1,
    explicacao: "Tecnologia amplia o acesso para quem tem conexão, aparelho e letramento digital, e pode criar barreira para quem não tem. Uma política responsável combina o canal digital com atendimento alternativo e ações de inclusão.",
    porque: {
      0: "A necessidade de saúde não diminuiu; o que mudou foi a barreira de acesso.",
      2: "Sem ação, a exclusão tende a persistir justamente entre os mais vulneráveis.",
      3: "O problema não é o canal digital em si, e sim ele ser o único."
    }
  },
  {
    id: "fg-02", disc: "enade", unidade: "Formação geral", tema: "Desinformação e algoritmos", tipo: "unica", fixa: true,
    enunciado: "Sobre a circulação de informações em redes sociais, avalie as afirmações:\n\nI. Conferir a fonte e a data de uma notícia antes de compartilhá-la é uma prática de uso responsável da informação.\nII. Um conteúdo que recebeu muitos compartilhamentos pode ser considerado confiável por esse motivo.\nIII. Algoritmos de recomendação tendem a mostrar conteúdos parecidos com os que a pessoa já consome, o que pode reduzir o contato com visões diferentes.\n\nÉ correto o que se afirma em:",
    opcoes: ["I, apenas", "III, apenas", "I e III, apenas", "I, II e III"],
    correta: 2,
    explicacao: "Popularidade não é critério de veracidade: conteúdos falsos costumam se espalhar rápido justamente por apelarem à emoção (II errada). Checar fonte e data (I) e entender o efeito das recomendações personalizadas (III) fazem parte do letramento digital.",
    porque: {
      0: "A III também está correta.",
      1: "A I também está correta.",
      3: "A II confunde alcance com confiabilidade."
    }
  },
  {
    id: "fg-03", disc: "enade", unidade: "Formação geral", tema: "Sustentabilidade e resíduos eletrônicos", tipo: "unica",
    enunciado: "Uma empresa vai substituir 300 computadores. Qual destinação é mais coerente com a responsabilidade socioambiental e com a proteção de dados?",
    opcoes: [
      "Descartar os equipamentos no lixo comum, já que estão obsoletos",
      "Apagar os dados de forma segura e encaminhar os equipamentos para recondicionamento, doação ou logística reversa",
      "Guardar todos os equipamentos indefinidamente em um depósito",
      "Vender os equipamentos como estão, com os discos e os dados originais"
    ],
    correta: 1,
    explicacao: "Eletrônicos contêm materiais tóxicos e também materiais reaproveitáveis; a legislação brasileira de resíduos sólidos prevê a logística reversa para esse tipo de produto. Antes de qualquer destinação, os dados precisam ser eliminados de forma segura.",
    porque: {
      0: "O descarte comum contamina o ambiente e desperdiça materiais recuperáveis.",
      2: "Armazenar indefinidamente só adia o problema e ocupa recursos.",
      3: "Repassar discos com dados expõe informações pessoais e da empresa."
    }
  },
  {
    id: "fg-04", disc: "enade", unidade: "Formação geral", tema: "Direitos humanos e acessibilidade", tipo: "unica", fixa: true,
    enunciado: "Avalie as asserções e a relação proposta entre elas:\n\nI. Sites e aplicativos de serviços essenciais devem ser acessíveis a pessoas com deficiência.\n\nPORQUE\n\nII. A acessibilidade é condição para o exercício de direitos em igualdade de oportunidades, e barreiras digitais restringem esse exercício.",
    opcoes: [
      "As asserções I e II são verdadeiras, e a II justifica a I",
      "As asserções I e II são verdadeiras, mas a II não justifica a I",
      "A asserção I é verdadeira e a II é falsa",
      "A asserção I é falsa e a II é verdadeira"
    ],
    correta: 0,
    explicacao: "As duas são verdadeiras e a segunda explica a primeira: a exigência de acessibilidade existe porque, sem ela, pessoas com deficiência ficam impedidas de usar serviços e exercer direitos. Recursos como texto alternativo, contraste e navegação por teclado removem essas barreiras.",
    porque: {
      1: "A II é exatamente o motivo da obrigação descrita na I.",
      2: "A II é verdadeira: a acessibilidade é tratada como direito, não como cortesia.",
      3: "A I é verdadeira e está prevista na legislação brasileira de inclusão."
    }
  },
  {
    id: "fg-05", disc: "enade", unidade: "Formação geral", tema: "Diversidade e viés algorítmico", tipo: "unica",
    enunciado: "Uma empresa treinou um sistema de triagem de currículos com dados de contratações dos últimos dez anos, período em que quase só homens foram contratados para cargos técnicos. O sistema passou a dar notas menores a currículos de mulheres. A conclusão mais adequada é que:",
    opcoes: [
      "O sistema é neutro, pois decisões matemáticas não carregam preconceito",
      "O sistema reproduziu um viés presente nos dados históricos, o que exige auditoria, correção e supervisão humana",
      "O resultado prova que os currículos das candidatas são piores",
      "O problema se resolve apenas aumentando a capacidade de processamento"
    ],
    correta: 1,
    explicacao: "Modelos aprendem padrões dos dados. Se os dados refletem uma desigualdade passada, o modelo tende a repeti-la e até ampliá-la. Uso responsável envolve avaliar os dados de treino, testar o resultado por grupo e manter pessoas responsáveis pela decisão final.",
    porque: {
      0: "O cálculo é matemático, mas os dados e os critérios vêm de decisões humanas.",
      2: "O sistema aprendeu o padrão histórico de contratação, não a qualidade real das candidatas.",
      3: "Mais processamento não corrige dados enviesados."
    }
  },
  {
    id: "fg-06", disc: "enade", unidade: "Formação geral", tema: "Ética profissional", tipo: "unica",
    enunciado: "Durante a escolha de um fornecedor de software, o gestor de TI responsável pelo parecer técnico recebe de uma das empresas concorrentes a oferta de uma viagem paga. Qual conduta é eticamente adequada?",
    opcoes: [
      "Aceitar, desde que a viagem não influencie o parecer",
      "Recusar a oferta e comunicar o fato à instância responsável da organização",
      "Aceitar e favorecer a empresa apenas se o produto dela for realmente bom",
      "Aceitar sem comentar com ninguém, para evitar constrangimento"
    ],
    correta: 1,
    explicacao: "Há conflito de interesses: um benefício pessoal pode comprometer, ou parecer comprometer, a imparcialidade da decisão. A conduta ética é recusar e dar transparência ao ocorrido, seguindo o código de conduta da organização.",
    porque: {
      0: "Mesmo sem influência real, a aparência de favorecimento já compromete o processo.",
      2: "O benefício contamina a decisão, qualquer que seja a qualidade do produto.",
      3: "Ocultar o fato agrava o conflito de interesses."
    }
  },
  {
    id: "fg-07", disc: "enade", unidade: "Formação geral", tema: "Leitura de dados", tipo: "unica",
    enunciado: "Considere os dados hipotéticos de uma pesquisa: em 2019, 71% dos domicílios do país tinham acesso à internet; em 2023, 84%. Na área rural, o acesso passou de 44% para 68% no mesmo período. Qual conclusão é correta?",
    opcoes: [
      "O acesso na área rural ultrapassou a média do país",
      "A diferença entre a média do país e a área rural caiu de 27 para 16 pontos percentuais",
      "O acesso no país cresceu 13%, mesma taxa de crescimento da área rural",
      "Em 2023, a maioria dos domicílios rurais continuava sem acesso"
    ],
    correta: 1,
    explicacao: "Em 2019 a diferença era 71 − 44 = 27 pontos percentuais; em 2023, 84 − 68 = 16. A desigualdade diminuiu, mas não acabou. Atenção à diferença entre ponto percentual (subtração entre percentuais) e variação percentual.",
    porque: {
      0: "68% continua abaixo de 84%.",
      2: "O país subiu 13 pontos percentuais e a área rural 24; e ponto percentual não é o mesmo que percentual de crescimento.",
      3: "Com 68% de acesso, a maioria dos domicílios rurais estava conectada."
    }
  },
  {
    id: "fg-08", disc: "enade", unidade: "Formação geral", tema: "Privacidade e dados públicos", tipo: "vf",
    enunciado: "Como as informações que uma pessoa publica em perfil aberto de rede social são de acesso público, empresas podem coletá-las e usá-las para qualquer finalidade, sem precisar observar a LGPD.",
    correta: false,
    explicacao: "A LGPD continua valendo para dados pessoais de acesso público: o tratamento deve considerar a finalidade, a boa-fé e o interesse público que justificaram a divulgação. \"Estar na internet\" não autoriza qualquer uso."
  },

  /* ---------------- Fundamentos de Segurança da Informação e Criptografia (Aulas 1 a 5 e 13) ---------------- */

  /* Aulas 1 e 2 · Fundamentos */
  {
    id: "fsc-01", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Propósito da proteção da informação", tipo: "unica",
    enunciado: "Segundo a Aula 1, qual é o propósito da proteção da informação?",
    opcoes: [
      "Proteger recursos valiosos da organização, como informações, hardware e software",
      "Impedir qualquer uso de computadores pelos funcionários",
      "Garantir apenas a proteção contra hackers externos",
      "Substituir a política de negócios da empresa"
    ],
    correta: 0,
    explicacao: "O propósito é proteger recursos valiosos da organização. Entre eles estão informações, hardware, software e também recursos como reputação, empregados e recursos financeiros.",
    porque: {
      1: "A proteção deve apoiar o negócio, e não impedir o uso da tecnologia.",
      2: "Hackers são só uma das fontes de ameaça, e nem a principal.",
      3: "A proteção deve dar suporte aos objetivos do negócio, e não substituí-los."
    }
  },
  {
    id: "fsc-02", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Elementos da proteção da informação", tipo: "multipla",
    enunciado: "Quais afirmações sobre os elementos da proteção da informação estão de acordo com a Aula 1? Marque todas as corretas.",
    opcoes: [
      "A proteção deve dar suporte aos objetivos do negócio ou à missão da organização",
      "A proteção deve ter um custo que \"se pague\": é preciso avaliar o risco e o impacto antes de implementar um controle",
      "As responsabilidades e tarefas devem ser explícitas",
      "A proteção exige abordagem integrada e contínua, com políticas revisadas para melhoria contínua",
      "A proteção da informação independe da cultura da organização",
      "Uma política única e idêntica serve para qualquer empresa, sem ajustes por unidade de negócio"
    ],
    corretas: [0, 1, 2, 3],
    explicacao: "A proteção é limitada pela cultura da organização: cada unidade de negócio faz seus ajustes na política geral, e quanto maior a empresa, mais complexa a implantação.",
    porque: {
      4: "Ao contrário: a proteção é limitada pela cultura da organização.",
      5: "Cada unidade de negócio deve ter seus ajustes na política geral."
    }
  },
  {
    id: "fsc-03", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Lealdade e dever de preservar", tipo: "lacuna",
    enunciado: "Complete a base da política de segurança da informação segundo a aula.",
    texto: "A política deve ser baseada em {{1}}, ou seja, todas as decisões têm como foco os interesses da organização, e no dever de {{2}}, ou seja, manter da melhor forma os recursos da organização de forma {{3}}.",
    banco: ["lealdade", "preservar", "íntegra", "sigilo", "punir", "descentralizada"],
    corretas: ["lealdade", "preservar", "íntegra"],
    explicacao: "Lealdade (foco nos interesses da organização) e dever de preservar (manter os recursos de forma íntegra) são os dois fundamentos citados."
  },
  {
    id: "fsc-04", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Além da segurança computacional", tipo: "unica",
    enunciado: "Segundo a Aula 1, um programa de proteção da informação deve ir além do escopo de TI e englobar:",
    opcoes: [
      "Cada estágio do ciclo de vida da informação, da criação à eventual destruição",
      "Somente a fase de armazenamento em servidores",
      "Apenas os computadores ligados à internet",
      "Somente o descarte de equipamentos"
    ],
    correta: 0,
    explicacao: "Uma proteção efetiva considera áreas dentro e fora de TI e todo o ciclo de vida da informação.",
    porque: {
      1: "Armazenamento é só uma fase do ciclo de vida.",
      2: "A informação existe também em papel, em conversas e em outros meios.",
      3: "O descarte é uma etapa, e não todo o escopo."
    }
  },
  {
    id: "fsc-05", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Ameaças comuns (fontes)", tipo: "multipla",
    enunciado: "Quais destes são exemplos de ameaças comuns a sistemas de informação citados na Aula 1? Marque todos os corretos.",
    opcoes: [
      "Danos a bases de dados",
      "Quedas em links de internet",
      "Paradas em servidores",
      "Roubo de informações",
      "Desastres naturais ou não",
      "Atualizações automáticas de software"
    ],
    corretas: [0, 1, 2, 3, 4],
    explicacao: "As ameaças podem atingir partes diferentes do processo produtivo. Entre as fontes estão empregados que fraudam o sistema, hackers externos e qualquer agente que cause problemas na rede.",
    porque: {
      5: "Atualizações automáticas reduzem a exposição a vulnerabilidades e não são uma ameaça."
    }
  },
  {
    id: "fsc-06", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Empregados x hackers", tipo: "unica",
    enunciado: "De acordo com os dados citados na Aula 1, o que se pode afirmar sobre empregados e hackers como fontes de ameaça?",
    opcoes: [
      "Cerca de 80% dos entrevistados apontaram empregados como fontes potenciais de dano, enquanto hackers e crackers representam apenas cerca de 5% dos ataques",
      "Hackers externos são responsáveis pela imensa maioria dos ataques, e empregados quase nunca causam danos",
      "Hackers e empregados representam exatamente a mesma proporção de ataques",
      "Empregados só causam danos quando são demitidos"
    ],
    correta: 0,
    explicacao: "O alerta da aula é que o problema dos hackers existe, mas é preciso investir também em áreas geralmente negligenciadas, como a conformidade interna: normalmente 90 a 95% dos ambientes têm pelo menos um item em desconformidade com as políticas.",
    porque: {
      1: "Segundo a aula, é o contrário: hackers são cerca de 5% dos ataques.",
      2: "Os dados apresentados são bem diferentes.",
      3: "A aula não restringe a ameaça interna a funcionários demitidos."
    }
  },
  {
    id: "fsc-07", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Ferramentas de proteção por aspecto", tipo: "associacao",
    enunciado: "Associe cada ferramenta de proteção ao aspecto a que pertence.",
    pares: [
      ["Firewall, antivírus, criptografia e antispam", "Aspecto tecnológico"],
      ["Controle de acesso físico e climatização", "Aspecto físico"],
      ["Análise de risco, acordos de confidencialidade e Plano de Continuidade do Negócio", "Aspecto humano"]
    ],
    explicacao: "A aula também inclui no aspecto humano a análise forense computacional e a Política de Segurança da Informação."
  },
  {
    id: "fsc-08", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Tríade CID (definições)", tipo: "associacao",
    enunciado: "Associe cada pilar da segurança da informação à sua definição na Aula 2.",
    pares: [
      ["Confidencialidade", "A informação está acessível apenas para pessoas autorizadas"],
      ["Integridade", "A informação está completa e sem alterações não autorizadas"],
      ["Disponibilidade", "A informação está disponível no momento em que é necessária"]
    ],
    explicacao: "São os três pilares da segurança da informação, base de toda a disciplina."
  },
  {
    id: "fsc-09", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Vulnerabilidades x pilares", tipo: "associacao",
    enunciado: "Associe cada situação ao pilar da segurança que ela compromete.",
    pares: [
      ["Funcionário deixa a senha anotada em um post-it na tela", "Confidencialidade"],
      ["Usuário sem permissão altera o valor de um pedido no sistema", "Integridade"],
      ["Queda de energia sem nobreak derruba o servidor", "Disponibilidade"]
    ],
    explicacao: "É o exercício proposto na Aula 2: associar vulnerabilidades levantadas às características da informação segura."
  },
  {
    id: "fsc-10", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Aspectos físico, lógico e humano", tipo: "associacao",
    enunciado: "Associe cada exemplo ao aspecto da segurança da informação definido na Aula 2.",
    pares: [
      ["Instalações, proteção elétrica e ambiental", "Aspecto físico"],
      ["Firewall, antivírus e outras ferramentas de segurança", "Aspecto lógico"],
      ["Funcionários e usuários dos sistemas computacionais", "Aspecto humano"]
    ],
    explicacao: "Uma boa proteção precisa considerar os três aspectos, e não só o tecnológico."
  },
  {
    id: "fsc-11", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Controle por pilar", tipo: "unica",
    enunciado: "Um nobreak e um gerador de energia protegem principalmente qual característica da informação, e em qual aspecto da segurança atuam?",
    opcoes: [
      "Disponibilidade, no aspecto físico",
      "Confidencialidade, no aspecto humano",
      "Integridade, no aspecto lógico",
      "Confidencialidade, no aspecto lógico"
    ],
    correta: 0,
    explicacao: "Proteção elétrica faz parte do aspecto físico e garante que sistemas e dados continuem acessíveis quando necessários.",
    porque: {
      1: "Nobreak não tem relação com sigilo nem com comportamento de pessoas.",
      2: "Ele não impede alterações indevidas de dados.",
      3: "Não é um controle lógico e não protege sigilo."
    }
  },
  {
    id: "fsc-12", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Definição de segurança da informação", tipo: "vf",
    enunciado: "Segundo os autores de Information Security Fundamentals, citados na Aula 3, definir segurança da informação é simples e direto, pois se resume à instalação de antivírus.",
    correta: false,
    explicacao: "A aula diz que é um termo muito complexo de definir, algo como \"tentar definir o infinito\". Pode ir desde políticas de uso da rede até permissões de acesso a um arquivo."
  },
  {
    id: "fsc-13", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Conformidade legal", tipo: "multipla",
    enunciado: "Quais usos de recursos de tecnologia podem gerar problemas legais, segundo a Aula 3? Marque todos os corretos.",
    opcoes: [
      "Uso da internet para acesso e distribuição de conteúdo proibido",
      "Uso do e-mail corporativo para enviar informações sigilosas ou conteúdo proibido",
      "Realizar backup regular dos dados da empresa",
      "Manter o antivírus atualizado"
    ],
    corretas: [0, 1],
    explicacao: "A conformidade legal exige estudar esses aspectos para evitar problemas, sobretudo com internet e e-mail.",
    porque: {
      2: "Backup é boa prática de proteção, e não risco legal.",
      3: "Manter o antivírus atualizado é uma boa prática."
    }
  },
  {
    id: "fsc-14", disc: "fsc", unidade: "Aula 01-02 · Fundamentos", tema: "Política de segurança (RFC 2196)", tipo: "unica",
    enunciado: "Na Aula 3, a RFC 2196 (Site Security Handbook) define política de segurança como:",
    opcoes: [
      "Uma declaração formal de regras pelas quais as pessoas têm acesso a bens de tecnologia e informação dentro de uma organização",
      "Um software que bloqueia acessos não autorizados",
      "Um plano de recuperação de desastres",
      "Um contrato de seguro contra ataques cibernéticos"
    ],
    correta: 0,
    explicacao: "A política é o núcleo da segurança da informação: a partir dela se geram todos os outros aspectos de segurança na empresa.",
    porque: {
      1: "Isso descreve um firewall.",
      2: "Plano de recuperação é um documento diferente.",
      3: "A política não é um contrato de seguro."
    }
  },

  /* Aula 3 · Ataques e códigos maliciosos */
  {
    id: "fsc-15", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "As cinco fases de um ataque", tipo: "associacao",
    enunciado: "Associe cada fase do ataque (Aula 3) à sua descrição.",
    pares: [
      ["Reconhecimento", "O hacker busca informações disponíveis ao público sobre a rede a ser atacada"],
      ["Escaneamento", "Tenta encontrar falhas de segurança nos serviços em execução"],
      ["Obtenção de acesso", "Depende do que foi levantado nas fases anteriores, como senhas fracas em um FTP"],
      ["Manutenção do acesso", "Carrega um programa escondido para entrar sem depender do serviço usado na invasão"],
      ["Apagar os rastros", "Altera logs e esconde os programas de manutenção de acesso"]
    ],
    explicacao: "Um ataque em geral tem esses cinco componentes. Entender a sequência ajuda a criar contramedidas específicas para cada fase."
  },
  {
    id: "fsc-16", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Reconhecimento passivo", tipo: "multipla",
    enunciado: "Quais fontes o hacker pode consultar na fase de reconhecimento passivo, segundo a Aula 3? Marque todas as corretas.",
    opcoes: [
      "O site web da empresa",
      "Os dados de cadastro do domínio na internet",
      "Informações de jornais",
      "Ping e verificação de banners de servidores"
    ],
    corretas: [0, 1, 2],
    explicacao: "O reconhecimento pode ser mais agressivo, com ping, SNMP e verificação de banners. Isso permite identificar endereços IP ativos, mas já envolve interação direta com os sistemas.",
    porque: {
      3: "Ping, SNMP e verificação de banners são reconhecimento mais agressivo, com contato direto com os sistemas."
    }
  },
  {
    id: "fsc-17", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Escaneamento", tipo: "unica",
    enunciado: "Na fase de escaneamento, o atacante tenta:",
    opcoes: [
      "Encontrar falhas de segurança nos serviços que estão em execução",
      "Apagar os logs do sistema",
      "Carregar um programa escondido no servidor",
      "Visitar o site público da empresa para coletar informações"
    ],
    correta: 0,
    explicacao: "Por isso os servidores acessíveis pela internet precisam estar com todas as atualizações em dia, para que não haja exploração de um bug.",
    porque: {
      1: "Isso é a fase de apagar os rastros.",
      2: "Isso é manutenção do acesso.",
      3: "Isso é reconhecimento."
    }
  },
  {
    id: "fsc-18", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Obtenção de acesso (exemplo do FTP)", tipo: "unica",
    enunciado: "Foi detectado um servidor FTP aberto para a internet cujos usuários usavam senhas fracas. O atacante acessou as contas e usou as mesmas credenciais em outros serviços, como o SSH. Que fase do ataque isso representa?",
    opcoes: ["Obtenção de acesso", "Reconhecimento", "Escaneamento", "Apagar os rastros"],
    correta: 0,
    explicacao: "É o exemplo da própria aula: a obtenção de acesso depende diretamente do que foi levantado nas fases anteriores. O reaproveitamento de senhas também mostra o risco de usar a mesma credencial em vários serviços.",
    porque: {
      1: "Reconhecimento é coleta de informação, antes da exploração.",
      2: "Escaneamento identifica falhas, mas ainda não as explora.",
      3: "Apagar os rastros é a fase final."
    }
  },
  {
    id: "fsc-19", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Manutenção do acesso", tipo: "unica",
    enunciado: "Depois de comprometer um servidor, por que o atacante carrega um programa escondido no sistema?",
    opcoes: [
      "Para poder voltar a acessar a máquina sem depender do serviço usado para entrar, que pode não estar rodando amanhã",
      "Para avisar o administrador sobre a falha encontrada",
      "Para acelerar a execução dos serviços legítimos",
      "Para apagar os logs automaticamente"
    ],
    correta: 0,
    explicacao: "O atacante quer que a máquina esteja sempre disponível para ele. Esse é o objetivo da fase de manutenção do acesso.",
    porque: {
      1: "O objetivo é permanecer, e não notificar.",
      2: "Não tem relação com desempenho.",
      3: "A limpeza de logs é a fase seguinte."
    }
  },
  {
    id: "fsc-20", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Apagar os rastros", tipo: "vf",
    enunciado: "Na fase de apagar os rastros, os logs são alterados e os programas de manutenção de acesso são removidos da lista de programas em execução, de modo que o administrador não saiba quais programas estão rodando.",
    correta: true,
    explicacao: "É a fase final: o objetivo é que o sistema não tenha nenhum relatório (log) da presença do atacante."
  },
  {
    id: "fsc-21", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Códigos maliciosos", tipo: "unica",
    enunciado: "Segundo a Aula 3, um programa de código malicioso é aquele que:",
    opcoes: [
      "Realiza uma operação sem o conhecimento do usuário",
      "Só pode ser instalado por administradores",
      "É sempre detectado pelo antivírus",
      "Só funciona em sistemas Windows"
    ],
    correta: 0,
    explicacao: "Em muitos casos, usar código malicioso é mais eficiente do que o ataque direto de um hacker. A aula cita quatro tipos: vírus, worm, cavalo de Tróia e bomba lógica.",
    porque: {
      1: "Não depende de privilégios de administrador para existir.",
      2: "Muitos passam despercebidos pelo antivírus.",
      3: "A definição não depende do sistema operacional."
    }
  },
  {
    id: "fsc-22", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Tipos de código malicioso", tipo: "associacao",
    enunciado: "Associe cada código malicioso à sua característica na Aula 3.",
    pares: [
      ["Vírus", "É injetado em um arquivo e aguarda a execução dele para ser instalado"],
      ["Worm", "Infecta uma máquina e tenta se replicar para outras máquinas vulneráveis na rede"],
      ["Cavalo de Tróia", "Parece ser um arquivo legítimo, como um programa do sistema ou um documento"],
      ["Bomba lógica", "Tem a função específica de atrapalhar o uso do sistema"]
    ],
    explicacao: "Exemplos citados: o worm Nimda e a bomba lógica Michelangelo. O vírus pode infectar arquivos exe, doc, setor de boot, etc."
  },
  {
    id: "fsc-23", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Ataque DoS", tipo: "unica",
    enunciado: "O ataque de negação de serviço (DoS) é desenhado para:",
    opcoes: [
      "Sobrecarregar o software ou o hardware do alvo, fazendo com que o servidor pare de responder",
      "Capturar senhas digitadas pelos usuários",
      "Criptografar arquivos e exigir resgate",
      "Esconder a mensagem dentro de uma imagem"
    ],
    correta: 0,
    explicacao: "Em geral, é usado por um atacante que não consegue acesso a uma determinada rede.",
    porque: {
      1: "Isso é keylogger ou engenharia social.",
      2: "Isso é ransomware.",
      3: "Isso é esteganografia."
    }
  },
  {
    id: "fsc-24", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "DoS x DDoS", tipo: "associacao",
    enunciado: "Associe cada exemplo ou conceito de negação de serviço ao grupo correto, segundo a Aula 3.",
    pares: [
      ["Syn flood, Fin flood, Smurfs e Fraggles", "Ataques DoS \"one-to-one\""],
      ["Computadores zumbis lançando ataques \"many-to-one\"", "DDoS (Distributed Denial of Service)"],
      ["Trinoo, TFN2K e stacheldraht", "Ferramentas para ataques \"many-to-one\""]
    ],
    explicacao: "O DDoS surgiu em fevereiro de 2000. É de difícil defesa, e muitas empresas ainda estão vulneráveis a ele."
  },
  {
    id: "fsc-25", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Qualidades humanas exploradas", tipo: "multipla",
    enunciado: "Quais qualidades humanas a engenharia social explora, segundo a Aula 3? Marque todas as corretas.",
    opcoes: [
      "O desejo de ser prestativo",
      "A tendência de acreditar nas pessoas",
      "O medo de se meter em confusão",
      "A vontade de cortar caminho e seguir atalhos",
      "O desejo de criptografar dados"
    ],
    corretas: [0, 1, 2, 3],
    explicacao: "O objetivo do atacante é enganar explorando essas características. Os ataques podem ser muito simples ou muito elaborados.",
    porque: {
      4: "Não é uma qualidade humana explorada pela engenharia social."
    }
  },
  {
    id: "fsc-26", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Tipos de engenharia social", tipo: "associacao",
    enunciado: "Associe cada situação ao tipo de engenharia social.",
    pares: [
      ["Alguém se veste e se porta como pessoa importante para conseguir vantagens", "Personificação e pessoa importante"],
      ["Observar a tela de alguém num caixa eletrônico", "Surfista de ombro"],
      ["Procurar informações no lixo da empresa", "Mergulhador de lata de lixo"],
      ["Dizer que foi autorizado por alguém para ter acesso às dependências", "Terceiro autorizado"],
      ["Ligar fingindo ser do suporte para coletar usuário e senha", "Suporte técnico"]
    ],
    explicacao: "Não é preciso mergulhar em uma lata de lixo para achar informações: basta olhar o que a pessoa tem nas mãos ou na mesa de trabalho."
  },
  {
    id: "fsc-27", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Defesas contra engenharia social", tipo: "unica",
    enunciado: "Por que a Aula 3 afirma que nenhum software ou hardware protege a rede contra a engenharia social?",
    opcoes: [
      "Porque o ataque explora o comportamento humano; a defesa depende de procedimentos e conscientização",
      "Porque firewalls só funcionam em redes pequenas",
      "Porque a engenharia social só ocorre fora da empresa",
      "Porque a engenharia social é um ataque que não existe mais"
    ],
    correta: 0,
    explicacao: "Defesas citadas: exigir identificação e permissão prévia de quem presta serviços, nunca informar senhas por telefone, usar identificadores de chamadas no suporte e ter picotadores de papel em cada andar.",
    porque: {
      1: "O problema não é o tamanho da rede, e sim a natureza do ataque.",
      2: "Ocorre dentro e fora da empresa, inclusive presencialmente.",
      3: "Continua sendo muito utilizada."
    }
  },
  {
    id: "fsc-28", disc: "fsc", unidade: "Aula 03 · Ataques e códigos maliciosos", tema: "Sinais de engenharia social", tipo: "multipla",
    enunciado: "Quais são sinais de um possível ataque de engenharia social, segundo a Aula 3? Marque todos os corretos.",
    opcoes: [
      "Pessoas que se negam a dar informações sobre quem são",
      "Pessoas que tentam apressar processos pulando etapas de segurança",
      "Comportamentos intimidativos ou de pressão",
      "Requisição de informações claramente sigilosas",
      "Um colega que pede ajuda para abrir um chamado no suporte"
    ],
    corretas: [0, 1, 2, 3],
    explicacao: "Esses sinais podem ser divulgados em uma página web interna dedicada à segurança.",
    porque: {
      4: "Pedir ajuda dentro do processo normal, por si só, não é um sinal de ataque."
    }
  },

  /* Aula 4 · Criptografia */
  {
    id: "fsc-29", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Origem dos termos", tipo: "associacao",
    enunciado: "Associe cada termo à sua origem e significado na Aula 4.",
    pares: [
      ["Esteganografia", "Do grego steganos (coberto) e graphein (escrever)"],
      ["Criptografia", "Do grego kriptos, que significa oculto"]
    ],
    explicacao: "A esteganografia oculta a mensagem; a criptografia oculta o significado da mensagem e não a mensagem propriamente dita."
  },
  {
    id: "fsc-30", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Esteganografia (Histaeu)", tipo: "unica",
    enunciado: "Histaeu raspou a cabeça de um mensageiro, escreveu a mensagem no couro cabeludo e esperou o cabelo crescer. Esse exemplo, narrado por Heródoto, ilustra:",
    opcoes: ["Esteganografia", "Cifra de Vigenère", "Criptografia assimétrica", "Função hash"],
    correta: 0,
    explicacao: "O mensageiro parecia não levar nada que o comprometesse. A mensagem foi escondida, e não embaralhada.",
    porque: {
      1: "Vigenère é uma cifra polialfabética, que embaralha o conteúdo.",
      2: "Criptografia assimétrica usa par de chaves.",
      3: "Hash gera um resumo de tamanho fixo."
    }
  },
  {
    id: "fsc-31", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Criptografia x esteganografia", tipo: "unica",
    enunciado: "Qual é a diferença de objetivo entre criptografia e esteganografia?",
    opcoes: [
      "A criptografia oculta o significado da mensagem; a esteganografia oculta a mensagem propriamente dita",
      "A criptografia oculta a mensagem propriamente dita; a esteganografia oculta o significado",
      "As duas têm exatamente o mesmo objetivo e técnica",
      "A esteganografia só funciona com chaves públicas"
    ],
    correta: 0,
    explicacao: "Na criptografia, a mensagem pode ser enviada sem ocultar sua existência (ela vai cifrada). Na esteganografia, a ideia é que ninguém perceba que existe uma mensagem.",
    porque: {
      1: "Está invertida.",
      2: "Os objetivos são diferentes.",
      3: "A esteganografia não depende de chaves públicas."
    }
  },
  {
    id: "fsc-32", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Cifra monoalfabética", tipo: "unica",
    enunciado: "Na cifra de substituição monoalfabética, usada por administradores árabes por volta do século X:",
    opcoes: [
      "Cada letra do alfabeto original é substituída por outra letra ou por um símbolo",
      "Vários alfabetos são alternados por meio de uma palavra-chave",
      "Duas chaves distintas são usadas, uma pública e outra privada",
      "A mensagem é escondida dentro de uma imagem"
    ],
    correta: 0,
    explicacao: "A cifra permaneceu invulnerável por séculos, até a descoberta da análise de frequência.",
    porque: {
      1: "Isso descreve a cifra polialfabética de Vigenère.",
      2: "Isso é criptografia assimétrica.",
      3: "Isso é esteganografia."
    }
  },
  {
    id: "fsc-33", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Análise de frequência (Al-Kindi)", tipo: "unica",
    enunciado: "No século IX, Al-Kindi descreveu uma técnica capaz de quebrar a cifra monoalfabética. Qual?",
    opcoes: ["Análise de frequência das letras", "Força bruta com 26 alfabetos", "Fatoração de números primos", "Ataque de aniversário"],
    correta: 0,
    explicacao: "Conhecendo o idioma, conta-se a frequência das letras em um texto longo da mesma língua e compara-se com a dos símbolos do criptograma, ligando os mais frequentes entre si.",
    porque: {
      1: "Força bruta não foi a técnica de Al-Kindi.",
      2: "Fatoração é a base da segurança do RSA.",
      3: "O paradoxo do aniversário se aplica a colisões de hash."
    }
  },
  {
    id: "fsc-34", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Cifra de Vigenère", tipo: "multipla",
    enunciado: "Quais afirmações sobre a cifra de Vigenère estão corretas, segundo a Aula 4? Marque todas as corretas.",
    opcoes: [
      "É uma cifra polialfabética, com até 26 alfabetos distintos",
      "Usa uma palavra-chave previamente combinada para definir a linha usada em cada letra",
      "É imune à análise de frequência",
      "Foi conhecida como Le chiffre indéchiffable",
      "É uma cifra monoalfabética"
    ],
    corretas: [0, 1, 2, 3],
    explicacao: "O número de chaves possíveis é enorme (26^26), o que inviabiliza testar todas. Por isso, na época, os criptógrafos ficaram em vantagem sobre os criptoanalistas.",
    porque: {
      4: "Ela usa vários alfabetos, e não apenas um."
    }
  },
  {
    id: "fsc-35", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Enigma", tipo: "unica",
    enunciado: "A máquina Enigma ficou conhecida por ter sido usada:",
    opcoes: [
      "Pelo exército alemão na Segunda Guerra Mundial, e a quebra de sua criptografia contribuiu para o fim da guerra",
      "Pelos árabes no século X para proteger registros de impostos",
      "Por Júlio César em suas comunicações militares",
      "Para criar o primeiro certificado digital"
    ],
    correta: 0,
    explicacao: "A Enigma é um dos exemplos mais conhecidos de criptografia.",
    porque: {
      1: "Os árabes usaram cifras de substituição monoalfabética.",
      2: "Os métodos de Júlio César eram rudimentares, de outra época.",
      3: "Não tem relação com certificados."
    }
  },
  {
    id: "fsc-36", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Cifra assimétrica (história)", tipo: "unica",
    enunciado: "Na década de 70, Diffie, Hellman e Merkle propuseram a cifra assimétrica. Qual é a ideia central, segundo a Aula 4?",
    opcoes: [
      "Saber codificar não implica em saber decodificar, a partir de uma função de mão única",
      "Usar a mesma chave para cifrar e decifrar, trocada a cada mensagem",
      "Esconder a mensagem em imagens",
      "Usar a análise de frequência para quebrar cifras"
    ],
    correta: 0,
    explicacao: "A analogia da aula é a do ovo: quebrar é fácil, mas fazer o ovo voltar à condição inicial é impossível. Uma função de mão única é fácil de calcular e inviável de reverter.",
    porque: {
      1: "Essa é a lógica da criptografia simétrica.",
      2: "Isso é esteganografia.",
      3: "A análise de frequência é uma técnica de quebra de cifras antigas."
    }
  },
  {
    id: "fsc-37", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "RSA (história e conceito)", tipo: "unica",
    enunciado: "Sobre o RSA, segundo a Aula 4, é correto afirmar que:",
    opcoes: [
      "Foi criado em 1977 por Rivest, Shamir e Adleman e é o método de chave pública mais conhecido",
      "Foi criado por Diffie, Hellman e Merkle na Califórnia",
      "Usa uma única chave secreta compartilhada",
      "É um algoritmo de hash"
    ],
    correta: 0,
    explicacao: "O trio californiano propôs a ideia; o RSA, do MIT, colocou-a em prática. Em chave pública, a chave que cifra a mensagem não é capaz de decifrá-la.",
    porque: {
      1: "Eles propuseram o conceito; o RSA foi criado por Rivest, Shamir e Adleman.",
      2: "Isso é criptografia simétrica.",
      3: "O RSA é um algoritmo assimétrico."
    }
  },
  {
    id: "fsc-38", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "PGP/GPG (fluxo)", tipo: "lacuna",
    enunciado: "Complete o fluxo de uso do GPG para enviar um arquivo cifrado.",
    texto: "O destinatário gera o par de chaves e exporta a chave {{1}}. O remetente a importa e cifra o arquivo para o destinatário. No destino, o arquivo é decifrado com a chave {{2}}.",
    banco: ["pública", "privada", "simétrica", "de sessão"],
    corretas: ["pública", "privada"],
    explicacao: "Para cifrar com GPG, é preciso ter a chave pública do destinatário. Só quem tem a chave privada correspondente consegue decifrar."
  },
  {
    id: "fsc-39", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "SSL/TLS", tipo: "unica",
    enunciado: "Sobre o SSL/TLS, segundo a Aula 4:",
    opcoes: [
      "O SSL foi originalmente desenvolvido pela Netscape e tornou-se parte do protocolo de segurança conhecido como TLS",
      "O TLS é um tipo de vírus de boot",
      "O SSL só funciona em redes sem internet",
      "O TLS é um algoritmo de hash"
    ],
    correta: 0,
    explicacao: "É uma implementação popular da criptografia de chave pública, usada por navegadores e servidores web para transmitir informações sigilosas.",
    porque: {
      1: "TLS é um protocolo de segurança.",
      2: "É usado justamente em comunicações pela internet.",
      3: "TLS é um protocolo, e não uma função hash."
    }
  },
  {
    id: "fsc-40", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Autenticação", tipo: "multipla",
    enunciado: "Quais destas são maneiras de autenticar uma pessoa ou informação em um computador, segundo a Aula 4? Marque todas as corretas.",
    opcoes: ["Senha", "Cartões de acesso", "Assinaturas digitais", "Biometria", "Compressão de arquivos"],
    corretas: [0, 1, 2, 3],
    explicacao: "Se a informação for autêntica, sabe-se quem a criou e que ela não foi alterada desde então. Criptografia e autenticação funcionam juntas para criar um ambiente seguro.",
    porque: {
      4: "Compressão reduz o tamanho dos dados e não autentica ninguém."
    }
  },
  {
    id: "fsc-41", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Certificado digital e modelos de confiança", tipo: "associacao",
    enunciado: "Associe cada modelo de confiança a como o certificado é assinado.",
    pares: [
      ["ICP (Infraestrutura de Chaves Públicas)", "Assinado pela Autoridade Certificadora que o emitiu"],
      ["Teia de confiança (Web of trust), como no PGP", "Assinado pela própria entidade e por outros que dizem confiar nela"]
    ],
    explicacao: "O certificado digital é usado para ligar uma entidade a uma chave pública."
  },
  {
    id: "fsc-42", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Algoritmos simétricos e assimétricos", tipo: "associacao",
    enunciado: "Associe os algoritmos ao tipo de criptografia, segundo a Aula 4.",
    pares: [
      ["AES, Blowfish, RC4, 3DES e IDEA", "Chave simétrica"],
      ["RSA, DSA, ECC e Diffie-Hellman", "Chaves assimétricas"]
    ],
    explicacao: "Na simétrica usa-se a mesma chave para codificar e decodificar, principalmente para confidencialidade. Na assimétrica, uma chave pública e outra privada: o que uma cifra, só a outra decifra."
  },
  {
    id: "fsc-43", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Níveis de segurança (bits)", tipo: "unica",
    enunciado: "Segundo a Aula 4, quantas chaves possíveis existem em uma criptografia de 10 bits, e por que mais bits aumentam a segurança?",
    opcoes: [
      "2^10 = 1024 chaves; quanto mais bits, mais difícil quebrar a criptografia por força bruta",
      "10 chaves; mais bits tornam a chave mais fácil de memorizar",
      "100 chaves; mais bits reduzem o tempo de cifragem",
      "1 chave; mais bits eliminam a necessidade de senha"
    ],
    correta: 0,
    explicacao: "Com 64 bits, o número de chaves possíveis sobe para a ordem de 10^19. O nível de segurança é medido em bits tanto para chaves simétricas quanto assimétricas.",
    porque: {
      1: "O número de chaves cresce exponencialmente com os bits.",
      2: "O número é 2 elevado ao número de bits.",
      3: "A chave continua existindo."
    }
  },
  {
    id: "fsc-44", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Codificação x cifragem", tipo: "vf",
    enunciado: "O objetivo da disciplina inclui diferenciar uma codificação de informação de um dado cifrado, ou seja, saber que codificar (como Base64) não é o mesmo que cifrar com uma chave.",
    correta: true,
    explicacao: "Na ementa, a disciplina deseja que o aluno diferencie codificação de informação de dado cifrado. A codificação é reversível por qualquer um que conheça o formato, e a cifragem depende de uma chave secreta."
  },

  /* Aula 5 · ISO/IEC 27002 e backup */
  {
    id: "fsc-45", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Histórico da ISO 27002", tipo: "associacao",
    enunciado: "Associe cada ano ao marco no histórico da norma, segundo a Aula 5.",
    pares: [
      ["1995", "BS 7799"],
      ["2000", "ISO/IEC 17799"],
      ["2005", "ISO 27000"],
      ["2007", "ISO/IEC 27002"],
      ["2022", "ISO/IEC 27002, última versão"]
    ],
    explicacao: "A ISO/IEC 27002 é um código de práticas com um conjunto completo de controles que auxiliam na aplicação do Sistema de Gestão da Segurança da Informação (SGSI)."
  },
  {
    id: "fsc-46", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Seções da ISO 27002:2022", tipo: "associacao",
    enunciado: "Associe cada seção da ISO/IEC 27002:2022 ao seu tipo de controle.",
    pares: [
      ["Seção 5", "Controles organizacionais"],
      ["Seção 6", "Controles de pessoas"],
      ["Seção 7", "Controles físicos"],
      ["Seção 8", "Controles tecnológicos"]
    ],
    explicacao: "São as quatro seções da versão de 2022."
  },
  {
    id: "fsc-47", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "ISO 27002 (alinhamento)", tipo: "unica",
    enunciado: "A ISO/IEC 27002 se alinha a outras normas. Qual associação está correta, segundo a Aula 5?",
    opcoes: [
      "Gestão: 9000, 14000 e 20000; avaliação de riscos: 31000",
      "Gestão: 31000; avaliação de riscos: 9000",
      "Gestão: 14000; avaliação de riscos: 20000",
      "Ela não se alinha a nenhuma outra norma"
    ],
    correta: 0,
    explicacao: "No alinhamento com o negócio, a aula cita planos de monitoramento, ações preventivas, correção de não conformidade e comunicação de requisitos.",
    porque: {
      1: "A ISO 31000 trata de gestão de riscos.",
      2: "A associação não está correta.",
      3: "A norma tem alinhamento com normas de gestão e de riscos."
    }
  },
  {
    id: "fsc-48", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Definições da norma", tipo: "associacao",
    enunciado: "Associe cada termo à sua definição na Aula 5.",
    pares: [
      ["Ativo", "Qualquer coisa que tenha valor para a organização"],
      ["Ameaça", "Causa potencial de um incidente indesejado, que pode resultar em dano para um sistema ou organização"],
      ["Vulnerabilidade", "Fragilidade de um ativo ou grupo de ativos que pode ser explorada por uma ou mais ameaças"],
      ["Risco", "Combinação da probabilidade de um evento e de suas consequências"],
      ["Gestão de riscos", "Atividades coordenadas para direcionar e controlar uma organização no que se refere a risco"]
    ],
    explicacao: "Uma ameaça só causa dano quando encontra uma vulnerabilidade explorável em um ativo."
  },
  {
    id: "fsc-49", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Segurança da informação (definição da norma)", tipo: "unica",
    enunciado: "Segundo a definição da norma apresentada na Aula 5, segurança da informação é a:",
    opcoes: [
      "Preservação da confidencialidade, da integridade e da disponibilidade da informação, podendo envolver também autenticidade, responsabilidade, não repúdio e confiabilidade",
      "Instalação de antivírus em todos os equipamentos da empresa",
      "Contratação de um seguro contra ataques",
      "Proibição de uso da internet pelos funcionários"
    ],
    correta: 0,
    explicacao: "A definição se apoia na tríade CID e admite outras propriedades adicionais.",
    porque: {
      1: "É apenas um dos controles possíveis.",
      2: "Seguro é uma forma de transferir risco, e não a definição.",
      3: "A norma não propõe proibição genérica."
    }
  },
  {
    id: "fsc-50", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Evento de segurança", tipo: "unica",
    enunciado: "Um evento de segurança da informação é, segundo a Aula 5:",
    opcoes: [
      "Uma ocorrência identificada de um sistema, serviço ou rede que indica possível violação da política, falha de controles ou situação desconhecida relevante para a segurança",
      "Somente uma invasão confirmada com roubo de dados",
      "Um relatório anual de auditoria",
      "Um backup bem-sucedido"
    ],
    correta: 0,
    explicacao: "Evento é uma ocorrência que indica uma possível violação. Ele só vira incidente se de fato comprometer a segurança.",
    porque: {
      1: "Isso já seria um incidente confirmado.",
      2: "Um relatório não é um evento de segurança.",
      3: "Um backup bem-sucedido é uma operação normal."
    }
  },
  {
    id: "fsc-51", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Backup: valor da informação", tipo: "unica",
    enunciado: "Segundo a Aula 5, qual fator deve ser considerado na hora de montar a estratégia de backup e proteção dos dados?",
    opcoes: [
      "O valor da informação protegida: quanto mais estratégica, mais elevados e mais facilmente justificáveis serão os gastos",
      "Apenas o tamanho dos arquivos",
      "Apenas a marca do equipamento de backup",
      "Nenhum, pois toda informação tem o mesmo valor"
    ],
    correta: 0,
    explicacao: "É preciso preocupar-se não só com a perda, mas com acesso indevido e roubo de informações.",
    porque: {
      1: "O tamanho é relevante, mas o valor da informação é o fator central.",
      2: "A marca não define a estratégia.",
      3: "O valor varia, e isso orienta o investimento."
    }
  },
  {
    id: "fsc-52", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Problemas que ameaçam os dados", tipo: "multipla",
    enunciado: "Quais destes são problemas que podem levar à perda ou ao comprometimento de dados, segundo a Aula 5? Marque todos os corretos.",
    opcoes: [
      "Invasões e ataques de hackers",
      "Perda de informações por vírus",
      "Acesso indevido às informações (por exemplo, um DELETE FROM Cliente)",
      "Desastres naturais, como incêndios e inundações",
      "Falhas de hardware",
      "Realizar teste de restauração do backup"
    ],
    corretas: [0, 1, 2, 3, 4],
    explicacao: "A estratégia de backup/restore deve considerar todo esse conjunto de ameaças.",
    porque: {
      5: "Testar a restauração é boa prática e parte da estratégia, e não um problema."
    }
  },
  {
    id: "fsc-53", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Backup em fita x disponibilidade", tipo: "unica",
    enunciado: "Uma empresa exige que os dados estejam disponíveis 100% do tempo. Por que apenas o backup em fita não atende a esse requisito?",
    opcoes: [
      "Porque os dados ficariam indisponíveis durante o tempo de restauração da fita para o banco de dados",
      "Porque fitas não podem armazenar dados de bancos",
      "Porque o backup em fita é ilegal",
      "Porque fitas criptografam os dados de forma irreversível"
    ],
    correta: 0,
    explicacao: "Para alta disponibilidade, usam-se soluções como dois ou mais servidores com cópias idênticas, RAID, snapshot, mirroring e replicação, de modo que outro assuma se um falhar.",
    porque: {
      1: "Fitas armazenam dados de bancos sem problema.",
      2: "Não há ilegalidade.",
      3: "Não é o caso."
    }
  },
  {
    id: "fsc-54", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Resiliência e alta disponibilidade", tipo: "multipla",
    enunciado: "Quais soluções ajudam a atender requisitos de alta disponibilidade, segundo a Aula 5? Marque todas as corretas.",
    opcoes: ["RAID", "Snapshot", "Mirroring", "Replicação", "Fazer um único backup por ano"],
    corretas: [0, 1, 2, 3],
    explicacao: "Quando o requisito é de disponibilidade total, é justificável ter dois ou mais servidores com cópias idênticas dos dados.",
    porque: {
      4: "Um backup por ano deixa os dados desatualizados e indisponíveis na falha."
    }
  },
  {
    id: "fsc-55", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Planejamento do backup", tipo: "multipla",
    enunciado: "Quais perguntas devem ser feitas ao planejar a estratégia de backup/restore, segundo a Aula 5? Marque todas as corretas.",
    opcoes: [
      "Quais são os requisitos de disponibilidade?",
      "O banco deve estar online 24 horas por dia, sete dias por semana, ou pode ficar offline em certos horários?",
      "Qual o custo, financeiro e para a imagem, de parar as operações ou do site ficar indisponível?",
      "Qual o tempo aceitável até a restauração da normalidade após uma falha de hardware?",
      "Quem é o responsável pelas rotinas de backup e por verificar se elas estão em conformidade?",
      "Qual a cor da capa da fita de backup?"
    ],
    corretas: [0, 1, 2, 3, 4],
    explicacao: "São perguntas de planejamento: disponibilidade, custo da indisponibilidade, tempo de recuperação e responsabilidades.",
    porque: {
      5: "É um detalhe irrelevante para a estratégia."
    }
  },
  {
    id: "fsc-56", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Teste de restauração", tipo: "vf",
    enunciado: "Basta fazer o backup com regularidade; testar a restauração dos dados é desnecessário, pois um backup concluído sem erros sempre pode ser restaurado.",
    correta: false,
    explicacao: "Muitas vezes o backup termina sem problemas, mas na hora de restaurar surgem os problemas. Por isso, uma rotina de testes e simulação de restauração deve fazer parte da estratégia."
  },
  {
    id: "fsc-57", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Tipos de backup", tipo: "associacao",
    enunciado: "Associe cada tipo de backup à sua definição, segundo a Aula 5.",
    pares: [
      ["Normal (Full)", "Copia todos os arquivos que foram relacionados"],
      ["Incremental", "Copia os arquivos criados ou alterados desde o último backup normal ou incremental"],
      ["Diferencial", "Copia os arquivos criados ou alterados desde o último backup normal"]
    ],
    explicacao: "A diferença é a referência: o incremental considera o último backup (normal ou incremental) e o diferencial considera sempre o último backup normal."
  },
  {
    id: "fsc-58", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Backup diferencial", tipo: "unica",
    enunciado: "Domingo: backup normal. Segunda: arquivos A e B alterados. Terça: arquivo C alterado. Na terça, um backup DIFERENCIAL copia:",
    opcoes: [
      "Os arquivos A, B e C (tudo o que mudou desde o último backup normal)",
      "Apenas o arquivo C",
      "Todos os arquivos do servidor",
      "Nenhum arquivo"
    ],
    correta: 0,
    explicacao: "O diferencial sempre parte do último backup normal. Já o incremental, se tivesse sido feito na segunda, copiaria apenas o C na terça.",
    porque: {
      1: "Isso seria o incremental, caso houvesse um incremental na segunda.",
      2: "Isso seria um backup normal (full).",
      3: "O diferencial copia os arquivos que mudaram."
    }
  },
  {
    id: "fsc-59", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "Backup de banco de dados", tipo: "unica",
    enunciado: "Sobre o backup de bancos de dados (dump), segundo a Aula 5:",
    opcoes: [
      "Não é necessário parar o SQL nem desconectar os usuários, mas fazer o backup com usuários conectados causa queda brusca de desempenho",
      "É obrigatório desligar o servidor",
      "Não afeta o desempenho em nenhuma situação",
      "Só pode ser feito com todos os usuários conectados"
    ],
    correta: 0,
    explicacao: "O backup é a operação de copiar os dados para um dispositivo físico de backup, podendo ser feita por um comando.",
    porque: {
      1: "Não é obrigatório desligar o servidor.",
      2: "Há impacto de desempenho quando há usuários conectados.",
      3: "Não é um requisito."
    }
  },
  {
    id: "fsc-60", disc: "fsc", unidade: "Aula 05 · ISO 27002 e backup", tema: "O que deve entrar no backup", tipo: "multipla",
    enunciado: "Segundo a Aula 5, quais dados devem ser salvos em backup? Marque todos os corretos.",
    opcoes: [
      "Os arquivos do servidor de arquivos",
      "Os e-mails, caso se use servidor de e-mail interno",
      "As configurações dos servidores",
      "Apenas os arquivos do departamento de TI"
    ],
    corretas: [0, 1, 2],
    explicacao: "A regra da aula é que todos os dados devem ser salvos em backup.",
    porque: {
      3: "Todos os dados devem ser protegidos, e não apenas os de um departamento."
    }
  },

  /* Aula 13 · Funções hash */
  {
    id: "fsc-61", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "O que é um hash", tipo: "unica",
    enunciado: "Na Aula 13, o hash é comparado a uma \"impressão digital\" digital. O que ele faz?",
    opcoes: [
      "Transforma uma entrada de qualquer tamanho em uma saída de tamanho fixo",
      "Cifra a mensagem de forma que possa ser decifrada com uma chave",
      "Gera uma saída de tamanho variável conforme a entrada",
      "Esconde uma mensagem dentro de uma imagem"
    ],
    correta: 0,
    explicacao: "É uma função matemática: entrada de qualquer tamanho vira saída de tamanho fixo. No blockchain, serve para identificar blocos, encadear cronologicamente (hash do bloco anterior) e gerar endereços de carteira.",
    porque: {
      1: "Hash não é reversível e não usa chave de decifragem.",
      2: "A saída tem tamanho fixo.",
      3: "Isso é esteganografia."
    }
  },
  {
    id: "fsc-62", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "As quatro propriedades do hash", tipo: "associacao",
    enunciado: "Associe cada propriedade da função hash ao que ela garante, segundo a Aula 13.",
    pares: [
      ["Determinismo", "A mesma entrada gera sempre a mesma saída; base do consenso entre os nós"],
      ["Irreversibilidade (one-way)", "Fácil calcular a ida, impossível reverter a volta"],
      ["Efeito avalanche", "Mudança mínima na entrada provoca mudança drástica na saída"],
      ["Resistência a colisões", "É inviável encontrar dois inputs X e Y tais que Hash(X) = Hash(Y)"]
    ],
    explicacao: "Esses são os quatro pilares trabalhados no laboratório TinyHash."
  },
  {
    id: "fsc-63", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "Determinismo e consenso", tipo: "unica",
    enunciado: "Por que o determinismo é vital em uma rede blockchain?",
    opcoes: [
      "Porque permite que todos os nós cheguem ao mesmo resultado; se mudasse aleatoriamente, a rede não confiaria nos dados",
      "Porque faz o hash ser diferente a cada cálculo, dificultando ataques",
      "Porque permite reverter o hash e recuperar a transação",
      "Porque elimina a necessidade de qualquer outra propriedade"
    ],
    correta: 0,
    explicacao: "O determinismo é a base do consenso.",
    porque: {
      1: "Isso contradiria o determinismo.",
      2: "Hash é de mão única.",
      3: "As quatro propriedades são necessárias."
    }
  },
  {
    id: "fsc-64", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "Efeito avalanche (exemplo)", tipo: "unica",
    enunciado: "O hash de \"Blockchain\" é totalmente diferente do hash de \"blockchain\" (só mudou a primeira letra). Qual propriedade isso ilustra, e o que ela impede?",
    opcoes: [
      "Efeito avalanche; impede ataques de proximidade, em que se chegaria ao resultado certo tentando entradas parecidas",
      "Determinismo; impede que a rede chegue a consenso",
      "Resistência à pré-imagem; permite reverter o hash",
      "Resistência a colisões; permite que dois inputs tenham o mesmo hash"
    ],
    correta: 0,
    explicacao: "Mudança mínima no input gera mudança drástica no output.",
    porque: {
      1: "O determinismo garante a mesma saída para a mesma entrada, e é a base do consenso.",
      2: "Não é possível reverter um hash.",
      3: "A resistência a colisões torna inviável achar dois inputs com o mesmo hash."
    }
  },
  {
    id: "fsc-65", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "Resistência a colisões e integridade", tipo: "unica",
    enunciado: "Se fosse fácil encontrar colisões em um hash, o que um atacante poderia fazer em um blockchain?",
    opcoes: [
      "Trocar uma transação por outra mantendo o mesmo hash do bloco, comprometendo a integridade",
      "Descobrir a chave privada de qualquer usuário a partir do hash",
      "Aumentar a velocidade da rede",
      "Nada, pois colisões não afetam a integridade"
    ],
    correta: 0,
    explicacao: "A resistência a colisões garante a integridade: se alterar um centavo em uma transação, o hash muda. Sem essa propriedade, seria possível trocar a transação mantendo o hash.",
    porque: {
      1: "Essa não é a consequência direta das colisões.",
      2: "Colisões não aceleram a rede.",
      3: "Afetam diretamente a integridade."
    }
  },
  {
    id: "fsc-66", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "Irreversibilidade (aplicações)", tipo: "multipla",
    enunciado: "Quais são aplicações da irreversibilidade do hash, segundo a Aula 13? Marque todas as corretas.",
    opcoes: [
      "Esconder a chave privada atrás de uma chave pública ou endereço",
      "Garantir que o conteúdo do bloco não possa ser deduzido pelo hash",
      "Permitir recuperar a mensagem original a partir do digest",
      "Fazer a saída variar de tamanho"
    ],
    corretas: [0, 1],
    explicacao: "Fácil calcular (ida), impossível reverter (volta): a propriedade de mão única.",
    porque: {
      2: "Se fosse possível recuperar a mensagem, o hash não seria irreversível.",
      3: "O tamanho da saída é fixo."
    }
  },
  {
    id: "fsc-67", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "Paradoxo do aniversário", tipo: "multipla",
    enunciado: "Sobre o paradoxo do aniversário, segundo a Aula 13, quais afirmações estão corretas? Marque todas as corretas.",
    opcoes: [
      "Em 23 pessoas há cerca de 50% de chance de duas fazerem aniversário no mesmo dia",
      "Bastam cerca de 57 pessoas para chegar a 99% de probabilidade de coincidência",
      "Para um hash de n bits, são necessárias cerca de 2^(n/2) tentativas para encontrar uma colisão",
      "Com 365 pessoas a coincidência é impossível",
      "Para colidir um hash de n bits são necessárias exatamente 2^n tentativas"
    ],
    corretas: [0, 1, 2],
    explicacao: "Por isso um hash de 8 bits (256 possibilidades) colide com cerca de 16 a 20 tentativas, e o SHA-256 (2^128 para colisões) é necessário para evitar ataques maliciosos.",
    porque: {
      3: "Com 365 pessoas a probabilidade é praticamente 100%, e não impossível.",
      4: "O ataque de aniversário reduz o esforço para cerca de 2^(n/2)."
    }
  },
  {
    id: "fsc-68", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "Colisão em hash de 8 bits", tipo: "unica",
    enunciado: "Em um hash pedagógico de 8 bits (256 saídas possíveis, como o TinyHash do laboratório), cerca de quantas tentativas bastam para achar uma colisão com alta probabilidade?",
    opcoes: ["Cerca de 16 a 20", "Cerca de 256", "Mais de 1 milhão", "Mais de 2^128"],
    correta: 0,
    explicacao: "2^(8/2) = 2^4 = 16. É por isso que 8 bits é perigoso e que se usam hashes de 256 bits.",
    porque: {
      1: "O paradoxo do aniversário reduz bem esse número.",
      2: "É muito acima do necessário para 8 bits.",
      3: "Esse é o esforço aproximado de colisão do SHA-256."
    }
  },
  {
    id: "fsc-69", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "Qualquer par x bloco específico", tipo: "unica",
    enunciado: "Por que um atacante foca em colisões, e não em inverter um bloco específico, segundo a discussão da Aula 13?",
    opcoes: [
      "Porque encontrar qualquer par de entradas que colidem é muito mais fácil (aniversário) do que inverter um hash específico",
      "Porque inverter um hash é trivial",
      "Porque colisões não exigem nenhum cálculo",
      "Porque a inversão exige a chave privada do bloco"
    ],
    correta: 0,
    explicacao: "Há diferença entre encontrar \"qualquer par\" e \"inverter um bloco específico\". O primeiro é custo ~2^(n/2) e o segundo, ~2^n.",
    porque: {
      1: "Inverter um hash é inviável (irreversibilidade).",
      2: "Colisões exigem muitos cálculos, ainda que menos que a inversão.",
      3: "Hash não usa chaves privadas."
    }
  },
  {
    id: "fsc-70", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "Padrões da indústria", tipo: "associacao",
    enunciado: "Associe cada padrão de hash ao seu uso, segundo a Aula 13.",
    pares: [
      ["SHA-256", "Motor do Bitcoin, com 64 caracteres hexadecimais"],
      ["Keccak-256 (SHA-3)", "Base do Ethereum, com arquitetura de esponja"],
      ["RIPEMD-160", "Usado para endereços curtos, economizando espaço na rede"]
    ],
    explicacao: "Hash é a base da confiança em sistemas distribuídos: sem integridade, não há moeda digital."
  },
  {
    id: "fsc-71", disc: "fsc", unidade: "Aula 13 · Funções hash", tema: "Laboratório TinyHash", tipo: "unica",
    enunciado: "O TinyHash, do laboratório da Aula 13, é:",
    opcoes: [
      "Um algoritmo pedagógico de 8 bits (0 a 255) para ver os quatro pilares do hash em tempo real",
      "Um algoritmo de criptografia assimétrica de 2048 bits",
      "Um tipo de malware",
      "Um padrão de hash usado no Bitcoin"
    ],
    correta: 0,
    explicacao: "Ele simula a matemática interna com um multiplicador (primo) e um módulo. Nos exercícios: alterar a constante primo para ver o efeito no espalhamento e aumentar para 16 bits para cronometrar a busca por colisões.",
    porque: {
      1: "TinyHash é uma função hash, e não criptografia assimétrica.",
      2: "É uma ferramenta de ensino.",
      3: "O padrão do Bitcoin é o SHA-256."
    }
  },
  {
    id: "fsc-72", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Funções hash MD4, MD5 e SHA-1", tipo: "associacao",
    enunciado: "Associe cada algoritmo de hash ao que a Aula 4 diz sobre ele.",
    pares: [
      ["MD4", "Desenvolvido em 1990/91 por Ron Rivest; considerado frágil após vários ataques"],
      ["MD5", "Hash unidirecional de 128 bits, descrito na RFC 1321, processa blocos de 512 bits"],
      ["SHA-1", "Desenvolvido pelo NIST e pela NSA; já foram exploradas falhas"]
    ],
    explicacao: "O MD5 é muito usado em verificação de integridade, logins e softwares P2P, mas existem métodos de ataque divulgados contra ele."
  },
  {
    id: "fsc-73", disc: "fsc", unidade: "Aula 04 · Criptografia", tema: "Uso do md5sum", tipo: "unica",
    enunciado: "Na Aula 4, usa-se o comando md5sum sobre um arquivo (como uma imagem ISO de 5,1 GB). Para que serve o resultado?",
    opcoes: [
      "Gerar um digest de 128 bits que permite verificar a integridade do arquivo",
      "Cifrar o arquivo para que só o destinatário o abra",
      "Compactar o arquivo para economizar espaço",
      "Autenticar o remetente do arquivo"
    ],
    correta: 0,
    explicacao: "Um arquivo de qualquer tamanho produz um digest de tamanho fixo. Se o arquivo for alterado, o resultado muda. Hoje o MD5 não é recomendado para fins criptográficos.",
    porque: {
      1: "md5sum não cifra.",
      2: "Não compacta.",
      3: "Hash sozinho não autentica o remetente."
    }
  }
];
