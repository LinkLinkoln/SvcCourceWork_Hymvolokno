import { responsiveFontSizes } from "@mui/material";
import axiosInstance from "../apiConfig";


// Add a new device
export const addDevice = async (deviceData) => {
  try {
    const response = await axiosInstance.post("/devices", deviceData);
    return response.data;
  } catch (error) {
    console.error("Error adding device:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing device
export const updateDevice = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/devices/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating device:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a device
export const deleteDevice = async (id) => {
  try {
    const response = await axiosInstance.delete(`/devices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting device:", error.response?.data || error.message);
    throw error;
  }
};

// Get a list of devices with optional status filtering
export const getDevices = async (status) => {
  try {
    const params = status ? { status } : {};
    const response = await axiosInstance.get("/devices", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error.response?.data || error.message);
    throw error;
  }
};


// Get detailed information about a device, including its calibration history
export const getDeviceDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/devices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching device details:", error.response?.data || error.message);
    throw error;
  }
};

// Upload device photo function
export const uploadDevicePhoto = async (formData) => {
    try {
      const response = await axiosInstance.post('/devices/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Returns the file path
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  };
  
  
// Функция для получения полного URL фотографии
export const getDivecePhotoUrl = (devicePhoto) => {
    return `http://localhost:5000/api/static/${devicePhoto}`;
  };

