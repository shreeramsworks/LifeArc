
import { AgeData, AgeDuration, AgeSystem, NextBirthdayData } from '../types';

export function calculateAge(birthDate: Date, nowDate: Date, ageSystem: AgeSystem): AgeData {
    const diff = nowDate.getTime() - birthDate.getTime();

    const westernAge = calculateWesternAge(birthDate, nowDate);
    const eastAsianAge = calculateEastAsianAge(birthDate, nowDate);
    
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const nextBirthday = calculateNextBirthday(birthDate, nowDate);

    return {
        westernAge,
        eastAsianAge,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
        nextBirthday,
    };
}

function calculateWesternAge(birthDate: Date, nowDate: Date): AgeDuration {
    let years = nowDate.getFullYear() - birthDate.getFullYear();
    let months = nowDate.getMonth() - birthDate.getMonth();
    let days = nowDate.getDate() - birthDate.getDate();
    let hours = nowDate.getHours() - birthDate.getHours();
    let minutes = nowDate.getMinutes() - birthDate.getMinutes();
    let seconds = nowDate.getSeconds() - birthDate.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const prevMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    return { years, months, days, hours, minutes, seconds };
}

function calculateEastAsianAge(birthDate: Date, nowDate: Date): number {
    // Starts at 1 on birth, everyone gets 1 year older on Jan 1st.
    let age = nowDate.getFullYear() - birthDate.getFullYear() + 1;
    return age;
}

function calculateNextBirthday(birthDate: Date, nowDate: Date): NextBirthdayData {
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    
    let nextBirthdayYear = nowDate.getFullYear();
    if (nowDate.getMonth() > birthMonth || (nowDate.getMonth() === birthMonth && nowDate.getDate() >= birthDay)) {
        nextBirthdayYear++;
    }

    const nextBirthdayDate = new Date(
        nextBirthdayYear,
        birthMonth,
        birthDay,
        birthDate.getHours(),
        birthDate.getMinutes(),
        birthDate.getSeconds()
    );

    const diff = nextBirthdayDate.getTime() - nowDate.getTime();
    
    let remaining = Math.floor(diff / 1000);
    
    const seconds = remaining % 60;
    remaining = Math.floor(remaining / 60);
    const minutes = remaining % 60;
    remaining = Math.floor(remaining / 60);
    const hours = remaining % 24;
    remaining = Math.floor(remaining / 24);
    
    // Simple day calculation, doesn't account for month length variation perfectly for long countdowns
    const days = remaining; 

    return {
        date: nextBirthdayDate,
        countdown: {
            years: 0, // Not needed for countdown
            months: 0, // Not needed for countdown
            days: days,
            hours,
            minutes,
            seconds,
        },
    };
}
