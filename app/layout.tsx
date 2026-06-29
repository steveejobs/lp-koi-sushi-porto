import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lp-chambar.vercel.app"),
  title: "Chambar Sushi & Frutos do Mar | Araguaína",
  description:
    "Peça delivery, fale pelo WhatsApp e conheça o Chambar Sushi & Frutos do Mar em Araguaína. Não é só sushi. É nível Chambar.",
  icons: {
    icon: [
      {
        url: "/chambar/favicon-chambar.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/chambar/favicon-chambar.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Chambar Sushi & Frutos do Mar",
    description:
      "Sushi, frutos do mar e delivery em Araguaína. Não é só sushi. É nível Chambar.",
    images: [
      {
        url: "/chambar/og-chambar.jpg",
        width: 1600,
        height: 900,
        alt: "Chambar Sushi & Frutos do Mar em Araguaína",
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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
