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
            <Footer onNavigate={handleNavigate} />
        </div>
    );
};

export default App;
