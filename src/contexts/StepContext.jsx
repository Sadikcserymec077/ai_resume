import React, { createContext, useState, useContext } from 'react';

const StepContext = createContext();

export const StepProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(null);
    const [buildContent, setBuildContent] = useState(''); // Text for the "Copy This" textarea
    const [buildStatus, setBuildStatus] = useState('pending'); // pending, success, error
    const [artifacts, setArtifacts] = useState(() => {
        const saved = {};
        for (let i = 1; i <= 8; i++) {
            const key = `rb_step_${i}_artifact`;
            const val = localStorage.getItem(key);
            if (val) saved[key] = val;
        }
        return saved;
    });

    const updateArtifact = (stepId, artifact) => {
        const key = `rb_step_${stepId}_artifact`;
        localStorage.setItem(key, artifact);
        setArtifacts(prev => ({
            ...prev,
            [key]: artifact
        }));
    };

    return (
        <StepContext.Provider value={{
            currentStep,
            setCurrentStep,
            buildContent,
            setBuildContent,
            buildStatus,
            setBuildStatus,
            artifacts,
            updateArtifact
        }}>
            {children}
        </StepContext.Provider>
    );
};

export const useStep = () => useContext(StepContext);
