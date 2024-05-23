import React, { useState } from 'react';
import './App.css';

function App() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState('');
  const [error, setError] = useState(null);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [imei, setImei] = useState('');
  const [button, setButton] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setUserData(null);
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('password', password);
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('email', email);
    formData.append('contact', contact);
    formData.append('imei', imei);
    formData.append('button', button);
    try {
      var response = '';
      if(button === 'register'){
        response = await fetch('http://172.16.2.147:8080/nextgen_v1/api/register', {
        method: 'POST',
        body: formData,
      });
      }else if(button === 'login'){
        response = await fetch('http://172.16.2.147:8080/nextgen_v1/api/login', {
        method: 'POST',
        body: formData,
      });
      }
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }
      const data = await response.json();
      if (data.status === 'SUCCESS') {
        setUserData(data.result);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(`An error occurred: ${error.message}`);
    }
  };
  return (

<div className="container">
      <header className="App-header">
        <h1>Register</h1>
        <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
            <label htmlFor="user_idd">User ID:</label>
            <input
              type="text"
              id="user_id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              id="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              id="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact No:</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imei">Imei:</label>
            <input
              type="text"
              id="imei"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              // required
            />
          </div>
          <button type="submit" htmlFor = "login" onClick={(e) => setButton('login')}>Login</button>
          <button type="submit" htmlFor = "register" onClick={(e) => setButton('register')}>Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {userData && (
          <div className="user-data">
            <h2>User Data</h2>
            <p><strong>User ID:</strong> {userData.user_id}</p>
            <p><strong>First Name:</strong> {userData.fname}</p>
            <p><strong>Last Name:</strong> {userData.lname}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Contact:</strong> {userData.contact}</p>
            <p><strong>IMEI:</strong> {userData.imei}</p>
          </div>
        )}
      </header>
    </div>

    // <div className="container">
    //   <header className="App-header">
    //     <h1>Login</h1>
    //     <form onSubmit={handleLogin} className="login-form">
    //       <div className="form-group">
    //         <label htmlFor="user_id">User ID:</label>
    //         <input
    //           type="text"
    //           id="user_id"
    //           value={userId}
    //           onChange={(e) => setUserId(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="password">Password:</label>
    //         <input
    //           type="password"
    //           id="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <button type="submit">Login</button>
    //     </form>
    //     {error && <p className="error-message">{error}</p>}
    //     {userData && (
    //       <div className="user-data">
    //         <h2>User Data</h2>
    //         <p><strong>User ID:</strong> {userData.user_id}</p>
    //         <p><strong>First Name:</strong> {userData.fname}</p>
    //         <p><strong>Last Name:</strong> {userData.lname}</p>
    //         <p><strong>Email:</strong> {userData.email}</p>
    //         <p><strong>Contact:</strong> {userData.contact}</p>
    //         <p><strong>IMEI:</strong> {userData.imei}</p>
    //       </div>
    //     )}
    //   </header>
    // </div>
  );
}
export default App