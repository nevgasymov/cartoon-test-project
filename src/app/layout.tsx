import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Rick & Morty Explorer",
    default: "Rick & Morty Explorer",
  },
  description: "Browse, search and filter Rick and Morty characters.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
