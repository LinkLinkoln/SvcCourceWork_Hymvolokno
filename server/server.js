const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
const sequelize = require("./config/config.js");
const deviceRoutes = require("./routes/deviceRoute");
const calibrationRoutes = require("./routes/calibrationScheduleRoute");
const calibrationHistoryRoutes = require("./routes/calibrationHistoryRoute");
const employeeyRoutes = require("./routes/employeeRoutes");
const regulatoryDocumentRouter = require("./routes/regulatoryDocumentRoutes.js");
const repairRequestRoutes = require("./routes/repairRequestRoutes");
const eventRoutes = require("./routes/eventRoutes.js")
const subscribeRoutes = require ("./routes/emailSendNotificationRoutes.js");
const UserSeed = require("./seed/UserSeed.js")
const DeviceSeed = require("./seed/DeviceSeed.js")
const DocumentSeed = require("./seed/DocumentSeed.js")
const EventSeed = require("./seed/EventSeed.js")
require("dotenv").config();


app.use(fileUpload());

app.use(express.json());
app.use("/api/static", express.static(path.join(__dirname, "static")));
app.use("/api/files", express.static(path.join(__dirname, "files")));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.post('/api/devices/upload-photo', (req, res) => {
  if (!req.files || !req.files.devicePhoto) {
    return res.status(400).send("No photo uploaded.");
  }

  const photo = req.files.devicePhoto;
  const uploadPath = path.join(__dirname, 'static', photo.name);

  photo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ filePath: `/api/static/${photo.name}` });
  });
});

app.use("/api/", subscribeRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/calibrationSchedules", calibrationRoutes);
app.use("/api/calibrationHistories", calibrationHistoryRoutes);
app.use("/api/employees", employeeyRoutes);
app.use("/api/regulatoryDocuments", regulatoryDocumentRouter);
app.use("/api/repairRequests", repairRequestRoutes);
app.use("/api/events", eventRoutes)



const start = async()=> { 
  await sequelize.sync({ force: true }) 
            .then(() => { 
                console.log("Tables were created!"); 
            }) 
            .catch((error) => { 
                console.error("Error creating tables: ", error); 
            });
  await UserSeed()   
  await DeviceSeed()
  await DocumentSeed()
  await EventSeed()
} 


// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

start();