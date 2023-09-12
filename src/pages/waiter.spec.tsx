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
    const expectedOrder = {
      client: "Kvn",
      products: [
        {
          product: cheeseBurgerProduct,
          qty: 2,
        },
      ],
      status: "pending",
    };

    jest
      .spyOn(ProductRepository, "getProducts")
      .mockImplementation(() => Promise.resolve([cheeseBurgerProduct]));
    jest
      .spyOn(OrderRepository, "createOrder")
      .mockImplementation(() => Promise.resolve(true));

    const { container, findByRole/*, usar findByX  */ } = render(<Waiter />);
    expect(await findByRole("listitem")).toBeInTheDocument();
    const clientNameInput = container.querySelector(
      "form > input[type='text']",
    ) as HTMLInputElement;
    const burgerButton = container.querySelector(
      ".product-list-container > li",
    ) as HTMLButtonElement;
    const submitButton = container.querySelector(
      "form > button",
    ) as HTMLButtonElement;

    await userEvent.type(clientNameInput, "Kvn");
    await userEvent.click(burgerButton);
    await userEvent.click(burgerButton);
    await userEvent.click(submitButton);

    expect(submitButton.innerHTML).toBe("Create new order");
		// mover esta validación al OrderRepository
    expect(OrderRepository.createOrder).toHaveBeenCalledWith(expectedOrder);
		// validate successful message
		
  });
});
