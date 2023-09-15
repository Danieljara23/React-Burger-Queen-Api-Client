import { JsonFetchParams } from "../models/response";

export const host = "http://localhost:8080";

/**
 * create a request with JSON body and response
 * @returns request
 */
export const jsonFetch = async ({
  url,
  method,
  body,
  headers,
}: JsonFetchParams) => {
  const response = await fetch(url, {
    method: method,
    body,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  const isError = typeof result === "string";
  if (isError) {
    console.error(result);
    throw new Error("Error: " + result);
  } else {
    return result;
  }
};

export const adjustDateString = (date: Date): string =>
  date
    .toISOString()
    .replace(/T/, " ")
    .replace(/\.[\d]{3}Z/, "");
