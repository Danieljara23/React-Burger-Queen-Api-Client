import { Product } from "../../models/product";
import { NewOrder, OrderProduct } from "../../models/order";
import "./order-product-list.css";

type OrderProductListProps = {
  order: NewOrder;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
};

const OrderProductList: React.FC<OrderProductListProps> = ({
  order,
  addProduct,
  removeProduct,
}) => {
  return (
    <>
      {order.products.length === 0 && (
        <span>You have not added products to this order</span>
      )}
      <ul className="order-list-container">
        {order.products.map((orderProduct: OrderProduct) => (
          <li key={orderProduct.product.id}>
            <button
              aria-label={"Remove one " + orderProduct.product.name}
              className="pseudo"
              onClick={() => removeProduct(orderProduct.product)}
            >
              -
            </button>
            <span>{orderProduct.qty}</span>
            <button
              aria-label={"Add one more " + orderProduct.product.name}
              className="pseudo"
              onClick={() => addProduct(orderProduct.product)}
            >
              +
            </button>
            <span className="product-name">{orderProduct.product.name}</span>
            <span>$ {orderProduct.qty * orderProduct.product.price}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
export default OrderProductList;
