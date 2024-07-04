// Login.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.168.6.103:8000/api/account/login/', { username, password });
      const token = response.data.jwt;
      const user_id = response.data.account.MaTaiKhoan;
      localStorage.setItem('token', token);

      localStorage.setItem('currentUser', user_id);
      setIsLoggedIn(true); // Đã đăng nhập thành công
      const from = location.state?.from?.pathname || '/';
      navigate(from);

    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password'); // Hiển thị thông báo lỗi
    }
  };

  return (

<div className='form-container-login'>
  <div className='form-login'>
    <input className='username' type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
    <input className='password' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    <button className='button_login' onClick={handleLogin}>Login</button>
    {error && <p>{error}</p>}
  </div>
</div>

  );
};

export default Login;
