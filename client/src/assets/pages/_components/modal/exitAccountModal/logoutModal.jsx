import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ open, handleClose, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          width: "80%",
          maxWidth: "400px",
          color: "#3A3A3A",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#3A3A3A",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
          Завершение сессии
        </Typography>
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Вы уверены, что хотите выйти из приложения для метролога?
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#4CAF50", // Зеленый, ассоциирующийся с подтверждением
              color: "white",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
          >
            Да
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: "#4CAF50",
              borderColor: "#4CAF50",
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            Нет
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
