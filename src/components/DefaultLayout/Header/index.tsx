import Image from "next/image";
import React from "react";
import LOGO from "@/assets/images/LOGO.png";
import { BORDER_COLOR, ORANGE_COLOR } from "@/utils/colors";
import Link from "next/link";
import { Badge, Button } from "antd";
import { motion } from "framer-motion";
import { NAME_SHOP } from "@/constants";
import {
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Search from "@/components/Search";
import { authRoutes, userRoutes } from "@/routes/route";
import { useAppSelector } from "@/stores/store";
import { useRouter } from "next/navigation";

function Header() {
  const [isSticky, setIsSticky] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLoggedIn, user, cart } = useAppSelector((state) => state.user);
  const router = useRouter();

  const onSearch = () => {
    alert("Search successfully");
  };

  const handleToCart = () => {
    router.push(userRoutes.CART);
  };

  const handleToProfile = () => {
    router.push(userRoutes.PROFILE);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsSticky(() => (window.scrollY > 84 ? true : false));
    });
  });

  const genericHamburgerLine = `h-1 w-[40px] my-1 rounded-full transition ease transform duration-300`;

  const openMenuTablet = {
    active: { transform: "translateX(0px)", transition: 2 },
    inactive: { transform: "translateX(-1025px)", transition: 2 },
  };

  return (
    <>
      <div
        className={`px-[20px] md:px-[40px] py-[16px] bg-white z-50
            ${
              isSticky &&
              "fixed top-[-2px] left-0 right-0 delay-300 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            }`}
        style={{
          borderBottom: `${isSticky ? "none" : `1px solid ${BORDER_COLOR}`}`,
        }}
      >
        <Link href="/" className={`lg:hidden hidden justify-center`}>
          <Image
            src={LOGO}
            alt="logo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="flex lg:hidden flex-col h-12 w-[50px] justify-center items-center group"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                className={`${genericHamburgerLine} bg-black ${
                  isOpen
                    ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                    : "opacity-50 group-hover:opacity-100"
                }`}
              />
              <div
                className={`${genericHamburgerLine} bg-black ${
                  isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                }`}
              />
              <div
                className={`${genericHamburgerLine} bg-black ${
                  isOpen
                    ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                    : "opacity-50 group-hover:opacity-100"
                }`}
              />
            </button>
            <Link href="/" className="hidden lg:flex items-center">
              <Image
                src={LOGO}
                alt="logo"
                style={{
                  width: "120px",
                  height: "50px",
                  objectFit: "contain",
                }}
              />
              <h1
                className="hidden lg:block max-w-[200px] font-extrabold text-xl ml-[10px]"
                style={{
                  color: ORANGE_COLOR,
                }}
              >
                {NAME_SHOP}
              </h1>
            </Link>
          </div>

          <Search
            placeholder="Tìm kiếm sản phẩm mong muốn..."
            onSearch={onSearch}
            width="40vw"
          />

          {isLoggedIn ? (
            <div className="flex items-center gap-[20px]">
              <div
                onClick={handleToCart}
                className="flex flex-col cursor-pointer justify-center items-center text-[#333]"
              >
                <Badge count={cart.length}>
                  <ShoppingCartOutlined className="text-2xl" />
                </Badge>
                <p className="text-[#333]">Giỏ hàng</p>
              </div>
              <div
                onClick={handleToProfile}
                className="flex flex-col cursor-pointer justify-center items-center text-[#333]"
              >
                <UserOutlined className="text-2xl" />
                <p className="text-[#333]">{user?.firstName}</p>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center">
              <Link href={authRoutes.LOGIN}>
                <Button
                  className="hidden lg:flex"
                  type="text"
                  icon={<LoginOutlined className="text-xl" />}
                  style={{
                    margin: "0 10px",
                  }}
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link href={authRoutes.REGISTER}>
                <Button
                  icon={<UserAddOutlined className="text-xl" />}
                  className="hidden lg:flex items-center"
                  style={{
                    backgroundColor: `${ORANGE_COLOR}`,
                    color: "#fff",
                    border: "none",
                    boxShadow: "none",
                    marginRight: "10px",
                    borderRadius: "1000px",
                  }}
                >
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}
          <div className="flex lg:hidden items-center">
            <Link href="/login">
              <LoginOutlined className="text-gray-600" />
            </Link>
            <Link href="/register">
              <LogoutOutlined className="mx-[10px] text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
      <motion.div
        className="w-screen h-screen bg-white z-50 fixed left-0 top-[77px] lg:hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          from: { transform: "translateX(0px)" },
          hidden: { transform: "translateX(-1025px)" },
        }}
      ></motion.div>
    </>
  );
}

export default Header;
