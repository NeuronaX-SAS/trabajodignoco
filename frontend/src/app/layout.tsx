import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from '../components/ThemeRegistry';
import MainLayout from '../components/Layout/MainLayout';
import StoreProvider from '../lib/redux/StoreProvider';
import Head from 'next/head';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trabajo Digno - Por la dignificación de la vida laboral",
  description: "Organización defensora de los trabajadores colombianos que promueve el trabajo digno para lograr la dignificación de la vida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" style={{ margin: 0, padding: 0 }}>
      <head>
        <link rel="stylesheet" href="/main-styles.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0 }}
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
