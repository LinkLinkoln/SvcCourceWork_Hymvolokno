const express = require("express");
const router = express.Router();
const {
  createRepairRequest,
  getRepairRequestStatus,
  updateRepairRequestStatus,
} = require("../controllers/repairRequestController");

// Создание новой заявки на ремонт
router.post("/repair-request", createRepairRequest);

// Отслеживание статуса заявки
router.get("/repair-request/:id/status", getRepairRequestStatus);

// Обновление статуса заявки
router.put("/repair-request/:id/status", updateRepairRequestStatus);

module.exports = router;
