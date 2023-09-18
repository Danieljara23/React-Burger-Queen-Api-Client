import { useEffect, useState } from "react";
import { getProducts } from "../services/product-repository";
import { PRODUCT_TYPE, Product } from "../models/product.d";
import { NewOrder, OrderProduct } from "../models/order.d";
import ProductList from "../Components/product-list/product-list";
import "./waiter.css";
import CreateOrder from "../Components/create-order/create-order";
import { createOrder } from "../services/order-repository";
import { useRequestHook } from "../Hooks/use-request-hook";

const ADD_PRODUCT = true;
const REMOVE_PRODUCT = false;

const initialOrder: NewOrder = {
  client: "",
  products: [],
};

const Waiter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<PRODUCT_TYPE>("Desayuno");
  const [newOrder, setNewOrder] = useState<NewOrder>(initialOrder);
  const [message, setMessage] = useState<string>("");
  const { loading, execute, onError, onLoading } =
    useRequestHook();
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
		const result = await execute(createOrder(newOrder));
		if (result !== null) {
			onSetOrder(initialOrder);
    } else {
			newMsg = "Something went wrong creating your order";
    }
    setMessage(newMsg);
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
  const handleActiveTab = (e: unknown)=> {
	const type = (e as React.ChangeEvent<HTMLInputElement>).target.getAttribute('data-type');
	if (type !== null)
		setActiveTab(type as PRODUCT_TYPE);
};
  const handleAddProduct = (product: Product) =>
    modifyProductList(ADD_PRODUCT, product);
  const handleRemoveProduct = (product: Product) =>
    modifyProductList(REMOVE_PRODUCT, product);
  const getAllProducts = async () => setProducts(await getProducts());
    useEffect(() => {
    getAllProducts();
  }, []);

  onError(setMessage);
  onLoading(setMessage);

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
            disableForm={loading}
          />
          {message && <div aria-live="polite">{message}</div>}
        </section>
      </div>
    </>
  );
};

export default Waiter;
