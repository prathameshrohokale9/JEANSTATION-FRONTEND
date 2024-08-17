import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewOrdersByOrderId() {
    const { orderId } = useParams();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`https://localhost:7120/api/orders/${orderId}`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                setError(`Error fetching orders: ${error.message}`);
                console.error(error);
            });
    }, [orderId]);

    return (
        <div className="container my-4">
            <h1>Orders for Order ID: {orderId}</h1>
            {error && <p>{error}</p>}
            {orders.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Item Code</th>
                            <th>Customer ID</th>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={`${order.orderId}-${order.itemCode}`}>
                                <td>{order.orderId}</td>
                                <td>{order.itemCode}</td>
                                <td>{order.custId}</td>
                                <td>{order.orderStatus}</td>
                                <td>{new Date(order.orderDate).toLocaleString()}</td>
                                <td>{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
            <button onClick={() => window.history.back()} className="btn btn-secondary">Back</button>
        </div>
    );
}
