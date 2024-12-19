const { Employee } = require('../models/models'); // Импортируем только нужную модель Employee
const sequelize = require('../config/config'); // Путь к вашему конфигу

async function seedEmployees() {
  const employees = [
    {
      lastName: 'Doe',
      name: 'John',
      fatherName: 'Smith',
      position: 'Manager',
      phone: '123-56-7890',
      email: 'a@gmail.com',
      role: 'client',
      password: '123456', // Замените на безопасный хеш пароля
      
    },
    {
      lastName: 'Deoe',
      name: 'Joheeeen',
      fatherName: 'Smieeeeth',
      position: 'Manager',
      phone: '125-56-7890',
      email: 'aa@gmail.com',
      role: 'courier',
      password: '123456', // Замените на безопасный хеш пароля
      
    }
  ];

  try {
    await sequelize.sync(); // Убедитесь, что все таблицы созданы
    await Employee.bulkCreate(employees); // Заполняем таблицу сотрудников
    console.log('Employee table has been populated successfully.');
  } catch (error) {
    console.error('Error populating Employee table:', error);
  }
}

// Экспорт функции
module.exports = seedEmployees;
