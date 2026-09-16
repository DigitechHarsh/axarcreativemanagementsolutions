import type { Metadata } from "next";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Axar Creative Management Solutions | Industrial Excellence & ISO Consultancy",
  description: "Better Systems • Safer Workplaces • Sustainable Growth. Industrial consultancy, ISO & QMS standards, NABL testing laboratory setup, QHSE training, Six Sigma & industrial insurance solutions.",
  keywords: "ISO 9001, ISO 14001, ISO 45001, ISO 27001, ISO 20000-1, NABL Laboratory setup, QHSE Training, Six Sigma DMAIC, Industrial Insurance, Bharuch, Gujarat, Ghanshyambhai Patel",
  authors: [{ name: "Ghanshyambhai K Patel" }],
  openGraph: {
    title: "Axar Creative Management Solutions | Your Partner for Industrial Excellence",
    description: "Better Systems • Safer Workplaces • Sustainable Growth. Comprehensive industrial consultancy, ISO certifications, laboratory accreditation, and workforce safety training.",
    url: "https://axarcreativemanagementsolutions-rho.vercel.app",
    siteName: "Axar Creative Management Solutions",
    locale: "en_IN",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${playfairDisplay.variable} h-full antialiased bg-background text-text-primary`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body bg-background text-text-primary selection:bg-primary selection:text-white" suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
