import React from 'react';
import { Article } from '../data/articles';
import AdSenseBanner from './AdSenseBanner';

interface BlogPostPageProps {
    article: Article;
    onNavigateBack: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ article, onNavigateBack }) => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl mx-auto">
                <button
                    onClick={onNavigateBack}
                    className="mb-8 text-blue-400 font-semibold hover:underline"
                >
                    &laquo; Back to Blog Index
                </button>
                <article className="bg-gray-800 rounded-xl border border-gray-700 p-8 sm:p-12 shadow-lg">
                    <header>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                            {article.title}
                        </h1>
                    </header>
                    <div className="my-8 border-t border-gray-700"></div>
                    {article.content}
                </article>

                <AdSenseBanner />
            </main>
        </div>
    );
};

export default BlogPostPage;
