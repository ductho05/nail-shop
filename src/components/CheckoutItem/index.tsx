import CartItem from "@/interface/CartItem";
import { ORANGE_COLOR, ORANGE_COLOR2 } from "@/utils/colors";
import { base64ToImageUrl, formatPrice } from "@/utils/function";
import React from "react";

function CheckoutItem({
  cartItem,
  noneBorder = false,
}: {
  cartItem: CartItem;
  noneBorder: boolean;
}) {
  return (
    <div
      className={`py-[20px] pr-[10px] flex ${
        noneBorder ? "border-none" : "border-b"
      }`}
    >
      <div className="w-[150px] h-[150px] flex items-center justify-center">
        <img
          className="w-fulll h-full object-contain"
          src={base64ToImageUrl(cartItem.product?.thumbnail || "")}
        />
      </div>
      <div className="flex-1 text-[#333] mr-[20px]">
        <h1>{cartItem.product?.full_name}</h1>
        <p
          className="font-bold "
          style={{
            color: ORANGE_COLOR2,
          }}
        >
          {formatPrice(cartItem.product?.price || 0)} đ
        </p>
        <p>x{cartItem.quantity}</p>
      </div>
    </div>
  );
}

export default CheckoutItem;
