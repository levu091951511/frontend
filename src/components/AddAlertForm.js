import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddAlertForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    MaCanhBao: '',
    BotToken: '',
    ChatID: '',
    MaChungKhoan: '',
    LoaiChiBao: '',
    GiaTriNguong: '',
    DieuKienTheoDoi: '',
    MaTaiKhoan: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lấy thông tin về user đang đăng nhập
      const currentUser = localStorage.getItem('currentUser'); // Giả sử thông tin user đã được lưu trong localStorage
      // const currentUser = '1'

      // Gửi yêu cầu thêm mới đến API backend
      await axios.post('http://10.168.6.103:8000/api/nguongcanhbao/create/', {
        ...formData,
        MaTaiKhoan: currentUser // Sử dụng thông tin user đang đăng nhập làm MaTaiKhoan
      });

      // Gọi hàm onAdd để thông báo thành công và cập nhật danh sách cảnh báo
      onAdd(formData);
      window.location.reload();


      // Reset form sau khi thêm thành công
      setFormData({
        BotToken: '',
        ChatID: '',
        MaChungKhoan: '',
        LoaiChiBao: '',
        GiaTriNguong: '',
        DieuKienTheoDoi: ''

      });
    } catch (error) {
      console.error('Error adding alert:', error);
    }
  };

  const handleCancel = () => {
    // Reset form khi bấm nút "Hủy"
    setFormData({
      BotToken: '',
      ChatID: '',
      MaChungKhoan: '',
      LoaiChiBao: '',
      GiaTriNguong: '',
      DieuKienTheoDoi: ''
    });
    // window.location.reload();
    onAdd(null);
  };

  

  return (
    <div className='add-alert-class'>
      <h3>Thêm Ngưỡng Cảnh Báo</h3>
      <form className='form-alert' onSubmit={handleSubmit}>
        <label>
          BotToken:
          <input type="text" name="BotToken" value={formData.BotToken} onChange={handleChange} />
        </label>
        <label>
          ChatID:
          <input type="text" name="ChatID" value={formData.ChatID} onChange={handleChange} />
        </label>
        <label>
          Mã chứng khoán:
          <input type="text" name="MaChungKhoan" value={formData.MaChungKhoan} onChange={handleChange} />
        </label>
        <label>
          Loại chỉ báo:
          <input type="text" name="LoaiChiBao" value={formData.LoaiChiBao} onChange={handleChange} />
        </label>
        <label>
          Gía trị ngưỡng:
          <input type="text" name="GiaTriNguong" value={formData.GiaTriNguong} onChange={handleChange} />
        </label>
        <label>
          Điều kiện theo dõi:
          <input type="text" name="DieuKienTheoDoi" value={formData.DieuKienTheoDoi} onChange={handleChange} />
        </label>
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </button>
        <button type="button" onClick={handleCancel}>Hủy</button>
      </form>
    </div>
  );
};

export default AddAlertForm;
  