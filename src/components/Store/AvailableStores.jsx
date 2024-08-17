import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from "axios";

const AvailableStores = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("https://localhost:7120/api/Stores");
        console.log("API Response:", response.data); // Debugging line
        const uniqueStores = response.data.reduce((acc, store) => {
          if (!acc.some((s) => s.storeName === store.storeName)) {
            acc.push(store);
          }
          return acc;
        }, []);
        setStores(uniqueStores);
        console.log("Unique Stores:", uniqueStores); // Debugging line
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  const handleStoreClick = (storeId) => {
    // Use navigate to redirect and pass storeId in the state
    navigate('/Store/ItemsView', { state: { storeId } });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {stores.map((store) => (
          <div key={store.storeId} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleStoreClick(store.storeId)}>
              <img
                src={require("../../images/Stores/fashion-clothes-store.jpg")}
                className="card-img-top"
                alt={`${store.storeName} Image`}
              />
              <div className="card-body">
                <h5 className="card-title">{store.storeName}</h5>
                <p className="card-text">Location: {store.location}</p>
                <p className="card-text">Phone: {store.phoneNo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableStores;
