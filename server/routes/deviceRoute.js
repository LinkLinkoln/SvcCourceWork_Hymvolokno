const express = require("express");
const router = express.Router();
const path = require("path");
const {
  addDevice,
  updateDevice,
  deleteDevice,
  getDevices,
  getDeviceDetails,
  downloadDeviceHistory
} = require("../controllers/deviceController");

// Настройка multer для загрузки файлов

// Добавление нового прибора
router.post("/", addDevice);

// Редактирование информации о приборе
router.put("/:id", updateDevice);

// Удаление прибора
router.delete("/:id", deleteDevice);

router.get("/", getDevices);

router.get("/devices/search", getDevices);

router.get("/:id", getDeviceDetails);

router.get("/Downl/Daun", downloadDeviceHistory);
router.get("/Downl/Daun/excel", downloadDeviceHistory);
router.get("/Downl/Daun/word", downloadDeviceHistory);


module.exports = router;
