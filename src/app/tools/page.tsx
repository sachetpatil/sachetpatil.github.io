import { Navigation } from "@/components/navigation";
import Link from "next/link";

const TOOLS = [
    {
        name: "Base64 Encoder/Decoder",
        path: "/tools/base64",
        description: "Encode and decode Base64 strings instantly.",
        color: "var(--color-gruv-yellow)"
    },
    {
        name: "URL Encoder/Decoder",
        path: "/tools/url",
        description: "Safely encode and decode URL parameters.",
        color: "var(--color-gruv-blue)"
    },
    {
        name: "Regex Checker",
        path: "/tools/regex",
        description: "Test regular expressions against target text.",
        color: "var(--color-gruv-purple)"
    },
    {
        name: "Diff Checker",
        path: "/tools/diff",
        description: "Compare two pieces of text side-by-side.",
        color: "var(--color-gruv-green)"
    },
    {
        name: "ASCII Table Generator",
        path: "/tools/ascii-table",
        description: "Convert CSV data into a nicely formatted ASCII table.",
        color: "var(--color-gruv-orange)"
    }
];

export default function ToolsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 selection:bg-[var(--color-gruv-yellow)] selection:text-[var(--background)]">
            <Navigation />
            <div className="flex-1 w-full max-w-2xl flex flex-col items-start mt-24 lg:mt-16">
                <h1 className="text-3xl font-bold mb-8">Tools</h1>
                <p className="opacity-70 mb-12">
                    A collection of simple, no-nonsense developer tools. Local-first, minimal tracking.
                </p>

                <div className="w-full flex flex-col gap-6">
                    {TOOLS.map((tool) => (
                        <Link
                            key={tool.path}
                            href={tool.path}
                            className="group flex flex-col p-6 rounded-lg border border-opacity-10 border-[var(--foreground)] hover:border-opacity-30 transition-all duration-300"
                        >
                            <h2
                                className="text-xl font-bold mb-2 transition-colors duration-300"
                                style={{ color: tool.color }}
                            >
                                {tool.name}
                            </h2>
                            <p className="opacity-70 text-sm">
                                {tool.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
