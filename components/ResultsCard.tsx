import React from 'react';
import { AgeData, AgeSystem, NextBirthdayData } from '../types';

interface ResultsCardProps {
    ageData: AgeData;
    ageSystem: AgeSystem;
    setAgeSystem: (system: AgeSystem) => void;
    locale: string;
    nextBirthdayData: NextBirthdayData;
}

const StatBox: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className }) => (
    <div className={`bg-gray-900 border border-gray-700 p-4 rounded-lg text-center ${className}`}>
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-2xl font-bold text-blue-400">{value}</p>
    </div>
);

const ResultsCard: React.FC<ResultsCardProps> = ({ ageData, ageSystem, setAgeSystem, locale, nextBirthdayData }) => {

    const numberFormatter = new Intl.NumberFormat(locale);

    const renderWesternAge = () => (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            <StatBox label="Years" value={numberFormatter.format(ageData.westernAge.years)} />
            <StatBox label="Months" value={numberFormatter.format(ageData.westernAge.months)} />
            <StatBox label="Days" value={numberFormatter.format(ageData.westernAge.days)} />
            <StatBox label="Hours" value={numberFormatter.format(ageData.westernAge.hours)} />
            <StatBox label="Minutes" value={numberFormatter.format(ageData.westernAge.minutes)} />
            <StatBox label="Seconds" value={numberFormatter.format(ageData.westernAge.seconds)} />
        </div>
    );
    
    const renderEastAsianAge = () => (
        <div className="text-center p-6 bg-gray-900 border border-gray-700 rounded-lg">
            <p className="text-lg text-gray-300">In the East Asian system, your age is</p>
            <p className="text-6xl font-extrabold text-blue-400 my-2">{numberFormatter.format(ageData.eastAsianAge)}</p>
            <p className="text-sm text-gray-300">This system counts the year of birth as year one.</p>
        </div>
    );

    return (
        <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 space-y-6">
            <div className="flex justify-center bg-gray-900 p-1 rounded-lg">
                {(Object.values(AgeSystem)).map(system => (
                    <button
                        key={system}
                        onClick={() => setAgeSystem(system)}
                        className={`w-full py-2 px-4 text-sm font-semibold rounded-md transition-colors ${
                            ageSystem === system
                                ? 'bg-blue-600 text-white shadow'
                                : 'text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        {system} Age
                    </button>
                ))}
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2 text-center">Your Precise Age</h3>
                {ageSystem === AgeSystem.WESTERN ? renderWesternAge() : renderEastAsianAge()}
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
                <StatBox label="Total Days" value={numberFormatter.format(ageData.totalDays)} />
                <StatBox label="Total Hours" value={numberFormatter.format(ageData.totalHours)} />
                <StatBox label="Total Minutes" value={numberFormatter.format(ageData.totalMinutes)} />
                <StatBox label="Total Seconds" value={numberFormatter.format(ageData.totalSeconds)} />
            </div>

             <div className="pt-4 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-gray-300 mb-2 text-center">Next Birthday Countdown</h3>
                <p className="text-center text-gray-300 text-sm mb-4">
                    {nextBirthdayData.date.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatBox label="Days" value={numberFormatter.format(nextBirthdayData.countdown.days)} />
                    <StatBox label="Hours" value={numberFormatter.format(nextBirthdayData.countdown.hours)} />
                    <StatBox label="Minutes" value={numberFormatter.format(nextBirthdayData.countdown.minutes)} />
                    <StatBox label="Seconds" value={numberFormatter.format(nextBirthdayData.countdown.seconds)} />
                </div>
            </div>
        </div>
    );
};

export default ResultsCard;