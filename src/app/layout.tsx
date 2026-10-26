import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { HelloSplash } from "@/components/HelloSplash";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tadimarri Dadapeer | AI Product Engineer",
  description: "I build AI-powered digital products from idea to production.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
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
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        suppressHydrationWarning
        className="min-h-full flex flex-col text-foreground bg-background selection:bg-accent/20 selection:text-accent"
      >
        <HelloSplash />
        <NavBar />
        <main className="flex-1 flex flex-col items-center w-full">
          <div className="w-full max-w-[1600px] px-4 sm:px-8 md:px-10 lg:px-12 mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
