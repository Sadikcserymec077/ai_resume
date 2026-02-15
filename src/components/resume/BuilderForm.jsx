import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Plus, Trash2, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { getBulletSuggestions } from '../../utils/bulletGuidance';
import TagInput from './TagInput';

/** Inline bullet hint */
const BulletHints = ({ text }) => {
    const hints = getBulletSuggestions(text);
    if (hints.length === 0) return null;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
            {hints.map((h, i) => (
                <span key={i} style={{ fontSize: '11px', color: '#E65100', fontStyle: 'italic', opacity: 0.85 }}>
                    ↳ {h}
                </span>
            ))}
        </div>
    );
};

const SUGGESTED_SKILLS = {
    technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
    soft: ['Team Leadership', 'Problem Solving'],
    tools: ['Git', 'Docker', 'AWS']
};

const SKILL_CATEGORIES = [
    { key: 'technical', label: 'Technical Skills' },
    { key: 'soft', label: 'Soft Skills' },
    { key: 'tools', label: 'Tools & Technologies' }
];

const BuilderForm = () => {
    const {
        resumeData, updatePersonal, updateSection,
        addItem, removeItem, updateItem,
        addSkill, removeSkill, loadSampleData
    } = useResume();

    const handlePersonalChange = (e) => {
        updatePersonal(e.target.name, e.target.value);
    };

    const handleSummaryChange = (e) => {
        updateSection('summary', e.target.value);
    };

    // Education
    const [newEducation, setNewEducation] = useState({ institution: '', degree: '', year: '' });
    const handleAddEducation = () => {
        if (!newEducation.institution && !newEducation.degree) return;
        addItem('education', newEducation);
        setNewEducation({ institution: '', degree: '', year: '' });
    };

    // Experience
    const [newExperience, setNewExperience] = useState({ role: '', company: '', duration: '', description: '' });
    const handleAddExperience = () => {
        if (!newExperience.role && !newExperience.company) return;
        addItem('experience', newExperience);
        setNewExperience({ role: '', company: '', duration: '', description: '' });
    };

    // Projects state
    const [expandedProjects, setExpandedProjects] = useState({});
    const toggleProject = (id) => {
        setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAddProject = () => {
        const newProj = {
            name: '',
            description: '',
            techStack: [],
            liveUrl: '',
            githubUrl: ''
        };
        addItem('projects', newProj);
    };

    // Skills suggestion
    const [suggestLoading, setSuggestLoading] = useState(false);
    const handleSuggestSkills = () => {
        setSuggestLoading(true);
        setTimeout(() => {
            Object.entries(SUGGESTED_SKILLS).forEach(([category, skillsList]) => {
                skillsList.forEach(skill => addSkill(category, skill));
            });
            setSuggestLoading(false);
        }, 1000);
    };

    // Helper: total skill count
    const totalSkills = (resumeData.skills.technical?.length || 0)
        + (resumeData.skills.soft?.length || 0)
        + (resumeData.skills.tools?.length || 0);

    return (
        <div className="builder-form" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Sample Data Button */}
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
                    placeholder="A concise professional summary (40–120 words)…"
                    value={resumeData.summary}
                    onChange={handleSummaryChange}
                    style={{ height: '100px' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                    {resumeData.summary ? resumeData.summary.trim().split(/\s+/).length : 0} words
                </div>
            </section>

            {/* Education */}
            <section>
                <h3 style={{ marginBottom: '16px' }}>Education</h3>
                {resumeData.education.map(ed => (
                    <div key={ed.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', border: '1px solid #eee', marginBottom: '8px', borderRadius: '4px' }}>
                        <div><strong>{ed.degree}</strong>, {ed.institution} ({ed.year})</div>
                        <button onClick={() => removeItem('education', ed.id)} style={{ color: '#8B0000', background: 'none' }}><Trash2 size={16} /></button>
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
                    <div key={exp.id} style={{ padding: '12px', border: '1px solid #eee', marginBottom: '8px', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div><strong>{exp.role}</strong> at {exp.company}</div>
                            <button onClick={() => removeItem('experience', exp.id)} style={{ color: '#8B0000', background: 'none' }}><Trash2 size={16} /></button>
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{exp.duration}</div>
                        <p style={{ fontSize: '14px', marginTop: '4px' }}>{exp.description}</p>
                        <BulletHints text={exp.description} />
                    </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <input placeholder="Role" value={newExperience.role} onChange={e => setNewExperience({ ...newExperience, role: e.target.value })} />
                        <input placeholder="Company" value={newExperience.company} onChange={e => setNewExperience({ ...newExperience, company: e.target.value })} />
                    </div>
                    <input placeholder="Duration (e.g. 2020 - Present)" value={newExperience.duration} onChange={e => setNewExperience({ ...newExperience, duration: e.target.value })} />
                    <textarea placeholder="Description (start with an action verb)" value={newExperience.description} onChange={e => setNewExperience({ ...newExperience, description: e.target.value })} style={{ height: '80px' }} />
                    <BulletHints text={newExperience.description} />
                </div>
                <button className="btn-secondary" style={{ marginTop: '8px', width: '100%' }} onClick={handleAddExperience}>
                    <Plus size={16} style={{ marginRight: '4px' }} /> Add Experience
                </button>
            </section>

            {/* ===== PROJECTS SECTION (Accordion) ===== */}
            <section>
                <h3 style={{ marginBottom: '16px' }}>Projects</h3>

                {resumeData.projects.map(proj => {
                    const isOpen = expandedProjects[proj.id] !== false; // open by default
                    return (
                        <div key={proj.id} style={{
                            border: '1px solid #eee',
                            borderRadius: '4px',
                            marginBottom: '8px',
                            overflow: 'hidden'
                        }}>
                            {/* Accordion header */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '10px 12px',
                                    backgroundColor: '#fafafa',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                                onClick={() => toggleProject(proj.id)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    <strong style={{ fontSize: '14px' }}>{proj.name || 'Untitled Project'}</strong>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeItem('projects', proj.id); }}
                                    style={{ color: '#8B0000', background: 'none' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Accordion body */}
                            {isOpen && (
                                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <input
                                        placeholder="Project Title"
                                        value={proj.name}
                                        onChange={e => updateItem('projects', proj.id, { name: e.target.value })}
                                    />
                                    <div>
                                        <textarea
                                            placeholder="Description (max 200 chars)"
                                            value={proj.description}
                                            onChange={e => {
                                                if (e.target.value.length <= 200) {
                                                    updateItem('projects', proj.id, { description: e.target.value });
                                                }
                                            }}
                                            style={{ height: '60px' }}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                                            <BulletHints text={proj.description} />
                                            <span style={{ fontSize: '11px', color: proj.description.length > 180 ? '#E65100' : '#999' }}>
                                                {proj.description.length}/200
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: '500', color: '#666', display: 'block', marginBottom: '4px' }}>
                                            Tech Stack
                                        </label>
                                        <TagInput
                                            tags={proj.techStack || []}
                                            onAdd={(tag) => updateItem('projects', proj.id, { techStack: [...(proj.techStack || []), tag] })}
                                            onRemove={(tag) => updateItem('projects', proj.id, { techStack: (proj.techStack || []).filter(t => t !== tag) })}
                                            placeholder="Add technology..."
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: '500', color: '#666', display: 'block', marginBottom: '4px' }}>Live URL (optional)</label>
                                            <input
                                                placeholder="https://..."
                                                value={proj.liveUrl || ''}
                                                onChange={e => updateItem('projects', proj.id, { liveUrl: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: '500', color: '#666', display: 'block', marginBottom: '4px' }}>GitHub URL (optional)</label>
                                            <input
                                                placeholder="github.com/..."
                                                value={proj.githubUrl || ''}
                                                onChange={e => updateItem('projects', proj.id, { githubUrl: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                <button className="btn-secondary" style={{ marginTop: '8px', width: '100%' }} onClick={handleAddProject}>
                    <Plus size={16} style={{ marginRight: '4px' }} /> Add Project
                </button>
            </section>

            {/* ===== SKILLS SECTION (Categorized Tags) ===== */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ marginBottom: '0' }}>Skills</h3>
                    <button
                        className="btn-secondary"
                        onClick={handleSuggestSkills}
                        disabled={suggestLoading}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            fontSize: '12px', padding: '6px 12px',
                            opacity: suggestLoading ? 0.6 : 1
                        }}
                    >
                        <Sparkles size={14} />
                        {suggestLoading ? 'Adding…' : '✨ Suggest Skills'}
                    </button>
                </div>

                {SKILL_CATEGORIES.map(cat => {
                    const list = resumeData.skills[cat.key] || [];
                    return (
                        <div key={cat.key} style={{ marginBottom: '16px' }}>
                            <label style={{
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#666',
                                display: 'block',
                                marginBottom: '6px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {cat.label} ({list.length})
                            </label>
                            <TagInput
                                tags={list}
                                onAdd={(skill) => addSkill(cat.key, skill)}
                                onRemove={(skill) => removeSkill(cat.key, skill)}
                                placeholder={`Add ${cat.label.toLowerCase()}...`}
                            />
                        </div>
                    );
                })}
                <div style={{ fontSize: '11px', color: '#999' }}>
                    {totalSkills} total skills
                </div>
            </section>

        </div>
    );
};

export default BuilderForm;
