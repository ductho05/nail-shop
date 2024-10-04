import CartItem from "@/interface/CartItem";
import { base64ToImageUrl, formatPrice } from "@/utils/function";
import React, { useState } from "react";
import Input from "../Input";
import { ORANGE_COLOR, ORANGE_COLOR2 } from "@/utils/colors";
import { DeleteOutlined } from "@ant-design/icons";
import CheckBox from "../Checkbox";
import { useAppDispatch } from "@/stores/store";
import { minusToCart, plusToCart, removeToCart } from "@/stores/userSlice";

function CartProductItem({
  cartItem,
  noneBorder = false,
  checked = false,
  onChange,
}: {
  cartItem: CartItem;
  noneBorder: boolean;
  checked: boolean;
  onChange: Function;
}) {
  const [quantity, setQuantity] = useState<number>(cartItem.quantity);
  const dispatch = useAppDispatch();
  const handleChangeQuantity = (value: number) => {
    if (value) {
      setQuantity(value);
    }
  };

  const handlePlus = () => {
    dispatch(plusToCart(cartItem));
  };

  const handleMinus = () => {
    if (quantity > 1) {
      dispatch(minusToCart(cartItem));
    }
  };

  const handleRemove = () => {
    dispatch(removeToCart(cartItem));
  };

  return (
    <div
      className={`py-[20px] pr-[10px] flex ${
        noneBorder ? "border-none" : "border-b"
      }`}
    >
      <div className="flex items-center">
        <CheckBox
          checked={checked}
          disable={false}
          label=""
          onChange={() => onChange()}
        />
      </div>
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
      <div className="flex items-center gap-[20px]">
        <Input
          defaultValue={cartItem.quantity}
          width={50}
          onChange={handleChangeQuantity}
          value={cartItem.quantity}
          onPlus={handlePlus}
          onMinus={handleMinus}
        />
        <DeleteOutlined
          className="text-[24px] cursor-pointer"
          style={{
            color: ORANGE_COLOR,
          }}
          onClick={handleRemove}
        />
      </div>
    </div>
  );
}

export default CartProductItem;
