import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './a.css';

function App() {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({
    phone: '',
    address: '',
    status: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/GetAllOrder')
      .then(response => setData(response.data.data.data))
      .catch(error => console.log(error));
  }, []);

  async function deleteOrder(_id) {
    if (_id) {
      const response = await axios.get(`http://localhost:8080/api/deleteOrder?_id=${_id}`);
      if (response.status === 200) {
        window.location.reload();
      }
    }
  }

  function updateOrder(_id) {
    const orderToEdit = data.find(order => order._id === _id);
    setEditedData({
      phone: orderToEdit.phone,
      address: orderToEdit.address,
      status: orderToEdit.status,
    });
  }

  function submitForm(_id) {
    updateOrder(_id)
    // Xây dựng URL với các tham số
    const url = `http://localhost:8080/api/updateOrder?_id=${_id}&phone=${editedData.phone}&address=${editedData.address}&status=${editedData.status}`;
    
    // Thực hiện request GET
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          window.location.reload();
        } else {
          console.error('Failed to update order');
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div>
      <h1>Danh sách Order</h1>
      <span>
        <div className="grid-container">
          <div className="posXX">ID</div>
          <div className="posXX">ID USER</div>
          <div className="posXX">PHONE</div>
          <div className="posXX">ĐỊA CHỈ</div>
          <div className="posXX">STATUS</div>
          <div className="posXX">date_created</div>
          <div className="posXX">Action</div>
        </div>
        {data.map(user => (
          <form className="grid-container" key={user._id} onSubmit={(e) => {
            e.preventDefault();submitForm(user._id);
          }}>
            <div className="posXX">{user.id_product}</div>
            <div className="posXX">{user.id_user}</div>
            <div contentEditable className="posXX" onInput={(e) => setEditedData({ ...editedData, phone: e.target.textContent })} >{user.phone}</div>
            <div contentEditable className="posXX" onInput={(e) => setEditedData({ ...editedData, address: e.target.textContent })}>{user.address}</div>
            <div contentEditable className="posXX" onInput={(e) => setEditedData({ ...editedData, status: e.target.textContent })}>{user.status}</div>
            <div contentEditable className="posXX">{user.date_created}</div>

            <div className="flex space-x-4">
  <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Sửa</button>
  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => deleteOrder(user._id)}>Xóa</button>
</div>

          </form>
        ))}
      </span>
    </div>
  );
}

export default App;
