// Broad phase: grade uniforme. Reduz pares candidatos antes da colisão circle-circle precisa.
export class SpatialGrid {
  constructor(cellSize = 96) { this.cellSize = cellSize; this.cells = new Map(); }
  key(x, y) { return `${Math.floor(x / this.cellSize)}:${Math.floor(y / this.cellSize)}`; }
  insert(entity) { const key = this.key(entity.x, entity.y); const bucket = this.cells.get(key) ?? []; bucket.push(entity); this.cells.set(key, bucket); }
  pairs() { const found = new Set(); const output = []; for (const [key, bucket] of this.cells) { const [x, y] = key.split(':').map(Number); for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (const a of bucket) for (const b of this.cells.get(`${x + dx}:${y + dy}`) ?? []) { if (a === b) continue; const id = a.id < b.id ? `${a.id}:${b.id}` : `${b.id}:${a.id}`; if (!found.has(id)) { found.add(id); output.push([a, b]); } } } return output; }
}
