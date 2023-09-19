import { NewOrder, Order } from "../models/order";
import { adjustDateString, host, jsonFetch } from "./common-service";
import { getSession } from "./token-repository";

/**
 * Creates a new order
 * @param order
 * @returns Promise<boolean>
 */
export function createOrder(order: NewOrder): Promise<boolean> {
  const { userId, token } = getSession();
  const url = host + "/orders";
  const orderToRequest: Order = {
    ...order,
    userId: userId,
    dateEntry: adjustDateString(new Date()),
    status: "pending",
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
