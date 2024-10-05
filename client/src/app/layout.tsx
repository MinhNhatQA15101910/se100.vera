import "./globals.css";
import type { Metadata } from "next";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "Vera Music ♫",
  description: "We are the next generation of music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
