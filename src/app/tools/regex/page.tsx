"use client";

import { useState, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import Link from "next/link";

export default function RegexTool() {
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState("g");
    const [testText, setTestText] = useState("");

    const { html, error } = useMemo(() => {
        if (!pattern || !testText) return { html: testText, error: "" };

        try {
            const regex = new RegExp(pattern, flags);
            let matchesCount = 0;

            // Basic syntax replacement to highlight matches
            // Using a simple split/join strategy to avoid complex HTML injection issues
            // For a production app a more robust parsing mechanism might be needed,
            // but this works for a simple tool.

            let lastIndex = 0;
            let result = [];
            regex.lastIndex = 0; // Reset just in case

            let match;
            if (regex.global) {
                while ((match = regex.exec(testText)) !== null) {
                    if (match[0].length === 0) {
                        // Avoid infinite loops with zero-length matches
                        regex.lastIndex++;
                        continue;
                    }
                    matchesCount++;
                    result.push(testText.substring(lastIndex, match.index));
                    result.push(
                        <mark key={`m${matchesCount}`} className="bg-[var(--color-gruv-purple)] text-[var(--background)] px-1 rounded">
                            {match[0]}
                        </mark>
                    );
                    lastIndex = regex.lastIndex;
                }
                result.push(testText.substring(lastIndex));
            } else {
                match = regex.exec(testText);
                if (match) {
                    matchesCount = 1;
                    result.push(testText.substring(0, match.index));
                    result.push(
                        <mark key="m1" className="bg-[var(--color-gruv-purple)] text-[var(--background)] px-1 rounded">
                            {match[0]}
                        </mark>
                    );
                    result.push(testText.substring(match.index + match[0].length));
                } else {
                    result.push(testText);
                }
            }

            return {
                html: result.length > 0 ? result : testText,
                error: ""
            };
        } catch (err: any) {
            return { html: testText, error: err.message || "Invalid regular expression" };
        }
    }, [pattern, flags, testText]);

    return (
        <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 selection:bg-[var(--color-gruv-yellow)] selection:text-[var(--background)]">
            <Navigation />
            <div className="flex-1 w-full max-w-3xl flex flex-col items-start mt-24 lg:mt-16">
                <Link href="/tools" className="mb-8 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
                    ← Back to Tools
                </Link>

                <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-gruv-purple)" }}>
                    Regex Checker
                </h1>
                <p className="opacity-70 mb-8">Test your regular expressions against target text.</p>

                <div className="w-full flex flex-col gap-6">
                    <div className="flex gap-4 items-end">
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="text-sm font-bold opacity-70">Expression</label>
                            <div className="flex items-center gap-2 border border-opacity-20 border-[var(--foreground)] p-2 rounded focus-within:border-[var(--color-gruv-purple)] focus-within:border-opacity-100 transition-colors">
                                <span className="opacity-50 font-mono">/</span>
                                <input
                                    type="text"
                                    value={pattern}
                                    onChange={(e) => setPattern(e.target.value)}
                                    className="flex-1 bg-transparent focus:outline-none font-mono"
                                    placeholder="[a-z0-9]+"
                                    spellCheck={false}
                                />
                                <span className="opacity-50 font-mono">/</span>
                            </div>
                        </div>
                        <div className="w-24 flex flex-col gap-2">
                            <label className="text-sm font-bold opacity-70">Flags</label>
                            <input
                                type="text"
                                value={flags}
                                onChange={(e) => setFlags(e.target.value)}
                                className="w-full bg-transparent border border-opacity-20 border-[var(--foreground)] p-2 rounded focus:outline-none focus:border-[var(--color-gruv-purple)] transition-colors focus:border-opacity-100 font-mono"
                                placeholder="gmi"
                                spellCheck={false}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-[var(--color-gruv-red)] text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold opacity-70">Test String</label>
                        <textarea
                            value={testText}
                            onChange={(e) => setTestText(e.target.value)}
                            className="w-full min-h-[150px] p-4 bg-transparent border border-opacity-20 border-[var(--foreground)] rounded focus:outline-none focus:border-[var(--color-gruv-purple)] transition-colors focus:border-opacity-100 font-mono resize-y"
                            placeholder="Enter text to test against..."
                            spellCheck={false}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold opacity-70">Result</label>
                        <div
                            className="w-full min-h-[150px] p-4 bg-black/10 dark:bg-white/5 border border-opacity-10 border-[var(--foreground)] rounded font-mono break-all whitespace-pre-wrap"
                        >
                            {html || <span className="opacity-30">Matched text will be highlighted here...</span>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
