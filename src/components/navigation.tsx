import Link from "next/link";

export function Navigation() {
    return (
        <header className="z-10 w-full max-w-2xl items-center justify-between font-mono text-sm lg:flex">
            <Link href="/" className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 backdrop-blur-md bg-[var(--background)]/50 lg:static lg:w-auto lg:bg-transparent lg:p-0 lg:backdrop-blur-none z-50 transition-opacity hover:opacity-80">
                Sachet Patil
            </Link>
            <div className="fixed bottom-0 left-0 flex h-24 w-full items-end justify-center bg-gradient-to-t from-[var(--background)] to-transparent lg:static lg:h-auto lg:w-auto lg:bg-none z-50">
                <nav className="flex gap-8 p-8 lg:p-0 pointer-events-auto">
                    <Link href="/tools" className="hover:text-[var(--color-gruv-orange)] transition-all duration-300">Tools</Link>
                    <Link href="/blog" className="hover:text-[var(--color-gruv-blue)] transition-all duration-300">Blog</Link>
                    <Link href="/photography" className="hover:text-[var(--color-gruv-green)] transition-all duration-300">Photography</Link>
                </nav>
            </div>
        </header>
    );
}
