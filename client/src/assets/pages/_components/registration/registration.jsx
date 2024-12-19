import React, { useState } from "react";
import { Box, Button, TextField, Modal, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { registerUser } from "../../../api/auth/authApi"; // Импорт метода API

// Перечисление ролей
const UserRole = Object.freeze({
  CLIENT: "client",
  EMPLOYEE: "courier",
});

const RegistrationModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    fatherName: "",
    position: "",
    phone: "",
    email: "",
    role: UserRole.CLIENT, // Стартовое значение роли
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращает перезагрузку страницы
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await registerUser(formData);

      if (error) {
        setError(error); // Показываем ошибку
      } else {
        setSuccess(true); // Успешная регистрация
        setFormData({
          name: "",
          lastName: "",
          fatherName: "",
          position: "",
          phone: "",
          email: "",
          role: UserRole.CLIENT, // Сбрасываем роль после успешной регистрации
          password: "",
        });
        onClose(); // Закрываем модальное окно после успешной регистрации
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Register Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Father Name"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            type="email"
          />

          {/* Выбор роли через Select */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={handleInputChange}
              label="Role"
              name="role"
              required
            >
              <MenuItem value={UserRole.CLIENT}>Client</MenuItem>
              <MenuItem value={UserRole.EMPLOYEE}>Employee</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            type="password"
          />
          {error && (
            <Typography variant="body2" color="error" mt={2}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="body2" color="success" mt={2}>
              Registration successful!
            </Typography>
          )}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default RegistrationModal;
