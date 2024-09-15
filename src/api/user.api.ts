import { API_URL } from "@/constants";
import { Response } from "@/interface/Response";
import User from "@/interface/User";
import axios from "axios";
import { getAuthInstance } from "./auth";

export const apiLogin = async (data: any) => {
  const response: Response<String> = {
    success: false,
  };
  try {
    const res = await axios.post(`${API_URL}/auth/signin`, data);
    if (res.status === 200) {
      response.success = true;
      response.data = res.data.msg;
    }
  } catch (error) {
    response.success = false;
    response.data = "Có lỗi xảy ra. Vui lòng đăng nhập lại!";
  } finally {
    return response;
  }
};

export const apiAuthOtp = async (data: any) => {
  const response: Response<any> = {
    success: false,
  };
  try {
    const res = await axios.post(`${API_URL}/auth/enter-otp`, data);
    if (res.status === 200) {
      if (res.data.hasOwnProperty("error")) {
        response.data = {
          message: "Mã Otp không tồn tại. Vui lòng thử lại!",
        };
        return;
      }
      response.success = true;
      response.data = {
        message: "Xác thực mã OTP thành công!",
        access_token: res.data.access_token,
        idUser: res.data.idUser,
      };
    }
  } catch (error: any) {
    response.success = false;
    response.data = {
      message: error?.response?.data?.message,
    };
  } finally {
    return response;
  }
};

export const apiGetUser = async (userId: string, token: string) => {
  console.log("fetch user");
  const response: Response<User> = {
    success: false,
  };
  try {
    const res = await getAuthInstance(token).get(`${API_URL}/users/${userId}`);
    if (res.status === 200) {
      response.success = true;
      response.data = res.data;
    }
  } catch (error: any) {
    response.success = false;
    response.data = {};
  } finally {
    return response;
  }
};

export const apiRefreshToken = async (accessToken: string) => {
  const response: Response<string> = {
    success: false,
  };
  try {
    const res = await axios.post(`${API_URL}/auth/refresh-token`, {
      access_token: accessToken,
    });
    if (res.status === 200) {
      response.success = true;
      response.data = res.data.access_token;
    }
  } catch (e) {
    response.success = false;
  } finally {
    return response;
  }
};
