import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
