import React from 'react';

interface NavbarProps {
    currentPage: string;
    activeTool: 'ageCalculator' | 'familyTracker';
    onNavigate: (page: 'home' | 'tools' | 'insights' | 'privacy' | 'terms', tool?: 'ageCalculator' | 'familyTracker') => void;
}

const NavButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}> = ({ isActive, onClick, children, className }) => {
    const baseClasses = "px-4 py-2 text-base font-medium rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-white";
    const activeClasses = "bg-white/10 text-white";
    const inactiveClasses = "text-gray-400 hover:bg-white/10 hover:text-white";
    return (
        <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}>
            {children}
        </button>
    );
};

const Navbar: React.FC<NavbarProps> = ({ currentPage, activeTool, onNavigate }) => {
    
    return (
        <header className="bg-gray-900/80 backdrop-blur-sm shadow-md fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-800">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
                    <i className="fa-solid fa-hourglass-half text-blue-400 text-2xl" aria-label="LifeArc App Logo - Hourglass"></i>
                    <h1 className="text-xl font-bold text-white">LifeArc</h1>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                    <NavButton isActive={currentPage === 'home'} onClick={() => onNavigate('home')}>
                        Home
                    </NavButton>
                    <NavButton
                        isActive={currentPage === 'tools' && activeTool === 'ageCalculator'}
                        onClick={() => onNavigate('tools', 'ageCalculator')}
                    >
                        Age Calculator
                    </NavButton>
                     <NavButton
                        isActive={currentPage === 'tools' && activeTool === 'familyTracker'}
                        onClick={() => onNavigate('tools', 'familyTracker')}
                    >
                        Family Tracker
                    </NavButton>
                     <NavButton
                        isActive={currentPage === 'insights'}
                        onClick={() => onNavigate('insights')}
                    >
                        Chrono Insights
                    </NavButton>
                </div>
                <div className="sm:hidden relative group">
                     <button className="text-gray-300 hover:text-white p-2 rounded-md">
                        <i className="fa-solid fa-bars text-xl"></i>
                     </button>
                     <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Home</a>
                         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('tools', 'ageCalculator'); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Age Calculator</a>
                         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('tools', 'familyTracker'); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Family Tracker</a>
                         <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('insights'); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Chrono Insights</a>
                     </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;