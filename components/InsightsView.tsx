import React, { useState, useMemo } from 'react';
import AdSenseBanner from './AdSenseBanner';
import { getDaysSinceBirth } from '../lib/insights';
import InstructionsCard from './InstructionsCard';

// Import New Vedic Insight Cards
import VedicDestinyCard from './insights/VedicDestinyCard';
import PlanetaryInfluenceCard from './insights/PlanetaryInfluenceCard';
import VedicNumerologyCalendarCard from './insights/VedicNumerologyCalendarCard';

// Import Modern Insight Cards that are being kept and restyled
import HistoricalEventsCard from './insights/HistoricalEventsCard';
import DayCounterCard from './insights/DayCounterCard';
import RetirementCard from './insights/RetirementCard';

const InsightsView: React.FC = () => {
    const [dob, setDob] = useState<Date | null>(null);
    const [dobString, setDobString] = useState('');
    
    const daysSinceBirth = useMemo(() => {
        if (!dob) return 0;
        return getDaysSinceBirth(dob);
    }, [dob]);
    
    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDobString = e.target.value;
        setDobString(newDobString);
        if (newDobString) {
            const newDob = new Date(newDobString + 'T00:00:00');
            if (!isNaN(newDob.getTime())) {
                setDob(newDob);
            } else {
                setDob(null);
            }
        } else {
            setDob(null);
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <main className="space-y-8">
                <header className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                       Private Vedic Numerology &amp; Life Insights
                    </h1>
                    <p className="mt-2 text-lg text-gray-300 max-w-2xl mx-auto">
                        Get <strong>anonymous numerology readings</strong> and explore personal patterns with our <strong>private numerology calculator</strong>. This tool uses ancient Vedic principles and is 100% browser-based.
                    </p>
                </header>
                
                <div className="max-w-md mx-auto bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700">
                     <label htmlFor="insight-dob" className="block text-sm font-medium text-amber-300 mb-2 text-center">
                        Enter Your Date of Birth for a Private Reading
                    </label>
                    <input
                        type="date"
                        id="insight-dob"
                        value={dobString}
                        onChange={handleDobChange}
                        className="w-full p-3 bg-gray-900 border border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 text-lg"
                    />
                </div>

                <AdSenseBanner />

                {dob ? (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Vedic Insights Column */}
                            <div className="space-y-8">
                                <h2 className="text-2xl font-bold text-amber-400 text-center border-b-2 border-amber-500/30 pb-2">Ancient Vedic Insights</h2>
                                <VedicDestinyCard dobString={dobString} />
                                <PlanetaryInfluenceCard dob={dob} />
                                <VedicNumerologyCalendarCard dobString={dobString} />
                            </div>
                            
                            {/* Modern Life Insights Column */}
                            <div className="space-y-8">
                                <h2 className="text-2xl font-bold text-sky-400 text-center border-b-2 border-sky-500/30 pb-2">Modern Life Insights</h2>
                                <HistoricalEventsCard dob={dob} />
                                <DayCounterCard dob={dob} daysSinceBirth={daysSinceBirth} />
                                <RetirementCard dob={dob} />
                            </div>
                        </div>
                        <InstructionsCard
                            title="How to Use Your Private Numerology Dashboard"
                            steps={[
                                "Enter your birth date to generate an instant, <strong>anonymous numerology reading</strong>.",
                                "Your Moolank (Destiny Number) is calculated without storing any personal data, making this a true <strong>private numerology calculator</strong>.",
                                "Explore your birth day's planetary ruler and the Vedic Calendar to find your lucky days.",
                                "Use the modern tools to see your age at historical events or count down to retirement.",
                                "This is an <strong>anonymous numerology calculator</strong>; your birth date is never stored or sent to a server."
                            ]}
                        />
                    </>
                ) : (
                    <div className="text-center p-10 bg-gray-800 rounded-lg border border-gray-700 max-w-2xl mx-auto">
                        <i className="fa-solid fa-star-of-life text-5xl text-amber-400 mb-4"></i>
                        <p className="text-lg text-gray-300">Please enter your date of birth to reveal your Vedic & Life Insights dashboard.</p>
                        <p className="text-sm text-gray-400 mt-2">All calculations are performed in your browser. Your data is never stored or transmitted.</p>
                    </div>
                )}
                
            </main>
        </div>
    );
};

export default InsightsView;