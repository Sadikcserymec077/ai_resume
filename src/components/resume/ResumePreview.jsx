import React, { useRef, useMemo } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { getTemplateStyles } from '../../utils/templateStyles';
import { ExternalLink, Github } from 'lucide-react';

/** Pill badge style */
const pillStyle = {
    display: 'inline-block',
    padding: '2px 8px',
    fontSize: '10px',
    fontWeight: '500',
    borderRadius: '100px',
    border: '1px solid #ccc',
    color: '#333',
    backgroundColor: '#f8f8f8',
    fontFamily: "'Inter', sans-serif",
    lineHeight: '1.4'
};

const ResumePreview = () => {
    const { resumeData, template } = useResume();
    const { personal, summary, education, experience, projects, skills } = resumeData;
    const previewRef = useRef();

    const styles = useMemo(() => getTemplateStyles(template), [template]);

    // Flatten skills for display
    const skillCategories = [
        { label: 'Technical', items: skills?.technical || [] },
        { label: 'Soft Skills', items: skills?.soft || [] },
        { label: 'Tools', items: skills?.tools || [] }
    ].filter(c => c.items.length > 0);
    const hasSkills = skillCategories.length > 0;

    const hasLinks = personal.github || personal.linkedin || personal.portfolio;

    return (
        <div ref={previewRef} className="resume-preview-container" style={styles.container}>
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

            {/* Skills — grouped pill badges */}
            {hasSkills && (
                <section>
                    <div style={styles.sectionTitle}>Skills</div>
                    {skillCategories.map(cat => (
                        <div key={cat.label} style={{ marginBottom: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {cat.label}
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                {cat.items.map(skill => (
                                    <span key={skill} style={pillStyle}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
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

            {/* Projects — cards with tech stack pills + link icons */}
            {projects.length > 0 && (
                <section>
                    <div style={styles.sectionTitle}>Projects</div>
                    {projects.map(proj => (
                        <div key={proj.id} style={{
                            marginBottom: '14px',
                            padding: '10px 0',
                            borderBottom: '1px solid #f0f0f0'
                        }}>
                            <div style={{ ...styles.entryHeader, marginBottom: '4px' }}>
                                <span>{proj.name}</span>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    {proj.liveUrl && (
                                        <a href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                                            style={{ color: '#333', display: 'flex' }} title="Live Demo">
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                    {proj.githubUrl && (
                                        <a href={proj.githubUrl.startsWith('http') ? proj.githubUrl : `https://${proj.githubUrl}`}
                                            style={{ color: '#333', display: 'flex' }} title="GitHub">
                                            <Github size={12} />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p style={{ ...styles.bodyText, marginBottom: '6px' }}>{proj.description}</p>
                            {proj.techStack && proj.techStack.length > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    {proj.techStack.map(tech => (
                                        <span key={tech} style={pillStyle}>{tech}</span>
                                    ))}
                                </div>
                            )}
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
                            <div style={styles.bodyText}>{ed.degree}</div>
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
                            <a href={`https://${personal.github}`} style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                        )}
                        {personal.linkedin && (
                            <a href={`https://${personal.linkedin}`} style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                        )}
                        {personal.portfolio && (
                            <a href={`https://${personal.portfolio}`} style={{ color: 'inherit', textDecoration: 'none' }}>Portfolio</a>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ResumePreview;
