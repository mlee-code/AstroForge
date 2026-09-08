// Funções puras: não alteram entidades nem dependem do DOM.
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export const wrap = (value, max) => ((value % max) + max) % max;
export const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export const magnitude = ({ x, y }) => Math.hypot(x, y);
export const normalize = (v) => { const length = magnitude(v) || 1; return { x: v.x / length, y: v.y / length }; };
export const randomRange = (min, max, random = Math.random) => min + random() * (max - min);
export const polygon = (count, radius, roughness, random = Math.random) => Array.from({ length: count }, (_, i) => {
  const angle = (i / count) * Math.PI * 2;
  const r = radius * randomRange(1 - roughness, 1 + roughness, random);
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
});
export const formatScore = (score) => String(score).padStart(6, '0');
export const summarizeMatches = (matches) => matches.reduce((summary, match) => ({
  games: summary.games + 1, score: summary.score + match.score,
  best: Math.max(summary.best, match.score), destroyed: summary.destroyed + match.destroyed
}), { games: 0, score: 0, best: 0, destroyed: 0 });
export const deriveStats = (raw) => ({ ...raw, accuracy: raw.shots ? Math.round(raw.hits / raw.shots * 100) : 0, survivalSeconds: Math.floor(raw.elapsed) });
