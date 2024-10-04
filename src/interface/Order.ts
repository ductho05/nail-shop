import { ORDER_STATUS } from "@/enum/User.enum";
import Address from "./Address";
import { ProductOrder } from "./Product";
import QRCode from "./QRCode";

export default interface Order {
    _id: string;
    order_number: string;
    total: number;
    status: string;
    discounts: string;
    user: string;
    products: Array<ProductOrder>;
    address: Address;
    created_at: string;
    updated_at: string;
}

export interface OrderCreate {
    discounts: Array<string>;
    products: Array<ProductOrder>;
    bankId: string;
    address: Address;
}

export interface OrderResponse {
    order: Order;
    qrCode: QRCode
}

export interface OrderDataTable {
    _id: string,
    nameCustomer: string,
    address: string,
    phoneNumber: string,
    quantity: number,
    price: number,
    status: string,
}

export interface OrderUpdate {
    order_number?: string,
    total?: number,
    status?: ORDER_STATUS,
    discounts?: Array<string>,
    products?: Array<string>
}
