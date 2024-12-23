import React, { useState } from "react";
import "./eventForm.css";
import { addEvent } from "../../../api/eventApi/eventApi";
import { Modal, Box, Button, Typography } from "@mui/material";

const Form = () => {
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = localStorage.getItem("role");
    const clientid = localStorage.getItem("id");
    const employeeId = localStorage.getItem("id"); // Получаем employeeId из localStorage

    // Проверяем, что employeeId существует
    if (!employeeId) {
      setModalMessage("Ошибка: ID сотрудника отсутствует.");
      setModalOpen(true);
      return;
    }

    // Проверяем валидность телефона
    if (!/^\d+$/.test(phone)) {
      setPhoneError("Номер телефона должен содержать только цифры.");
      return;
    } else {
      setPhoneError("");
    }

    // Проверяем дату события
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setDateError("Невозможно забронировать событие на прошедшую дату.");
      return;
    } else {
      setDateError("");
    }

    // Проверяем роль пользователя
    if (role !== "client") {
      setModalMessage("Пожалуйста, войдите как клиент для бронирования события.");
      setModalOpen(true);
      return;
    }

    try {
      // Передаём employeeId вместе с другими данными
      await addEvent({ clientid, date, address, message, phone, employeeId });
      setModalMessage(
        "Событие успешно забронировано! Вы можете просмотреть детали в вашем профиле."
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setModalMessage("Выбранная дата уже занята.");
      } else {
        setModalMessage("Произошла ошибка при бронировании события.");
      }
    } finally {
      setModalOpen(true);
    }
  };

  return (
    <div className="eventFormContainer">
      <p>
        Запросите консультацию, и наш специалист свяжется с вами для обсуждения
        деталей проекта.
      </p>
      <form onSubmit={handleSubmit} className="formContainer">
        <div className="formGroup">
          <p>Номер телефона*</p>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {phoneError && <p className="errorMessage">{phoneError}</p>}
        </div>
        <div className="formGroup">
          <p>Дата события*</p>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          {dateError && <p className="errorMessage">{dateError}</p>}
        </div>
        <div className="formGroupAddress">
          <p>Адрес события*</p>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="formGroupMessage">
          <p>Ваше сообщение*</p>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="eventButton">
          Отправить запрос
        </button>
      </form>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Уведомление</Typography>
          <Typography sx={{ mt: 2 }}>{modalMessage}</Typography>
          <Button
            onClick={() => setModalOpen(false)}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Закрыть
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Form;
