// src/pages/Admins.js

import React from 'react';

import { useNavigate } from 'react-router-dom';
 
function Admins() {

  const navigate = useNavigate();
 
  const handleLogout = () => {

    localStorage.removeItem('user');

    localStorage.removeItem('isEmployee');

    navigate('/');

  };
 
  return (

    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <a className="navbar-brand" href="#">Admin Page</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">

          <span className="navbar-toggler-icon"></span>

        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ml-auto">

            <li className="nav-item">

              <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>

            </li>

          </ul>

        </div>

      </nav>
 
      <div className="container mt-5">

        <div className="row">

          <div className="col-md-4">

            <div className="card" onClick={() => navigate('/Items')}>

              <div className="card-body">

                <h5 className="card-title">Items</h5>

                <p className="card-text">Manage Items</p>

              </div>

            </div>

          </div>

          {/* <div className="col-md-4">

            <div className="card" onClick={() => navigate('/StoreEdit')}>

              <div className="card-body">

                <h5 className="card-title">Store</h5>

                <p className="card-text">Manage Store</p>

              </div>

            </div>

          </div> */}

          <div className="col-md-4">

            <div className="card" onClick={() => navigate('/AdminsItemsView')}>

              <div className="card-body">

                <h5 className="card-title">Item</h5>

                <p className="card-text">View Items</p>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card" onClick={() => navigate('/Orders')}>

              <div className="card-body">

                <h5 className="card-title">Orders</h5>

                <p className="card-text">Manage Orders</p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}
 
export default Admins;

 