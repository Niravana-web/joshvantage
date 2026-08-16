import type { Metadata } from "next";
import { Archivo, Inter, Lora } from "next/font/google";
import StickyLogo from "@/components/StickyLogo";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["900"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joshvantage.com"),
  title: "Josh Vantage Consulting Group",
  description:
    "Specialist support for people launching care businesses, established care providers pursuing new contracts and aspiring and experienced professionals developing towards Registered Manager leadership.",
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "Josh Vantage Consulting Group",
    type: "website",
    locale: "en_GB",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Josh Vantage Consulting Group — Build. Grow. Lead." }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        {children}
        <StickyLogo />
      </body>
    </html>
  );
}
