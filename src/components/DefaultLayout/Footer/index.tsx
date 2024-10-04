import React from "react";
import { BORDER_COLOR, LIGHT_GRAY, ORANGE_COLOR } from "@/utils/colors";
import { NAME_SHOP } from "@/constants";

function Footer() {
  return (
    <div
      className="flex flex-col lg:flex-row"
      style={{
        borderTop: `1px solid ${BORDER_COLOR}`,
        backgroundColor: `${LIGHT_GRAY}`,
        borderRadius: "12px 12px 0 0",
        padding: "40px",
      }}
    >
      <div className="lg:flex-[2] lg:justify-start lg:my-0 my-[10px] flex flex-col items-center w-full justify-center">
        <h1
          className="font-extrabold text-6xl"
          style={{
            color: ORANGE_COLOR,
          }}
        >
          {NAME_SHOP}
        </h1>
        <p className="text-[15px] my-[10px] text-gray-500 font-[500] ml-[6px]">
          © Aiking 2024
        </p>
      </div>

      <div className="lg:flex-[4] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="text-[14px] font-[500] text-center md:text-left">
          <h1 className="text-gray-400 text-lg uppercase">Dịch vụ</h1>
          <p className="hover:text-[#1677ff] cursor-pointer py-[6px]">
            Đăng nhập/tạo tài khoản
          </p>
          <p className="hover:text-[#1677ff] cursor-pointer py-[6px]">
            Điều khoản sử dụng
          </p>
          <p className="hover:text-[#1677ff] cursor-pointer py-[6px]">
            Chính sách bảo mật quyền riêng tư
          </p>
          <p className="hover:text-[#1677ff] cursor-pointer py-[6px]">
            Giới thiệu
          </p>
        </div>
        <div className="text-[14px] font-[500] text-center md:text-left">
          <h1 className="text-gray-400  text-lg uppercase">Hỗ trợ</h1>
          <p className="hover:text-[#1677ff] cursor-pointer py-[6px]">
            Chính sách đổi - trả - hoàn tiền
          </p>
          <p className="hover:text-[#1677ff] cursor-pointer py-[6px]">
            Chính sách bảo hành, bồi hoàn
          </p>
          <p className="hover:text-[#1677ff] cursor-pointer py-[6px]">
            Chính sách vận chuyển
          </p>
        </div>
        <div className="text-[14px] font-[500] text-center md:text-left">
          <h1 className="text-gray-400  text-lg uppercase">Tài khoản</h1>
          <p className="hover:text-[#1677ff] cursor-pointer py-[6px]">
            Địa chỉ khách hàng
          </p>
          <p className="hover:text-[#1677ff] cursor-pointer py-[6px]">
            Thông tin tài khoản
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
