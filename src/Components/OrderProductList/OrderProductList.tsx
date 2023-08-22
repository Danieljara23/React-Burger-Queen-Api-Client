import { IProduct } from "../../Models/Product";
import { IOrder, IOrderProduct } from "../../Models/Order.d";
import "./OrderProductList.css"

interface OrderProductListProps {
	order: IOrder;
	addProduct: (p: IProduct) => void;
	removeProduct: (p: IProduct) => void;
}

const OrderProductList : React.FC<OrderProductListProps> = ({ order, addProduct, removeProduct }) => {
	return (<>
		{ order.products.length === 0 && (<span>You have not added products to this order</span>)}
		<ul className="order-list-container">
			{order.products.map((prod: IOrderProduct) => (
				<li key={prod.product.id}>
					<button
						aria-label={"Remove one " + prod.product.name}
						className="pseudo"
						onClick={()=> removeProduct(prod.product)}
						>
						-
					</button>
					<span>{prod.qty}</span>
					<button
						aria-label={"Add one more " + prod.product.name}
						className="pseudo"
						onClick={()=> addProduct(prod.product)}
						>
						+
					</button>
					<span className="product-name">{prod.product.name}</span>
					<span>$ {prod.qty * prod.product.price}</span>
				</li>
			))}
		</ul>
	</>);
}
export default OrderProductList;
