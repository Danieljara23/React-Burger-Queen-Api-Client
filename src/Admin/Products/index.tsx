import { useEffect, useState } from "react";
import "./index.css";
import { IProduct } from "../../Models/Product";
import { getProducts } from "../../Services/ProductRepository";

const ProductsAdmin = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    getProducts().then((newProducts) => {
      setProducts(newProducts);
    });
  }, []);

  return (
    <>
      <h2>Products Admin Dashboard</h2>
      <div className="btn-container">
        <button className="btn btn-red">Create product</button>
      </div>
      <section className="products-container">
        <div className="table-header">
          <div className="table-header-item">Nombre del producto</div>
          <div className="table-header-item">Categoría</div>
          <div className="table-header-item">Precio</div>
          <div className="table-header-item">Acciones</div>
        </div>
        <div className="table-body">
          {products.map((product: IProduct) => {
            return (
              <div className="table-body-row" key={product.id + product.name}>
                <div>
                  <p>{product.name}</p>
                </div>
                <div>
                  <p>{product.type}</p>
                </div>
                <div>
                  <p>${product.price}</p>
                </div>
                <div>
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ProductsAdmin;
