import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Avatar, Card, CardContent, CardActions, Typography, Box, Grid } from "@mui/material";
import { updateDevice, uploadDevicePhoto, deleteDevice, getDevices, getDivecePhotoUrl, addDevice } from "../../../../api/deviceApi/deviceApi";
import Pagination from "@mui/material/Pagination";

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "",
    serialNumber: "",
    commissioningDate: "",
    calibrationInterval: "",
    currentStatus: "",
    devicePhoto: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const generateSerialNumber = () => {
    return `SN-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  };

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

    const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const paginatedDevices = devices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    try {
      await deleteDevice(id);
      setDevices(devices.filter(device => device.id !== id));
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const handleOpenModal = (device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setPhoto(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewDevice({
      name: "",
      type: "",
      serialNumber: "",
      commissioningDate: "",
      calibrationInterval: "",
      currentStatus: "",
      devicePhoto: null,
    });
    setPhoto(null);
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

        if (photo) {
          const photoData = new FormData();
          photoData.append("devicePhoto", photo);
          const photoResponse = await uploadDevicePhoto(photoData);
          const fileName = photoResponse.filePath.split('/').pop();
          selectedDevice.devicePhoto = fileName;
          formData.append("devicePhoto", fileName);
        }

        const updatedDevice = await updateDevice(selectedDevice.id, formData);

        setDevices(devices.map((device) =>
          device.id === updatedDevice.id ? updatedDevice : device
        ));

        setIsEditing(false);
        setPhoto(null);
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  const handleAddDevice = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newDevice.name);
      formData.append("type", newDevice.type);
  
      // Генерация серийного номера, если он не указан
      const serialNumber = newDevice.serialNumber || generateSerialNumber();
      formData.append("serialNumber", serialNumber);
  
      formData.append("commissioningDate", newDevice.commissioningDate);
      formData.append("calibrationInterval", newDevice.calibrationInterval);
      formData.append("currentStatus", newDevice.currentStatus);
  
      if (photo) {
        const photoData = new FormData();
        photoData.append("devicePhoto", photo);
        const photoResponse = await uploadDevicePhoto(photoData);
        const fileName = photoResponse.filePath.split('/').pop();
        formData.append("devicePhoto", fileName);
      }
  
      const addedDevice = await addDevice(formData);
      setDevices([...devices, addedDevice]);
  
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value,
    }));
  };

  const handleNewDeviceChange = (event) => {
    const { name, value } = event.target;
    setNewDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom align="center">
        Devices List
      </Typography>
      <Button
        onClick={handleOpenAddModal}
        color="primary"
        variant="contained"
        style={{ marginBottom: "20px", display: "block", marginLeft: "auto", marginRight: "auto" }}
      >
        Add New Device
      </Button>

      <Grid container spacing={3} justifyContent="center">
        {paginatedDevices.map((device) => (
          <Grid item xs={12} sm={6} md={4} key={device.id}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <Avatar
                  alt={device.name}
                  src={getDivecePhotoUrl(device.devicePhoto)}
                  sx={{ width: 100, height: 100, margin: "0 auto" }}
                />
                <Typography variant="h6" component="h3">
                  {device.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {device.position}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {device.status}
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button
                  onClick={() => handleOpenModal(device)}
                  color="primary"
                >
                  Details
                </Button>
                <Button
                  onClick={() => handleDelete(device.id)}
                  color="secondary"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(devices.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>

      {/* Add Device Modal */}
      <Modal open={isAddModalOpen} onClose={handleCloseAddModal}>
        <div
          style={{
            padding: "30px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            width: "400px",
            margin: "100px auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Device
          </Typography>
          <form>
            <TextField
              label="Device Name"
              value={newDevice.name}
              onChange={handleNewDeviceChange}
              name="name"
              fullWidth
              style={{ marginBottom: "15px" }}
            />
            <TextField
              label="Type"
              value={newDevice.type}
              onChange={handleNewDeviceChange}
              name="type"
              fullWidth
              style={{ marginBottom: "15px" }}
            />
            <TextField
              label="Commissioning Date"
              value={newDevice.commissioningDate}
              onChange={handleNewDeviceChange}
              name="commissioningDate"
              type="date"
              fullWidth
              style={{ marginBottom: "15px" }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Calibration Interval (Days)"
              value={newDevice.calibrationInterval}
              onChange={handleNewDeviceChange}
              name="calibrationInterval"
              type="number"
              fullWidth
              style={{ marginBottom: "15px" }}
            />
            <TextField
              label="Current Status"
              value={newDevice.currentStatus}
              onChange={handleNewDeviceChange}
              name="currentStatus"
              fullWidth
              style={{ marginBottom: "15px" }}
            />
            <div style={{ marginBottom: "15px" }}>
              <label>Device Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ width: "100%" }}
              />
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={handleCloseAddModal} color="secondary">
                Close
              </Button>
              <Button
                onClick={handleAddDevice}
                color="primary"
                variant="contained"
              >
                Add Device
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Edit Device Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div
          style={{
            padding: "30px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            width: "400px",
            margin: "100px auto",
          }}
        >
          {selectedDevice && (
            <>
              <Typography variant="h6" gutterBottom>
                Device Details
              </Typography>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Avatar
                  alt={selectedDevice.name}
                  src={getDivecePhotoUrl(selectedDevice.devicePhoto)}
                  sx={{ width: 100, height: 100, margin: "0 auto" }}
                />
              </div>
              <form>
                <TextField
                  label="Name"
                  value={selectedDevice.name}
                  onChange={handleChange}
                  name="name"
                  disabled={!isEditing}
                  fullWidth
                  style={{ marginBottom: "15px" }}
                />
                <TextField
                  label="Serial Number"
                  value={selectedDevice.serialNumber}
                  disabled
                  fullWidth
                  style={{ marginBottom: "15px" }}
                />
                <TextField
                  label="Current Status"
                  value={selectedDevice.currentStatus}
                  onChange={handleChange}
                  name="currentStatus"
                  disabled={!isEditing}
                  fullWidth
                  style={{ marginBottom: "15px" }}
                />
                <div style={{ marginBottom: "15px" }}>
                  <label>Device Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    disabled={!isEditing}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button onClick={handleCloseModal} color="secondary">
                    Close
                  </Button>
                  <Button
                    onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
                    color="primary"
                    variant="contained"
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
