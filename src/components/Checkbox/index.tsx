import React from "react";
import style from "./style.module.css";
import { makeid } from "@/utils/function";

function CheckBox({
  label,
  disable = false,
  checked,
  onChange,
}: {
  label: string;
  disable?: boolean;
  checked: boolean;
  onChange: Function;
}) {
  const id = makeid(5);
  return (
    <div className="flex items-center gap-[10px]">
      <input
        disabled={disable}
        className={style.check_input}
        type="checkbox"
        name="checkbox"
        id={`${style.custom_check}${id}`}
        checked={checked}
        onChange={() => onChange()}
      />
      <label
        className={style.checkbox}
        htmlFor={`${style.custom_check}${id}`}
      ></label>
      <p className="text-[#333]">{label}</p>
    </div>
  );
}

export default CheckBox;
