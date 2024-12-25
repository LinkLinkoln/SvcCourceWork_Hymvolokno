const express = require("express");
const router = express.Router();
const {
  addRegulatoryDocument,
  getAllRegulatoryDocuments,
  searchRegulatoryDocumentByName,
} = require("../controllers/regulatoryDocumentController");

// Добавление документа
router.post("/", addRegulatoryDocument);
// Получение всех документов
router.get("/", getAllRegulatoryDocuments);
// Поиск документа по названию
router.get("/search", searchRegulatoryDocumentByName);

module.exports = router;
