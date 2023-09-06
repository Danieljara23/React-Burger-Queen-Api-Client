import { Product } from "../models/product";
import { host, jsonFetch } from "./common-service";
import { getSession } from "./token-repository";

/**
 * Get one user info by id
 * @param id
 * @returns Promise<token>
 */
export const getProducts = (): Promise<Product[]> => {
  const { token } = getSession();
  const url = host + "/products";

  return jsonFetch({
    url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
