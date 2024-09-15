"use client";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import Loading from "../Loading";
import Footer from "./Footer";
import Header from "./Header";
import { usePathname, useSearchParams } from "next/navigation";
import AuthLayout from "../AuthLayout";
import { useEffect } from "react";
import { Response } from "@/interface/Response";
import User from "@/interface/User";
import { apiGetUser, apiRefreshToken } from "@/api/user.api";
import { getProfile, refreshToken } from "@/stores/userSlice";
import { notification } from "antd";
import { AUTH_MESSAGE_ERROR, TYPE_ERROR } from "@/enum/User.enum";
import { isTokenExpired } from "@/utils/function";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAppSelector((state) => state.common);
  const { accessToken, isLoggedIn, idUser } = useAppSelector(
    (state) => state.user
  );

  const pathName = usePathname();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();

  const fetchUser = async () => {
    if (idUser && accessToken) {
      const response: Response<User> = await apiGetUser(idUser, accessToken);
      if (response.success && response.data) {
        dispatch(getProfile(response.data));
      }
    }
  };

  const handleRefreshToken = async (accessToken: string) => {
    const response: Response<string> = await apiRefreshToken(accessToken);
    if (response.success && response.data) {
      dispatch(refreshToken(response.data));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (accessToken && isTokenExpired(accessToken)) {
        handleRefreshToken(accessToken);
      }
    }, 10 * 60 * 1000); // 10 * 60 * 1000

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (params.get("error")) {
      api.error({
        message:
          params.get("type") === TYPE_ERROR.IS_LOGGED_IN
            ? AUTH_MESSAGE_ERROR.ERROR_LOGGED_IN
            : AUTH_MESSAGE_ERROR.ERROR_LOGIN,
        description: "",
        placement: "topLeft",
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUser();
    }
  }, [accessToken, idUser]);

  return (
    <>
      {contextHolder}
      {loading && <Loading />}
      {pathName.startsWith("/auth") ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <div>
          <Header />
          <div>{children}</div>
          <Footer />
        </div>
      )}
    </>
  );
}
