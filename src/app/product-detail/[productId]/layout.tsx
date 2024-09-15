import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết sản phẩm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
