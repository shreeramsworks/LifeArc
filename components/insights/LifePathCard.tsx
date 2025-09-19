import React, { useMemo } from 'react';
import { calculateLifePath } from '../../lib/insights';
import Card from '../family/Card';
import ManualSection from './common/ManualSection';

interface LifePathCardProps {
    dobString: string;
}

const LIFE_PATH_KEYWORDS: { [key: number]: string } = {
    1: "Leader", 2: "Peacemaker", 3: "Communicator", 4: "Builder",
    5: "Adventurer", 6: "Nurturer", 7: "Seeker", 8: "Powerhouse", 9: "Humanitarian",
    11: "Visionary", 22: "Master Builder", 33: "Master Teacher"
};

const lifePathManual = [
    { heading: "What it is", content: <p>A single digit (or master number 11/22/33) said to summarise your personality in numerology.</p> },
    { heading: "Why it matters", content: <p>Provides a quick “strength lens” you can match to goals or habits.</p> },
    { heading: "How we calculate it", content:
        <div>
            <p>Add every digit of your birth date.</p>
            <p>Repeat until one digit remains; keep 11, 22, 33 intact.</p>
            <p className="text-xs font-mono">1990-05-15 → 1+9+9+0+0+5+1+5 = 30 → 3+0 = 3.</p>
        </div>
    },
    { heading: "How to read it", content: <p>Badges show the number and a keyword (e.g., 1 Leader, 9 Humanitarian). Master numbers = same theme at higher intensity.</p> },
    { heading: "Example", content: <p>Life-path 3 → “Creative & Social”.</p> },
    { heading: "Disclaimer", content: <p>Numerology is for reflection, not science.</p> }
];

const LifePathCard: React.FC<LifePathCardProps> = ({ dobString }) => {
    const lifePath = useMemo(() => calculateLifePath(dobString), [dobString]);
    
    return (
        <Card title="Life-Path Number">
            <div className="space-y-4">
                <div className="text-center p-6 bg-gray-900 border border-gray-700 rounded-lg">
                    <p className="text-lg text-gray-300">Your Life-Path Number is</p>
                    <p className="text-7xl font-extrabold text-blue-400 my-4">{lifePath}</p>
                    <p className="font-semibold text-gray-300 text-xl">"{LIFE_PATH_KEYWORDS[lifePath]}"</p>
                </div>
                <ManualSection sections={lifePathManual} />
            </div>
        </Card>
    );
};

export default LifePathCard;