import React, {useState} from 'react'
import {useDataContext} from './DataContext'
import AddAuthorForm from './AddAuthorForm';

function Author() {
  const {authors, editAuthor, deleteAuthor} = useDataContext();

     // State to store the author being edited
     const [editingauthor, setEditingauthor] = useState(null);
     const [popup, setPopup] = useState(false);

     // Function to handle edit button click
     const handleEditClick = (author) => {
       setEditingauthor(author);
     };
   
     const openPopup = () => {
      setPopup(true);
    };

     // Function to close the popup
     const closePopup = () => {
       setEditingauthor(null);
     };
     
     const closePopup1 = () => {
      setPopup(false);
    };
  return (
    <>
    <div className='list'>
      <div>
        <h2>AUTHORS</h2> 
         {popup && (
                <div className="cart-popup-overlay">
                  <div className="cart-popup-container">
                    <h3>Add Author</h3>
                    <AddAuthorForm closePopup={closePopup1} /> {/* Render AddAuthorForm */}
                    <button onClick={closePopup1} className="btn btn-outline-secondary btn-sm">Close</button>
                  </div>
                </div>
              )}
              <button onClick={openPopup} className="btn btn-outline-primary btn-sm mr-2">
                ADD AUTHOR
              </button>
              </div>
        <ul className='list-group'>
          {authors.map(author =>(
            <li key={author.id} className='list-group-item d-flex justify-content-between align-items-center'>
              <div>
                <span><b>Name: </b>{author.name}</span><br />
                <span><b>Date Of Birth: </b>{author.dob}</span><br />
                <span><b>Biography: </b>{author.bio}</span><br />
              </div>
              <div>
                <button onClick={() => handleEditClick(author)} className='btn btn-outline-primary btn-sm mr-2'>
                  Edit
                  </button>
                  <button onClick={() => deleteAuthor(author.id)} className="btn btn-outline-danger btn-sm">
                    Delete
                    </button>
              </div>
            </li>
          ))}
        </ul>
    </div>
    {editingauthor !== null && (
        <div className="cart-popup-overlay">
        <div className="cart-popup-container">
          <h3>Edit Mode</h3>
          <AddAuthorForm
            editAuthor={editAuthor}
            editingauthor={editingauthor}
            setEditingauthor={setEditingauthor}
            closePopup={closePopup} 
          />
        </div>
      </div>
    )}
    </>
  )
}

export default Author
