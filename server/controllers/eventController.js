const Event = require("../models/Event");
const { Employee } = require("../models/models");

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

// Получение всех мероприятий клиента
const getEvents = async (req, res) => {
  try {
    const { employeeId } = req.query;
    const events = await Event.findAll({ where: { employeeId } });
    res.json(events);
  } catch (error) {
    handleError(res, error);
  }
};


// Добавление мероприятия
const addEvent = async (req, res) => {
  try {
    const { date, address } = req.body;

    // Проверяем, что для этой конкретной даты и адреса нет забронированного события
    const existingEvent = await Event.findOne({
      where: { date, address }
    });

    if (existingEvent) {
      return res.status(400).json({ message: "Date and address are already booked" });
    }

    // Создаем новое событие
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    handleError(res, error);
  }
};

// Редактирование мероприятия
const editEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const { date, ...rest } = req.body;

    // Проверка даты мероприятия
    const currentDate = new Date();
    const eventDate = new Date(event.date);
    const daysDifference = (eventDate - currentDate) / (1000 * 60 * 60 * 24);

    if (daysDifference < 5) {
      return res.status(400).json({
        message: "Event cannot be edited within 5 days of its start date",
      });
    }

    // Проверка наличия даты
    if (date && date !== event.date) {
      const existingEvent = await Event.findOne({ where: { date } });
      if (existingEvent)
        return res.status(400).json({ message: "Date is already booked" });
    }

    await event.update({ date, ...rest });
    res.json(event);
  } catch (error) {
    handleError(res, error);
  }
};

// Удаление мероприятия
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    await event.destroy();
    res.json({ message: "Event deleted" });
  } catch (error) {
    handleError(res, error);
  }
};


const getAllEvents = async (req, res) => {
  try {
    const { role } = req.query;  // Получаем роль из параметров запроса
    console.log(role);
    const events = await Event.findAll({
      include: {
        model: Employee,
        attributes: ["id", "name", "lastName", "email", "role"],
        where: {
          role: role ? [role] : ["client", "courier"],  // Если роль передана, фильтруем по ней
        },
      },
    });

    console.log("Events found:", events);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error); 
    res.status(500).json({ message: "Ошибка при загрузке событий." });
  }
};



module.exports = {
  getEvents,
  addEvent,
  editEvent,
  deleteEvent,
  getAllEvents
};
