'use client';

import Image from 'next/image';

export default function CandidateHero() {
    return (
        <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-6xl mx-auto">
                {/* Title with Soft Gold Accent */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 leading-tight">
                    <span className="bg-gradient-to-r from-amber-300/90 via-amber-200/90 to-amber-300/90 bg-clip-text text-transparent">
                        Tamil Nadu & Puducherry
                    </span>
                    <br className="md:hidden" />
                    <span className="text-white"> Bar Council Election 2026</span>
                </h1>

                <div className="flex flex-col md:flex-row md:items-start md:gap-12 lg:gap-16">
                    {/* Image with Gold Ring */}
                    <div className="flex-shrink-0 mx-auto md:mx-0 mb-8 md:mb-0">
                        <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden ring-4 ring-amber-500/40 shadow-2xl shadow-amber-500/20">
                            <Image
                                src="/images/photo.jpeg"
                                alt="Dr. Tai P. Pandian"
                                fill
                                sizes="(max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 space-y-6 md:space-y-8">
                        {/* Name & Title */}
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-300/90 to-amber-200/90 bg-clip-text text-transparent mb-3">
                                Dr. Tai P. Pandian
                            </h2>
                            <div className="text-amber-300/90 font-semibold text-lg md:text-xl">
                                Advocate, Madras High Court
                            </div>
                        </div>

                        {/* About */}
                        <div className="space-y-4 text-slate-200 text-base md:text-lg leading-relaxed">
                            <p>
                                <span className="text-2xl mr-2">⚖️</span>
                                Welcome to the official channel of <strong className="text-amber-300">Adv. TAI Pandian</strong>.
                                Specializing in Civil, Family & Commercial Law at the Madras High Court, Chennai.
                            </p>
                            <p>
                                <span className="text-2xl mr-2">💡</span>
                                <strong className="text-amber-300">My Mission:</strong> To make law simple and accessible for everyone. Sharing legal awareness in Tamil & English to help you understand your rights, duties, and remedies.
                            </p>
                        </div>

                        {/* Contact Information with Gold Accents */}
                        <div className="pt-6 border-t border-amber-500/20">
                            <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center">
                                <span className="w-1 h-6 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full mr-3"></span>
                                Contact Information
                            </h3>
                            <div className="grid gap-3">
                                <a href="mailto:tai.advocatepandian@gmail.com" className="flex items-center p-3 md:p-4 bg-slate-800/50 rounded-xl border border-amber-500/20 hover:border-amber-400/50 hover:bg-slate-800/70 transition-all group">
                                    <span className="bg-amber-900/30 p-2 rounded-md mr-3 text-xl group-hover:scale-110 transition-transform">📩</span>
                                    <span className="text-slate-200 group-hover:text-amber-300 transition-colors truncate text-sm md:text-base">tai.advocatepandian@gmail.com</span>
                                </a>
                                <div className="grid grid-cols-2 gap-3">
                                    <a href="https://linkedin.com/in/tai-pandian-482538380" target="_blank" rel="noopener" className="flex items-center justify-center p-3 md:p-4 bg-slate-800/50 rounded-xl border border-amber-500/20 hover:border-[#0077b5] hover:bg-slate-800/70 transition-all text-slate-200 hover:text-amber-300 text-sm md:text-base">
                                        <span className="mr-2">🔗</span> LinkedIn
                                    </a>
                                    <a href="https://x.com/adv_taipandian" target="_blank" rel="noopener" className="flex items-center justify-center p-3 md:p-4 bg-slate-800/50 rounded-xl border border-amber-500/20 hover:border-[#1DA1F2] hover:bg-slate-800/70 transition-all text-slate-200 hover:text-amber-300 text-sm md:text-base">
                                        <span className="mr-2 font-bold text-lg">𝕏</span> X (Twitter)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
