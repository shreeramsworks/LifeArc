import React, { useState, useMemo } from 'react';
import { calculateRetirement } from '../../lib/insights';
import { retirementAges } from '../../data/countries';
import Card from '../family/Card';
import ManualSection from './common/ManualSection';

interface RetirementCardProps {
    dob: Date;
}

const CircularProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
    const sqSize = 120;
    const strokeWidth = 10;
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * percentage / 100;

    return (
        <svg width={sqSize} height={sqSize} viewBox={viewBox}>
            <circle
                className="stroke-current text-gray-700"
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                fill="none"
            />
            <circle
                className="stroke-current text-sky-500"
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${sqSize/2} ${sqSize/2})`}
                fill="none"
                style={{
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset,
                    strokeLinecap: 'round',
                    transition: 'stroke-dashoffset 0.5s ease-out'
                }}
            />
            <text
                className="fill-current text-white text-xl font-bold"
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle">
                {`${percentage.toFixed(1)}%`}
            </text>
        </svg>
    );
};

const retirementManual = [
    { heading: "What it is", content: <p>Clock and progress ring showing time left until your chosen retirement age.</p> },
    { heading: "Why it matters", content: <p>Turns vague future goals into concrete timelines, helping savings and health planning.</p> },
    { heading: "How we calculate it", content:
        <ul className="list-disc list-inside pl-2">
            <li>Default age from country (India 60, USA 67, etc.); slider 40-75 overrides.</li>
            <li>Target = DOB + retirementAge years.</li>
            <li>Business-day count skips Saturdays and Sundays.</li>
        </ul>
    },
    { heading: "How to read it", content: <p>Ring fills toward 100%; centre shows “24 y 8 m 12 d - 6,325 business days left”.</p> },
    { heading: "Example", content: <p>At age 60 target, you retire on 15 May 2050 (for DOB 1990-05-15).</p> },
    { heading: "Disclaimer", content: <p>This is a modern chronological tool. Consult a financial advisor for money decisions.</p> }
];


const RetirementCard: React.FC<RetirementCardProps> = ({ dob }) => {
    const detectedCountry = useMemo(() => {
        // A simple heuristic to guess the country for a default. In a real app, this could be more sophisticated.
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone.startsWith('America/')) return 'US';
        if (timezone.startsWith('Europe/')) return 'GB';
        if (timezone.startsWith('Asia/')) return 'JP';
        if (timezone.startsWith('Australia/')) return 'AU';
        return 'US';
    }, []);
    
    const [country, setCountry] = useState(detectedCountry);
    const [retirementAge, setRetirementAge] = useState(retirementAges[country] || 65);
    
    const data = useMemo(() => calculateRetirement(dob, retirementAge, country), [dob, retirementAge, country]);

    const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

    return (
        <Card title="Retirement Countdown">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <CircularProgress percentage={data.percentElapsed} />
                    <div className="text-center sm:text-left">
                        <p className="text-gray-300">Retirement Date (Age {retirementAge})</p>
                        <p className="text-2xl font-bold text-white">{data.retirementDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <span className="text-gray-300">Total Days Left:</span>
                            <span className="font-mono text-sky-400">{data.totalDaysLeft > 0 ? formatter.format(data.totalDaysLeft) : "🎉"}</span>
                            <span className="text-gray-300">Business Days Left:</span>
                            <span className="font-mono text-sky-400">{data.businessDaysLeft > 0 ? formatter.format(data.businessDaysLeft) : "🎉"}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="country-select" className="block text-sm font-medium text-gray-300">Country for default age:</label>
                        <select 
                            id="country-select"
                            value={country}
                            onChange={e => {
                                setCountry(e.target.value);
                                setRetirementAge(retirementAges[e.target.value] || 65);
                            }}
                            className="w-full mt-1 p-2 bg-gray-900 border border-gray-600 rounded-md"
                        >
                            {Object.entries(retirementAges).map(([code, age]) => (
                                <option key={code} value={code}>{code} (Age {age})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                         <label htmlFor="age-slider" className="block text-sm font-medium text-gray-300">Override Retirement Age: {retirementAge}</label>
                         <input
                            id="age-slider"
                            type="range"
                            min="40"
                            max="75"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(Number(e.target.value))}
                            className="w-full mt-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                        />
                    </div>
                </div>
                <ManualSection sections={retirementManual} />
            </div>
        </Card>
    );
};

export default RetirementCard;