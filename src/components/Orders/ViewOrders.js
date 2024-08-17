import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const storeId = localStorage.getItem("storeId");

  const editHandler = (orderId, itemCode) => {
    navigate(`/update-orders/${orderId}/${itemCode}`);
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7120/api/Orders/storeId/${storeId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }, []);

  return (
    <div className="container my-4">
      <h1> Orders </h1>{" "}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th> Order ID </th> <th> Item Code </th> <th> Customer ID </th>{" "}
            <th> Status </th> <th> Order Date </th> 
            <th> Amount </th>{" "}
            <th> Quantity </th> <th> Price </th> <th> Value </th>{" "}
            <th> Update Order </th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          {orders.map((order) => (
            <tr key={`${order.orderId},${order.itemCode}`}>
              <td> {order.orderId} </td> <td> {order.itemCode} </td>{" "}
              <td> {order.custId} </td> <td> {order.orderStatus} </td>{" "}
              <td> {new Date(order.orderDate).toLocaleString()} </td>{" "}
              <td> {order.amount} </td> <td> {order.qty} </td>{" "}
              <td> {order.price} </td> <td> {order.itemValue} </td>{" "}
              <td>
                <button
                  onClick={() => editHandler(order.orderId, order.itemCode)}
                  className="btn btn-warning"
                >
                  Edit{" "}
                </button>{" "}
              </td>{" "}
            </tr>
          ))}{" "}
        </tbody>{" "}
      </table>{" "}
    </div>
  );
}
