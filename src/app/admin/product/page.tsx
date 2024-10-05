"use client";
import FrameStyle from "@/components/FrameStyle";
import AdminPageTitle from "@/components/MoComponent/AdminPageTitle";
import Product from "@/interface/Product";
import { AdminPath } from "@/routes/admin-routes";
import { useAppSelector } from "@/stores/store";
import { base64ToImageUrl, formatPrice } from "@/utils/function";
import {
  EditOutlined,
  LockOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Table, TableProps } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function ProductAdmin() {
  const { productList } = useAppSelector((state) => state.adminData);

  const router = useRouter();

  const handleToCreateProduct = () => {
    router.push(AdminPath.CreateEditPproduct);
  };

  const handleToEditProduct = (pid: string) => {
    router.push(`${AdminPath.CreateEditPproduct}?productId=${pid}`);
  };

  const columns: TableProps<Product>["columns"] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "full_name",
      key: "full_name",
      render: (_, { full_name }) => <p>{full_name}</p>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (_, { thumbnail }) => (
        <img
          className="w-[60px] h-[80px] object-contain"
          src={base64ToImageUrl(thumbnail || "")}
          alt="Hình ảnh sản phẩm"
        />
      ),
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => (
        <p className="font-bold text-red-500">{formatPrice(price)}</p>
      ),
    },
    {
      title: "Số lượng trong kho",
      dataIndex: "stock",
      key: "stock",
      render: (_, { stock }) => (
        <p className="font-bold text-blue-500">{stock}</p>
      ),
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      render: (_, { sold }) => (
        <p className="font-bold text-orange-500">{sold}</p>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "_id",
      width: 200,
      render: (_, { _id }) => {
        return (
          <div className="flex items-center gap-[20px]">
            <Button
              onClick={() => handleToEditProduct(_id || "")}
              icon={<EditOutlined />}
            >
              Chỉnh sửa
            </Button>
            <Button danger icon={<LockOutlined />}>
              Khoá
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <FrameStyle className="bg-white flex items-center justify-between">
        <AdminPageTitle title="Danh sách sản phẩm" />
        <Button
          onClick={handleToCreateProduct}
          type="dashed"
          size="large"
          icon={<PlusCircleOutlined />}
        >
          Đăng bán sản phẩm
        </Button>
      </FrameStyle>

      <FrameStyle className="mt-[20px] bg-white">
        <Table<Product> columns={columns} dataSource={productList} />
      </FrameStyle>
    </div>
  );
}

export default ProductAdmin;
