import React, { useMemo } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { computeATSScore } from '../../utils/atsScoring';
import { AlertCircle } from 'lucide-react';

const ATSScore = () => {
    const { resumeData } = useResume();

    const { score, suggestions } = useMemo(
        () => computeATSScore(resumeData),
        [resumeData]
    );

    // Determine color based on score
    const getScoreColor = (s) => {
        if (s >= 65) return '#2E7D32'; // green
        if (s >= 40) return '#E65100'; // orange
        return '#8B0000'; // deep red
    };

    const getScoreLabel = (s) => {
        if (s >= 65) return 'Strong';
        if (s >= 40) return 'Developing';
        return 'Needs Work';
    };

    const color = getScoreColor(score);
    const label = getScoreLabel(score);

    // Calculate circumference for circular progress
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '24px'
            }}>
                <div style={{ position: 'relative', width: '128px', height: '128px' }}>
                    <svg
                        width="128"
                        height="128"
                        viewBox="0 0 128 128"
                        style={{ transform: 'rotate(-90deg)' }}
                    >
                        {/* Background circle */}
                        <circle
                            cx="64"
                            cy="64"
                            r={radius}
                            fill="none"
                            stroke="#f0f0f0"
                            strokeWidth="8"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="64"
                            cy="64"
                            r={radius}
                            fill="none"
                            stroke={color}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease' }}
                        />
                    </svg>
                    {/* Score text overlay */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            fontFamily: 'var(--font-serif)',
                            color: color,
                            lineHeight: '1',
                            transition: 'color 0.3s ease'
                        }}>
                            {score}
                        </div>
                        <div style={{
                            fontSize: '11px',
                            color: '#999',
                            marginTop: '2px',
                            fontFamily: 'var(--font-sans)'
                        }}>
                            / 100
                        </div>
                    </div>
                </div>
            </div>

            {/* Label */}
            <div style={{
                textAlign: 'center',
                marginBottom: '20px'
            }}>
                <span style={{
                    display: 'inline-block',
                    padding: '4px 16px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: color,
                    backgroundColor: color + '12',
                    border: `1px solid ${color}30`,
                    transition: 'all 0.3s ease'
                }}>
                    {label}
                </span>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div style={{
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '16px'
                }}>
                    <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#999',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '12px'
                    }}>
                        Suggestions
                    </div>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        {suggestions.map((s, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                fontSize: '13px',
                                color: 'var(--color-text-secondary)',
                                lineHeight: '1.4'
                            }}>
                                <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#E65100' }} />
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ATSScore;
