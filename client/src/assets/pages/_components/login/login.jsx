import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../../../api/auth/authApi"; // Импорт метода для входа
import RegistrationModal from "../registration/registration"; // Импорт модального окна регистрации
import { Box, Typography, TextField, Button, Alert, Link } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openRegisterModal, setOpenRegisterModal] = useState(false); // Состояние модального окна регистрации
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);

    const handlePopState = (event) => {
      window.history.pushState(null, document.title, window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Необходимо ввести email и пароль.");
      return;
    }

    try {
      // Вызов метода API для входа
      const response = await login(email, password);
      const { accessToken, refreshToken, user } = response;
      localStorage.setItem("role", user.role);
      localStorage.setItem("id", user.id);
      localStorage.setItem("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      // Перенаправление в зависимости от роли
      if (user.role === "client") {
        navigate("/client");
      } else if (user.role === "courier") {
        navigate("/courier");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
      const message = error.response?.data?.message || "Вход не удался.";
      setError(message);
    }
  };

  const handleToggleRegisterModal = () => {
    setOpenRegisterModal((prev) => !prev); // Открыть/закрыть модальное окно регистрации
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      {/* Форма входа */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "30px",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
          Вход в систему
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
          Для доступа к web-приложению для метролога, пожалуйста, войдите, указав свои учетные данные.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            Войти
          </Button>
        </form>
        <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
          <Link href="/forgot-password" color="primary" underline="hover">
            Забыли пароль?
          </Link>
        </Typography>
      </Box>

      {/* Форма для регистрации */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
          Новый пользователь?
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
          Если вы впервые используете систему, создайте учетную запись.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleToggleRegisterModal}
        >
          Зарегистрироваться
        </Button>
      </Box>

      {/* Модальное окно регистрации */}
      <RegistrationModal open={openRegisterModal} onClose={handleToggleRegisterModal} />
    </Box>
  );
};

export default Login;
