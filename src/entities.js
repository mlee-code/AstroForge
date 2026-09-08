import { randomRange, wrap } from './math.js';
import { generateAsteroid, generateShip } from './generation.js';

let nextId = 1;
export class Entity {
  constructor(type, { x, y, vx = 0, vy = 0, radius = 10, angle = 0 }) { Object.assign(this, { id: nextId++, type, x, y, vx, vy, radius, angle, dead: false }); }
  move(dt, bounds) { this.x = wrap(this.x + this.vx * dt, bounds.width); this.y = wrap(this.y + this.vy * dt, bounds.height); }
}
export class Weapon {
  constructor(cooldown = .18) { this.cooldown = cooldown; this.elapsed = cooldown; }
  update(dt) { this.elapsed += dt; }
  fire(ship) { if (this.elapsed < this.cooldown) return null; this.elapsed = 0; const speed = 560; return new Projectile({ x: ship.x + Math.cos(ship.angle) * 19, y: ship.y + Math.sin(ship.angle) * 19, vx: ship.vx + Math.cos(ship.angle) * speed, vy: ship.vy + Math.sin(ship.angle) * speed, angle: ship.angle }); }
}
export class Ship extends Entity {
  constructor(position, configuration = {}) { super('Ship', { ...position, radius: 14, angle: -Math.PI / 2 }); this.weapon = new Weapon(); this.invulnerable = 2; this.configuration = { seed: configuration.seed ?? 'default-ship', variant: configuration.variant ?? 'interceptor' }; this.visual = generateShip(this.configuration.seed, this.configuration.variant); }
  update(dt, input, bounds) { const turn = (input.left ? -1 : 0) + (input.right ? 1 : 0); this.angle += turn * 4.4 * dt; if (input.thrust) { this.vx += Math.cos(this.angle) * 310 * dt; this.vy += Math.sin(this.angle) * 310 * dt; } const drag = Math.pow(.991, dt * 60); this.vx *= drag; this.vy *= drag; this.weapon.update(dt); this.invulnerable = Math.max(0, this.invulnerable - dt); this.move(dt, bounds); }
}
export class Projectile extends Entity { constructor(props) { super('Projectile', { ...props, radius: 3 }); this.life = 1.05; } update(dt, bounds) { this.life -= dt; this.dead = this.life <= 0; this.move(dt, bounds); } }
export class Asteroid extends Entity {
  constructor({ x, y, size = 3, vx, vy, random = Math.random, seed = `${Date.now()}-${Math.random()}` }) { const generated = generateAsteroid(seed, size); super('Asteroid', { x, y, vx: vx ?? randomRange(-95, 95, random), vy: vy ?? randomRange(-95, 95, random), radius: generated.radius, angle: randomRange(0, Math.PI * 2, random) }); this.size = size; this.mass = size * 2; this.hardness = generated.material.hardness * size; this.material = generated.material; this.seed = generated.seed; this.spin = generated.spin; this.shape = generated.shape; }
  update(dt, bounds) { this.angle += this.spin * dt; this.move(dt, bounds); }
  fragments(random = Math.random) { return this.size > 1 ? [0, 1].map((_, index) => new Asteroid({ x: this.x, y: this.y, size: this.size - 1, seed: `${this.seed}:${index}`, vx: this.vx + randomRange(-60, 60, random), vy: this.vy + randomRange(-60, 60, random), random })) : []; }
}
export class Particle extends Entity { constructor({ x, y, color = '#ffbc54', random = Math.random }) { const angle = randomRange(0, Math.PI * 2, random), speed = randomRange(40, 180, random); super('Particle', { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, radius: randomRange(1, 3, random) }); this.life = randomRange(.25, .65, random); this.maxLife = this.life; this.color = color; } update(dt, bounds) { this.life -= dt; this.dead = this.life <= 0; this.move(dt, bounds); } }
export const spawnAsteroids = (amount, bounds, random = Math.random, seed = 'field') => Array.from({ length: amount }, (_, index) => { const side = Math.floor(random() * 4); const x = side < 2 ? random() * bounds.width : (side === 2 ? -30 : bounds.width + 30); const y = side >= 2 ? random() * bounds.height : (side === 0 ? -30 : bounds.height + 30); return new Asteroid({ x, y, random, seed: `${seed}:${index}` }); });
