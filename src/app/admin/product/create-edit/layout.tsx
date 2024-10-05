import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng bán/ chỉnh sửa sản phẩm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
