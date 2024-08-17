import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarGeneric from '../components/Admins/NavbarGeneric';
import CardGrid from '../components/Admins/CardGrid';
import "./itemsView.css";

export default function ItemsView() {
  const [itemcards, setItemcards] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState(null);
  const storeId = localStorage.getItem('storeId');
  let custId = localStorage.getItem('custId');
  console.log('custId:', custId);
  console.log('storeId:', storeId);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://localhost:7120/api/Items/store/${storeId}`);
      const items = response.data.map(item => ({
        img: item.itemImage,
        title: item.itemName,
        text: `Price: ${item.price} - Store ID: ${item.storeId}`,
        // text: `Price: ${item.price} - Quantity: ${item.quantity} - Store ID: ${item.storeId}`,
        price: item.price,
        custId: custId,
        itemCode: item.itemCode
      }));
      setItemcards(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddToCart = async (title, img, price, custId, itemCode) => {
    const quantity = 1; // Hardcoded for now; you might want to add a quantity selector

    try {
      const response = await axios.post('https://localhost:7120/api/carts', {
        custId,
        itemCode,
        qty: quantity,
        price
      });

      if (response.status === 200 || response.status === 201) {
        setAlertMessage(`Item added successfully: ${title} (Quantity: ${quantity})`);
        setAlertVariant('alert-success');
      } else {
        setAlertMessage(`Unexpected response: ${response.status}`);
        setAlertVariant('alert-success');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          try {
            const putResponse = await axios.put(`https://localhost:7120/api/carts/${custId}/${itemCode}`, {
              qty: quantity
            });

            if (putResponse.status === 200 || putResponse.status === 201) {
              setAlertMessage(`Cart updated with item: ${title} (Quantity: ${quantity})`);
              setAlertVariant('alert-success');
            } else {
              setAlertMessage(`Error updating cart: ${putResponse.data.message || 'Item already in cart'}`);
              setAlertVariant('alert-warning');
            }
          } catch (putError) {
            setAlertMessage(`Error updating cart: ${putError.message}`);
            setAlertVariant('alert-danger');
          }
        } else {
          setAlertMessage(`Item already added to cart`);
          setAlertVariant('alert-warning');
        }
      } else {
        setAlertMessage(`Error adding item to cart: ${error.message}`);
        setAlertVariant('alert-danger');
      }
    }
  };

  return (
    <>
      <NavbarGeneric />
      <br />
      {alertMessage && (
        <div className={`alert ${alertVariant} alert-dismissible fade show`} role="alert">
          {alertMessage}
          <button type="button" className="btn-close" onClick={() => setAlertMessage(null)}></button>
        </div>
      )}
      <CardGrid cards={itemcards} onAddToCart={handleAddToCart} />
    </>
  );
}
