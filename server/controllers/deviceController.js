const {
  Device,
  CalibrationHistory,
  CalibrationData,
} = require("../models/models");

//Добавление нового прибора
const addDevice = async (req, res) => {
  try {
    const {
      name,
      type,
      serialNumber,
      commissioningDate,
      calibrationInterval,
      currentStatus,
      devicePhoto,
    } = req.body;
    const newDevice = await Device.create({
      name,
      type,
      serialNumber,
      commissioningDate,
      calibrationInterval,
      currentStatus,
      devicePhoto,
    });
    res.status(201).json(newDevice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при добавлении прибора", error: error.message });
  }
};

//Редактирование информации о приборе
const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      serialNumber,
      commissioningDate,
      calibrationInterval,
      currentStatus,
      devicePhoto,
    } = req.body;
    const device = await Device.findByPk(id);

    if (!device) {
      return res.status(404).json({ message: "Прибор не найден" });
    }

    await device.update({
      name,
      type,
      serialNumber,
      commissioningDate,
      calibrationInterval,
      currentStatus,
      devicePhoto
    });

    res.status(200).json(device);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при обновлении прибора", error: error.message });
  }
};

//Удаление прибора
const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Device.findByPk(id);

    if (!device) {
      return res.status(404).json({ message: "Прибор не найден" });
    }

    await device.destroy();
    res.status(200).json({ message: "Прибор успешно удален" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Проблема при удалении прибора", error: error.message });
  }
};

//Отображение списка приборов с фильтрацией по статусу
const getDevices = async (req, res) => {
  try {
    const { status } = req.query; // Получаем параметр статус из запроса
    const devices = status
      ? await Device.findAll({ where: { currentStatus: status } })
      : await Device.findAll();

    res.status(200).json(devices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при загрузке устройств", error: error.message });
  }
};

//Просмотр подробной информации о приборе (включая историю поверок и калибровок)
const getDeviceDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Device.findByPk(id);

    if (!device) {
      return res.status(404).json({ message: "Прибор не найден" });
    }

    const calibrationHistory = await CalibrationHistory.findAll({
      where: { deviceId: id },
    });
    const calibrationData = await CalibrationData.findAll({
      where: { deviceId: id },
    });

    res.status(200).json({ device, calibrationHistory, calibrationData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при загрузке устройств", error: error.message });
  }
};

module.exports = {
  addDevice,
  updateDevice,
  deleteDevice,
  getDevices,
  getDeviceDetails,
};
