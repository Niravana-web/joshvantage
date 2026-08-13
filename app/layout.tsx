import type { Metadata } from "next";
import { Archivo, Inter, Lora } from "next/font/google";
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
  title: "Josh Vantage Consulting Group",
  description:
    "Specialist support for people building care businesses, established care providers pursuing new contracts, and professionals preparing for Registered Manager leadership.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
