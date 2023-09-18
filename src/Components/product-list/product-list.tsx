import { OrderProduct } from "../../models/order";
import { Product } from "../../models/product";
import styles from "./product-list.module.css";

type ProductListProps = {
  products: Product[];
  onModifyProductQty: (payload: OrderProduct) => void;
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  onModifyProductQty,
}) => {
  return (
    <ul className={styles.product_list_container}>
      {products.map((product: Product) => (
        <li
          className={styles.product_list_container_li}
          key={product.id}
          onClick={() => onModifyProductQty({ product, qty: 1})}
        >
          {product.name}
          <img
            className={styles.product_list_container_img}
            src={product.image}
            alt={product.name}
          />
          ${product.price}
        </li>
      ))}
    </ul>
  );
};
export default ProductList;
