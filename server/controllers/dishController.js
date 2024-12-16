const { Op } = require("sequelize");
const Dish = require("../models/Instrument.js");

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

// Добавление блюда
const addDish = async (req, res) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json(dish);
  } catch (error) {
    handleError(res, error);
  }
};

// Удаление блюда
const deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByPk(req.params.id);
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    await dish.destroy();
    res.json({ message: "Dish deleted" });
  } catch (error) {
    handleError(res, error);
  }
};

// // Фильтрация по категории
// const filterByCategory = async (req, res) => {
//   try {
//     const { category } = req.query;
//     const dishes = await Dish.findAll({ where: { category } });
//     res.json(dishes);
//   } catch (error) {
//     handleError(res, error);
//   }
// };

// // Фильтрация по цене
// const filterByPrice = async (req, res) => {
//   try {
//     const { minPrice, maxPrice } = req.query;
//     const dishes = await Dish.findAll({
//       where: { price: { [Op.between]: [minPrice, maxPrice] } },
//     });
//     res.json(dishes);
//   } catch (error) {
//     handleError(res, error);
//   }
// };

// // Фильтрация по требованиям
// const filterByRequirements = async (req, res) => {
//   try {
//     const { requirement } = req.query;
//     const dishes = await Dish.findAll({ where: { requirements: requirement } });
//     res.json(dishes);
//   } catch (error) {
//     handleError(res, error);
//   }
// };

// Получение информации по id
const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findByPk(req.params.id);
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    res.json(dish);
  } catch (error) {
    handleError(res, error);
  }
};

// Получение информации по имени
const getDishByName = async (req, res) => {
  try {
    const dish = await Dish.findOne({ where: { name: req.params.name } });
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    res.json(dish);
  } catch (error) {
    handleError(res, error);
  }
};

// Метод для получения отфильтрованных блюд
const getFilteredDishes = async (req, res) => {
  const { types, isvegan, isglutenfree, isdietary } = req.query;

  // Построение условий для запроса
  const whereConditions = {};

  if (types) {
    // Если types приходит как строка, разделенная запятыми
    const typeArray = Array.isArray(types) ? types : types.split(",");

    // Удаление пустых значений и проверка на "all"
    if (!typeArray.includes("All")) {
      whereConditions.type = {
        [Op.in]: typeArray,
      };
    }
  }

  // Фильтрация по диетическим требованиям
  if (isvegan === "true") {
    whereConditions.isvegan = true;
  }
  if (isglutenfree === "true") {
    whereConditions.isglutenfree = true;
  }
  if (isdietary === "true") {
    whereConditions.isdietary = true;
  }

  try {
    const dishes = await Dish.findAll({ where: whereConditions });
    res.json(dishes);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addDish,
  deleteDish,
  // filterByCategory,
  // filterByPrice,
  // filterByRequirements,
  getDishById,
  getDishByName,
  getFilteredDishes,
};
