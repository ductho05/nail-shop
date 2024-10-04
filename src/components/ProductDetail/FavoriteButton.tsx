import { HeartOutlined } from "@ant-design/icons";
import React from "react";

function FavoriteButton() {
  return (
    <div className="absolute right-[400px] top-[100px] cursor-pointer w-[40px] h-[40px] rounded-[100%] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] flex items-center justify-center">
      <HeartOutlined className="text-[#666] text-xl" />
    </div>
  );
}

export default FavoriteButton;
