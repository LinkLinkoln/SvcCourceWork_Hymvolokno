const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const { Employee } = require("./models"); // Импорт модели Employee

class Event extends Model {}

Event.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employeeId: { 
      type: DataTypes.INTEGER,
      references: { model: Employee, key: "id" }, 
      allowNull: false,
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    message: DataTypes.TEXT,
    phone: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Event",
    tableName: "Event",
    timestamps: false,
  }
);

Employee.hasMany(Event, { foreignKey: "employeeId" }); 
Event.belongsTo(Employee, { foreignKey: "employeeId" }); 

module.exports = Event;
