import { useEffect, useReducer, useState } from "react";
import { getProducts } from "../services/product-repository";
import { PRODUCT_TYPE, Product } from "../models/product.d";
import { NewOrder, OrderProduct, WaiterReduceParams } from "../models/order.d";
import ProductList from "../Components/product-list/product-list";
import "./waiter.css";
import CreateOrder from "../Components/create-order/create-order";
import { createOrder } from "../services/order-repository";
import { LoadingMessageHook } from "../Hooks/loading-message-hook";

const initialOrder: NewOrder = {
  client: "",
  products: [],
  status: "pending",
};

const reducer = (state: NewOrder, action: WaiterReduceParams) => {
	switch (action.type) {
    case "SET_CUSTOMER_NAME":
      return {
        ...state,
        client: action.payload
      };
    case "RESET_ORDER":
      return initialOrder;
		case "ADD_PRODUCT":
		case "DEL_PRODUCT":
			const modifier = action.type === "ADD_PRODUCT" ? 1 : -1;
			const productToModify = action.payload;
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
			const newList = inList
				? mappedList
				: [...state.products, thisProd];

			return{
				...state,
				products: newList.filter(({ qty }) => qty > 0),
			};
    default:
      return state;
  }
};

const Waiter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialOrder);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PRODUCT_TYPE>("Desayuno");
  const { loading, message, setLoading, setMessage, setLoadingAndMessage } =
    LoadingMessageHook();
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
    let newMsg = "Your order has been created";
    setLoading(true);
    try {
      await createOrder(state);
      onDispatch({ type: "RESET_ORDER", payload: null });
    } catch (error) {
      newMsg = "Something went wrong creating your order";
    }
    setLoadingAndMessage(false, newMsg);
  };
  const handleAddProduct = (product: Product) =>
    onDispatch({ type: "ADD_PRODUCT", payload: product });
  const handleRemoveProduct = (product: Product) =>
    onDispatch({ type: "DEL_PRODUCT", payload: product });
  const getAllProducts = async () => setProducts(await getProducts());
    useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <h1>Waiter</h1>
      <div className="product-container">
        <section>
          <h2>Products</h2>
          <div>
            <button
              className={tabButtonClass("Desayuno")}
              onClick={() => setSelectedCategory("Desayuno")}
            >
              Breakfast
            </button>
            <button
              className={tabButtonClass("Almuerzo")}
              onClick={() => setSelectedCategory("Almuerzo")}
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
            onAddProduct={handleAddProduct}
            onChangeCustomer={handleChangeCustomer}
            onSubmit={handleSubmitCreateOrder}
            orderMsg={message}
            loading={loading}
          />
        </section>
      </div>
    </>
  );
};

export default Waiter;
