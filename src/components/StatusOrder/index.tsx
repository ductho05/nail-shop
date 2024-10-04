import { ORANGE_COLOR2 } from "@/utils/colors";
import {
  convertOrderStatusText,
  convertOrderStatusType,
} from "@/utils/function";
import { Tag } from "antd";
import React from "react";

function StatusOrder({
  orderId,
  status,
}: {
  orderId?: string;
  status?: string;
}) {
  return (
    <div className="flex items-center gap-[20px]">
      <p className="font-bold text-lg text-[#333]">Mã:</p>
      <h1
        className="text-lg uppercase pr-[20px] border-r"
        style={{ color: ORANGE_COLOR2 }}
      >
        {orderId}
      </h1>
      <Tag color={convertOrderStatusType(status)}>
        {convertOrderStatusText(status)}
      </Tag>
    </div>
  );
}

export default StatusOrder;
