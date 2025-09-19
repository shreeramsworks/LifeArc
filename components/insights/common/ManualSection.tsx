import React, { useState } from 'react';

interface ManualSectionContent {
    heading: string;
    content: React.ReactNode;
}

interface ManualSectionProps {
    title?: string;
    sections: ManualSectionContent[];
}

const ManualSection: React.FC<ManualSectionProps> = ({ title = "User Manual", sections }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="pt-4 mt-4 border-t border-gray-700">
            <div className="bg-gray-900/50 rounded-lg border border-gray-700">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center p-4 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 rounded-lg"
                    aria-expanded={isOpen}
                    aria-controls="manual-content"
                >
                    <h3 className="font-semibold text-gray-200 text-lg flex items-center gap-3">
                        <i className="fa-solid fa-book-open text-blue-400"></i>
                        {title}
                    </h3>
                    <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </button>
                <div
                    id="manual-content"
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="p-4 pt-0">
                        <div className="mt-2 pl-4 border-l-2 border-gray-600 space-y-4">
                            {sections.map((section, index) => (
                                <div key={index}>
                                    <h4 className="font-bold text-gray-200">{section.heading}</h4>
                                    <div className="mt-1 text-gray-300 space-y-2">{section.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualSection;