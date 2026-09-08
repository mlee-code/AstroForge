import { distance, normalize } from './math.js';

const pairKey = (a, b) => [a.type, b.type].sort().join(':');
// Multiple dispatch explícito: seleciona a regra pelo par de tipos em tempo de execução.
export class CollisionDispatcher {
  #rules = new Map();
  register(typeA, typeB, handler) { this.#rules.set([typeA, typeB].sort().join(':'), handler); return this; }
  dispatch(a, b, context) { return this.#rules.get(pairKey(a, b))?.(a, b, context); }
}
export const collides = (a, b) => distance(a, b) < a.radius + b.radius;
const explode = (entity, context) => { entity.dead = true; context.explode(entity); };
export const collisions = new CollisionDispatcher()
  .register('Asteroid', 'Projectile', (a, b, context) => { const asteroid = a.type === 'Asteroid' ? a : b; const projectile = a.type === 'Projectile' ? a : b; explode(projectile, context); explode(asteroid, context); context.score += asteroid.size * 100; context.spawn(asteroid.fragments()); context.destroyed++; context.hits++; context.destroyedBySize[asteroid.size]++; })
  .register('Asteroid', 'Ship', (a, b, context) => { const ship = a.type === 'Ship' ? a : b; if (!ship.invulnerable) { explode(ship, context); context.damage(); } })
  .register('Asteroid', 'Asteroid', (a, b) => { const normal = normalize({ x: b.x - a.x, y: b.y - a.y }); const relative = (a.vx - b.vx) * normal.x + (a.vy - b.vy) * normal.y; if (relative <= 0) return; const impulse = (2 * relative) / (a.mass + b.mass); a.vx -= impulse * b.mass * normal.x; a.vy -= impulse * b.mass * normal.y; b.vx += impulse * a.mass * normal.x; b.vy += impulse * a.mass * normal.y; });
