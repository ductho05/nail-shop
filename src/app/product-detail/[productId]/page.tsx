"use client";
import { getProductById } from "@/api/data.api";
import Button from "@/components/Button";
import ProductFrame from "@/components/ProductFrame";
import { TYPE_BUTTON } from "@/enum/Button.enum";
import Product, { ProductData } from "@/interface/Product";
import { Response } from "@/interface/Response";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { ORANGE_COLOR, TEXT_COLOR } from "@/utils/colors";
import { base64ToImageUrl, formatPrice } from "@/utils/function";
import { HeartOutlined } from "@ant-design/icons";
import { Alert, InputNumber, InputNumberProps, Rate, Tag } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import CartItem from "@/interface/CartItem";
import { addToCart } from "@/stores/userSlice";
import { authRoutes } from "@/routes/route";
import { TYPE_ERROR } from "@/enum/User.enum";

function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId;
  const { productList } = useAppSelector((state) => state.common);
  const { cart, isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product>({
    price: 0,
    stock: 0,
    sold: 0,
  });
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityInCart, setQuantityInCart] = useState(1);
  const [rates, setRates] = useState([0, 0, 0, 0, 0]);

  const handleChangeQuantity: InputNumberProps["onChange"] = (value) => {
    if (value) {
      setQuantity(Number.parseInt(value.toString()));
    }
  };

  const checkQuantity = (quantity: number) => {
    return quantity + quantityInCart <= product.stock;
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      if (checkQuantity(quantity)) {
        const cartItem: CartItem = {
          quantity,
          product,
        };
        dispatch(addToCart(cartItem));
        message.success("Sản phẩm đã được thêm vào giỏ hàng!");
        return;
      }
      message.warning("Số lượng sản phẩm trong kho không đủ!");
      return;
    }
    router.push(
      `${authRoutes.LOGIN}?error=${true}&type=${TYPE_ERROR.NOT_LOGIN}`
    );
  };

  const getQuantityInCart = () => {
    cart.forEach((cartItem) => {
      if (cartItem.product?._id === product._id) {
        setQuantityInCart(cartItem.quantity);
        return;
      }
    });
  };

  const fetchProduct = async (productId: string) => {
    const res = await getProductById(productId);
    setLoading(false);
    if (res) {
      const response: Response<ProductData> = res;
      if (response.success) {
        if (response.data) {
          if (response.data.product) setProduct(response.data.product);
          if (response.data.images) setImages(response.data.images);
          if (response.data.videos) setVideos(response.data.videos);
        }
      }
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId.toString());
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      getQuantityInCart();
    }
  }, [product]);

  return (
    <div className="px-[40px] py-[20px]">
      <div className="p-[20px] rounded-[12px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] mb-[20px] flex">
        <div className="flex-1">
          <img
            src={base64ToImageUrl(product.thumbnail || "")}
            className="w-[500px] h-[500px] object-contain"
          />
          {/* <Carousel>
            {images.map((image) => (
              <div className="ml-[10px]">
                <img
                  src={`${API_URL}${image}`}
                  className="w-[150px] h-[150px] object-contain"
                />
              </div>
            ))}
          </Carousel> */}
        </div>
        <div className="relative flex-[3] ml-[40px]">
          <h1 className="text-2xl text-[#333]">{product.full_name}</h1>
          <div className="flex items-center">
            <div className="flex items-center pr-[10px] border-r">
              <p
                className="text-lg mr-[10px] underline"
                style={{
                  color: ORANGE_COLOR,
                }}
              >
                5.0
              </p>
              <Rate
                disabled
                defaultValue={5}
                style={{
                  fontSize: "16px",
                }}
              />
            </div>
            <div className="flex items-center pl-[10px] border-r">
              <p className="text-lg mr-[10px] text-[#333]">100</p>
              <p className="text-lg mr-[10px] text-[#666]">Đánh giá</p>
            </div>
            <div className="flex items-center pl-[10px]">
              <p className="text-lg mr-[10px] text-[#333]">{product.sold}</p>
              <p className="text-lg mr-[10px] text-[#666]">Đã bán</p>
            </div>
          </div>
          <div className="my-[20px]">
            <h1
              className="text-4xl font-bold"
              style={{
                color: ORANGE_COLOR,
              }}
            >
              {formatPrice(product.price || 0)} đ
            </h1>
          </div>
          <div className="my-[20px] flex items-center">
            <p className="text-lg mr-[100px]">Số lượng: </p>
            <InputNumber
              size="large"
              min={1}
              max={1000}
              defaultValue={quantity}
              onChange={handleChangeQuantity}
              status="warning"
              style={{ width: 150 }}
            />
          </div>
          <div className="my-[20px] flex items-center">
            <Alert
              message={product.stock > 0 ? "Còn hàng" : "Hết hàng"}
              type={product.stock > 0 ? "success" : "error"}
            />
            <p className="text-lg text-[#333] ml-[20px]">
              {product.stock} sản phẩm có sẵn
            </p>
          </div>
          <div className="my-[20px] flex items-center gap-[20px]">
            <Button
              title="Thêm vào giỏ hàng"
              type={TYPE_BUTTON.LINE}
              onClick={handleAddToCart}
            />

            <Button
              title="Mua ngay"
              type={TYPE_BUTTON.PRIMARY}
              onClick={() => {}}
            />
          </div>
          <div className="absolute right-[400px] top-[100px] cursor-pointer w-[40px] h-[40px] rounded-[100%] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] flex items-center justify-center">
            <HeartOutlined className="text-[#666] text-xl" />
          </div>
        </div>
      </div>

      <ProductFrame
        isSlide
        title="Sản phẩm liên quan"
        productList={productList}
      />

      <div className="p-[20px] rounded-[12px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] mb-[20px]">
        <h1
          className={`text-[${TEXT_COLOR}] font-bold text-lg pb-[20px] border-b mb-[10px]`}
        >
          Mô tả sản phẩm
        </h1>
        <p dangerouslySetInnerHTML={{ __html: product.description || "" }} />
      </div>

      <div className="p-[20px] rounded-[12px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] mb-[20px]">
        <h1
          className={`text-[${TEXT_COLOR}] font-bold text-lg pb-[20px] border-b mb-[10px]`}
        >
          Đánh giá sản phẩm
        </h1>

        <div className="flex items-center mb-2 ">
          <div className="flex items-center flex-col pr-[10px] flex-[1]">
            <p
              className="text-4xl mr-[10px]"
              style={{
                color: ORANGE_COLOR,
              }}
            >
              5.0
            </p>
            <Rate
              disabled
              defaultValue={5}
              style={{
                fontSize: "16px",
              }}
            />
          </div>
          <div className="flex-[6] ml-[20px]">
            {rates.map((rate, index) => (
              <div key={index} className="flex items-center mt-4">
                <p className="text-sm font-medium text-[#333]">
                  {index + 1} sao
                </p>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-300 rounded"
                    style={{ width: `${rate}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {rate}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
