const path = require("path");
const fs = require("fs");
const { RegulatoryDocument } = require("../models/models");
const { Op } = require("sequelize");

// Функция для добавления нового нормативного документа с загрузкой файла
const addRegulatoryDocument = async (req, res) => {
  try {
    const { name, approvalDate, description } = req.body;
    const file = req.files?.file; // Получаем файл с клиента

    if (!file) {
      return res.status(400).json({ message: "Файл не загружен" });
    }

    // Получаем только имя файла с расширением
    const fileName = file.name;

    // Сохраняем файл на сервер
    const filePath = path.join(__dirname, "../files", fileName);
    file.mv(filePath, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Ошибка загрузки файла", error: err.message });
      }

      // Добавляем новый нормативный документ в базу данных
      const newDocument = await RegulatoryDocument.create({
        name,
        approvalDate,
        description,
        file: fileName, //Сохраняем только имя файла (без пути)
      });

      res
        .status(201)
        .json({ message: "Документ добавлен", document: newDocument });
    });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(500).json({
      message: "Ошибка при добавлении документа",
      error: error.message,
    });
  }
};

// Функция для получения всех нормативных документов
const getAllRegulatoryDocuments = async (req, res) => {
  try {
    const documents = await RegulatoryDocument.findAll();

    if (documents.length === 0) {
      return res.status(404).json({ message: "Нет доступных документов" });
    }

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при получении списка документов",
      error: error.message,
    });
  }
};

// Функция для поиска нормативного документа по названию
const searchRegulatoryDocumentByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Необходимо указать название документа" });
    }

    const document = await RegulatoryDocument.findOne({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    if (!document) {
      return res.status(404).json({ message: "Документ не найден" });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при поиске документа", error: error.message });
  }
};

module.exports = {
  addRegulatoryDocument,
  getAllRegulatoryDocuments,
  searchRegulatoryDocumentByName,
};
