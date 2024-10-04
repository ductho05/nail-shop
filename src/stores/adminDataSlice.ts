import Order from "@/interface/Order";
import { createSlice } from "@reduxjs/toolkit";

interface adminState {
  loading: boolean;
  loadingInitial: boolean;
  orderList: Order[];
}

const initialState: adminState = {
  loading: false,
  loadingInitial: true,
  orderList: [],
};

export const adminDataSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
      state.loadingInitial = false;
    },

    pauseLoadingInitial: (state) => {
      state.loadingInitial = false;
    },
  },
});

export const { setOrderList, pauseLoadingInitial } =
  adminDataSlice.actions;
export const adminDataReducer = adminDataSlice.reducer;
