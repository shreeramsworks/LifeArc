import { retirementAges } from '../data/countries';
import { categorizedEvents } from '../data/events';
import { calculateAgeDuration } from './familyCalculations';

// --- CORE TIME PRECISION FUNCTIONS ---

/**
 * Converts a JavaScript Date object to its Julian Day Number (JDN).
 * JDN is a continuous count of days since noon Universal Time on January 1, 4713 BCE.
 * This removes ambiguities from timezones, DST, and calendar irregularities.
 * @param date - The JavaScript Date object.
 * @returns The Julian Day Number as a float.
 */
export function getJulianDay(date: Date): number {
    // The calculation is based on the number of milliseconds since the Unix epoch.
    // 86,400,000 ms = 1 day.
    // 2440587.5 is the JDN of the Unix epoch (1970-01-01 00:00:00 UTC).
    return date.getTime() / 86400000 + 2440587.5;
}

/**
 * Calculates the precise number of days since a given date of birth.
 * It uses the Julian Day Number to ensure maximum accuracy, avoiding DST and timezone shifts.
 * @param dob - The Date object representing the date of birth.
 * @returns The number of days elapsed since birth.
 */
export function getDaysSinceBirth(dob: Date): number {
    const dobUTC = new Date(Date.UTC(dob.getFullYear(), dob.getMonth(), dob.getDate()));
    const nowUTC = new Date();
    nowUTC.setUTCHours(0, 0, 0, 0);

    const jdDob = getJulianDay(dobUTC);
    const jdNow = getJulianDay(nowUTC);
    
    // The difference in JDNs is the exact number of days.
    return jdNow - jdDob;
}


// --- HISTORICAL EVENTS ---
export function searchEvents(query: string, category: string, dob: Date) {
    const lowerQuery = query.toLowerCase().trim();
    
    let eventsToSearch = [];
    if (category === 'All') {
        // Create a flat, unique list of events for the "All" category
        const allEvents = Object.values(categorizedEvents).flat();
        const uniqueEvents = Array.from(new Map(allEvents.map(event => [event.title, event])).values());
        eventsToSearch = uniqueEvents;
    } else if (categorizedEvents[category]) {
        eventsToSearch = categorizedEvents[category];
    } else {
        return [];
    }
    
    // Sort events by date, most recent first
    eventsToSearch.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (!lowerQuery) {
        // If no query, return all events in the category (or a slice for performance)
        return eventsToSearch.slice(0, 100).map(event => ({
            ...event,
            ageAtEvent: calculateAgeDuration(dob.toISOString(), new Date(event.date + 'T00:00:00'))
        }));
    }

    const filteredEvents = eventsToSearch.filter(event => 
        event.title.toLowerCase().includes(lowerQuery) || 
        event.keywords.toLowerCase().includes(lowerQuery)
    );

    return filteredEvents.slice(0, 50).map(event => ({
        ...event,
        ageAtEvent: calculateAgeDuration(dob.toISOString(), new Date(event.date + 'T00:00:00'))
    }));
}


// --- LIFETIME DAY COUNTER ---
/**
 * Sieve of Eratosthenes to find prime numbers up to a limit.
 * Used for calculating the next prime-numbered birthday.
 * @param limit - The maximum number to check for primality.
 * @returns An array of booleans where `primes[i]` is true if `i` is prime.
 */
function sieveOfEratosthenes(limit: number): boolean[] {
    const primes = new Array(limit + 1).fill(true);
    primes[0] = primes[1] = false;
    for (let i = 2; i * i <= limit; i++) {
        if (primes[i]) {
            for (let j = i * i; j <= limit; j += i) {
                primes[j] = false;
            }
        }
    }
    return primes;
}

const primes = sieveOfEratosthenes(120);

export function getNextPrimeBirthday(currentAge: number): number | null {
    for (let i = Math.floor(currentAge) + 1; i < primes.length; i++) {
        if (primes[i]) return i;
    }
    return null;
}

// --- RETIREMENT COUNTDOWN ---
export function calculateRetirement(dob: Date, retirementAge: number, country: string) {
    const targetAge = retirementAge || retirementAges[country] || 65;
    const retirementDate = new Date(dob);
    retirementDate.setFullYear(dob.getFullYear() + targetAge);
    
    const now = new Date();
    
    const totalDaysLeft = (retirementDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    
    let businessDaysLeft = 0;
    if (totalDaysLeft > 0) {
        let currentDate = new Date(now);
        while (currentDate <= retirementDate) {
            const dayOfWeek = currentDate.getDay(); // Sunday = 0, Saturday = 6
            if (dayOfWeek > 0 && dayOfWeek < 6) {
                businessDaysLeft++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    const totalDuration = retirementDate.getTime() - dob.getTime();
    const elapsedDuration = now.getTime() - dob.getTime();
    const percentElapsed = Math.min(100, (elapsedDuration / totalDuration) * 100);

    return {
        retirementDate,
        totalDaysLeft,
        businessDaysLeft,
        percentElapsed
    };
}