import { visit } from 'unist-util-visit';
import { createLowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import markdown from 'highlight.js/lib/languages/markdown';
import sql from 'highlight.js/lib/languages/sql';

// Create a lowlight instance with only the languages we need
const lowlight = createLowlight();
lowlight.register('javascript', js);
lowlight.register('typescript', ts);
lowlight.register('python', python);
lowlight.register('xml', xml);
lowlight.register('css', css);
lowlight.register('json', json);
lowlight.register('bash', bash);
lowlight.register('markdown', markdown);
lowlight.register('sql', sql);

interface Options {
    prefix?: string;
}

export default function rehypeHighlightMinimal(options: Options = {}) {
    const prefix = options.prefix || 'language-';

    return (tree: any) => {
        visit(tree, 'element', (node: any, index: any, parent: any) => {
            if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
                return;
            }

            const className = node.properties?.className || [];
            let lang = '';

            for (const cls of className) {
                if (String(cls).startsWith(prefix)) {
                    lang = String(cls).slice(prefix.length);
                    break;
                }
            }

            if (!lang) return;

            try {
                // Check if language is registered, otherwise fallback or ignore
                if (!lowlight.registered(lang)) {
                    // console.warn(`Language '${lang}' not registered in lowlight minimal`);
                    return;
                }

                const result = lowlight.highlight(lang, toString(node));
                node.children = result.children;
            } catch (err) {
                // Ignore errors (e.g., unknown language if check failed)
                console.error('Highlighting error:', err);
            }
        });
    };
}

function toString(node: any): string {
    let text = '';
    if (node.type === 'text') {
        text += node.value;
    } else if (node.children) {
        for (const child of node.children) {
            text += toString(child);
        }
    }
    return text;
}
