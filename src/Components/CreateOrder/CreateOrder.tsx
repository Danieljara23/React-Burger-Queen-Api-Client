import { IOrder, IOrderProduct } from "../../Models/Order.d";
import { IProduct } from "../../Models/Product.d";
import OrderProductList from "../OrderProductList/OrderProductList";
import "./CreateOrder.css";

interface CreateOrderProps {
	order: IOrder;
    onAddProduct: (product: IProduct) => void;
	onRemoveProduct: (product: IProduct) => void;
	onChangeCustomer: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	orderMsg: string;
};

const CreateOrder: React.FC<CreateOrderProps> = ({order, orderMsg, onRemoveProduct, onAddProduct, onChangeCustomer, onSubmit}) => {

	return (<>
		<h2>Create order</h2>
		<OrderProductList
			order={order}
			addProduct={onAddProduct}
			removeProduct={onRemoveProduct}
		/>
		<div className="create-order-total-cost"> Total cost: ${order.products.reduce((memo: number, item: IOrderProduct) => item.product.price * item.qty + memo, 0)}</div>
		<form onSubmit={onSubmit}>
			<label htmlFor="costumer-name">Costumer name:</label>
			<input type="text" required name="costumer-name" id="costumer-name" value={order.client} onChange={onChangeCustomer} />
			<button disabled={order.client === "" || order.products.length === 0} type="submit">Create new order</button>
		</form>
		{orderMsg && <div aria-live="polite">{orderMsg}</div>}
	</>);
}

export default CreateOrder;
