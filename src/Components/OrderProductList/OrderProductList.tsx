import { IProduct } from "../../Models/Product.d";
import { IOrder, IOrderProduct } from "../../Models/Order.d";
import "./OrderProductList.css"

interface OrderProductListProps {
	order: IOrder;
	addProduct: (product: IProduct) => void;
	removeProduct: (product: IProduct) => void;
}

const OrderProductList : React.FC<OrderProductListProps> = ({ order, addProduct, removeProduct }) => {
	return (<>
		{ order.products.length === 0 && (<span>You have not added products to this order</span>)}
		<ul className="order-list-container">
			{order.products.map((orderProduct: IOrderProduct) => (
				<li key={orderProduct.product.id}>
					<button
						aria-label={"Remove one " + orderProduct.product.name}
						className="pseudo"
						onClick={()=> removeProduct(orderProduct.product)}
						>
						-
					</button>
					<span>{orderProduct.qty}</span>
					<button
						aria-label={"Add one more " + orderProduct.product.name}
						className="pseudo"
						onClick={()=> addProduct(orderProduct.product)}
						>
						+
					</button>
					<span className="product-name">{orderProduct.product.name}</span>
					<span>$ {orderProduct.qty * orderProduct.product.price}</span>
				</li>
			))}
		</ul>
	</>);
}
export default OrderProductList;
