import React, { useRef, useMemo } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { getTemplateStyles } from '../../utils/templateStyles';
import { ExternalLink, Github } from 'lucide-react';

const ResumePreview = () => {
    const { resumeData, template, accentColor } = useResume();
    const { personal, summary, education, experience, projects, skills } = resumeData;
    const previewRef = useRef();

    const styles = useMemo(() => getTemplateStyles(template, accentColor), [template, accentColor]);

    const skillCategories = [
        { label: 'Technical', items: skills?.technical || [] },
        { label: 'Soft Skills', items: skills?.soft || [] },
        { label: 'Tools', items: skills?.tools || [] }
    ].filter(c => c.items.length > 0);
    const hasSkills = skillCategories.length > 0;
    const hasLinks = personal.github || personal.linkedin || personal.portfolio;

    // ── Modern two-column layout ──────────────────────
    if (styles.layout === 'two-column') {
        return (
            <div ref={previewRef} className="resume-preview-container" style={styles.container}>
                {/* SIDEBAR */}
                <div style={styles.sidebar}>
                    <div>
                        <div style={styles.sidebarName}>{personal.fullName || 'YOUR NAME'}</div>
                    </div>

                    {/* Contact */}
                    <div>
                        <div style={styles.sidebarLabel}>Contact</div>
                        {personal.email && <div style={styles.sidebarText}>{personal.email}</div>}
                        {personal.phone && <div style={styles.sidebarText}>{personal.phone}</div>}
                        {personal.location && <div style={styles.sidebarText}>{personal.location}</div>}
                    </div>

                    {/* Links */}
                    {hasLinks && (
                        <div>
                            <div style={styles.sidebarLabel}>Links</div>
                            {personal.github && (
                                <div style={styles.sidebarText}>
                                    <a href={`https://${personal.github}`} style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>GitHub</a>
                                </div>
                            )}
                            {personal.linkedin && (
                                <div style={styles.sidebarText}>
                                    <a href={`https://${personal.linkedin}`} style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>LinkedIn</a>
                                </div>
                            )}
                            {personal.portfolio && (
                                <div style={styles.sidebarText}>
                                    <a href={`https://${personal.portfolio}`} style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Portfolio</a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Skills in sidebar */}
                    {hasSkills && (
                        <div>
                            <div style={styles.sidebarLabel}>Skills</div>
                            {skillCategories.map(cat => (
                                <div key={cat.label} style={{ marginBottom: '8px' }}>
                                    <div style={{ fontSize: '10px', opacity: 0.6, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {cat.label}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {cat.items.map(skill => (
                                            <span key={skill} style={styles.sidebarPill}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Education in sidebar */}
                    {education.length > 0 && (
                        <div>
                            <div style={styles.sidebarLabel}>Education</div>
                            {education.map(ed => (
                                <div key={ed.id} style={{ marginBottom: '6px' }}>
                                    <div style={{ ...styles.sidebarText, fontWeight: '600' }}>{ed.degree}</div>
                                    <div style={{ ...styles.sidebarText, fontSize: '11px', opacity: 0.8 }}>{ed.institution}</div>
                                    <div style={{ ...styles.sidebarText, fontSize: '10px', opacity: 0.6 }}>{ed.year}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* MAIN CONTENT */}
                <div style={styles.main}>
                    {/* Summary */}
                    {summary && (
                        <section>
                            <div style={styles.sectionTitle}>Summary</div>
                            <p style={styles.bodyText}>{summary}</p>
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
                                <div key={proj.id} style={{ marginBottom: '14px' }}>
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
                                                <span key={tech} style={styles.pill}>{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        );
    }

    // ── Single-column layout (Classic / Minimal) ─────
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
                                    <span key={skill} style={styles.pill}>{skill}</span>
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

            {/* Projects */}
            {projects.length > 0 && (
                <section>
                    <div style={styles.sectionTitle}>Projects</div>
                    {projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '14px', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
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
                                        <span key={tech} style={styles.pill}>{tech}</span>
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
