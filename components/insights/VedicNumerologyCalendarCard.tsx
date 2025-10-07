import React, { useMemo } from 'react';
import { calculateMoolank, getVedicNumberData } from '../../lib/vedicInsights';
import Card from '../family/Card';
import CalendarGrid from './common/CalendarGrid';
import ManualSection from './common/ManualSection';

interface VedicNumerologyCalendarCardProps {
    dobString: string;
}

const vedicCalendarManual = [
    { heading: "What it is", content: <p>A calendar highlighting days that are Favorable, Unfavorable (Caution), or Neutral based on your Vedic Destiny Number (Moolank).</p> },
    { heading: "Why it matters", content: <p>Helps you schedule important events on days when the numeric vibrations are in harmony with your own, potentially increasing success.</p> },
    { heading: "How we calculate it", content:
        <div>
            <p>Each Moolank has a set of friendly and unfriendly numbers. The calendar day's number (e.g., the 23rd is 2+3=5) is compared to your Moolank's relationships.</p>
            <p className="text-xs font-mono">If your Moolank is 1 (Sun), numbers 1, 2, 3, 9 are favorable. The 1st, 10th, 19th, 28th of the month will be favorable days.</p>
        </div>
    },
    { heading: "How to read it", content:
        <ul className="list-disc list-inside pl-2">
            <li><span className="text-green-300">Green</span> dots = Favorable days for new beginnings, important meetings.</li>
            <li><span className="text-red-300">Red</span> dots = Caution days for avoiding conflict and major decisions.</li>
            <li><span className="text-gray-300">Grey</span> dots = Neutral days for routine tasks.</li>
        </ul>
    },
    { heading: "Disclaimer", content: <p>This is a tool for reflection. External factors also influence outcomes.</p> }
];

const VedicNumerologyCalendarCard: React.FC<VedicNumerologyCalendarCardProps> = ({ dobString }) => {
    const moolank = useMemo(() => calculateMoolank(dobString), [dobString]);
    const numberData = useMemo(() => getVedicNumberData(moolank), [moolank]);

    const getDayStyle = (day: number): string => {
        if (!numberData) return 'bg-gray-800';

        let dayNumber = day;
        while (dayNumber > 9) {
            dayNumber = String(dayNumber).split('').map(Number).reduce((acc, digit) => acc + digit, 0);
        }

        if (numberData.lucky.includes(dayNumber)) return 'bg-green-500/30 text-green-300';
        if (numberData.caution.includes(dayNumber)) return 'bg-red-500/30 text-red-300';
        return 'bg-gray-700 text-gray-300'; // Neutral
    };

    if (!numberData) return null;

    return (
        <Card title="Vedic Favorable Days">
            <div className="space-y-4">
                 {/* Fix: The `getDayStyle` prop for `CalendarGrid` expects a function that takes `day`, `month`, and `year`. The local `getDayStyle` function only needs the `day`. The updated code passes a compatible function that calls the local `getDayStyle` with the correct argument. */}
                 <CalendarGrid getDayStyle={(day, _month, _year) => getDayStyle(day)} />
                 <div className="flex justify-center flex-wrap gap-4 text-xs pt-2 border-t border-gray-700">
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500/80"></div>Favorable</span>
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-600"></div>Neutral</span>
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500/80"></div>Caution</span>
                 </div>
                 <ManualSection sections={vedicCalendarManual} />
            </div>
        </Card>
    );
};

export default VedicNumerologyCalendarCard;
