import { getSession } from "./token-repository";
import { IJsonFetchParams } from "../models/response";

export const host = "http://localhost:8080";

/**
 * create a request with JSON body and response
 * @returns request
 */
export const jsonFetch = ({ url, method, body }: IJsonFetchParams) => {
  const newBody = body ? JSON.stringify(body) : null;
  const { token } = getSession();
  const newAuthorization = token ? `Bearer ${token}` : "";

  return fetch(url, {
    method: method,
    body: newBody,
    headers: {
      Authorization: newAuthorization,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      const isError = typeof result === "string";
      if (isError) {
        console.error(result);
        throw new Error("Error: " + result);
      } else {
        return result;
      }
    });
};
