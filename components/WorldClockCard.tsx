import React from 'react';

interface WorldClockCardProps {
    birthDateTime: Date;
    birthTimezone: string;
    cities: { city: string; timezone: string }[];
    locale: string;
}

const WorldClockCard: React.FC<WorldClockCardProps> = ({ birthDateTime, birthTimezone, cities, locale }) => {
    
    const formatters: { [key: string]: Intl.DateTimeFormat } = {};
    cities.forEach(c => {
        formatters[c.timezone] = new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZone: c.timezone,
            timeZoneName: 'short',
        });
    });

    const birthTimeInCurrentTZFormatter = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timeZoneName: 'short',
    });

    return (
        <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-300 mb-4 text-center">Your Birth Moment Around the World</h2>
            <div className="space-y-3">
                <div className="flex justify-between items-center bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg">
                    <div className="font-bold text-blue-300">
                        <p>{birthTimezone.replace(/_/g, ' ')}</p>
                        <p className="text-xs font-normal">(Your selected birth timezone)</p>
                    </div>
                    <p className="text-right font-mono text-blue-300">
                        {new Intl.DateTimeFormat(locale, {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: 'numeric', minute: '2-digit', timeZone: birthTimezone
                        }).format(birthDateTime)}
                    </p>
                </div>
                
                 <div className="flex justify-between items-center bg-gray-900 p-3 rounded-lg border border-gray-700">
                    <div className="font-semibold text-gray-300">
                        <p>{Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, ' ')}</p>
                        <p className="text-xs font-normal">(Your current timezone)</p>
                    </div>
                    <p className="text-right font-mono text-gray-300">
                        {birthTimeInCurrentTZFormatter.format(birthDateTime)}
                    </p>
                </div>

                <div className="pt-3 border-t border-gray-700">
                    <ul className="space-y-2">
                        {cities.map(({ city, timezone }) => (
                            <li key={city} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-gray-700/50">
                                <span className="text-gray-300">{city}</span>
                                <span className="font-mono text-gray-200">{formatters[timezone].format(birthDateTime)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WorldClockCard;