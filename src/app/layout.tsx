import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CommandPaletteProvider } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { ProjectModalProvider } from "@/components/ProjectModalProvider";
import { ResumeModalProvider } from "@/components/ResumeModalProvider";
import { SmoothScroll } from "@/components/story/SmoothScroll";
import { StoryChrome } from "@/components/story/StoryChrome";
import { site } from "@/lib/data/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
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
<<<<<<< HEAD
    "Freelance Software Developer",
    "Application Developer",
=======
<<<<<<< HEAD
=======
    "Data Analyst",
    "Software Development Engineer",
>>>>>>> a924b1a6cbcdfc07f3ee01c081c67353d41995bd
>>>>>>> 77400c05ea0f4a2d4449e683e0957c17d73a5827
    "PySpark",
    "SQL",
    "Delta Lake",
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
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ResumeModalProvider>
          <ProjectModalProvider>
            <CommandPaletteProvider>
              <RevealObserver />
              <SmoothScroll chrome={<StoryChrome />}>
                <main>{children}</main>
                <div className="night bg-paper">
                  <Footer />
                </div>
              </SmoothScroll>
            </CommandPaletteProvider>
          </ProjectModalProvider>
        </ResumeModalProvider>
      </body>
    </html>
  );
}
