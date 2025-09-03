import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ToolsView from './components/ToolsView';
import InsightsView from './components/InsightsView';
import Footer from './components/Footer';


const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [activeTool, setActiveTool] = useState<'ageCalculator' | 'familyTracker'>('ageCalculator');

    const handleNavigate = (page: 'home' | 'tools' | 'insights', tool?: 'ageCalculator' | 'familyTracker') => {
        setCurrentPage(page);
        if (tool) {
            setActiveTool(tool);
        }
    };

    return (
        <div className="min-h-screen font-sans bg-gray-900 text-gray-200">
            <Navbar currentPage={currentPage} activeTool={activeTool} onNavigate={handleNavigate} />
            <div className="pt-16"> {/* Adjust padding for fixed navbar height */}
                {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
                {currentPage === 'tools' && <ToolsView activeTool={activeTool} setActiveTool={setActiveTool} />}
                {currentPage === 'insights' && <InsightsView />}
            </div>
            <Footer />
        </div>
    );
};

export default App;