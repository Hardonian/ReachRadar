import type { Metadata } from "next";
import { brand } from "@reachradar/config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.category}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.tagline,
  keywords: [
    "algorithm intelligence",
    "YouTube distribution",
    "recommendation volatility",
    "creator analytics",
    "algorithm shifts",
    "reach observability",
  ],
  authors: [{ name: brand.name }],
  metadataBase: new URL("https://reachradar.io"),
  openGraph: {
    title: `${brand.name} — ${brand.category}`,
    description: brand.tagline,
    url: "https://reachradar.io",
    siteName: brand.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.tagline,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#070A12] text-slate-100 antialiased flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-slate-950 focus:font-bold focus:rounded-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
