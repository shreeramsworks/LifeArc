import React from 'react';
import { articles } from '../data/articles';
import AdSenseBanner from './AdSenseBanner';

interface BlogIndexPageProps {
    onNavigate: (path: string) => void;
}

const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ onNavigate }) => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl mx-auto space-y-12">
                <header className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white">
                        LifeArrc Blog
                    </h1>
                    <p className="mt-2 text-lg text-gray-300">
                        In-depth articles on time, numerology, and personal history.
                    </p>
                </header>

                <AdSenseBanner />

                <div className="space-y-8">
                    {articles.map((article) => {
                        const href = `#/blog/${article.slug}`;
                        return (
                            <article key={article.slug} className="bg-gray-800 rounded-xl border border-gray-700 p-8 shadow-lg">
                                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">
                                    {article.title}
                                </h2>
                                <p className="mt-4 text-gray-300">
                                    {article.summary}
                                </p>
                                <div className="mt-4 text-sm text-gray-300">
                                    <span>By {article.author.name}</span> | <span suppressHydrationWarning>{new Date(article.publishDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <a
                                    href={href}
                                    onClick={(e) => { e.preventDefault(); onNavigate(href); }}
                                    className="mt-6 inline-block text-blue-400 font-semibold hover:underline"
                                >
                                    Read More &raquo;
                                </a>
                            </article>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default BlogIndexPage;
