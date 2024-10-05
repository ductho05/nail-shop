import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng của tôi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
