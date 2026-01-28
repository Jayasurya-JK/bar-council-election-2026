import CandidateHero from '@/components/CandidateHero';
import SearchSection from '@/components/SearchSection';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Hero Section */}
            <CandidateHero />

            {/* Search Section */}
            <SearchSection />

            {/* Footer with Gold Accent */}
            <footer className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-10 border-t border-amber-500/10 mt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-6xl mx-auto text-center space-y-3">
                    <p className="text-slate-300 text-sm md:text-base">
                        © {new Date().getFullYear()} Dr. Tai P. Pandian. All rights reserved.
                    </p>
                    <p className="text-slate-400 text-xs md:text-sm">
                        Designed and developed by{' '}
                        <a
                            href="https://jaywebstudio.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 hover:text-amber-300 font-semibold transition-colors underline decoration-amber-400/30 hover:decoration-amber-300/50"
                        >
                            Jay webstudio
                        </a>
                    </p>
                </div>
            </footer>
        </main>
    );
}
