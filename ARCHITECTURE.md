# Arquitetura

`main.js` é a camada de apresentação e entrada. `game.js` coordena estado e loop. Entidades vivem em `entities.js`; regras de pares em `collision.js`; broad phase em `spatial-grid.js`; geração em `generation.js`; eventos em `events.js`; persistência em `persistence.js`; estatísticas puras em `math.js` e agregações em Worker.

Fluxo: entrada → Game.update → SpatialGrid → CollisionDispatcher → EventBus → UI/persistência.
