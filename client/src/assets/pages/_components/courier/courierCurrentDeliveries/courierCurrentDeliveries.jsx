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
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchAllEvents, deleteEvent } from "../../../../api/eventApi/eventApi";

const CourierEventManager = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchEvents = useCallback(async () => {
    try {
      const allEvents = await fetchAllEvents('client'); 
      console.log(allEvents);
      setEvents(allEvents); 
    } catch (error) {
      console.error("Error fetching events:", error);
      setSnackbarMessage("Error fetching events.");
      setSnackbarOpen(true);
    }
  }, []);
  
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Удаление события
  const handleDelete = async () => {
    try {
      await deleteEvent(selectedEvent.id);
      setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id));
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

  // Открытие и закрытие окна подтверждения удаления
  const openConfirmDelete = (event) => setSelectedEvent(event) || setConfirmDeleteOpen(true);
  const closeConfirmDelete = () => setSelectedEvent(null) || setConfirmDeleteOpen(false);

  // Закрытие уведомления
  const closeSnackbar = () => setSnackbarOpen(false);

  return (
    <Box sx={{ color: "rgba(128, 96, 68, 1)", marginBottom: "40px" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Message</TableCell>
              <TableCell align="center">Phone</TableCell> {/* Новый столбец для телефона */}
              <TableCell align="center">Email</TableCell> {/* Новый столбец для email */}
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
                <TableCell align="center">{event.phone}</TableCell> {/* Отображаем телефон */}
                <TableCell align="center">{event.Employee?.email}</TableCell> {/* Отображаем email */}
                <TableCell align="center">
                  <IconButton onClick={() => openConfirmDelete(event)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default CourierEventManager;
