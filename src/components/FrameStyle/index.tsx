import React from "react";

function FrameStyle({
  children,
  isFixed,
  className,
}: Readonly<{
  children: React.ReactNode;
  isFixed?: boolean;
  className?: string;
}>) {
  return (
    <div
      className={`p-[20px] rounded-[6px] shadow-[rgba(7,_65,_210,_0.1)_0px_1px_10px] ${className} ${
        isFixed && "fixed bottom-0 left-0 right-0 z-[100] bg-white"
      }`}
    >
      {children}
    </div>
  );
}

export default FrameStyle;
