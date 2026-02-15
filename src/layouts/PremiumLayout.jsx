import React from 'react';
import TopBar from './components/common/TopBar';
import { Outlet } from 'react-router-dom';

const PremiumLayout = () => {
    return (
        <div className="premium-layout-container" style={{ display: 'block', height: '100vh', overflowX: 'hidden' }}>
            <TopBar />
            <div className="main-content" style={{ marginTop: '0px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default PremiumLayout;
