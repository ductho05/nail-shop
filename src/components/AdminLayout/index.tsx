"use c;ient";
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { Response } from "@/interface/Response";
import Order from "@/interface/Order";
import { apiGetAllOrder, getProduct } from "@/api/data.api";
import {
  pauseLoadingInitial,
  setOrderList,
  setProductList,
} from "@/stores/adminDataSlice";
import Product from "@/interface/Product";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadingInitial } = useAppSelector((state) => state.adminData);
  const { accessToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const fetchOrder = async () => {
    if (accessToken) {
      const response: Response<Order> = await apiGetAllOrder(accessToken);
      if (response.success && response.data) {
        dispatch(setOrderList(response.data));
      }
    }
  };

  const fechProduct = async () => {
    const response: Response<Product[]> = await getProduct();
    if (response.success && response.data) {
      dispatch(setProductList(response.data));
    }
  };

  useEffect(() => {
    if (loadingInitial) {
      fetchOrder();
      fechProduct();
      dispatch(pauseLoadingInitial());
    }
  }, [loadingInitial]);

  return (
    <div className="flex">
      <div className="w-[250px] border-r min-h-screen fixed left-0 bg-white">
        <NavBar />
      </div>
      <div className="flex-1">
        <div className="fixed top-0 left-[250px] right-0 bg-white z-[100]">
          <TopBar />
        </div>
        <div className="min-h-[86.5vh] h-full bg-[#fafafb] mt-[60px] ml-[250px] p-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
}
