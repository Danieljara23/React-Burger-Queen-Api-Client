import { IUser } from "./user";

export type LoginResponse = {
  accessToken: string;
  user: IUser;
};

export type JsonFetchParams = {
  url: string;
  method: string;
  body?: string;
  headers: object;
};
