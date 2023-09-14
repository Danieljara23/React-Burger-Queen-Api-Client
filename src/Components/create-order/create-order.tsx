import { NewOrder, OrderProduct } from "../../models/order";
import { Product } from "../../models/product";
import OrderProductList from "../order-product-list/order-product-list";
import "./create-order.css";

type CreateOrderProps = {
  order: NewOrder;
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (product: Product) => void;
  onRemoveProductFromList: (product: Product) => void;
  onChangeCustomer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  disableForm: boolean;
};

const CreateOrder: React.FC<CreateOrderProps> = ({
  order,
  disableForm,
  onRemoveProduct,
  onRemoveProductFromList,
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
        removeProductFromList={onRemoveProductFromList}
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
