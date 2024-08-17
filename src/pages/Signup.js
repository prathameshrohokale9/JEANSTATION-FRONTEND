import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
 
function Signup() {
  const navigate = useNavigate();
 
  const initialValues = {
    custName: '',
    address: '',
    phoneNo: '',
    email: '',
    userName: '',
    pwd: '',
  };
 
  const validationSchema = Yup.object({
    custName: Yup.string().required('Full Name is required'),
    address: Yup.string().required('Address is required'),
    phoneNo: Yup.string().required('Phone Number is required').matches(/^[0-9]+$/, 'Phone Number must be a number'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    userName: Yup.string().required('Username is required'),
    pwd: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });
 
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('https://localhost:7120/api/Customers', values);
      if (response.status === 201) {
        alert('Account created successfully! Please log in.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
 
  return (
<div className="container mt-5">
<h2>Sign Up</h2>
<Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
>
        {({ isSubmitting }) => (
<Form>
<div className="mb-3">
<label htmlFor="custName" className="form-label">Full Name</label>
<Field type="text" className="form-control" id="custName" name="custName" />
<ErrorMessage name="custName" component="div" className="text-danger" />
</div>
<div className="mb-3">
<label htmlFor="address" className="form-label">Address</label>
<Field type="text" className="form-control" id="address" name="address" />
<ErrorMessage name="address" component="div" className="text-danger" />
</div>
<div className="mb-3">
<label htmlFor="phoneNo" className="form-label">Phone Number</label>
<Field type="tel" className="form-control" id="phoneNo" name="phoneNo" />
<ErrorMessage name="phoneNo" component="div" className="text-danger" />
</div>
<div className="mb-3">
<label htmlFor="email" className="form-label">Email</label>
<Field type="email" className="form-control" id="email" name="email" />
<ErrorMessage name="email" component="div" className="text-danger" />
</div>
<div className="mb-3">
<label htmlFor="userName" className="form-label">Username</label>
<Field type="text" className="form-control" id="userName" name="userName" />
<ErrorMessage name="userName" component="div" className="text-danger" />
</div>
<div className="mb-3">
<label htmlFor="pwd" className="form-label">Password</label>
<Field type="password" className="form-control" id="pwd" name="pwd" />
<ErrorMessage name="pwd" component="div" className="text-danger" />
</div>
<button type="submit" className="btn btn-primary" disabled={isSubmitting}>Sign Up</button>
</Form>
        )}
</Formik>
<p className="mt-3">
        Already have an account? <Link to="/login">Log in</Link>
</p>
</div>
  );
}
 
export default Signup;