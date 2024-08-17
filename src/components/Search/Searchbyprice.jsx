import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarGeneric from '../ItemsView/NavbarGeneric';
import CardGrid from '../ItemsView/CardGrid';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
 
export default function Searchbyname() {
  const [items, setItems] = useState([]);
  // const [searchParams] = useSearchParams(); 
  // const minprice = searchParams.get('minprice');
  // const maxprice = searchParams.get('maxprice'); 
let {minprice}= useParams();
let {maxprice}=useParams();
 
  const searchTerm = localStorage.getItem('searchTerm'); 
  // const minprice = localStorage.getItem('minprice'); 
  // const maxprice = localStorage.getItem('maxprice');
 
  useEffect(() => {
    // localStorage.removeItem('minprice');
    // localStorage.removeItem('maxprice');
    if (minprice !== null && maxprice !== null) {
      fetchItems();
      // localStorage.removeItem('minprice');
      // localStorage.removeItem('maxprice');
    }
  }, [minprice, maxprice]);
 
  const fetchItems = async () => {
    try {
      const response = await axios.post('https://localhost:7120/api/Items/priceRange', {
      minprice: minprice,
      maxprice: maxprice
    });
      setItems(response.data);
 
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
    }
  };
 
  const handleCart = (item) => {
    console.log('Added to cart:', item);
  };
 
  return (
<>
<NavbarGeneric />
<br />
      {items.length > 0 ? (
<div className="row">
          {items.map((item) => (
<div className="col-md-4 mb-4" key={item.itemCode}>
<div className="card">
<img src={item.itemImage} className="card-img-top" alt={item.itemName} />
<div className="card-body">
<h5 className="card-title">{item.itemName}</h5>
<p className="card-text">Price: {item.price}</p>
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
      )}
</>
  );
}