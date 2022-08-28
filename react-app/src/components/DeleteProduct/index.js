import './deleteConfirmation.css'

const DeleteProduct = ({ setShowDelete, setDeleted }) => {
  return (
    <div className='delete-confirmation-modal'>
      <h1 className='delete-confirmation-question'>Are you sure you want to delete this product?</h1>
      <button className='delete-confirmation-yes' onClick={() => setDeleted(true)}>Yes</button>
      <button className='delete-confirmation-no' onClick={() => setShowDelete(false)}>No</button>
    </div>
  )
}

export default DeleteProduct
