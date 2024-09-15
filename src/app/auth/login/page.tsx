"use client";
import { ORANGE_COLOR } from "@/utils/colors";
import React, { useEffect, useState } from "react";
import { Form, FormProps, Input, notification } from "antd";
import Button from "@/components/Button";
import { TYPE_BUTTON } from "@/enum/Button.enum";
import { useAppDispatch } from "@/stores/store";
import { pauseLoading, playLoading } from "@/stores/commonSlice";
import { apiLogin } from "@/api/user.api";
import { Response } from "@/interface/Response";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authRoutes } from "@/routes/route";
import { AUTH_MESSAGE_ERROR, TYPE_ERROR } from "@/enum/User.enum";

type FieldType = {
  email?: string;
};

function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const [api, contextHolder] = notification.useNotification();
  const [temp, setTemp] = useState(0);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    dispatch(playLoading());
    const res = await apiLogin(values);
    dispatch(pauseLoading());
    if (res) {
      const response: Response<String> = res;
      if (response.success) {
        message.success(response.data);
        router.push(`${authRoutes.AUTH_OTP}?email=${values.email}`);
        return;
      }
      message.error(response.data);
    }
  };

  useEffect(() => {
    setTemp((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (temp <= 0) {
      if (params.get("error")) {
        api.error({
          message:
            params.get("type") === TYPE_ERROR.NOT_LOGIN
              ? AUTH_MESSAGE_ERROR.ERROR_LOGIN
              : AUTH_MESSAGE_ERROR.ERROR_EXPRIEED,
          description: "",
          placement: "topLeft",
        });
        setTemp((prev) => prev + 1);
      }
    }
  }, [temp]);

  return (
    <div className="px-[20px] flex flex-col items-center">
      {contextHolder}
      <h1
        className="text-6xl font-extrabold"
        style={{
          color: ORANGE_COLOR,
        }}
      >
        Đăng nhập
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
            title="Đăng nhập"
            type={TYPE_BUTTON.PRIMARY}
            onClick={() => {}}
          />
        </Form.Item>
      </Form>
      <div className="flex items-center">
        <p>Chưa có tài khoản?</p>
        <Link
          className="hover:underline text-blue-600 font-bold ml-[10px]"
          href={authRoutes.REGISTER}
        >
          Đăng ký
        </Link>
      </div>
    </div>
  );
}

export default Login;
