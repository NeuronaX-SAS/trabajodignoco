import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from '../components/ThemeRegistry';
import MainLayout from '../components/Layout/MainLayout';
import StoreProvider from '../lib/redux/StoreProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trabajo Digno | Portal de Apoyo Laboral",
  description: "Trabajo Digno: Apoyo, recursos y comunidad para la defensa de los derechos laborales en Colombia.",
  icons: {
    icon: [
      { url: "/logos/logo.svg", type: "image/svg+xml" },
      { url: "/logos/logo.svg", sizes: "any", type: "image/svg+xml" }
    ],
    apple: { url: "/logos/logo.svg", type: "image/svg+xml" },
    shortcut: { url: "/logos/logo.svg", type: "image/svg+xml" }
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeRegistry>
            <MainLayout>{children}</MainLayout>
          </ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
