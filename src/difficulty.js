const settings = Object.freeze({ fácil: { lives: 3, asteroidBonus: 0 }, normal: { lives: 3, asteroidBonus: 1 }, difícil: { lives: 2, asteroidBonus: 2 } });
export const difficultySettings = (difficulty) => settings[difficulty] ?? settings.normal;
export const asteroidsForLevel = (level, difficulty) => level + 3 + difficultySettings(difficulty).asteroidBonus;
