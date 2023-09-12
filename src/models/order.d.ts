import { Product } from "./product.d";

export type ORDER_STATUS = "pending" | "ready";
export type WAITER_REDUCER_ACTION = "ADD_PRODUCT" | "DEL_PRODUCT" | "SET_CUSTOMER_NAME" | "RESET_ORDER" | "DEL_PRODUCT_FROM_LIST";

export type WaiterReduceParams = {
	type: WAITER_REDUCER_ACTION;
	payload: Product | null | string;
};

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
