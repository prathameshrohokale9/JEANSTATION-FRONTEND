import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateOrder() {
    const { orderId, itemCode } = useParams();
    const [order, setOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7120/api/orders/${orderId}/${itemCode}`)
            .then((response) => {
                setOrder(response.data);
                setOrderStatus(response.data.orderStatus);
            })
            .catch((error) => {
                console.error(`Error fetching order: ${error}`);
                setAlert({ message: `Error: ${error.message}`, type: 'danger' });
            });
    }, [orderId, itemCode]);

    const updateHandler = () => {
        axios.put(`https://localhost:7120/api/orders/${orderId}/${itemCode}`, { orderStatus })
            .then(() => {
                setAlert({ message: 'Order status updated successfully', type: 'success' });
            })
            .catch((error) => {
                setAlert({ message: `Error: ${error.message}`, type: 'danger' });
            });
    };

    const navigateBack = () => {
        navigate('/view-orders');
    };

    return (
        <div className="container my-4">
            <h1>Update Order</h1>
            {alert.message && (
                <div className={`alert alert-${alert.type} mt-3`} role="alert">
                    {alert.message}
                </div>
            )}
            {order && (
                <div className="card p-4 mt-3">
                    <p><strong>Order ID:</strong> {order.orderId}</p>
                    <p><strong>Item Code:</strong> {order.itemCode}</p>
                    <p><strong>Customer ID:</strong> {order.custId}</p>
                    <p><strong>Status:</strong> {order.orderStatus}</p>
                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                    {/* <p><strong>Amount:</strong> {order.amount}</p> */}
                    <div className="form-group">
                        <label>Set Order Status</label>
                        <select
                            className="form-control"
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                    </div>
                    <button onClick={updateHandler} className="btn btn-primary mt-3">Update Status</button>
                    <button onClick={navigateBack} className="btn btn-secondary mt-3">Back to Orders</button>
                </div>
            )}
        </div>
    );
}
