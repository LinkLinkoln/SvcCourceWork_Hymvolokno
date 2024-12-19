import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Avatar } from "@mui/material"; 
import { updateDevice, uploadDevicePhoto, deleteDevice, getDevices, getDivecePhotoUrl } from "../../../../api/deviceApi/deviceApi";
import axiosInstance from "../../../../api/apiConfig"

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [status, setStatus] = useState(""); 
  const [selectedDevice, setSelectedDevice] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEditing, setIsEditing] = useState(false); 

  // Состояние для хранения выбранного фото
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getDevices(status);
        setDevices(data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchDevices();
  }, [status]);

  const handleDelete = async (id) => {
    try {
      await deleteDevice(id);
      setDevices(devices.filter(device => device.id !== id)); // Удаление из списка
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const handleOpenModal = (device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false); // Сбросить состояние редактирования при закрытии модального окна
    setPhoto(null); // Очистить выбранное фото при закрытии
  };

 const handleSaveChanges = async () => {
  if (selectedDevice) {
    try {
      const formData = new FormData();
      formData.append("name", selectedDevice.name);
      formData.append("type", selectedDevice.type);
      formData.append("serialNumber", selectedDevice.serialNumber);
      formData.append("commissioningDate", selectedDevice.commissioningDate);
      formData.append("calibrationInterval", selectedDevice.calibrationInterval);
      formData.append("currentStatus", selectedDevice.currentStatus);

      // If a photo is selected, upload it
      if (photo) {
        const photoData = new FormData();
        photoData.append("devicePhoto", photo);

        // Upload the photo and get the file path
        const photoResponse = await uploadDevicePhoto(photoData);

        // Add the photo path to formData
        formData.append("devicePhoto", photoResponse.filePath);  // Save the photo path in the device data
        selectedDevice.devicePhoto = photoResponse;
      }

      // Update the device on the server
      const updatedDevice = await updateDevice(selectedDevice.id, formData);

      const a = getDivecePhotoUrl(selectedDevice.devicePhoto);
      console.log(a.name);
      // Update the device list
      setDevices(devices.map((device) =>
        device.id === updatedDevice.id ? updatedDevice : device
      ));

      // Close the modal and reset the state
      setIsEditing(false);
      setPhoto(null);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  }
};

  
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]); // Сохраняем файл, выбранный пользователем
  };

  return (
    <div>
      <h2>Devices List</h2>
      <div>
        <button onClick={() => setStatus("active")}>Active</button>
        <button onClick={() => setStatus("inactive")}>Inactive</button>
        <button onClick={() => setStatus("")}>All</button>
      </div>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            <div>
              <Avatar alt={device.name} src={getDivecePhotoUrl(device.devicePhoto)} />
              <h3>{device.name}</h3>
              <p>{device.position}</p>
              <p>{device.status}</p>
              <button onClick={() => handleOpenModal(device)}>Details</button>
              <button onClick={() => handleDelete(device.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Модальное окно для подробной информации и редактирования */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div style={{ padding: "20px", backgroundColor: "white", margin: "50px auto", width: "300px", borderRadius: "8px" }}>
          {selectedDevice && (
            <>
              <h2>Device Details</h2>
              <div>
                <Avatar alt={selectedDevice.name} src={getDivecePhotoUrl(selectedDevice.devicePhoto)} />
              </div>
              <form>
                <TextField
                  label="Название"
                  value={selectedDevice.name}
                  onChange={handleChange}
                  name="name"
                  disabled={!isEditing}
                  fullWidth
                />
                <TextField
                  label="Серийный номер"
                  value={selectedDevice.serialNumber}
                  disabled // Disable the serial number field to prevent editing
                  fullWidth
                />
                <TextField
                  label="Текущий статус"
                  value={selectedDevice.currentStatus}
                  onChange={handleChange}
                  name="currentStatus"
                  disabled={!isEditing}
                  fullWidth
                />

                {/* Поле для выбора фото, доступное только в режиме редактирования */}
                {isEditing && (
                  <div>
                    <input
                      type="file"
                      onChange={handlePhotoChange}
                    />
                  </div>
                )}

                <div style={{ marginTop: "20px" }}>
                  <Button onClick={handleCloseModal} color="secondary">
                    Close
                  </Button>
                  <Button 
                    onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)} 
                    color="primary"
                  >
                    {isEditing ? "Save Changes" : "Edit"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DeviceList;
