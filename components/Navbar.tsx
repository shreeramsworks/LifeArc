import React from 'react';

type Page = 'home' | 'tools' | 'insights' | 'privacy' | 'terms' | 'about' | 'contact' | 'blog';
type Tool = 'ageCalculator' | 'familyTracker';

interface NavbarProps {
    currentPage: string;
    activeTool: Tool;
    onNavigate: (path: string) => void;
}

const NavLink: React.FC<{
    isActive: boolean;
    href: string;
    children: React.ReactNode;
    className?: string;
    onNavigate: (path: string) => void;
}> = ({ isActive, href, children, className, onNavigate }) => {
    const baseClasses = "px-4 py-2 text-base font-medium rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-white";
    const activeClasses = "bg-white/10 text-white";
    const inactiveClasses = "text-gray-300 hover:bg-white/10 hover:text-white";
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onNavigate(href);
    };

    return (
        <a 
            href={href} 
            onClick={handleClick}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </a>
    );
};

const Navbar: React.FC<NavbarProps> = ({ currentPage, activeTool, onNavigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleMobileLinkClick = (path: string) => {
        setIsMobileMenuOpen(false);
        onNavigate(path);
    };

    return (
        <header className="bg-gray-900/80 backdrop-blur-sm shadow-md fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-800">
            <nav className="mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('#/'); }} className="flex items-center gap-2 cursor-pointer">
                    <i className="fa-solid fa-hourglass-half text-blue-400 text-2xl" aria-label="LifeArrc App Logo - Hourglass"></i>
                    <p className="text-xl font-bold text-white">LifeArrc</p>
                </a>
                <div className="hidden sm:flex items-center space-x-2">
                    <NavLink isActive={currentPage === 'home'} href="#/" onNavigate={onNavigate}>
                        Home
                    </NavLink>
                    <NavLink
                        isActive={currentPage === 'tools' && activeTool === 'ageCalculator'}
                        href="#/tools/ageCalculator"
                        onNavigate={onNavigate}
                    >
                        Age Calculator
                    </NavLink>
                     <NavLink
                        isActive={currentPage === 'tools' && activeTool === 'familyTracker'}
                        href="#/tools/familyTracker"
                        onNavigate={onNavigate}
                    >
                        Family Tracker
                    </NavLink>
                     <NavLink
                        isActive={currentPage === 'insights'}
                        href="#/insights"
                        onNavigate={onNavigate}
                    >
                        Chrono Insights
                    </NavLink>
                    <NavLink
                        isActive={currentPage === 'blog'}
                        href="#/blog"
                        onNavigate={onNavigate}
                    >
                        Blog
                    </NavLink>
                    <NavLink
                        isActive={currentPage === 'about'}
                        href="#/about"
                        onNavigate={onNavigate}
                    >
                        About Us
                    </NavLink>
                </div>
                <div className="sm:hidden relative">
                     <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white p-2 rounded-md" aria-label="Toggle mobile menu" aria-expanded={isMobileMenuOpen}>
                        <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                     </button>
                     {isMobileMenuOpen && (
                         <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                             <a href="#/" onClick={(e) => { e.preventDefault(); handleMobileLinkClick('#/'); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Home</a>
                             <a href="#/tools/ageCalculator" onClick={(e) => { e.preventDefault(); handleMobileLinkClick('#/tools/ageCalculator'); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Age Calculator</a>
                             <a href="#/tools/familyTracker" onClick={(e) => { e.preventDefault(); handleMobileLinkClick('#/tools/familyTracker'); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Family Tracker</a>
                             <a href="#/insights" onClick={(e) => { e.preventDefault(); handleMobileLinkClick('#/insights'); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Chrono Insights</a>
                             <a href="#/blog" onClick={(e) => { e.preventDefault(); handleMobileLinkClick('#/blog'); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Blog</a>
                             <a href="#/about" onClick={(e) => { e.preventDefault(); handleMobileLinkClick('#/about'); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">About Us</a>
                         </div>
                     )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
