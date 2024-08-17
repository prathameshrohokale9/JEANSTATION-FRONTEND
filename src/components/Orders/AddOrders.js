import axios from "axios";
import { useState } from "react";

export default function AddOrder() {
    const [orderId, setOrderId] = useState('');
    const [custId, setCustId] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [amount, setAmount] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [qty, setQty] = useState('');
    const [price, setPrice] = useState('');

    const newOrder = {
        orderId,
        custId: parseInt(custId, 10),
        orderStatus,
        amount: parseFloat(amount),
        itemCode: itemCode.trim(),
        qty: parseInt(qty, 10),
        price: parseFloat(price)
    };

    const saveHandler = () => {
        axios.post(`https://localhost:7120/api/orders`, newOrder)
            .then((success) => { 
                alert('Order saved successfully: ' + JSON.stringify(success.data)); 
            })
            .catch((error) => { 
                alert('Error saving order: ' + JSON.stringify(error.response.data)); 
                console.error('Error details:', error.response.data);
            });

        setOrderId('');
        setCustId('');
        setOrderStatus('');
        setAmount('');
        setItemCode('');
        setQty('');
        setPrice('');
    };

    return (
        <div className="container my-4 p-4 border rounded" style={{ maxWidth: '600px', backgroundColor: 'yellow' }}>
            <h4>Provide Order Details</h4>
            <form>
                <div className="form-group">
                    <label>Order Id</label>
                    <input type="text" className="form-control" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Customer Id</label>
                    <input type="text" className="form-control" value={custId} onChange={(e) => setCustId(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Order Status</label>
                    <input type="text" className="form-control" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input type="text" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Item Code</label>
                    <input type="text" className="form-control" value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input type="text" className="form-control" value={qty} onChange={(e) => setQty(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <button type="button" onClick={saveHandler} className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}
