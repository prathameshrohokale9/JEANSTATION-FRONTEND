import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ItemManager = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const storeId = localStorage.getItem('storeId');

  useEffect(() => {
    fetchItems();
  }, [storeId]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://localhost:7120/api/Items/store/${storeId}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (editing) {
        await axios.put(`https://localhost:7120/api/Items/${editItemId}`, values);
      } else {
        const newItem = { ...values, itemCode: generateItemCode() };
        await axios.post('https://localhost:7120/api/Items', newItem);
      }
      fetchItems();
      resetForm();
      setEditing(false);
      setEditItemId(null);
    } catch (error) {
      console.error('Error submitting item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditing(true);
    setEditItemId(item.itemCode);
  };

  const handleDelete = async (itemCode) => {
    try {
      await axios.delete(`https://localhost:7120/api/Items/${itemCode}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const generateItemCode = () => {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
  };

  const validationSchema = Yup.object({
    itemName: Yup.string().required('Item Name is required'),
    price: Yup.number().min(0, 'Price must be positive').required('Price is required'),
    quantity: Yup.number().min(0, 'Quantity must be positive').required('Quantity is required'),
    itemImage: Yup.string().required('Item Image URL is required'),
  });

  const initialValues = {
    itemCode: '',
    itemName: '',
    price: '',
    quantity: '',
    storeId: storeId,
    itemImage: '',
  };

  return (
    <div className="container mt-5">
      <h1>Item Manager</h1>

      <Formik
        enableReinitialize={true}
        initialValues={editing ? items.find(item => item.itemCode === editItemId) || initialValues : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form className="mb-5">
            <div className="form-group">
              <label>Item Name</label>
              <Field type="text" name="itemName" className="form-control" />
              <ErrorMessage name="itemName" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label>Price</label>
              <Field type="number" name="price" className="form-control" />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <Field type="number" name="quantity" className="form-control" />
              <ErrorMessage name="quantity" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label>Store ID</label>
              <Field type="number" name="storeId" className="form-control" disabled />
            </div>

            <div className="form-group">
              <label>Item Image URL</label>
              <Field type="text" name="itemImage" className="form-control" />
              <ErrorMessage name="itemImage" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary">
              {editing ? 'Update' : 'Add'} Item
            </button>
          </Form>
        )}
      </Formik>

      <div className="row mt-5">
        {items.map((item) => (
          <div className="col-md-4 mb-4" key={item.itemCode}>
            <div className="card">
              <img src={item.itemImage} className="card-img-top" alt={item.itemName} />
              <div className="card-body">
                <h5 className="card-title">{item.itemName}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <p className="card-text">Quantity: {item.quantity}</p>
                <p className="card-text">Store ID: {item.storeId}</p>
                <button onClick={() => handleEdit(item)} className="btn btn-warning mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.itemCode)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemManager;
