import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const BuilderForm = () => {
    const { resumeData, updatePersonal, updateSection, addItem, removeItem, loadSampleData } = useResume();

    const handlePersonalChange = (e) => {
        updatePersonal(e.target.name, e.target.value);
    };

    const handleSummaryChange = (e) => {
        updateSection('summary', e.target.value);
    };

    const handleSkillsChange = (e) => {
        updateSection('skills', e.target.value);
    };

    const [newEducation, setNewEducation] = useState({ institution: '', degree: '', year: '' });
    const [newExperience, setNewExperience] = useState({ role: '', company: '', duration: '', description: '' });
    const [newProject, setNewProject] = useState({ name: '', description: '', link: '' });

    const handleAddEducation = () => {
        addItem('education', newEducation);
        setNewEducation({ institution: '', degree: '', year: '' });
    };

    const handleAddExperience = () => {
        addItem('experience', newExperience);
        setNewExperience({ role: '', company: '', duration: '', description: '' });
    };

    const handleAddProject = () => {
        addItem('projects', newProject);
        setNewProject({ name: '', description: '', link: '' });
    };

    return (
        <div className="builder-form" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Sample Data Button */}
            {/* Moved to top for easy access */}
            <button className="btn-secondary" onClick={loadSampleData}>
                Load Sample Data
            </button>

            {/* Personal Info */}
            <section>
                <h3 style={{ marginBottom: '16px' }}>Personal Info</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input name="fullName" placeholder="Full Name" value={resumeData.personal.fullName} onChange={handlePersonalChange} />
                    <input name="email" placeholder="Email" value={resumeData.personal.email} onChange={handlePersonalChange} />
                    <input name="phone" placeholder="Phone" value={resumeData.personal.phone} onChange={handlePersonalChange} />
                    <input name="location" placeholder="Location" value={resumeData.personal.location} onChange={handlePersonalChange} />
                    <input name="github" placeholder="GitHub URL" value={resumeData.personal.github} onChange={handlePersonalChange} />
                    <input name="linkedin" placeholder="LinkedIn URL" value={resumeData.personal.linkedin} onChange={handlePersonalChange} />
                    <input name="portfolio" placeholder="Portfolio URL" value={resumeData.personal.portfolio} onChange={handlePersonalChange} />
                </div>
            </section>

            {/* Summary */}
            <section>
                <h3 style={{ marginBottom: '16px' }}>Summary</h3>
                <textarea
                    placeholder="I build..."
                    value={resumeData.summary}
                    onChange={handleSummaryChange}
                    style={{ height: '100px' }}
                />
            </section>

            {/* Education */}
            <section>
                <h3 style={{ marginBottom: '16px' }}>Education</h3>
                {resumeData.education.map(ed => (
                    <div key={ed.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', border: '1px solid #eee', marginBottom: '8px' }}>
                        <div><strong>{ed.degree}</strong>, {ed.institution} ({ed.year})</div>
                        <button onClick={() => removeItem('education', ed.id)} style={{ color: 'red' }}><Trash2 size={16} /></button>
                    </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '8px', marginTop: '8px' }}>
                    <input placeholder="Institution" value={newEducation.institution} onChange={e => setNewEducation({ ...newEducation, institution: e.target.value })} />
                    <input placeholder="Degree" value={newEducation.degree} onChange={e => setNewEducation({ ...newEducation, degree: e.target.value })} />
                    <input placeholder="Year" value={newEducation.year} onChange={e => setNewEducation({ ...newEducation, year: e.target.value })} />
                </div>
                <button className="btn-secondary" style={{ marginTop: '8px', width: '100%' }} onClick={handleAddEducation}>
                    <Plus size={16} style={{ marginRight: '4px' }} /> Add Education
                </button>
            </section>

            {/* Experience */}
            <section>
                <h3 style={{ marginBottom: '16px' }}>Experience</h3>
                {resumeData.experience.map(exp => (
                    <div key={exp.id} style={{ padding: '8px', border: '1px solid #eee', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div><strong>{exp.role}</strong> at {exp.company}</div>
                            <button onClick={() => removeItem('experience', exp.id)} style={{ color: 'red' }}><Trash2 size={16} /></button>
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{exp.duration}</div>
                        <p style={{ fontSize: '14px', marginTop: '4px' }}>{exp.description}</p>
                    </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <input placeholder="Role" value={newExperience.role} onChange={e => setNewExperience({ ...newExperience, role: e.target.value })} />
                        <input placeholder="Company" value={newExperience.company} onChange={e => setNewExperience({ ...newExperience, company: e.target.value })} />
                    </div>
                    <input placeholder="Duration (e.g. 2020 - Present)" value={newExperience.duration} onChange={e => setNewExperience({ ...newExperience, duration: e.target.value })} />
                    <textarea placeholder="Description" value={newExperience.description} onChange={e => setNewExperience({ ...newExperience, description: e.target.value })} style={{ height: '80px' }} />
                </div>
                <button className="btn-secondary" style={{ marginTop: '8px', width: '100%' }} onClick={handleAddExperience}>
                    <Plus size={16} style={{ marginRight: '4px' }} /> Add Experience
                </button>
            </section>

            {/* Projects */}
            <section>
                <h3 style={{ marginBottom: '16px' }}>Projects</h3>
                {resumeData.projects.map(proj => (
                    <div key={proj.id} style={{ padding: '8px', border: '1px solid #eee', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>{proj.name}</strong>
                            <button onClick={() => removeItem('projects', proj.id)} style={{ color: 'red' }}><Trash2 size={16} /></button>
                        </div>
                        <p style={{ fontSize: '14px' }}>{proj.description}</p>
                        <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'blue' }}>{proj.link}</a>
                    </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    <input placeholder="Project Name" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} />
                    <input placeholder="Description" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
                    <input placeholder="Link" value={newProject.link} onChange={e => setNewProject({ ...newProject, link: e.target.value })} />
                </div>
                <button className="btn-secondary" style={{ marginTop: '8px', width: '100%' }} onClick={handleAddProject}>
                    <Plus size={16} style={{ marginRight: '4px' }} /> Add Project
                </button>
            </section>

            {/* Skills */}
            <section>
                <h3 style={{ marginBottom: '16px' }}>Skills</h3>
                <textarea
                    placeholder="Java, Python, React, Playing Chess..."
                    value={resumeData.skills}
                    onChange={handleSkillsChange}
                    style={{ height: '60px' }}
                />
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Comma separated values</div>
            </section>

        </div>
    );
};

export default BuilderForm;
