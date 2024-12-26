import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Modal,
  Fade,
  TextField,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteEvent,
  fetchEvents as fetchEventsApi,
  updateEvent,
  addEvent,
} from "../../../api/eventApi/eventApi";
import "./clientEvent.css";

const EventManager = () => {
  const [events, setEvents] = useState([]); // Список событий
  const [selectedEvent, setSelectedEvent] = useState(null); // Выбранное событие для редактирования/удаления
  const [modalOpen, setModalOpen] = useState(false); // Открытие модального окна
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // Открытие окна подтверждения удаления
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Уведомление
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Текст уведомления

  const employeeId = localStorage.getItem("id"); // Получаем ID сотрудника из localStorage

  // Функция для загрузки событий
  const fetchEvents = useCallback(async () => {
    try {
      const eventsData = await fetchEventsApi(employeeId);
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      setSnackbarMessage("Error fetching events.");
      setSnackbarOpen(true);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchEvents(); // Загружаем события при монтировании компонента
  }, [fetchEvents]);

  // Закрытие уведомления
  const closeSnackbar = () => setSnackbarOpen(false);

  // Обработчик изменения данных события
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Добавление нового события
  const handleAddEvent = async () => {
    try {
      const newEvent = await addEvent({
        ...selectedEvent,
        employeeId, // Передаём employeeId
      });
      setEvents((prev) => [...prev, newEvent]); // Добавляем новое событие в список
      setSnackbarMessage("Event added successfully.");
      setSnackbarOpen(true);
      closeModal();
    } catch (error) {
      console.error("Error adding event:", error);
      setSnackbarMessage(
        error.response?.data?.message || "Error adding event."
      );
      setSnackbarOpen(true);
    }
  };
  


  // Обновление существующего события
  const handleUpdateEvent = async () => {
    try {
      await updateEvent(selectedEvent.id, {
        ...selectedEvent,
        employeeId, // Передаём employeeId
      });
      setEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEvent.id ? selectedEvent : event
        )
      ); // Обновляем событие в списке
      setSnackbarMessage("Event updated successfully.");
      setSnackbarOpen(true);
      closeModal();
    } catch (error) {
      console.error("Error updating event:", error);
      setSnackbarMessage(
        error.response?.data?.message || "Error updating event."
      );
      setSnackbarOpen(true);
    }
  };
  

  // Удаление события
  const handleDelete = async () => {
    try {
      await deleteEvent(selectedEvent.id);
      setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id)); // Удаляем событие из списка
      setSnackbarMessage("Event deleted successfully.");
      setSnackbarOpen(true);
      closeConfirmDelete();
    } catch (error) {
      console.error("Error deleting event:", error);
      setSnackbarMessage(
        error.response?.data?.message || "Error deleting event."
      );
      setSnackbarOpen(true);
    }
  };
  

  // Открытие модального окна для редактирования или добавления события
  const openModal = (event = null) => {
    setSelectedEvent(event || { date: "", address: "", message: "", phone: "" });
    setModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  // Открытие окна подтверждения удаления
  const openConfirmDelete = (event) => {
    setSelectedEvent(event);
    setConfirmDeleteOpen(true);
  };

  // Закрытие окна подтверждения удаления
  const closeConfirmDelete = () => {
    setSelectedEvent(null);
    setConfirmDeleteOpen(false);
  };

  

  return (
    <Box sx={{ color: "rgba(128, 96, 68, 1)", marginBottom: "40px" }}>
      <Button
      variant="contained"
      color="primary"
      sx={{ marginBottom: 2 }}
      component="a" // Use the <a> tag to handle navigation
      href="/event" 
      >
        Add Event
</Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Message</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell align="center">
                  {new Date(event.date).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{event.address}</TableCell>
                <TableCell align="center">{event.message}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => openModal(event)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openConfirmDelete(event)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Модальное окно редактирования или добавления */}
      <Modal open={modalOpen} onClose={closeModal}>
        <Fade in={modalOpen}>
          <Box sx={modalBoxStyles}>
            <Typography variant="h6">
              {selectedEvent?.id ? "Edit Event" : "Add Event"}
            </Typography>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={selectedEvent?.date.split("T")[0] || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Address"
              name="address"
              value={selectedEvent?.address || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Message"
              name="message"
              value={selectedEvent?.message || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={selectedEvent?.phone || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={
                selectedEvent?.id ? handleUpdateEvent : handleAddEvent
              }
              sx={{ mt: 2 }}
            >
              {selectedEvent?.id ? "Save Changes" : "Add Event"}
            </Button>
          </Box>
        </Fade>
      </Modal>

      {/* Модальное окно подтверждения удаления */}
      <Modal open={confirmDeleteOpen} onClose={closeConfirmDelete}>
        <Fade in={confirmDeleteOpen}>
          <Box sx={modalBoxStyles}>
            <Typography variant="h6" align="center">
              Are you sure you want to delete this event?
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <Button onClick={closeConfirmDelete} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="contained" color="error">
                Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Уведомление */}
      <Snackbar
        open={snackbarOpen}
        onClose={closeSnackbar}
        message={snackbarMessage}
        autoHideDuration={6000}
      />
    </Box>
  );
};

// Стили для модального окна
const modalBoxStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default EventManager;
