import { NewOrder, OrderProduct } from "../../models/order";
import { Product } from "../../models/product";
import OrderProductList from "../order-product-list/order-product-list";
import styles from "./create-order.module.css";

type CreateOrderProps = {
  order: NewOrder;
  onModifyProductQty: (payload: OrderProduct) => void;
  onRemoveProductFromList: (product: Product) => void;
  onChangeCustomer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  disableForm: boolean;
};

const CreateOrder: React.FC<CreateOrderProps> = ({
  order,
  disableForm,
  onRemoveProductFromList,
  onModifyProductQty,
  onChangeCustomer,
  onSubmit,
}) => {
  return (
    <>
      <h2>Create order</h2>
      <OrderProductList
        order={order}
				disableForm={disableForm}
        onModifyProductQty={onModifyProductQty}
        onRemoveProductFromList={onRemoveProductFromList}
      />
      <div className={styles.create_order_total_cost}>
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
          disabled={disableForm}
        />
        <button
          disabled={
            order.client === "" || order.products.length === 0 || disableForm
          }
          type="submit"
        >
          Create new order
        </button>
      </form>
    </>
  );
};

export default CreateOrder;
