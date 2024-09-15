import React from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

function Input({
  defaultValue,
  maxLength = 1000,
  width = 60,
  value,
  onChange,
  onPlus,
  onMinus,
}: {
  defaultValue?: number;
  maxLength?: number;
  width?: number;
  onChange: Function;
  onPlus: Function;
  onMinus: Function;
  value: number;
}) {
  return (
    <div className="flex gap-[10px]">
      <MinusOutlined
        className="cursor-pointer text-[#aaa] text-[18px]"
        onClick={() => onMinus()}
      />
      <input
        className={`outline-none border rounded-[4px] px-[6px] py-[2px] w-[${width}px]`}
        type="number"
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <PlusOutlined
        className="cursor-pointer text-[#aaa] text-[18px]"
        onClick={() => onPlus()}
      />
    </div>
  );
}

export default Input;
