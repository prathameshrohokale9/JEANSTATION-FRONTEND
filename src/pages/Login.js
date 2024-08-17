// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmployee, setIsEmployee] = useState(false);
  // const[isloggedin,setisloggedin] = useState(false)
  const navigate = useNavigate();
  const logincred = {
    'username':username,
    'pwd':password
}
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isEmployee ? '/api/Employees' : '/api/Customers';
      axios.post(`
https://localhost:7120${endpoint}/login`,logincred).then((response)=>{
        alert('Login Success');
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('isEmployee', isEmployee);
        {isEmployee?localStorage.setItem('storeId',response.data.storeId):localStorage.setItem('custId',response.data.custId)}
        // localStorage.setItem('custId',response.data.custId)
        // localStorage.setItem('storeId',response.data.storeId)
        // setisloggedin(true)
        // localStorage.setItem('isloggedin',isloggedin)
        // alert(`${response.data.custId}`)
        navigate(isEmployee ? '/Admins' : `/`);
      }).catch(error=>alert('Invalid credentials'))
      setPassword('');
      setUsername('');
      // const response = await axios.get(`
//localhost:7120${endpoint}`);
      // const users = response.data;
      // const user = users.find(u => 
      //   (isEmployee ? u.empUserName : u.userName) === username && 
      //   (isEmployee ? u.empPwd : u.pwd) === password
      // );
      // if (user) {
      //   localStorage.setItem('user', JSON.stringify(user));
      //   localStorage.setItem('isEmployee', isEmployee);
      //   navigate(isEmployee ? '/Admins' : '/');
      // } else {
      //   alert('Invalid credentials');
      // }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };
  return (
<div className="container mt-5">
<h2>Login</h2>
<form onSubmit={handleLogin}>
<div className="mb-3">
<label htmlFor="username" className="form-label">Username</label>
<input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
</div>
<div className="mb-3">
<label htmlFor="password" className="form-label">Password</label>
<input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
</div>
<div className="mb-3 form-check">
<input
            type="checkbox"
            className="form-check-input"
            id="isEmployee"
            checked={isEmployee}
            onChange={(e) => setIsEmployee(e.target.checked)}
          />
<label className="form-check-label" htmlFor="isEmployee">I'm an employee</label>
</div>
<button type="submit" className="btn btn-primary">Login</button>
</form>
<p className="mt-3">
        Don't have an account? <a href="/signup">Sign up</a>
</p>
</div>
  );
}
export default Login;