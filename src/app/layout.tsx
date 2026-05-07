import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingLines from "@/components/floating-lines";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.vercel.app"),
  title: {
    default: "Hariharto Surya — Web App & System Developer",
    template: "%s — Your Name",
  },
  description:
    "Premium portfolio of a web application & systems developer building scalable, efficient, and impactful digital solutions.",
  applicationName: "Hariharto Surya Portfolio",
  openGraph: {
    title: "Hariharto Surya — Web App & System Developer",
    description:
      "Building scalable, efficient, and impactful digital solutions across web applications and systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hariharto Surya — Web App & System Developer",
    description:
      "Building scalable, efficient, and impactful digital solutions across web applications and systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <div className="fixed inset-0 -z-10 opacity-60">
            <FloatingLines
              enabledWaves={["top", "middle", "bottom"]}
              lineCount={[10, 14, 18]}
              lineDistance={[8, 6, 4]}
              bendRadius={5}
              bendStrength={-0.5}
              interactive={false}
              parallax={false}
              animationSpeed={0.9}
              linesGradient={["#7dd3fc", "#93c5fd", "#a78bfa"]}
              mixBlendMode="screen"
            />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
