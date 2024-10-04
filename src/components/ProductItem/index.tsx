import Product from "@/interface/Product";
import { ORANGE_COLOR2 } from "@/utils/colors";
import { base64ToImageUrl, formatPrice } from "@/utils/function";
import React from "react";
import { Rate } from "antd";
import Link from "next/link";

function ProductItem({ product }: { product: Product }) {
  return (
    <Link
      href={`/product-detail/${product._id}`}
      className="p-[10px] rounded-[6px] border cursor-pointer h-[440px] block"
    >
      <div className="w-fulll h-[300px] flex items-center justify-center">
        <img
          className="w-fulll h-full object-contain"
          src={base64ToImageUrl(product.thumbnail || "")}
        />
      </div>
      <h1
        className={`text-lg mt-[10px] line-clamp-2 text-ellipsis`}
        style={{
          color: "#333 font-[400]",
        }}
      >
        {product.full_name}
      </h1>
      <p
        className={`text-lg font-bold my-[4px]`}
        style={{
          color: ORANGE_COLOR2,
        }}
      >
        {formatPrice(product.price || 0)} đ
      </p>
      <Rate
        disabled
        defaultValue={5}
        style={{
          fontSize: "16px",
        }}
      />
    </Link>
  );
}

export default ProductItem;
