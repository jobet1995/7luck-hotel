import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavigationWrapper from "@/components/NavigationWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Reduced weights for better performance
  display: "swap",
  preload: true, // Explicitly enable preloading
  fallback: ["system-ui", "sans-serif"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Disable preload since it's only used for headings
  fallback: ["serif"],
});

export const metadata: Metadata = {
  title: "7-Luck Hotel & Resorts",
  description: "Luxury hotel and resort experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfairDisplay.variable} antialiased`}
      >
        <NavigationWrapper>
          <Navbar />
        </NavigationWrapper>
        <main>{children}</main>
        <NavigationWrapper>
          <Footer />
        </NavigationWrapper>
      </body>
    </html>
  );
}
