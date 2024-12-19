const express = require("express");
const router = express.Router();
const {
  addCalibrationHistory,
  searchCalibrationHistory,
  generateCalibrationReport,
} = require("../controllers/calibrationHistoryController");

//Добавление новой записи о поверке
router.post("/", addCalibrationHistory);

//Поиск по истории поверок
router.get("/search", searchCalibrationHistory);

//Генерация отчета о поверках за определенный период
router.get("/report", generateCalibrationReport);

module.exports = router;
