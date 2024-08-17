import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
export default function NavbarGeneric({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [minprice , setMinPrice]= useState('');
  const [maxprice , setMaxPrice] = useState('');
 
  const handleprice=()=>{
    localStorage.setItem('minprice', minprice);
    localStorage.setItem('maxprice', maxprice);
    navigate(`/searchbyprice/${minprice}/${maxprice}`)
  }
 
  

 
  const handleSearch = (e) => {
    localStorage.setItem('searchTerm',searchTerm)
    navigate(`/searchbyname/${searchTerm}`)
 
  };
 
  return (
<nav className="navbar bg-body-tertiary">
<div className="container-fluid">
<img src={require("../../images/Home/js_logo.jpg")} alt="js_logo" width="40" height="32" />
<div className="d-flex"  >
<input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
<button className="btn btn-outline-success" type="submit" onClick={handleSearch}>Search</button>
</div>
<div>
<label>Min Price
<input
            type="number"
            placeholder=""
            aria-label="Search"
            value={minprice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
</label>
<label>Max Price
<input
            type="number"
            placeholder=""
            aria-label="Search"
            value={maxprice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
</label>
<button className="btn btn-outline-success" type="submit" onClick={handleprice}>Submit</button>
</div>
</div>
</nav>
  );
}

