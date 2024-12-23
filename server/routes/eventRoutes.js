const express = require("express");
const router = express.Router();
const EventController = require("../controllers/eventController");

// Добавление мероприятия
router.post("/", EventController.addEvent);

// Редактирование мероприятия
router.put("/:id", EventController.editEvent);

// Удаление мероприятия
router.delete("/:id", EventController.deleteEvent);

router.get("/", EventController.getEvents);

router.get("/events", EventController.getAllEvents);


module.exports = router;
