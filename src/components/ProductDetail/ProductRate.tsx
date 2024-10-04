import { ORANGE_COLOR2, TEXT_COLOR } from "@/utils/colors";
import { Rate } from "antd";
import React from "react";

function ProductRate({ rates }: { rates: Array<number> }) {
  return (
    <div className="p-[20px] rounded-[12px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] mb-[20px]">
      <h1
        className={`text-[${TEXT_COLOR}] font-bold text-lg pb-[20px] border-b mb-[10px]`}
      >
        Đánh giá sản phẩm
      </h1>

      <div className="flex items-center mb-2 ">
        <div className="flex items-center flex-col pr-[10px] flex-[1]">
          <p
            className="text-4xl mr-[10px]"
            style={{
              color: ORANGE_COLOR2,
            }}
          >
            5.0
          </p>
          <Rate
            disabled
            defaultValue={5}
            style={{
              fontSize: "16px",
            }}
          />
        </div>
        <div className="flex-[6] ml-[20px]">
          {rates.map((rate, index) => (
            <div key={index} className="flex items-center mt-4">
              <p className="text-sm font-medium text-[#333]">{index + 1} sao</p>
              <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-300 rounded"
                  style={{ width: `${rate}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {rate}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductRate;
