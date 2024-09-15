"use client";
import { getProduct } from "@/api/data.api";
import ProductFrame from "@/components/ProductFrame";
import SlickHome from "@/components/SlickHome";
import Product from "@/interface/Product";
import { Response } from "@/interface/Response";
import { pauseLoadingInitial, setProduct } from "@/stores/commonSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useEffect } from "react";

export default function Home() {
  const { loadingInitial, productList } = useAppSelector(
    (state) => state.common
  );
  const dispatch = useAppDispatch();

  const fechProduct = async () => {
    const response: Response<Product[]> = await getProduct();
    if (response.success) {
      if (response.data) {
        dispatch(setProduct(response.data));
      }
      dispatch(pauseLoadingInitial());
    }
  };

  useEffect(() => {
    if (loadingInitial) {
      fechProduct();
    }
  }, [loadingInitial]);

  return (
    <div>
      <SlickHome />
      <div className="p-[40px]">
        <ProductFrame
          isSlide
          title="Sản phẩm bán chạy nhất"
          productList={productList ? productList?.slice(0, 10) : []}
        />

        <ProductFrame
          isSlide={false}
          title="Sản phẩm được yêu thích nhất"
          productList={productList ? productList?.slice(0, 10) : []}
        />

        <ProductFrame
          isSlide
          title="Sản phẩm được đánh giá cao nhất"
          productList={productList ? productList?.slice(0, 10) : []}
        />

        <ProductFrame
          isSlide={false}
          title="Sản phẩm được mới nhất"
          productList={productList ? productList?.slice(0, 10) : []}
        />
      </div>
    </div>
  );
}
