import React from "react";

function SubTitle({ subTitle }: { subTitle: string }) {
  return (
    <h3 className="py-[12px] px-[20px] text-sm text-[#999]">{subTitle}</h3>
  );
}

export default SubTitle;
