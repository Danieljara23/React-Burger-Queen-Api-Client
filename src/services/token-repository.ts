import { User } from "../models/user";
import { LoginResponse } from "../models/response";
import { host, jsonFetch } from "./common-service";

const tokenKey = "token";
const tokenUserId = "userId";
const tokenUser = "user";

type Session = {
  token: string | null;
  userId: number;
  user: User;
};

/**
 * Login user email and password
 * @param email
 * @param password
 * @returns Promise<token>
 */
export async function login(email: string, password: string) {
  const url = host + "/login";
  const data = { email, password };

  const res: LoginResponse = await jsonFetch({
    url: url,
    method: "POST",
    body: JSON.stringify(data),
    headers: {},
  });
  createSession(res.accessToken, res.user);
}

/**
 * set user token and id in local storage
 * @param currentUser
 */
const createSession = (token: string, user: User) => {
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
export const getSession = (): Session => {
  return {
    token: localStorage.getItem(tokenKey),
    userId: Number(localStorage.getItem(tokenUserId)),
    user: JSON.parse(localStorage.getItem(tokenUser) || "{}"),
  };
};
