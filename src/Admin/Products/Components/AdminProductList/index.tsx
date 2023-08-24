import { IProduct } from '../../../../Models/Product';

interface AdminProductProps {
  products: IProduct[]
}

function AdminProductList({products}: AdminProductProps) {
  return (
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
              <img className="product-image" src={product.image} alt={product.name} />
            </div>
            <div>
              <button disabled>Edit</button>
              <button disabled>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default  AdminProductList
