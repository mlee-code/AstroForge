import { EventBus, Events } from './events.js';
import { Game } from './game.js';

const $ = (selector) => document.querySelector(selector);
const ui = { score: $('#score'), lives: $('#lives'), level: $('#level'), telemetry: $('#telemetry'), overlay: $('#overlay'), overlayText: $('#overlay-text'), start: $('#start') };
const bus = new EventBus();
const game = new Game($('#game'), bus, ui);
const pressed = new Set();
const keyMap = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'thrust', KeyW: 'thrust' };
const syncInput = () => Object.assign(game.input, Object.fromEntries(Object.entries(keyMap).map(([key, action]) => [action, pressed.has(key)])));
document.addEventListener('keydown', (event) => { if (['Space', ...Object.keys(keyMap), 'KeyP'].includes(event.code)) event.preventDefault(); if (event.code === 'KeyP') game.togglePause(); if (event.code === 'Space') game.shoot(); pressed.add(event.code); syncInput(); });
document.addEventListener('keyup', (event) => { pressed.delete(event.code); syncInput(); });
ui.start.addEventListener('click', () => { ui.overlay.classList.add('hidden'); game.start(); });

// Persistência declarativa: uma lista de partidas é transformada por map/filter/reduce no Worker.
const worker = new Worker(new URL('./stats-worker.js', import.meta.url), { type: 'module' });
bus.on(Events.END, ({ score, destroyed, level }) => { const matches = JSON.parse(localStorage.getItem('astroforge.matches') ?? '[]'); matches.push({ score, destroyed, level, at: new Date().toISOString() }); localStorage.setItem('astroforge.matches', JSON.stringify(matches.slice(-30))); worker.postMessage(matches); ui.overlayText.textContent = `Missão encerrada: ${score} pontos, ${destroyed} rochas destruídas.`; ui.start.textContent = 'NOVA MISSÃO'; ui.overlay.classList.remove('hidden'); });
worker.onmessage = ({ data }) => { ui.telemetry.textContent = `Recorde local: ${data.best} · ${data.games} missões analisadas`; };
bus.on(Events.PAUSE, ({ paused }) => { ui.telemetry.textContent = paused ? 'Missão pausada.' : 'Missão retomada.'; });
