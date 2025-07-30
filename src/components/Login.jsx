import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Giriş başarılı! Email: ${formData.email}`);
    // Here you would typically make an API call to authenticate the user
  };

  return (
    <div className="login-box">
      <div className="avatar"></div>
      <div className="tabs">
        <span className="active">Login</span>
        <Link to="/signup" className="tab-link">
          <span>Sign Up</span>
        </Link>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
        <a href="#" className="forgot">Forget your password?</a>
      </form>
    </div>
  );
};

export default Login;