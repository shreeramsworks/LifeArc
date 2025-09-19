import React from 'react';

interface CurrentTimeCardProps {
    now: Date;
    locale: string;
    timezone: string;
}

const CurrentTimeCard: React.FC<CurrentTimeCardProps> = ({ now, locale, timezone }) => {
    const dateFormatter = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: timezone,
    });

    const timeFormatter = new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: timezone,
    });
    
    const timeZoneFormatter = new Intl.DateTimeFormat(locale, {
        timeZoneName: 'long',
        timeZone: timezone,
    });
    
    const timezoneString = timeZoneFormatter.formatToParts(now).find(part => part.type === 'timeZoneName')?.value || timezone;
    const utcOffset = `UTC${now.toLocaleTimeString('en-US', { timeZoneName: 'shortOffset', timeZone: timezone }).split(' ')[1]}`;


    return (
        <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Your Current Local Time</h2>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                    <p className="text-4xl font-bold text-white tracking-tight">
                        {timeFormatter.format(now)}
                    </p>
                    <p className="text-gray-300">{dateFormatter.format(now)}</p>
                </div>
                <div className="text-center sm:text-right bg-gray-900 p-3 rounded-lg border border-gray-700">
                    <p className="font-medium text-gray-200">{timezoneString}</p>
                    <p className="text-sm text-gray-400">{timezone.replace(/_/g, ' ')} ({utcOffset})</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentTimeCard;