"use client";
import { apiRegister } from "@/api/user.api";
import Button from "@/components/Button";
import { TYPE_BUTTON } from "@/enum/Button.enum";
import { MESSAGE_ERROR_REGISTER_FAILED } from "@/message";
import { authRoutes } from "@/routes/route";
import { ORANGE_COLOR } from "@/utils/colors";
import { Form, FormProps, Input, message, notification } from "antd";
import Link from "next/link";
import React from "react";

type FieldType = {
  email?: string;
};

function Register() {
  const [api, contextHolder] = notification.useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.email) {
      const response = await apiRegister(values.email);
      if (response.success) {
        message.success(response.data);
        return;
      }

      message.error(MESSAGE_ERROR_REGISTER_FAILED);
    }
  };

  return (
    <div className="px-[20px] flex flex-col items-center">
      {contextHolder}
      <h1
        className="text-6xl font-extrabold"
        style={{
          color: ORANGE_COLOR,
        }}
      >
        Đăng ký
      </h1>
      <Form
        name="login"
        style={{ width: "100%", marginTop: "20px" }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Vui lòng nhập đúng định dạng email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Button
            isSubmit={true}
            title="Đăng ký"
            type={TYPE_BUTTON.PRIMARY}
            onClick={() => {}}
          />
        </Form.Item>
      </Form>
      <div className="flex items-center">
        <p>Đã có tài khoản?</p>
        <Link
          className="hover:underline text-blue-600 font-bold ml-[10px]"
          href={authRoutes.LOGIN}
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default Register;
