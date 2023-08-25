import * as ProductRepository from "../services/product-repository";
import * as OrderRepository from "../services/order-repository";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IOrder, ORDER_STATUS } from "../models/order";
import { PRODUCT_TYPE } from "../models/product";
import Waiter from "../pages/waiter";
import React from "react";

describe("<Waiter />", () => {
  const anyFunction = () => {
    console.log("anyFunction called");
  };

  test("Should make request with correct params on submit the order", async () => {
    jest
      .spyOn(ProductRepository, "getProducts")
      .mockImplementation(() => Promise.resolve([]));
    jest
      .spyOn(OrderRepository, "createOrder")
      .mockImplementation(() => Promise.resolve(true));
    const initialOrder: IOrder = {
      client: "Kvn",
      userId: 123,
      status: ORDER_STATUS.pending,
      dateEntry: "",
      products: [
        {
          product: {
            id: 9,
            name: "fries",
            price: 500,
            image: "",
            type: PRODUCT_TYPE.lunch,
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
      .mockReturnValueOnce([PRODUCT_TYPE.breakfast, anyFunction])
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
