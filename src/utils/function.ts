import numeral from "numeral";
import { jwtDecode } from "jwt-decode";
import { ORDER_STATUS, ORDER_STATUS_VN, PAYMENT_METHOD } from "@/enum/User.enum";

export function base64ToImageUrl(base64String: string) {
  const dataUri = `data:image/png;base64,${base64String}`;

  return dataUri;
}

export function formatPrice(price: number) {
  return numeral(price).format("0,0 đ");
}

export const formatNumber = (number: number) => {
  if (number <= 9) {
    return `0${number}`;
  }
  return number;
};

export function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken && decodedToken.exp) {
    const expirationTime = decodedToken.exp * 1000 - 5 * 60 * 1000;
    const currentTime = Date.now();
    return currentTime > expirationTime;
  }
  return true;
};

export const isAdmin = (token: string) => {
  const decodedToken:any = jwtDecode(token);
  return decodedToken?.roles === 'admin'
  
};

export const convertOrderStatusText = (status?: string) => {

  return status === ORDER_STATUS.PENDING
  ? ORDER_STATUS_VN.PENDING
  : status === ORDER_STATUS.PAID
  ? ORDER_STATUS_VN.PAID
  : status === ORDER_STATUS.PROCESSING
  ? ORDER_STATUS_VN.PROCESSING
  : status === ORDER_STATUS.COMPLETED
  ? ORDER_STATUS_VN.COMPLETED
  : ORDER_STATUS_VN.CANCELLED;
}

export const convertOrderStatusType = (status?: string) => {

  return status === ORDER_STATUS.PENDING
  ? "purple"
  : status === ORDER_STATUS.PAID
  ? "geekblue"
  : status === ORDER_STATUS.PROCESSING
  ? "blue"
  : status === ORDER_STATUS.COMPLETED
  ? "cyan"
  : "red";
}

export const convertOrderNextStatus = (status?: string) => {

  return status === ORDER_STATUS.PENDING
  ? "Xác nhận thanh toán"
  : status === ORDER_STATUS.PAID
  ? "Vận chuyển đơn hàng"
  : status === ORDER_STATUS.PROCESSING
  ? "Hoàn thành đơn hàng":""
}

export const convertOrderNextStatusType = (status?: string) => {

  return status === ORDER_STATUS.PENDING
  ? ORDER_STATUS.PAID
  : status === ORDER_STATUS.PAID
  ? ORDER_STATUS.PROCESSING
  : status === ORDER_STATUS.PROCESSING
  ? ORDER_STATUS.COMPLETED:ORDER_STATUS.CANCELLED
}

export const convertPaymentMethodText = (paymentMethod: string) => {
  return paymentMethod === PAYMENT_METHOD.BANK_TRANSFER ? "Quét mã QR thanh toán" : "Thanh toán khi nhận hàng"
}

export const formatDate = (date: string) => {

  const currentDate = new Date(date)
  let day: any = currentDate.getDate()
  let month: any = currentDate.getMonth() + 1
  let year: any = currentDate.getFullYear()
  let hour: any = currentDate.getHours()
  let minus: any = currentDate.getMinutes()

  if (day < 10) day = `0${day}`
  if (month < 10) month = `0${month}`
  if (hour < 10) hour = `0${hour}`
  if (minus < 10) minus = `0${minus}`

  return `${hour}:${minus} ${day}-${month}-${year}`
}
