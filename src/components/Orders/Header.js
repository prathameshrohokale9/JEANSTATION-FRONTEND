import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
export default function Header() {
    const [searchOrderId, setSearchOrderId] = useState('');
    const navigate = useNavigate();
 
    const handleSearch = () => {
        if (searchOrderId) {
            navigate(`/view-orders/${searchOrderId}`);
        }
    };
 
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
<div className="container-fluid">
<Link className="navbar-brand" to="/">Orders</Link>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>
                {/* <div className="collapse navbar-collapse" id="navbarNav">
<ul className="navbar-nav me-auto mb-2 mb-lg-0">
<li className="nav-item">
<Link className="nav-link" to="/add-orders">Add Orders</Link>
</li>
<li className="nav-item">
<Link className="nav-link" to="/view-orders">View Orders</Link>
</li>
</ul> */}
<form className="d-flex" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
<input
                            className="form-control me-2"
                            type="search"
                            placeholder="Enter Order ID"
                            aria-label="Search"
                            value={searchOrderId}
                            onChange={(e) => setSearchOrderId(e.target.value)}
                        />
<button className="btn btn-outline-success" type="submit">Search</button>
</form>
                {/* </div> */}
</div>
</nav>
    );
}