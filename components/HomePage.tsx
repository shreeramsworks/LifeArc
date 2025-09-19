import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AgeDuration } from '../types';
import { calculateAgeDuration } from '../lib/familyCalculations';
import AdSenseBanner from './AdSenseBanner';

interface HomePageProps {
    onNavigate: (page: 'home' | 'tools' | 'insights' | 'privacy' | 'terms' | 'about' | 'contact' | 'blog', tool?: 'ageCalculator' | 'familyTracker') => void;
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
                className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-gray-200 rounded-lg shadow-sm text-lg focus:ring-blue-500 focus:border-blue-500"
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

const initialTestimonials: Testimonial[] = [
    { quote: "The Chrono Insights feature is mind-blowing. I discovered my Life-Path number is 8, and the Biorhythm chart has genuinely helped me schedule my workouts on peak physical days. It's like a personal dashboard for my life!", name: "Elena Rodriguez", image: "https://i.pravatar.cc/150?img=1" },
    { quote: "As a history teacher, the Age at Historical Events tool is a game-changer. Showing my students exactly how old I was during the moon landing makes history come alive for them. A brilliant educational tool.", name: "David Chen", image: "https://i.pravatar.cc/150?img=2" },
    { quote: "I'm obsessed with the Family Tracker. Visualizing our family's generations and seeing my kids' live ages ticking up is just so special. It's become our digital family album.", name: "Fatima Al-Jamil", image: "https://i.pravatar.cc/150?img=3" },
    { quote: "The Retirement Countdown was a real wake-up call! Seeing the timeline in business days left has motivated me to get serious about my financial planning. Invaluable perspective.", name: "Kenji Tanaka", image: "https://i.pravatar.cc/150?img=4" },
    { quote: "The Intuition Cycle Predictor is surprisingly accurate. I've started using my 'High Insight' days for brainstorming, and my creative output has soared. It's fascinating!", name: "Aisha Williams", image: "https://i.pravatar.cc/150?img=5" },
    { quote: "Celebrating my 10,000th day alive was something I'd never have thought of, but the Lifetime Day Counter made it a fun milestone! It's a great reminder to appreciate the time we have.", name: "Marcus Holloway", image: "https://i.pravatar.cc/150?img=6" },
    { quote: "The precision of the main Age Calculator is unmatched. As a data analyst, I love that it's based on Julian days. It's the only tool I trust for exact time calculations.", name: "Chloe O'Brien", image: "https://i.pravatar.cc/150?img=7" },
    { quote: "The Lucky & Caution Days calendar is a fun and unique feature. I use it to plan my week, adding a little extra foresight to my schedule. A great conversation starter!", name: "Leo Petrov", image: "https://i.pravatar.cc/150?img=8" }
];


const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
    const [newReview, setNewReview] = useState({ quote: '', name: '' });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

