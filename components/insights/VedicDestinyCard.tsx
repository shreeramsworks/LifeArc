import React, { useMemo } from 'react';
import { calculateMoolank, getVedicNumberData } from '../../lib/vedicInsights';
import Card from '../family/Card';
import ManualSection from './common/ManualSection';

interface VedicDestinyCardProps {
    dobString: string;
}

const vedicDestinyManual = [
    { heading: "What it is", content: <p>Your Moolank or "Destiny Number" (1-9), the core of your identity in Vedic numerology, derived from your birth day.</p> },
    { heading: "Why it matters", content: <p>It reveals your fundamental nature, ruling planet, and the primary energies influencing your life's journey.</p> },
    { heading: "How we calculate it", content:
        <div>
            <p>The digits of your birth **day** are summed until a single digit is reached.</p>
            <p className="text-xs font-mono">Born on the 28th → 2 + 8 = 10 → 1 + 0 = 1. Your Moolank is 1.</p>
        </div>
    },
    { heading: "How to read it", content: <p>The card shows your Moolank, its planetary ruler (e.g., 1 is ruled by the Sun), and your core personality traits.</p> },
    { heading: "Disclaimer", content: <p>Vedic Numerology is a spiritual tool for self-reflection, not a scientific system.</p> }
];

const VedicDestinyCard: React.FC<VedicDestinyCardProps> = ({ dobString }) => {
    const moolank = useMemo(() => calculateMoolank(dobString), [dobString]);
    const numberData = useMemo(() => getVedicNumberData(moolank), [moolank]);

    if (!numberData) return null;

    return (
        <Card title="Vedic Destiny Number">
            <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-amber-500/30 rounded-lg shadow-inner">
                    <p className="text-lg text-gray-300">Your Moolank (Destiny Number) is</p>
                    <p className="text-7xl font-extrabold text-amber-400 my-4" style={{ textShadow: '0 0 15px rgba(251, 191, 36, 0.5)' }}>{moolank}</p>
                    <div className="space-y-1">
                        <p className="font-semibold text-gray-300 text-lg">Ruled by <span className="font-bold text-amber-300">{numberData.planet}</span></p>
                        <p className="text-gray-300 text-md">"{numberData.traits}"</p>
                    </div>
                </div>
                <ManualSection sections={vedicDestinyManual} />
            </div>
        </Card>
    );
};

export default VedicDestinyCard;