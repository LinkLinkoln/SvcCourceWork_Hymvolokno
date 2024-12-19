const { RepairRequest } = require("../models/models");

// Создание новой заявки на ремонт
const createRepairRequest = async (req, res) => {
  try {
    const { deviceId, problemDescription, responsible } = req.body;

    if (!deviceId || !problemDescription || !responsible) {
      return res
        .status(400)
        .json({ message: "Все поля обязательны для заполнения" });
    }

    // Создаем новую заявку
    const newRepairRequest = await RepairRequest.create({
      deviceId,
      requestDate: new Date(),
      problemDescription,
      status: "В ожидании", // Начальный статус заявки
      responsible,
    });

    res.status(201).json({
      message: "Заявка на ремонт успешно создана",
      repairRequest: newRepairRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при создании заявки", error: error.message });
  }
};
// Отслеживание статуса заявки на ремонт
const getRepairRequestStatus = async (req, res) => {
  try {
    const { id } = req.params; // id заявки

    const repairRequest = await RepairRequest.findByPk(id);

    if (!repairRequest) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    res
      .status(200)
      .json({ message: "Статус заявки", status: repairRequest.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при отслеживании статуса заявки",
      error: error.message,
    });
  }
};
// Обновление статуса заявки
const updateRepairRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Проверяем, что статус передан
    if (!status) {
      return res
        .status(400)
        .json({ message: "Необходимо указать новый статус" });
    }

    const repairRequest = await RepairRequest.findByPk(id);

    if (!repairRequest) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    // Обновляем статус заявки
    repairRequest.status = status;
    await repairRequest.save();

    res.status(200).json({ message: "Статус заявки обновлен", repairRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при обновлении статуса заявки",
      error: error.message,
    });
  }
};

module.exports = {
  createRepairRequest,
  getRepairRequestStatus,
  updateRepairRequestStatus,
};
