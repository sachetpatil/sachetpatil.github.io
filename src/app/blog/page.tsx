import { Navigation } from "@/components/navigation";

export default function BlogPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 selection:bg-[var(--color-gruv-yellow)] selection:text-[var(--background)]">
            <Navigation />
            <div className="flex-1 w-full max-w-2xl flex flex-col items-start mt-24 lg:mt-16">
                <h1 className="text-3xl font-bold mb-8">Blog</h1>
                <p className="opacity-70">Coming soon...</p>
            </div>
        </main>
    );
}
