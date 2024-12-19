const express = require("express");
const router = express.Router();
const {
  addEmployee,
  assignResponsibility,
  getEmployees,
  updateEmployee,
  registerEmployee,
  loginEmployee,
} = require("../controllers/employeeController");

//Добавление нового сотрудника
router.post("/add", addEmployee);

// Назначение сотрудника ответственным за поверку или ремонт
router.post("/assign", assignResponsibility);

// Просмотр списка сотрудников с фильтрацией по должности или роли
router.get("/", getEmployees);

//Редактирование сотрудника
router.put("/:id", updateEmployee);

//Регистрация сотрудника
router.post("/register", registerEmployee);

//Aвторизация сотрудника
router.post("/login", loginEmployee);

module.exports = router;
