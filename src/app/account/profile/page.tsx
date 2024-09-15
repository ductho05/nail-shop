"use client";
import { useAppSelector } from "@/stores/store";
import React from "react";

function Profile() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div>
      <h1 className="text-xl font-bold py-[20px] border-b">
        Thông tin tài khoản của bạn
      </h1>
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default Profile;
