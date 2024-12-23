import axiosInstance from "../apiConfig";

export const addEvent = async (eventData) => {
  try {
    const response = await axiosInstance.post(`/events`, eventData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding event:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axiosInstance.put(`/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
export const deleteEvent = async (eventId) => {
  try {
    await axiosInstance.delete(`/events/${eventId}`);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const fetchEvents = async (employeeId) => { 
  try {
    const response = await axiosInstance.get("/events", {
      params: { employeeId }, 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchAllEvents = async (role = 'client') => {
  try {
    const response = await axiosInstance.get("events/events", {
      params: { role }, 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; 
  }
};











