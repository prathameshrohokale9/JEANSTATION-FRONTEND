import React, { useEffect, useState } from 'react';

import axios from 'axios';

const StoreEdit = () => {

  const [stores, setStores] = useState([]);

  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({

    storeId: 0,

    storeName: '',

    location: '',

    phoneNo: ''

  });

  useEffect(() => {

    fetchStores();

  }, []);

  const fetchStores = async () => {

    try {

      const response = await axios.get('https://localhost:7120/api/Stores');

      setStores(response.data);

      // localStorage.setItem('storeId',response.data.storeId)

      // alert(response.data.storeId)

    } catch (error) {

      console.error('Error fetching stores', error);

    }

  };

  const handleShow = (store) => {

    setFormData(store || { storeId: 0, storeName: '', location: '', phoneNo: '' });

    setShow(true);

  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.storeId) {

      await axios.put(`https://localhost:7120/api/Stores/${formData.storeId}`, formData);

    } else {

      await axios.post('https://localhost:7120/api/Stores', formData);

    }

    fetchStores();

    handleClose();

  };

  const handleDelete = async (storeId) => {

    await axios.delete(`https://localhost:7120/api/Stores/${storeId}`);

    fetchStores();

  };

  return (

<div className="container mt-4">

<h2>Store Management</h2>

<button className="btn btn-primary" onClick={() => handleShow()}>Add Store</button>

<table className="table table-striped table-bordered mt-4">

<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Location</th>

<th>Phone No</th>

<th>Actions</th>

</tr>

</thead>

<tbody>

          {stores.map((store) => (

<tr key={store.storeId}>

<td>{store.storeId}</td>

<td>{store.storeName}</td>

<td>{store.location}</td>

<td>{store.phoneNo}</td>

<td>

<button className="btn btn-warning" onClick={() => handleShow(store)}>Edit</button>{' '}

<button className="btn btn-danger" onClick={() => handleDelete(store.storeId)}>Delete</button>

</td>

</tr>

          ))}

</tbody>

</table>

      {show && (

<div className="modal show d-block" tabIndex="-1">

<div className="modal-dialog">

<div className="modal-content">

<div className="modal-header">

<h5 className="modal-title">{formData.storeId ? 'Edit Store' : 'Add Store'}</h5>

<button type="button" className="btn-close" onClick={handleClose}></button>

</div>

<div className="modal-body">

<form onSubmit={handleSubmit}>

<div className="mb-3">

<label htmlFor="storeName" className="form-label">Store Name</label>

<input

                      type="text"

                      className="form-control"

                      id="storeName"

                      name="storeName"

                      value={formData.storeName}

                      onChange={handleChange}

                    />

</div>

<div className="mb-3">

<label htmlFor="location" className="form-label">Location</label>

<input

                      type="text"

                      className="form-control"

                      id="location"

                      name="location"

                      value={formData.location}

                      onChange={handleChange}

                    />

</div>

<div className="mb-3">

<label htmlFor="phoneNo" className="form-label">Phone No</label>

<input

                      type="text"

                      className="form-control"

                      id="phoneNo"

                      name="phoneNo"

                      value={formData.phoneNo}

                      onChange={handleChange}

                    />

</div>

<button type="submit" className="btn btn-primary">

                    {formData.storeId ? 'Update' : 'Add'}

</button>

</form>

</div>

</div>

</div>

</div>

      )}

</div>

  );

};

export default StoreEdit;
 