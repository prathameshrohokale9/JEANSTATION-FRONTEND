import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
export default function ProfileUpdate() {
  const custId = localStorage.getItem('custId');
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  useEffect(() => {
    axios.get(`
https://localhost:7120/api/customers/${custId}`)
      .then(response => {
        // alert(response.data.custName)
        setInitialValues({
          custName: response.data.custName,
          address: response.data.address,
          phoneNo: response.data.phoneNo,
          email: response.data.email,
          userName: response.data.userName,
          pwd: response.data.pwd
        });
      })
      .catch(error => alert('Some error occurred while fetching customer details'));
  }, [custId]);
  const validationSchema = Yup.object({
    custName: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    phoneNo: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Phone number must be a number'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    userName: Yup.string().required('Username is required'),
    pwd: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    const updated = {
      custName: values.custName,
      address: values.address,
      phoneNo: values.phoneNo,
      email: values.email,
      userName: values.userName,
      pwd: values.pwd
    };
    axios.put(`
https://localhost:7120/api/customers/${custId}`
, updated, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(success => {
        alert('Details updated successfully. Login again!');
        navigate('/');
      })
      .catch(error => alert(`Could not update details for ${custId}`))
      .finally(() => setSubmitting(false));
  };
  if (!initialValues) {
    return <div>Loading...</div>; // Render a loading state while fetching data
  }
  return (
<div className="container mt-5">
<div className="row">
<div className="col-md-6 offset-md-3">
<h2>Update Profile</h2>
<Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
>
            {({ isSubmitting }) => (
<Form>
<div className="form-group">
<label htmlFor="custName">Name:</label>
<Field
                    type="text"
                    className="form-control"
                    id="custName"
                    name="custName"
                    placeholder="Enter name"
                  />
<ErrorMessage name="custName" component="div" className="text-danger" />
</div>
<div className="form-group">
<label htmlFor="address">Address:</label>
<Field
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Enter address"
                  />
<ErrorMessage name="address" component="div" className="text-danger" />
</div>
<div className="form-group">
<label htmlFor="phoneNo">Phone Number:</label>
<Field
                    type="text"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    placeholder="Enter phone number"
                  />
<ErrorMessage name="phoneNo" component="div" className="text-danger" />
</div>
<div className="form-group">
<label htmlFor="email">Email:</label>
<Field
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                  />
<ErrorMessage name="email" component="div" className="text-danger" />
</div>
<div className="form-group">
<label htmlFor="userName">Username:</label>
<Field
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    placeholder="Enter username"
                  />
<ErrorMessage name="userName" component="div" className="text-danger" />
</div>
<div className="form-group">
<label htmlFor="pwd">Password:</label>
<Field
                    type="password"
                    className="form-control"
                    id="pwd"
                    name="pwd"
                    placeholder="Enter password"
                  />
<ErrorMessage name="pwd" component="div" className="text-danger" />
</div>
<button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
>
                  Update Details
</button>
</Form>
            )}
</Formik>
</div>
</div>
</div>
  );
}