import Order from "@/interface/Order";
import React from "react";
import MyOrderItem from "./MyOrderItem";

function MyOrderList({ listOrder }: { listOrder: Array<Order> }) {
  return (
    <div className="flex flex-col gap-[20px]">
      {listOrder.map((order) => (
        <MyOrderItem key={order._id} order={order} />
      ))}
    </div>
  );
}

export default MyOrderList;
