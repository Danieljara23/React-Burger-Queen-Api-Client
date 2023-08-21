import { useEffect, useState } from "react";
import "./index.css";
import { IProduct, PRODUCT_TYPE } from "../../Models/Product.d.ts";
import { getProducts, addProduct } from "../../Services/ProductRepository";
import AdminProductList from "./Components/AdminProductList";
import AddProduct from "./Components/AddProduct";

const ProductsAdmin = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    getProducts().then((newProducts) => {
      setProducts(newProducts);
    });
  }, []);

  const addProductHandler = () => {
    const product = {
      id: 4,
      dateEntry: '',
      name: "Smoothie",
      price: 8,
      image: "https://picsum.photos/536/354",
      type: PRODUCT_TYPE.breakfast,
    }
    addProduct(product).then((product)=>{
      console.log(product)
    }).catch(error=>console.error(error))
  }

  console.log(products)

  return (
    <>
      <h2>Products Admin Dashboard</h2>
      <AddProduct addProductHandler={addProductHandler}/>
      <section className="products-container">
        <div className="table-header">
          <div className="table-header-item">Nombre del producto</div>
          <div className="table-header-item">Categoría</div>
          <div className="table-header-item">Precio</div>
          <div className="table-header-item">Acciones</div>
        </div>
        <div className="table-body">
          <AdminProductList products={products}/>
        </div>
      </section>
    </>
  );
};

export default ProductsAdmin;
