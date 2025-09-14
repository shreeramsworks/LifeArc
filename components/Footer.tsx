import React from 'react';

// The parent component, App.tsx, will provide this navigation function.
interface FooterProps {
    onNavigate: (page: 'privacy' | 'terms' | 'about' | 'contact') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="text-center text-sm text-gray-500 py-8 border-t border-gray-800 mt-16">
            <div className="max-w-3xl mx-auto space-y-4 px-4">
                 <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2">
                    <button onClick={() => onNavigate('about')} className="hover:text-gray-300 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        About Us
                    </button>
                    <button onClick={() => onNavigate('contact')} className="hover:text-gray-300 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        Contact Us
                    </button>
                    <button onClick={() => onNavigate('privacy')} className="hover:text-gray-300 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        Privacy Policy
                    </button>
                    <button onClick={() => onNavigate('terms')} className="hover:text-gray-300 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        Terms of Service
                    </button>
                </div>
                <p className="pt-4 text-gray-400">
                   &copy; {new Date().getFullYear()} LifeArc. All calculations and data are processed in your browser.
                </p>
            </div>
        </footer>
    );
};

export default Footer;