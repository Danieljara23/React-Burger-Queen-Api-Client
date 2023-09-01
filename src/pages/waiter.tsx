import { useEffect, useState } from "react";
import { getProducts } from "../services/product-repository";
import { PRODUCT_TYPE, Product } from "../models/product.d";
import { Order, OrderProduct } from "../models/order.d";
import ProductList from "../Components/product-list/product-list";
import "./waiter.css";
import CreateOrder from "../Components/create-order/create-order";
import { getSession } from "../services/token-repository";
import { createOrder } from "../services/order-repository";

const ADD_PRODUCT = true;
const REMOVE_PRODUCT = false;

const Waiter: React.FC = () => {
  const { userId } = getSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [orderMsg, setOrderMsg] = useState<string>("");
  const [activeTab, setActiveTab] = useState<PRODUCT_TYPE>("Desayuno");
  const initialOrder: Order = {
    client: "",
    products: [],
    userId: userId,
    status: "pending",
    dateEntry: "",
  };
  const [order, setOrder] = useState<Order>(initialOrder);
  const tabButtonClass = (prodType: PRODUCT_TYPE) =>
    activeTab === prodType ? "" : "pseudo";
  const onSetOrder = (newOrder: Order) => {
    setOrderMsg("");
    setOrder(newOrder);
  };
  const handleChangeCustomer = (e: React.ChangeEvent<HTMLInputElement>) =>
    onSetOrder({ ...order, client: e.target.value });
  const handleSubmitCreateOrder = async (
    e: React.ChangeEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    let newMsg = "Your order has been created";
    try {
      createOrder(order);
      onSetOrder(initialOrder);
    } catch (error) {
      newMsg = "Something went wrong creating your order";
    }
    setOrderMsg(newMsg);
  };

  /**
   * add or remove product from order product list
   * @param add
   * @param productToModify
   */
  const modifyProductList = (add: boolean, productToModify: Product) => {
    const modifier = add ? 1 : -1;
    const alreadyInList = order.products.find(
      (orderProduct: OrderProduct) =>
        orderProduct.product.id === productToModify.id,
    );
    const mappedList = order.products.map((orderProduct: OrderProduct) => {
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
    const newList = alreadyInList ? mappedList : [...order.products, thisProd];

    onSetOrder({
      ...order,
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
            order={order}
            onRemoveProduct={handleRemoveProduct}
            onAddProduct={handleAddProduct}
            onChangeCustomer={handleChangeCustomer}
            onSubmit={handleSubmitCreateOrder}
            orderMsg={orderMsg}
          />
        </section>
      </div>
    </>
  );
};

export default Waiter;
