import { IOrder } from "../models/order";
import { host, jsonFetch } from "./common-service";

/**
 * Creates a new order
 * @param order
 * @returns Promise<boolean>
 */
export function createOrder(order: IOrder): Promise<boolean> {
  const url = host + "/orders";
  const adjustDateString = (date: Date) =>
    date
      .toISOString()
      .replace(/T/, " ")
      .replace(/\.[\d]{3}Z/, "");
  const newOrder: IOrder = {
    ...order,
    dateEntry: adjustDateString(new Date()),
  };

  return jsonFetch({
    url,
    method: "POST",
    body: newOrder,
  });
}
