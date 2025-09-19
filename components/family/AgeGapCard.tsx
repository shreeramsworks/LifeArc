import React, { useState, useEffect, useMemo } from 'react';
import Card from './Card';
import { FamilyMember } from '../../types';
import { calculateAgeDuration, formatDuration } from '../../lib/familyCalculations';

interface AgeGapCardProps {
    family: FamilyMember[];
}

const AgeGapCard: React.FC<AgeGapCardProps> = ({ family }) => {
    const [personA, setPersonA] = useState('');
    const [personB, setPersonB] = useState('');
    const [gap, setGap] = useState<string | null>(null);

    const familyOptions = useMemo(() => {
        return family.map(m => ({ id: m.id, name: m.name, dobISO: m.dobISO }));
    }, [family]);

    useEffect(() => {
        if (familyOptions.length > 0) {
            const familyIds = familyOptions.map(f => f.id);
            // Preserve selection if possible, otherwise default
            setPersonA(currentA => familyIds.includes(currentA) ? currentA : familyIds[0]);
            setPersonB(currentB => familyIds.includes(currentB) ? currentB : (familyIds.length > 1 ? familyIds[1] : familyIds[0]));
        } else {
            setPersonA('');
            setPersonB('');
            setGap(null);
        }
    }, [familyOptions]);


    const handleCalculate = () => {
        const memberA = familyOptions.find(m => m.id === personA);
        const memberB = familyOptions.find(m => m.id === personB);

        if (memberA && memberB) {
            const dateA = new Date(memberA.dobISO);
            const dateB = new Date(memberB.dobISO);
            
            const earlierDate = dateA < dateB ? dateA : dateB;
            const laterDate = dateA > dateB ? dateA : dateB;

            const duration = calculateAgeDuration(earlierDate.toISOString(), laterDate);
            setGap(formatDuration(duration));
        }
    };

    return (
        <Card title="Age Gap">
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <select value={personA} onChange={e => setPersonA(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md" disabled={familyOptions.length === 0}>
                        {familyOptions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <select value={personB} onChange={e => setPersonB(e.target.value)} className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md" disabled={familyOptions.length === 0}>
                        {familyOptions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
                <button onClick={handleCalculate} disabled={family.length < 2} className="w-full bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed" style={{ minHeight: '44px' }}>
                    Show Gap
                </button>
                {gap && (
                    <div className="text-center p-4 bg-gray-900 border border-gray-700 rounded-lg">
                        <p className="font-bold text-lg text-blue-400">{gap}</p>
                    </div>
                )}
                 {family.length < 2 && (
                    <p className="text-center text-gray-300 pt-2">Add at least two family members to calculate gaps.</p>
                )}
            </div>
        </Card>
    );
};

export default AgeGapCard;