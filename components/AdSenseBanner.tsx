import React, { useEffect } from 'react';

const AdSenseBanner: React.FC = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="my-8 flex justify-center">
            <div className="w-full max-w-4xl bg-gray-800 border border-gray-700 p-4 rounded-lg text-center text-gray-300">
                <div className="text-xs mb-2 flex justify-between items-center">
                    <span>Advertisement</span>
                    <div className="flex items-center gap-1">
                        <span className="text-xs">AdChoices</span>
                        <i className="fa-solid fa-info-circle"></i>
                    </div>
                </div>
                <ins className="adsbygoogle"
                     title="Advertisement"
                     style={{ display: 'block' }}
                     data-ad-client="ca-pub-4565198132863159"
                     data-ad-slot="7793090764"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            </div>
        </div>
    );
};

export default AdSenseBanner;