import { IProduct } from "../Models/Product";
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
      method: "GET"
  });
}

export function addProduct(product:IProduct): Promise<IProduct[]> {
  const url = host + "/products";

  return jsonFetch({
      url,
      method: "POST",
      body: {
        ...product
      }
  });
}
