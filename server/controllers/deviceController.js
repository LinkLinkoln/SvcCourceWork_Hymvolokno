const {
  Device,
  CalibrationHistory,
  CalibrationData,
} = require("../models/models");

const fs = require("fs");
const os = require("os");
const ExcelJS = require("exceljs");
const path = require("path");

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

const downloadDeviceHistory = async (req, res) => {
  try {
    const devices = await Device.findAll({
      attributes: [
        "name", 
        "type", 
        "serialNumber", 
        "commissioningDate", 
        "calibrationInterval", 
        "currentStatus",
      ],
    });

    const deviceDetails = devices.map(device => ({
      name: device.name || "",
      type: device.type || "",
      serialNumber: device.serialNumber || "",
      commissioningDate: device.commissioningDate
        ? device.commissioningDate.toLocaleDateString()
        : "",
      calibrationInterval: device.calibrationInterval || 0,
      currentStatus: device.currentStatus || "",
    }));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Device History");

    worksheet.mergeCells("A1:G1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "Device History Report";
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };

    worksheet.mergeCells("A2:G2");
    const dateCell = worksheet.getCell("A2");
    dateCell.value = `Report Date: ${new Date().toLocaleDateString()}`;
    dateCell.font = { size: 12, italic: true };
    dateCell.alignment = { horizontal: "center", vertical: "middle" };

    worksheet.columns = [
      { key: "name", width: 30 },
      { key: "type", width: 20 },
      { key: "serialNumber", width: 25 },
      { key: "commissioningDate", width: 20 },
      { key: "calibrationInterval", width: 20 },
      { key: "currentStatus", width: 25 },
    ];

    const headers = [
      "Device Name",
      "Type",
      "Serial Number",
      "Commissioning Date",
      "Calibration Interval (days)",
      "Current Status",
    ];

    headers.forEach((header, index) => {
      const cell = worksheet.getCell(3, index + 1);
      cell.value = header;
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "add8e6" } };
    });

    deviceDetails.forEach((device, index) => {
      const row = worksheet.addRow(device);
      row.alignment = { vertical: "middle" };
      if (index % 2 === 0) {
        row.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "add8e6" } };
      }
    });

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    const downloadsPath = path.join(os.homedir(), "Downloads");
    const filePath = path.join(downloadsPath, "device_history.xlsx");

    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, "device_history.xlsx", (err) => {
      if (err) {
        console.error("Download error:", err.message);
        res.status(500).send("Error downloading file.");
      }
      fs.unlinkSync(filePath); // Delete the file after download
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating report.");
  }
};



module.exports = {
  addDevice,
  updateDevice,
  deleteDevice,
  getDevices,
  getDeviceDetails,
  downloadDeviceHistory
};
