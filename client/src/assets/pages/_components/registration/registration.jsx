import React, { useState } from "react";
import { registerUser } from "../../../api/auth/authApi";
import { useNavigate } from "react-router-dom";
import "./registration.css";
import Cookies from "js-cookie";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastname: "",
    name: "",
    fathername: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "lastname":
        if (!value) error = "Введите фамилию.";
        break;
      case "name":
        if (!value) error = "Введите имя.";
        break;
      case "phone":
        if (!value) {
          error = "Введите номер телефона.";
        } else if (!/^[0-9]+$/.test(value)) {
          error = "Телефон должен содержать только цифры.";
        }
        break;
      case "email":
        if (!value) {
          error = "Введите email.";
        } else {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) error = "Неверный формат email.";
        }
        break;
      case "address":
        if (!value) error = "Введите адрес.";
        break;
      case "password":
        if (!value) {
          error = "Введите пароль.";
        } else if (value.length < 6) {
          error = "Пароль должен быть не менее 6 символов.";
        }
        break;
      case "confirmpassword":
        if (!value) {
          error = "Подтвердите пароль.";
        } else if (value !== formData.password) {
          error = "Пароли не совпадают.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    Object.keys(formData).forEach((field) =>
      validateField(field, formData[field])
    );

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    const result = await registerUser(formData);

    if (result.error) {
      const message = result.error;
      if (message.includes("Email already exists")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Этот email уже зарегистрирован.",
        }));
      } else if (message.includes("Phone already exists")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Этот номер телефона уже зарегистрирован.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          submit: message || "Ошибка регистрации.",
        }));
      }
      return;
    }

    const { accessToken, refreshToken, user } = result.data;
    localStorage.setItem("id", user.id);
    localStorage.setItem("role", "client");
    localStorage.setItem("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });

    setFormData({
      name: "",
      lastname: "",
      fathername: "",
      phone: "",
      email: "",
      address: "",
      password: "",
      confirmpassword: "",
    });
    setTimeout(() => {
      navigate("/client");
    }, 2000);
  };

  return (
    <div className="registrationContainer">
      <form className="registrationForm" onSubmit={handleSubmit}>
        <h2>Регистрация для метрологов</h2>
        <p>Создайте учетную запись для работы с web-приложением</p>

        <div className="inputs">
          <label>
            Фамилия*
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </label>
          {errors.lastname && <p className="error">{errors.lastname}</p>}

          <label>
            Имя*
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          {errors.name && <p className="error">{errors.name}</p>}

          <label>
            Отчество
            <input
              type="text"
              name="fathername"
              value={formData.fathername}
              onChange={handleChange}
            />
          </label>

          <label>
            Телефон*
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label>
            Email*
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}

          <label>
            Адрес*
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          {errors.address && <p className="error">{errors.address}</p>}

          <label>
            Пароль*
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          {errors.password && <p className="error">{errors.password}</p>}

          <label>
            Подтверждение пароля*
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
            />
          </label>
          {errors.confirmpassword && (
            <p className="error">{errors.confirmpassword}</p>
          )}
        </div>

        <button type="submit" className="submitButton">
          Зарегистрироваться
        </button>

        <div className="cancelLink">
          <a href="/login">Отмена</a>
        </div>

        {errors.submit && <p className="error">{errors.submit}</p>}
      </form>
    </div>
  );
};

export default Registration;
