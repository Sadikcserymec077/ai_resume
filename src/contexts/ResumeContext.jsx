import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

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
    skills: ''
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
            description: 'A full-featured shopping platform built with React and Node.js.',
            link: 'github.com/alex/shop'
        }
    ],
    skills: 'JavaScript, React, Node.js, Python, AWS, Docker, TypeScript, GraphQL'
};

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(INITIAL_STATE);

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
            loadSampleData
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => useContext(ResumeContext);
