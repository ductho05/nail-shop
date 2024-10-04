import React from "react";
import Search from "@/components/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/stores/store";

function TopBar() {
  const { user } = useAppSelector((state) => state.user);

  const onSearch = () => {};

  return (
    <div className="p-[10px] border-b flex items-center">
      <Search placeholder="Tìm kiếm..." onSearch={onSearch} width="300px" />
      <div className="flex-1 flex justify-end">
        <div className="flex-1 flex justify-end items-center gap-[20px] mr-[20px]">
          <div className="flex flex-col cursor-pointer justify-center items-center text-[#333]">
            <Badge count={1}>
              <NotificationsNoneIcon className="text-xl text-[#666]" />
            </Badge>
          </div>
          <div className="flex cursor-pointer justify-center items-center text-[#333]">
            <UserOutlined className="text-xl" />
            <p className="text-[#333]">{user?.firstName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
