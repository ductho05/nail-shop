"use client";
import { apiGetOrderByUser } from "@/api/user.api";
import MyOrderList from "@/components/MyOrderList";
import { ORDER_STATUS, ORDER_STATUS_VN } from "@/enum/User.enum";
import Order from "@/interface/Order";
import { Response } from "@/interface/Response";
import { useAppSelector } from "@/stores/store";
import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";

function MyOrder() {
  const { accessToken, idUser } = useAppSelector((state) => state.user);

  const [currentTab, setCurrentTab] = useState("1");
  const [myOrderList, setMyOrderList] = useState<Array<Order>>([]);
  const [pendingOrder, setPendingOrder] = useState<Array<Order>>([]);
  const [pidOrder, setPidOrder] = useState<Array<Order>>([]);
  const [processingOrder, setProcessingOrder] = useState<Array<Order>>([]);
  const [completedOrder, setCompletedOrder] = useState<Array<Order>>([]);
  const [cancelledOrder, setCancelledOrder] = useState<Array<Order>>([]);

  // tabs list
  const itemsTab: TabsProps["items"] = [
    {
      key: "1",
      label: `Tất cả (${myOrderList?.length})`,
      children: <MyOrderList listOrder={myOrderList} />,
    },
    {
      key: "2",
      label: `${ORDER_STATUS_VN.PENDING} (${pendingOrder?.length})`,
      children: <MyOrderList listOrder={pendingOrder} />,
    },
    {
      key: "3",
      label: `${ORDER_STATUS_VN.PAID} (${pidOrder?.length})`,
      children: <MyOrderList listOrder={pidOrder} />,
    },
    {
      key: "4",
      label: `${ORDER_STATUS_VN.PROCESSING} (${processingOrder?.length})`,
      children: <MyOrderList listOrder={processingOrder} />,
    },
    {
      key: "5",
      label: `${ORDER_STATUS_VN.COMPLETED} (${completedOrder?.length})`,
      children: <MyOrderList listOrder={completedOrder} />,
    },
    {
      key: "6",
      label: `${ORDER_STATUS_VN.CANCELLED} (${cancelledOrder?.length})`,
      children: <MyOrderList listOrder={cancelledOrder} />,
    },
  ];

  // handle set tab key when changed
  const onChange = (key: string) => {
    setCurrentTab(key);
  };

  // hanbdle filter order list by status
  const handleFilterOrderByStatus = () => {
    let pendingOrderList: Array<Order> = [];
    let pidOrderList: Array<Order> = [];
    let processingOrderList: Array<Order> = [];
    let completedOrderList: Array<Order> = [];
    let cancelledOrderList: Array<Order> = [];

    myOrderList.forEach((order) => {
      if (order.status === ORDER_STATUS.PENDING) {
        pendingOrderList.push(order);
      } else if (order.status === ORDER_STATUS.PAID) {
        pidOrderList.push(order);
      } else if (order.status === ORDER_STATUS.PROCESSING) {
        processingOrderList.push(order);
      } else if (order.status === ORDER_STATUS.COMPLETED) {
        completedOrderList.push(order);
      } else {
        cancelledOrderList.push(order);
      }
    });

    setPendingOrder(pendingOrderList);
    setPidOrder(pidOrderList);
    setProcessingOrder(processingOrderList);
    setCompletedOrder(completedOrderList);
    setCancelledOrder(cancelledOrderList);
  };

  const fetchMyOrder = async () => {
    if (accessToken && idUser) {
      const response: Response<Array<Order>> = await apiGetOrderByUser(
        accessToken,
        idUser
      );
      if (response.success && response.data) {
        setMyOrderList(response.data);
      }
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  useEffect(() => {
    handleFilterOrderByStatus();
  }, [myOrderList]);

  return (
    <div>
      <h1 className="text-xl font-bold py-[20px] text-[#666]">
        Danh sách đơn hàng của tôi
      </h1>
      <Tabs
        size="large"
        defaultActiveKey={currentTab}
        items={itemsTab}
        onChange={onChange}
      />
    </div>
  );
}

export default MyOrder;
