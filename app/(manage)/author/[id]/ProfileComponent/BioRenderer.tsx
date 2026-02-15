import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import rehypeHighlightMinimal from '@/lib/rehype-highlight-minimal';
import rehypeRaw from 'rehype-raw';
import remarkEmoji from 'remark-emoji';
import 'highlight.js/styles/github-dark.css';

export const BioRenderer = ({ bio }: { bio: string }) => {
    return (
        <ReactMarkdown
            className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-lg"
            remarkPlugins={[remarkBreaks, remarkGfm, remarkDirective, remarkEmoji]}
            rehypePlugins={[rehypeHighlightMinimal, rehypeRaw]}
            components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-semibold" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-500 underline" target="_blank" {...props} />,
                code: ({ node, className, children, ...props }) => (
                    <code className={`bg-gray-800 text-white px-2 py-1 rounded ${className || ''}`} {...props}>
                        {children}
                    </code>
                ),
                div: ({ node, className, children, ...props }) => {
                    if (className?.includes("info")) {
                        return <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3">{children}</div>;
                    }
                    if (className?.includes("warning")) {
                        return <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3">{children}</div>;
                    }
                    return <div {...props}>{children}</div>;
                },
                iframe: ({ node, ...props }) => (
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe {...props} className="w-full h-full rounded-lg"></iframe>
                    </div>
                )
            }}
        >
            {bio}
        </ReactMarkdown>
    );
};
