import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dr. Tai P. Pandian | Bar Council Election 2026",
    description: "Official website of Dr. Tai P. Pandian - Advocate, Madras High Court. Check voter eligibility for Tamil Nadu & Puducherry Bar Council Election 2026.",
    keywords: "Dr. Tai Pandian, TAI Pandian, Bar Council Election, Tamil Nadu, Puducherry, Madras High Court, Advocate, Voter Eligibility, 2026 Election",
    authors: [{ name: "Dr. Tai P. Pandian" }],
    creator: "Dr. Tai P. Pandian",
    publisher: "Dr. Tai P. Pandian",
    openGraph: {
        title: "Dr. Tai P. Pandian | Bar Council Election 2026",
        description: "Official website - Check voter eligibility for Tamil Nadu & Puducherry Bar Council Election 2026",
        type: "website",
        locale: "en_IN",
        siteName: "Dr. Tai P. Pandian",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dr. Tai P. Pandian | Bar Council Election 2026",
        description: "Official website - Check voter eligibility for Tamil Nadu & Puducherry Bar Council Election 2026",
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
            <body className={inter.className}>{children}</body>
        </html>
    );
}
