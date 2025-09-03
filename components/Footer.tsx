import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="text-center text-sm text-gray-500 py-8 border-t border-gray-800 mt-16">
            <div className="max-w-3xl mx-auto space-y-2 px-4">
                <p className="pt-4 text-gray-400">
                   &copy; {new Date().getFullYear()} LifeArc.
                </p>
            </div>
        </footer>
    );
};

export default Footer;