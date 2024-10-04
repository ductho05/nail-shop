"use client";
import FrameStyle from "@/components/FrameStyle";
import { accountRouteList, publicRoutes } from "@/routes/route";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "@/stores/store";
import { logout } from "@/stores/userSlice";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pageActive, setPageActive] = useState(() => {
    return accountRouteList.findIndex((r) => r.route === pathName);
  });

  const handleChangeIndex = (index: number) => {
    setPageActive(index);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push(publicRoutes.HOME);
  };

  return (
    <div className="px-[40px] py-[20px] min-h-[calc(100vh-324px)]">
      <FrameStyle>
        <div className="min-h-full h-full flex gap-[10px] items-start">
          <ul className="flex flex-col flex-[1]">
            {accountRouteList.map((route, index) => {
              const Icon = route.icon;

              return (
                <li
                  onClick={() => handleChangeIndex(index)}
                  className={`py-[10px]`}
                  key={route.route}
                >
                  <Link
                    className="flex items-center gap-[10px] w-full"
                    href={route.route}
                  >
                    <Icon
                      className={`${
                        pageActive == index ? "text-[#1677ff]" : "text-[#333]"
                      }`}
                    />
                    <p
                      className={`text-lg ${
                        pageActive == index ? "text-[#1677ff]" : "text-[#333]"
                      }`}
                    >
                      {route.name}
                    </p>
                  </Link>
                </li>
              );
            })}
            <div
              onClick={() => handleLogout()}
              className={`py-[10px] cursor-pointer`}
            >
              <div className="flex items-center gap-[10px] w-full">
                <LogoutIcon className="text-[#333]" />
                <p className={`text-lg text-[#333]`}>Đăng xuất</p>
              </div>
            </div>
          </ul>
          <div className="flex-[3] border-l pl-[20px]">{children}</div>
        </div>
      </FrameStyle>
    </div>
  );
}
