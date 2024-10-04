import { ORANGE_COLOR } from "@/utils/colors";
import React from "react";

function WebName({ webName }: { webName: string }) {
  return (
    <h1
      className="hidden lg:block max-w-[200px] font-extrabold text-xl ml-[10px] mb-[10px] py-[20px] px-[15px]"
      style={{
        color: ORANGE_COLOR,
      }}
    >
      {webName}
    </h1>
  );
}

export default WebName;
