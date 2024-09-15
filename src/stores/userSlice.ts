import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type User from "@/interface/User";
import CartItem from "@/interface/CartItem";
import { deleteCookie, setCookie } from "cookies-next";

export interface UserState {
  user?: User;
  isLoggedIn?: boolean;
  accessToken?: string;
  idUser?: string;
  cart: Array<CartItem>;
  listCheckout: Array<CartItem>;
}

export interface authState {
  isLoggedIn: boolean;
  accessToken: string;
}

const initialState: UserState = {
  user: {},
  isLoggedIn: false,
  accessToken: "",
  idUser: "",
  cart: [],
  listCheckout: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      const { accessToken, idUser } = action.payload;
      state.accessToken = accessToken;
      state.isLoggedIn = true;
      state.idUser = idUser;
      const auth: authState = {
        isLoggedIn: true,
        accessToken: accessToken || "",
      };
      setCookie("auth", auth);
    },

    logout: (state) => {
      state.user = {};
      state.accessToken = "";
      state.isLoggedIn = false;
      deleteCookie("auth");
    },

    refreshToken: (state, action: PayloadAction<string>) => {
      const accessToken = action.payload;
      console.log("da vo", accessToken);
      state.accessToken = accessToken;
      const auth: authState = {
        isLoggedIn: true,
        accessToken: accessToken || "",
      };
      setCookie("auth", auth);
    },

    getProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;
      const cartData = state.cart;
      const findIndex = cartData?.findIndex(
        (item) => item?.product?._id === cartItem?.product?._id
      );
      if (findIndex !== -1) {
        cartData[findIndex].quantity += cartItem.quantity;
        state.cart = [...cartData];
        return;
      }

      cartData.push(cartItem);
      state.cart = [...cartData];
    },

    plusToCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;
      const cartData = state.cart;
      const findIndex = cartData?.findIndex(
        (item) => item?.product?._id === cartItem?.product?._id
      );
      cartData[findIndex].quantity += 1;
      state.cart = [...cartData];
    },

    minusToCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;
      const cartData = state.cart;
      const findIndex = cartData?.findIndex(
        (item) => item?.product?._id === cartItem?.product?._id
      );
      if (cartData[findIndex].quantity > 1) {
        cartData[findIndex].quantity -= 1;
        state.cart = [...cartData];
      }
    },

    removeToCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;
      const cartData = state.cart;

      const newList = cartData.filter(
        (item) => item.product._id !== cartItem.product._id
      );
      state.cart = [...newList];
    },

    updateListCheckout: (state, action: PayloadAction<Array<CartItem>>) => {
      const checkoutData = action.payload;
      state.listCheckout = [...checkoutData];
    },
  },
});

export const {
  login,
  logout,
  getProfile,
  addToCart,
  updateListCheckout,
  plusToCart,
  minusToCart,
  removeToCart,
  refreshToken,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
