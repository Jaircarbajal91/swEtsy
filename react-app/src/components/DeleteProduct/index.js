
const DeleteProduct = ({ setShowDelete, setDeleted }) => {
  return (
    <div>
      <h1>Are you sure you want to delete this product?</h1>
      <button onClick={() => setDeleted(true)}>Yes</button>
      <button onClick={() => setShowDelete(false)}>No</button>
    </div>
  )
}

export default DeleteProduct
