import { IProduct } from "./product";

export type ORDER_STATUS = "pending" | "ready";

export type Order = {
  userId: number;
  status: ORDER_STATUS;
  dateEntry: string;
  client: string;
  products: OrderProduct[];
};

export type NewOrder = {
  status: ORDER_STATUS;
  client: string;
  products: OrderProduct[];
};

export type OrderProduct = {
  product: IProduct;
  qty: number;
};
