import React from 'react';
import FamilyTracker from './family/FamilyTracker';
import AgeCalculatorView from './AgeCalculatorView';
import AdSenseBanner from './AdSenseBanner';

interface ToolsViewProps {
    activeTool: string;
    onNavigate: (path: string) => void;
}

const ToolsView: React.FC<ToolsViewProps> = ({ activeTool, onNavigate }) => {

    const TabButton: React.FC<{ tabId: string; children: React.ReactNode }> = ({ tabId, children }) => {
        const isActive = activeTool === tabId;
        const baseClasses = "py-3 px-4 sm:px-6 text-base sm:text-lg font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";
        const activeClasses = "border-b-2 border-blue-500 text-blue-400";
        const inactiveClasses = "text-gray-300 hover:text-blue-500 hover:border-b-2 hover:border-gray-600";
        const href = `#/tools/${tabId}`;

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            onNavigate(href);
        };

        return (
            <a
                href={href}
                onClick={handleClick}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                role="tab"
                aria-selected={isActive}
            >
                {children}
            </a>
        );
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <main className="space-y-8">
                <div className="border-b border-gray-700" role="tablist">
                    <nav className="flex justify-center -mb-px">
                        <TabButton tabId="ageCalculator">Precise Age Calculator</TabButton>
                        <TabButton tabId="familyTracker">Private Family Tracker</TabButton>
                    </nav>
                </div>
                
                <AdSenseBanner />

                <div role="tabpanel">
                    {activeTool === 'ageCalculator' && <AgeCalculatorView />}
                    {activeTool === 'familyTracker' && <FamilyTracker />}
                </div>
            </main>
        </div>
    );
};

export default ToolsView;
