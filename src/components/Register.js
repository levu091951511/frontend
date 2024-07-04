// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Thay đổi từ 'email' sang 'fullName'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://10.168.6.103:8000/api/register/', {
        username,
        password,
        HoVaTen: fullName, // Thay 'email' thành 'HoVaTen'
      });

      const token = response.data.token; // Đảm bảo trường token trả về từ API
      const user_id = response.data.MaTaiKhoan; // Đảm bảo trường MaTaiKhoan trả về từ API
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', user_id);
      setIsLoggedIn(true); // Đã đăng ký và đăng nhập thành công
      navigate('/');

    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed, please try again'); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className='form-container-register'>
      <div className='form-register'>
        <input className='username' type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className='fullName' type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} /> {/* Thay đổi 'email' thành 'fullName' */}
        <input className='password' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input className='confirm-password' type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <button className='button_register' onClick={handleRegister}>Register</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
