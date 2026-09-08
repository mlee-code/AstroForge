# Paradigmas no AstroForge

## Imperativo e estruturado

`Game.loop`, `update` e `draw` expressam o fluxo temporal do jogo: recebem tempo decorrido, atualizam o estado e renderizam o quadro. Funções pequenas separam movimentação, dano, explosão e HUD.

## Orientação a objetos e composição

`Entity` fornece posição e movimento. `Ship`, `Asteroid`, `Projectile` e `Particle` especializam comportamento que é realmente diferente. `Ship` **compõe** `Weapon`; não há hierarquia artificial de armas ou controladores.

## Funcional e declarativo

`math.js` contém transformações puras. `summarizeMatches` usa `reduce`; geração de vértices e asteroides usa `Array.from`/`map`. O histórico persistido é uma coleção de dados simples, e o worker o transforma em resumo sem alterar os registros.

## Eventos

Um **evento** é o fato (`game:end`, `weapon:shot`). Um **handler** é uma função que reage a ele; por exemplo, o handler de `game:end` salva o histórico e atualiza a tela. O **callback** é a função passada a `bus.on`. `EventBus` é o dispatcher: ele mantém listeners e publica eventos, evitando que entidades conheçam a UI.

## Multiple dispatch

JavaScript usa normalmente single dispatch: `obj.metodo()` seleciona por `obj`. `CollisionDispatcher` escolhe explicitamente um handler pela combinação ordenada de dois tipos: `Asteroid:Projectile`, `Asteroid:Ship` ou `Asteroid:Asteroid`. Assim, a regra de colisão fica fora das entidades e evidencia o despacho múltiplo sem biblioteca.

## Worker: assincronicidade, concorrência e paralelismo

O loop e Canvas permanecem na thread principal. `stats-worker.js` recebe partidas encerradas e calcula agregados; mensagens são **assíncronas**. Isso é **concorrência**, pois trabalho e UI progridem independentemente. Pode haver **paralelismo** quando o navegador agenda o Worker em outro núcleo, mas não é garantido. Física é leve e fica na thread principal para evitar custo de cópia e latência.

## Geração, física e colisão

`generateShip(seed)` e `generateAsteroid(seed)` usam um PRNG determinístico: seed igual produz a mesma forma, material, irregularidade e quantidade de vértices. A física usa posição, velocidade, direção e rotação; asteroides trocam impulso simples. As entidades usam aproximação **circle-circle** para colisão, adequada ao ritmo e às formas quase circulares. Os polígonos são usados para renderizar, não para colisão: SAT/polygon-polygon não traria benefício perceptível aqui e aumentaria complexidade.

## Persistência local

GitHub Pages é estático, portanto um arquivo `.txt` não é banco de dados viável. `PlayerRepository`, `GameRepository` e `StatisticsRepository` encapsulam `localStorage`, mantendo o contrato substituível. O save guarda perfil, seed/configuração da nave, dificuldade, posição/velocidade, asteroides com seeds, pontos, vidas e estatísticas. Uma futura camada relacional poderia modelar `players(id, name)`, `games(player_id, state, saved_at)` e `matches(player_id, score, metrics)` em SQLite/PostgreSQL, sem mudar a interface dos repositórios.
