import React from 'react';

interface InputCardProps {
    birthDate: string;
    setBirthDate: (date: string) => void;
    birthTime: string;
    setBirthTime: (time: string) => void;
    birthTimezone: string;
    setBirthTimezone: (timezone: string) => void;
    timezones: string[];
    onCalculate: () => void;
}

const InputCard: React.FC<InputCardProps> = ({
    birthDate,
    setBirthDate,
    birthTime,
    setBirthTime,
    birthTimezone,
    setBirthTimezone,
    timezones,
    onCalculate,
}) => {
    return (
        <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div>
                    <label htmlFor="birthdate" className="block text-sm font-medium text-gray-300 mb-1">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="birthdate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full p-2 bg-gray-900 border border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="birthtime" className="block text-sm font-medium text-gray-300 mb-1">
                        Time of Birth
                    </label>
                    <input
                        type="time"
                        id="birthtime"
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        className="w-full p-2 bg-gray-900 border border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-1">
                        Birth Timezone (for context)
                    </label>
                    <select
                        id="timezone"
                        value={birthTimezone}
                        onChange={(e) => setBirthTimezone(e.target.value)}
                        className="w-full p-2 bg-gray-900 border border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {timezones.map(tz => (
                            <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                        ))}
                    </select>
                     <p className="text-xs text-gray-500 mt-2">
                        Note: The date/time you enter is parsed using your browser's current timezone. This selection primarily affects the World Clock display. For full historical accuracy, a specialized timezone library is required.
                    </p>
                </div>
            </div>
            <div className="mt-6 text-center">
                <button
                    onClick={onCalculate}
                    className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                >
                    Calculate Age
                </button>
            </div>
        </div>
    );
};

export default InputCard;