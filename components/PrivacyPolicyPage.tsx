import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl mx-auto space-y-8 bg-gray-800 rounded-xl border border-gray-700 p-8">
                <header className="text-center border-b border-gray-700 pb-4">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white">
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </header>

                <div className="prose prose-invert max-w-none text-gray-300">
                    <p>Welcome to LifeArc. Your privacy is critically important to us. This Privacy Policy document outlines the types of information that is collected and recorded by LifeArc and how we use it. This app is designed with a "privacy-first" approach.</p>
                    
                    <h2 className="text-blue-400">1. Data We Do Not Collect</h2>
                    <p>The core principle of LifeArc is that your personal data stays with you. We do not have servers that store your personal information.</p>
                    <ul>
                        <li>We do not collect or store your date of birth.</li>
                        <li>We do not collect or store the names, relationships, or dates of birth of your family members.</li>
                        <li>We do not collect or store your IP address or any other personally identifiable information.</li>
                    </ul>

                    <h2 className="text-blue-400">2. Information You Provide & Local Storage</h2>
                    <p>All data you enter into LifeArc, including your date of birth, family member details, and any submitted reviews, is processed and stored <strong>exclusively on your local device</strong> within your web browser's storage (`localStorage`).</p>
                    <ul>
                        <li><strong>Calculations:</strong> All age, timeline, and insight calculations are performed directly in your browser. No data is sent to a server.</li>
                        <li><strong>Data Control:</strong> You have complete control over this data. You can clear it at any time by clearing your browser's cache and site data for this application.</li>
                        <li><strong>No Transmission:</strong> Since the data is never transmitted to us, we cannot see, use, or share it.</li>
                    </ul>

                    <h2 className="text-blue-400">3. Advertising and Cookies</h2>
                    <p>LifeArc uses third-party advertising from Google AdSense to support our site. This is how we are able to offer the tool for free.</p>
                    <ul>
                        <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.</li>
                        <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.</li>
                        <li>These cookies, such as the DoubleClick DART cookie, track your activity across the web but do not store personally identifiable information like your name, email address, or physical address.</li>
                        <li>You may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ads Settings</a>.</li>
                    </ul>
                    <p>For further information, please consult Google's own privacy policy regarding its ad services. Our Privacy Policy does not apply to, and we cannot control the activities of, other advertisers or web sites.</p>

                    <h2 className="text-blue-400">4. Third-Party Services</h2>
                    <p>We use content delivery networks (CDNs) to serve application files (like fonts and scripts) to you efficiently. These services may collect basic, non-personally identifiable information as part of their standard logging procedures.</p>

                    <h2 className="text-blue-400">5. Children's Information</h2>
                    <p>LifeArc does not knowingly collect any Personal Identifiable Information from children under the age of 13. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records (which, in this case, would mean guiding you on how to clear the browser data).</p>

                    <h2 className="text-blue-400">6. Consent</h2>
                    <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

                    <h2 className="text-blue-400">7. Changes to this Policy</h2>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

                </div>
            </main>
        </div>
    );
};
export default PrivacyPolicyPage;