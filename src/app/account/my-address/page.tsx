"use client";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Form, FormProps, Input, Modal, Select } from "antd";
import Address, { District, Province, Ward } from "@/interface/Address";
import Button from "@/components/Button";
import { TYPE_BUTTON } from "@/enum/Button.enum";
import { Response } from "@/interface/Response";
import { apiGetDistrict, apiGetProvince, apiGetWard } from "@/api/data.api";
import { pauseLoading, playLoading } from "@/stores/commonSlice";

function MyAddress() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  const [isOpenAddAddress, setIsOpenAddAddress] = useState(false);
  const [provinceList, setProvinceList] = useState<Array<Province>>([])
  const [districtList, setDistrictList] = useState<Array<District>>([])
  const [wardList, setWardList] = useState<Array<Ward>>([])
  const [provinceId, setProvinceId] = useState<string>()
  const [districtId, setDistrictId] = useState<string>()

  const fetchProvince = async () => {
      const response: Response<Array<Province>> = await apiGetProvince()
      if (response.success && response.data) {
        setProvinceList(response.data)
      }
  }

  const fetchDistrict = async (provinceId: string) => {
    const response: Response<Array<District>> = await apiGetDistrict(provinceId)
    if (response.success && response.data) {
      setDistrictList(response.data)
    }
  }

  const fetchWard = async (districtId: string) => {
    const response: Response<Array<Ward>> = await apiGetWard(districtId)
    if (response.success && response.data) {
      setWardList(response.data)
    }
  }

  const handleToAddAddress = () => {
    setIsOpenAddAddress(true);
  };

  const onClose = () => {
    setIsOpenAddAddress(false);
  };

  const handleSaveAddress: FormProps<Address>["onFinish"] = (values) => {
    dispatch(playLoading())
    
    dispatch(pauseLoading())
  };

  const onChangeProvince = (_: any, option: any) => {
    setProvinceId(option.id)
  }

  const onChangeDistrict = (_: any, option: any) => {
    setDistrictId(option.id)
  }

  useEffect(() => {
    fetchProvince()
  }, [])

  useEffect(() => {
    if (provinceId) {
      fetchDistrict(provinceId)
    }

  }, [provinceId])

  useEffect(() => {

    if (districtId) {
      fetchWard(districtId)
    }

  }, [districtId])

  return (
    <div>
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
          initialValues={{ remember: true }}
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
              options={provinceList.map(p => ({label: p.province_name, value: p.province_name, id: p.province_id}))}
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
              disabled={provinceId === undefined}
              placeholder="Chọn quận/ huyện"
              optionFilterProp="label"
              options={districtList.map(d => ({label: d.district_name, value: d.district_name, id: d.district_id}))}
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
              disabled={districtId === undefined}
              placeholder="Chọn xã/ phường"
              optionFilterProp="label"
              options={wardList.map(w => ({label: w.ward_name, value: w.ward_name, id: w.ward_id}))}
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

          <Form.Item style={{display: "flex", justifyContent: "center"}}>
            <Button
              type={TYPE_BUTTON.PRIMARY}
              isSubmit={true}
              title="Lưu"
              onClick={() => {}}
            />
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex items-center py-[20px] border-b">
        <h1 className="flex-1 text-xl font-bold">Địa chỉ giao hàng</h1>
        <div
          onClick={handleToAddAddress}
          className="border rounded-[6px] px-[10px] py-[4px] w-max flex items-center gap-[10px] mt-[10px] cursor-pointer"
        >
          <AddCircleOutlineOutlinedIcon className="text-[#333]" />
          <p className="text-[#333]">Thêm địa chỉ giao hàng</p>
        </div>
      </div>
      {user?.addresses && user?.addresses?.length !== 0 ? (
        <div></div>
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
