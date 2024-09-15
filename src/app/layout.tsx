import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import DefaultLayout from "@/components/DefaultLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StoreProvider = dynamic(() => import("@/stores/provider"), {
  ssr: false,
});

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nail Shop",
  description: "Nail shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
