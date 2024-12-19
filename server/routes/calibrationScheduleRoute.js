const express = require("express");
const router = express.Router();
const {
  generateCalibrationSchedule,
  updateCalibrationSchedule,
  markCalibrationAsCompleted,
} = require("../controllers/calibrationScheduleController");

//Генерация графика поверок
router.post("/generate", generateCalibrationSchedule);

//Редактирование графика поверок
router.put("/:id", updateCalibrationSchedule);

// Автоматическая отметка поверки как выполненной
router.post("/mark-completed/:historyId", markCalibrationAsCompleted);

module.exports = router;
