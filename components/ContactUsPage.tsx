import React from 'react';

const ContactUsPage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl mx-auto space-y-8 bg-gray-800 rounded-xl border border-gray-700 p-8">
                <header className="text-center border-b border-gray-700 pb-4">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white">
                        Contact Us
                    </h1>
                    <p className="mt-2 text-lg text-gray-300">
                        We'd love to hear from you.
                    </p>
                </header>

                <div className="prose prose-invert max-w-none text-gray-300 text-center">
                    <p>If you have any questions, feedback, or suggestions for LifeArc, please don't hesitate to reach out. Your input helps us improve and grow the platform for everyone.</p>
                    
                    <div className="mt-8">
                        <p className="text-lg">For all inquiries, please email us at:</p>
                        <a 
                            href="mailto:support@lifearc.app" 
                            className="text-2xl font-bold text-blue-400 hover:text-blue-300 hover:underline"
                        >
                            support@lifearc.app
                        </a>
                    </div>

                    <p className="mt-8 text-gray-300">We do our best to respond to all emails within 48 business hours. Thank you for your interest in LifeArc!</p>
                </div>
            </main>
        </div>
    );
};
export default ContactUsPage;