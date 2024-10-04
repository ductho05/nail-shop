import Order from "@/interface/Order";
import React from "react";
import CheckoutItem from "../CheckoutItem";
import CartItem from "@/interface/CartItem";
import { formatDate, formatPrice } from "@/utils/function";
import InfoItem from "./InfoItem";

function OrderInformation({
  order,
  productList,
}: {
  order: Order;
  productList: Array<CartItem>;
}) {
  return (
    <div className="mt-[20px] border rounded-[6px] p-[20px] flex items-start">
      <div className="flex-[2] border-r">
        <div className="flex flex-col gap-[20px] py-[10px] border-b">
          <h1 className="text-xl text-[#666] font-bold">Địa chỉ người nhận</h1>
          <p>{order?.address?.nameCustomer}</p>
          <p>{`${order?.address?.street}, ${order?.address?.ward}, ${order?.address?.district}, ${order?.address?.city}`}</p>
        </div>
        {productList.map((item, index) => (
          <CheckoutItem
            key={index}
            cartItem={item}
            noneBorder={index + 1 === productList.length}
          />
        ))}
      </div>
      <div className="flex-1 flex flex-col items-start gap-[10px] pl-[20px]">
        <InfoItem title="Số đơn hàng:" value={order?.order_number} />
        <InfoItem
          title="Ngày tạo đơn hàng:"
          value={formatDate(order?.created_at || "")}
        />
        <InfoItem
          title="Tổng tiền: "
          value={`${formatPrice(order?.total || 0)} đ`}
          isPrimary={true}
        />
      </div>
    </div>
  );
}

export default OrderInformation;
