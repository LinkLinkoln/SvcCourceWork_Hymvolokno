const {
  CalibrationSchedule,
  CalibrationHistory,
  Device,
  Employee,
} = require("../models/models");

//Генерация графика поверок на основе периодичности для каждого прибора
const generateCalibrationSchedule = async (req, res) => {
  try {
    const devices = await Device.findAll();
    const schedules = [];

    devices.forEach((device) => {
      const nextCalibrationDate = new Date();
      nextCalibrationDate.setDate(
        nextCalibrationDate.getDate() + device.calibrationInterval
      ); // Интервал

      schedules.push({
        deviceId: device.id,
        nextCalibrationDate: nextCalibrationDate,
        status: "Pending",
        responsible: null, // Ответственный за прибор
      });
    });

    // Сохранение графика
    await CalibrationSchedule.bulkCreate(schedules);
    res.status(201).json({ message: "График поверок успешно создан" });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при создании графика поверок",
      error: error.message,
    });
  }
};

//Редактирование графика поверок
const updateCalibrationSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { nextCalibrationDate, status, responsible } = req.body;

    const schedule = await CalibrationSchedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ message: "График поверки не найден" });
    }

    await schedule.update({
      nextCalibrationDate,
      status,
      responsible,
    });

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при обновлении графика поверки",
      error: error.message,
    });
  }
};

//Автоматическая отметка поверки как выполненной после внесения данных в историю поверок
const markCalibrationAsCompleted = async (req, res) => {
  try {
    const { historyId } = req.params;

    const history = await CalibrationHistory.findByPk(historyId);
    if (!history) {
      return res.status(404).json({ message: "История поверки не найдена" });
    }

    const schedule = await CalibrationSchedule.findOne({
      where: { deviceId: history.deviceId },
    });

    if (!schedule) {
      return res.status(404).json({ message: "График поверки не найден" });
    }

    await schedule.update({
      status: "Выполнена", // Обновление статуса на "Выполнена"
    });

    res
      .status(200)
      .json({ message: "Поверка успешно отмечена как выполненная" });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при отметке поверки как выполненной",
      error: error.message,
    });
  }
};

module.exports = {
  generateCalibrationSchedule,
  updateCalibrationSchedule,
  markCalibrationAsCompleted,
};
