import React from 'react';
import { calculateBiorhythms } from '../../lib/insights';
import Card from '../family/Card';
import CalendarGrid from './common/CalendarGrid';
import ManualSection from './common/ManualSection';

interface IntuitionCardProps {
    daysSinceBirth: number;
}

const intuitionManual = [
    { heading: "What it is", content: <p>Heat-map of days when gut feelings may be strongest.</p> },
    { heading: "Why it matters", content: <p>Ideal for brainstorming, negotiations, or artistic work when intuition is high.</p> },
    { heading: "How we calculate it", content: 
        <div>
            <p>Intuition wave: sin(2π·days-lived / 38).</p>
            <p>“High Insight” day when Intuition &gt; 0.7 and Emotional &gt; 0.7.</p>
        </div>
    },
    { heading: "How to read it", content: <p>Bright purple square = trust your instincts; blue = normal.</p> },
    { heading: "Example", content: <p>21 Sep 2025 = High Insight (for DOB 1990-05-15).</p> },
    { heading: "Disclaimer", content: <p>Listen to intuition but confirm with facts.</p> }
];


const IntuitionCard: React.FC<IntuitionCardProps> = ({ daysSinceBirth }) => {
    const today = new Date();
    
    const getDayStyle = (day: number, currentMonth: number, currentYear: number): string => {
        const date = new Date(currentYear, currentMonth, day);
        const diffInDays = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const dayNumber = daysSinceBirth + diffInDays;
        
        const { intuition, emotional } = calculateBiorhythms(dayNumber);

        if (intuition > 0.7 && emotional > 0.7) {
            return 'bg-purple-500/40 text-purple-200 border border-purple-400/50'; // High Insight
        }
        
        const intensity = (intuition + 1) / 2; // Normalize to 0-1
        return `bg-blue-500/20 text-blue-200 opacity-${Math.round(intensity * 50 + 50)}`;
    };

    const getDayTooltip = (day: number, currentMonth: number, currentYear: number): string | null => {
        const date = new Date(currentYear, currentMonth, day);
        const diffInDays = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const dayNumber = daysSinceBirth + diffInDays;
        const { intuition, emotional } = calculateBiorhythms(dayNumber);
         if (intuition > 0.7 && emotional > 0.7) {
            return "High insight – trust your gut!";
        }
        return `Intuition: ${((intuition + 1) * 50).toFixed(0)}%`;
    };


    return (
        <Card title="Intuition Cycle Predictor">
            <div className="space-y-4">
                 <CalendarGrid getDayStyle={getDayStyle} getDayTooltip={getDayTooltip} />
                 <div className="flex justify-center flex-wrap gap-4 text-xs pt-2 border-t border-gray-700">
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500/50"></div>Intuition Cycle</span>
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500/80"></div>High Insight Day</span>
                 </div>
                 <ManualSection sections={intuitionManual} />
            </div>
        </Card>
    );
};

export default IntuitionCard;