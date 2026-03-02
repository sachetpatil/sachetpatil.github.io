import Image from "next/image";
import { Navigation } from "@/components/navigation";

// Placeholder data - in a real app this would come from a CMS or API
const photos = [
    { id: 1, src: "https://drive.google.com/uc?export=view&id=1DnhrjQDr-XLq0Z09Bo66UHRR7laNLy3s", aspectRatio: "aspect-[4/3]", alt: "Old Mill" },
    { id: 2, src: "https://drive.google.com/uc?export=view&id=1n-aewVf6lL3nvzC5kSGRaqLNSI4YoxGr", aspectRatio: "aspect-[4/3]", alt: "Statue" },
];

export default function PhotographyPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 selection:bg-[var(--color-gruv-yellow)] selection:text-[var(--background)]">
            <Navigation />

            <div className="flex-1 w-full max-w-2xl mt-24 lg:mt-16 w-full mb-24">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Photography</h1>
                    <p className="opacity-70 max-w-md">New to Photography. Learning the ropes.</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                    {photos.map((photo, index) => (
                        <div
                            key={photo.id}
                            className={`relative group overflow-hidden rounded-sm ${photo.aspectRatio}`}
                        >
                            <div className="absolute inset-0 bg-[var(--foreground)]/5 z-0 animate-pulse" /> {/* Loading placeholder effect */}
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-xs uppercase tracking-wider">{photo.alt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
