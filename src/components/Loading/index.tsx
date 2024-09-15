import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import style from "./Loading.module.css";

function Loading() {
  return (
    <div className={style.loading}>
      <Player
        autoplay
        loop
        src={require("../../assets/jsons/loading.json")}
        style={{ height: "100px", width: "100px" }}
      />
    </div>
  );
}

export default Loading;
