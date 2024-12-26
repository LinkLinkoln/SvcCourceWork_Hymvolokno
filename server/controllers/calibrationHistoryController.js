const { CalibrationHistory, Device, Employee } = require("../models/models");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
const os = require("os");
const ExcelJS = require("exceljs");

const addCalibrationHistory = async (req, res) => {
  try {
    const { deviceId, calibrationDate, result, document } = req.body;

    const device = await Device.findByPk(deviceId);
    if (!device) {
      return res.status(404).json({ message: "Прибор не найден" });
    }

    const newHistory = await CalibrationHistory.create({
      deviceId,
      calibrationDate,
      result,
      document,
    });

    res.status(201).json(newHistory);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при добавлении записи о поверке",
      error: error.message,
    });
  }
};

const searchCalibrationHistory = async (req, res) => {
  try {
    const { deviceId, startDate, endDate, result } = req.query;

    const filters = {};
    if (deviceId) filters.deviceId = deviceId;
    if (startDate && endDate)
      filters.calibrationDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    if (result) filters.result = { [Op.like]: `%${result}%` };

    const historyRecords = await CalibrationHistory.findAll({
      where: filters,
      include: [Device], // Для получения данных о приборе
    });

    res.status(200).json(historyRecords);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при поиске по истории поверок",
      error: error.message,
    });
  }
};

const generateCalibrationReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Необходимо указать startDate и endDate" });
    }

    const historyRecords = await CalibrationHistory.findAll({
      where: {
        calibrationDate: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      include: [Device], // Включаем данные о приборе
    });

    if (historyRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "Нет данных по поверкам за указанный период" });
    }

    // Создаем новый Excel файл
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Calibration Report");

    // Настройка колонок и стилей
    sheet.columns = [
      {
        header: "ID",
        key: "id",
        width: 10,
        style: { alignment: { horizontal: "center" } },
      },
      {
        header: "Device Name",
        key: "deviceName",
        width: 30,
        style: { alignment: { horizontal: "left" } },
      },
      {
        header: "Calibration Date",
        key: "calibrationDate",
        width: 20,
        style: { alignment: { horizontal: "center" } },
      },
      {
        header: "Result",
        key: "result",
        width: 20,
        style: { alignment: { horizontal: "center" } },
      },
      {
        header: "Document",
        key: "document",
        width: 30,
        style: { alignment: { horizontal: "left" } },
      },
    ];

    // Стиль для заголовков
    sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFF" } };
    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4F81BD" },
    };
    sheet.getRow(1).alignment = { horizontal: "center", vertical: "middle" };

    // Добавляем строки с данными
    historyRecords.forEach((record) => {
      sheet.addRow({
        id: record.id,
        deviceName: record.Device.name,
        calibrationDate:
          record.calibrationDate instanceof Date && !isNaN(calibrationDate)
            ? record.calibrationDate.toISOString().split("T")[0] // Преобразуем дату в формат YYYY-MM-DD
            : "Invalid Date", // Если дата некорректна
        result: record.result,
        document: record.document ? record.document : "No document", // Если документ отсутствует, ставим "No document"
      });
    });

    // Стилизация таблицы (четные строки будут светло-серыми)
    sheet.eachRow((row, rowNum) => {
      if (rowNum % 2 === 0) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "F2F2F2" },
          }; // Цвет для четных строк
        });
      }
    });

    // Добавление границ вокруг ячеек
    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Получаем путь к папке "Загрузки" пользователя
    const downloadDir = path.join(os.homedir(), "Downloads");

    // Создаем путь к файлу для сохранения в папку "Загрузки"
    const filePath = path.join(
      downloadDir,
      `calibration_report_${Date.now()}.xlsx`
    );

    await workbook.xlsx.writeFile(filePath);

    // Отправка файла на скачивание
    res.status(200).download(filePath, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
      }
      fs.unlinkSync(filePath); // Удаляем файл после скачивания
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при генерации отчета", error: error.message });
  }
};

module.exports = {
  addCalibrationHistory,
  searchCalibrationHistory,
  generateCalibrationReport,
};
