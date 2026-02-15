import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

const STORAGE_KEY = 'resumeBuilderData';
const TEMPLATE_KEY = 'resumeBuilderTemplate';
const COLOR_KEY = 'resumeBuilderAccentColor';

const ACCENT_COLORS = [
    'hsl(168, 60%, 40%)',
    'hsl(220, 60%, 35%)',
    'hsl(345, 60%, 35%)',
    'hsl(150, 50%, 30%)',
    'hsl(0, 0%, 25%)'
];

const INITIAL_SKILLS = {
    technical: [],
    soft: [],
    tools: []
};

const INITIAL_STATE = {
    personal: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        github: '',
        linkedin: '',
        portfolio: ''
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: INITIAL_SKILLS
};

const SAMPLE_DATA = {
    personal: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA',
        github: 'github.com/alexmorgan',
        linkedin: 'linkedin.com/in/alexmorgan',
        portfolio: 'alexmorgan.dev'
    },
    summary: 'Senior Software Engineer with 6+ years of experience in full-stack development. Passionate about building scalable web applications and intuitive user interfaces. Proven track record of leadership and technical excellence.',
    education: [
        {
            id: 1,
            institution: 'University of California, Berkeley',
            degree: 'B.S. Computer Science',
            year: '2016 - 2020'
        }
    ],
    experience: [
        {
            id: 1,
            role: 'Senior Frontend Engineer',
            company: 'TechFlow Inc.',
            duration: '2022 - Present',
            description: 'Leading a team of 5 developers. Improved site performance by 40%.'
        },
        {
            id: 2,
            role: 'Software Developer',
            company: 'BuildLite',
            duration: '2020 - 2022',
            description: 'Developed key features for the main product securely and efficiently.'
        }
    ],
    projects: [
        {
            id: 1,
            name: 'E-Commerce Platform',
            description: 'A full-featured shopping platform built with React and Node.js serving 10k users.',
            techStack: ['React', 'Node.js', 'MongoDB'],
            liveUrl: 'ecommerce-demo.vercel.app',
            githubUrl: 'github.com/alex/shop'
        }
    ],
    skills: {
        technical: ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'GraphQL'],
        soft: ['Team Leadership', 'Problem Solving', 'Communication'],
        tools: ['Git', 'Docker', 'AWS', 'PostgreSQL']
    }
};

/**
 * Migrate old skills format (string) to new format (object with categories).
 * Migrate old project format (link) to new format (liveUrl, githubUrl, techStack).
 */
const migrateData = (data) => {
    // Migrate skills
    let skills = data.skills;
    if (typeof skills === 'string') {
        const list = skills.split(',').map(s => s.trim()).filter(s => s);
        skills = { technical: list, soft: [], tools: [] };
    } else if (!skills || typeof skills !== 'object') {
        skills = { ...INITIAL_SKILLS };
    } else {
        skills = {
            technical: skills.technical || [],
            soft: skills.soft || [],
            tools: skills.tools || []
        };
    }

    // Migrate projects
    const projects = (data.projects || []).map(p => ({
        ...p,
        techStack: p.techStack || [],
        liveUrl: p.liveUrl || p.link || '',
        githubUrl: p.githubUrl || ''
    }));

    return { ...data, skills, projects };
};

// Load from localStorage on init
const loadFromStorage = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            const base = {
                personal: { ...INITIAL_STATE.personal, ...parsed.personal },
                summary: parsed.summary || '',
                education: parsed.education || [],
                experience: parsed.experience || [],
                projects: parsed.projects || [],
                skills: parsed.skills || ''
            };
            return migrateData(base);
        }
    } catch (e) {
        console.warn('Failed to load resume data from localStorage:', e);
    }
    return INITIAL_STATE;
};

const loadTemplate = () => {
    try {
        const stored = localStorage.getItem(TEMPLATE_KEY);
        if (stored && ['classic', 'modern', 'minimal'].includes(stored)) {
            return stored;
        }
    } catch (e) { /* ignore */ }
    return 'classic';
};

const loadColor = () => {
    try {
        const stored = localStorage.getItem(COLOR_KEY);
        if (stored && ACCENT_COLORS.includes(stored)) return stored;
    } catch (e) { /* ignore */ }
    return ACCENT_COLORS[0];
};

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(loadFromStorage);
    const [template, setTemplate] = useState(loadTemplate);
    const [accentColor, setAccentColor] = useState(loadColor);

    // Auto-save resume data
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
        } catch (e) {
            console.warn('Failed to save resume data to localStorage:', e);
        }
    }, [resumeData]);

    // Auto-save template choice
    useEffect(() => {
        try { localStorage.setItem(TEMPLATE_KEY, template); } catch (e) { /* ignore */ }
    }, [template]);

    // Auto-save accent color
    useEffect(() => {
        try { localStorage.setItem(COLOR_KEY, accentColor); } catch (e) { /* ignore */ }
    }, [accentColor]);

    const updatePersonal = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const updateSection = (section, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: value
        }));
    };

    const addItem = (section, item) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...item, id: Date.now() }]
        }));
    };

    const removeItem = (section, id) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const updateItem = (section, id, updates) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map(item =>
                item.id === id ? { ...item, ...updates } : item
            )
        }));
    };

    // Skills helpers
    const addSkill = (category, skill) => {
        setResumeData(prev => {
            const existing = prev.skills[category] || [];
            if (existing.includes(skill)) return prev;
            return {
                ...prev,
                skills: { ...prev.skills, [category]: [...existing, skill] }
            };
        });
    };

    const removeSkill = (category, skill) => {
        setResumeData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: (prev.skills[category] || []).filter(s => s !== skill)
            }
        }));
    };

    const loadSampleData = () => {
        setResumeData(SAMPLE_DATA);
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            updatePersonal,
            updateSection,
            addItem,
            removeItem,
            updateItem,
            addSkill,
            removeSkill,
            loadSampleData,
            template,
            setTemplate,
            accentColor,
            setAccentColor
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => useContext(ResumeContext);
