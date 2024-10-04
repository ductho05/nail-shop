import React from "react";
import style from "./style.module.css";

function NavItem({
  navItem,
  isActive = false,
}: {
  navItem: any;
  isActive: boolean;
}) {
  const Icon = navItem.iconName;

  return (
    <div
      className={`${
        !isActive ? style.nav_item : `${style.active} ${style.nav_item}`
      }`}
    >
      <Icon
        className={`${isActive ? style.nav_icon_active : style.nav_icon}`}
      />
      <h5
        className={`${
          !isActive
            ? style.nav_item_title
            : `${style.nav_item_title} ${style.nav_item_title_active}`
        }`}
      >
        {navItem.title}
      </h5>
    </div>
  );
}

export default NavItem;
