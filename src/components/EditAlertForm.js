import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAlertForm = ({ alert, onCancel }) => {
  const [formData, setFormData] = useState({
    BotToken: alert.BotToken,
    ChatID: alert.ChatID,
    MaChungKhoan: alert.MaChungKhoan,
    LoaiChiBao: alert.LoaiChiBao,
    GiaTriNguong: alert.GiaTriNguong,
    DieuKienTheoDoi: alert.DieuKienTheoDoi,
    MaTaiKhoan: alert.MaTaiKhoan
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
      console.log(alert.MaCanhBao)
      await axios.put(`http://10.168.6.103:8000/api/nguongcanhbao/update/${alert.MaCanhBao}/`, formData);
      // Gọi hàm cập nhật danh sách alert ở component cha (nếu cần)
      onCancel();
      window.location.reload();
    } catch (error) {
      console.error('Error updating alert:', error);
    }
  };

  return (
    <div className="overlay">
      <div className="form-container-edit">
        <h3>Sửa cảnh báo</h3>
        <form onSubmit={handleSubmit}>
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
          <div className='button_edit_form'>
            <button type="submit">Lưu</button>
            <button type="button" onClick={onCancel}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAlertForm;
