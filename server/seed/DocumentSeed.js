const { RegulatoryDocument } = require('../models/models'); // Импортируем только модель Device
const sequelize = require('../config/config'); // Путь к вашему конфигу

async function seedDocuments() {
  const RegulatoryDocuments = [
    {
      name: 'Документ 1',
      approvalDate: new Date('2023-01-01'),
      description: 'Описание документа 1',
      file: 'document1.docx', 
    },
    {
      name: 'Документ 2',
      approvalDate: new Date('2023-01-01'),
      description: 'Описание документа 1',
      file: 'document2.docx', 
    },
    {
      name: 'Документ 3',
      approvalDate: new Date('2023-01-01'),
      description: 'Описание документа 1',
      file: 'document3.docx', 
    },
    {
      name: 'Документ 4',
      approvalDate: new Date('2023-01-01'),
      description: 'Описание документа 1',
      file: 'document4.docx', 
    },
    {
      name: 'Документ 5',
      approvalDate: new Date('2023-01-01'),
      description: 'Описание документа 1',
      file: 'document5.docx', 
    },
    {
      name: 'Документ 6',
      approvalDate: new Date('2023-01-01'),
      description: 'Описание документа 1',
      file: 'document6.docx', 
    },
  ];

  try {
    await sequelize.sync();
    await RegulatoryDocument.bulkCreate(RegulatoryDocuments);
    console.log('Device table has been populated successfully.');
  } catch (error) {
    console.error('Error populating Device table:', error);
  }
}

module.exports = seedDocuments;
