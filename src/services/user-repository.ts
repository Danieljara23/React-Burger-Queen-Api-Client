import { User } from "../models/user";
import { host, jsonFetch } from "./common-service";
import { getSession } from "./token-repository";

/**
 * Get one user info by id
 * @param id
 * @returns Promise<token>
 */
export function getUser(id: number): Promise<User> {
  const url = host + "/users/" + id;
  const { token } = getSession();

  if (id < 1) return Promise.reject();

  return jsonFetch({
    url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
