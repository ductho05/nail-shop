"use client";
import FrameStyle from "@/components/FrameStyle";
import AdminPageTitle from "@/components/MoComponent/AdminPageTitle";
import Product from "@/interface/Product";
import { Button, Form, Input, InputNumber } from "antd";
import { useSearchParams } from "next/navigation";
import React from "react";

function CreatedEditProduct() {
  const params = useSearchParams();
  const productId = params.get("productId");

  const onFinish = () => {};

  const onFinishFailed = () => {};

  return (
    <div>
      <FrameStyle className="bg-white">
        <AdminPageTitle
          title={productId ? "Chỉnh sửa sản phẩm" : "Đăng bán sản phẩm mới"}
        />
      </FrameStyle>
      <FrameStyle className="bg-white mt-[20px]">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="flex items-start gap-[20px] ">
            <div className="flex-1">
              <Form.Item<Product>
                label="Tên sản phẩm"
                name="full_name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<Product>
                label="Giá"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá sản phẩm!",
                  },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item<Product>
                label="Số lượng nhập kho"
                name="stock"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng nhập kho!",
                  },
                ]}
              >
                <InputNumber min={1} max={1000} />
              </Form.Item>
            </div>
            <div className="flex-1"></div>
          </div>

          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              {productId ? "Cập nhật" : "Đăng bán"}
            </Button>
          </Form.Item>
        </Form>
      </FrameStyle>
    </div>
  );
}

export default CreatedEditProduct;
