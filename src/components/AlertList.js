import React, { useEffect, useState } from 'react';
import EditAlertForm from './EditAlertForm';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const matk = localStorage.getItem('currentUser');
        const response = await axios.get('http://10.168.6.103:8000/api/nguongcanhbao/' + matk + '/');
        setAlerts(response.data.nguongcanhbao);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  const handleEditClick = (alert) => {
    setSelectedAlert(alert);
  };

  const handleDelete = async (alert) => {
    // Xác nhận trước khi xóa
    const confirmDelete = window.confirm('Are you sure you want to delete this alert?');
  
    if (confirmDelete) {
      try {
        await axios.delete(`http://10.168.6.103:8000/api/nguongcanhbao/delete/${alert.MaCanhBao}/`);
        // Xử lý thành công, có thể cập nhật lại danh sách alerts hoặc hiển thị thông báo thành công
        console.log('Alert deleted successfully:', alert.MaCanhBao);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting alert:', error);
      }
    } else {
      console.log('Delete canceled');
    }
  };

  return (
    <div>
      <h4>Danh sách ngưỡng cảnh báo</h4>
      <table>
        <thead>
          <tr>
            <th>Mã cảnh báo</th>
            <th>BotToken</th>
            <th>ChatID</th>
            <th>Mã chứng khoán</th>
            <th>Loại chỉ báo</th>
            <th>Gía trị ngưỡng</th>
            <th>Điều kiện theo dõi</th>
            <th>Mã tài khoản</th>
            <th>Hành động</th> {/* Thêm cột cho các hành động */}
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index}>
              <td>{alert.MaCanhBao}</td>
              <td>{alert.BotToken}</td>
              <td>{alert.ChatID}</td>
              <td>{alert.MaChungKhoan}</td>
              <td>{alert.LoaiChiBao}</td>
              <td>{alert.GiaTriNguong}</td>
              <td>{alert.DieuKienTheoDoi}</td>
              <td>{alert.MaTaiKhoan}</td>
              <td className='vu'>
                <button className="edit-btn" onClick={() => handleEditClick(alert)}>
                  <i className="fas fa-edit"></i> Sửa
                </button>
                <button className="delete-btn" onClick={() => handleDelete(alert)}>
                  <i className="fas fa-trash-alt"></i> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedAlert && <EditAlertForm alert={selectedAlert} onCancel={() => setSelectedAlert(null)} />}
    </div>
  );
};

export default AlertList;
