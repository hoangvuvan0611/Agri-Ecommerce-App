import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import FooterSection from "@/components/layout/footer/footer";
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased relative min-h-screen flex flex-col`}>
        <CartProvider>
          <Toaster position="top-right" />
          {/* Header */}
          <div className='sticky top-0 bg-white z-50 container px-4'>
            <Header/>
          </div>
          <div className="flex-grow">
            {children}
          </div>
          <div>
            <FooterSection/>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
