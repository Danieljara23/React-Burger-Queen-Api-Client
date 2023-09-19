import * as OrderRepository from "./order-repository";
import "@testing-library/jest-dom";
import { Product } from "../models/product";
import * as CommonService from "./common-service";
import { NewOrder, Order } from "../models/order";

describe("OrderRepository", () => {
  test("Should make request with correct params", async () => {
    const cheeseBurgerProduct: Product = {
      id: 1,
      name: "Burger cheese",
      price: 1000,
      image: "url",
      type: "Desayuno",
      dateEntry: "",
    };
    const newOrder: NewOrder = {
      client: "Kvn",
      products: [
        {
          product: cheeseBurgerProduct,
          qty: 2,
        },
      ],
    };
    const mockDate = "1998-09-14 18:08:05";
    const completeOrder: Order = {
      ...newOrder,
      userId: 0,
      dateEntry: mockDate,
      status: "pending",
    };
    const expectedParams = {
      body: JSON.stringify(completeOrder),
      headers: {
        Authorization: "Bearer null",
      },
      method: "POST",
      url: "http://localhost:8080/orders",
    };

    jest.spyOn(OrderRepository, "createOrder");
    jest.spyOn(CommonService, "jsonFetch").mockResolvedValue(true);
    jest.spyOn(CommonService, "adjustDateString").mockReturnValue(mockDate);

    OrderRepository.createOrder(newOrder);

    expect(CommonService.jsonFetch).toHaveBeenCalledWith(expectedParams);
  });
});
