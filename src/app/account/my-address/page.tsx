"use client";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  Alert,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Select,
  Switch,
} from "antd";
import Address, { District, Province, Ward } from "@/interface/Address";
import Button from "@/components/Button";
import { TYPE_BUTTON } from "@/enum/Button.enum";
import { Response } from "@/interface/Response";
import { apiGetDistrict, apiGetProvince, apiGetWard } from "@/api/data.api";
import { pauseLoading, playLoading } from "@/stores/commonSlice";
import {
  apiCreateAddress,
  apiGetAddressbyId,
  apiGetUser,
  apiUpdateAddress,
} from "@/api/user.api";
import {
  getListAddress,
  getProfile,
  setCurrentAddress,
} from "@/stores/userSlice";
import { ORANGE_COLOR } from "@/utils/colors";
import User from "@/interface/User";
import { useRouter, useSearchParams } from "next/navigation";
import { TYPE_CONTROLL } from "@/enum/User.enum";

function MyAddress() {
  const { user, addresses, currentAddress, idUser, accessToken } =
    useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpenAddAddress, setIsOpenAddAddress] = useState(false);
  const [addressUpdate, setAddressupdate] = useState<Address>();
  const [provinceList, setProvinceList] = useState<Array<Province>>([]);
  const [districtList, setDistrictList] = useState<Array<District>>([]);
  const [wardList, setWardList] = useState<Array<Ward>>([]);
  const [provinceId, setProvinceId] = useState<string>();
  const [districtId, setDistrictId] = useState<string>();
  const params = useSearchParams();

  const fetchUser = async () => {
    if (idUser && accessToken) {
      const response: Response<User> = await apiGetUser(idUser, accessToken);
      if (response.success && response.data) {
        dispatch(getProfile(response.data));
      }
    }
  };

  const fetchProvince = async () => {
    const response: Response<Array<Province>> = await apiGetProvince();
    if (response.success && response.data) {
      setProvinceList(response.data);
    }
  };

  const fetchDistrict = async (provinceId: string) => {
    const response: Response<Array<District>> = await apiGetDistrict(
      provinceId
    );
    if (response.success && response.data) {
      setDistrictList(response.data);
    }
  };

  const fetchWard = async (districtId: string) => {
    const response: Response<Array<Ward>> = await apiGetWard(districtId);
    if (response.success && response.data) {
      setWardList(response.data);
    }
  };

  const fetchAddressList = async () => {
    let addressList: Array<Address> = [];
    if (user?.addresses) {
      user.addresses.forEach(async (address) => {
        const response: Response<Address> = await apiGetAddressbyId(address);
        if (response.success && response.data) {
          addressList = [...addressList, response.data];
          dispatch(getListAddress(addressList));
        }
      });
    }
  };

  const handleToAddAddress = () => {
    setIsOpenAddAddress(true);
    if (addressUpdate) {
      setAddressupdate(undefined);
    }
  };

  const onClose = () => {
    setIsOpenAddAddress(false);
  };

  const handleSaveAddress: FormProps<Address>["onFinish"] = async (values) => {
    const address: Address = { ...values, idUser: idUser };
    dispatch(playLoading());
    const response: Response<string> = addressUpdate
      ? await apiUpdateAddress(values, addressUpdate._id || "")
      : await apiCreateAddress(address);
    dispatch(pauseLoading());
    setIsOpenAddAddress(false);
    if (response.success) {
      message.success(response.data);
      await fetchUser();
      return;
    } else {
      message.error(response.data);
    }
  };

  const onChangeProvince = (_: any, option: any) => {
    setProvinceId(option.id);
  };

  const onChangeDistrict = (_: any, option: any) => {
    setDistrictId(option.id);
  };

  const onSetCurrentAddress = (addressIndex: number) => {
    dispatch(setCurrentAddress(addressIndex));
    if (params.get(TYPE_CONTROLL.CHOOSE_ADDRESS)) {
      router.back();
    }
  };

  const setInitialDistrictWhenUpdateAddress = (address: Address) => {
    provinceList.forEach((p) => {
      if (p.province_name === address.city) {
        setProvinceId(p.province_id);
        return;
      }
    });
  };

  const setInitialWardWhenUpdateAddress = (address: Address) => {
    districtList.forEach((d) => {
      if (d.district_name === address.district) {
        setDistrictId(d.district_id);
        return;
      }
    });
  };

  const handleUpdateAddress = (address: Address) => {
    setAddressupdate(address);
    setInitialDistrictWhenUpdateAddress(address);
    setInitialWardWhenUpdateAddress(address);
    setIsOpenAddAddress(true);
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  useEffect(() => {
    fetchAddressList();
  }, [user]);

  useEffect(() => {
    if (provinceId) {
      fetchDistrict(provinceId);
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      fetchWard(districtId);
    }
  }, [districtId]);

  return (
    <div className="mr-[20px]">
      <Modal
        title="Thêm địa chỉ giao hàng"
        footer={[]}
        open={isOpenAddAddress}
        onCancel={onClose}
        width={"35vw"}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: "100%", marginTop: "20px" }}
          initialValues={addressUpdate && addressUpdate}
          onFinish={handleSaveAddress}
          autoComplete="off"
        >
          <Form.Item<Address>
            label="Người nhận"
            name="nameCustomer"
            wrapperCol={{ offset: 2, span: 20 }}
            rules={[
              { required: true, message: "Vui lòng nhập tên người nhận hàng!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Address>
            label="Số điện thoại"
            name="phoneNumber"
            wrapperCol={{ offset: 2, span: 20 }}
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Address>
            label="Tỉnh/ thành phố"
            name="city"
            wrapperCol={{ offset: 2, span: 20 }}
            rules={[
              { required: true, message: "Vui lòng nhập chọn tỉnh/ thành phố" },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn tỉnh/ thành phố"
              optionFilterProp="label"
              options={provinceList.map((p) => ({
                label: p.province_name,
                value: p.province_name,
                id: p.province_id,
              }))}
              onChange={onChangeProvince}
            />
          </Form.Item>

          <Form.Item<Address>
            label="Quận/ huyện"
            name="district"
            wrapperCol={{ offset: 2, span: 20 }}
            rules={[
              { required: true, message: "Vui lòng nhập chọn quận/ huyện" },
            ]}
          >
            <Select
              showSearch
              disabled={provinceId === undefined && addressUpdate === undefined}
              placeholder="Chọn quận/ huyện"
              optionFilterProp="label"
              options={districtList.map((d) => ({
                label: d.district_name,
                value: d.district_name,
                id: d.district_id,
              }))}
              onChange={onChangeDistrict}
            />
          </Form.Item>

          <Form.Item<Address>
            label="Xã/ phường"
            name="ward"
            wrapperCol={{ offset: 2, span: 20 }}
            rules={[
              { required: true, message: "Vui lòng nhập chọn xã/ phường" },
            ]}
          >
            <Select
              showSearch
              disabled={districtId === undefined && addressUpdate === undefined}
              placeholder="Chọn xã/ phường"
              optionFilterProp="label"
              options={wardList.map((w) => ({
                label: w.ward_name,
                value: w.ward_name,
                id: w.ward_id,
              }))}
            />
          </Form.Item>

          <Form.Item<Address>
            label="Số nhà, tên đường"
            name="street"
            wrapperCol={{ offset: 2, span: 20 }}
            rules={[
              { required: true, message: "Vui lòng nhập số nhà/ tên đường!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Switch value={} onChange={onChange} /> */}

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type={TYPE_BUTTON.PRIMARY}
              isSubmit={true}
              title="Lưu"
              onClick={() => {}}
            />
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex items-center py-[20px]">
        <h1 className="flex-1 text-xl font-bold text-[#666]">
          Địa chỉ giao hàng
        </h1>
        <div
          onClick={handleToAddAddress}
          className="border rounded-[6px] px-[10px] py-[4px] w-max flex items-center gap-[10px] mt-[10px] cursor-pointer"
        >
          <AddCircleOutlineOutlinedIcon className="text-[#333]" />
          <p className="text-[#333]">Thêm địa chỉ giao hàng</p>
        </div>
      </div>
      {addresses.length > 0 ? (
        <div className="flex flex-col gap-[20px]">
          {addresses.map((address, index) => (
            <div key={index} className="border-t pt-[20px] flex items-center">
              <div className="flex-1">
                <div className="flex items-center gap-[10px] text-[#333]">
                  <p className="border-r pr-[10px] font-bold">
                    {address.nameCustomer}
                  </p>
                  <p>{address.phoneNumber}</p>
                </div>
                <p>{`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}</p>
                {currentAddress === index && (
                  <Alert
                    style={{ width: "max-content", marginTop: "10px" }}
                    message="Mặc định"
                    type="success"
                  />
                )}
              </div>
              <div className="flex items-center flex-col gap-[20px]">
                <div className="flex items-center gap-[10px]">
                  <p
                    onClick={() => handleUpdateAddress(address)}
                    className="font-bold cursor-pointer"
                    style={{ color: ORANGE_COLOR }}
                  >
                    Chỉnh sửa
                  </p>
                  {currentAddress !== index && (
                    <p className="font-bold cursor-pointer text-red-500">Xoá</p>
                  )}
                </div>
                <button
                  onClick={() => onSetCurrentAddress(index)}
                  disabled={currentAddress === index}
                  className="border rounded-[4px] px-[10px] py-[4px] disabled:bg-[#eee]"
                >
                  Đặt làm mặc định
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-[20px]">
          <h1 className="text-lg text-center ">
            Bạn chưa có địa chỉ giao hàng nào!
          </h1>
        </div>
      )}
    </div>
  );
}

export default MyAddress;
