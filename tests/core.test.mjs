import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveStats, formatScore, polygon, summarizeMatches, wrap } from '../src/math.js';
import { CollisionDispatcher } from '../src/collision.js';
import { generateAsteroid, generateShip } from '../src/generation.js';
import { SpatialGrid } from '../src/spatial-grid.js';

test('wrap mantém coordenadas dentro do mundo', () => { assert.equal(wrap(-2, 10), 8); assert.equal(wrap(12, 10), 2); });
test('formata pontuação e agrega partidas sem mutação', () => { assert.equal(formatScore(42), '000042'); const matches = [{ score: 120, destroyed: 2 }, { score: 300, destroyed: 5 }]; assert.deepEqual(summarizeMatches(matches), { games: 2, score: 420, best: 300, destroyed: 7 }); });
test('polígono procedural possui número solicitado de vértices', () => { assert.equal(polygon(9, 30, .2, () => .5).length, 9); });
test('dispatcher escolhe handler pelo par de tipos', () => { const dispatcher = new CollisionDispatcher().register('Ship', 'Asteroid', () => 'hit'); assert.equal(dispatcher.dispatch({ type: 'Asteroid' }, { type: 'Ship' }), 'hit'); });
test('geradores são determinísticos para a mesma seed', () => { assert.deepEqual(generateAsteroid('rocha-9'), generateAsteroid('rocha-9')); assert.deepEqual(generateShip('nave-2', 'sentinela'), generateShip('nave-2', 'sentinela')); });
test('estatísticas derivam precisão de acertos, não de destruições', () => { assert.deepEqual(deriveStats({ shots: 8, hits: 3, elapsed: 7.9 }), { shots: 8, hits: 3, elapsed: 7.9, accuracy: 38, survivalSeconds: 7 }); });
test('grade espacial só retorna pares próximos candidatos', () => { const grid = new SpatialGrid(50); grid.insert({ id: 1, x: 10, y: 10 }); grid.insert({ id: 2, x: 60, y: 10 }); grid.insert({ id: 3, x: 400, y: 400 }); assert.deepEqual(grid.pairs().map(([a, b]) => [a.id, b.id]), [[1, 2]]); });
