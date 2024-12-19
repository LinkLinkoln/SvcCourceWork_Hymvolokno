const express = require("express");
const router = express.Router();
const {
  addRegulatoryDocument,
  getAllRegulatoryDocuments,
  searchRegulatoryDocumentByName,
  markCalibrationAsCompleted,
} = require("../controllers/regulatoryDocumentController");

// Добавление документа
router.post("/regulatory-documents", addRegulatoryDocument);
// Получение всех документов
router.get("/regulatory-documents", getAllRegulatoryDocuments);
// Поиск документа по названию
router.get("/regulatory-documents/search", searchRegulatoryDocumentByName);

module.exports = router;
