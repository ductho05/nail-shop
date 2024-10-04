import { ORANGE_COLOR } from "@/utils/colors";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

function Search({
  onSearch,
  placeholder,
  width = "40vw",
}: {
  onSearch: Function;
  placeholder: string;
  width: string;
}) {
  const onEnterKey = (e: any) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div
      className={`pl-[10px] border border-1 rounded-[6px] flex items-center`}
      style={{
        width: width,
      }}
    >
      <input
        className="flex-1 py-[7px] border-none outline-none"
        type="text"
        placeholder={placeholder}
        onKeyDown={(e) => onEnterKey(e)}
      />
      <button
        style={{
          backgroundColor: ORANGE_COLOR,
        }}
        className={`px-[20px] py-[6px] rounded-[4px] mr-[4px] flex items-center justify-center`}
        onClick={() => onSearch()}
      >
        <SearchOutlined className="text-white text-lg" />
      </button>
    </div>
  );
}

export default Search;
