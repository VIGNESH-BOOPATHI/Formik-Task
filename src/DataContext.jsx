import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for books and authors
const DataContext = createContext();

// Custom hook to access the context
export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // State to store books and authors
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from the provided APIs
  const fetchData = async () => {
    try {
      const [booksResponse, authorsResponse] = await Promise.all([
        axios.get('https://65f99ab73909a9a65b18e80d.mockapi.io/Myproject/books'),
        axios.get('https://65f99ab73909a9a65b18e80d.mockapi.io/Myproject/author'),
      ]);
      setBooks(booksResponse.data);
      setAuthors(authorsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to add a new book
  const addBook = (newbook) => {
    axios.post('https://65f99ab73909a9a65b18e80d.mockapi.io/Myproject/books', newbook)
      .then(response => {
        setBooks([...books, response.data]);
      })
      .catch(error => {
        console.error('Error adding book: ', error);
      });
  };

  // Function to add a new author
  const addAuthor = (newAuthor) => {
    axios.post('https://65f99ab73909a9a65b18e80d.mockapi.io/Myproject/author', newAuthor)
      .then(response => {
        setAuthors([...authors, response.data]);
      })
      .catch(error => {
        console.error('Error adding author: ', error);
      });
  };

  // Function to edit a book
  const editBook = (id, updatedBook) => {
    axios.put(`https://65f99ab73909a9a65b18e80d.mockapi.io/Myproject/books/${id}`, updatedBook)
      .then(response => {
        const updatedBooks = books.map(book => {
          if (book.id === id) {
            return response.data;
          }
          return book;
        });
        setBooks(updatedBooks);
      })
      .catch(error => {
        console.error('Error updating book: ', error);
      });
  };

  // Function to edit an author
  const editAuthor = (id, updatedAuthor) => {
    axios.put(`https://65f99ab73909a9a65b18e80d.mockapi.io/Myproject/author/${id}`, updatedAuthor)
      .then(response => {
        const updatedAuthors = authors.map(author => {
          if (author.id === id) {
            return response.data;
          }
          return author;
        });
        setAuthors(updatedAuthors);
      })
      .catch(error => {
        console.error('Error updating author: ', error);
      });
  };

  // Function to delete a book
  const deleteBook = (id) => {
    axios.delete(`https://65f99ab73909a9a65b18e80d.mockapi.io/Myproject/books/${id}`)
      .then(() => {
        const filteredBooks = books.filter(book => book.id !== id);
        setBooks(filteredBooks);
      })
      .catch(error => {
        console.error('Error deleting book: ', error);
      });
  };

  // Function to delete an author
  const deleteAuthor = (id) => {
    axios.delete(`https://65f99ab73909a9a65b18e80d.mockapi.io/Myproject/author/${id}`)
      .then(() => {
        const filteredAuthors = authors.filter(author => author.id !== id);
        setAuthors(filteredAuthors);
      })
      .catch(error => {
        console.error('Error deleting author: ', error);
      });
  };

  // Provide user data and functions to child components via context
  return (
    <DataContext.Provider value={{ books, authors, addAuthor, addBook, editAuthor, editBook, deleteAuthor, deleteBook }}>
      {children}
    </DataContext.Provider>
  );
};