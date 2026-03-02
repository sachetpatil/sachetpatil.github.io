import { Navigation } from "@/components/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 selection:bg-[var(--color-gruv-yellow)] selection:text-[var(--background)]">
      <Navigation />

      <div className="flex-1 w-full max-w-2xl flex flex-col mt-24 lg:mt-16">
        <article className="w-full space-y-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-8">
            Build for the future. <br className="hidden sm:block" />
            Empower the builders.
          </h1>

          <div className="space-y-6 text-lg sm:text-xl leading-relaxed opacity-90">
            <p>
              Technological leadership is not just about code—it's about <span className="text-[var(--color-gruv-red)]">vision</span>, <span className="text-[var(--color-gruv-aqua)]">culture</span>, and <span className="text-[var(--color-gruv-yellow)]">execution</span>.
            </p>
            <p>
              I build systems that scale and teams that thrive. From zero to one, and one to n.
            </p>
            <p>
              This digital garden is a collection of my work, thoughts, and experiments.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
