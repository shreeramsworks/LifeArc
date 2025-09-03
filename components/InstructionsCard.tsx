import React from 'react';

interface InstructionsCardProps {
    title: string;
    steps: string[];
}

const InstructionsCard: React.FC<InstructionsCardProps> = ({ title, steps }) => {
    return (
        <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 mt-8">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-3">
                <i className="fa-solid fa-circle-info"></i>
                {title}
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-400 pl-2">
                {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
};

export default InstructionsCard;
