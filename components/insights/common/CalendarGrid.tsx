import React, { useState } from 'react';

interface CalendarGridProps {
    getDayStyle: (day: number, month: number, year: number) => string;
    getDayTooltip?: (day: number, month: number, year: number) => string | null;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ getDayStyle, getDayTooltip }) => {
    const [date, setDate] = useState(new Date());
    const [tooltip, setTooltip] = useState<{ visible: boolean; content: string; x: number; y: number; }>({ visible: false, content: '', x: 0, y: 0 });

    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handlePrevMonth = () => setDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setDate(new Date(year, month + 1, 1));

    const handleHover = (content: string | null, e: React.MouseEvent) => {
        if (content) {
            setTooltip({ visible: true, content, x: e.clientX, y: e.clientY });
        }
    };
    const handleLeave = () => setTooltip(prev => ({ ...prev, visible: false }));

    return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
             {tooltip.visible && (
                <div
                    style={{ position: 'fixed', top: `${tooltip.y + 15}px`, left: `${tooltip.x + 15}px`, pointerEvents: 'none', zIndex: 1000 }}
                    className="max-w-[200px] p-2 text-xs text-center text-white bg-gray-900 border border-gray-600 rounded-md shadow-lg"
                    role="tooltip"
                >
                    {tooltip.content}
                </div>
            )}
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-700" aria-label="Previous month"><i className="fa-solid fa-chevron-left"></i></button>
                <h3 className="text-lg font-semibold text-white">
                    {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-700" aria-label="Next month"><i className="fa-solid fa-chevron-right"></i></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400">
                {weekdays.map(day => <div key={day} className="font-bold">{day}</div>)}
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayStyle = getDayStyle(day, month, year);
                    const dayTooltip = getDayTooltip ? getDayTooltip(day, month, year) : null;
                    const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                    
                    return (
                        <div
                            key={day}
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${dayStyle} ${isToday ? 'ring-2 ring-blue-400' : ''}`}
                            onMouseEnter={(e) => handleHover(dayTooltip, e)}
                            onMouseMove={(e) => handleHover(dayTooltip, e)}
                            onMouseLeave={handleLeave}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarGrid;
