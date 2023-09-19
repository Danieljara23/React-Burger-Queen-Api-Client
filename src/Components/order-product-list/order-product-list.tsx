import { Product } from "../../models/product";
import { NewOrder, OrderProduct } from "../../models/order";
import styles from "./order-product-list.module.css";
import TrashIcon from "../trash-icon/trash-icon";

type OrderProductListProps = {
  order: NewOrder;
	disableForm: boolean;
  onModifyProductQty: (payload: OrderProduct) => void;
  onRemoveProductFromList: (product: Product) => void;
};

const OrderProductList: React.FC<OrderProductListProps> = ({
  order,
	disableForm,
  onModifyProductQty,
  onRemoveProductFromList,
}) => {
  return (
    <>
      {order.products.length === 0 && (
        <span>You have not added products to this order</span>
      )}
      <ul className={styles.order_list_container}>
        {order.products.map((orderProduct: OrderProduct) => (
          <li
            className={styles.order_list_container_li}
            key={orderProduct.product.id}
          >
            <button
              aria-label={"Remove one " + orderProduct.product.name}
              className="pseudo"
              onClick={() => onModifyProductQty({ product: orderProduct.product, qty: -1 })}
							disabled={disableForm || orderProduct.qty === 1}
            >
              -
            </button>
            <span>{orderProduct.qty}</span>
            <button
							disabled={disableForm}
              aria-label={"Add one more " + orderProduct.product.name}
              className="pseudo"
              onClick={() => onModifyProductQty({ product: orderProduct.product, qty: 1 })}
            >
              +
            </button>
            <span className={styles.order_list_container_product_name}>
              {orderProduct.product.name}
            </span>
            <span>$ {orderProduct.qty * orderProduct.product.price}</span>
            <button
							disabled={disableForm}
              aria-label="Remove product"
              className="pseudo trash-button"
              onClick={() => onRemoveProductFromList(orderProduct.product)}
            >
              <TrashIcon className={styles.trash_icon} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default OrderProductList;
