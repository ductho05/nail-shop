import { TYPE_BUTTON } from "@/enum/Button.enum";
import { ORANGE_COLOR } from "@/utils/colors";
import React from "react";

function Button({
  title,
  onClick,
  type,
  isSubmit,
  width,
  disabled = false,
}: {
  title: string;
  type: TYPE_BUTTON;
  onClick: Function;
  isSubmit?: Boolean;
  width?: string;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      type={`${isSubmit ? "submit" : "button"}`}
      onClick={() => onClick()}
      className={`px-[20px] py-[7px] ${
        width ? `w-[${width}]` : "w-max"
      } rounded-[12px] cursor-pointer font-[400] disabled:cursor-default disabled:pointer-events-none`}
      style={{
        border: `${
          type === TYPE_BUTTON.LINE ? `1px solid ${ORANGE_COLOR}` : "none"
        }`,
        color: `${type === TYPE_BUTTON.LINE ? `${ORANGE_COLOR}` : "#fff"}`,
        backgroundColor: `${
          disabled
            ? "#bbb"
            : type === TYPE_BUTTON.LINE
            ? "#fff"
            : `${ORANGE_COLOR}`
        }`,
      }}
    >
      {title}
    </button>
  );
}

export default Button;
