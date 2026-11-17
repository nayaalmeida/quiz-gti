# Quiz GTI

Quiz de estudo gamificado para as provas do 5º período de Gestão da Tecnologia da Informação (GTI) e para o ENADE.

Feito em HTML, CSS e JavaScript puros, sem dependências. Funciona offline e roda direto no GitHub Pages.

> Projeto independente de estudo. Não é material oficial de nenhuma instituição. As questões são inéditas, de treino.

## Conteúdo: 292 questões comentadas

| Bloco | Questões |
|---|---|
| Gestão de Segurança Cibernética | 151 |
| Fundamentos de Segurança da Informação e Criptografia (Aulas 1 a 5 e 13) | 73 |
| Governança em TI | 28 |
| Estudos Avançados em GTI | 16 |
| Simulado ENADE · componente específico | 16 |
| Simulado ENADE · formação geral | 8 |

O simulado do ENADE tem uma questão para cada um dos 16 objetos de conhecimento da Portaria Inep nº 171/2026 (diretrizes de GTI a partir da edição 2026): algoritmos, arquitetura de computadores, sistemas operacionais, banco de dados, engenharia de software, gestão de projetos, gestão de pessoas, gerenciamento de serviços de TI, inteligência de negócios, governança de TI, gestão estratégica, processos organizacionais, redes, segurança da informação, sistemas de informações gerenciais e ética, tecnologia e sociedade. Usa os formatos típicos da prova: situação-problema, afirmações I, II e III e asserção-razão.

## O que o app faz

- Correção na hora, com explicação e o motivo de cada alternativa errada.
- **Modo prova:** você responde tudo sem ver o gabarito e recebe a correção comentada no final.
- Resultado com revisão questão por questão (sua resposta, a correta e a explicação).
- Cinco formatos: múltipla escolha, mais de uma correta, verdadeiro/falso, lacunas e associação.
- Filtros por disciplina e unidade; modos "todas", "só as que errei" e "ainda não respondidas".
- Créditos, combo de acertos, 8 níveis, 13 conquistas e diploma (não oficial) aos 1000 créditos.
- Progresso salvo no navegador, com a rodada em andamento. Backup em arquivo para trocar de aparelho.
- Tema claro e escuro, menu inferior no celular, navegação por teclado (1-9 ou A-J escolhem, Enter confirma).

## Publicar no GitHub Pages (passo a passo)

**Primeira vez**

1. Entre em github.com, toque em **+** (canto superior direito) e em **New repository**.
2. Dê um nome (ex.: `quiz-gti`), marque **Public** e toque em **Create repository**.
3. Na página do repositório, toque em **uploading an existing file** (ou **Add file → Upload files**).
4. Selecione os arquivos desta pasta: `index.html`, `app.js`, `styles.css`, `questoes.js`, `README.md` e `.nojekyll`. Eles precisam ficar soltos na raiz, não dentro de uma subpasta.
5. Role até o fim e toque em **Commit changes**.
6. Vá em **Settings → Pages**. Em *Source*, escolha **Deploy from a branch**; em *Branch*, escolha `main` e `/ (root)`; toque em **Save**.
7. Espere um ou dois minutos e atualize a página: o endereço aparece no topo, no formato `https://SEU-USUARIO.github.io/quiz-gti/`.

**Atualizar depois**

1. No repositório, **Add file → Upload files**.
2. Envie os arquivos novos com os mesmos nomes; o GitHub substitui os antigos.
3. **Commit changes**. O site atualiza sozinho em um ou dois minutos. Se continuar aparecendo a versão antiga, recarregue a página sem cache.

Para testar no computador, basta abrir o `index.html`.

## Personalizar

Tudo fica em `questoes.js`:

- `CONFIG`: título, subtítulo, seu nome e link que aparecem no rodapé, e quantos créditos valem a "colação".
- `DISCIPLINAS`: id, nome, sigla e cor de cada disciplina.
- `QUESTOES`: o banco de questões.

### Formato das questões

Campos comuns: `id` (único), `disc` (id da disciplina), `unidade`, `tema`, `tipo`, `enunciado`, `explicacao`.
Opcionais: `codigo` (trecho mostrado em bloco) e `porque` (motivo de cada alternativa errada, pelo índice).

```js
// múltipla escolha (índices começam em 0)
{ id: "gov-11", disc: "gov", unidade: 1, tema: "Compliance", tipo: "unica",
  enunciado: "…", opcoes: ["A", "B", "C", "D"], correta: 2,
  explicacao: "…", porque: { 0: "…", 1: "…", 3: "…" } }

// mais de uma correta
{ tipo: "multipla", opcoes: ["A", "B", "C"], corretas: [0, 2], … }

// verdadeiro ou falso
{ tipo: "vf", correta: false, … }

// lacunas: {{1}}, {{2}} no texto; corretas na mesma ordem
{ tipo: "lacuna", texto: "Um {{1}} vira {{2}} quando…",
  banco: ["evento", "incidente", "ativo"], corretas: ["evento", "incidente"], … }

// associação: [item, resposta]; "extras" são respostas sobrando (opcional)
{ tipo: "associacao", pares: [["Worm", "Propaga-se sozinho"], ["Spyware", "Coleta dados"]], … }
```

Nas questões de múltipla escolha as alternativas são embaralhadas a cada vez. Para manter a ordem (como em "I e II, apenas" ou asserção-razão), acrescente `fixa: true`.

Depois de editar, aumente o `?v=8` das linhas de `questoes.js`, `app.js` e `styles.css` no `index.html` para o navegador não usar a versão antiga em cache.

## Regras do jogo

- Primeiro acerto de uma questão: +10 créditos (+5 se for lacuna, associação ou múltipla resposta).
- Acertar de novo uma questão já dominada: +2.
- Acertar uma que você tinha errado: +5 de bônus.
- Combo: a partir de 3 acertos seguidos, +5 por questão. Errar zera o combo, mas nunca tira créditos.

## Créditos

Inspirado no [Quiz GTI · Edição Formatura](https://github.com/leonidasprof/estudando5periodo), de Leônidas Leandro. O código, o visual e as questões deste repositório foram escritos do zero.
