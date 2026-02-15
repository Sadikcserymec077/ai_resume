import React, { useMemo } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { computeATSScore } from '../../utils/atsScoring';
import { AlertCircle, ArrowUp } from 'lucide-react';

/**
 * Compute top 3 improvement suggestions based on resume gaps.
 * Separate from ATS suggestions — these are prioritized improvement tips.
 */
const computeImprovements = (resumeData) => {
    const improvements = [];
    const { summary, education, experience, projects, skills } = resumeData;

    const wordCount = summary ? summary.trim().split(/\s+/).length : 0;
    const skillsList = skills ? skills.split(',').map(s => s.trim()).filter(s => s) : [];
    const allBullets = [
        ...experience.map(e => e.description || ''),
        ...projects.map(p => p.description || '')
    ];
    const hasNumbers = allBullets.some(b => /\d+%|\d+x|\d+k|\$\d+|\d{2,}/.test(b));

    // Priority order
    if (experience.length === 0) {
        improvements.push('Add at least one work experience or internship entry.');
    }
    if (projects.length < 2) {
        improvements.push(`Add more projects (you have ${projects.length}, target 2+).`);
    }
    if (!hasNumbers) {
        improvements.push('Include measurable impact (numbers, %, metrics) in your bullets.');
    }
    if (wordCount < 40) {
        improvements.push('Expand your summary to 40–120 words for better ATS matching.');
    }
    if (skillsList.length < 8) {
        improvements.push(`List more skills (you have ${skillsList.length}, target 8+).`);
    }

    return improvements.slice(0, 3);
};

const ATSScore = () => {
    const { resumeData } = useResume();

    const { score, suggestions } = useMemo(
        () => computeATSScore(resumeData),
        [resumeData]
    );

    const improvements = useMemo(
        () => computeImprovements(resumeData),
        [resumeData]
    );

    const getScoreColor = (s) => {
        if (s >= 65) return '#2E7D32';
        if (s >= 40) return '#E65100';
        return '#8B0000';
    };

    const getScoreLabel = (s) => {
        if (s >= 65) return 'Strong';
        if (s >= 40) return 'Developing';
        return 'Needs Work';
    };

    const color = getScoreColor(score);
    const label = getScoreLabel(score);

    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;
    const offset = circumference - progress;

    return (
        <div style={{
            backgroundColor: '#fff',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px'
        }}>
            {/* Header */}
            <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '24px',
                letterSpacing: '-0.01em',
                color: 'var(--color-text)'
            }}>
                ATS Readiness Score
            </h3>

            {/* Circular Score Meter */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ position: 'relative', width: '128px', height: '128px' }}>
                    <svg width="128" height="128" viewBox="0 0 128 128" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="64" cy="64" r={radius} fill="none" stroke="#f0f0f0" strokeWidth="8" />
                        <circle
                            cx="64" cy="64" r={radius} fill="none"
                            stroke={color} strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={circumference} strokeDashoffset={offset}
                            style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease' }}
                        />
                    </svg>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)', textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '32px', fontWeight: '700', fontFamily: 'var(--font-serif)',
                            color: color, lineHeight: '1', transition: 'color 0.3s ease'
                        }}>
                            {score}
                        </div>
                        <div style={{ fontSize: '11px', color: '#999', marginTop: '2px', fontFamily: 'var(--font-sans)' }}>
                            / 100
                        </div>
                    </div>
                </div>
            </div>

            {/* Label */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <span style={{
                    display: 'inline-block', padding: '4px 16px', borderRadius: '100px',
                    fontSize: '12px', fontWeight: '600', color: color,
                    backgroundColor: color + '12', border: `1px solid ${color}30`,
                    transition: 'all 0.3s ease'
                }}>
                    {label}
                </span>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
                    <div style={{
                        fontSize: '12px', fontWeight: '600', color: '#999',
                        textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px'
                    }}>
                        Suggestions
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {suggestions.map((s, i) => (
                            <li key={i} style={{
                                display: 'flex', alignItems: 'flex-start', gap: '8px',
                                fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.4'
                            }}>
                                <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#E65100' }} />
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Top 3 Improvements */}
            {improvements.length > 0 && (
                <div style={{
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '16px',
                    marginTop: suggestions.length > 0 ? '16px' : '0'
                }}>
                    <div style={{
                        fontSize: '12px', fontWeight: '600', color: '#999',
                        textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px'
                    }}>
                        Top 3 Improvements
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {improvements.map((imp, i) => (
                            <li key={i} style={{
                                display: 'flex', alignItems: 'flex-start', gap: '8px',
                                fontSize: '13px', color: 'var(--color-text)', lineHeight: '1.4'
                            }}>
                                <ArrowUp size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#2E7D32' }} />
                                {imp}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ATSScore;
