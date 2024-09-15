import Product from "@/interface/Product";
import { createSlice } from "@reduxjs/toolkit";

interface commonState {
  loading: boolean;
  loadingInitial: boolean;
  productList: Product[];
}

const initialState: commonState = {
  loading: false,
  loadingInitial: true,
  productList: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    pauseLoading: (state) => {
      state.loading = false;
    },

    playLoading: (state) => {
      state.loading = true;
    },

    setProduct: (state, action) => {
      state.productList = action.payload;
    },

    pauseLoadingInitial: (state) => {
      state.loadingInitial = false;
    },
  },
});

export const { pauseLoading, playLoading, setProduct, pauseLoadingInitial } =
  commonSlice.actions;
export const commonReducer = commonSlice.reducer;
