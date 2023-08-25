import { IProduct } from "../Models/Product.d";
import { host, jsonFetch } from "./CommonService";

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
