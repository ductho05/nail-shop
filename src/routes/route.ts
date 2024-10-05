import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

export enum publicRoutes {
  HOME = "/",
  PRODUCT_DETAIL = "/product_detail",
}

export enum userRoutes {
  CART = "/cart-detail",
  CHECKOUT = "/payment",
  PROFILE = "/account/profile",
  MY_ORDER = "/account/my-order",
  MY_ADDRESS = "/account/my-address",
  MY_ORDER_DETAIL = "/account/my-order/detail"
}

export enum authRoutes {
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  AUTH_OTP = "/auth/otp",
}

export const publicRouteList = ["/", "/product_detail"];
export const authRouteList = ["/auth/login", "/auth/register", "/auth/otp"];

export const accountRouteList = [
  {
    title: "Thông tin tài khoản",
    iconName: AccountCircleIcon,
    route: "/account/profile",
  },
  {
    title: "Đơn hàng",
    iconName: FilterFramesIcon,
    route: "/account/my-order",
  },
  {
    title: "Địa chỉ giao hàng",
    iconName: FmdGoodIcon,
    route: "/account/my-address",
  },
];

export const privateRouteList = [
  "/cart-detail",
  "/payment",
  "/account/profile",
  "/account/my-order",
  "/account/my-address",
];
