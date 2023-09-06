import { NewOrder, Order } from "../models/order";
import { host, jsonFetch } from "./common-service";
import { getSession } from "./token-repository";

/**
 * Creates a new order
 * @param order
 * @returns Promise<boolean>
 */
export function createOrder(order: NewOrder): Promise<boolean> {
  const { userId } = getSession();
  const { token } = getSession();
  const url = host + "/orders";
  const adjustDateString = (date: Date) =>
    date
      .toISOString()
      .replace(/T/, " ")
      .replace(/\.[\d]{3}Z/, "");
  const orderToRequest: Order = {
    ...order,
    userId: userId,
    dateEntry: adjustDateString(new Date()),
  };

  return jsonFetch({
    url,
    method: "POST",
    body: JSON.stringify(orderToRequest),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
