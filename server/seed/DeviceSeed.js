const { Device } = require('../models/models'); // Импортируем только модель Device
const sequelize = require('../config/config'); // Путь к вашему конфигу

async function seedDevices() {
  const devices = [
    {
      name: 'Temperature Sensor',
      type: 'Sensor',
      serialNumber: 'TS-12345',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 12, // Интервал в месяцах
      currentStatus: 'Operational',
    },
  ];

  try {
    await sequelize.sync(); // Убедитесь, что все таблицы созданы
    await Device.bulkCreate(devices); // Заполняем таблицу Device
    console.log('Device table has been populated successfully.');
  } catch (error) {
    console.error('Error populating Device table:', error);
  }
}

// Экспорт функции
module.exports = seedDevices;
