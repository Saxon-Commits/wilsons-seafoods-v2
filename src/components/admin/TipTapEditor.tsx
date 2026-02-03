'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Link from '@tiptap/extension-link';

interface TipTapEditorProps {
    content: string;
    onChange: (html: string) => void;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableCell,
            TableHeader,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content,
        immediatelyRender: false, // Fix SSR hydration issues
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div className="border border-slate-600 rounded-lg overflow-hidden bg-slate-800">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 bg-slate-700 border-b border-slate-600">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                        }`}
                    type="button"
                >
                    <strong>B</strong>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                        }`}
                    type="button"
                >
                    <em>I</em>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                        }`}
                    type="button"
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                        }`}
                    type="button"
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                        }`}
                    type="button"
                >
                    • List
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                        }`}
                    type="button"
                >
                    1. List
                </button>
                <button
                    onClick={setLink}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive('link') ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                        }`}
                    type="button"
                >
                    🔗 Link
                </button>
                <button
                    onClick={addImage}
                    className="px-3 py-1 rounded text-sm bg-slate-600 text-slate-200 hover:bg-slate-500"
                    type="button"
                >
                    🖼️ Image
                </button>
                <button
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                    className="px-3 py-1 rounded text-sm bg-slate-600 text-slate-200 hover:bg-slate-500"
                    type="button"
                >
                    📊 Table
                </button>
                {editor.isActive('table') && (
                    <>
                        <button
                            onClick={() => editor.chain().focus().addColumnAfter().run()}
                            className="px-2 py-1 rounded text-xs bg-slate-600 text-slate-200 hover:bg-slate-500"
                            type="button"
                        >
                            + Col
                        </button>
                        <button
                            onClick={() => editor.chain().focus().deleteColumn().run()}
                            className="px-2 py-1 rounded text-xs bg-red-600 text-white hover:bg-red-700"
                            type="button"
                        >
                            - Col
                        </button>
                        <button
                            onClick={() => editor.chain().focus().addRowAfter().run()}
                            className="px-2 py-1 rounded text-xs bg-slate-600 text-slate-200 hover:bg-slate-500"
                            type="button"
                        >
                            + Row
                        </button>
                        <button
                            onClick={() => editor.chain().focus().deleteRow().run()}
                            className="px-2 py-1 rounded text-xs bg-red-600 text-white hover:bg-red-700"
                            type="button"
                        >
                            - Row
                        </button>
                    </>
                )}
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="tiptap-editor p-4 min-h-[400px] focus:outline-none"
            />
        </div>
    );
};

export default TipTapEditor;
