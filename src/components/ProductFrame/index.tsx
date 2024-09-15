import Product from "@/interface/Product";
import { ORANGE_COLOR, TEXT_COLOR } from "@/utils/colors";
import React from "react";
import ProductItem from "../ProductItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "../Button";
import { TYPE_BUTTON } from "@/enum/Button.enum";

function ProductFrame({
  isSlide,
  title,
  productList,
}: {
  isSlide: boolean;
  title: string;
  productList: Product[];
}) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  const handleToProduct = () => {};

  return (
    <div className="p-[20px] rounded-[12px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] mb-[20px]">
      <h1
        className={`text-[${TEXT_COLOR}] font-bold text-lg pb-[20px] border-b mb-[10px]`}
      >
        {title}
      </h1>
      {isSlide ? (
        <div className="mb-[10px]">
          <Carousel responsive={responsive}>
            {productList.map((product) => (
              <div key={product._id} className="ml-[10px]">
                <ProductItem product={product} />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-[10px] mb-[10px]">
          {productList.map((product) => (
            <div key={product._id}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <Button
          title="Xem thêm"
          onClick={handleToProduct}
          type={TYPE_BUTTON.LINE}
        />
      </div>
    </div>
  );
}

export default ProductFrame;
