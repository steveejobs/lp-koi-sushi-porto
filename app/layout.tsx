import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lp-koi-sushi-porto.vercel.app"),
  title: "Koi Sushi Porto | Sushi, cozinha chinesa e Take Away no Porto",
  description:
    "Koi Sushi Porto: sushi fresco, cozinha chinesa, Menu Infinity, All You Can Eat e Take Away na Estrada Exterior da Circunvalação.",
  icons: {
    icon: [
      {
        url: "/koi/icons/koi-sushi-porto-favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/koi/icons/apple-touch-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Koi Sushi Porto",
    description:
      "Sushi fresco, cozinha chinesa, Menu Infinity, All You Can Eat e Take Away no Porto.",
    images: [
      {
        url: "/chambar/og-chambar.jpg",
        width: 1600,
        height: 900,
        alt: "Koi Sushi Porto",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
