"use client";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { ORANGE_COLOR, ORANGE_COLOR2 } from "@/utils/colors";
import FrameStyle from "@/components/FrameStyle";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import CheckoutItem from "@/components/CheckoutItem";
import {
  Button as ButtonA,
  message,
  notification,
  Radio,
  RadioChangeEvent,
} from "antd";
import { PAYMENT_METHOD, TYPE_CONTROLL } from "@/enum/User.enum";
import { base64ToImageUrl, formatPrice } from "@/utils/function";
import Button from "@/components/Button";
import { TYPE_BUTTON } from "@/enum/Button.enum";
import { Modal } from "antd";
import { pauseLoading, playLoading } from "@/stores/commonSlice";
import { useRouter } from "next/navigation";
import { userRoutes } from "@/routes/route";
import Order, { OrderCreate, OrderResponse } from "@/interface/Order";
import { Response } from "@/interface/Response";
import { apiConfirmPayment, apiCreateOrder } from "@/api/user.api";
import { bankId } from "@/constants";
import { ProductOrder } from "@/interface/Product";
import QRCode from "@/interface/QRCode";

function PaymentOrder() {
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { listCheckout, addresses, currentAddress, idUser, accessToken } =
    useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [paymentMethod, setPaymentMethod] = useState(
    PAYMENT_METHOD.BANK_TRANSFER
  );
  const [shippingCost, setShippingCost] = useState(0);
  const [isDisplay, setIsDisplay] = useState(false);
  const [qrCodePayment, setQRCodePayment] = useState<QRCode>();
  const [orderResponse, setOrderResponse] = useState<Order>();

  const onChangePaymentMethod = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };

  const caculateTotalPrice = () => {
    return listCheckout.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
  };

  const handlePayment = async () => {
    const products: Array<ProductOrder> = [];
    listCheckout.forEach((p) => {
      products.push({ productId: p.product._id || "", quantity: p.quantity });
    });
    const order: OrderCreate = {
      discounts: [],
      products: products,
      bankId: bankId,
      address: addresses[currentAddress],
    };
    dispatch(playLoading());
    const rersponse: Response<OrderResponse> = await apiCreateOrder(
      accessToken || "",
      idUser || "",
      order
    );
    dispatch(pauseLoading());
    if (rersponse.success) {
      setQRCodePayment(rersponse.data?.qrCode);
      setOrderResponse(rersponse.data?.order);
    }
    setIsDisplay(true);
  };

  const onClose = () => {
    setIsDisplay(false);
  };

  const handleWhenFinishPayment = () => {
    router.push(userRoutes.MY_ORDER);
  };

  const handleConfirmPayment = async () => {
    if (accessToken && orderResponse?._id) {
      dispatch(playLoading());
      const response: Response<string> = await apiConfirmPayment(
        accessToken,
        orderResponse._id
      );
      dispatch(pauseLoading());
      if (response.success) {
        setIsDisplay(false);
        Modal.success({
          title: response.data,
          content: <p>Xem lại đơn hàng!</p>,
          onOk: handleWhenFinishPayment,
        });

        return;
      }
      message.error(response.data);
    }
  };

  const handleToChooseAddress = () => {
    router.push(
      `${userRoutes.MY_ADDRESS}?${TYPE_CONTROLL.CHOOSE_ADDRESS}=true`
    );
  };

  return (
    <div className="px-[40px] py-[20px] flex flex-col gap-[20px]">
      {contextHolder}
      <Modal
        title="Vui lòng quét mã QR để hoàn tất thanh toán đơn hàng"
        open={isDisplay}
        onClose={onClose}
        footer={[]}
        width={"70vw"}
      >
        <div className="flex items-start gap-[20px]">
          <img src={qrCodePayment?.base64QRCode} alt="QRCode payment" />
          <div className="text-lg flex flex-col gap-[20px]">
            <h1 className="font-bold text-xl">Thông tin đơn hàng</h1>
            <p>
              Người nhận:{" "}
              {`${orderResponse?.address.nameCustomer} (${orderResponse?.address.phoneNumber})`}
            </p>
            <p>
              Địa chỉ nhận hàng:{" "}
              {`${orderResponse?.address.street}, ${orderResponse?.address.ward}, ${orderResponse?.address.district}, ${orderResponse?.address.city}`}
            </p>
            <p>Thành tiền: {formatPrice(orderResponse?.total || 0)} đ</p>
            <ButtonA
              type="primary"
              onClick={handleConfirmPayment}
              className="mt-[20px]"
              size="large"
            >
              Xác nhận đã thanh toán
            </ButtonA>
          </div>
        </div>
      </Modal>
      <FrameStyle>
        <div className="flex items-center gap-[10px]">
          <LocationOnIcon style={{ color: ORANGE_COLOR2 }} />
          <p
            className="capitalize text-lg font-bold"
            style={{
              color: ORANGE_COLOR2,
            }}
          >
            Địa chỉ nhận hàng
          </p>
        </div>
        {addresses.length > 0 ? (
          <div className="flex items-center gap-[20px]">
            <p className="font-bold text-[#333]">
              {`${addresses[currentAddress]?.nameCustomer} (${addresses[currentAddress]?.phoneNumber})`}{" "}
            </p>
            <p className="flex-1 text-[#333]">
              {`${addresses[currentAddress]?.street}, ${addresses[currentAddress]?.ward}, ${addresses[currentAddress]?.district}, ${addresses[currentAddress]?.city}`}
            </p>
            <div
              onClick={handleToChooseAddress}
              className={`cursor-pointer px-[10px] py-[4px] w-max rounded-[6px] border flex items-center gap-[10px]`}
            >
              <ChangeCircleOutlinedIcon style={{ color: "#333" }} />
              <p>Thay đổi</p>
            </div>
          </div>
        ) : (
          <div
            onClick={handleToChooseAddress}
            className="border rounded-[6px] px-[10px] py-[4px] w-max flex items-center gap-[10px] mt-[10px] cursor-pointer"
          >
            <AddCircleOutlineOutlinedIcon className="text-[#333]" />
            <p className="text-[#333]">Chọn địa chỉ giao hàng</p>
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
