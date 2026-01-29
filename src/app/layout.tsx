import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Random Number Generator | OpenRouter + Next.js",
  description: "Generate truly random numbers using AI models (Gemini) and visualize the distribution in real-time with an interactive histogram",
  keywords: ["AI", "random numbers", "generator", "OpenRouter", "Gemini", "Next.js", "data visualization"],
  authors: [{ name: "AI Random Number Generator" }],
  openGraph: {
    title: "AI Random Number Generator",
    description: "Generate truly random numbers using AI models and visualize the distribution",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
