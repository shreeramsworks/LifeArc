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
                        <div className="mt-4 text-sm text-gray-400">
                            <span>By {article.author.name}</span> | <span suppressHydrationWarning>{new Date(article.publishDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </header>
                    <div className="my-8 border-t border-gray-700"></div>
                    {article.content}
                    <div className="my-8 border-t border-gray-700"></div>
                    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-gray-900 rounded-lg">
                        <img src={article.author.imageUrl} alt={article.author.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-gray-300">About the Author</h4>
                            <p className="text-lg font-semibold text-white">{article.author.name}</p>
                            <p className="text-sm text-gray-400">{article.author.bio}</p>
                        </div>
                    </div>
                </article>

                <AdSenseBanner />
            </main>
        </div>
    );
};

export default BlogPostPage;