const Event = require('../models/Event'); 
const { Employee } = require('../models/models'); 
const sequelize = require('../config/config'); // Путь к вашему конфигу

async function seedEvents() {
  const employees = await Employee.findAll();
  
  // Логируем всех сотрудников
  console.log('Employees:', employees);

  if (employees.length === 0) {
    console.log('No employees found. Please add employees first.');
    return;
  }

  const events = [
    {
      employeeId: employees[0].id, // Начнем с первого сотрудника (index 0)
      date: new Date('2023-05-20'),
      address: 'Москва, ул. Пушкина, д. 10',
      message: 'Проведение калибровки осциллографа.',
      phone: '+7 900 123-45-67',
    },
    {
      employeeId: employees[0].id, // Первый сотрудник
      date: new Date('2023-06-10'),
      address: 'Санкт-Петербург, ул. Ленина, д. 5',
      message: 'Проверка термометра на точность.',
      phone: '+7 900 234-56-78',
    },
    {
      employeeId: employees[0].id, // Первый сотрудник
      date: new Date('2023-07-15'),
      address: 'Казань, ул. Горького, д. 12',
      message: 'Калибровка микрометра.',
      phone: '+7 900 345-67-89',
    },
    {
      employeeId: employees[0].id, // Первый сотрудник
      date: new Date('2023-08-01'),
      address: 'Екатеринбург, ул. Чапаева, д. 3',
      message: 'Обслуживание штангенциркуля.',
      phone: '+7 900 456-78-90',
    },
    {
      employeeId: employees[2].id, // Первый сотрудник
      date: new Date('2023-09-10'),
      address: 'Новосибирск, ул. Советская, д. 8',
      message: 'Замена батарей в осциллографах.',
      phone: '+7 900 567-89-01',
    },
  ];

  try {
    await sequelize.sync(); // Проверяем синхронизацию с базой
    await Event.bulkCreate(events); // Заполняем таблицу событий
    console.log('Event table has been populated successfully.');
  } catch (error) {
    console.error('Error populating Event table:', error);
  }
}

module.exports = seedEvents;
