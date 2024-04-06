import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDataContext } from './DataContext';

const AddAuthorForm = ({ editAuthor, editingauthor, setEditingauthor, closePopup }) => {
  const { addAuthor } = useDataContext();

  const formik = useFormik({
    initialValues: {
      name: '',
      dob: '',
      bio: '',
    },
    validate: values => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Name is Required';
      }
      if (!values.dob) {
        errors.dob = 'Date of birth is required';
      }
      if (!values.bio) {
        errors.bio = 'Biography is required';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      if (editingauthor) {
        editAuthor(editingauthor.id, values);
        setEditingauthor(null);
      } else {
        addAuthor(values);
      }
      closePopup();
      resetForm();
    },
  });

  useEffect(() => {
    if (editingauthor) {
      formik.setValues(editingauthor);
    }
  }, [editingauthor]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-danger">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          className="form-control"
          value={formik.values.dob}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.dob && formik.errors.dob ? (
          <div className="text-danger">{formik.errors.dob}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="bio">Biography:</label>
        <textarea
          id="bio"
          name="bio"
          className="form-control"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.bio && formik.errors.bio ? (
          <div className="text-danger">{formik.errors.bio}</div>
        ) : null}
      </div>

      <button type="submit" className="btn btn-primary">
        {editingauthor ? 'Edit Author' : 'Add Author'}
      </button>
    </form>
  );
};

export default AddAuthorForm;
