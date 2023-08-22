import { FormEvent, useState } from "react"
import { IProduct, PRODUCT_TYPE } from "../../../../Models/Product";

interface AddProductProps{
  addProductHandler: (product:IProduct) => void
}

interface CustomElements extends HTMLFormControlsCollection   {
  name: HTMLInputElement;
  price: HTMLInputElement;
  type: HTMLInputElement;
}

interface CustomFormProps extends HTMLFormElement {
  readonly elements: CustomElements;
}

function AddProduct({addProductHandler}:AddProductProps) {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e:FormEvent<CustomFormProps>)=> {
    e.preventDefault();

    const form = e.target;
    // @ts-ignore
    const formData = new FormData(form);
    console.log({formData})
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    const productObject:IProduct = {
      id: 0,
      image: "https://picsum.photos/536/354",
      dateEntry: String(new Date().toLocaleString),
      name: String(formJson.name),
      price: Number(formJson.price),
      type: formJson.type === 'Desayuno' ? PRODUCT_TYPE.breakfast: PRODUCT_TYPE.lunch,
    }
    addProductHandler(productObject);
    setShowModal(false);
  }
  
  return (
    <div className="add-product-container">
      <button onClick={()=>setShowModal(true)} className="btn btn-red">Create product</button>

      {showModal && (
        <div className="modal-container">
          <button className="close-button" onClick={()=>setShowModal(false)}>X</button>
          <h2>Add a product</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre del producto</label>
            <input type="text" name="name" />

            <label htmlFor="price">Precio del producto</label>
            <input type="text" name="price" />
            
            <label htmlFor="type">Tipo de producto</label>
            <select name="type" id="">
              <option value=""></option>
              <option value={PRODUCT_TYPE.breakfast}>{PRODUCT_TYPE.breakfast}</option>
              <option value={PRODUCT_TYPE.lunch}>{PRODUCT_TYPE.lunch}</option>
            </select>
            <button type="reset">Reset form</button>
            <button type="submit">Submit form</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AddProduct