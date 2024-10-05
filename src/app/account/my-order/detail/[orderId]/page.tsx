"use client";
import {
  apiGetOrderById,
  apiUpdateOrder,
  getProductById,
} from "@/api/data.api";
import { apiConfirmPayment, apiReGeneratePaymentQRCode } from "@/api/user.api";
import FrameStyle from "@/components/FrameStyle";
import AdminPageTitle from "@/components/MoComponent/AdminPageTitle";
import OrderInformation from "@/components/OrderInformation";
import StatusOrder from "@/components/StatusOrder";
import { bankId } from "@/constants";
import { ORDER_STATUS } from "@/enum/User.enum";
import CartItem from "@/interface/CartItem";
import Order, { OrderUpdate } from "@/interface/Order";
import { ProductData } from "@/interface/Product";
import QRCode from "@/interface/QRCode";
import { Response } from "@/interface/Response";
import { pauseLoading, playLoading } from "@/stores/commonSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  convertOrderNextStatus,
  convertOrderNextStatusType,
  formatPrice,
} from "@/utils/function";
import { Button, message, Modal, notification, Popconfirm } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function MyOrderDetail() {
  const { accessToken } = useAppSelector((state) => state.user);
  const [order, setOrder] = useState<Order>();
  const [productList, setProductList] = useState<Array<CartItem>>([]);
  const [api, contextHolder] = notification.useNotification();
  const [isDisplay, setIsDisplay] = useState(false);
  const [qrCodePayment, setQRCodePayment] = useState<QRCode>();

  const params = useParams();
  const orderId = params.orderId;

  const dispatch = useAppDispatch();

  const fetchOrder = async (accessToken: string, orderId: any) => {
    const response = await apiGetOrderById(accessToken, orderId);
    if (response.success) {
      console.log(response.data);
      setOrder(response.data);
    }
  };

  const fetchProductList = async () => {
    let pList: Array<CartItem> = [];
    order?.products?.forEach(async (product) => {
      const response: Response<ProductData> = await getProductById(
        product.productId
      );
      if (response?.success && response.data?.product) {
        pList = [
          ...pList,
          {
            quantity: product.quantity,
            product: response.data.product,
          },
        ];

        setProductList(pList);
      }
    });
  };

  const fetchReQRPayment = async () => {
    if (accessToken && order) {
      const response: Response<QRCode> = await apiReGeneratePaymentQRCode(
        accessToken,
        bankId,
        order._id
      );
      if (response.success) {
        setQRCodePayment(response.data);
      }
    }
  };

  const handleUpdateOrder = async (status?: string, id?: string) => {
    if (status && id && accessToken) {
      const order: OrderUpdate = {
        status: ORDER_STATUS.CANCELLED,
      };
      dispatch(playLoading());
      const response: Response<string> = await apiUpdateOrder(
        accessToken,
        id,
        order
      );
      dispatch(pauseLoading());
      if (response.success) {
        message.success(response.data);
        await fetchOrder(accessToken, id);
        return;
      }
      message.error(response.data);
    }
  };

  const onClose = () => {
    setIsDisplay(false);
  };

  const handleOpenPaymentModal = () => {
    setIsDisplay(true);
  };

  const handleWhenFinishPayment = async () => {
    if (accessToken && orderId) {
      await fetchOrder(accessToken, orderId);
    }
  };

  const handleConfirmPayment = async () => {
    if (accessToken && order?._id) {
      dispatch(playLoading());
      const response: Response<string> = await apiConfirmPayment(
        accessToken,
        order._id
      );
      dispatch(pauseLoading());
      if (response.success) {
        setIsDisplay(false);
        Modal.success({
          title: response.data,
          content: (
            <p>Vui lòng chờ quản trị viên xác nhận và giao hàng đến bạn!</p>
          ),
          onOk: handleWhenFinishPayment,
        });

        return;
      }
      message.error(response.data);
    }
  };

  useEffect(() => {
    if (orderId && accessToken) {
      fetchOrder(accessToken, orderId);
    }
  }, [orderId]);

  useEffect(() => {
    if (order) {
      fetchProductList();
    }
  }, [order]);

  useEffect(() => {
    if (order?.status === ORDER_STATUS.PENDING) {
      fetchReQRPayment();
    }
  }, [order]);

  return (
    <div className="mr-[20px]">
      {contextHolder}
      <Modal
        title="Vui lòng quét mã QR để hoàn tất thanh toán đơn hàng"
        open={isDisplay}
        onCancel={onClose}
        footer={[]}
        width={"70vw"}
      >
        <div className="flex items-start gap-[20px]">
          <img src={qrCodePayment?.base64QRCode} alt="QRCode payment" />
          <div className="text-lg flex flex-col gap-[20px]">
            <h1 className="font-bold text-xl">Thông tin đơn hàng</h1>
            <p>
              Người nhận:{" "}
              {`${order?.address.nameCustomer} (${order?.address.phoneNumber})`}
            </p>
            <p>
              Địa chỉ nhận hàng:{" "}
              {`${order?.address.street}, ${order?.address.ward}, ${order?.address.district}, ${order?.address.city}`}
            </p>
            <p>Thành tiền: {formatPrice(order?.total || 0)} đ</p>
            <Button
              type="primary"
              onClick={handleConfirmPayment}
              className="mt-[20px]"
              size="large"
            >
              Xác nhận thanh toán
            </Button>
          </div>
        </div>
      </Modal>
      <div className="bg-white flex items-center justify-between py-[20px]">
        <AdminPageTitle title="Chi tiết đơn hàng" />
        <StatusOrder orderId={order?._id} status={order?.status} />
      </div>
      <div className="bg-white mt-[20px]">
        {order?.status === ORDER_STATUS.PENDING ? (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Button
                size="middle"
                type="primary"
                onClick={handleOpenPaymentModal}
              >
                Thanh toán đơn hàng
              </Button>
            </div>
            <div>
              <Popconfirm
                title="Xác nhận huỷ đơn hàng"
                description="Đơn hàng của bạn sẽ bị huỷ?"
                onConfirm={() => handleUpdateOrder(order?.status, order?._id)}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button size="middle" danger>
                  Huỷ đơn hàng
                </Button>
              </Popconfirm>
            </div>
          </div>
        ) : (
          <></>
        )}
        {order && <OrderInformation order={order} productList={productList} />}
      </div>
    </div>
  );
}

export default MyOrderDetail;
