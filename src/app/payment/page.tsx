"use client";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { ORANGE_COLOR } from "@/utils/colors";
import FrameStyle from "@/components/FrameStyle";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import CheckoutItem from "@/components/CheckoutItem";
import { Radio, RadioChangeEvent } from "antd";
import { PAYMENT_METHOD } from "@/enum/User.enum";
import { formatPrice } from "@/utils/function";
import Button from "@/components/Button";
import { TYPE_BUTTON } from "@/enum/Button.enum";
import { Modal } from "antd";
import QR_CODE from "@/assets/images/QR_CODE.jpg";
import { playLoading } from "@/stores/commonSlice";

function PaymentOrder() {
  const addressOrder = true;
  const { listCheckout } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  const [paymentMethod, setPaymentMethod] = useState(
    PAYMENT_METHOD.BANK_TRANSFER
  );
  const [shippingCost, setShippingCost] = useState(0);
  const [isDisplay, setIsDisplay] = useState(false);
  const [qrCodePayment, setQRCodePayment] = useState<string>()

  const onChangePaymentMethod = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };

  const caculateTotalPrice = () => {
    return listCheckout.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
  };

  const handlePayment = () => {
    setIsDisplay(true)
  };

  const onClose = () => {
    setIsDisplay(false);
  };

  return (
    <div className="px-[40px] py-[20px] flex flex-col gap-[20px]">
      <Modal
        title="Vui lòng quét mã QR để hoàn tất thanh toán đơn hàng"
        open={isDisplay}
        onClose={onClose}
        footer={[]}
        width={"50vw"}
      >
        <img src={QR_CODE.src} alt="" />
      </Modal>
      <FrameStyle>
        <div className="flex items-center gap-[10px]">
          <LocationOnIcon style={{ color: ORANGE_COLOR }} />
          <p
            className="capitalize text-lg font-bold"
            style={{
              color: ORANGE_COLOR,
            }}
          >
            Địa chỉ nhận hàng
          </p>
        </div>
        {addressOrder ? (
          <div className="flex items-center gap-[20px]">
            <p className="font-bold text-[#333]">Đức Thọ (0877404581)</p>
            <p className="flex-1 text-[#333]">
              Khu D 127/4/2, Đường Hoàng Diệu 2, Phường Linh Trung, Thành Phố
              Thủ Đức, TP. Hồ Chí Minh
            </p>
            <div
              className={`cursor-pointer px-[10px] py-[4px] w-max rounded-[6px] border flex items-center gap-[10px]`}
              style={{ borderColor: ORANGE_COLOR }}
            >
              <ChangeCircleOutlinedIcon style={{ color: ORANGE_COLOR }} />
              <p style={{ color: ORANGE_COLOR }}>Thay đổi</p>
            </div>
          </div>
        ) : (
          <div className="border rounded-[6px] px-[10px] py-[4px] w-max flex items-center gap-[10px] mt-[10px] cursor-pointer">
            <AddCircleOutlineOutlinedIcon className="text-[#333]" />
            <p className="text-[#333]">Thêm địa chỉ giao hàng</p>
          </div>
        )}
      </FrameStyle>
      <FrameStyle>
        <h1 className="text-lg text-[#333] font-bold">Danh sách sản phẩm</h1>
        {listCheckout.map((itemCheckout, index) => (
          <CheckoutItem
            key={index}
            cartItem={itemCheckout}
            noneBorder={index + 1 === listCheckout.length}
          />
        ))}
      </FrameStyle>
      <FrameStyle>
        <h1 className="text-lg text-[#333] font-bold">
          Phương thức thanh toán
        </h1>
        <Radio.Group
          size="large"
          onChange={onChangePaymentMethod}
          value={paymentMethod}
          className="flex flex-col mt-[10px] gap-[10px]"
        >
          {/* <Radio value={1}>Thanh toán khi nhận hàng</Radio> */}
          <Radio value={PAYMENT_METHOD.BANK_TRANSFER}>
            Quét mã QR để thanh toán
          </Radio>
        </Radio.Group>
      </FrameStyle>
      <FrameStyle>
        <h1 className="text-lg text-[#333] font-bold">
          Phương thức vận chuyển
        </h1>
        <Radio.Group
          size="large"
          value={shippingCost}
          className="flex flex-col mt-[10px] gap-[10px]"
        >
          {/* <Radio value={1}>Thanh toán khi nhận hàng</Radio> */}
          <Radio value={shippingCost}>
            Giao hàng tiêu chuẩn: {formatPrice(shippingCost)} đ
          </Radio>
        </Radio.Group>
      </FrameStyle>
      <FrameStyle isFixed={true}>
        <div className="flex items-start">
          <div className="flex-1">
            <div
              className={`cursor-pointer px-[10px] py-[4px] w-max rounded-[6px] border flex items-center gap-[10px]`}
              style={{ borderColor: ORANGE_COLOR }}
            >
              <ArrowBackOutlinedIcon style={{ color: ORANGE_COLOR }} />
              <p style={{ color: ORANGE_COLOR }}>Quay lại giỏ hàng</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start gap-[10px] text-[#333] pb-[10px]">
            <div className="flex items-center gap-[20px] text-[#333] pb-[10px] border-b w-full">
              <p>Tổng tiền: </p>
              <p className="text-[#333] font-bold">
                {formatPrice(caculateTotalPrice())} đ
              </p>
            </div>
            <div className="flex items-center gap-[20px] text-[#333] pb-[10px] border-b w-full">
              <p>Phí vận chuyển: </p>
              <p className="text-[#333] font-bold">
                {formatPrice(shippingCost)} đ
              </p>
            </div>
            <Button
              title="Đặt hàng"
              onClick={handlePayment}
              type={TYPE_BUTTON.PRIMARY}
            />
          </div>
        </div>
      </FrameStyle>
    </div>
  );
}

export default PaymentOrder;
