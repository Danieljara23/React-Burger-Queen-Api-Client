import React from 'react'

interface AddProductProps{
  addProductHandler: () => void
}

function AddProduct({addProductHandler}:AddProductProps) {
  return (
    <div className="btn-container">
      <button onClick={()=>addProductHandler()} className="btn btn-red">Create product</button>
    </div>
  )
}

export default AddProduct