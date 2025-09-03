import { FamilyMember, AgeDuration } from '../types';
import { GENERATIONS } from '../constants';

export function calculateAgeDuration(isoString: string, now: Date): AgeDuration {
    const birthDate = new Date(isoString);
    if (isNaN(birthDate.getTime())) {
        return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    let hours = now.getHours() - birthDate.getHours();
    let minutes = now.getMinutes() - birthDate.getMinutes();
    let seconds = now.getSeconds() - birthDate.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) { months += 12; years--; }

    return { years, months, days, hours, minutes, seconds };
}

export function formatDuration(duration: AgeDuration): string {
    const parts = [];
    if (duration.years > 0) parts.push(`${duration.years} year${duration.years > 1 ? 's' : ''}`);
    if (duration.months > 0) parts.push(`${duration.months} month${duration.months > 1 ? 's' : ''}`);
    if (duration.days > 0) parts.push(`${duration.days} day${duration.days > 1 ? 's' : ''}`);
    if (parts.length === 0) return "Less than a day";
    return parts.join(', ');
}

export function getGeneration(dobISO: string) {
    const birthYear = new Date(dobISO).getFullYear();
    return GENERATIONS.find(g => birthYear >= g.start && birthYear <= g.end);
}

export function calculateStats(family: FamilyMember[], now: Date = new Date()) {
    if (family.length === 0) {
        return { mean: 0, median: 0, youngest: 0, oldest: 0, youngestMember: null, oldestMember: null };
    }

    const nowMs = now.getTime();
    const agesInMs = family.map(m => nowMs - new Date(m.dobISO).getTime()).sort((a, b) => a - b);
    
    const youngestMember = family.find(m => (nowMs - new Date(m.dobISO).getTime()) === agesInMs[0]) || null;
    const oldestMember = family.find(m => (nowMs - new Date(m.dobISO).getTime()) === agesInMs[agesInMs.length - 1]) || null;

    const meanMs = agesInMs.reduce((acc, age) => acc + age, 0) / agesInMs.length;
    
    let medianMs: number;
    const mid = Math.floor(agesInMs.length / 2);
    if (agesInMs.length % 2 === 0) {
        medianMs = (agesInMs[mid - 1] + agesInMs[mid]) / 2;
    } else {
        medianMs = agesInMs[mid];
    }

    const msToYears = (ms: number) => ms / (1000 * 60 * 60 * 24 * 365.25);

    return {
        mean: msToYears(meanMs),
        median: msToYears(medianMs),
        youngest: youngestMember ? msToYears(nowMs - new Date(youngestMember.dobISO).getTime()) : 0,
        oldest: oldestMember ? msToYears(nowMs - new Date(oldestMember.dobISO).getTime()) : 0,
        youngestMember,
        oldestMember,
    };
}