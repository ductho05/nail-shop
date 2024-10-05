"use client";
import Order from "@/interface/Order";
import React from "react";
import InfoItem from "../OrderInformation/InfoItem";
import { formatPrice } from "@/utils/function";
import { useRouter } from "next/navigation";
import { userRoutes } from "@/routes/route";

function MyOrderItem({ order }: { order: Order }) {
  const router = useRouter();

  const calcQuantity = () => {
    return order?.products?.reduce(
      (total, prevOrder) => total + prevOrder.quantity,
      0
    );
  };

  const handleToMyOrderDetail = () => {
    router.push(`${userRoutes.MY_ORDER_DETAIL}/${order._id}`);
  };

  return (
    <div
      onClick={handleToMyOrderDetail}
      className="p-[20px] cursor-pointer hover:bg-[#1677ff1a] flex items-start"
    >
      <div className="flex-1">
        <h1 className="text-lg font-bold text-[#333] hover:text-[#1677ff] w-full">
          {`${order?.address?.nameCustomer} (${order?.address?.phoneNumber})`}
        </h1>
        <p className="text-lg text-[#333]">{`${order?.address?.street}, ${order?.address?.ward}, ${order?.address?.district}, ${order?.address?.city}`}</p>
      </div>
      <div>
        <InfoItem
          title="Số lượng"
          value={calcQuantity().toString()}
          borderBottom={false}
        />
        <InfoItem
          title="Thành tiền"
          value={`${formatPrice(order?.total || 0)} đ`}
          borderBottom={false}
        />
      </div>
    </div>
  );
}

export default MyOrderItem;
