import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title: { default: "PM AZIMELU TECHNOLOGIES | Secure. Connect. Protect.", template: "%s | PM AZIMELU TECHNOLOGIES" },
  description: "PM AZIMELU TECHNOLOGIES builds digital products and helps organizations assess and strengthen digital security.",
  alternates: { canonical: "/" },
  openGraph: { title: "PM AZIMELU TECHNOLOGIES | Secure. Connect. Protect.", description: "Build Digital. Secure Digital. Move Forward.", type: "website", siteName: "PM AZIMELU TECHNOLOGIES" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
