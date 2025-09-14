import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ToolsView from './components/ToolsView';
import InsightsView from './components/InsightsView';
import Footer from './components/Footer';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';


const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [activeTool, setActiveTool] = useState<'ageCalculator' | 'familyTracker'>('ageCalculator');

    const handleNavigate = (page: 'home' | 'tools' | 'insights' | 'privacy' | 'terms', tool?: 'ageCalculator' | 'familyTracker') => {
        setCurrentPage(page);
        if (tool) {
            setActiveTool(tool);
        }
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'tools':
                return <ToolsView activeTool={activeTool} setActiveTool={setActiveTool} />;
            case 'insights':
                return <InsightsView />;
            case 'privacy':
                return <PrivacyPolicyPage />;
            case 'terms':
                return <TermsOfServicePage />;
            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    }

    return (
        <div className="min-h-screen font-sans bg-gray-900 text-gray-200">
            <Navbar currentPage={currentPage} activeTool={activeTool} onNavigate={handleNavigate} />
            <div className="pt-16"> {/* Adjust padding for fixed navbar height */}
                {renderPage()}
            </div>
            <Footer onNavigate={handleNavigate} />
        </div>
    );
};

export default App;