import { API_URL } from "@/constants";
import { Response } from "@/interface/Response";
import User from "@/interface/User";
import axios from "axios";
import { getAuthInstance } from "./auth";
import Address from "@/interface/Address";
import Order, { OrderCreate, OrderResponse } from "@/interface/Order";
import QRCode from "@/interface/QRCode";

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

export const apiGetAddressbyId = async (addressId: string) => {
  const response: Response<Address> = {
    success: false,
  };
  try {
    const res = await axios.get(`${API_URL}/address/${addressId}`);
    if (res.status === 200) {
      response.success = true;
      response.data = res.data;
    }
  } catch (e) {
    response.success = false;
  } finally {
    return response;
  }
};

export const apiCreateAddress = async (address: Address) => {
  const response: Response<string> = {
    success: false,
  };
  try {
    const res = await axios.post(`${API_URL}/address`, {...address});
    if (res.status === 201) {
      response.success = true;
      response.data = "Thêm địa chỉ mới thành công!"
    }
  } catch (e) {
    response.success = false;
    response.data = "Lỗi thêm địa chỉ! Vui lòng thử lại!"
  } finally {
    return response;
  }
};

export const apiUpdateAddress = async (address: Address, addressId: string) => {
  const response: Response<string> = {
    success: false,
  };
  try {
    const res = await axios.put(`${API_URL}/address/${addressId}`, {...address});
    if (res.status === 204) {
      response.success = true;
      response.data = "Chỉnh sửa địa chỉ mới thành công!"
    }
  } catch (e) {
    response.success = false;
    response.data = "Lỗi chỉnh sửa địa chỉ! Vui lòng thử lại!"
  } finally {
    return response;
  }
};

export const apiDeleteAddress = async (addressId: string) => {
  const response: Response<string> = {
    success: false,
  };
  try {
    const res = await axios.delete(`${API_URL}/address/${addressId}`);
    if (res.status === 204) {
      response.success = true;
      response.data = "Chỉnh sửa địa chỉ mới thành công!"
    }
  } catch (e) {
    response.success = false;
    response.data = "Lỗi chỉnh sửa địa chỉ! Vui lòng thử lại!"
  } finally {
    return response;
  }
};

export const apiCreateOrder = async (token: string, idUser: string, order: OrderCreate) => {
  const response: Response<OrderResponse> = {
    success: false,
  };
  try {
    const res = await getAuthInstance(token).post(`${API_URL}/orders/${idUser}`, {...order});
    if (res.status === 201) {
      response.success = true;
      response.data = res.data
    }
  } catch (e) {
    response.success = false;
  } finally {
    return response;
  }
};

export const apiConfirmPayment = async (token: string, orderId: string) => {
  const response: Response<string> = {
    success: false,
  };
  try {
    const res = await getAuthInstance(token).get(`${API_URL}/orders/notify-for-admin/${orderId}`);
    if (res.status === 200) {
      response.success = true;
      response.data = "Đã gửi thông báo xác nhận thanh toán đến quản trị viên!"
    }
  } catch (e) {
    response.success = false;
    response.data = "Lỗi khi xác nhận thanh toán!"
  } finally {
    return response;
  }
};

export const apiGetOrderByUser = async (token: string, userId: string) => {
  const response: Response<Array<Order>> = {
    success: false,
  };
  try {
    const res = await getAuthInstance(token).get(`${API_URL}/orders/users/${userId}`);
    if (res.status === 200) {
      response.success = true;
      response.data = res.data.orders.data
    }
  } catch (e) {
    response.success = false;
    response.data = []
  } finally {
    return response;
  }
};

export const apiReGeneratePaymentQRCode = async (token: string, bankId: string, orderId: string) => {
  const response: Response<QRCode> = {
    success: false,
  };
  try {
    const res = await getAuthInstance(token).get(`${API_URL}/orders/re-generate-qr-code/${bankId}/${orderId}`);
    if (res.status === 200) {
      response.success = true;
      response.data = res.data.qrCode
    }
  } catch (e) {
    response.success = false;
  } finally {
    return response;
  }
};

export const apiRegister = async (email: string) => {
  const response: Response<string> = {
    success: false,
  };
  try {
    const res = await axios.post(`${API_URL}/auth/signup`,{email})
    if (res.status === 201) {
      response.success = true;
      response.data = "Vui lòng kiểm tra để email xác nhận đăng ký tài khoản"
    }
  } catch (e) {
    response.success = false;
  } finally {
    return response;
  }
};
