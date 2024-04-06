import React, {useState} from 'react'
import {useDataContext} from './DataContext'
import  AddBookForm  from './AddBookForm';


function Books() {
  const {books, editBook, deleteBook} = useDataContext();

   // State to store the book being edited
   const [editingbook, setEditingbook] = useState(null);
   const [popup, setPopup] = useState(false);
   

   // Function to handle edit button click
   const handleEditClick = (book) => {
     setEditingbook(book);
   };
 
 
   // Function to close the popup
   const closePopup = () => {
     setEditingbook(null);
   };

   const openPopup = () => {
    setPopup(true);
  };

   const closePopup1 = () => {
    setPopup(false);
  };
 

  return (
    <>
    <div className='list'>
        <div >
          <h2>BOOKS</h2>
          {popup && (
                <div className="cart-popup-overlay">
                  <div className="cart-popup-container">
                    <h3>Add Book</h3>
                    <AddBookForm closePopup={closePopup1} />
                    <button onClick={closePopup1} className="btn btn-outline-secondary btn-sm">Close</button>
                  </div>
                </div>
              )}
              <button onClick={openPopup} className="btn btn-outline-primary btn-sm mr-2">
                ADD BOOK
              </button>
        </div>
        <ul className='list-group'>
          {books.map(book =>(
            <li key={book.id} className='list-group-item d-flex justify-content-between align-items-center'>
              <div>
                <span><b>Title: </b>{book.title}</span><br />
                <span><b>Author: </b>{book.author}</span><br />
                <span><b>ISBN no: </b>{book.isbn}</span><br />
                <span><b>Publication date: </b>{book.date}</span>
              </div>
              <div>
                <button onClick={() => handleEditClick(book)} className='btn btn-outline-primary btn-sm mr-2'>
                  Edit
                  </button>
                  <button onClick={() => deleteBook(book.id)} className="btn btn-outline-danger btn-sm">
                    Delete
                    </button>
              </div>
            </li>
          ))}
        </ul>
    </div>
    {editingbook !== null && (
  <div className="cart-popup-overlay">
    <div className="cart-popup-container">
      <h3>Edit Mode</h3>
      <AddBookForm
        editBook={editBook}
        editingbook={editingbook}
        setEditingbook={setEditingbook}
        closePopup={closePopup} 
      />
      
    </div>
  </div>
)}
    </>
  )
}

export default Books
