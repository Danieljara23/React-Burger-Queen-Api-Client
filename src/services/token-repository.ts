import { IUser } from "../models/user";
import { ILoginResponse } from "../models/response";
import { host, jsonFetch } from "./common-service";

const tokenKey = "token";
const tokenUserId = "userId";
const tokenUser = "user";

interface ISession {
  token: string | null;
  userId: number;
  user: IUser;
}

/**
 * Login user email and password
 * @param email
 * @param password
 * @returns Promise<token>
 */
export function login(
  email: string,
  password: string,
): Promise<ILoginResponse> {
  const url = host + "/login";
  const data = { email, password };

  return jsonFetch({
    url: url,
    method: "POST",
    body: data,
  });
}

/**
 * set user token and id in local storage
 * @param currentUser
 */
export const createSession = (token: string, user: IUser) => {
  localStorage.setItem(tokenUserId, user.id.toString());
  localStorage.setItem(tokenUser, JSON.stringify(user));
  localStorage.setItem(tokenKey, token);
};

/**
 * remove the local storage token and id
 */
export const deleteSession = () => {
  localStorage.removeItem(tokenUserId);
  localStorage.removeItem(tokenUser);
  localStorage.removeItem(tokenKey);
};

/**
 * get the session from local storage
 * @returns token and user id
 */
export const getSession = (): ISession => {
  return {
    token: localStorage.getItem(tokenKey),
    userId: Number(localStorage.getItem(tokenUserId)),
    user: JSON.parse(localStorage.getItem(tokenUser) || "{}"),
  };
};
