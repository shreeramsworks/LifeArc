import React from 'react';

type Page = 'privacy' | 'terms' | 'about' | 'contact' | 'blog';

// The parent component, App.tsx, will provide this navigation function.
interface FooterProps {
    currentPage: string;
    onNavigate: (page: Page) => void;
}

const FooterLink: React.FC<{
    page: Page;
    currentPage: string;
    onNavigate: (page: Page) => void;
    children: React.ReactNode;
}> = ({ page, currentPage, onNavigate, children }) => {
    const isActive = currentPage === page;
    return (
        <a 
            href={`#${page}`}
            onClick={(e) => { e.preventDefault(); onNavigate(page); }} 
            className="hover:text-gray-300 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </a>
    );
};


const Footer: React.FC<FooterProps> = ({ currentPage, onNavigate }) => {
    return (
        <footer className="text-center text-sm text-gray-400 py-8 border-t border-gray-800 mt-16">
            <div className="max-w-3xl mx-auto space-y-4 px-4">
                 <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2">
                    <FooterLink page="about" currentPage={currentPage} onNavigate={onNavigate}>About Us</FooterLink>
                    <FooterLink page="blog" currentPage={currentPage} onNavigate={onNavigate}>Blog</FooterLink>
                    <FooterLink page="contact" currentPage={currentPage} onNavigate={onNavigate}>Contact Us</FooterLink>
                    <FooterLink page="privacy" currentPage={currentPage} onNavigate={onNavigate}>Privacy Policy</FooterLink>
                    <FooterLink page="terms" currentPage={currentPage} onNavigate={onNavigate}>Terms of Service</FooterLink>
                </div>
                <p className="pt-4 text-gray-400">
                   &copy; {new Date().getFullYear()} LifeArc. All calculations and data are processed in your browser.
                </p>
            </div>
        </footer>
    );
};

export default Footer;