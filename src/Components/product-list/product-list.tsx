import { Product } from "../../models/product";
import "./product-list.css";

type ProductListProps = {
  products: Product[];
  onAddProduct: (product: Product) => void;
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddProduct: addProduct,
}) => {
  return (
    <ul className="product-list-container">
      {products.map((product: Product) => (
        <li key={product.id} onClick={() => addProduct(product)}>
          {product.name}
          <img src={product.image} alt={product.name} />${product.price}
        </li>
      ))}
    </ul>
  );
};
export default ProductList;
