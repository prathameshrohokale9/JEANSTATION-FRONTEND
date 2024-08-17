// ShowTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7120/api/ItemsOrders')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Items Orders</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Order ID</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.itemCode}</td>
              <td>{item.orderId}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTable;
