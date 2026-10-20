import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { APP_DESCRIPTION, AUTHOR, PORTFOLIO_URL, SITE_URL } from "@/lib/site";
import "./globals.css";

// Fonts are self-hosted (src/app/fonts, both SIL Open Font License) so builds never depend on Google Fonts.
// Archivo is variable on width and weight; the width axis gives the condensed headlines.
const archivo = localFont({
  src: "./fonts/archivo-variable.woff2",
  variable: "--font-display",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-400.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-500.woff2", weight: "500" },
    { path: "./fonts/ibm-plex-mono-600.woff2", weight: "600" },
  ],
  variable: "--font-mono",
});

const title = "TrainLog — Free workout log app for Android";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · TrainLog",
  },
  description: APP_DESCRIPTION,
  applicationName: "TrainLog",
  authors: [{ name: AUTHOR, url: PORTFOLIO_URL }],
  creator: AUTHOR,
  category: "health & fitness",
  keywords: [
    "workout log",
    "workout tracker",
    "gym log app",
    "Android workout app",
    "push pull legs",
    "progressive overload",
    "muscle map",
    "PR tracker",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    title: "TrainLog — Every square is a day you showed up.",
    description: APP_DESCRIPTION,
    url: SITE_URL,
    siteName: "TrainLog",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: APP_DESCRIPTION,
    creator: "@sushantpulipat",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
