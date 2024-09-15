"use client";
import Button from "@/components/Button";
import CartProductItem from "@/components/CartItem";
import CheckBox from "@/components/Checkbox";
import FrameStyle from "@/components/FrameStyle";
import { TYPE_BUTTON } from "@/enum/Button.enum";
import CartItem from "@/interface/CartItem";
import { userRoutes } from "@/routes/route";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { updateListCheckout } from "@/stores/userSlice";
import { ORANGE_COLOR } from "@/utils/colors";
import { formatPrice } from "@/utils/function";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CartDetail() {
  const router = useRouter();
  const { cart, listCheckout } = useAppSelector((state) => state.user);
  const [checkedAll, setChekcedAll] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [listSelected, setListSelected] =
    useState<Array<CartItem>>(listCheckout);

  const handelChangeCheckAll = () => {
    setChekcedAll((prev) => !prev);
  };

  const calculateNumSelected = () => {
    return listSelected.reduce((prev, cur) => prev + cur.quantity, 0);
  };

  const calculateTotalPrice = () => {
    return listSelected.reduce(
      (prev, cur) => prev + cur.quantity * cur.product.price,
      0
    );
  };

  const isSelected = (cartItem: CartItem) => {
    const findIndex = listSelected.findIndex(
      (item) => item.product._id === cartItem.product._id
    );
    return findIndex !== -1;
  };

  const handleCheckCartItem = (cartItem: CartItem) => {
    if (isSelected(cartItem)) {
      const newList = listSelected.filter(
        (item) => item.product._id !== cartItem.product._id
      );
      setListSelected(newList);
      dispatch(updateListCheckout(newList));
    } else {
      let newList = listSelected;
      newList = [...newList, cartItem];
      setListSelected(newList);
      dispatch(updateListCheckout(newList));
    }
  };

  const handleToCheckout = () => {
    router.push(userRoutes.CHECKOUT);
  };

  useEffect(() => {
    if (!isFirst) {
      if (checkedAll) {
        setListSelected(cart);
        dispatch(updateListCheckout(cart));
        return;
      }
      setListSelected([]);
      dispatch(updateListCheckout([]));
    }
    setIsFirst(false);
  }, [checkedAll]);

  useEffect(() => {
    if (listSelected.length === cart.length) {
      setChekcedAll(true);
      return;
    }
    setChekcedAll(false);
  }, [listCheckout]);

  return (
    <div className="px-[40px] py-[20px] min-h-[calc(100vh-324px)]">
      {cart.length > 0 ? (
        <>
          <FrameStyle>
            <CheckBox
              checked={checkedAll}
              disable={false}
              label={`Chọn tất cả(${cart.length})`}
              onChange={handelChangeCheckAll}
            />
          </FrameStyle>
          <div className="flex items-start gap-[20px]">
            <div className="p-[20px] rounded-[6px] shadow-[rgba(7,_65,_210,_0.1)_0px_1px_10px] mt-[20px] flex-[3]">
              {cart.map((cartItem, index) => (
                <CartProductItem
                  key={index}
                  onChange={() => handleCheckCartItem(cartItem)}
                  checked={isSelected(cartItem)}
                  noneBorder={index + 1 === cart.length}
                  cartItem={cartItem}
                />
              ))}
            </div>
            <div className="flex-1 shadow-[rgba(7,_65,_210,_0.1)_0px_1px_10px] mt-[20px] p-[20px] rounded-[6px] flex flex-col gap-[20px]">
              <h1 className="text-xl uppercase text-[#333]">
                Chi tiết thanh toán
              </h1>
              <p className="text-[#333]">
                Số lượng sản phẩm: {calculateNumSelected()}
              </p>
              <div className="flex items-center gap-[20px]">
                <p className="text-[#333]">Tổng thanh toán: </p>
                <p
                  className="font-bold text-xl"
                  style={{
                    color: ORANGE_COLOR,
                  }}
                >
                  {formatPrice(calculateTotalPrice())} đ
                </p>
              </div>
              <Button
                disabled={listSelected.length === 0}
                width="100%"
                type={TYPE_BUTTON.PRIMARY}
                title="Mua hàng"
                onClick={handleToCheckout}
              />
            </div>
          </div>
        </>
      ) : (
        <FrameStyle className="h-[60vh] flex flex-col items-center justify-center">
          <h1 className="font-bold text-[#333] text-xl">
            Giỏ hàng của bạn hiện tại đang trống!
          </h1>
          <Player
            autoplay
            loop
            src={require("@/assets/jsons/CartEmpty.json")}
            style={{ height: "10vw", width: "10vw" }}
          />
          <Button
            title="Xem sản phẩm ngay!"
            type={TYPE_BUTTON.PRIMARY}
            onClick={() => {}}
          />
        </FrameStyle>
      )}
    </div>
  );
}

export default CartDetail;
