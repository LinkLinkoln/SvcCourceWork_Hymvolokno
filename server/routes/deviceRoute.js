const express = require("express");
const router = express.Router();
const multer = require("multer");
const fileUpload = require('express-fileupload');
const path = require("path");
const {
  addDevice,
  updateDevice,
  deleteDevice,
  getDevices,
  getDeviceDetails,
} = require("../controllers/deviceController");

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Укажите папку для хранения загруженных файлов
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Добавление нового прибора
router.post("/", addDevice);

// Редактирование информации о приборе
router.put("/:id", updateDevice);

// Удаление прибора
router.delete("/:id", deleteDevice);

// Отображение списка приборов с фильтрацией по статусу
router.get("/", getDevices);

// Просмотр подробной информации о приборе
router.get("/:id", getDeviceDetails);



module.exports = router;
