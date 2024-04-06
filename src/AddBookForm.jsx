import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDataContext } from './DataContext';

const AddBookForm = ({ editBook, editingbook, setEditingbook, closePopup }) => {
  const { addBook } = useDataContext();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      isbn: '',
      publicationDate: '',
    },
    validate: values => {
      const errors = {};
      if (!values.title) {
        errors.title = 'Title is Required';
      }
      if (!values.author) {
        errors.author = 'Author is required';
      }
      if (!values.isbn) {
        errors.isbn = 'ISBN number is required';
      } else if (!/^\d+$/.test(values.isbn)) {
        errors.isbn = 'ISBN number must contain only numbers';
      }
      if (!values.publicationDate) {
        errors.publicationDate = 'Publication Date is required';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      if (editingbook) {
        editBook(editingbook.id, values);
        setEditingbook(null);
      } else {
        addBook(values);
      }
      closePopup();
      resetForm();
    },
  });

 

  useEffect(() => {
    if (editingbook) {
      formik.setValues(editingbook);
      
    }
  }, [editingbook]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-danger">{formik.errors.title}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          className="form-control"
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.author && formik.errors.author ? (
          <div className="text-danger">{formik.errors.author}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          className="form-control"
          value={formik.values.isbn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.isbn && formik.errors.isbn ? (
          <div className="text-danger">{formik.errors.isbn}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="publicationDate">Publication Date:</label>
        <input
          type="date"
          id="publicationDate"
          name="publicationDate"
          className="form-control"
          value={formik.values.publicationDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.publicationDate && formik.errors.publicationDate ? (
          <div className="text-danger">{formik.errors.publicationDate}</div>
        ) : null}
      </div>

      <button type="submit" className="btn btn-primary">
        {editingbook ? 'Edit Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default AddBookForm;
