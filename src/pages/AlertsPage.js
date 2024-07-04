// AlertsPage.js
import React, { useState } from 'react';
import AlertList from '../components/AlertList';
import AddAlertForm from '../components/AddAlertForm';
import EditAlertForm from '../components/EditAlertForm';

const AlertsPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleAdd = (formData) => {
    // Gửi yêu cầu thêm mới đến API backend với dữ liệu từ form
    console.log('Form data:', formData);
    // Sau khi gửi thành công, bạn có thể ẩn form thêm ngưỡng cảnh báo bằng cách gọi toggleAddForm()
    toggleAddForm();
  };

  return (
    <div className='alert-pages'>
      <div className="navbar">
        <h2>ĐẶT NGƯƠNG CẢNH BÁO</h2>
      </div>
      <button className='add-button' onClick={toggleAddForm}>Thêm Ngưỡng Cảnh Báo</button>
      {showAddForm && (
        <div className="overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="form-container" style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          }}>
            <AddAlertForm onAdd={handleAdd} />
          </div>
        </div>
      )}
      <AlertList />
    </div>
  );
};

export default AlertsPage;
