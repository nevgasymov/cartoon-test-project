import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rick & Morty Explorer",
    default: "Rick & Morty Explorer",
  },
  description: "Browse, search and filter Rick and Morty characters.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-md bg-background px-3 py-2 focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <header>
          <div className="mx-auto w-full max-w-6xl px-4 py-3">
            <h1 className="mx-auto h-[86px] w-[280px] overflow-hidden bg-[url(/rick-morty-logo.svg)] bg-contain bg-center bg-no-repeat indent-[-9999px]">
              <Link href="/" className="block h-full">
                Rick &amp; Morty Explorer
              </Link>
            </h1>
          </div>
        </header>
        <NuqsAdapter>
          <main
            id="main"
            tabIndex={-1}
            className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 outline-none"
          >
            {children}
          </main>
        </NuqsAdapter>
      </body>
    </html>
  );
}
