import { IProduct } from "../../Models/Product.d";
import "./ProductList.css";

interface ProductListProps {
  products: IProduct[];
  onAddProduct: (product: IProduct) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddProduct: addProduct,
}) => {
  return (
    <ul className="product-list-container">
      {products.map((product: IProduct) => (
        <li key={product.id} onClick={() => addProduct(product)}>
          {product.name}
          <img src={product.image} alt={product.name} />${product.price}
        </li>
      ))}
    </ul>
  );
};
export default ProductList;
