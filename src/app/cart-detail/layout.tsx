import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ hàng của tôi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
