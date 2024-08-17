import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarGeneric from '../ItemsView/NavbarGeneric';
import CardGrid from '../ItemsView/CardGrid';
import { useParams } from 'react-router-dom';
//import './search.css';
 
export default function Searchbyname() {
  // const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  //const byname = localStorage.getItem('searchTerm')
  const {name }= useParams()
  useEffect(() => {
    if (name) {
      fetchItems();
    }
  }, [name]);
 
  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://localhost:7120/api/Items/itemName/${name}`)
        setItems(response.data);

    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
    }
    // localStorage.removeItem('searchTerm')
  };
const handleCart=()=>{
 
}

 
  return (
<>
<NavbarGeneric  />
<br />
      {items.length > 0 ? (
<div className="row">
                    {items.map((item) => (
<div className="col-md-4 mb-4" key={item.itemCode}>
<div className="card">
<img src={item.itemImage} className="card-img-top" alt={item.itemName} />
<div className="card-body">
<h5 className="card-title">{item.itemName}</h5>
<p className="card-text">Price: ${item.price}</p>
<p className="card-text">Quantity: {item.quantity}</p>
<p className="card-text">Store ID: {item.storeId}</p>
<button onClick={() => handleCart(item)} className="btn btn-warning mr-2">
                              Add to Cart
</button>

</div>
</div>
</div>
                    ))}
</div>
                ) : (
<p>No items to display</p>
                )
                } 
</>
  );
}