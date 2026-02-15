/**
 * Converts resume data to clean plain-text format.
 * Supports new skills format (object with categories) and new project format.
 */
export const resumeToPlainText = (resumeData) => {
    const { personal, summary, education, experience, projects, skills } = resumeData;
    const lines = [];

    // Name
    if (personal.fullName) {
        lines.push(personal.fullName.toUpperCase());
        lines.push('');
    }

    // Contact
    const contactParts = [];
    if (personal.location) contactParts.push(personal.location);
    if (personal.phone) contactParts.push(personal.phone);
    if (personal.email) contactParts.push(personal.email);
    if (contactParts.length > 0) {
        lines.push(contactParts.join(' | '));
        lines.push('');
    }

    // Summary
    if (summary && summary.trim()) {
        lines.push('SUMMARY');
        lines.push('-'.repeat(40));
        lines.push(summary.trim());
        lines.push('');
    }

    // Education
    if (education.length > 0) {
        lines.push('EDUCATION');
        lines.push('-'.repeat(40));
        education.forEach(ed => {
            const parts = [];
            if (ed.institution) parts.push(ed.institution);
            if (ed.degree) parts.push(ed.degree);
            if (ed.year) parts.push(ed.year);
            lines.push(parts.join(' — '));
        });
        lines.push('');
    }

    // Experience
    if (experience.length > 0) {
        lines.push('EXPERIENCE');
        lines.push('-'.repeat(40));
        experience.forEach(exp => {
            let header = '';
            if (exp.role) header += exp.role;
            if (exp.company) header += ` at ${exp.company}`;
            if (exp.duration) header += ` (${exp.duration})`;
            lines.push(header);
            if (exp.description) {
                lines.push(`  ${exp.description}`);
            }
            lines.push('');
        });
    }

    // Projects
    if (projects.length > 0) {
        lines.push('PROJECTS');
        lines.push('-'.repeat(40));
        projects.forEach(proj => {
            let header = proj.name || '';
            const urls = [];
            if (proj.liveUrl) urls.push(proj.liveUrl);
            if (proj.githubUrl) urls.push(proj.githubUrl);
            if (proj.link && !proj.liveUrl) urls.push(proj.link); // backward compat
            if (urls.length > 0) header += ` — ${urls.join(' | ')}`;
            lines.push(header);
            if (proj.description) {
                lines.push(`  ${proj.description}`);
            }
            if (proj.techStack && proj.techStack.length > 0) {
                lines.push(`  Tech: ${proj.techStack.join(', ')}`);
            }
            lines.push('');
        });
    }

    // Skills
    const skillLines = [];
    if (typeof skills === 'string') {
        const list = skills.split(',').map(s => s.trim()).filter(s => s);
        if (list.length > 0) skillLines.push(list.join(', '));
    } else if (skills && typeof skills === 'object') {
        if (skills.technical?.length) skillLines.push(`Technical: ${skills.technical.join(', ')}`);
        if (skills.soft?.length) skillLines.push(`Soft Skills: ${skills.soft.join(', ')}`);
        if (skills.tools?.length) skillLines.push(`Tools: ${skills.tools.join(', ')}`);
    }
    if (skillLines.length > 0) {
        lines.push('SKILLS');
        lines.push('-'.repeat(40));
        skillLines.forEach(l => lines.push(l));
        lines.push('');
    }

    // Links
    const linkParts = [];
    if (personal.github) linkParts.push(`GitHub: ${personal.github}`);
    if (personal.linkedin) linkParts.push(`LinkedIn: ${personal.linkedin}`);
    if (personal.portfolio) linkParts.push(`Portfolio: ${personal.portfolio}`);
    if (linkParts.length > 0) {
        lines.push('LINKS');
        lines.push('-'.repeat(40));
        linkParts.forEach(l => lines.push(l));
        lines.push('');
    }

    return lines.join('\n').trim();
};

/**
 * Returns a validation warning string (non-blocking), or null if clean.
 */
export const getExportWarnings = (resumeData) => {
    const warnings = [];
    const { personal, experience, projects } = resumeData;

    if (!personal.fullName || !personal.fullName.trim()) {
        warnings.push('Name is missing.');
    }

    if (experience.length === 0 && projects.length === 0) {
        warnings.push('No projects or experience added.');
    }

    if (warnings.length > 0) {
        return 'Your resume may look incomplete.';
    }

    return null;
};
