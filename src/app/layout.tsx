import { metadata } from "./metadata";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AppThemeProvider from "./ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export { metadata };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <AppThemeProvider>
          <div
            className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </AppThemeProvider>
      </body>
    </html>
  );
}
