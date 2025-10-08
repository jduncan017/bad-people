import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "My Worst Friends - Party Game Prompt Generator",
  description:
    "The party game that reveals who your friends really are. Generate unlimited My Worst Friends game prompts instantly.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "My Worst Friends - Party Game Prompt Generator",
    description:
      "The party game that reveals who your friends really are. Generate unlimited My Worst Friends game prompts instantly.",
    images: [
      {
        url: "/wf-og.jpg",
        width: 1200,
        height: 630,
        alt: "My Worst Friends - The party game that reveals who your friends really are",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Worst Friends - Party Game Prompt Generator",
    description:
      "The party game that reveals who your friends really are. Generate unlimited My Worst Friends game prompts instantly.",
    images: ["/wf-og.jpg"],
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-zinc-950">{children}</body>
    </html>
  );
}
