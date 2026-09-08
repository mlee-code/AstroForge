# Decisões técnicas

- Canvas: renderiza dezenas de objetos procedurais de modo eficiente.
- Grade espacial uniforme: `Map<cell, Entity[]>`; inserção O(n), pares locais O(nk), espaço O(n). A alternativa ingênua é O(n²); quadtree seria excessiva neste porte.
- LocalStorage atrás de repositórios: suficiente para Pages e substituível por API/SQLite futura.
- Worker apenas para estatísticas: evita trabalho não essencial na interface, sem transferir física leve.
- Build sem dependências: `scripts/build.mjs` copia somente ativos estáticos para `dist`; é O(f) em arquivos e mantém o deploy reproduzível sem bundler.
