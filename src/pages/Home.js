import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { fadeIn } from './effect/variants';
import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showHoVaTen, setShowHoVaTen] = useState(true);

  const navigate = useNavigate();

  const matk = localStorage.getItem('currentUser');

  useEffect(() => {
    if (isLoggedIn && matk) {
      axios.get(`http://10.168.6.103:8000/api/acount/${matk}`)
        .then(response => {
          setAccountInfo(response.data);
          setUsername(response.data.username);
          setFullName(response.data.HoVaTen);
        })
        .catch(error => console.error(error));
    }
  }, [isLoggedIn, matk]);

  const handleLoginRedirect = () => {
    // Chuyển hướng đến trang đăng nhập
    window.location.href = '/login';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleRegisterRedirect = () => {
    // Chuyển hướng đến trang đăng ký
    window.location.href = '/register';
  };

  const handleEdit = () => {
    setShowEditForm(true);
    setShowDropdown(false);
    setShowHoVaTen(false);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setIsEditing(false);
    setPassword('');
    setShowHoVaTen(true);
  };

  const handleSaveEdit = () => {
    axios.put(`http://10.168.6.103:8000/api/acount/${matk}`, {
      username,
      HoVaTen: fullName,
      ...(password && { password }) // Chỉ gửi password nếu nó không rỗng
    })
    .then(response => {
      setAccountInfo(response.data);
      setShowEditForm(false);
      setIsEditing(false);
      setPassword('');
    })
    .catch(error => console.error(error));
  };

  return (
    <div id='home' className='home-container'>
      <div className='button-container'>
        {isLoggedIn ? (
          <>
            <div className='dropdown'>
              {showHoVaTen && <p className="hovaten" onClick={() => setShowDropdown(!showDropdown)} >{accountInfo.HoVaTen}</p>}
              {showDropdown && (
                <div>
                  <button className='edit_user_button' onClick={handleEdit}>Cập nhật hồ sơ</button>
                  <p className='logout_bt' onClick={handleLogout}> Đăng xuất </p>
                </div>
              )}
            </div>

            {showEditForm && (
              <div className='edit-form'>
                <label>
                  Tên đăng nhập:
                  <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!isEditing}
                  />
                </label>
                <label>
                  Mật khẩu:
                  <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditing}
                  />
                </label>
                <label>
                  Họ và Tên:
                  <input
                    type='text'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={!isEditing}
                  />
                </label>
                <div>
                  {!isEditing && (
                    <button className='btn_capnhathoso' onClick={() => setIsEditing(true)}>
                      Sửa
                    </button>
                  )}
                  {isEditing && (
                    <>
                      <button className='btn_capnhathoso_luu' onClick={handleSaveEdit}>
                        Lưu
                      </button>
                    </>
                  )}
                  <button className='btn_capnhathoso_cancel' onClick={() => { setIsEditing(false); handleCancelEdit(); }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              onClick={handleLoginRedirect}
              className='login-button'
            >
              Đăng Nhập
            </button>
            <button
              onClick={handleRegisterRedirect}
              className='register-button'
            >
              Đăng Ký
            </button>
          </>
        )}
      </div>
      <div className='gradientBg rounded-xl rounded-br-[80px] shadow-xl home-content'>
        <div className='flex flex-col md:flex-row-reverse justify-center items-center gap-5'>
          <motion.div
            variants={fadeIn('down', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
          >
            {/* <img src={banner} alt='' className='lg:h-[500px] p-5'/> */}
          </motion.div>
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className='md:w-[60%] p-5 text-center'
          >
            <h2 className='chungkhoan'>
              Chứng khoán
            </h2>
            <p className='header-title'>
              Chào mừng đến với trang web chứng khoán !!!
            </p>
            {isLoggedIn && (
              <div className='home-button'>
                <Link to='/dashboard'>
                  <button className='das'>
                    Xem Dashboard
                  </button>
                </Link>
                <Link to='/alert'>
                  <button className='das'>
                    Xem Ngưỡng Cảnh Báo
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
