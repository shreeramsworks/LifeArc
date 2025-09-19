import React, { useState, useMemo } from 'react';
import Card from './Card';
import { FamilyMember } from '../../types';
import { calculateAgeDuration, formatDuration } from '../../lib/familyCalculations';

interface SiblingGapsCardProps {
    family: FamilyMember[];
}

const SiblingGapsCard: React.FC<SiblingGapsCardProps> = ({ family }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelectMember = (memberId: string) => {
        setSelectedIds(prev =>
            prev.includes(memberId)
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        );
    };

    const comparisonPairs = useMemo(() => {
        const selectedMembers = family.filter(m => selectedIds.includes(m.id));
        if (selectedMembers.length < 2) {
            return [];
        }

        const pairs: { nameA: string, nameB: string, gap: string }[] = [];
        for (let i = 0; i < selectedMembers.length; i++) {
            for (let j = i + 1; j < selectedMembers.length; j++) {
                const memberA = selectedMembers[i];
                const memberB = selectedMembers[j];

                const dateA = new Date(memberA.dobISO);
                const dateB = new Date(memberB.dobISO);
                
                const earlierDate = dateA < dateB ? dateA : dateB;
                const laterDate = dateA > dateB ? dateA : dateB;

                const duration = calculateAgeDuration(earlierDate.toISOString(), laterDate);
                pairs.push({
                    nameA: memberA.name,
                    nameB: memberB.name,
                    gap: formatDuration(duration)
                });
            }
        }
        return pairs;
    }, [selectedIds, family]);

    return (
        <Card title="Compare Member Ages">
            {family.length > 0 ? (
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-300 mb-2">Select 2 or more members to compare:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {family.map(member => (
                                <label key={member.id} className="flex items-center space-x-2 p-2 rounded-md bg-gray-900 border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(member.id)}
                                        onChange={() => handleSelectMember(member.id)}
                                        className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-300 truncate">{member.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {selectedIds.length >= 2 ? (
                        <div className="pt-4 border-t border-gray-700">
                             <h3 className="text-lg font-semibold text-gray-300 mb-2">Results:</h3>
                             {comparisonPairs.length > 0 ? (
                                <div className="space-y-2">
                                    {comparisonPairs.map((pair) => (
                                        <div key={`${pair.nameA}-${pair.nameB}`} className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg">
                                            <span className="font-semibold text-gray-300">{pair.nameA} &amp; {pair.nameB}</span>
                                            <span className="font-mono text-blue-400">{pair.gap}</span>
                                        </div>
                                    ))}
                                </div>
                             ) : (
                                <p className="text-center text-gray-500">Calculating...</p>
                             )}
                        </div>
                    ): (
                        <p className="text-center text-gray-400 pt-4">Please select at least two members to see results.</p>
                     )}
                </div>
            ) : (
                <p className="text-center text-gray-500">Add family members to start comparing ages.</p>
            )}
        </Card>
    );
};

export default SiblingGapsCard;