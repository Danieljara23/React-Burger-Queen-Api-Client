import { useEffect, useState } from "react";
import { getProducts } from "../Services/ProductRepository";
import { PRODUCT_TYPE, IProduct } from "../Models/Product.d";
import { IOrder, IOrderProduct, } from "../Models/Order.d";
import ProductList from "../Components/ProductList/ProductList";
import "./Waiter.css"
import CreateOrder from "../Components/CreateOrder/CreateOrder";

const ADD_PRODUCT = true;
const REMOVE_PRODUCT = false;

interface WaiterProps {

}

const Waiter: React.FC<WaiterProps> = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [activeTab, setActiveTab] = useState(PRODUCT_TYPE.breakfast);
	const [order, setOrder] = useState<IOrder>({ costumer: "", products: [] });
	const tabButtonClass = (prodType: PRODUCT_TYPE) => activeTab === prodType ? "" : "pseudo";
	const handleChangeCustomer = (e: React.ChangeEvent<HTMLInputElement>) => setOrder( { ...order, costumer: e.target.value} );

	/**
	 * add or remove product from order product list
	 * @param add 
	 * @param productToModify 
	 */
	const modifyProductList = (add: boolean, productToModify: IProduct) => {
		const modifier = add ? 1 : -1;
		const alreadyInList = order.products.find((orderProduct: IOrderProduct) => orderProduct.product.id === productToModify.id);
		const mappedList =
			order.products.map((orderProduct: IOrderProduct) => {
				const isThis = orderProduct.product.id === productToModify.id;

				return {
					...orderProduct,
					qty: isThis ? orderProduct.qty + modifier : orderProduct.qty
				}
			});
		const thisProd = {
			product: productToModify,
			qty: modifier
		};
		const newList = alreadyInList ? mappedList : [...order.products, thisProd];

		setOrder({
			...order,
			products: newList.filter(({ qty }) => qty > 0)
		});
	};
	const handleAddProduct = (product: IProduct) => modifyProductList(ADD_PRODUCT, product);
	const handleRemoveProduct = (product: IProduct) => modifyProductList(REMOVE_PRODUCT, product);

	useEffect(() => {
		getProducts().then((newProducts) => {
			setProducts(newProducts);
		});
	}, []);

	return (<>
		<h1>Waiter</h1>
		<div className="product-container">
			<section>
				<h2>Products</h2>
				<div>
					<button className={tabButtonClass(PRODUCT_TYPE.breakfast)}
						onClick={() => setActiveTab(PRODUCT_TYPE.breakfast)}
					>
						Breakfast
					</button>
					<button className={tabButtonClass(PRODUCT_TYPE.lunch)}
						onClick={() => setActiveTab(PRODUCT_TYPE.lunch)}
					>
						Lunch
					</button>
				</div>
				<ProductList
					products={products.filter((product: IProduct) => product.type === activeTab)}
					onAddProduct={handleAddProduct}
				/>
			</section>
			<section>
				<CreateOrder 
					order={order} 
					onRemoveProduct={handleRemoveProduct} 
					onAddProduct={handleAddProduct} 
					onChangeCustomer={handleChangeCustomer}
				/>
			</section>
		</div>
	</>);
}

export default Waiter;