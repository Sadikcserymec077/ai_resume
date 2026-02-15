/**
 * ATS Scoring Engine v1 — Deterministic
 * Returns { score, suggestions }
 * Supports new skills format: { technical: [], soft: [], tools: [] }
 */

const countWords = (text) => {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).length;
};

const hasNumbers = (text) => {
    return /\d+%|\d+x|\d+k|\$\d+|\d{2,}/.test(text);
};

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

export const computeATSScore = (resumeData) => {
    let score = 0;
    const suggestions = [];
    const { summary, education, experience, projects, skills, personal } = resumeData;

    // 1. Summary length: +15 if 40–120 words
    const wordCount = countWords(summary);
    if (wordCount >= 40 && wordCount <= 120) {
        score += 15;
    } else {
        if (wordCount < 40) {
            suggestions.push('Write a stronger summary (target 40–120 words).');
        } else {
            suggestions.push('Shorten your summary to under 120 words for ATS clarity.');
        }
    }

    // 2. Projects: +10 if at least 2
    if (projects.length >= 2) {
        score += 10;
    } else {
        suggestions.push(`Add at least 2 projects (you have ${projects.length}).`);
    }

    // 3. Experience: +10 if at least 1
    if (experience.length >= 1) {
        score += 10;
    } else {
        suggestions.push('Add at least 1 work experience entry.');
    }

    // 4. Skills: +10 if ≥ 8 items
    const skillCount = getTotalSkills(skills);
    if (skillCount >= 8) {
        score += 10;
    } else {
        suggestions.push(`Add more skills (target 8+, you have ${skillCount}).`);
    }

    // 5. Links: +10 if GitHub or LinkedIn exists
    if (personal.github || personal.linkedin) {
        score += 10;
    } else {
        suggestions.push('Add your GitHub or LinkedIn profile link.');
    }

    // 6. Measurable impact: +15 if any experience/project bullet contains a number
    const allBullets = [
        ...experience.map(e => e.description || ''),
        ...projects.map(p => p.description || '')
    ];
    const hasImpact = allBullets.some(b => hasNumbers(b));
    if (hasImpact) {
        score += 15;
    } else {
        suggestions.push('Add measurable impact (numbers like %, X, k) in your bullets.');
    }

    // 7. Education complete: +10 if education has at least 1 entry with all fields filled
    const hasCompleteEducation = education.some(
        ed => ed.institution && ed.degree && ed.year
    );
    if (hasCompleteEducation) {
        score += 10;
    } else {
        suggestions.push('Complete your education section (institution, degree, year).');
    }

    const finalScore = Math.min(score, 100);

    return {
        score: finalScore,
        maxScore: 80,
        suggestions: suggestions.slice(0, 3)
    };
};
