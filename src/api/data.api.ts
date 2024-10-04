import { API_ADDRESS, API_URL } from "@/constants";
import Address, { District, Province, Ward } from "@/interface/Address";
import Order, { OrderUpdate } from "@/interface/Order";
import Product, { ProductData } from "@/interface/Product";
import type { Response } from "@/interface/Response";
import axios from "axios";
import { getAuthInstance } from "./auth";
export const getProduct = async () => {
  const response: Response<Product[]> = {
    success: false,
  };
  try {
    const res = await axios.get(`${API_URL}/products`);
    if (res.status === 200) {
      response.success = true;
      response.data = res.data.data;
    }
  } catch (error) {
    response.success = false;
    response.data = [];
  } finally {
    return response;
  }
};

export const getProductById = async (productId: string) => {
  const response: Response<ProductData> = {
    success: false,
  };
  try {
    const res = await axios.get(`${API_URL}/products/${productId}`);
    if (res.status === 200) {
      response.success = true;
      response.data = res.data;
    }

    return response;
  } catch (error) {
    response.success = false;
    response.data = {};
  } finally {
    return response
  }
};

export const apiGetProvince = async () => {
  const response: Response<Array<Province>> = {
    success: false,
    data: []
  }

  try {
    const res = await axios.get("https://vapi.vnappmob.com/api/province/")
    if (res.status === 200 && res.data.results) {
      response.success = true;
      response.data = res.data.results;
    }
  } catch (error) {
    response.success = true;
      response.data = []
  } finally {
    return response
  }
}

export const apiGetDistrict = async (provinceId: string) => {
  const response: Response<Array<District>> = {
    success: false
  }

  try {
    const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
    if (res.status === 200) {
      response.success = true;
      response.data = res.data.results;
    }
  } catch (error) {
    response.success = true;
      response.data = []
  } finally {
    return response
  }
}

export const apiGetWard = async (districtId: string) => {
  const response: Response<Array<Ward>> = {
    success: false
  }

  try {
    const res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
    if (res.status === 200) {
      response.success = true;
      response.data = res.data.results;
    }
  } catch (error) {
    response.success = true;
      response.data = []
  } finally {
    return response
  }
}

export const apiAddAddress = async (address: Address) => {
  const response: Response<string> = {
    success: false
  }

  try {
    const res = await axios.post(`${API_URL}/address`, address)
    if (res.status === 200) {
      response.success = true;
      response.data = res.data.results;
    }
  } catch (error) {
    response.success = false;
      response.data = ""
  } finally {
    return response
  }
}

export const apiGetAllOrder = async (accessToken: string) => {
  const response: Response<Order> = {
    success: false
  }

  try {
    const res = await getAuthInstance(accessToken).get(`${API_URL}/orders`)
    if (res.status === 200) {
      response.success = true;
      response.data = res.data.orders;
    }
  } catch (error) {
    response.success = false;
  } finally {
    return response
  }
}

export const apiGetOrderById = async (accessToken: string, orderId: string) => {
  const response: Response<Order> = {
    success: false
  }

  try {
    const res = await getAuthInstance(accessToken).get(`${API_URL}/orders/${orderId}`)
    if (res.status === 200) {
      response.success = true;
      response.data = res.data;
    }
  } catch (error) {
    response.success = false;
  } finally {
    return response
  }
} 

export const apiUpdateOrder = async (accessToken: string, orderId: string, order: OrderUpdate) => {
  const response: Response<string> = {
    success: false,
    data: "Lỗi"
  }

  try {
    const res = await getAuthInstance(accessToken).put(`${API_URL}/orders/${orderId}`, {...order})
    if (res.status === 204) {
      response.success = true;
      response.data = "Cập nhật đơn hàng thành công!!!";
    }
  } catch (error) {
    response.success = false;
    response.data = "Lỗi khi cập nhật đơn hàng! Vui lòng thử lại"
  } finally {
    return response
  }
} 
