import React, { useMemo } from 'react';
import { calculateLifePath, getPersonalDay } from '../../lib/insights';
import Card from '../family/Card';
import CalendarGrid from './common/CalendarGrid';
import ManualSection from './common/ManualSection';

interface LuckyDayCardProps {
    dobString: string;
    daysSinceBirth: number;
}

const luckyDayManual = [
    { heading: "What it is", content: <p>A calendar that colors each day green (lucky), grey (neutral) or orange (caution).</p> },
    { heading: "Why it matters", content: <p>Helps you time key meetings, surgeries or launches for confidence and foresight.</p> },
    { heading: "How we calculate it", content: <p>Personal-day number = (life-path + days-lived) mod 9. Then: 1-3 → Lucky, 4-6 → Neutral, 7-9 → Caution.</p> },
    { heading: "How to read it", content:
        <ul className="list-disc list-inside pl-2">
            <li>Green dots = high synchronicity—aim big.</li>
            <li>Orange dots = double-check plans, allow buffer time.</li>
            <li>Grey = everyday routine.</li>
        </ul>
    },
    { heading: "Example", content: <p>13 Sep 2025 = green; 17 Sep 2025 = orange.</p> },
    { heading: "Disclaimer", content: <p>Colours are guidelines, not guarantees.</p> }
];

const LuckyDayCard: React.FC<LuckyDayCardProps> = ({ dobString, daysSinceBirth }) => {
    const lifePath = useMemo(() => calculateLifePath(dobString), [dobString]);
    const today = new Date();
    
    const getDayStyle = (day: number, currentMonth: number, currentYear: number) => {
        const date = new Date(currentYear, currentMonth, day);
        const diffInDays = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const dayNumber = getPersonalDay(lifePath, daysSinceBirth + diffInDays);
        
        if (dayNumber >= 1 && dayNumber <= 3) return 'bg-green-500/30 text-green-300'; // Lucky
        if (dayNumber >= 4 && dayNumber <= 6) return 'bg-gray-700 text-gray-300'; // Neutral
        if (dayNumber >= 7 && dayNumber <= 9) return 'bg-orange-500/30 text-orange-300'; // Caution
        return 'bg-gray-800';
    };

    return (
        <Card title="Lucky / Caution Day Calendar">
            <div className="space-y-4">
                 <CalendarGrid getDayStyle={getDayStyle} />
                 <div className="flex justify-center flex-wrap gap-4 text-xs pt-2 border-t border-gray-700">
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500/80"></div>Lucky (1-3)</span>
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-600"></div>Neutral (4-6)</span>
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500/80"></div>Caution (7-9)</span>
                 </div>
                 <ManualSection sections={luckyDayManual} />
            </div>
        </Card>
    );
};

export default LuckyDayCard;