"use client";
import FrameStyle from "@/components/FrameStyle";
import { accountRouteList, publicRoutes } from "@/routes/route";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "@/stores/store";
import { logout } from "@/stores/userSlice";
import NavItem from "@/components/AdminLayout/NavBar/NavItem";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pageActive, setPageActive] = useState(0);

  const handleChangeIndex = (index: number, path: string) => {
    setPageActive(index);
    router.push(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push(publicRoutes.HOME);
  };

  const getDefaultIndex = () => {
    accountRouteList.forEach((item, index) => {
      if (pathName.includes(item.route)) {
        setPageActive(index);
        return;
      }
    });
  };

  useEffect(() => {
    getDefaultIndex();
  }, []);

  return (
    <div className="px-[40px] py-[20px]">
      <FrameStyle>
        <div className="min-h-full h-full flex gap-[10px] items-start">
          <ul className="flex flex-col flex-[1] min-h-full">
            {accountRouteList.map((route, index) => {
              return (
                <div
                  key={route.title}
                  onClick={() => handleChangeIndex(index, route.route)}
                >
                  <NavItem navItem={route} isActive={pageActive === index} />
                </div>
              );
            })}
            <div
              onClick={() => handleLogout()}
              className={`py-[12px] px-[15px] cursor-pointer`}
            >
              <div className="flex items-center gap-[10px] w-full">
                <LogoutIcon className="text-[#333]" />
                <p className={`text-lg text-[#333]`}>Đăng xuất</p>
              </div>
            </div>
          </ul>
          <div className="flex-[5] pl-[20px] h-[calc(100vh-420px)] overflow-y-scroll border-l">
            {children}
          </div>
        </div>
      </FrameStyle>
    </div>
  );
}
