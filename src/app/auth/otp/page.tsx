"use client";
import { apiAuthOtp, apiGetUser, apiLogin } from "@/api/user.api";
import { TYPE_BUTTON } from "@/enum/Button.enum";
import { Response } from "@/interface/Response";
import User from "@/interface/User";
import { AdminPath } from "@/routes/admin-routes";
import { publicRoutes } from "@/routes/route";
import { pauseLoading, playLoading } from "@/stores/commonSlice";
import { useAppDispatch } from "@/stores/store";
import { getProfile, login, UserState } from "@/stores/userSlice";
import { ORANGE_COLOR } from "@/utils/colors";
import { formatNumber, isAdmin } from "@/utils/function";
import { Input, message } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function AuthOtp() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const [countDown, setCountDown] = useState(60);

  // handle fetch new data for user when refresh token
  const fetchUser = async (idUser: string, accessToken: string) => {
    if (idUser) {
      const response: Response<User> = await apiGetUser(idUser, accessToken);
      if (response.success && response.data) {
        dispatch(getProfile(response.data));
      }
    }
  };

  const onChange: OTPProps["onChange"] = async (text) => {
    const data = {
      email: email,
      otp: text,
    };
    dispatch(playLoading());
    const res = await apiAuthOtp(data);
    dispatch(pauseLoading());
    if (res) {
      const response: Response<any> = res;
      if (response.success) {
        const user: any = {
          accessToken: response.data.access_token,
          idUser: response.data.idUser,
        };
        dispatch(login(user));
        await fetchUser(user.idUser, user.accessToken);
        message.success(response.data.message);
        if (isAdmin(user.accessToken)) {
          router.push(AdminPath.Home);
          return;
        }
        router.push(publicRoutes.HOME);
        return;
      }
      message.error(response.data.message);
    }
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const handleResendOtp = async () => {
    dispatch(playLoading());
    const res = await apiLogin({ email });
    dispatch(pauseLoading());
    if (res) {
      const response: Response<String> = res;
      if (response.success) {
        message.success(response.data);
        setCountDown(60);
        return;
      }
      message.error(response.data);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (countDown > 0) {
        setCountDown((prev) => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countDown]);

  return (
    <div className="px-[20px] flex flex-col items-center">
      <h1
        className="text-6xl font-extrabold"
        style={{
          color: ORANGE_COLOR,
        }}
      >
        Xác thực mã OTP
      </h1>
      <p className="my-[20px]">
        Chúng tôi đã gửi mã OTP đến {email}. Vui lòng nhập mã OTP để hoàn tất
        quá trình đăng nhập
      </p>
      <div className="mt-[50px] mb-[20px]">
        <Input.OTP
          formatter={(str) => str.toUpperCase()}
          {...sharedProps}
          length={4}
          size="large"
        />
      </div>
      <div className="flex items-center">
        <p>Chưa nhận được mã OTP?</p>
        <p
          onClick={handleResendOtp}
          className={`${
            countDown > 0
              ? "cursor-default pointer-events-none"
              : "cursor-pointer"
          } text-blue-600 font-bold ml-[10px]`}
        >
          {countDown > 0 ? `${formatNumber(countDown)}s` : "Gửi lại"}
        </p>
      </div>
    </div>
  );
}

export default AuthOtp;
