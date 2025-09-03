import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import { calculateStats } from '../../lib/familyCalculations';
import { FamilyMember } from '../../types';

const StatPill: React.FC<{
    label: string;
    value: number;
    name?: string | null;
    tooltip: string;
    onHover: (tooltipText: string, e: React.MouseEvent) => void;
    onLeave: () => void;
}> = ({ label, value, name, tooltip, onHover, onLeave }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        const startValue = displayValue;
        const targetValue = value;

        if (Math.abs(targetValue - startValue) < 0.01) {
            setDisplayValue(targetValue);
            return;
        }

        const animationDuration = 500;
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const easeOutQuad = (t: number) => t * (2 - t);
            const t = Math.min(progress / animationDuration, 1);
            const easedT = easeOutQuad(t);
            const currentValue = startValue + (targetValue - startValue) * easedT;
            setDisplayValue(currentValue);

            if (progress < animationDuration) {
                animationFrameId.current = requestAnimationFrame(animate);
            } else {
                setDisplayValue(targetValue);
            }
        };

        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId.current);
    }, [value]);

    return (
        <div
            className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-center"
            onMouseEnter={(e) => onHover(tooltip, e)}
            onMouseMove={(e) => onHover(tooltip, e)}
            onMouseLeave={onLeave}
        >
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-blue-400">{displayValue.toFixed(1)} yrs</p>
            {name && <p className="text-xs text-gray-500 truncate">({name})</p>}
        </div>
    );
};

interface StatsState {
    mean: number;
    median: number;
    youngest: number;
    oldest: number;
    youngestMember: FamilyMember | null;
    oldestMember: FamilyMember | null;
}

interface TooltipState {
    visible: boolean;
    content: string;
    x: number;
    y: number;
}

interface StatisticsCardProps {
    now: Date;
    family: FamilyMember[];
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ now, family }) => {
    const [stats, setStats] = useState<StatsState>({ mean: 0, median: 0, youngest: 0, oldest: 0, youngestMember: null, oldestMember: null });
    const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, content: '', x: 0, y: 0 });

    useEffect(() => {
        const newStats = calculateStats(family, now);
        setStats(newStats);
    }, [family, now]);

    const tooltips = {
        mean: "Average age of everyone you’ve added. Good for spotting overall family life-stage.",
        median: "Middle age when all members are ordered from youngest to oldest. Less skewed by babies or centenarians.",
        youngest: "Current age of the youngest family member.",
        oldest: "Current age of the oldest family member."
    };
    
    const handlePillHover = (content: string, e: React.MouseEvent) => {
        setTooltip({
            visible: true,
            content,
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handlePillLeave = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
    };

    return (
        <Card title="Statistics">
            {tooltip.visible && (
                <div
                    style={{
                        position: 'fixed',
                        top: `${tooltip.y + 15}px`,
                        left: `${tooltip.x + 15}px`,
                        pointerEvents: 'none',
                        zIndex: 1000,
                    }}
                    className="max-w-[250px] p-2 text-xs text-center text-white bg-gray-900 border border-gray-600 rounded-md shadow-lg"
                >
                    {tooltip.content}
                </div>
            )}
            {family.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    <StatPill label="Mean Age" value={stats.mean} tooltip={tooltips.mean} onHover={handlePillHover} onLeave={handlePillLeave} />
                    {family.length > 1 && <StatPill label="Median Age" value={stats.median} tooltip={tooltips.median} onHover={handlePillHover} onLeave={handlePillLeave} />}
                    <StatPill label="Youngest" value={stats.youngest} name={stats.youngestMember?.name} tooltip={tooltips.youngest} onHover={handlePillHover} onLeave={handlePillLeave} />
                    <StatPill label="Oldest" value={stats.oldest} name={stats.oldestMember?.name} tooltip={tooltips.oldest} onHover={handlePillHover} onLeave={handlePillLeave} />
                </div>
            ) : (
                <p className="text-center text-gray-500">Add family members to see statistics.</p>
            )}
        </Card>
    );
};

export default StatisticsCard;