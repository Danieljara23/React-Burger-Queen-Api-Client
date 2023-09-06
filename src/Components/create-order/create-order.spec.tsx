import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateOrder from "./create-order";
import { NewOrder } from "../../models/order";

describe("<CreateOrder />", () => {
  const anyFunction = () => {
    console.log("anyFunction called");
  };
  const order: NewOrder = {
    status: "pending",
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

  test("Should show total prices as expected when have selected products", async () => {
    const { container } = render(
      <CreateOrder
        order={order}
        orderMsg={""}
        onRemoveProduct={anyFunction}
        onAddProduct={anyFunction}
        onChangeCustomer={anyFunction}
        onSubmit={anyFunction}
        loading={false}
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
    const { container } = render(
      <CreateOrder
        order={newOrder}
        orderMsg={""}
        onRemoveProduct={anyFunction}
        onAddProduct={anyFunction}
        onChangeCustomer={anyFunction}
        onSubmit={anyFunction}
        loading={false}
      />,
    );
    const submitButton = container.querySelector(
      "form > button",
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);
  });

  test("Should show as disable submit button when has not products", async () => {
    const newOrder: NewOrder = {
      ...order,
      products: [],
    };
    const { container } = render(
      <CreateOrder
        order={newOrder}
        orderMsg={""}
        onRemoveProduct={anyFunction}
        onAddProduct={anyFunction}
        onChangeCustomer={anyFunction}
        onSubmit={anyFunction}
        loading={false}
      />,
    );
    const submitButton = container.querySelector(
      "form > button",
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);
  });

  test("Should show as NOT disable submit button when order is ready to be submit", async () => {
    const { container } = render(
      <CreateOrder
        order={order}
        orderMsg={""}
        onRemoveProduct={anyFunction}
        onAddProduct={anyFunction}
        onChangeCustomer={anyFunction}
        onSubmit={anyFunction}
        loading={false}
      />,
    );
    const submitButton = container.querySelector(
      "form > button",
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });
});
