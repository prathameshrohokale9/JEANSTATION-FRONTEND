// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isEmployee');
    localStorage.removeItem('custId');
    localStorage.removeItem('storeId')
    setUser(null);
    navigate('/');
  };
 
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
<div className="container-fluid">
<Link className="navbar-brand" to="/">
<img src={require("../../images/Home/js_logo.jpg")} alt="js_logo" width="40" height="32" />
</Link>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon" />
</button>
<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
<ul className="navbar-nav">
<li className="nav-item">
<Link className="nav-link" to="/Store">Store</Link>
</li>
<li className="nav-item">
<Link className="nav-link" to="/cart-view">Cart</Link>
</li>
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {user ? user.custName || user.empName : 'Profile'}
</a>
<ul className="dropdown-menu dropdown-menu-end">
                {user ? (
<>
<li><Link className="dropdown-item" to="/OrdersView">Orders</Link></li>
<li><Link className="dropdown-item" to="/profileUpdate">Update Profile</Link></li>
<li><Link className="dropdown-item" to="/ContactUs">Contact Us</Link></li>
<li><hr className="dropdown-divider" /></li>
<li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
</>
                ) : (
<>
<li><pre style={{ fontWeight: "bold" }}>  Welcome</pre></li>
<li><pre>  To access account and manage orders</pre></li>
<li><Link className="dropdown-item btn btn-outline-primary" to="/Login">Login / Signup</Link></li>
</>
                )}
</ul>
</li>
</ul>
</div>
</div>
</nav>
  );
}
 
export default Navbar;