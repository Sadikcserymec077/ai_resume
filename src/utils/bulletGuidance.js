/**
 * Bullet discipline guidance — non-blocking inline suggestions.
 */

const ACTION_VERBS = [
    'built', 'developed', 'designed', 'implemented', 'led',
    'improved', 'created', 'optimized', 'automated', 'managed',
    'deployed', 'architected', 'configured', 'integrated', 'launched',
    'refactored', 'migrated', 'scaled', 'delivered', 'resolved',
    'mentored', 'coordinated', 'established', 'reduced', 'increased'
];

const hasNumber = (text) => /\d+%|\d+x|\d+k|\$\d+|\d{2,}/.test(text);

const startsWithVerb = (text) => {
    if (!text || !text.trim()) return true; // empty is fine, no warning
    const firstWord = text.trim().split(/\s+/)[0].toLowerCase();
    return ACTION_VERBS.includes(firstWord);
};

/**
 * Returns an array of suggestion strings for a given bullet text.
 * Returns [] if bullet is clean.
 */
export const getBulletSuggestions = (text) => {
    if (!text || !text.trim()) return [];

    const hints = [];

    if (!startsWithVerb(text)) {
        hints.push('Start with a strong action verb.');
    }

    if (!hasNumber(text)) {
        hints.push('Add measurable impact (numbers).');
    }

    return hints;
};
