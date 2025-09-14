import React from 'react';

const AboutUsPage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl mx-auto space-y-8 bg-gray-800 rounded-xl border border-gray-700 p-8">
                <header className="text-center border-b border-gray-700 pb-4">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white">
                        About LifeArc
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">
                        Charting Your Personal Universe
                    </p>
                </header>

                <div className="prose prose-invert max-w-none text-gray-300">
                    <h2 className="text-blue-400">Our Mission</h2>
                    <p>LifeArc was born from a simple yet profound idea: to provide a suite of tools that allows you to explore, understand, and appreciate the intricate timeline of your life. We believe that by visualizing our journey—from the seconds we've lived to the generations that precede us—we gain a deeper perspective on our own existence. Our mission is to offer these powerful insights through a beautiful, intuitive, and completely private interface.</p>
                    
                    <h2 className="text-blue-400">Privacy by Design</h2>
                    <p>In an age where personal data is a commodity, LifeArc stands apart. Our core philosophy is "privacy by design." We have architected this application so that <strong>none of your personal data ever leaves your device</strong>. All calculations are performed within your browser, and all information you enter is stored locally.</p>
                    <ul>
                        <li><strong>No Servers, No Databases:</strong> We don't have user accounts or databases that store your information. Your date of birth, family details, and insights remain yours and yours alone.</li>
                        <li><strong>You Are in Control:</strong> The data exists only on your computer, accessible only by you. Clearing your browser's data for this site permanently erases all your information.</li>
                    </ul>
                    <p>This commitment to privacy is non-negotiable. It allows you to explore sensitive family information with the absolute certainty that it remains confidential.</p>

                    <h2 className="text-blue-400">The Technology</h2>
                    <p>We are passionate about precision. LifeArc utilizes high-precision calculations based on Julian Day Numbers to avoid common errors found in other age calculators, ensuring accuracy regardless of timezones or daylight saving time. Our tools are built with modern web technologies to be fast, responsive, and accessible on any device.</p>
                    <p>We are constantly refining our tools and expanding our library of insights to provide you with an ever-evolving platform for personal discovery.</p>
                    
                    <h2 className="text-blue-400">Our Commitment to You</h2>
                    <p>LifeArc is a passion project dedicated to helping you chart your personal universe. We are committed to maintaining a high-quality, free-to-use service supported transparently through non-intrusive advertising. Thank you for joining us on this journey of discovery.</p>
                </div>
            </main>
        </div>
    );
};
export default AboutUsPage;