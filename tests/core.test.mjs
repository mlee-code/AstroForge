import test from 'node:test';
import assert from 'node:assert/strict';
import { formatScore, polygon, summarizeMatches, wrap } from '../src/math.js';
import { CollisionDispatcher } from '../src/collision.js';

test('wrap mantém coordenadas dentro do mundo', () => { assert.equal(wrap(-2, 10), 8); assert.equal(wrap(12, 10), 2); });
test('formata pontuação e agrega partidas sem mutação', () => { assert.equal(formatScore(42), '000042'); const matches = [{ score: 120, destroyed: 2 }, { score: 300, destroyed: 5 }]; assert.deepEqual(summarizeMatches(matches), { games: 2, score: 420, best: 300, destroyed: 7 }); });
test('polígono procedural possui número solicitado de vértices', () => { assert.equal(polygon(9, 30, .2, () => .5).length, 9); });
test('dispatcher escolhe handler pelo par de tipos', () => { const dispatcher = new CollisionDispatcher().register('Ship', 'Asteroid', () => 'hit'); assert.equal(dispatcher.dispatch({ type: 'Asteroid' }, { type: 'Ship' }), 'hit'); });
