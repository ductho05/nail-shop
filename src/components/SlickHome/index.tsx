import { Carousel } from "antd";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { ORANGE_COLOR, RED_COLOR } from "@/utils/colors";
import Slick1 from "../../assets/jsons/Slick1.json";
import Slick2 from "../../assets/jsons/Slick2.json";
import Slick3 from "../../assets/jsons/Slick3.json";
import type { SlickItem } from "@/interface/SlickItem";

const slickList: SlickItem[] = [
  {
    title: "Sale linh đình, Dựt Deal cực đỉnh",
    description: "Free ship mọi đơn, mua là có quà",
    background: Slick1,
  },
  {
    title: "Chốt đơn xả kho, Giá sốc vô lo",
    description: "Xả kho giá gốc, Giảm ngay 50%, giao nhanh trong 2h",
    background: Slick2,
  },
  {
    title: "Mọt xả kho nửa giá, càng mua càng giảm",
    description: "Sale giá cực sốc, nhận nhiều ưu đãi hấp dẫn",
    background: Slick3,
  },
];

function SlickHome() {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "50vh",
    lineHeight: "160px",
    textAlign: "center",
    background: "",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundImage: "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)",
  };

  return (
    <div>
      <Carousel autoplay={true}>
        {slickList.map((slick, index) => (
          <div key={index}>
            <div style={contentStyle}>
              <div className="flex-1">
                <h1
                  className="text-6xl font-extrabold"
                  style={{
                    color: ORANGE_COLOR,
                  }}
                >
                  {slick.title}
                </h1>
                <p
                  className="font-semibold text-2xl mt-[20px] "
                  style={{
                    color: RED_COLOR,
                  }}
                >
                  {slick.description}
                </p>
              </div>
              <div className="flex-1">
                <Player
                  autoplay
                  loop
                  src={slick.background}
                  style={{ height: "50vh", width: "50vw" }}
                />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SlickHome;
