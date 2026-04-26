// apps/web/src/app/layout.tsx
```tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Utilizing standard sans-serif optimized for highly readable, modern operational UI
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | ReadyCheck Admin",
    default: "ReadyCheck | Operational Readiness & Deployment",
  },
  description: "Verify operational understanding before deployment execution. The command-and-control dashboard for ReadyCheck.",
  applicationName: "ReadyCheck",
  robots: {
    index: false,
    follow: false, // Prevent search indexing of internal operational tooling
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A", // Slate 900
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevent accidental zooming on operational dashboards
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        {/* 
          A11y Skip Link: Crucial for keyboard navigators operating in high-stress 
          environments to jump past navigation trees directly to mission controls. 
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        {/* Global shell layout provider */}
        <div className="flex min-h-screen flex-col relative w-full">
          <main id="main-content" className="flex flex-1 flex-col outline-none" tabIndex={-1}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```
