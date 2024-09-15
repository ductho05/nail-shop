import { API_ADDRESS, API_URL } from "@/constants";
import Address, { District, Province, Ward } from "@/interface/Address";
import Product, { ProductData } from "@/interface/Product";
import type { Response } from "@/interface/Response";
import axios from "axios";
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
    response.success = true;
      response.data = ""
  } finally {
    return response
  }
}
