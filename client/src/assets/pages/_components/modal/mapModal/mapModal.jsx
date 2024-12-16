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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.032174923079!2d2.3294471331254027!3d48.859195230523866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2z0J_QsNGA0LjQtiwg0KTRgNCw0L3RhtC40Y8!5e0!3m2!1sru!2sby!4v1731228723304!5m2!1sru!2sby"
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
