import { useEffect, useState } from "react";
import { getProducts } from "../services/product-repository";
import { PRODUCT_TYPE, Product } from "../models/product.d";
import { NewOrder, OrderProduct } from "../models/order.d";
import ProductList from "../Components/product-list/product-list";
import "./waiter.css";
import CreateOrder from "../Components/create-order/create-order";
import { createOrder } from "../services/order-repository";
import { LoadingMessageHook } from "../Hooks/loading-message-hook";

const ADD_PRODUCT = true;
const REMOVE_PRODUCT = false;

const initialOrder: NewOrder = {
  client: "",
  products: [],
  status: "pending",
};

const Waiter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<PRODUCT_TYPE>("Desayuno");
  const [newOrder, setNewOrder] = useState<NewOrder>(initialOrder);
  const { loading, message, setLoading, setMessage, setLoadingAndMessage } =
    LoadingMessageHook();
  const tabButtonClass = (prodType: PRODUCT_TYPE) =>
    activeTab === prodType ? "" : "pseudo";
  const onSetOrder = (newOrder: NewOrder) => {
    setMessage("");
    setNewOrder(newOrder);
  };
  const handleChangeCustomer = (e: React.ChangeEvent<HTMLInputElement>) =>
    onSetOrder({ ...newOrder, client: e.target.value });
  const handleSubmitCreateOrder = async (
    e: React.ChangeEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    let newMsg = "Your order has been created";
    setLoading(true);
    try {
      await createOrder(newOrder);
      onSetOrder(initialOrder);
    } catch (error) {
      newMsg = "Something went wrong creating your order";
    }
    setLoadingAndMessage(false, newMsg);
  };

  /**
   * add or remove product from order product list
   * @param add
   * @param productToModify
   */
  const modifyProductList = (add: boolean, productToModify: Product) => {
    const modifier = add ? 1 : -1;
    const alreadyInList = newOrder.products.find(
      (orderProduct: OrderProduct) =>
        orderProduct.product.id === productToModify.id,
    );
    const mappedList = newOrder.products.map((orderProduct: OrderProduct) => {
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
    const newList = alreadyInList
      ? mappedList
      : [...newOrder.products, thisProd];

    onSetOrder({
      ...newOrder,
      products: newList.filter(({ qty }) => qty > 0),
    });
  };
  const handleAddProduct = (product: Product) =>
    modifyProductList(ADD_PRODUCT, product);
  const handleRemoveProduct = (product: Product) =>
    modifyProductList(REMOVE_PRODUCT, product);
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
              onClick={() => setActiveTab("Desayuno")}
            >
              Breakfast
            </button>
            <button
              className={tabButtonClass("Almuerzo")}
              onClick={() => setActiveTab("Almuerzo")}
            >
              Lunch
            </button>
          </div>
          <ProductList
            products={products.filter(
              (product: Product) => product.type === activeTab,
            )}
            onAddProduct={handleAddProduct}
          />
        </section>
        <section>
          <CreateOrder
            order={newOrder}
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