    const scrollToShowcase = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById('tools-showcase')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToReview = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById('add-review')?.scrollIntoView({ behavior: 'smooth' });
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentTestimonial(prev => (prev === testimonials.length -1 ? 0 : prev + 1));
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentTestimonial, testimonials.length]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newReview.name && newReview.quote && imagePreview) {
            setTestimonials(prev => [...prev, { ...newReview, image: imagePreview }]);
            setNewReview({ quote: '', name: '' });
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            
            setIsReviewSubmitted(true);
            setTimeout(() => setIsReviewSubmitted(false), 5000);
        }
    };

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto py-20 sm:py-24 px-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
                    LifeArc: Chart Your Personal Universe
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-gray-300">
                    Enter your birthday to see your life unfold in real-time, then explore our instruments to chart your entire personal journey, securely and privately.
                </p>
                <LiveMiniCalculator />
                <button
                    onClick={scrollToShowcase}
                    className="mt-8 inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                >
                    Explore Your Universe
                </button>
            </section>

            {/* "Explore Your Universe" Showcase Section */}
            <section id="tools-showcase" className="max-w-6xl mx-auto px-4">
                 <h2 className="text-3xl font-bold text-center text-white mb-12">Chart Your Life with Our Live Age Counter, Family Tracker & Numerology Tools</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center flex flex-col items-center">
                        <i className="fa-solid fa-calculator text-5xl text-blue-400 mb-4" aria-hidden="true"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Precision Timing</h3>
                        <p className="text-gray-300 flex-grow">Go beyond years. See your age down to the second, countdown to your next birthday, and explore your birth moment across the globe.</p>
                        <button onClick={() => onNavigate('tools', 'ageCalculator')} className="mt-6 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Launch Instrument</button>
                     </div>
                     <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center flex flex-col items-center">
                        <i className="fa-solid fa-users-line text-5xl text-blue-400 mb-4" aria-hidden="true"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Family Legacy</h3>
                        <p className="text-gray-300 flex-grow">Build a private family timeline. Track live ages, discover statistics, visualize generational gaps, and never miss a milestone.</p>
                        <button onClick={() => onNavigate('tools', 'familyTracker')} className="mt-6 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Launch Instrument</button>
                     </div>
                      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center flex flex-col items-center">
                        <i className="fa-solid fa-star-of-life text-5xl text-blue-400 mb-4" aria-hidden="true"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Personal Insights</h3>
                        <p className="text-gray-300 flex-grow">Discover the hidden patterns of your life. Explore biorhythms, find your life-path number, and predict days of high intuition.</p>
                        <button onClick={() => onNavigate('insights')} className="mt-6 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Launch Instrument</button>
                     </div>
                 </div>
            </section>
            
            {/* Why Choose LifeArc Section */}
            <section id="why-lifearc" className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose LifeArc?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                        <i className="fa-solid fa-shield-halved text-5xl text-green-400 mb-4"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Privacy by Design</h3>
                        <p className="text-gray-300">
                            In an era where data is a commodity, LifeArc operates on a simple, powerful principle: your data is yours alone. All calculations are performed directly in your browser, and no personal information—not your birthday, not your family members' details—is ever sent to or stored on our servers. You can explore your personal universe with the absolute certainty that your information remains completely private and under your control.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                        <i className="fa-solid fa-crosshairs text-5xl text-cyan-400 mb-4"></i>
                        <h3 className="text-2xl font-bold text-white mb-2">Unmatched Precision</h3>
                        <p className="text-gray-300">
                            Accuracy matters. Many online calculators have errors due to timezones and daylight saving. LifeArc is built differently. We use the Julian Day Number (JDN) system, an astronomical standard for timekeeping that eliminates these ambiguities. This ensures that every calculation, from your age in seconds to your biorhythm chart, is based on the most precise and reliable method available, giving you insights you can trust.
                        </p>
                    </div>
                </div>
            </section>

            <AdSenseBanner />

            {/* Testimonials Carousel Section */}
            <section className="max-w-4xl mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-10">What Our Users Are Saying...</h2>
                <div className="relative bg-gray-800 border border-gray-700 p-8 rounded-lg overflow-hidden min-h-[250px] flex items-center justify-center">
                     {testimonials.map((t, index) => (
                        <div key={index} className={`absolute w-full px-8 transition-opacity duration-500 ease-in-out ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`}>
                             <img src={t.image} alt={`User profile picture for ${t.name}`} className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-gray-700 shadow-md mx-auto"/>
                             <blockquote className="text-gray-300 italic text-lg">"{t.quote}"</blockquote>
                            <cite className="block font-semibold text-blue-400 mt-4">- {t.name}</cite>
                        </div>
                     ))}
                     <button aria-label="Previous testimonial" onClick={() => setCurrentTestimonial(p => p === 0 ? testimonials.length - 1 : p - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/50 hover:bg-gray-900 rounded-full h-10 w-10 flex items-center justify-center shadow-md"><i className="fa-solid fa-chevron-left text-gray-300"></i></button>
                     <button aria-label="Next testimonial" onClick={() => setCurrentTestimonial(p => p === testimonials.length - 1 ? 0 : p + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/50 hover:bg-gray-900 rounded-full h-10 w-10 flex items-center justify-center shadow-md"><i className="fa-solid fa-chevron-right text-gray-300"></i></button>
                </div>
                 <button onClick={scrollToReview} className="mt-6 text-blue-500 font-semibold hover:underline">
                    You could be next! Share your story.
                </button>
            </section>

             {/* Add Review Section */}
            <section id="add-review" className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 min-h-[510px] flex items-center justify-center px-4">
                 {isReviewSubmitted ? (
                    <div className="text-center text-white transition-opacity duration-500">
                        <i className="fa-solid fa-check-circle text-5xl text-green-400 mb-4"></i>
                        <h2 className="text-3xl font-bold">Thank You!</h2>
                        <p className="text-gray-300 mt-2">Your review has been submitted successfully.</p>
                    </div>
                ) : (
                    <div className="w-full">
                        <h2 className="text-3xl font-bold text-center text-white mb-6">Leave Your Review!</h2>
                         <form onSubmit={handleReviewSubmit} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center border-2 border-dashed border-gray-600">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview of user uploaded profile picture" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <i className="fa-solid fa-image text-3xl text-gray-500"></i>
                                    )}
                                </div>
                                <div className="flex-1">
                                     <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-300">Profile Picture</label>
                                     <input 
                                        id="photo-upload" 
                                        type="file" 
                                        accept="image/*" 
                                        ref={fileInputRef} 
                                        onChange={handleImageChange} 
                                        required
                                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900/50 file:text-blue-300 hover:file:bg-blue-900"
                                    />
                                </div>
                            </div>
                             <div>
                                 <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your Name</label>
                                 <input 
                                    id="name" 
                                    type="text" 
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    placeholder="e.g., Jane Doe"
                                    required 
                                    className="w-full mt-1 p-3 bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400" 
                                />
                             </div>
                             <div>
                                 <label htmlFor="review" className="block text-sm font-medium text-gray-300">Review</label>
                                 <textarea 
                                    id="review" 
                                    rows={4}
                                    value={newReview.quote}
                                    onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                                    placeholder="Tell us what you think..."
                                    required 
                                    className="w-full mt-1 p-3 bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                                ></textarea>
                             </div>
                             <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-600">
                                 Submit Review
                             </button>
                         </form>
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;