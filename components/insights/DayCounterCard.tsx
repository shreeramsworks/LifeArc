import React, { useState, useEffect, useMemo } from 'react';
import { getNextPrimeBirthday } from '../../lib/insights';
import Card from '../family/Card';
import ManualSection from './common/ManualSection';

interface DayCounterCardProps {
    dob: Date;
    daysSinceBirth: number;
}

const StatBox: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-2xl font-bold text-blue-400">{value}</p>
    </div>
);

const Confetti: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {[...Array(100)].map((_, i) => {
            const style = {
                left: `${Math.random() * 100}%`,
                animation: `fall ${Math.random() * 2 + 3}s linear ${Math.random() * 5}s infinite`,
                background: `hsl(${Math.random() * 360}, 70%, 50%)`,
            };
            return <div key={i} className="confetti-piece" style={style}></div>;
        })}
        <style>{`
            @keyframes fall {
                to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
            .confetti-piece {
                position: absolute;
                top: -10px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                opacity: 1;
            }
        `}</style>
    </div>
);

const dayCounterManual = [
    { heading: "What it is", content: <p>Live totals of days, weeks, months, hours and seconds you’ve been alive, plus milestone badges.</p> },
    { heading: "Why it matters", content: <p>Visual countdowns spark motivation and celebrate overlooked achievements (e.g., 10,000th day).</p> },
    { heading: "How we calculate it", content:
        <ul className="list-disc list-inside pl-2">
            <li>Live timer uses UTC-based Julian days—no DST errors.</li>
            <li>Months use average 30.436875 days.</li>
            <li>Detects 1,000th, 5,000th, 10,000th day and next prime-number birthday.</li>
        </ul>
    },
    { heading: "How to read it", content: <p>Big numbers for instant awe. A green badge and confetti appear when you hit a milestone.</p> },
    { heading: "Example", content: <p>As of 3 Sep 2025 you have lived 12,935 days (for DOB 1990-05-15).</p> },
    { heading: "Disclaimer", content: <p>Milestones are symbolic; celebrate responsibly.</p> }
];

const DayCounterCard: React.FC<DayCounterCardProps> = ({ dob, daysSinceBirth }) => {
    const [now, setNow] = useState(new Date());
    const [showConfetti, setShowConfetti] = useState(false);
    const [celebratedMilestones, setCelebratedMilestones] = useState<Set<string>>(new Set());

    useEffect(() => {
        const timerId = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const ageInYears = daysSinceBirth / 365.25;
    const nextPrimeBirthday = useMemo(() => getNextPrimeBirthday(ageInYears), [ageInYears]);

    const milestones = useMemo(() => [
        { value: 1000, label: '1,000th Day' },
        { value: 5000, label: '5,000th Day' },
        { value: 10000, label: '10,000th Day' },
        { value: 15000, label: '15,000th Day' },
        { value: 20000, label: '20,000th Day' },
        { value: 25000, label: '25,000th Day' },
    ], []);

    const currentMilestone = useMemo(() => {
        const reached = milestones.filter(m => daysSinceBirth >= m.value);
        return reached.length > 0 ? reached[reached.length - 1] : null;
    }, [daysSinceBirth, milestones]);

    useEffect(() => {
        if (currentMilestone && !celebratedMilestones.has(currentMilestone.label)) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            setCelebratedMilestones(prev => new Set(prev).add(currentMilestone.label));
            return () => clearTimeout(timer);
        }
    }, [currentMilestone, celebratedMilestones]);


    const totalSeconds = (now.getTime() - dob.getTime()) / 1000;
    const totalMinutes = totalSeconds / 60;
    const totalHours = totalMinutes / 60;
    const totalWeeks = daysSinceBirth / 7;
    const totalMonths = daysSinceBirth / 30.436875; // Average month length

    const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
    const weekFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });
    
    return (
        <Card title="Lifetime Day Counter">
            {showConfetti && <Confetti />}
            <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <StatBox label="Total Days" value={formatter.format(daysSinceBirth)} />
                    <StatBox label="Total Weeks" value={weekFormatter.format(totalWeeks)} />
                    <StatBox label="Total Months" value={formatter.format(totalMonths)} />
                    <StatBox label="Total Hours" value={formatter.format(totalHours)} />
                    <StatBox label="Total Minutes" value={formatter.format(totalMinutes)} />
                    <StatBox label="Total Seconds" value={formatter.format(totalSeconds)} />
                </div>

                <div className="text-center p-4 bg-gray-900 border border-gray-700 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Upcoming Milestones</h3>
                    <div className="text-blue-400">
                        {nextPrimeBirthday && <p>Your next prime-numbered birthday is your <strong>{nextPrimeBirthday}th</strong>!</p>}
                        {milestones.find(m => m.value > daysSinceBirth) && 
                            <p>Your next major day milestone is your <strong>{milestones.find(m => m.value > daysSinceBirth)?.label}</strong>!</p>}
                    </div>
                </div>
                <ManualSection sections={dayCounterManual} />
            </div>
        </Card>
    );
};

export default DayCounterCard;