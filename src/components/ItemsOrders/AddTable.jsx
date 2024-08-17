import React, { useState } from 'react';
import axios from 'axios';

const AddTable = () => {
  const [itemOrder, setItemOrder] = useState({
    orderId: '',
    itemCode: '',
    qty: '',
    price: ''
  });
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemOrder({
      ...itemOrder,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7120/api/ItemsOrders', {
      orderId: parseInt(itemOrder.orderId),
      itemCode: itemOrder.itemCode,
      qty: parseInt(itemOrder.qty),
      price: parseFloat(itemOrder.price)
    })
      .then(response => {
        setAlert({ message: 'Data added successfully!', type: 'success' });
        // Optionally, clear the form or update the table here.
        setItemOrder({ orderId: '', itemCode: '', qty: '', price: '' });
      })
      .catch(error => {
        setAlert({ message: 'There was an error adding the item order!', type: 'danger' });
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Item Order</h2>
      {alert.message && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="orderId" className="form-label">Order ID</label>
          <input type="text" className="form-control" id="orderId" name="orderId" value={itemOrder.orderId} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="itemCode" className="form-label">Item Code</label>
          <input type="text" className="form-control" id="itemCode" name="itemCode" value={itemOrder.itemCode} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="qty" className="form-label">Quantity</label>
          <input type="number" className="form-control" id="qty" name="qty" value={itemOrder.qty} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" step="0.01" className="form-control" id="price" name="price" value={itemOrder.price} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Item Order</button>
      </form>
    </div>
  );
};

export default AddTable;
