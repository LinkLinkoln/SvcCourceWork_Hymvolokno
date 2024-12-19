const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

// Сотрудник
const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Employee",
    timestamps: false,
  }
);

// Приборы
const Device = sequelize.define(
  "Device",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    commissioningDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    calibrationInterval: {
      type: DataTypes.INTEGER, // Интервал в днях
      allowNull: false,
    },
    currentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    devicePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Device",
    timestamps: false,
  }
);

// График поверок EVENT
const CalibrationSchedule = sequelize.define(
  "CalibrationSchedule",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Device,
        key: "id",
      },
      allowNull: false,
    },
    nextCalibrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsible: {
      type: DataTypes.INTEGER,
      references: {
        model: Employee,
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    tableName: "CalibrationSchedule",
    timestamps: false,
  }
);

// История поверок
const CalibrationHistory = sequelize.define(
  "CalibrationHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Device,
        key: "id",
      },
      allowNull: false,
    },
    calibrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING, //путь к файлу
    },
  },
  {
    tableName: "CalibrationHistory",
    timestamps: false,
  }
);

// Нормативные документы
const RegulatoryDocument = sequelize.define(
  "RegulatoryDocument",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approvalDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    file: {
      type: DataTypes.STRING, //путь к файлу
    },
  },
  {
    tableName: "RegulatoryDocument",
    timestamps: false,
  }
);

// Калибровочные данные
const CalibrationData = sequelize.define(
  "CalibrationData",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Device,
        key: "id",
      },
      allowNull: false,
    },
    calibrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    results: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING, //путь к файлу
    },
  },
  {
    tableName: "CalibrationData",
    timestamps: false,
  }
);

// Токен
const Token = sequelize.define(
  "Token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Employee",
        key: "id",
      },
    },
    accessToken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Token",
  }
);

// Триггер для обновления updatedAt токена
Token.beforeUpdate((token) => {
  token.updatedAt = new Date();
});

// Заявки на ремонт
const RepairRequest = sequelize.define(
  "RepairRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Device,
        key: "id",
      },
      allowNull: false,
    },
    requestDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    problemDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsible: {
      type: DataTypes.INTEGER,
      references: {
        model: Employee,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "RepairRequest",
    timestamps: false,
  }
);

// Связи
Device.hasMany(CalibrationSchedule, { foreignKey: "deviceId" });
CalibrationSchedule.belongsTo(Device, { foreignKey: "deviceId" });

Employee.hasMany(CalibrationSchedule, { foreignKey: "responsible" });
CalibrationSchedule.belongsTo(Employee, { foreignKey: "responsible" });

Device.hasMany(CalibrationHistory, { foreignKey: "deviceId" });
CalibrationHistory.belongsTo(Device, { foreignKey: "deviceId" });

Device.hasMany(CalibrationData, { foreignKey: "deviceId" });
CalibrationData.belongsTo(Device, { foreignKey: "deviceId" });

Device.hasMany(RepairRequest, { foreignKey: "deviceId" });
RepairRequest.belongsTo(Device, { foreignKey: "deviceId" });

Employee.hasMany(RepairRequest, { foreignKey: "responsible" });
RepairRequest.belongsTo(Employee, { foreignKey: "responsible" });

Employee.hasOne(Token, { foreignKey: "employeeId" });
Token.belongsTo(Employee, { foreignKey: "employeeId" });

module.exports = {
  Device,
  CalibrationSchedule,
  CalibrationHistory,
  Employee,
  RegulatoryDocument,
  CalibrationData,
  RepairRequest,
  Token,
};
