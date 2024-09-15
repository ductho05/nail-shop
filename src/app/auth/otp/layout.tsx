import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Xác thực mã OTP",
};

function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default layout;
