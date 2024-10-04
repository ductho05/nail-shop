import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ViewListIcon from '@mui/icons-material/ViewList';

export const  AdminRoute = [
    {
        title: "Dashboard",
        items: [
            {
                path: "/admin",
                iconName: SpaceDashboardIcon,
                title: "Dashboard",
                key: 1
            }
        ]
    },
    {
        title: "Product",
        items:  [
            {
                path: "/admin/product",
                iconName: Inventory2Icon,
                title: "Sản phẩm",
                key: 2
            },
            {
                path: "/admin/order",
                iconName: ViewListIcon,
                title: "Đơn hàng",
                key: 3
            },
        ]
    }
]

export enum AdminPath {
    Home = "/admin",
    Product = "/admin/product",
    Order = "/admin/order",
    EditOrder = "/admin/order/edit"
}