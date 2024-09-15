import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông tin tài khoản",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
