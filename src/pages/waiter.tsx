import { useEffect, useReducer, useState } from "react";
import { getProducts } from "../services/product-repository";
import { PRODUCT_TYPE, Product } from "../models/product.d";
import { NewOrder, OrderProduct, WaiterReduceParams } from "../models/order.d";
import ProductList from "../Components/product-list/product-list";
import styles from "./waiter.module.css";
import CreateOrder from "../Components/create-order/create-order";
import { createOrder } from "../services/order-repository";
import { couldNotCreate, createdCorrectly } from "../resources";
import { useRequestHook } from "../Hooks/use-request-hook";

const initialOrder: NewOrder = {
  client: "",
  products: [],
};

const reducer = (state: NewOrder, action: WaiterReduceParams): NewOrder => {
  switch (action.type) {
    case "SET_CUSTOMER_NAME":
      return {
        ...state,
        client: action.payload as string,
      };
    case "RESET_ORDER":
      return initialOrder;
    case "MODIFY_QTY_PRODUCT": {
      const payload = action.payload as OrderProduct;
      const inList = state.products.find(
        (orderProduct: OrderProduct) =>
          orderProduct.product.id === payload.product.id,
      );
      const mappedList = state.products.map((orderProduct: OrderProduct) => {
        const isThis = orderProduct.product.id === payload.product.id;

        return {
          ...orderProduct,
          qty: isThis ? orderProduct.qty + payload.qty : orderProduct.qty,
        };
      });
      const newList = inList ? mappedList : [...state.products, payload];

      return {
        ...state,
        products: newList,
      };
    }
    case "DEL_PRODUCT_FROM_LIST":
      return {
        ...state,
        products: state.products.filter(
          ({ product }) => product.id !== (action.payload as Product).id,
        ),
      };
    default:
      return state;
  }
};

const Waiter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialOrder);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<PRODUCT_TYPE>("Desayuno");
  const [message, setMessage] = useState<string>("");
  const { loading, execute, useOnError, useOnLoading } = useRequestHook();
  const onDispatch = (params: WaiterReduceParams) => {
    setMessage("");
    dispatch(params);
  };
  const handleChangeCustomer = (e: React.ChangeEvent<HTMLInputElement>) =>
    onDispatch({ type: "SET_CUSTOMER_NAME", payload: e.target.value });
  const handleSubmitCreateOrder = async (
    e: React.ChangeEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    let newMsg = createdCorrectly("order");
    const result = await execute(createOrder(state));
    if (result !== null) {
      onDispatch({ type: "RESET_ORDER", payload: null });
    } else {
      newMsg = couldNotCreate("order");
    }
    setMessage(newMsg);
  };
  const handleSelectedCategory = (e: unknown) => {
    const type = (e as React.ChangeEvent<HTMLInputElement>).target.getAttribute(
      "data-type",
    );
    if (type !== null) setSelectedCategory(type as PRODUCT_TYPE);
  };
  const handleModifyProductQty = (payload: OrderProduct) =>
    onDispatch({ type: "MODIFY_QTY_PRODUCT", payload });
  const handleRemoveProductFromList = (product: Product) =>
    onDispatch({ type: "DEL_PRODUCT_FROM_LIST", payload: product });
  const getAllProducts = async () => setProducts(await getProducts());
  useEffect(() => {
    getAllProducts();
  }, []);

  useOnError(setMessage);
  useOnLoading(setMessage);

  return (
    <>
      <h1 className={styles.h1}>Waiter</h1>
      <div className={styles.product_container}>
        <section className={styles.product_container_section}>
          <h2>Products</h2>
          <div>
            <button
              className={
                selectedCategory === "Almuerzo"
                  ? styles.product_container_not_selected
                  : ""
              }
              data-type="Desayuno"
              onClick={handleSelectedCategory}
            >
              Breakfast
            </button>
            <button
              className={
                selectedCategory === "Desayuno"
                  ? styles.product_container_not_selected
                  : ""
              }
              data-type="Almuerzo"
              onClick={handleSelectedCategory}
            >
              Lunch
            </button>
          </div>
          <ProductList
            products={products.filter(
              (product: Product) => product.type === selectedCategory,
            )}
            onModifyProductQty={handleModifyProductQty}
          />
        </section>
        <section className={styles.product_container_section}>
          <CreateOrder
            order={state}
            onRemoveProductFromList={handleRemoveProductFromList}
            onModifyProductQty={handleModifyProductQty}
            onChangeCustomer={handleChangeCustomer}
            onSubmit={handleSubmitCreateOrder}
            disableForm={loading}
          />
          {message && <div aria-live="polite">{message}</div>}
        </section>
      </div>
    </>
  );
};

export default Waiter;
