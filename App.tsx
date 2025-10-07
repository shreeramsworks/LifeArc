import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ToolsView from './components/ToolsView';
import InsightsView from './components/InsightsView';
import Footer from './components/Footer';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import AboutUsPage from './components/AboutUsPage';
import ContactUsPage from './components/ContactUsPage';
import BlogIndexPage from './components/BlogIndexPage';
import BlogPostPage from './components/BlogPostPage';
import { articles } from './data/articles';

const App: React.FC = () => {
    type Page = 'home' | 'tools' | 'insights' | 'privacy' | 'terms' | 'about' | 'contact' | 'blog';
    type Tool = 'ageCalculator' | 'familyTracker';

    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [activeTool, setActiveTool] = useState<Tool>('ageCalculator');
    const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(null);

    const handleNavigate = (hash: string) => {
        const newHash = hash.startsWith('#') ? hash : `#${hash}`;
        if (window.location.hash === newHash) return;
        window.location.hash = newHash;
    };

    useEffect(() => {
        const getPageFromHash = () => {
            const hash = window.location.hash.substring(1); // remove '#'
            const segments = hash.split('/').filter(Boolean);

            // Handle root case where hash is empty or just '/'
            if (segments.length === 0 || (segments.length === 1 && segments[0] === '')) {
                setCurrentPage('home');
                setActiveTool('ageCalculator');
                setActiveArticleSlug(null);
                window.scrollTo(0, 0);
                return;
            }

            const pageSegment = (segments[0] as Page);
            const paramSegment = segments[1] || null;

            const validPages: Page[] = ['home', 'tools', 'insights', 'privacy', 'terms', 'about', 'contact', 'blog'];
            const validTools: Tool[] = ['ageCalculator', 'familyTracker'];

            if (validPages.includes(pageSegment)) {
                setCurrentPage(pageSegment);

                if (pageSegment === 'tools') {
                    const isValidTool = paramSegment && validTools.includes(paramSegment as Tool);
                    setActiveTool(isValidTool ? paramSegment as Tool : 'ageCalculator');
                    if (!isValidTool) {
                        // Correct URL for invalid tool path
                        window.location.hash = '#/tools/ageCalculator';
                    }
                    setActiveArticleSlug(null);
                } else if (pageSegment === 'blog') {
                    const articleExists = paramSegment ? articles.some(a => a.slug === paramSegment) : false;
                    if (paramSegment && !articleExists) {
                        // Correct URL for invalid blog slug
                        window.location.hash = '#/blog';
                        setActiveArticleSlug(null);
                    } else {
                        setActiveArticleSlug(paramSegment || null);
                    }
                    setActiveTool('ageCalculator');
                } else {
                    setActiveTool('ageCalculator');
                    setActiveArticleSlug(null);
                }
            } else {
                // If path is not found, redirect to home
                window.location.hash = '#/';
                setCurrentPage('home');
                setActiveTool('ageCalculator');
                setActiveArticleSlug(null);
            }
            window.scrollTo(0, 0);
        };

        window.addEventListener('hashchange', getPageFromHash);
        getPageFromHash(); // Handle initial page load

        return () => window.removeEventListener('hashchange', getPageFromHash);
    }, []);

    // SEO: Dynamically update title, meta description, and JSON-LD schema
    useEffect(() => {
        const setMetaTag = (propType: 'name' | 'property', propValue: string, content: string) => {
            let element = document.querySelector(`meta[${propType}='${propValue}']`) as HTMLMetaElement | null;
            if (element) {
                element.setAttribute('content', content);
            }
        };
        
        const setCanonicalUrl = (url: string) => {
            let element = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
            if (element) {
                element.href = url;
            }
        };

        const setDynamicSchema = (schema: object | null) => {
            const element = document.getElementById('dynamic-schema') as HTMLScriptElement | null;
            if (element) {
                element.textContent = schema ? JSON.stringify(schema) : '';
            }
        };

        const baseUrl = 'https://lifearrc.app';
        const hashPath = window.location.hash.substring(1) || '/';
        const pageUrl = baseUrl + '/' + (hashPath === '/' ? '' : `#${hashPath}`);

        let title = 'Private Age Calculator, Family Tree & Numerology Tools | LifeArrc';
        let description = "Discover personal insights with complete privacy. Our tools are 100% browser-based with zero data collection. Calculate your age, track your family, and explore Vedic numerology, all with guaranteed anonymity.";
        let dynamicSchema: object | null = null;

        switch (currentPage) {
            case 'tools':
                if (activeTool === 'familyTracker') {
                    title = 'Private Family Tracker - Secure Family Timeline | No Data Collection';
                    description = 'Build your family timeline privately. Track ages, milestones, and statistics with complete privacy. All data stays in your browser - guaranteed.';
                    dynamicSchema = {
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Build a Private Family Timeline",
                        "description": "A step-by-step guide to creating a secure family tree using the LifeArrc private family tracker, with no data collection.",
                        "step": [
                            {"@type": "HowToStep", "name": "Add Members", "text": "Add family members including their name, relation, and date of birth."},
                            {"@type": "HowToStep", "name": "View Statistics", "text": "Automatically view live-updating statistics like mean/median age and generational breakdowns."},
                            {"@type": "HowToStep", "name": "Calculate Age Gaps", "text": "Compare any two members to see the precise age gap between them."},
                            {"@type": "HowToStep", "name": "Track Milestones", "text": "Get live countdowns for upcoming birthdays and important milestones."}
                        ]
                    };
                } else {
                    title = 'Precise Age Calculator - Calculate Age to the Second | LifeArrc';
                    description = 'Calculate your exact age in years, months, days, hours, and seconds. Includes birthday countdown and world clock. 100% private - no data stored.';
                     dynamicSchema = {
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Calculate Your Precise Age to the Second",
                        "description": "Use our secure age calculator to find your exact age in multiple time units without storing any personal data.",
                        "step": [
                            {"@type": "HowToStep", "name": "Enter Birth Date and Time", "text": "Input your exact date and time of birth."},
                            {"@type": "HowToStep", "name": "Calculate", "text": "Click the calculate button to see your age broken down into years, months, days, hours, minutes, and seconds."},
                            {"@type": "HowToStep", "name": "View Insights", "text": "Explore your birthday countdown and see your birth moment in different timezones around the world."}
                        ]
                    };
                }
                break;
            case 'insights':
                title = 'Private Vedic Numerology Calculator | Anonymous Readings';
                description = 'Get your Vedic Destiny Number (Moolank), planetary influences, and favorable days with complete anonymity. No personal data stored - all calculations done in your browser.';
                break;
            case 'blog':
                if (activeArticleSlug) {
                    const article = articles.find(a => a.slug === activeArticleSlug);
                    if (article) {
                        title = `${article.title} | LifeArrc Blog`;
                        description = article.summary.length > 155 ? article.summary.substring(0, 152) + '...' : article.summary;
                        dynamicSchema = {
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "headline": article.title,
                            "author": { "@type": "Organization", "name": "LifeArrc" },
                            "publisher": { "@type": "Organization", "name": "LifeArrc", "logo": { "@type": "ImageObject", "url": "https://lifearrc.app/logo.png" } },
                            "datePublished": article.publishDate,
                            "description": article.summary,
                        };
                    }
                } else {
                    title = 'LifeArrc Blog | In-depth Articles on Time, Privacy & Numerology';
                    description = 'Explore articles on time perception, numerology, genealogy, and personal history from our team of experts at the LifeArrc blog.';
                }
                break;
            case 'about':
                title = 'About Us | LifeArrc';
                description = 'Learn about the mission and privacy-first philosophy behind LifeArrc. Meet the team dedicated to helping you chart your personal universe.';
                break;
            case 'contact':
                title = 'Contact Us | LifeArrc';
                description = 'Have questions, feedback, or suggestions for LifeArrc? We would love to hear from you. Get in touch with our support team.';
                break;
            case 'privacy':
                title = 'Privacy Policy | LifeArrc';
                description = 'Review the LifeArrc privacy policy. We are committed to a privacy-by-design approach where your data is never stored on our servers.';
                break;
            case 'terms':
                title = 'Terms of Service | LifeArrc';
                description = 'Read the terms of service for using the LifeArrc application and its suite of tools.';
                break;
        }

        document.title = title;
        setMetaTag('name', 'description', description);
        setMetaTag('property', 'og:title', title);
        setMetaTag('property', 'og:description', description);
        setMetaTag('property', 'og:url', pageUrl);
        setMetaTag('name', 'twitter:title', title);
        setMetaTag('name', 'twitter:description', description);
        setCanonicalUrl(pageUrl);
        setDynamicSchema(dynamicSchema);

    }, [currentPage, activeTool, activeArticleSlug]);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'tools':
                return <ToolsView activeTool={activeTool} onNavigate={handleNavigate} />;
            case 'insights':
                return <InsightsView />;
            case 'privacy':
                return <PrivacyPolicyPage />;
            case 'terms':
                return <TermsOfServicePage />;
            case 'about':
                return <AboutUsPage />;
            case 'contact':
                return <ContactUsPage />;
            case 'blog':
                if (activeArticleSlug) {
                    const article = articles.find(a => a.slug === activeArticleSlug);
                    if (article) {
                        return <BlogPostPage article={article} onNavigate={handleNavigate} />;
                    }
                }
                return <BlogIndexPage onNavigate={handleNavigate} />;
            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    }

    return (
        <div className="min-h-screen font-sans bg-gray-900 text-gray-200">
            <Navbar currentPage={currentPage} activeTool={activeTool} onNavigate={handleNavigate} />
            <div className="pt-16"> {/* Adjust padding for fixed navbar height */}
                {renderPage()}
            </div>
            <Footer onNavigate={handleNavigate} />
        </div>
    );
};

export default App;
