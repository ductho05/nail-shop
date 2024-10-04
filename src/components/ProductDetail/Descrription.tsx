import { TEXT_COLOR } from "@/utils/colors";
import React from "react";
import FrameStyle from "../FrameStyle";

function Descrription({ description }: { description: string }) {
  return (
    <FrameStyle className="mb-[20px]">
      <h1
        className={`text-[${TEXT_COLOR}] font-bold text-lg pb-[20px] border-b mb-[10px]`}
      >
        Mô tả sản phẩm
      </h1>
      <p dangerouslySetInnerHTML={{ __html: description }} />
    </FrameStyle>
  );
}

export default Descrription;
