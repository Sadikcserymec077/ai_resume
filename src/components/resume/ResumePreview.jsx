import React, { useRef, useMemo } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { getTemplateStyles } from '../../utils/templateStyles';

const ResumePreview = () => {
    const { resumeData, template } = useResume();
    const { personal, summary, education, experience, projects, skills } = resumeData;
    const previewRef = useRef();

    const styles = useMemo(() => getTemplateStyles(template), [template]);

    const skillsList = skills
        ? skills.split(',').map(s => s.trim()).filter(s => s)
        : [];

    const hasLinks = personal.github || personal.linkedin || personal.portfolio;

    return (
        <div ref={previewRef} style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <h1 style={styles.name}>
                    {personal.fullName || 'YOUR NAME'}
                </h1>
                <div style={styles.contactRow}>
                    {personal.location && <span>{personal.location}</span>}
                    {personal.phone && <span>• {personal.phone}</span>}
                    {personal.email && <span>• {personal.email}</span>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section>
                    <div style={styles.sectionTitle}>Summary</div>
                    <p style={styles.bodyText}>{summary}</p>
                </section>
            )}

            {/* Skills */}
            {skillsList.length > 0 && (
                <section>
                    <div style={styles.sectionTitle}>Skills</div>
                    <p style={styles.bodyText}>{skillsList.join(' • ')}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section>
                    <div style={styles.sectionTitle}>Experience</div>
                    {experience.map(exp => (
                        <div key={exp.id} style={{ marginBottom: '12px' }}>
                            <div style={styles.entryHeader}>
                                <span>{exp.company}</span>
                                <span>{exp.duration}</span>
                            </div>
                            <div style={styles.entrySubtitle}>{exp.role}</div>
                            <p style={styles.bodyText}>{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section>
                    <div style={styles.sectionTitle}>Projects</div>
                    {projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '12px' }}>
                            <div style={styles.entryHeader}>
                                <span>{proj.name}</span>
                                {proj.link && (
                                    <a href={`https://${proj.link}`} style={{ color: 'inherit', textDecoration: 'none', fontSize: '10px' }}>
                                        {proj.link}
                                    </a>
                                )}
                            </div>
                            <p style={styles.bodyText}>{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section>
                    <div style={styles.sectionTitle}>Education</div>
                    {education.map(ed => (
                        <div key={ed.id} style={{ marginBottom: '8px' }}>
                            <div style={styles.entryHeader}>
                                <span>{ed.institution}</span>
                                <span>{ed.year}</span>
                            </div>
                            <div style={{ ...styles.bodyText, fontStyle: template === 'classic' ? 'normal' : 'normal' }}>{ed.degree}</div>
                        </div>
                    ))}
                </section>
            )}

            {/* Links */}
            {hasLinks && (
                <section>
                    <div style={styles.sectionTitle}>Links</div>
                    <div style={{ ...styles.bodyText, display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        {personal.github && (
                            <a href={`https://${personal.github}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                GitHub
                            </a>
                        )}
                        {personal.linkedin && (
                            <a href={`https://${personal.linkedin}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                LinkedIn
                            </a>
                        )}
                        {personal.portfolio && (
                            <a href={`https://${personal.portfolio}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                Portfolio
                            </a>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ResumePreview;
