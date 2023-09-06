export type ROLES = "admin" | "waiter" | "chef";

export type CurrentUser = {
  token: string;
  user: IUser;
};

export type User = {
  id: number;
  email: string;
  role: ROLES;
  password: string;
};
