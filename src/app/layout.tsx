import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], variable: '--font-cinzel', weight: ['400', '700', '900'] });

export const metadata: Metadata = {
    title: "Dr. Tai P. Pandian | Bar Council Election 2026",
    description: "Dr. Tai P. Pandian - Advocate, Madras High Court. Check voter eligibility for Tamil Nadu & Puducherry Bar Council Election 2026.",
    keywords: "Dr. Tai Pandian, TAI Pandian, Bar Council Election, Tamil Nadu, Puducherry, Madras High Court, Advocate, Voter Eligibility, 2026 Election",
    authors: [{ name: "Dr. Tai P. Pandian" }],
    creator: "Dr. Tai P. Pandian",
    publisher: "Dr. Tai P. Pandian",
    openGraph: {
        title: "Dr. Tai P. Pandian | Bar Council Election 2026",
        description: "Check voter eligibility for Tamil Nadu & Puducherry Bar Council Election 2026",
        type: "website",
        locale: "en_IN",
        siteName: "Dr. Tai P. Pandian",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dr. Tai P. Pandian | Bar Council Election 2026",
        description: "Check voter eligibility for Tamil Nadu & Puducherry Bar Council Election 2026",
        creator: "@adv_taipandian",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${cinzel.variable}`}>{children}</body>
        </html>
    );
}
