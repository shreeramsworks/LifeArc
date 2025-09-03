import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
    contentClassName?: string;
    actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, contentClassName = '', actions }) => {
    return (
        <div className="bg-gray-800 shadow-lg rounded-xl border border-gray-700 overflow-hidden flex flex-col">
            <header className="bg-gray-800 border-b-2 border-blue-500 text-white p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">{title}</h2>
                {actions && <div className="flex items-center gap-2">{actions}</div>}
            </header>
            <div 
                className={`p-4 sm:p-6 ${contentClassName}`} 
                style={{ maxHeight: '60vh', overflowY: 'auto' }}
            >
                {children}
            </div>
        </div>
    );
};

export default Card;