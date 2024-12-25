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
    {
      name: 'Temperature Sensor',
      type: 'Sensor',
      serialNumber: 'TS-1245',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 8, // Интервал в месяцах
      currentStatus: 'Operational',
    },
    {
      name: 'Temperature Sensor',
      type: 'Sensor',
      serialNumber: 'TS-1235',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 4, // Интервал в месяцах
      currentStatus: 'Operational',
    },
    {
      name: 'Temperature Sensor',
      type: 'Sensor',
      serialNumber: 'TS-132345',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 12, // Интервал в месяцах
      currentStatus: 'Operational',
    },
    {
      name: 'Ter',
      type: 'Sensor',
      serialNumber: 'TS-122345',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 12, // Интервал в месяцах
      currentStatus: 'Operational',
    },
    {
      name: 'Tempe',
      type: 'Sensor',
      serialNumber: 'TS-1225',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 12, // Интервал в месяцах
      currentStatus: 'Operational',
    },
    {
      name: 'Temperatur',
      type: 'Sensor',
      serialNumber: 'TS-15',
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
