import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AgeData, AgeSystem } from '../types';
import { calculateAge } from '../lib/ageCalculator';
import { timezones as curatedTimezones } from '../lib/timezones';
import { worldClockCities } from '../constants';
import CurrentTimeCard from './CurrentTimeCard';
import InputCard from './InputCard';
import ResultsCard from './ResultsCard';
import WorldClockCard from './WorldClockCard';
import InstructionsCard from './InstructionsCard';

const AgeCalculatorView: React.FC = () => {
    const userTimezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

    const [birthDate, setBirthDate] = useState<string>('2000-01-01');
    const [birthTime, setBirthTime] = useState<string>('12:00');
    const [birthTimezone, setBirthTimezone] = useState<string>(userTimezone);
    
    const [now, setNow] = useState<Date>(new Date());
    const [ageData, setAgeData] = useState<AgeData | null>(null);
    const [ageSystem, setAgeSystem] = useState<AgeSystem>(AgeSystem.WESTERN);
    const [hasCalculated, setHasCalculated] = useState(false);

    const userLocale = useMemo(() => navigator.language, []);
    
    const timezonesForDropdown = useMemo(() => {
        const allTimezones = new Set(curatedTimezones);
        allTimezones.add(userTimezone);
        return Array.from(allTimezones).sort();
    }, [userTimezone]);

    useEffect(() => {
        const timerId = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);
    
    const birthDateTimeObject = useMemo(() => {
        if (!birthDate || !birthTime) return null;
        const timeWithSeconds = birthTime.length === 5 ? `${birthTime}:00` : birthTime;
        const fullDateTimeString = `${birthDate}T${timeWithSeconds}`;
        const dt = new Date(fullDateTimeString);
        return isNaN(dt.getTime()) ? null : dt;
    }, [birthDate, birthTime]);

    const handleCalculate = useCallback(() => {
        if (birthDateTimeObject) {
            const calculated = calculateAge(birthDateTimeObject, new Date(), ageSystem);
            setAgeData(calculated);
        } else {
            setAgeData(null);
        }
    }, [birthDateTimeObject, ageSystem]);
    
    const handleInitialCalculate = useCallback(() => {
        if (!hasCalculated) {
            setHasCalculated(true);
        }
        handleCalculate();
    }, [handleCalculate, hasCalculated]);

    useEffect(() => {
        if (hasCalculated) {
            handleCalculate();
        }
    }, [now, ageSystem, hasCalculated, handleCalculate]);

    return (
        <div className="space-y-8">
             <header className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-white">
                    Precision Age Calculator - Calculate Your Exact Age
                </h1>
                <p className="mt-2 text-lg text-gray-300">
                   Calculate your exact age in years, months, days, hours, and seconds. Our secure age calculator is 100% private - no data is stored.
                </p>
            </header>
            <CurrentTimeCard now={now} locale={userLocale} timezone={userTimezone} />
            <InputCard
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                birthTime={birthTime}
                setBirthTime={setBirthTime}
                birthTimezone={birthTimezone}
                setBirthTimezone={setBirthTimezone}
                timezones={timezonesForDropdown}
                onCalculate={handleInitialCalculate}
            />
            {hasCalculated && ageData && birthDateTimeObject && (
                <div className="space-y-8">
                    <ResultsCard 
                        ageData={ageData} 
                        ageSystem={ageSystem} 
                        setAgeSystem={setAgeSystem} 
                        locale={userLocale}
                        nextBirthdayData={ageData.nextBirthday}
                    />
                    <WorldClockCard 
                       birthDateTime={birthDateTimeObject} 
                       birthTimezone={birthTimezone} 
                       cities={worldClockCities} 
                       locale={userLocale}
                    />
                </div>
            )}
            <InstructionsCard 
                title="How to Use the Secure Age Calculator"
                steps={[
                    "Enter your exact date and time of birth in the fields provided.",
                    "Select your birth timezone. This helps contextualize your birth moment on the World Clock.",
                    "Click the 'Calculate Age' button to generate your detailed time analysis.",
                    "Explore the results, including your precise age, your next birthday countdown, and more.",
                    "Your data is never collected, making this a completely private age calculator."
                ]}
            />
        </div>
    );
};

export default AgeCalculatorView;