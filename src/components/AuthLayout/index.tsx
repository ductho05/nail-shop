import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { FloatButton } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div
      className="w-screen h-screen p-[10vw]"
      style={{
        backgroundImage: "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)",
      }}
    >
      <FloatButton
        onClick={handleBackToHome}
        type="primary"
        icon={<HomeOutlined />}
        tooltip="Trở về trang chủ"
        className="top-[20px] left-[40px]"
      />
      <div className="bg-white p-[20px] rounded-[12px] flex">
        <div className="flex-[1]">
          <Player
            autoplay
            loop
            src={require("@/assets/jsons/auth.json")}
            style={{ height: "30vw", width: "30vw" }}
          />
        </div>
        <div className="flex-[1]">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
