import React, { useMemo, useState } from 'react';
import Card from './Card';
import { FamilyMember } from '../../types';
import { BIRTHDAY_MILESTONES } from '../../constants';

type CalendarEvent = {
    type: 'milestone' | 'birthday';
    name: string;
    milestone: number;
    date: Date;
};

interface MilestonesCardProps {
    now: Date;
    family: FamilyMember[];
}

interface TooltipState {
    visible: boolean;
    content: string;
    x: number;
    y: number;
}

const MilestonesCard: React.FC<MilestonesCardProps> = ({ now, family }) => {
    const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, content: '', x: 0, y: 0 });

    const upcomingEvents = useMemo(() => {
        const specialRelations = ['Partner', 'Husband', 'Wife'];
        
        const allEvents: CalendarEvent[] = family.flatMap((member): CalendarEvent[] => {
            const birthDate = new Date(member.dobISO);
            if (isNaN(birthDate.getTime())) return [];

            const birthYear = birthDate.getFullYear();
            const birthMonth = birthDate.getMonth();
            const birthDay = birthDate.getDate();

            const currentYear = now.getFullYear();
            let currentAge = currentYear - birthYear;
            if (now.getMonth() < birthMonth || (now.getMonth() === birthMonth && now.getDate() < birthDay)) {
                currentAge--;
            }
            
            const isSpecialRelation = specialRelations.includes(member.relation);

            if (isSpecialRelation) {
                return BIRTHDAY_MILESTONES
                    .filter(m => m > currentAge)
                    .map(milestoneAge => {
                        const milestoneDate = new Date(birthDate);
                        milestoneDate.setFullYear(birthDate.getFullYear() + milestoneAge);
                        return {
                            type: 'milestone' as const,
                            name: member.name,
                            milestone: milestoneAge,
                            date: milestoneDate,
                        };
                    });
            } else {
                let nextBirthdayYear = now.getFullYear();
                if (now.getMonth() > birthMonth || (now.getMonth() === birthMonth && now.getDate() >= birthDay)) {
                    nextBirthdayYear++;
                }
                const nextBirthdayDate = new Date(birthDate);
                nextBirthdayDate.setFullYear(nextBirthdayYear);

                return [{
                    type: 'birthday' as const,
                    name: member.name,
                    milestone: nextBirthdayYear - birthYear, // This is the age they will turn
                    date: nextBirthdayDate,
                }];
            }
        });

        return allEvents
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 3)
            .map(event => {
                const diff = event.date.getTime() - now.getTime();
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                return {
                    ...event,
                    countdown: { years: 0, months: 0, days, hours, minutes, seconds }
                };
            });
    }, [family, now]);
    
    const handleHover = (content: string, e: React.MouseEvent) => {
        setTooltip({
            visible: true,
            content,
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleLeave = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
    };

    return (
        <Card title="Upcoming Milestones & Birthdays">
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
            {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                    {upcomingEvents.map((m) => {
                        const tooltipText = m.type === 'milestone'
                            ? `This is the day ${m.name} celebrates their ${m.milestone}th birthday.`
                            : `This is the day ${m.name} will turn ${m.milestone}.`;
                        
                        return (
                            <div 
                                key={`${m.name}-${m.milestone}`} 
                                className="p-3 bg-gray-900 rounded-lg border border-gray-700"
                                onMouseEnter={(e) => handleHover(tooltipText, e)}
                                onMouseMove={(e) => handleHover(tooltipText, e)}
                                onMouseLeave={handleLeave}
                            >
                               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                   <div>
                                        <p className="font-bold text-gray-200">
                                            {m.type === 'milestone' ? `${m.name}'s ${m.milestone}th Birthday` : `${m.name}'s Birthday (${m.milestone})`}
                                        </p>
                                        <p className="text-sm text-gray-400">{m.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                   </div>
                               </div>
                               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-center">
                                    <div className="bg-gray-800 p-2 rounded border border-gray-700"><span className="font-bold text-blue-400">{m.countdown.days}</span><span className="text-xs text-gray-400"> days</span></div>
                                    <div className="bg-gray-800 p-2 rounded border border-gray-700"><span className="font-bold text-blue-400">{m.countdown.hours}</span><span className="text-xs text-gray-400"> hours</span></div>
                                    <div className="bg-gray-800 p-2 rounded border border-gray-700"><span className="font-bold text-blue-400">{m.countdown.minutes}</span><span className="text-xs text-gray-400"> mins</span></div>
                                    <div className="bg-gray-800 p-2 rounded border border-gray-700"><span className="font-bold text-blue-400">{m.countdown.seconds}</span><span className="text-xs text-gray-400"> secs</span></div>
                               </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                 <p className="text-center text-gray-500">No upcoming birthdays or milestones. Add family members to see countdowns.</p>
            )}
        </Card>
    );
};

export default MilestonesCard;