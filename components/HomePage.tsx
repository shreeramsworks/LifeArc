import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AgeDuration } from '../types';
import { calculateAgeDuration } from '../lib/familyCalculations';
import AdSenseBanner from './AdSenseBanner';

interface HomePageProps {
    onNavigate: (path: string) => void;
}

const LiveMiniCalculator: React.FC = () => {
    const [dob, setDob] = useState<string>('');
    const [age, setAge] = useState<AgeDuration | null>(null);
    const intervalRef = useRef<number | null>(null);

    const startTimer = useCallback((birthDate: Date) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
            setAge(calculateAgeDuration(birthDate.toISOString(), new Date()));
        }, 1000);
    }, []);

    useEffect(() => {
        if (dob) {
            const birthDate = new Date(`${dob}T00:00:00`);
            if (!isNaN(birthDate.getTime())) {
                setAge(calculateAgeDuration(birthDate.toISOString(), new Date()));
                startTimer(birthDate);
            }
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setAge(null);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [dob, startTimer]);

    return (
        <div className="mt-8 max-w-xl mx-auto">
            <input
                type="date"
                aria-label="Enter your date of birth to see your age update in real-time"
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-4 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm text-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            />
            {age && (
                <div className="mt-6 p-4 bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-inner border border-gray-700">
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                        <div><div className="text-3xl font-bold text-blue-400">{age.years}</div><div className="text-xs text-gray-300">Years</div></div>
                        <div><div className="text-3xl font-bold text-blue-400">{age.months}</div><div className="text-xs text-gray-300">Months</div></div>
                        <div><div className="text-3xl font-bold text-blue-400">{age.days}</div><div className="text-xs text-gray-300">Days</div></div>
                        <div><div className="text-3xl font-bold text-blue-400">{age.hours}</div><div className="text-xs text-gray-300">Hours</div></div>
                        <div><div className="text-3xl font-bold text-blue-400">{age.minutes}</div><div className="text-xs text-gray-300">Mins</div></div>
                        <div><div className="text-3xl font-bold text-blue-400">{age.seconds}</div><div className="text-xs text-gray-300">Secs</div></div>
                    </div>
                </div>
            )}
        </div>
    );
};

interface Testimonial {
    quote: string;
    name: string;
    image: string;
}

const testimonials: Testimonial[] = [
    { quote: "As a history teacher, the Age at Historical Events tool is a game-changer. Showing my students exactly how old I was during the moon landing makes history come alive for them. A brilliant educational tool.", name: "David Chen", image: "https://i.pravatar.cc/150?img=2" },
    { quote: "I'm obsessed with the Family Tracker. Visualizing our family's generations and seeing my kids' live ages ticking up is just so special. It's become our digital family album.", name: "Fatima Al-Jamil", image: "https://i.pravatar.cc/150?img=3" },
    { quote: "Celebrating my 10,000th day alive was something I'd never have thought of, but the Lifetime Day Counter made it a fun milestone! It's a great reminder to appreciate the time we have.", name: "Marcus Holloway", image: "https://i.pravatar.cc/150?img=6" },
    { quote: "The precision of the main Age Calculator is unmatched. As a data analyst, I love that it's based on Julian days. It's the only tool I trust for exact time calculations.", name: "Chloe O'Brien", image: "https://i.pravatar.cc/150?img=7" },
];


const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const scrollToShowcase = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById('tools-showcase')?.scrollIntoView({ behavior: 'smooth' });
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentTestimonial(prev => (prev === testimonials.length -1 ? 0 : prev + 1));
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentTestimonial]);

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="text-center mx-auto py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
                    Private Age Calculator, Family Tree &amp; Numerology Tools
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                   Discover personal insights with complete privacy. Our tools are <strong>100% browser-based</strong> with <strong>zero data collection</strong>. Calculate your age, track your family, and explore Vedic numerology, all with guaranteed anonymity.
                </p>
                <LiveMiniCalculator />
                <button
                    onClick={scrollToShowcase}
                    className="mt-8 inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                >
                    Explore The Tools
                </button>
            </section>

            {/* "Explore Your Universe" Showcase Section */}
            <section id="tools-showcase" className="mx-auto px-4 sm:px-6 lg:px-8">
                 <h2 className="text-3xl font-bold text-center text-white mb-12">Live Age Counter, Private Family Tracker &amp; Anonymous Numerology</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center flex flex-col items-center">
                        <i className="fa-solid fa-calculator text-5xl text-blue-400 mb-4" aria-hidden="true"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Precise Age Calculator</h3>
                        <p className="text-gray-300 flex-grow">Use our <strong>secure age calculator</strong> to find your age <strong>to the second</strong>. Features a <strong>birthday countdown</strong> and world clock. This is a <strong>no data collection age calculator</strong>.</p>
                        <a href="#/tools/ageCalculator" onClick={(e) => { e.preventDefault(); onNavigate('#/tools/ageCalculator'); }} className="mt-6 block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Launch Calculator</a>
                     </div>
                     <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center flex flex-col items-center">
                        <i className="fa-solid fa-users-line text-5xl text-blue-400 mb-4" aria-hidden="true"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Private Family Tracker</h3>
                        <p className="text-gray-300 flex-grow">Build a <strong>private family tree</strong> with our <strong>offline family tree software</strong>. Track live ages and statistics with zero data sharing. A true <strong>browser based family tree</strong>.</p>
                        <a href="#/tools/familyTracker" onClick={(e) => { e.preventDefault(); onNavigate('#/tools/familyTracker'); }} className="mt-6 block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Launch Tracker</a>
                     </div>
                      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center flex flex-col items-center">
                        <i className="fa-solid fa-star-of-life text-5xl text-blue-400 mb-4" aria-hidden="true"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Anonymous Numerology</h3>
                        <p className="text-gray-300 flex-grow">Get an <strong>anonymous numerology reading</strong> with our <strong>private numerology calculator</strong>. Discover your Vedic Destiny number and favorable days without sharing personal data.</p>
                        <a href="#/insights" onClick={(e) => { e.preventDefault(); onNavigate('#/insights'); }} className="mt-6 block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Explore Insights</a>
                     </div>
                 </div>
            </section>
            
            {/* Why Choose LifeArrc Section */}
            <section id="why-lifearrc" className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose LifeArrc?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                        <i className="fa-solid fa-shield-halved text-5xl text-green-400 mb-4"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Privacy by Design</h3>
                        <p className="text-gray-300">
                            In an era where data is a commodity, LifeArrc operates on a simple, powerful principle: <strong>your data is yours alone</strong>. All calculations are performed directly in your browser, and no personal information—not your birthday, not your family members' details—is ever sent to or stored on our servers. You can explore your personal universe with the absolute certainty that your information remains completely private and under your control.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                        <i className="fa-solid fa-crosshairs text-5xl text-cyan-400 mb-4"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Unmatched Precision</h3>
                        <p className="text-gray-300">
                            Accuracy matters. Many online calculators have errors due to timezones and daylight saving. LifeArrc is built differently. We use the Julian Day Number (JDN) system, an astronomical standard for timekeeping that eliminates these ambiguities. This ensures that every calculation, from your <strong>age in seconds</strong> to your personal insights, is based on the most precise and reliable method available, giving you insights you can trust.
                        </p>
                    </div>
                </div>
            </section>

            <AdSenseBanner />

            {/* Testimonials Carousel Section */}
            <section className="mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-white mb-12">What Our Users Are Saying...</h2>
                <div className="relative max-w-3xl mx-auto">
                    <div className="relative bg-gray-800 border border-gray-700 rounded-lg min-h-[280px] pt-16 p-8">
                        {/* Avatar sits on top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <img 
                                src={testimonials[currentTestimonial].image} 
                                alt={`User profile picture for ${testimonials[currentTestimonial].name}`} 
                                className="w-24 h-24 rounded-full object-cover border-4 border-gray-800 shadow-lg"
                            />
                        </div>
                        
                        {/* Testimonial Content */}
                        <div className="relative overflow-hidden h-36 flex items-center">
                            {testimonials.map((t, index) => (
                                <div 
                                    key={index} 
                                    className={`absolute w-full px-4 transition-opacity duration-500 ease-in-out ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <blockquote className="text-gray-300 italic text-lg">"{t.quote}"</blockquote>
                                    <cite className="block font-semibold text-blue-400 mt-4">- {t.name}</cite>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button 
                        aria-label="Previous testimonial" 
                        onClick={() => setCurrentTestimonial(p => p === 0 ? testimonials.length - 1 : p - 1)} 
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gray-700 hover:bg-gray-600 rounded-full h-12 w-12 flex items-center justify-center shadow-md transition-colors"
                    >
                        <i className="fa-solid fa-chevron-left text-gray-300"></i>
                    </button>
                    <button 
                        aria-label="Next testimonial" 
                        onClick={() => setCurrentTestimonial(p => p === testimonials.length - 1 ? 0 : p + 1)} 
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gray-700 hover:bg-gray-600 rounded-full h-12 w-12 flex items-center justify-center shadow-md transition-colors"
                    >
                        <i className="fa-solid fa-chevron-right text-gray-300"></i>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;