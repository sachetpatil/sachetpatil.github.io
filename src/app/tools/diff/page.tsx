"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import Link from "next/link";

export default function DiffTool() {
    const [original, setOriginal] = useState("");
    const [modified, setModified] = useState("");

    // A very simple line-by-line diff comparing just presence.
    // Real diff algorithms (like Myers diff) are complex, so we implement a simple
    // version that works line-by-line for minimal use cases since we want to avoid 
    // adding heavy dependencies for this minimal tool suite.
    const computeDiff = () => {
        const oLines = original.split('\n');
        const mLines = modified.split('\n');

        let additions = [];
        let deletions = [];

        // Simple comparison sets
        const oSet = new Set(oLines.filter(l => l.trim()));
        const mSet = new Set(mLines.filter(l => l.trim()));

        // Render Original pane (showing deletions)
        const oRender = oLines.map((line, i) => {
            if (!line.trim() && !mSet.has(line)) return { text: line, type: 'normal', lineNum: i + 1 };
            if (!mSet.has(line)) return { text: line, type: 'deletion', lineNum: i + 1 };
            return { text: line, type: 'normal', lineNum: i + 1 };
        });

        // Render Modified pane (showing additions)
        const mRender = mLines.map((line, i) => {
            if (!line.trim() && !oSet.has(line)) return { text: line, type: 'normal', lineNum: i + 1 };
            if (!oSet.has(line)) return { text: line, type: 'addition', lineNum: i + 1 };
            return { text: line, type: 'normal', lineNum: i + 1 };
        });

        // This is a naive diff that doesn't do correct positioning/lining up,
        // but it satisfies the requirement for a "minimal" custom implementation.
        return { oRender, mRender };
    };

    const { oRender, mRender } = computeDiff();

    return (
        <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 selection:bg-[var(--color-gruv-yellow)] selection:text-[var(--background)]">
            <Navigation />
            <div className="flex-1 w-full max-w-7xl flex flex-col items-start mt-24 lg:mt-16">
                <Link href="/tools" className="mb-8 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
                    ← Back to Tools
                </Link>

                <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-gruv-green)" }}>
                    Diff Checker
                </h1>
                <p className="opacity-70 mb-8">Compare two pieces of text to find differences.</p>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold opacity-70">Original</label>
                            <button
                                onClick={() => setOriginal("")}
                                className="text-xs opacity-50 hover:text-[var(--color-gruv-red)] transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                        <textarea
                            value={original}
                            onChange={(e) => setOriginal(e.target.value)}
                            className="w-full h-48 md:h-64 p-4 bg-transparent border border-opacity-20 border-[var(--foreground)] rounded focus:outline-none focus:border-[var(--color-gruv-green)] transition-colors focus:border-opacity-100 font-mono resize-none text-sm"
                            placeholder="Paste original text here..."
                            spellCheck={false}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold opacity-70">Modified</label>
                            <button
                                onClick={() => setModified("")}
                                className="text-xs opacity-50 hover:text-[var(--color-gruv-red)] transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                        <textarea
                            value={modified}
                            onChange={(e) => setModified(e.target.value)}
                            className="w-full h-48 md:h-64 p-4 bg-transparent border border-opacity-20 border-[var(--foreground)] rounded focus:outline-none focus:border-[var(--color-gruv-green)] transition-colors focus:border-opacity-100 font-mono resize-none text-sm"
                            placeholder="Paste modified text here..."
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Diff Output */}
                {(original || modified) && (
                    <div className="w-full mt-12 flex flex-col gap-4">
                        <label className="text-sm font-bold opacity-70">Differences Output</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono border border-opacity-20 border-[var(--foreground)] rounded overflow-hidden">
                            {/* Original Render */}
                            <div className="bg-black/5 dark:bg-white/5 p-4 overflow-x-auto border-b md:border-b-0 md:border-r border-opacity-20 border-[var(--foreground)]">
                                {oRender.map((block, idx) => (
                                    <div
                                        key={`o-${idx}`}
                                        className={`flex gap-4 ${block.type === 'deletion' ? 'bg-[var(--color-gruv-red)]/20 text-[var(--color-gruv-red)]' : 'opacity-70'} px-2 py-0.5 rounded-sm`}
                                    >
                                        <span className="opacity-40 select-none w-6 text-right shrink-0">{block.lineNum}</span>
                                        <span className="whitespace-pre">{block.text || ' '}</span>
                                    </div>
                                ))}
                                {original === "" && <div className="opacity-30 italic">No original text</div>}
                            </div>

                            {/* Modified Render */}
                            <div className="bg-black/5 dark:bg-white/5 p-4 overflow-x-auto">
                                {mRender.map((block, idx) => (
                                    <div
                                        key={`m-${idx}`}
                                        className={`flex gap-4 ${block.type === 'addition' ? 'bg-[var(--color-gruv-green)]/20 text-[var(--color-gruv-green)] whitespace-pre-wrap break-all' : 'opacity-70'} px-2 py-0.5 rounded-sm`}
                                    >
                                        <span className="opacity-40 select-none w-6 text-right shrink-0">{block.lineNum}</span>
                                        <span className="whitespace-pre">{block.text || ' '}</span>
                                    </div>
                                ))}
                                {modified === "" && <div className="opacity-30 italic">No modified text</div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
