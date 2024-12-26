const { Device } = require('../models/models'); // Импортируем только модель Device
const sequelize = require('../config/config'); // Путь к вашему конфигу

async function seedDevices() {
  const devices = [
    {
      name: 'Микрометр',
      type: 'Калибровочные приборы',
      serialNumber: 'TS-12345',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 10, 
      currentStatus: 'Operational',
      devicePhoto: '1.jpg'
    },
    {
      name: 'Штангенциркуль',
      type: 'Калибровочные приборы',
      serialNumber: 'TS-1245',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 8, 
      currentStatus: 'Operational',
      devicePhoto: '2.png'
    },
    {
      name: 'Термометр',
      type: 'Цифровые измерительные приборы',
      serialNumber: 'TS-1235',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 4, 
      currentStatus: 'Operational',
      devicePhoto: '3.jpg'
    },
    {
      name: 'Осциллографов',
      type: 'Цифровые измерительные приборы',
      serialNumber: 'TS-132345',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 1, 
      currentStatus: 'Operational',
      devicePhoto: '4.jpg'
    },
    {
      name: 'Весы',
      type: 'Физические устройства',
      serialNumber: 'TS-122345',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 2, 
      currentStatus: 'Operational',
      devicePhoto: '5.jpg'
    },
    {
      name: 'Барометр',
      type: 'Физические устройства',
      serialNumber: 'TS-1225',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 14, 
      currentStatus: 'Operational',
      devicePhoto: '6.jpg'
    },
    {
      name: 'Микроскоп',
      type: 'Физические устройства',
      serialNumber: 'TS-15',
      commissioningDate: new Date('2023-01-15'),
      calibrationInterval: 6, 
      currentStatus: 'Operational',
      devicePhoto: '7.jpg'
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
