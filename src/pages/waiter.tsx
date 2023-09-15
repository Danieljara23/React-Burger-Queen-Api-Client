import { useEffect, useReducer, useState } from "react";
import { getProducts } from "../services/product-repository";
import { PRODUCT_TYPE, Product } from "../models/product.d";
import { NewOrder, OrderProduct, WaiterReduceParams } from "../models/order.d";
import ProductList from "../Components/product-list/product-list";
import "./waiter.css";
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
    case "ADD_PRODUCT":
    case "DEL_PRODUCT": {
      const modifier = action.type === "ADD_PRODUCT" ? 1 : -1;
      const productToModify = action.payload as Product;
      const inList = state.products.find(
        (orderProduct: OrderProduct) =>
          orderProduct.product.id === productToModify.id,
      );
      const mappedList = state.products.map((orderProduct: OrderProduct) => {
        const isThis = orderProduct.product.id === productToModify.id;

        return {
          ...orderProduct,
          qty: isThis ? orderProduct.qty + modifier : orderProduct.qty,
        };
      });
      const thisProd = {
        product: productToModify,
        qty: modifier,
      };
      const newList = inList ? mappedList : [...state.products, thisProd];

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
  const tabButtonClass = (prodType: PRODUCT_TYPE) =>
    selectedCategory === prodType ? "" : "pseudo";
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
  const handleActiveTab = (e: unknown) => {
    const type = (e as React.ChangeEvent<HTMLInputElement>).target.getAttribute(
      "data-type",
    );
    if (type !== null) setSelectedCategory(type as PRODUCT_TYPE);
  };
  const handleAddProduct = (product: Product) =>
    onDispatch({ type: "ADD_PRODUCT", payload: product });
  const handleRemoveProduct = (product: Product) =>
    onDispatch({ type: "DEL_PRODUCT", payload: product });
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
      <h1>Waiter</h1>
      <div className="product-container">
        <section>
          <h2>Products</h2>
          <div>
            <button
              className={tabButtonClass("Desayuno")}
              data-type="Desayuno"
              onClick={handleActiveTab}
            >
              Breakfast
            </button>
            <button
              className={tabButtonClass("Almuerzo")}
              data-type="Almuerzo"
              onClick={handleActiveTab}
            >
              Lunch
            </button>
          </div>
          <ProductList
            products={products.filter(
              (product: Product) => product.type === selectedCategory,
            )}
            onAddProduct={handleAddProduct}
          />
        </section>
        <section>
          <CreateOrder
            order={state}
            onRemoveProduct={handleRemoveProduct}
            onRemoveProductFromList={handleRemoveProductFromList}
            onAddProduct={handleAddProduct}
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
