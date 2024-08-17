// src/contexts/CustomerContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [itemsResponse, storesResponse] = await Promise.all([
          axios.get('https://localhost:7120/api/Items'),
          axios.get('https://localhost:7120/api/Stores'),
        ]);
        setItems(itemsResponse.data);
        setStores(storesResponse.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  const loginCustomer = (customerData) => {
    setCustomer(customerData);
  };

  const logoutCustomer = () => {
    setCustomer(null);
    setOrders([]);
  };

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  const contextValue = {
    customer,
    loginCustomer,
    logoutCustomer,
    orders,
    addOrder,
    items,
    stores,
  };

  return (
    <CustomerContext.Provider value={contextValue}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerProvider, CustomerContext };