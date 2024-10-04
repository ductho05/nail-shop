"use client";
import { AdminRoute } from "@/routes/admin-routes";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { ORANGE_COLOR } from "@/utils/colors";
import { ADMIN_NAME } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import WebName from "@/components/MoComponent/WebName";
import SubTitle from "@/components/MoComponent/SubTitle";

function NavBar() {
  const pathName = usePathname();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleChangeIndex = (child: any) => {
    setCurrentIndex(child.key);
    router.push(child.path);
  };

  const getDefaultIndex = () => {
    AdminRoute.forEach((navItem) => {
      navItem.items.forEach((child) => {
        if (pathName.includes(child.path)) {
          setCurrentIndex(child.key);
          return;
        }
      });
    });
  };

  useEffect(() => {
    getDefaultIndex();
  }, []);

  return (
    <div>
      <WebName webName={ADMIN_NAME} />

      {AdminRoute.map((navItem, index) => (
        <div key={index}>
          <SubTitle subTitle={navItem.title} />
          {navItem.items.map((child) => (
            <div key={child.path} onClick={() => handleChangeIndex(child)}>
              <NavItem
                key={child.key}
                navItem={child}
                isActive={currentIndex === child.key}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default NavBar;
