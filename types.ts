export enum AgeSystem {
    WESTERN = 'Western',
    EAST_ASIAN = 'East Asian',
}

export interface AgeDuration {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface NextBirthdayData {
    date: Date;
    countdown: AgeDuration;
}

export interface AgeData {
    westernAge: AgeDuration;
    eastAsianAge: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    totalSeconds: number;
    nextBirthday: NextBirthdayData;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  dobISO: string; // ISO string e.g., 'YYYY-MM-DDTHH:mm:ss'
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}