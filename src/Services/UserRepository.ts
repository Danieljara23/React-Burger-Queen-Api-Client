import { IUser } from "../Models/User.d";
import { host, jsonFetch } from "./CommonService";

/**
 * Get one user info by id
 * @param id
 * @returns Promise<token>
 */
export function getUser(id: number): Promise<IUser> {
  const url = host + "/users/" + id;

  if (id < 1) return Promise.reject();

  return jsonFetch({
    url,
    method: "GET",
  });
}
