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
        <p className="text-sm text-gray-400">{label}</p>
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
            <p className="text-sm text-gray-500 max-w-md mx-auto">This system starts with 1 at birth, and everyone gains a year on January 1st. It's a cultural method of counting age.</p>
        </div>
    );

    return (
        <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 space-y-6">
            <div>
                <div className="flex justify-center mb-4 bg-gray-900 p-1 rounded-lg border border-gray-700">
                    <button 
                        onClick={() => setAgeSystem(AgeSystem.WESTERN)}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${ageSystem === AgeSystem.WESTERN ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:bg-gray-700'}`}>
                        Western Age
                    </button>
                    <button 
                        onClick={() => setAgeSystem(AgeSystem.EAST_ASIAN)}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${ageSystem === AgeSystem.EAST_ASIAN ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:bg-gray-700'}`}>
                        East Asian Age
                    </button>
                </div>
                {ageSystem === AgeSystem.WESTERN ? renderWesternAge() : renderEastAsianAge()}
            </div>
            
            <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-3 text-center">Age in Other Units</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <StatBox label="Total Days" value={numberFormatter.format(ageData.totalDays)} />
                    <StatBox label="Total Hours" value={numberFormatter.format(ageData.totalHours)} />
                    <StatBox label="Total Minutes" value={numberFormatter.format(ageData.totalMinutes)} />
                    <StatBox label="Total Seconds" value={numberFormatter.format(ageData.totalSeconds)} />
                </div>
            </div>

             <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-3 text-center">Next Birthday Countdown</h3>
                <div className="text-center bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                     <p className="text-gray-300 mb-2">
                       Your next birthday is on <span className="font-bold text-blue-300">{new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(nextBirthdayData.date)}</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                         <StatBox label="Days" value={numberFormatter.format(nextBirthdayData.countdown.days)} className="bg-gray-800" />
                         <StatBox label="Hours" value={numberFormatter.format(nextBirthdayData.countdown.hours)} className="bg-gray-800" />
                         <StatBox label="Minutes" value={numberFormatter.format(nextBirthdayData.countdown.minutes)} className="bg-gray-800" />
                         <StatBox label="Seconds" value={numberFormatter.format(nextBirthdayData.countdown.seconds)} className="bg-gray-800" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsCard;