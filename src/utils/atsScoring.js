/**
 * ATS Scoring Engine v2 — Deterministic, max 100
 *
 * Returns { score, suggestions }
 * Each suggestion includes the point value of the missing item.
 */

const ACTION_VERBS = [
    'built', 'led', 'designed', 'improved', 'developed', 'created',
    'implemented', 'managed', 'optimized', 'automated', 'deployed',
    'architected', 'launched', 'refactored', 'migrated', 'scaled',
    'delivered', 'resolved', 'mentored', 'coordinated', 'reduced',
    'increased', 'established', 'integrated', 'configured'
];

/** Total skill count across all categories */
const getTotalSkills = (skills) => {
    if (typeof skills === 'string') {
        return skills.split(',').map(s => s.trim()).filter(s => s).length;
    }
    if (skills && typeof skills === 'object') {
        return (skills.technical?.length || 0)
            + (skills.soft?.length || 0)
            + (skills.tools?.length || 0);
    }
    return 0;
};

const containsActionVerb = (text) => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return ACTION_VERBS.some(verb => lower.includes(verb));
};

export const computeATSScore = (resumeData) => {
    let score = 0;
    const suggestions = [];
    const { summary, education, experience, projects, skills, personal } = resumeData;

    // 1. Name: +10
    if (personal.fullName && personal.fullName.trim()) {
        score += 10;
    } else {
        suggestions.push({ text: 'Add your full name', points: 10 });
    }

    // 2. Email: +10
    if (personal.email && personal.email.trim()) {
        score += 10;
    } else {
        suggestions.push({ text: 'Add your email address', points: 10 });
    }

    // 3. Summary > 50 chars: +10
    if (summary && summary.trim().length > 50) {
        score += 10;
    } else {
        suggestions.push({ text: 'Add a professional summary (50+ characters)', points: 10 });
    }

    // 4. At least 1 experience with description: +15
    const hasExpWithBullets = experience.some(e => e.description && e.description.trim().length > 0);
    if (experience.length >= 1 && hasExpWithBullets) {
        score += 15;
    } else {
        suggestions.push({ text: 'Add at least 1 experience entry with bullet points', points: 15 });
    }

    // 5. At least 1 education entry: +10
    if (education.length >= 1) {
        score += 10;
    } else {
        suggestions.push({ text: 'Add at least 1 education entry', points: 10 });
    }

    // 6. At least 5 skills: +10
    const skillCount = getTotalSkills(skills);
    if (skillCount >= 5) {
        score += 10;
    } else {
        suggestions.push({ text: `Add more skills (${skillCount}/5 minimum)`, points: 10 });
    }

    // 7. At least 1 project: +10
    if (projects.length >= 1) {
        score += 10;
    } else {
        suggestions.push({ text: 'Add at least 1 project', points: 10 });
    }

    // 8. Phone: +5
    if (personal.phone && personal.phone.trim()) {
        score += 5;
    } else {
        suggestions.push({ text: 'Add your phone number', points: 5 });
    }

    // 9. LinkedIn: +5
    if (personal.linkedin && personal.linkedin.trim()) {
        score += 5;
    } else {
        suggestions.push({ text: 'Add your LinkedIn profile URL', points: 5 });
    }

    // 10. GitHub: +5
    if (personal.github && personal.github.trim()) {
        score += 5;
    } else {
        suggestions.push({ text: 'Add your GitHub profile URL', points: 5 });
    }

    // 11. Summary contains action verbs: +10
    if (summary && containsActionVerb(summary)) {
        score += 10;
    } else {
        suggestions.push({ text: 'Use action verbs in your summary (built, led, designed, improved…)', points: 10 });
    }

    // Total possible: 10+10+10+15+10+10+10+5+5+5+10 = 100
    const finalScore = Math.min(score, 100);

    return {
        score: finalScore,
        maxScore: 100,
        suggestions
    };
};
