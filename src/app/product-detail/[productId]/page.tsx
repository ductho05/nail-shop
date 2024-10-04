"use client";
import { getProductById } from "@/api/data.api";
import Button from "@/components/Button";
import ProductFrame from "@/components/ProductFrame";
import { TYPE_BUTTON } from "@/enum/Button.enum";
import Product, { ProductData } from "@/interface/Product";
import { Response } from "@/interface/Response";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { ORANGE_COLOR, ORANGE_COLOR2, TEXT_COLOR } from "@/utils/colors";
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
import FrameStyle from "@/components/FrameStyle";
import FavoriteButton from "@/components/ProductDetail/FavoriteButton";
import ProductInfoItem from "@/components/ProductDetail/IProductInfoItem";
import Descrription from "@/components/ProductDetail/Descrription";
import ProductRate from "@/components/ProductDetail/ProductRate";

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
      <FrameStyle className="flex mb-[20px]">
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
                  color: ORANGE_COLOR2,
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
            <ProductInfoItem fLabel="100" sLabel="Đánh giá" isBorder={true} />
            <ProductInfoItem fLabel={product.sold} sLabel="Đã bán" />
          </div>
          <div className="my-[20px]">
            <h1
              className="text-4xl font-bold"
              style={{
                color: ORANGE_COLOR2,
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
          <FavoriteButton />
        </div>
      </FrameStyle>

      <ProductFrame
        isSlide
        title="Sản phẩm liên quan"
        productList={productList}
      />

      <Descrription description={product.description || ""} />

      <ProductRate rates={rates} />
    </div>
  );
}

export default ProductDetail;
