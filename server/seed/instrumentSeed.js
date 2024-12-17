const sequelize = require('../config/config'); // Путь к вашему конфигу
const Dish = require('../models/Instrument'); // Путь к вашей модели

async function seedDishes() {
  const dishes = [
    {
      name: 'Vegan Salad',
      type: 'Salad',
      price: 9.99,
      photo: 'url_to_photo_1',
      isvegan: true,
      isglutenfree: true,
      isdietary: true,
    },
    {
      name: 'Chicken Alfredo',
      type: 'Pasta',
      price: 12.99,
      photo: 'url_to_photo_2',
      isvegan: false,
      isglutenfree: false,
      isdietary: false,
    },
    {
      name: 'Quinoa Bowl',
      type: 'Bowl',
      price: 10.49,
      photo: 'url_to_photo_3',
      isvegan: true,
      isglutenfree: true,
      isdietary: true,
    },
    {
      name: 'Cheese Burger',
      type: 'Burger',
      price: 11.49,
      photo: 'url_to_photo_4',
      isvegan: false,
      isglutenfree: false,
      isdietary: false,
    },
  ];

  try {
    await sequelize.sync(); // Убедитесь, что все таблицы созданы
    await Dish.bulkCreate(dishes);
    console.log('Dishes table has been populated successfully.');
  } catch (error) {
    console.error('Error populating Dishes table:', error);
  }
}

// Экспорт функции
module.exports = seedDishes;