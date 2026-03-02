"use client";

import { useState, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import Link from "next/link";

export default function AsciiTableTool() {
    const [csvInput, setCsvInput] = useState("Name,Age,Role\nAlice,28,Engineer\nBob,34,Designer\nCharlie,29,Product Manager");
    const [separator, setSeparator] = useState(",");
    const [error, setError] = useState("");

    const asciiTable = useMemo(() => {
        if (!csvInput.trim()) {
            setError("");
            return "";
        }

        try {
            // Very simple CSV parser (does not correctly handle quoted commas, but works for basic usage)
            const rows = csvInput.split("\n").map(r => r.split(separator).map(c => c.trim()));
            if (rows.length === 0 || rows.every(r => r.length === 0)) return "";

            // Calculate column widths
            const colWidths: number[] = [];
            rows.forEach(row => {
                row.forEach((cell, i) => {
                    const len = (cell || "").length;
                    colWidths[i] = Math.max(colWidths[i] || 0, len);
                });
            });

            // Make sure every row has the same number of columns by padding, just in case
            const maxCols = colWidths.length;

            const generateSeparatorRow = (widths: number[], start: string, mid: string, end: string, fill: string) => {
                let s = start;
                for (let i = 0; i < widths.length; i++) {
                    s += fill.repeat(widths[i] + 2); // padding
                    if (i < widths.length - 1) {
                        s += mid;
                    }
                }
                s += end;
                return s;
            };

            const headerSep = generateSeparatorRow(colWidths, "+", "+", "+", "-");

            let result = "";
            result += headerSep + "\n";

            rows.forEach((row, rowIndex) => {
                let s = "|";
                for (let i = 0; i < maxCols; i++) {
                    const cell = row[i] || "";
                    const width = colWidths[i] || 0;
                    const paddingStr = " ".repeat(Math.max(0, width - cell.length));
                    // Left align
                    s += ` ${cell}${paddingStr} |`;
                }
                result += s + "\n";

                // Print another separator after header
                if (rowIndex === 0) {
                    result += headerSep + "\n";
                }
            });

            if (rows.length > 1) {
                result += headerSep + "\n"; // final bottom boundary
            }

            setError("");
            return result;
        } catch (err) {
            setError("Could not parse CSV.");
            return "";
        }
    }, [csvInput, separator]);

    return (
        <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 selection:bg-[var(--color-gruv-yellow)] selection:text-[var(--background)]">
            <Navigation />
            <div className="flex-1 w-full max-w-4xl flex flex-col items-start mt-24 lg:mt-16">
                <Link href="/tools" className="mb-8 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
                    ← Back to Tools
                </Link>

                <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--color-gruv-orange)" }}>
                    CSV to ASCII Table
                </h1>
                <p className="opacity-70 mb-8">Convert raw CSV or delimited data into a nicely formatted ASCII table.</p>

                <div className="w-full flex flex-col gap-6">
                    <div className="flex gap-4 items-end">
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="text-sm font-bold opacity-70">Input</label>
                            <textarea
                                value={csvInput}
                                onChange={(e) => setCsvInput(e.target.value)}
                                className="w-full min-h-[150px] p-4 bg-transparent border border-opacity-20 border-[var(--foreground)] rounded focus:outline-none focus:border-[var(--color-gruv-orange)] transition-colors focus:border-opacity-100 font-mono resize-y text-sm"
                                placeholder={"Column1,Column2\nValue1,Value2"}
                                spellCheck={false}
                            />
                        </div>
                    </div>

                    <div className="w-48 flex flex-col gap-2">
                        <label className="text-sm font-bold opacity-70">Delimiter</label>
                        <input
                            type="text"
                            value={separator}
                            onChange={(e) => setSeparator(e.target.value)}
                            className="bg-transparent border border-opacity-20 border-[var(--foreground)] p-2 rounded focus:outline-none focus:border-[var(--color-gruv-orange)] transition-colors focus:border-opacity-100 font-mono text-center text-xl"
                            placeholder=","
                            maxLength={5}
                            spellCheck={false}
                        />
                    </div>

                    {error && (
                        <div className="text-[var(--color-gruv-red)] text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold opacity-70">Ascii Table Output</label>
                            {asciiTable && (
                                <button
                                    onClick={() => navigator.clipboard.writeText(asciiTable)}
                                    className="text-xs opacity-50 hover:opacity-100 transition-opacity font-bold"
                                    style={{ color: "var(--color-gruv-orange)" }}
                                >
                                    Copy to Clipboard
                                </button>
                            )}
                        </div>
                        <div className="w-full p-4 overflow-x-auto bg-black/10 dark:bg-white/5 border border-opacity-20 border-[var(--foreground)] rounded border-[var(--color-gruv-orange)] border-opacity-30">
                            <pre className="font-mono text-sm leading-tight text-[var(--color-gruv-orange)] opacity-90">
                                {asciiTable || <span className="opacity-30 text-[var(--foreground)]">Result will appear here...</span>}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
