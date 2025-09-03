import React, { useMemo } from 'react';
import { calculateBiorhythms } from '../../lib/insights';
import Card from '../family/Card';
import ManualSection from './common/ManualSection';

interface BiorhythmCardProps {
    daysSinceBirth: number;
}

const BiorhythmChart: React.FC<{ daysSinceBirth: number }> = ({ daysSinceBirth }) => {
    const width = 500;
    const height = 200;
    const range = 31; // show +/- 31 days from today
    
    const generatePath = (period: number): string => {
        let d = '';
        for (let i = -range; i <= range; i++) {
            const x = (i + range) / (2 * range) * width;
            const y_val = Math.sin(2 * Math.PI * (daysSinceBirth + i) / period);
            const y = (1 - y_val) * (height / 2);
            if (i === -range) {
                d += `M ${x},${y}`;
            } else {
                d += ` L ${x},${y}`;
            }
        }
        return d;
    };

    const physicalPath = generatePath(23);
    const emotionalPath = generatePath(28);
    const intellectualPath = generatePath(33);

    const todayX = width / 2;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" aria-label="Biorhythm chart">
            {/* Center line */}
            <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#4A5568" strokeWidth="1"/>
            
            {/* Today line */}
            <line x1={todayX} y1="0" x2={todayX} y2={height} stroke="#A0AEC0" strokeWidth="1" strokeDasharray="4"/>
            <text x={todayX} y="12" fill="#A0AEC0" textAnchor="middle" fontSize="10">Today</text>

            {/* Paths */}
            <path d={physicalPath} stroke="#63B3ED" strokeWidth="2" fill="none" aria-label="Physical cycle (23 days)"/>
            <path d={emotionalPath} stroke="#48BB78" strokeWidth="2" fill="none" aria-label="Emotional cycle (28 days)"/>
            <path d={intellectualPath} stroke="#F6E05E" strokeWidth="2" fill="none" aria-label="Intellectual cycle (33 days)"/>
        </svg>
    );
};

const biorhythmManual = [
    { heading: "What it is", content: <p>Three colored sine waves that claim to map your physical, emotional and intellectual energy each day.</p> },
    { heading: "Why it matters", content: <p>Scheduling workouts, exams or creative work on high-energy days can boost performance and motivation.</p> },
    { heading: "How we calculate it", content: 
        <div>
            <p>Count the exact days you have lived (leap-year safe).</p>
            <p>Feed that number into three cycles:</p>
            <ul className="list-disc list-inside pl-2 text-xs font-mono">
                <li>Physical 23 days: P = sin(2π·d / 23)</li>
                <li>Emotional 28 days: E = sin(2π·d / 28)</li>
                <li>Intellectual 33 days: I = sin(2π·d / 33)</li>
            </ul>
            <p>Plot ±31 days around today on one graph.</p>
        </div>
    },
    { heading: "How to read it (Graph Guide)", content: 
        <ul className="list-disc list-inside pl-2">
            <li>Vertical scale runs from +1 (peak) to −1 (trough).</li>
            <li>Above 0 → higher energy; below 0 → lower energy.</li>
            <li>Peaks (≈ +1) = best days for tasks that match that cycle.</li>
            <li>Troughs (≈ −1) = schedule rest or low-stakes activities.</li>
            <li>Critical days (curve crosses 0) = add extra caution.</li>
        </ul>
    },
    { heading: "Example", content: <p>Physical +0.87 on 7 Sep 2025 → great day for a long run.</p> },
    { heading: "Disclaimer", content: <p>Biorhythms lack scientific proof; use them as a fun planner, not medical advice.</p> }
];

const BiorhythmCard: React.FC<BiorhythmCardProps> = ({ daysSinceBirth }) => {
    const currentValues = useMemo(() => calculateBiorhythms(daysSinceBirth), [daysSinceBirth]);
    
    const formatPercent = (val: number) => `${((val + 1) * 50).toFixed(1)}%`;

    return (
        <Card title="Biorhythm Cycles">
             <div className="space-y-4">
                <BiorhythmChart daysSinceBirth={daysSinceBirth} />
                <div className="flex justify-around text-center text-sm pt-2 border-t border-gray-700">
                    <div>
                        <span className="font-bold text-blue-400">Physical (23d)</span>
                        <p className="text-gray-300">{formatPercent(currentValues.physical)}</p>
                    </div>
                     <div>
                        <span className="font-bold text-green-400">Emotional (28d)</span>
                        <p className="text-gray-300">{formatPercent(currentValues.emotional)}</p>
                    </div>
                     <div>
                        <span className="font-bold text-yellow-400">Intellectual (33d)</span>
                        <p className="text-gray-300">{formatPercent(currentValues.intellectual)}</p>
                    </div>
                </div>
                <ManualSection sections={biorhythmManual} />
            </div>
        </Card>
    );
};

export default BiorhythmCard;