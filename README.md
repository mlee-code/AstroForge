# AstroForge

Jogo espacial vetorial, inspirado em Asteroids e construído para demonstrar paradigmas de programação em JavaScript moderno. URL publicada: pendente de autenticação e primeiro push ao GitHub.

## Executar

Não há dependências. Para servir localmente, execute `npm run serve` e abra `http://localhost:8080`. Para validar a lógica pura, use `npm test`. Para gerar o pacote estático de produção, use `npm run build`; a saída é `dist/`.

Controles: `W`/`↑` acelera, `A`/`D` ou `←`/`→` gira, `Espaço` dispara e `P` pausa. O menu permite criar perfil, escolher dificuldade e uma nave vetorial determinada por seed. Pausar ou ocultar a página salva a missão no navegador para **Continuar jogo**.

## Arquitetura

- `src/game.js`: fluxo imperativo do loop, renderização Canvas e regras de partida.
- `src/entities.js`: entidades OO com composição (`Ship` possui `Weapon`) e geração procedural dos polígonos.
- `src/events.js`: event bus desacoplado para entrada, tiro, colisão, níveis e fim de jogo.
- `src/collision.js`: despacho múltiplo didático para pares de tipos.
- `src/math.js`: funções puras para geometria e agregação funcional.
- `src/stats-worker.js`: estatísticas históricas fora da thread de interface.
- `src/generation.js`: geradores determinísticos `generateShip(seed)` e `generateAsteroid(seed)`.
- `src/persistence.js`: repositórios locais substituíveis, compatíveis com GitHub Pages.

Detalhes e decisões: [docs/PARADIGMAS.md](docs/PARADIGMAS.md).

## Programming Paradigms Demonstrated

- **Imperativo/estruturado:** loop e regras em `src/game.js`.
- **Orientação a objetos:** entidades em `src/entities.js`; `Ship` compõe `Weapon`.
- **Funcional:** funções puras e agregações em `src/math.js`.
- **Eventos:** `EventBus` e `Events` em `src/events.js`.
- **Multiple dispatch:** regras entre pares em `src/collision.js`.
- **Concorrência/assincronicidade:** `src/stats-worker.js` calcula agregados fora da UI.
- **Declarativo:** dados persistidos e filtros/agregações de coleções.

Documentação adicional: [Projeto](PROJECT.md), [Arquitetura](ARCHITECTURE.md), [Requisitos](REQUIREMENTS.md), [Decisões](DECISIONS.md), [Testes](TESTING.md) e [Roadmap](ROADMAP.md).

## Publicação no GitHub Pages

O workflow `.github/workflows/pages.yml` publica a branch `main`. Em **Settings → Pages**, selecione **GitHub Actions** como fonte. Não há build; os arquivos estáticos são o artefato de produção.
