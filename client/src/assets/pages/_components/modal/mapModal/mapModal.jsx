import React from "react";
import { Box, Modal, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MapModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#f4f4f4",
          border: "2px solid #3f51b5",
          boxShadow: 24,
          p: 4,
          width: "80%",
          maxWidth: "700px",
          borderRadius: "8px",
          color: "#3f51b5",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#3f51b5",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          Окно расположения на карте
        </Typography>
        <Typography sx={{ mt: 2, color: "#666" }}>
          Для точного определения местоположения используйте встроенную карту. Веб-приложение для метролога поможет вам с измерениями на месте.
        </Typography>
        <Box sx={{ height: "400px", backgroundColor: "#e0e0e0", mt: 2 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.4776284002116!2d-74.00601508459459!3d40.71277577933029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259afac81d619%3A0x4c3761393a083663!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1731228723304!5m2!1sen!2sus"

            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта для определения местоположения"
          ></iframe>
        </Box>
      </Box>
    </Modal>
  );
};

export default MapModal;
