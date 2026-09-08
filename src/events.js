// Evento = fato ocorrido; handler = função que reage; callback = função recebida pelo dispatcher.
export class EventBus {
  #listeners = new Map();
  on(event, callback) { const callbacks = this.#listeners.get(event) ?? new Set(); callbacks.add(callback); this.#listeners.set(event, callbacks); return () => callbacks.delete(callback); }
  emit(event, payload = {}) { (this.#listeners.get(event) ?? []).forEach((callback) => callback(payload)); }
}
export const Events = Object.freeze({ START: 'game:start', END: 'game:end', SHOT: 'weapon:shot', COLLISION: 'physics:collision', DESTROY: 'entity:destroy', LEVEL: 'game:level', PAUSE: 'game:pause' });
