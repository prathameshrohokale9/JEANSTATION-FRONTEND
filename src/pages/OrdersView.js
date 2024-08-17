import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve custId from localStorage
  const custId = localStorage.getItem('custId');

  useEffect(() => {
    if (!custId) {
      setError('Customer ID is required.');
      return;
    }

    // Fetch orders and items data
    axios.get(`https://localhost:7120/api/orders/customer/${custId}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        setError(`Error fetching orders: ${error.message}`);
      });

    axios.get('https://localhost:7120/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        setError(`Error fetching items: ${error.message}`);
      });
  }, [custId]);

  // Function to find item details by itemCode
  const getItemDetails = (itemCode) => {
    const item = items.find(i => i.itemCode === itemCode);
    return item ? item : { itemName: 'Unknown', itemImage: 'https://via.placeholder.com/100' };
  };

  return (
    <div className="container mt-5">
      <h1>Orders</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item Name</th>
            <th>Item Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Status</th>
            <th>Date</th>
            {/* <th>Amount</th> */}
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => {
              const itemDetails = getItemDetails(order.itemCode);
              return (
                <tr key={order.itemCode}>
                  <td>{order.orderId}</td>
                  <td>{itemDetails.itemName}</td>
                  <td>
                    <img src={itemDetails.itemImage} alt={itemDetails.itemName} style={{ width: '100px' }} />
                  </td>
                  <td>{order.price}</td>
                  <td>{order.qty}</td>
                  <td>{order.itemValue}</td>
                  <td>{order.orderStatus}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  {/* <td>{order.amount}</td> */}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" className="text-center">No Orders Found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-3">
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
