import { IProduct } from "../models/product";
import { host, jsonFetch } from "./common-service";

/**
 * Get one user info by id
 * @param id
 * @returns Promise<token>
 */
export function getProducts(): Promise<IProduct[]> {
  const url = host + "/products";

  return jsonFetch({
    url,
    method: "GET",
  });
}
