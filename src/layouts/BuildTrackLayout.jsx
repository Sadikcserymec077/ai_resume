import React from 'react';
import { Outlet } from 'react-router-dom';
import BuildTrackTopBar from '../components/common/BuildTrackTopBar';
import ProofFooter from '../components/common/ProofFooter';
import BuildPanel from '../components/common/BuildPanel';
import { StepProvider } from '../contexts/StepContext';

const BuildTrackLayout = () => {
    return (
        <StepProvider>
            <div className="premium-layout-container">
                <BuildTrackTopBar />
                <div className="main-content-layout">
                    <main className="workspace-panel">
                        <Outlet />
                    </main>
                    <aside className="build-panel">
                        <BuildPanel />
                    </aside>
                </div>
                <ProofFooter />
            </div>
        </StepProvider>
    );
};

export default BuildTrackLayout;
