"use client";
import {
  apiGetOrderById,
  apiUpdateOrder,
  getProductById,
} from "@/api/data.api";
import FrameStyle from "@/components/FrameStyle";
import AdminPageTitle from "@/components/MoComponent/AdminPageTitle";
import OrderInformation from "@/components/OrderInformation";
import StatusOrder from "@/components/StatusOrder";
import { ORDER_STATUS } from "@/enum/User.enum";
import CartItem from "@/interface/CartItem";
import Order, { OrderUpdate } from "@/interface/Order";
import { ProductData } from "@/interface/Product";
import { Response } from "@/interface/Response";
import { pauseLoading, playLoading } from "@/stores/commonSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  convertOrderNextStatus,
  convertOrderNextStatusType,
} from "@/utils/function";
import { Button, message, notification } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditAddOrder() {
  const { accessToken } = useAppSelector((state) => state.user);
  const [order, setOrder] = useState<Order>();
  const [productList, setProductList] = useState<Array<CartItem>>([]);
  const [api, contextHolder] = notification.useNotification();

  const params = useParams();
  const orderId = params.orderId;

  const dispatch = useAppDispatch();

  const fetchOrder = async (accessToken: string, orderId: any) => {
    const response = await apiGetOrderById(accessToken, orderId);
    if (response.success) {
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

  const handleUpdateOrder = async (status?: string, id?: string) => {
    if (status && id && accessToken) {
      const order: OrderUpdate = {
        status: convertOrderNextStatusType(status),
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

  return (
    <div>
      {contextHolder}
      <FrameStyle className="bg-white flex items-center justify-between">
        <AdminPageTitle title="Chi tiết đơn hàng" />
        <StatusOrder orderId={order?._id} status={order?.status} />
      </FrameStyle>
      <FrameStyle className="bg-white mt-[20px]">
        <div className="flex items-center gap-[20px]">
          {order?.status !== ORDER_STATUS.COMPLETED ? (
            <>
              <p className="text-lg text-[#333]">Thao tác đơn hàng: </p>
              <Button
                size="middle"
                type="primary"
                onClick={() => handleUpdateOrder(order?.status, order?._id)}
              >
                {convertOrderNextStatus(order?.status)}
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
        {order && <OrderInformation order={order} productList={productList} />}
      </FrameStyle>
    </div>
  );
}

export default EditAddOrder;
