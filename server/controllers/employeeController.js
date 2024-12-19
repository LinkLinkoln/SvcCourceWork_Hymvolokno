const {
  Employee,
  CalibrationSchedule,
  RepairRequest,
  Token,
} = require("../models/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Добавление нового сотрудника
const addEmployee = async (req, res) => {
  try {
    const {
      lastName,
      name,
      fatherName,
      position,
      phone,
      email,
      role,
      password,
    } = req.body;

    const newEmployee = await Employee.create({
      lastName,
      name,
      fatherName,
      position,
      phone,
      email,
      role,
      password,
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при добавлении сотрудника",
      error: error.message,
    });
  }
};

//Назначение сотрудника ответственным за поверку или ремонт
const assignResponsibility = async (req, res) => {
  try {
    const { employeeId, calibrationId, repairId } = req.body;

    if (calibrationId) {
      // Назначаем сотрудника ответственным за поверку
      const schedule = await CalibrationSchedule.findByPk(calibrationId);
      if (!schedule) {
        return res.status(404).json({ message: "График поверки не найден" });
      }

      schedule.responsible = employeeId;
      await schedule.save();
      res
        .status(200)
        .json({ message: "Сотрудник назначен ответственным за поверку" });
    }

    if (repairId) {
      // Назначаем сотрудника ответственным за ремонт
      const repairRequest = await RepairRequest.findByPk(repairId);
      if (!repairRequest) {
        return res.status(404).json({ message: "Заявка на ремонт не найдена" });
      }

      repairRequest.responsible = employeeId;
      await repairRequest.save();
      res
        .status(200)
        .json({ message: "Сотрудник назначен ответственным за ремонт" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при назначении сотрудника",
      error: error.message,
    });
  }
};

//Просмотр списка сотрудников с фильтрацией по должности или роли
const getEmployees = async (req, res) => {
  try {
    const { position, role } = req.query;

    // Фильтруем сотрудников по должности или роли
    const employees = await Employee.findAll({
      where: {
        ...(position && { position: { [Op.like]: `%${position}%` } }),
        ...(role && { role: { [Op.like]: `%${role}%` } }),
      },
    });

    if (employees.length === 0) {
      return res.status(404).json({ message: "Сотрудники не найдены" });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при получении сотрудников",
      error: error.message,
    });
  }
};

//Редактирование сотрудника
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { lastName, name, fatherName, phone, email, password } = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Сотрудник не найден" });
    }

    // Обновляем только разрешенные данные (кроме позиции и роли)
    employee.lastName = lastName || employee.lastName;
    employee.name = name || employee.name;
    employee.fatherName = fatherName || employee.fatherName;
    employee.phone = phone || employee.phone;
    employee.email = email || employee.email;
    employee.password = password || employee.password;

    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при редактировании сотрудника",
      error: error.message,
    });
  }
};

const registerEmployee = async (req, res) => {
  const { email, password, name, lastName, fatherName, phone, position, role } =
    req.body;

  try {
    // Проверка на существующий email
    const existingEmployeeEmail = await Employee.findOne({ where: { email } });
    if (existingEmployeeEmail) {
      return res.status(400).json({ message: "Емаил уже существует" });
    }

    // Проверка на существующий телефон
    const existingEmployeePhone = await Employee.findOne({ where: { phone } });
    if (existingEmployeePhone) {
      return res
        .status(400)
        .json({ message: "Запись с таким телефоном уже существует" });
    }

    // Создание нового сотрудника
    const newEmployee = await Employee.create({
      email,
      password,
      name,
      lastName,
      fatherName: fatherName || null,
      phone,
      position,
      role,
    });

    // Генерация токенов
    const accessToken = jwt.sign(
      { id: newEmployee.id, role: newEmployee.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: newEmployee.id, role: newEmployee.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Сохранение токенов в базе данных
    await Token.create({
      employeeId: newEmployee.id,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // expires in 15 minutes
    });

    // Возвращаем токены и информацию о новом сотруднике
    res.status(201).json({
      user: newEmployee,
      role: newEmployee.role,
      accessToken,
      refreshToken,
      message: "Сотрудник зарегестрирован",
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка на сервере",
      error: error.message,
    });
  }
};

//Авторизация сотрудника
const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Поиск сотрудника по email
    const employee = await Employee.findOne({ where: { email } });

    // Если сотрудник не найден
    if (!employee) {
      return res.status(400).json({ message: "Неверный(-е) почта или пароль" });
    }

    // Проверка пароля
    if (employee.password !== password) {
      return res.status(400).json({ message: "Неверный(-е) почта или пароль" });
    }

    // Генерация токенов
    const accessToken = jwt.sign(
      { id: employee.id, role: employee.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: employee.id, role: employee.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Сохранение токенов в базе данных
    await Token.create({
      employeeId: employee.id,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // expires in 15 minutes
    });

    // Возвращаем токены и информацию о сотруднике
    res.status(200).json({
      message: "Успешная авторизация",
      accessToken,
      refreshToken,
      user: {
        id: employee.id,
        name: employee.name,
        role: employee.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка на сервере",
      error: error.message,
    });
  }
};

module.exports = {
  addEmployee,
  assignResponsibility,
  getEmployees,
  updateEmployee,
  registerEmployee,
  loginEmployee,
};
