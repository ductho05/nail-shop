import numeral from "numeral";
import { jwtDecode } from "jwt-decode";

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
