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
    const [currentPage, setCurrentPage] = useState('home');
    const [activeTool, setActiveTool] = useState<'ageCalculator' | 'familyTracker'>('ageCalculator');
    const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(null);

    type Page = 'home' | 'tools' | 'insights' | 'privacy' | 'terms' | 'about' | 'contact' | 'blog';
    type Tool = 'ageCalculator' | 'familyTracker';

    useEffect(() => {
        const getPageFromHash = () => {
            const hash = window.location.hash.substring(1) || 'home';
            const [page, param] = hash.split('/');

            const validPages = ['home', 'tools', 'insights', 'privacy', 'terms', 'about', 'contact', 'blog'];

            if (validPages.includes(page)) {
                setCurrentPage(page as Page);

                if (page === 'tools') {
                    setActiveTool((param as Tool) || 'ageCalculator');
                }

                if (page === 'blog') {
                    setActiveArticleSlug(param || null);
                } else {
                     // Ensure article slug is cleared when navigating away from blog posts
                    setActiveArticleSlug(null);
                }
            } else {
                setCurrentPage('home'); // Default to home if hash is invalid
            }
            window.scrollTo(0, 0);
        };

        getPageFromHash(); // Handle initial page load

        window.addEventListener('hashchange', getPageFromHash);
        return () => window.removeEventListener('hashchange', getPageFromHash);
    }, []);

    // SEO: Dynamically update title and meta description
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

        const baseUrl = (document.querySelector("link[rel='canonical']")?.getAttribute('href') || 'https://lifearrc.app/').split('#')[0];
        const pageUrl = baseUrl + (window.location.hash || '');


        let title = 'LifeArrc | Interactive Age Calculator & Personal Insights';
        let description = "Chart your universe with LifeArrc. Calculate your precise age, track family milestones, and uncover personal insights. Secure, private, and all in your browser.";

        switch (currentPage) {
            case 'tools':
                if (activeTool === 'familyTracker') {
                    title = 'Family Tracker | LifeArrc';
                    description = 'Build a private family timeline. Track live ages, discover statistics, visualize generational gaps, and never miss a milestone with LifeArrc.';
                } else {
                    title = 'Precision Age Calculator | LifeArrc';
                    description = 'Calculate your age down to the second, countdown to your next birthday, and see your birth moment around the world with unmatched precision.';
                }
                break;
            case 'insights':
                title = 'Chrono Insights | LifeArrc';
                description = 'Discover hidden patterns in your life. Explore biorhythms, find your life-path number, and see your age during major historical events with LifeArrc.';
                break;
            case 'blog':
                if (activeArticleSlug) {
                    const article = articles.find(a => a.slug === activeArticleSlug);
                    if (article) {
                        title = `${article.title} | LifeArrc Blog`;
                        description = article.summary.length > 155 ? article.summary.substring(0, 152) + '...' : article.summary;
                    }
                } else {
                    title = 'LifeArrc Blog | In-depth Articles on Time & Numerology';
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

    }, [currentPage, activeTool, activeArticleSlug]);

    const handleNavigate = (page: Page, options?: Tool | string) => {
        let newHash = `#${page}`;
        if ((page === 'tools' || page === 'blog') && options) {
            newHash += `/${options}`;
        }
        
        // Let the 'hashchange' event listener handle the state update
        window.location.hash = newHash;
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} />;
            case 'tools':
                // The activeTool state is now managed by the hashchange listener
                return <ToolsView activeTool={activeTool} setActiveTool={(tool) => handleNavigate('tools', tool)} />;
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
                        return <BlogPostPage article={article} onNavigateBack={() => handleNavigate('blog')} />;
                    }
                }
                return <BlogIndexPage onNavigate={handleNavigate as (page: 'blog', articleSlug: string) => void} />;
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
            <Footer currentPage={currentPage} onNavigate={handleNavigate} />
        </div>
    );
};

export default App;