import Address from "./Address";
import { ProductOrder } from "./Product";
import QRCode from "./QRCode";

export default interface Order {
    order_number: string;
    total: number;
    status: string;
    discounts: string;
    user: string;
    products: Array<ProductOrder>;
    address: Address;
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