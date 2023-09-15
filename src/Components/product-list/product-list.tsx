import { Product } from "../../models/product";
import styles from "./product-list.module.css";

type ProductListProps = {
  products: Product[];
  onAddProduct: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddProduct: addProduct,
}) => {
  return (
    <ul className={styles.product_list_container}>
      {products.map((product: Product) => (
        <li
          className={styles.product_list_container_li}
          key={product.id}
          onClick={() => addProduct(product)}
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
