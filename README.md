# AstroForge

Jogo espacial vetorial, inspirado em Asteroids e construído para demonstrar paradigmas de programação em JavaScript moderno.

## Executar

Não há dependências. Para servir localmente, execute `npm run serve` e abra `http://localhost:8080`. Para validar a lógica pura, use `npm test`.

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

## Publicação no GitHub Pages

No GitHub, abra **Settings → Pages**, selecione **Deploy from a branch**, branch `main` e pasta `/(root)`. Como é um site estático, não há build.
