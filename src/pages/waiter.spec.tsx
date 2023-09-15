import * as ProductRepository from "../services/product-repository";
import * as OrderRepository from "../services/order-repository";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Waiter from "./waiter";
import { Product } from "../models/product";

describe("<Waiter />", () => {
  test("Should make request with correct params on submit the order", async () => {
    const cheeseBurgerProduct: Product = {
      id: 1,
      name: "Burger cheese",
      price: 1000,
      image: "url",
      type: "Desayuno",
      dateEntry: "",
    };

    jest
      .spyOn(ProductRepository, "getProducts")
      .mockImplementation(() => Promise.resolve([cheeseBurgerProduct]));
    jest
      .spyOn(OrderRepository, "createOrder")
      .mockImplementation(() => Promise.resolve(true));

    const { findByRole, getByLabelText, findByText } = render(<Waiter />);
    const burgerButton = await findByRole("listitem");
    const clientNameInput = getByLabelText("Customer name:");
    const submitButton = await findByRole("button", {
      name: /Create new order/i,
    });

    await userEvent.type(clientNameInput, "Kvn");
    await userEvent.click(burgerButton);
    await userEvent.click(burgerButton);
    await userEvent.click(submitButton);
    const message = await findByText("Your order has been created");

    expect(message).toBeInTheDocument();
  });
});
