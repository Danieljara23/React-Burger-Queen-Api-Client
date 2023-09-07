import { NewOrder, OrderProduct } from "../../models/order";
import { Product } from "../../models/product";
import OrderProductList from "../order-product-list/order-product-list";
import "./create-order.css";

type CreateOrderProps = {
  order: NewOrder;
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (product: Product) => void;
  onChangeCustomer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  orderMsg: string;
  loading: boolean;
};

const CreateOrder: React.FC<CreateOrderProps> = ({
  order,
  orderMsg,
  loading,
  onRemoveProduct,
  onAddProduct,
  onChangeCustomer,
  onSubmit,
}) => {
  return (
    <>
      <h2>Create order</h2>
      <OrderProductList
        order={order}
        addProduct={onAddProduct}
        removeProduct={onRemoveProduct}
      />
      <div className="create-order-total-cost">
        {" "}
        Total cost: $
        {order.products.reduce(
          (memo: number, item: OrderProduct) =>
            item.product.price * item.qty + memo,
          0,
        )}
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="customer-name">Customer name:</label>
        <input
          type="text"
          required
          name="customer-name"
          id="customer-name"
          value={order.client}
          onChange={onChangeCustomer}
          disabled={loading}
        />
        <button
          disabled={
            order.client === "" || order.products.length === 0 || loading
          }
          type="submit"
        >
          Create new order
        </button>
      </form>
      {orderMsg && <div aria-live="polite">{orderMsg}</div>}
    </>
  );
};

export default CreateOrder;
