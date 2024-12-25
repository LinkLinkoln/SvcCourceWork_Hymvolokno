import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import ClientApi from "../../../../api/clients/clientApi";

const EditClientModal = ({ open, onClose }) => {
  const [clientData, setClientData] = useState(null);
  const [lastname, setLastname] = useState("");
  const [name, setName] = useState("");
  const [fathername, setFathername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState(""); // Новый параметр
  const [role, setRole] = useState(""); // Новый параметр
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const clientId = localStorage.getItem("id");

  useEffect(() => {
    const fetchClientData = async () => {
      if (!open) return;

      const { data } = await ClientApi.fetchClientById(clientId);
      if (data) {
        setClientData(data);
        setLastname(data.lastName);
        setName(data.name);
        setFathername(data.fatherName || "");
        setEmail(data.email);
        setPhone(data.phone);
        setPosition(data.position || ""); // Получаем значение position
        setRole(data.role || ""); // Получаем значение role
      }
    };

    fetchClientData();
  }, [clientId, open]);

  const handleApply = async () => {
    if (!lastname || !name) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Фамилия и имя не могут быть пустыми.");
      setSnackbarOpen(true);
      return;
    }

    if (/[^0-9]/.test(phone)) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Номер телефона должен содержать только цифры.");
      setSnackbarOpen(true);
      return;
    }

    if (password) {
      if (password.length < 6) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Пароль должен быть длиннее 6 символов.");
        setSnackbarOpen(true);
        return;
      }

      if (/[^a-zA-Z0-9]/.test(password)) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Пароль не может содержать специальные символы.");
        setSnackbarOpen(true);
        return;
      }

      if (password !== confirmPassword) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Пароли не совпадают.");
        setSnackbarOpen(true);
        return;
      }
    }

    const { data: phoneExists } = await ClientApi.checkPhoneExists(
      phone,
      clientId
    );
    if (phoneExists) {
      setSnackbarMessage("Этот номер телефона уже существует.");
      setSnackbarOpen(true);
      return;
    }

    const { message } = await ClientApi.updateClient(clientId, {
      lastname,
      name,
      fathername,
      email,
      phone,
      position, // Новое поле
      role, // Новое поле
      ...(password && { password }),
    });

    setSnackbarSeverity("success");
    setPassword("");
    setConfirmPassword("");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleReset = () => {
    if (clientData) {
      setLastname(clientData.lastname);
      setName(clientData.name);
      setFathername(clientData.fathername || "");
      setPhone(clientData.phone);
      setPosition(clientData.position || ""); // Сброс значения position
      setRole(clientData.role || ""); // Сброс значения role
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "500px",
        margin: "auto",
        "@media(max-width:520px)": { width: 300 },
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          padding: "7px",
          margin: "auto",
          width: "90%",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            textAlign: "center",
            color: "#2E3B4E",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Редактирование данных клиента
        </Typography>
        <TextField
          label="Фамилия"
          fullWidth
          margin="normal"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Имя"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Отчество"
          fullWidth
          margin="normal"
          value={fathername}
          onChange={(e) => setFathername(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          disabled
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Телефон"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Новый пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Подтвердите пароль"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleApply}
          sx={{
            backgroundColor: "#2E3B4E",
            marginTop: "10px",
            "&:hover": { backgroundColor: "#3D4F6C" },
          }}
        >
          Обновить
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{
            marginLeft: "10px",
            color: "#2E3B4E",
            borderColor: "#2E3B4E",
            "&:hover": { borderColor: "#3D4F6C", color: "#3D4F6C" },
          }}
        >
          Сбросить
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default EditClientModal;
