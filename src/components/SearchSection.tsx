'use client';

import { useState, useCallback } from 'react';
import { LawyerRecord } from '@/app/api/search/route';

export default function SearchSection() {
    const [searchType, setSearchType] = useState<'enrollment' | 'name'>('name');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<LawyerRecord[]>([]);
    const [suggestions, setSuggestions] = useState<LawyerRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const debounce = (func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const fetchSuggestions = useCallback(
        debounce(async (value: string) => {
            if (searchType === 'enrollment' || !value.trim() || value.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(value)}&type=name`);
                const data = await res.json();
                setSuggestions(data.results || []);
                setShowSuggestions(true);
            } catch (err) {
                console.error('Error fetching suggestions:', err);
            }
        }, 300),
        [searchType]
    );

    const handleInputChange = (value: string) => {
        setQuery(value);
        setError('');
        setResults([]);
        fetchSuggestions(value);
    };

    const handleSearch = async () => {
        if (!query.trim()) {
            setError('Please enter a value to search');
            return;
        }

        setLoading(true);
        setError('');
        setShowSuggestions(false);

        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${searchType}`);
            const data = await res.json();

            if (data.results && data.results.length > 0) {
                setResults(data.results);
            } else {
                setError('No matching records found. Please check spelling.');
                setResults([]);
            }
        } catch (err) {
            setError('Connection failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const selectSuggestion = (record: LawyerRecord) => {
        setShowSuggestions(false);
        setSuggestions([]);
        setResults([record]); // Show only the selected record
        setQuery(record.EnrollmentNo);
        setSearchType('enrollment');
        setError('');
    };

    return (
        <>
            {/* Search Section with Gold Accents */}
            <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-t border-amber-500/10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
                        <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Check Eligibility</span>
                    </h2>
                    <p className="text-slate-300 mb-8 md:mb-10 text-base md:text-lg text-center">Search the Bar Council 2026 Voter Database</p>

                    {/* Search Type Tabs with Gold */}
                    <div className="flex p-1 bg-slate-800/80 rounded-xl mb-6 border border-amber-500/20 backdrop-blur-sm">
                        <button
                            onClick={() => {
                                setSearchType('name');
                                setQuery('');
                                setResults([]);
                                setSuggestions([]);
                                setError('');
                            }}
                            className={`flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${searchType === 'name'
                                ? 'bg-gradient-to-r from-amber-400/80 to-amber-500/80 text-slate-900 shadow-lg shadow-amber-500/20'
                                : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/50'
                                }`}
                        >
                            Search by Name
                        </button>
                        <button
                            onClick={() => {
                                setSearchType('enrollment');
                                setQuery('');
                                setResults([]);
                                setSuggestions([]);
                                setError('');
                            }}
                            className={`flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ${searchType === 'enrollment'
                                ? 'bg-gradient-to-r from-amber-400/80 to-amber-500/80 text-slate-900 shadow-lg shadow-amber-500/20'
                                : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/50'
                                }`}
                        >
                            Enrollment No.
                        </button>
                    </div>

                    {/* Search Input */}
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => handleInputChange(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                onFocus={() => query.length >= 2 && searchType === 'name' && setShowSuggestions(true)}
                                placeholder={
                                    searchType === 'enrollment'
                                        ? 'e.g., 653/1994'
                                        : 'e.g., DHINESH'
                                }
                                className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl text-base md:text-lg bg-slate-800/60 border-2 border-amber-500/30 text-white placeholder:text-slate-400 focus:border-amber-400 focus:bg-slate-800 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all font-medium backdrop-blur-sm"
                            />

                            {/* Search Icon - Gold */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>

                            {/* Suggestions Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute top-full mt-2 w-full bg-slate-800 rounded-xl shadow-2xl border-2 border-amber-500/30 max-h-80 overflow-y-auto z-50 backdrop-blur-md">
                                    {suggestions.map((record, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => selectSuggestion(record)}
                                            className="px-4 py-4 border-b border-amber-500/10 last:border-b-0 hover:bg-amber-500/10 active:bg-amber-500/20 cursor-pointer transition-colors"
                                        >
                                            <div className="font-bold text-white text-base mb-1">{record.Name}</div>
                                            <div className="text-sm text-amber-400 font-medium">Enrollment: {record.EnrollmentNo}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-amber-400/80 to-amber-500/80 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold py-3 md:py-4 rounded-xl text-base md:text-lg shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Searching...
                                </>
                            ) : 'Check Status'}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-start gap-3 backdrop-blur-sm">
                            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <p className="text-red-300 font-medium text-sm">{error}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Results Section */}
            {results.length > 0 && (
                <section className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-t border-amber-500/10">
                    <div className="max-w-6xl mx-auto bg-slate-800/50 rounded-2xl overflow-hidden border border-amber-500/20 backdrop-blur-sm">
                        {/* Result Header with Gold */}
                        <div className="bg-gradient-to-r from-amber-400/80 to-amber-500/80 px-6 md:px-8 py-5 md:py-6 flex items-center justify-between flex-wrap gap-2">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm md:text-base">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {results.length === 1 ? 'Verification Successful' : `${results.length} Matches Found`}
                            </h3>
                            {results.length === 1 && <span className="text-xs font-bold bg-slate-900/20 text-slate-900 px-2 py-1 rounded uppercase tracking-wider">Eligible</span>}
                        </div>

                        {results.length === 1 ? (
                            // Single Result Card
                            <div className="p-6 md:p-8">
                                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                                    <div className="space-y-4 md:space-y-6">
                                        <div>
                                            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Enrollment Number</span>
                                            <span className="text-xl md:text-2xl font-black text-amber-400">{results[0].EnrollmentNo}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Full Name</span>
                                            <span className="text-lg md:text-xl font-bold text-white">{results[0].Name}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Bar Association</span>
                                            <span className="text-base md:text-lg font-medium text-slate-200">{results[0].BarAssociation}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 md:space-y-6">
                                        <div>
                                            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Father's Name</span>
                                            <span className="text-base md:text-lg font-medium text-slate-200">{results[0].FatherName}</span>
                                        </div>
                                        <div className="flex gap-6 md:gap-8">
                                            <div>
                                                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Gender</span>
                                                <span className="text-base md:text-lg font-medium text-slate-200">{results[0].Gender}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Location</span>
                                                <span className="text-base md:text-lg font-medium text-slate-200">{results[0].Location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 md:mt-8 p-4 bg-amber-900/30 rounded-xl border border-amber-500/30 flex items-center gap-3 backdrop-blur-sm">
                                    <div className="bg-amber-900/50 p-2 rounded-full">
                                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-amber-400 font-bold text-sm md:text-base">Voter Eligibility Confirmed</p>
                                        <p className="text-amber-300/70 text-xs md:text-sm">This member is listed in the active voter database.</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Multiple Results - Table with Gold
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-800/80 border-b border-amber-500/20">
                                        <tr>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-xs font-bold text-amber-400 uppercase tracking-wider">Enrollment</th>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-xs font-bold text-amber-400 uppercase tracking-wider">Name</th>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-xs font-bold text-amber-400 uppercase tracking-wider hidden md:table-cell">Father's Name</th>
                                            <th className="px-4 md:px-6 py-3 md:py-4 text-xs font-bold text-amber-400 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-amber-500/10">
                                        {results.map((record, idx) => (
                                            <tr key={idx} className="hover:bg-amber-500/5 transition-colors group">
                                                <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-bold text-amber-400">{record.EnrollmentNo}</td>
                                                <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-semibold text-white">{record.Name}</td>
                                                <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-slate-300 hidden md:table-cell">{record.FatherName}</td>
                                                <td className="px-4 md:px-6 py-3 md:py-4">
                                                    <button
                                                        onClick={() => selectSuggestion(record)}
                                                        className="text-xs font-bold bg-amber-500/20 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-900 group-hover:border-amber-500 transition-all shadow-sm"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}
