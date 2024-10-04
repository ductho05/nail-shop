import { ORANGE_COLOR2 } from "@/utils/colors";
import React from "react";

function InfoItem({
  title,
  value,
  isPrimary = false,
}: {
  title: string;
  value: string;
  isPrimary?: boolean;
}) {
  return (
    <div className="flex items-center gap-[20px] text-[#333] pb-[10px] border-b w-full">
      <p className="text-[#666] font-bold">{title}</p>
      <p
        className={`${isPrimary && "text-xl font-bold"}`}
        style={{ color: `${isPrimary ? ORANGE_COLOR2 : "#333"}` }}
      >
        {value}
      </p>
    </div>
  );
}

export default InfoItem;
