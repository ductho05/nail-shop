import { UploadOutlined } from "@ant-design/icons";
import React from "react";

function UploadFile({
  title,
  id,
  onChange,
  multiple = false,
}: {
  title: string;
  id: string;
  onChange: Function;
  multiple?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="ml-[20px] px-[10px] py-[6px] border rounded-[6px] cursor-pointer hover:text-[#1677ff] hover:border-[#1677ff]"
      >
        <UploadOutlined className="mr-[10px]" />
        {title}
      </label>
      <input
        multiple={multiple}
        className="!hidden"
        type="file"
        name={id}
        id={id}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

export default UploadFile;
