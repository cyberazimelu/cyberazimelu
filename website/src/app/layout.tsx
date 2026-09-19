import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://pmazimelutechnologies.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PM AZIMELU TECHNOLOGIES | Secure. Connect. Protect.",
    template: "%s | PM AZIMELU TECHNOLOGIES",
  },

  description:
    "PM AZIMELU TECHNOLOGIES builds digital systems and helps organizations secure them through professional development, cybersecurity, VAPT, and digital security services.",

  applicationName: "PM AZIMELU TECHNOLOGIES",

  authors: [
    {
      name: "Peter Majesty Azimelu",
    },
  ],

  creator: "PM AZIMELU TECHNOLOGIES",
  publisher: "PM AZIMELU TECHNOLOGIES",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "PM AZIMELU TECHNOLOGIES | Secure. Connect. Protect.",
    description: "Build Digital. Secure Digital. Move Forward.",
    url: "/",
    siteName: "PM AZIMELU TECHNOLOGIES",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "PM AZIMELU TECHNOLOGIES | Secure. Connect. Protect.",
    description: "Build Digital. Secure Digital. Move Forward.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}