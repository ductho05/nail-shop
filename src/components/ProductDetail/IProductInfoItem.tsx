import React from "react";

function ProductInfoItem({
  fLabel,
  sLabel,
  isBorder = false,
}: {
  fLabel: any;
  sLabel: any;
  isBorder?: boolean;
}) {
  return (
    <div className={`flex items-center pl-[10px] ${isBorder && "border-r"}`}>
      <p className="text-lg mr-[10px] text-[#333]">{fLabel}</p>
      <p className="text-lg mr-[10px] text-[#666]">{sLabel}</p>
    </div>
  );
}

export default ProductInfoItem;
