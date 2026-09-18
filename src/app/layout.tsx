import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { FloatingNav } from "@/components/FloatingNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import { ThemeScript } from "@/components/ThemeScript";
import { ProjectModalProvider } from "@/components/ProjectModalProvider";
import { ResumeModalProvider } from "@/components/ResumeModalProvider";
import { site } from "@/lib/data/site";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = site.domain || site.siteUrlFallback;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.positioning,
  keywords: [
    "Pavithra Uthrah",
    "Data Engineer",
    "Data Engineering",
    "Data Analyst",
    "PySpark",
    "Databricks",
    "Power BI",
    "VIT Chennai",
  ],
  authors: [{ name: site.name, url: site.github }],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${site.name} · ${site.title}`,
    description: site.positioning,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.title}`,
    description: site.positioning,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <ResumeModalProvider>
          <ProjectModalProvider>
            <FloatingNav />
            <ScrollToTop />
            <main className="flex-1">{children}</main>
          </ProjectModalProvider>
        </ResumeModalProvider>
        <Footer />
      </body>
    </html>
  );
}
