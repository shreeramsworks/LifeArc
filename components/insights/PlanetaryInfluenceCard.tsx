import React, { useMemo } from 'react';
import { getRulingPlanet } from '../../lib/vedicInsights';
import Card from '../family/Card';
import ManualSection from './common/ManualSection';

interface PlanetaryInfluenceCardProps {
    dob: Date;
}

const planetaryManual = [
    { heading: "What it is", content: <p>Reveals the ruling planet (Vara) for the day you were born and for today, based on the ancient Hindu 7-day week.</p> },
    { heading: "Why it matters", content: <p>Your birth day ruler imprints a core energy on your personality. Aligning with the current day's planetary energy can enhance your activities.</p> },
    { heading: "How we calculate it", content: <p>Each day of the week has a planetary ruler: Sunday (Sun), Monday (Moon), Tuesday (Mars), Wednesday (Mercury), Thursday (Jupiter), Friday (Venus), Saturday (Saturn).</p> },
    { heading: "How to read it", content: <p>The card shows both your birth ruler and today's ruler, along with their core traits. Use this to understand your innate drive and the theme of the current day.</p> },
    { heading: "Example", content: <p>Born on Tuesday (Mars) gives you drive. Acting on a Friday (Venus) is good for creative or social pursuits.</p> },
    { heading: "Disclaimer", content: <p>This is a foundational concept in Vedic astrology, used for understanding energetic influences, not predicting events.</p> }
];

const PlanetaryInfluenceCard: React.FC<PlanetaryInfluenceCardProps> = ({ dob }) => {
    const today = new Date();

    const birthRuler = useMemo(() => getRulingPlanet(dob.getDay()), [dob]);
    const todayRuler = useMemo(() => getRulingPlanet(today.getDay()), [today]);

    return (
        <Card title="Planetary Influences">
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg text-center">
                        <h3 className="font-semibold text-gray-300">Your Birth Day Ruler</h3>
                        <p className={`text-2xl font-bold ${birthRuler.color}`}>{birthRuler.planet}</p>
                        <p className="text-xs text-gray-300">({birthRuler.day})</p>
                        <p className="text-sm text-gray-200 mt-1">"{birthRuler.traits}"</p>
                    </div>
                    <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg text-center">
                        <h3 className="font-semibold text-gray-300">Today's Ruler</h3>
                        <p className={`text-2xl font-bold ${todayRuler.color}`}>{todayRuler.planet}</p>
                         <p className="text-xs text-gray-300">({todayRuler.day})</p>
                        <p className="text-sm text-gray-200 mt-1">"{todayRuler.traits}"</p>
                    </div>
                </div>
                <ManualSection sections={planetaryManual} />
            </div>
        </Card>
    );
};

export default PlanetaryInfluenceCard;