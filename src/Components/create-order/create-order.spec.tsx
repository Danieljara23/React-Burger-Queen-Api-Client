import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateOrder from "./create-order";
import { NewOrder } from "../../models/order";

describe("<CreateOrder />", () => {
  const anyFunction = () => {
    return;
  };
  const order: NewOrder = {
    client: "client name",
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

  test("Should show total prices as expected when have selected products", () => {
    const { container } = render(
      <CreateOrder
        order={order}
        onRemoveProduct={anyFunction}
        onAddProduct={anyFunction}
        onChangeCustomer={anyFunction}
        onRemoveProductFromList={anyFunction}
        onSubmit={anyFunction}
        disableForm={false}
      />,
    );
    const totalElement = container.getElementsByClassName(
      "create-order-total-cost",
    )[0];
    expect(totalElement).toHaveTextContent("Total cost: $1500");
  });

  test("Should show as disable submit button when client name is not set", async () => {
    const newOrder: NewOrder = {
      ...order,
      client: "",
    };
    const { findByRole } = render(
      <CreateOrder
        order={newOrder}
        onRemoveProduct={anyFunction}
        onRemoveProductFromList={anyFunction}
        onAddProduct={anyFunction}
        onChangeCustomer={anyFunction}
        onSubmit={anyFunction}
        disableForm={false}
      />,
    );
    const submitButton = await findByRole("button", {
      name: /Create new order/i,
    });

    expect(submitButton.hasAttribute("disabled")).toBe(true);
  });

  test("Should show as disable submit button when has not products", async () => {
    const newOrder: NewOrder = {
      ...order,
      products: [],
    };
    const { findByRole } = render(
      <CreateOrder
        order={newOrder}
        onRemoveProduct={anyFunction}
        onRemoveProductFromList={anyFunction}
        onAddProduct={anyFunction}
        onChangeCustomer={anyFunction}
        onSubmit={anyFunction}
        disableForm={false}
      />,
    );
    const submitButton = await findByRole("button", {
      name: /Create new order/i,
    });

    expect(submitButton.hasAttribute("disabled")).toBe(true);
  });

  test("Should show as NOT disable submit button when order is ready to be submit", async () => {
    const { findByRole } = render(
      <CreateOrder
        order={order}
        onRemoveProduct={anyFunction}
        onRemoveProductFromList={anyFunction}
        onAddProduct={anyFunction}
        onChangeCustomer={anyFunction}
        onSubmit={anyFunction}
        disableForm={false}
      />,
    );
    const submitButton = await findByRole("button", {
      name: /Create new order/i,
    });

    expect(submitButton.hasAttribute("disabled")).toBe(false);
  });
});
