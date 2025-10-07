// --- VEDIC NUMEROLOGY (Ank Jyotish) ---

// Data for number relationships and ruling planets
const vedicNumberData: { [key: number]: { planet: string; traits: string; lucky: number[]; caution: number[] } } = {
    1: { planet: 'Sun', traits: 'Leadership, Ambition, Originality', lucky: [1, 2, 3, 9], caution: [6, 8] },
    2: { planet: 'Moon', traits: 'Intuition, Cooperation, Sensitivity', lucky: [1, 2, 5], caution: [8, 9] },
    3: { planet: 'Jupiter', traits: 'Creativity, Optimism, Expression', lucky: [1, 2, 3, 9], caution: [5, 6] },
    4: { planet: 'Rahu', traits: 'Discipline, Practicality, Hard Work', lucky: [5, 6, 8], caution: [1, 2] },
    5: { planet: 'Mercury', traits: 'Intellect, Adaptability, Communication', lucky: [4, 5, 6], caution: [2] },
    6: { planet: 'Venus', traits: 'Harmony, Love, Responsibility', lucky: [4, 5, 6, 8], caution: [1, 3] },
    7: { planet: 'Ketu', traits: 'Spirituality, Analysis, Introspection', lucky: [3, 5], caution: [8, 9] },
    8: { planet: 'Saturn', traits: 'Discipline, Justice, Perseverance', lucky: [4, 5, 6], caution: [1, 2] },
    9: { planet: 'Mars', traits: 'Courage, Energy, Humanitarianism', lucky: [1, 2, 3, 9], caution: [5, 7] },
};

/**
 * Calculates the Vedic Destiny Number (Moolank) from a date string (YYYY-MM-DD).
 * Moolank is the sum of the digits of the DAY of birth, reduced to a single digit (1-9).
 * @param dobString - The date of birth in "YYYY-MM-DD" format.
 * @returns The Moolank (1-9).
 */
export function calculateMoolank(dobString: string): number {
    if (!dobString) return 0;
    const day = parseInt(dobString.split('-')[2], 10);
    let sum = String(day).split('').map(Number).reduce((acc, digit) => acc + digit, 0);

    while (sum > 9) {
        sum = String(sum).split('').map(Number).reduce((acc, digit) => acc + digit, 0);
    }
    
    return sum;
}

export function getVedicNumberData(moolank: number) {
    return vedicNumberData[moolank];
}


// --- PLANETARY RULERS (Vara) ---

const dayRulers = [
  { day: 'Sunday', planet: 'Sun', deity: 'Surya', traits: 'Leadership, Vitality, Soul', color: 'text-orange-400' },
  { day: 'Monday', planet: 'Moon', deity: 'Chandra', traits: 'Emotions, Mind, Nurturing', color: 'text-gray-300' },
  { day: 'Tuesday', planet: 'Mars', deity: 'Mangala', traits: 'Energy, Action, Courage', color: 'text-red-400' },
  { day: 'Wednesday', planet: 'Mercury', deity: 'Budha', traits: 'Intellect, Communication, Commerce', color: 'text-green-400' },
  { day: 'Thursday', planet: 'Jupiter', deity: 'Brihaspati', traits: 'Wisdom, Expansion, Fortune', color: 'text-yellow-400' },
  { day: 'Friday', planet: 'Venus', deity: 'Shukra', traits: 'Love, Beauty, Arts', color: 'text-pink-400' },
  { day: 'Saturday', planet: 'Saturn', deity: 'Shani', traits: 'Discipline, Karma, Responsibility', color: 'text-indigo-400' },
];

/**
 * Gets the ruling planet and associated data for a given day of the week.
 * @param dayOfWeek - The day of the week (0 for Sunday, 1 for Monday, etc.).
 * @returns An object with the day's ruler information.
 */
export function getRulingPlanet(dayOfWeek: number) {
    return dayRulers[dayOfWeek];
}
