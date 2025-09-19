import React, { useMemo, useEffect, useState } from 'react';
import Card from './Card';
import { FamilyMember } from '../../types';
import { getGeneration } from '../../lib/familyCalculations';
import { GENERATIONS } from '../../constants';

interface GenerationsCardProps {
    family: FamilyMember[];
}

const GenerationsCard: React.FC<GenerationsCardProps> = ({ family }) => {
    const [generationData, setGenerationData] = useState<any[]>([]);

    useEffect(() => {
        const now = Date.now();
        const data = GENERATIONS.map(gen => {
            const members = family.filter(m => getGeneration(m.dobISO)?.name === gen.name);
            const totalAge = members.reduce((sum, m) => sum + (now - new Date(m.dobISO).getTime()), 0);
            const avgAge = members.length > 0 ? totalAge / members.length / (1000 * 60 * 60 * 24 * 365.25) : 0;
            return {
                ...gen,
                count: members.length,
                members: members.map(m => m.name),
                avgAge: avgAge,
            };
        }).filter(g => g.count > 0);
        setGenerationData(data);
    }, [family]);

    const maxCount = useMemo(() => Math.max(...generationData.map(g => g.count), 0), [generationData]);

    return (
        <Card title="Generations">
            {generationData.length > 0 ? (
                <div className="space-y-4">
                    {generationData.map(gen => (
                        <div key={gen.name} className="group">
                            <div className="flex justify-between items-center mb-1 text-sm">
                                <span className="font-bold text-gray-300">{gen.name}</span>
                                <span className="text-gray-300">{gen.count} member{gen.count > 1 ? 's' : ''} (Avg: {gen.avgAge.toFixed(1)} yrs)</span>
                            </div>
                            <div className="relative bg-gray-700 rounded-full h-6 overflow-hidden">
                                <div
                                    className={`${gen.color} h-full rounded-full transition-all duration-500`}
                                    style={{ width: `${(gen.count / maxCount) * 100}%` }}
                                ></div>
                            </div>
                            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity mt-1 text-xs text-center text-gray-300 bg-gray-900 p-1 rounded">
                                {gen.members.join(', ')}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Add family members to see generation data.</p>
            )}
        </Card>
    );
};

export default GenerationsCard;