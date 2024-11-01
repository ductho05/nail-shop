import { CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";

function ImagePreview({
  image,
  onRemove,
}: {
  image: string;
  onRemove: Function;
}) {
  const [displayCloseButton, setDisplayCloseButton] = useState(false);

  return (
    <div
      onMouseOver={() => setDisplayCloseButton(true)}
      onMouseLeave={() => setDisplayCloseButton(false)}
      className="relative w-[110px] h-[110px] p-[10px] border rounded-[4px] mt-[10px]"
    >
      {displayCloseButton && (
        <Tooltip title="Xoá hình ảnh">
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
            className="absolute right-[2px] top-[2px] w-[20px] h-[20px] rounded-[100px] hover:bg-[#deded3]"
          >
            <CloseOutlined className="text-[13px]" />
          </button>
        </Tooltip>
      )}

      <img
        className="w-full h-full object-contain"
        src={image}
        alt="product thumbnail"
      />
    </div>
  );
}

export default ImagePreview;
