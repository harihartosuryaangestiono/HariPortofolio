import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingLines from "@/components/floating-lines";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { CustomCursor } from "@/components/ui/cursor";

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
    default: "Hariharto Surya — Digital Systems Architect",
    template: "%s — HS Labs",
  },
  description:
    "Premium portfolio of a digital systems architect building scalable, efficient, and impactful digital solutions.",
  applicationName: "Hariharto Surya Portfolio",
  openGraph: {
    title: "Hariharto Surya — Digital Systems Architect",
    description:
      "Building scalable, efficient, and impactful digital solutions across web applications and systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hariharto Surya — Digital Systems Architect",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex flex-col bg-background text-foreground cursor-none">
        <CustomCursor />
        <SmoothScroll>
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
                linesGradient={["#22D3EE", "#3B82F6", "#8B5CF6"]}
                mixBlendMode="screen"
              />
            </div>
            {children}
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
