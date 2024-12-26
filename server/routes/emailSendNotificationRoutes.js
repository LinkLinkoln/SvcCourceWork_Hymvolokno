const express = require("express");
const { subscribeUser } = require("../controllers/emailSendNotification");

const router = express.Router();

router.post("/subscribe", subscribeUser);

module.exports = router;
