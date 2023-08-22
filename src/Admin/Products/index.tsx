import { useEffect, useState } from "react";
import "./index.css";
import { IProduct } from "../../Models/Product";
import { getProducts, addProduct } from "../../Services/ProductRepository";
import AdminProductList from "./Components/AdminProductList";
import AddProduct from "./Components/AddProduct";

const ProductsAdmin = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    getProducts().then((newProducts) => {
      setProducts(newProducts);
    });
  }

  const addProductHandler = (product:IProduct) => {
    const productObject = {
      ...product,
      id: products.length + 1
    }   
    addProduct(productObject).then(()=>{
      getAllProducts()
    }).catch(error=>console.error(error))
  }


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
