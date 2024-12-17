const sequelize = require('../config/config'); // Path to your config
const User = require('../models/Technician.js'); // Path to your model (adjust as needed)

async function seedUsers() {
  const users = [
    {
      lastname: 'Doe',
      name: 'John',
      fathername: 'Michael',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      vehicletype: 'Sedan',
      available: true,
      password: '123', // Ensure this is a hashed password
    },
    {
      lastname: 'Smith',
      name: 'Jane',
      fathername: 'Alice',
      phone: '987-654-3210',
      email: 'jane.smith@example.com',
      vehicletype: 'SUV',
      available: true,
      password: 'hashedpassword2', // Ensure this is a hashed password
    },
    {
      lastname: 'Brown',
      name: 'Charlie',
      fathername: 'David',
      phone: '555-123-4567',
      email: 'charlie.brown@example.com',
      vehicletype: 'Truck',
      available: false,
      password: 'hashedpassword3', // Ensure this is a hashed password
    },
    {
      lastname: 'Taylor',
      name: 'Sarah',
      fathername: 'Emma',
      phone: '555-765-4321',
      email: 'sarah.taylor@example.com',
      vehicletype: 'Hatchback',
      available: true,
      password: 'hashedpassword4', // Ensure this is a hashed password
    },
  ];

  try {
    await sequelize.sync(); // Ensure all tables are created
    await User.bulkCreate(users); // Bulk create users
    console.log('Users table has been populated successfully.');
  } catch (error) {
    console.error('Error populating Users table:', error);
  }
}

// Export the function
module.exports = seedUsers;
