"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import Link from "next/link";

export default function UrlTool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const handleProcess = (text: string, currentMode: "encode" | "decode") => {
        setInput(text);
        setError("");

        try {
            if (!text) {
                setOutput("");
                return;
            }
            if (currentMode === "encode") {
                setOutput(encodeURIComponent(text));
            } else {
                setOutput(decodeURIComponent(text));
            }
        } catch (err) {
            setOutput("");
            setError("Invalid input for URL decoding.");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 selection:bg-[var(--color-gruv-yellow)] selection:text-[var(--background)]">
            <Navigation />
            <div className="flex-1 w-full max-w-3xl flex flex-col items-start mt-24 lg:mt-16">
                <Link href="/tools" className="mb-8 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
                    ← Back to Tools
                </Link>

                <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-gruv-blue)" }}>
                    URL Encoder/Decoder
                </h1>

                <div className="w-full flex gap-4 mb-8">
                    <button
                        onClick={() => { setMode("encode"); handleProcess(input, "encode"); }}
                        className={`px-4 py-2 rounded transition-all duration-300 font-bold border ${mode === 'encode' ? 'border-[var(--color-gruv-blue)] text-[var(--color-gruv-blue)]' : 'border-[var(--foreground)] opacity-50 hover:opacity-100'}`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => { setMode("decode"); handleProcess(input, "decode"); }}
                        className={`px-4 py-2 rounded transition-all duration-300 font-bold border ${mode === 'decode' ? 'border-[var(--color-gruv-blue)] text-[var(--color-gruv-blue)]' : 'border-[var(--foreground)] opacity-50 hover:opacity-100'}`}
                    >
                        Decode
                    </button>
                </div>

                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold opacity-70">Input</label>
                        <textarea
                            value={input}
                            onChange={(e) => handleProcess(e.target.value, mode)}
                            className="w-full min-h-[150px] p-4 bg-transparent border border-opacity-20 border-[var(--foreground)] rounded focus:outline-none focus:border-[var(--color-gruv-blue)] transition-colors focus:border-opacity-100 font-mono resize-y"
                            placeholder={`Enter URL text to ${mode}...`}
                        />
                    </div>

                    {error && (
                        <div className="text-[var(--color-gruv-red)] text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold opacity-70">Output</label>
                            {output && (
                                <button
                                    onClick={() => navigator.clipboard.writeText(output)}
                                    className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                                >
                                    Copy to Clipboard
                                </button>
                            )}
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            className="w-full min-h-[150px] p-4 bg-transparent border border-opacity-20 border-[var(--foreground)] rounded text-[var(--color-gruv-blue)] font-mono resize-y break-all"
                            placeholder="Result will appear here..."
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
