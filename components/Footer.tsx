import React from 'react';

interface FooterLinkProps {
    href: string;
    children: React.ReactNode;
    onNavigate: (path: string) => void;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, onNavigate }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onNavigate(href);
    };

    return (
        <a 
            href={href}
            onClick={handleClick}
            className="text-gray-300 hover:text-white hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
            {children}
        </a>
    );
};


interface FooterProps {
    onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="text-center text-sm text-gray-300 py-8 border-t border-gray-800 mt-16">
            <div className="max-w-3xl mx-auto space-y-4 px-4">
                 <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2">
                    <FooterLink href="#/about" onNavigate={onNavigate}>About Us</FooterLink>
                    <FooterLink href="#/blog" onNavigate={onNavigate}>Blog</FooterLink>
                    <FooterLink href="#/contact" onNavigate={onNavigate}>Contact Us</FooterLink>
                    <FooterLink href="#/privacy" onNavigate={onNavigate}>Privacy Policy</FooterLink>
                    <FooterLink href="#/terms" onNavigate={onNavigate}>Terms of Service</FooterLink>
                </div>
                <p className="pt-4 text-gray-300">
                   &copy; {new Date().getFullYear()} LifeArrc. All calculations and data are processed in your browser.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
