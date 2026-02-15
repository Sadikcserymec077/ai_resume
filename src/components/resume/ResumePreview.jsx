import React, { useRef } from 'react';
import { useResume } from '../../contexts/ResumeContext';

const ResumePreview = () => {
    const { resumeData } = useResume();
    const { personal, summary, education, experience, projects, skills } = resumeData;
    const previewRef = useRef();

    // Basic styling for the preview
    const containerStyle = {
        fontFamily: 'var(--font-serif)',
        color: '#000',
        backgroundColor: '#fff',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        minHeight: '800px',
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: '1.4'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '24px',
        borderBottom: '1px solid #000',
        paddingBottom: '16px'
    };

    const sectionTitleStyle = {
        fontSize: '14px',
        textTransform: 'uppercase',
        borderBottom: '1px solid #000',
        marginTop: '24px',
        marginBottom: '8px',
        fontWeight: 'bold',
        letterSpacing: '1px'
    };

    // Helper to format skills from string
    const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);

    return (
        <div ref={previewRef} style={containerStyle}>
            <header style={headerStyle}>
                <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>{personal.fullName || 'YOUR NAME'}</h1>
                <div style={{ fontSize: '12px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {personal.location && <span>{personal.location}</span>}
                    {personal.phone && <span>• {personal.phone}</span>}
                    {personal.email && <span>• {personal.email}</span>}
                    {personal.linkedin && <span>• <a href={`https://${personal.linkedin}`} style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a></span>}
                    {personal.github && <span>• <a href={`https://${personal.github}`} style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a></span>}
                    {personal.portfolio && <span>• <a href={`https://${personal.portfolio}`} style={{ color: 'inherit', textDecoration: 'none' }}>Portfolio</a></span>}
                </div>
            </header>

            {summary && (
                <section>
                    <div style={sectionTitleStyle}>Summary</div>
                    <p style={{ fontSize: '12px' }}>{summary}</p>
                </section>
            )}

            {skillsList.length > 0 && (
                <section>
                    <div style={sectionTitleStyle}>Skills</div>
                    <p style={{ fontSize: '12px' }}>{skillsList.join(' • ')}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section>
                    <div style={sectionTitleStyle}>Experience</div>
                    {experience.map(exp => (
                        <div key={exp.id} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold' }}>
                                <span>{exp.company}</span>
                                <span>{exp.duration}</span>
                            </div>
                            <div style={{ fontSize: '12px', fontStyle: 'italic', marginBottom: '4px' }}>{exp.role}</div>
                            <p style={{ fontSize: '12px' }}>{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {projects.length > 0 && (
                <section>
                    <div style={sectionTitleStyle}>Projects</div>
                    {projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold' }}>
                                <span>{proj.name}</span>
                                {proj.link && <a href={`https://${proj.link}`} style={{ color: 'inherit', textDecoration: 'none', fontSize: '10px' }}>{proj.link}</a>}
                            </div>
                            <p style={{ fontSize: '12px' }}>{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {education.length > 0 && (
                <section>
                    <div style={sectionTitleStyle}>Education</div>
                    {education.map(ed => (
                        <div key={ed.id} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold' }}>
                                <span>{ed.institution}</span>
                                <span>{ed.year}</span>
                            </div>
                            <div style={{ fontSize: '12px' }}>{ed.degree}</div>
                        </div>
                    ))}
                </section>
            )}

        </div>
    );
};

export default ResumePreview;
