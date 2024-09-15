import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đơn hàng của tôi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
