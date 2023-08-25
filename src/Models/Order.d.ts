import { IProduct } from "./Product";

export enum ORDER_STATUS {
  pending = "pending",
  ready = "ready",
}

export interface IOrder {
  userId: number;
  status: ORDER_STATUS;
  dateEntry: string;
  client: string;
  products: IOrderProduct[];
}

export interface IOrderProduct {
  product: IProduct;
  qty: number;
}
