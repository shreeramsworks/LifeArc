import React from 'react';
import FamilyTracker from './family/FamilyTracker';
import AgeCalculatorView from './AgeCalculatorView';
import AdSenseBanner from './AdSenseBanner';

interface ToolsViewProps {
    activeTool: string;
    setActiveTool: (tool: 'ageCalculator' | 'familyTracker') => void;
}

const ToolsView: React.FC<ToolsViewProps> = ({ activeTool, setActiveTool }) => {

    const TabButton: React.FC<{ tabId: string; children: React.ReactNode }> = ({ tabId, children }) => {
        const isActive = activeTool === tabId;
        const baseClasses = "py-3 px-4 sm:px-6 text-base sm:text-lg font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";
        const activeClasses = "border-b-2 border-blue-500 text-blue-400";
        const inactiveClasses = "text-gray-500 hover:text-blue-500 hover:border-b-2 hover:border-gray-600";

        return (
            <button
                onClick={() => setActiveTool(tabId as 'ageCalculator' | 'familyTracker')}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                role="tab"
                aria-selected={isActive}
            >
                {children}
            </button>
        );
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl mx-auto space-y-8">
                <header className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white">
                        ChronoCraft Instruments
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">
                        A suite of precision tools for time calculation and family tracking.
                    </p>
                </header>

                <AdSenseBanner />

                <div className="border-b border-gray-700" role="tablist">
                    <nav className="flex justify-center -mb-px">
                        <TabButton tabId="ageCalculator">Age Calculator</TabButton>
                        <TabButton tabId="familyTracker">Family Tracker</TabButton>
                    </nav>
                </div>

                <div role="tabpanel">
                    {activeTool === 'ageCalculator' && <AgeCalculatorView />}
                    {activeTool === 'familyTracker' && <FamilyTracker />}
                </div>
            </main>
        </div>
    );
};

export default ToolsView;