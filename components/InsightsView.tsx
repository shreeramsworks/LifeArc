import React, { useState, useMemo } from 'react';
import BiorhythmCard from './insights/BiorhythmCard';
import LifePathCard from './insights/LifePathCard';
import LuckyDayCard from './insights/LuckyDayCard';
import HistoricalEventsCard from './insights/HistoricalEventsCard';
import DayCounterCard from './insights/DayCounterCard';
import RetirementCard from './insights/RetirementCard';
import IntuitionCard from './insights/IntuitionCard';
import AdSenseBanner from './AdSenseBanner';

import { getDaysSinceBirth } from '../lib/insights';

type InsightCardId = 'biorhythm' | 'lifePath' | 'luckyDay' | 'events' | 'dayCounter' | 'retirement' | 'intuition';

const INSIGHT_CARDS: { id: InsightCardId; label: string }[] = [
    { id: 'biorhythm', label: 'Biorhythm' },
    { id: 'lifePath', label: 'Life-Path Number' },
    { id: 'luckyDay', label: 'Lucky / Caution Days' },
    { id: 'events', label: 'Age @ Historical Events' },
    { id: 'dayCounter', label: 'Lifetime Day Counter' },
    { id: 'retirement', label: 'Retirement Countdown' },
    { id: 'intuition', label: 'Intuition Cycle' },
];

const InsightsView: React.FC = () => {
    const [dob, setDob] = useState<Date | null>(null);
    const [dobString, setDobString] = useState('');
    const [activeCardId, setActiveCardId] = useState<InsightCardId>('biorhythm');
    
    const daysSinceBirth = useMemo(() => {
        if (!dob) return 0;
        // This function uses Julian Day Numbers for precision.
        return getDaysSinceBirth(dob);
    }, [dob]);
    
    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDobString = e.target.value;
        setDobString(newDobString);
        if (newDobString) {
            const newDob = new Date(newDobString + 'T00:00:00');
            // Check if it's a valid date
            if (!isNaN(newDob.getTime())) {
                setDob(newDob);
            } else {
                setDob(null);
            }
        } else {
            setDob(null);
        }
    };
    
    const renderActiveCard = () => {
        if (!dob) {
            return (
                <div className="text-center p-10 bg-gray-800 rounded-lg border border-gray-700">
                    <p className="text-lg text-gray-400">Please enter your date of birth to begin exploring your Chrono Insights.</p>
                </div>
            );
        }
        
        switch(activeCardId) {
            case 'biorhythm': return <BiorhythmCard daysSinceBirth={daysSinceBirth} />;
            case 'lifePath': return <LifePathCard dobString={dobString} />;
            case 'luckyDay': return <LuckyDayCard dobString={dobString} daysSinceBirth={daysSinceBirth} />;
            case 'events': return <HistoricalEventsCard dob={dob} />;
            case 'dayCounter': return <DayCounterCard dob={dob} daysSinceBirth={daysSinceBirth} />;
            case 'retirement': return <RetirementCard dob={dob} />;
            case 'intuition': return <IntuitionCard daysSinceBirth={daysSinceBirth} />;
            default: return null;
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl mx-auto space-y-8">
                <header className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white">
                        Chrono Insights
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">
                        Uncover the hidden patterns and milestones of your life's timeline.
                    </p>
                </header>
                
                <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700">
                     <label htmlFor="insight-dob" className="block text-sm font-medium text-gray-300 mb-1">
                        Enter Your Date of Birth
                    </label>
                    <input
                        type="date"
                        id="insight-dob"
                        value={dobString}
                        onChange={handleDobChange}
                        className="w-full p-3 bg-gray-900 border border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <AdSenseBanner />

                <aside id="insightNav">
                    <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Insight Cards">
                        {INSIGHT_CARDS.map(card => (
                            <button
                                key={card.id}
                                onClick={() => setActiveCardId(card.id)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeCardId === card.id ? 'bg-blue-600 text-white shadow' : 'text-gray-300 bg-gray-700 hover:bg-gray-600'}`}
                                role="tab"
                                aria-selected={activeCardId === card.id}
                            >
                                {card.label}
                            </button>
                        ))}
                    </div>
                </aside>

                <section id="insightCard" role="region" aria-live="polite">
                    {renderActiveCard()}
                </section>
                
            </main>
        </div>
    );
};

export default InsightsView;