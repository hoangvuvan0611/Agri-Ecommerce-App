import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'sonner';
import ChatWidget from "@/components/chat/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agri Ecommerce",
  description: "Nông sản sạch, an toàn cho sức khỏe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="vi">
      <body suppressHydrationWarning={true} className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen flex flex-col`}>
        <CartProvider>
          <Toaster position="top-right" />
          {children}
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
