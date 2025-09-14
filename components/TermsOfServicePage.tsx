import React from 'react';

const TermsOfServicePage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl mx-auto space-y-8 bg-gray-800 rounded-xl border border-gray-700 p-8">
                <header className="text-center border-b border-gray-700 pb-4">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white">
                        Terms of Service
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </header>
                
                <div className="prose prose-invert max-w-none text-gray-300">
                    <h2 className="text-blue-400">1. Acceptance of Terms</h2>
                    <p>By accessing and using LifeArc (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this particular service, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.</p>
                    
                    <h2 className="text-blue-400">2. Description of Service</h2>
                    <p>LifeArc provides users with a suite of tools for calculating age, tracking family timelines, and exploring personal insights (the "Service"). All calculations and data storage are performed locally on the user's device. No personal data is transmitted to or stored on our servers.</p>
                    
                    <h2 className="text-blue-400">3. User Conduct</h2>
                    <p>You agree to use the Service only for lawful purposes. You are solely responsible for all data you input into the Service. You agree not to use the Service to input any data that is unlawful, harmful, or infringes on the rights of others.</p>

                    <h2 className="text-blue-400">4. Disclaimer of Warranties</h2>
                    <p>The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied. LifeArc does not warrant that the Service will be uninterrupted, error-free, or completely secure. The insights and calculations provided, especially those based on numerology or biorhythms, are for entertainment and informational purposes only and should not be considered as professional, medical, or scientific advice.</p>

                    <h2 className="text-blue-400">5. Limitation of Liability</h2>
                    <p>In no event shall LifeArc, nor its owners or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                    <h2 className="text-blue-400">6. Third-Party Advertising</h2>
                    <p>The Service is supported by advertising from third parties, such as Google AdSense. We are not responsible for the content of these advertisements or the practices of these third-party advertisers. Your interactions with advertisers are solely between you and the advertiser.</p>
                    
                    <h2 className="text-blue-400">7. Modification of Terms</h2>
                    <p>We reserve the right to modify these terms from time to time at our sole discretion. Therefore, you should review this page periodically. Your continued use of the Website or our service after any such change constitutes your acceptance of the new Terms.</p>
                    
                    <h2 className="text-blue-400">8. Governing Law</h2>
                    <p>Any claim relating to LifeArc's website shall be governed by the laws of the service provider's home jurisdiction without regard to its conflict of law provisions.</p>
                </div>
            </main>
        </div>
    );
};
export default TermsOfServicePage;