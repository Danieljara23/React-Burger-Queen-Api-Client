import * as ProductRepository from "../services/product-repository";
import * as OrderRepository from "../services/order-repository";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Order } from "../models/order";
import Waiter from "./waiter";
import React from "react";

describe("<Waiter />", () => {
  const anyFunction = () => {};

  test("Should make request with correct params on submit the order", async () => {
    jest
      .spyOn(ProductRepository, "getProducts")
      .mockImplementation(() => Promise.resolve([]));
    jest
      .spyOn(OrderRepository, "createOrder")
      .mockImplementation(() => Promise.resolve(true));
    const initialOrder: Order = {
      client: "Kvn",
      userId: 123,
      status: "pending",
      dateEntry: "",
      products: [
        {
          product: {
            id: 9,
            name: "fries",
            price: 500,
            image: "",
            type: "lunch",
            dateEntry: "",
          },
          qty: 3,
        },
      ],
    };
    const setOrderMsg = jest.fn();
    React.useState = jest
      .fn()
      .mockReturnValueOnce([[], anyFunction])
      .mockReturnValueOnce(["", setOrderMsg])
      .mockReturnValueOnce(["breakfast", anyFunction])
      .mockReturnValueOnce([initialOrder, anyFunction]);

    const { container } = render(<Waiter />);
    const submitButton = container.querySelector(
      "form > button",
    ) as HTMLButtonElement;
    await userEvent.click(submitButton);
    expect(submitButton.innerHTML).toBe("Create new order");
    expect(OrderRepository.createOrder).toHaveBeenCalledWith(initialOrder);
    expect(setOrderMsg).toHaveBeenCalledWith("Your order has been created");
  });
});
