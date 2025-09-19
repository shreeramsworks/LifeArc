import React, { useState, useMemo } from 'react';
import { searchEvents } from '../../lib/insights';
import { categorizedEvents } from '../../data/events';
import Card from '../family/Card';
import ManualSection from './common/ManualSection';

interface HistoricalEventsCardProps {
    dob: Date;
}

const CATEGORIES = ['All', 'World History', 'Science & Tech', 'Arts & Culture', 'Space Exploration', 'Politics & Law'];

const newManual = [
    { heading: "What it is", content: <p>Shows exactly how old you were on major world dates, drawn from a large offline library.</p> },
    { heading: "Why it matters", content: <p>Makes history personal, perfect for journaling, teaching kids or crafting speeches.</p> },
    { heading: "How to use it", content: 
        <ul className="list-disc list-inside pl-2">
            <li>Select a category like "Science & Tech" or "World History" to browse events.</li>
            <li>Use the search bar to instantly filter the list by keyword (e.g., "moon", "internet", "war").</li>
            <li>The results will show your precise age for each matching event.</li>
        </ul>
    },
    { heading: "Example", content: <p>Searching "apollo" with DOB 1960-01-01 shows you were 9y 6m 19d for the Moon Landing.</p> },
    { heading: "Disclaimer", content: <p>Ages are exact. The event list is extensive but may not include all regional or niche events.</p> }
];

const HistoricalEventsCard: React.FC<HistoricalEventsCardProps> = ({ dob }) => {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    
    const results = useMemo(() => {
        return searchEvents(query, activeCategory, dob);
    }, [query, activeCategory, dob]);

    return (
        <Card title="Age @ Historical Events">
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2 border-b border-gray-700 pb-4">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                                activeCategory === category 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search in "${activeCategory}"...`}
                    aria-label="Search for historical events"
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                />
                
                <div className="max-h-96 overflow-y-auto pr-2">
                    {results.length > 0 ? (
                        <ul className="space-y-2">
                            {results.map(event => (
                                <li key={event.date + event.title} className="p-3 bg-gray-900 rounded-lg border border-gray-700 flex flex-col sm:flex-row justify-between sm:items-center">
                                    <div className="mb-2 sm:mb-0">
                                        <p className="font-semibold text-gray-200">{event.title}</p>
                                        <p className="text-sm text-gray-300">{new Date(event.date + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <div className="text-right font-mono text-blue-400 text-sm whitespace-nowrap">
                                        {event.ageAtEvent.years}y {event.ageAtEvent.months}m {event.ageAtEvent.days}d
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500 py-8">
                            {query ? `No events found for "${query}" in this category.` : `Select a category or search to begin.`}
                        </p>
                    )}
                </div>

                <ManualSection sections={newManual} />
            </div>
        </Card>
    );
};

export default HistoricalEventsCard;