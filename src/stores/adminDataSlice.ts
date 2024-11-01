import Category from "@/interface/Category";
import Order from "@/interface/Order";
import Product from "@/interface/Product";
import { createSlice } from "@reduxjs/toolkit";

interface adminState {
  loading: boolean;
  loadingInitial: boolean;
  orderList: Order[];
  productList: Product[];
  categories: Category[]
}

const initialState: adminState = {
  loading: false,
  loadingInitial: true,
  orderList: [],
  productList: [],
  categories: []
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

    setCategories: (state, action) => {
      state.categories = action.payload
    },

    pauseLoadingInitial: (state) => {
      state.loadingInitial = false;
    },

    startLoadingInitial: (state) => {
      state.loadingInitial = true
    }
  },
});

export const { setOrderList, pauseLoadingInitial, setProductList, setCategories, startLoadingInitial } =
  adminDataSlice.actions;
export const adminDataReducer = adminDataSlice.reducer;
