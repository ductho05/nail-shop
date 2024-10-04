import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý đơn hàng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
