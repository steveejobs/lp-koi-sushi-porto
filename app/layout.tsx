import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://koisushiporto.xyz"),
  title: "Koi Sushi Porto | Sushi, cozinha chinesa e Take Away no Porto",
  description:
    "Koi Sushi Porto: sushi fresco, cozinha chinesa, Menu Infinity, All You Can Eat e Take Away na Estrada Exterior da Circunvalação.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Koi Sushi Porto | Sushi, cozinha chinesa e Take Away no Porto",
    description:
      "Koi Sushi Porto: sushi fresco, cozinha chinesa, Menu Infinity, All You Can Eat e Take Away na Estrada Exterior da Circunvalação.",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "/assets/hero/koi-sushi-porto-hero.png",
        width: 1452,
        height: 1083,
        alt: "Sushi fresco do Koi Sushi Porto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koi Sushi Porto | Sushi e Take Away no Porto",
    description:
      "Sushi fresco, cozinha chinesa, Menu Infinity, All You Can Eat e Take Away no Porto.",
    images: ["/assets/hero/koi-sushi-porto-hero.png"],
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
