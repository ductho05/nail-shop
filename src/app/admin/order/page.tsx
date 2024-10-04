"use client";
import FrameStyle from "@/components/FrameStyle";
import { ORDER_STATUS, ORDER_STATUS_VN } from "@/enum/User.enum";
import Order from "@/interface/Order";
import { ProductOrder } from "@/interface/Product";
import { AdminPath, AdminRoute } from "@/routes/admin-routes";
import { useAppSelector } from "@/stores/store";
import { formatPrice } from "@/utils/function";
import { EditOutlined } from "@ant-design/icons";
import { Button, Table, TableProps, Tabs, TabsProps, Tag } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AdminPageTitle from "@/components/MoComponent/AdminPageTitle";

function OrderAdmin() {
  const { orderList } = useAppSelector((state) => state.adminData);
  const [currentTab, setCurrentTab] = useState("1");
  const [pendingOrder, setPendingOrder] = useState<Array<Order>>([]);
  const [pidOrder, setPidOrder] = useState<Array<Order>>([]);
  const [processingOrder, setProcessingOrder] = useState<Array<Order>>([]);
  const [completedOrder, setCompletedOrder] = useState<Array<Order>>([]);
  const [cancelledOrder, setCancelledOrder] = useState<Array<Order>>([]);

  const router = useRouter();

  // hanbdle filter order list by status
  const handleFilterOrderByStatus = () => {
    let pendingOrderList: Array<Order> = [];
    let pidOrderList: Array<Order> = [];
    let processingOrderList: Array<Order> = [];
    let completedOrderList: Array<Order> = [];
    let cancelledOrderList: Array<Order> = [];

    orderList.forEach((order) => {
      if (order.status === ORDER_STATUS.PENDING) {
        pendingOrderList.push(order);
      } else if (order.status === ORDER_STATUS.PAID) {
        pidOrderList.push(order);
      } else if (order.status === ORDER_STATUS.PROCESSING) {
        processingOrderList.push(order);
      } else if (order.status === ORDER_STATUS.COMPLETED) {
        completedOrderList.push(order);
      } else {
        cancelledOrderList.push(order);
      }
    });

    setPendingOrder(pendingOrderList);
    setPidOrder(pidOrderList);
    setProcessingOrder(processingOrderList);
    setCompletedOrder(completedOrderList);
    setCancelledOrder(cancelledOrderList);
  };

  // handle caculate total product in order
  const calcQuantity = (products: Array<ProductOrder>) => {
    return products.reduce((total, product) => total + product?.quantity, 0);
  };

  // handle set tab key when changed
  const onChange = (key: string) => {
    setCurrentTab(key);
  };

  // order columns
  const columns: TableProps<Order>["columns"] = [
    {
      title: "Người nhận",
      dataIndex: "address",
      key: "address",
      render: (_, { address }) => <p>{address?.nameCustomer}</p>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (_, { address }) => (
        <>
          <p>{`${address?.street}, ${address?.ward}, ${address?.district}, ${address?.city}`}</p>
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "address",
      key: "address",
      render: (_, { address }) => <p>{address?.phoneNumber}</p>,
    },
    {
      title: "Số lượng",
      dataIndex: "products",
      key: "products",
      render: (_, { products }) => <p>{calcQuantity(products)}</p>,
    },
    {
      title: "Tổng tiền(VNĐ)",
      dataIndex: "total",
      key: "total",
      render: (_, { total }) => (
        <p className="font-bold">{formatPrice(total)}</p>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        let statusText =
          status === ORDER_STATUS.PENDING
            ? ORDER_STATUS_VN.PENDING
            : status === ORDER_STATUS.PAID
            ? ORDER_STATUS_VN.PAID
            : status === ORDER_STATUS.PROCESSING
            ? ORDER_STATUS_VN.PROCESSING
            : status === ORDER_STATUS.COMPLETED
            ? ORDER_STATUS_VN.COMPLETED
            : ORDER_STATUS_VN.CANCELLED;
        let color =
          status === ORDER_STATUS.PENDING
            ? "purple"
            : status === ORDER_STATUS.PAID
            ? "geekblue"
            : status === ORDER_STATUS.PROCESSING
            ? "blue"
            : status === ORDER_STATUS.COMPLETED
            ? "cyan"
            : "red";

        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "_id",
      render: (_, { _id }) => {
        const handleAction = () => {
          router.push(`${AdminPath.EditOrder}/${_id}`);
        };

        return (
          <Button
            onClick={handleAction}
            type="default"
            icon={<VisibilityIcon />}
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  // tabs list
  const itemsTab: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả",
      children: <Table<Order> columns={columns} dataSource={orderList} />,
    },
    {
      key: "2",
      label: ORDER_STATUS_VN.PENDING,
      children: <Table<Order> columns={columns} dataSource={pendingOrder} />,
    },
    {
      key: "3",
      label: ORDER_STATUS_VN.PAID,
      children: <Table<Order> columns={columns} dataSource={pidOrder} />,
    },
    {
      key: "4",
      label: ORDER_STATUS_VN.PROCESSING,
      children: <Table<Order> columns={columns} dataSource={processingOrder} />,
    },
    {
      key: "5",
      label: ORDER_STATUS_VN.COMPLETED,
      children: <Table<Order> columns={columns} dataSource={completedOrder} />,
    },
    {
      key: "6",
      label: ORDER_STATUS_VN.CANCELLED,
      children: <Table<Order> columns={columns} dataSource={cancelledOrder} />,
    },
  ];

  useEffect(() => {
    handleFilterOrderByStatus();
  }, [orderList]);

  return (
    <div>
      <FrameStyle className="bg-white">
        <AdminPageTitle title="Danh sách đơn hàng" />
      </FrameStyle>
      <FrameStyle className="mt-[20px] bg-white">
        <Tabs
          defaultActiveKey={currentTab}
          items={itemsTab}
          onChange={onChange}
        />
      </FrameStyle>
    </div>
  );
}

export default OrderAdmin;
