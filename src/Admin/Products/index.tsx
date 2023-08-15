import "./index.css";

const ProductsAdmin = () => (
  <>

  <h2>Products Admin</h2>
  <section className="products-container">
  <div className="table-header">
    <div className="table-header-item">
      Nombre del producto
    </div>
    <div className="table-header-item">
      Categoría
    </div>
    <div className="table-header-item">
      Precio
    </div>
    <div className="table-header-item">
      Acciones
    </div>
  </div>
  <div className="table-body">
    <div className="table-body-row">
      <div>
        American Coffee
      </div>
      <div>
        Breakfast
      </div>
      <div>
        5$
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
    <div className="table-body-row">
      <div>
        American Coffee
      </div>
      <div>
        Breakfast
      </div>
      <div>
        5$
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
    <div className="table-body-row">
      <div>
        American Coffee
      </div>
      <div>
        Breakfast
      </div>
      <div>
        5$
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
    <div className="table-body-row">
      <div>
        American Coffee
      </div>
      <div>
        Breakfast
      </div>
      <div>
        5$
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  </div>
  </section>
  </>
);

export default ProductsAdmin;