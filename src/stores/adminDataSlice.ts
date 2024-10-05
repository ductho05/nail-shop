import Order from "@/interface/Order";
import Product from "@/interface/Product";
import { createSlice } from "@reduxjs/toolkit";

interface adminState {
  loading: boolean;
  loadingInitial: boolean;
  orderList: Order[];
  productList: Product[]
}

const initialState: adminState = {
  loading: false,
  loadingInitial: true,
  orderList: [],
  productList: []
};

export const adminDataSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },

    setProductList: (state, action) => {
      state.productList = action.payload
    },

    pauseLoadingInitial: (state) => {
      state.loadingInitial = false;
    },
  },
});

export const { setOrderList, pauseLoadingInitial, setProductList } =
  adminDataSlice.actions;
export const adminDataReducer = adminDataSlice.reducer;
