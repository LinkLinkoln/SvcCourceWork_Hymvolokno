import React, { useEffect, useState } from "react";
import { getDevices, getDivecePhotoUrl } from "../../../api/deviceApi/deviceApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const DeviceTable = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCard, setOpenCard] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleCardOpen = (device) => {
    setSelectedDevice(device);
    setOpenCard(true); // Открытие карточки
  };

  const handleCardClose = () => {
    setOpenCard(false); // Закрытие карточки
    setSelectedDevice(null); // Очистка выбранного устройства
  };

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Device List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="device table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Commissioning Date</TableCell>
              <TableCell>Calibration Interval</TableCell>
              <TableCell>Current Status</TableCell>
              <TableCell>Device Photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.id}</TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.type}</TableCell>
                <TableCell>{device.serialNumber}</TableCell>
                <TableCell>{device.commissioningDate}</TableCell>
                <TableCell>{device.calibrationInterval}</TableCell>
                <TableCell>{device.currentStatus}</TableCell>
                <TableCell>
                  <Avatar
                    alt={device.name}
                    src={getDivecePhotoUrl(device.devicePhoto)}
                    onClick={() => handleCardOpen(device)} // Открытие карточки при клике
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Диалоговое окно для отображения карточки с данными */}
      <Dialog open={openCard} onClose={handleCardClose} fullWidth maxWidth="sm">
  <DialogTitle sx={{ fontWeight: "bold", fontSize: 26, color: "#333", paddingBottom: 2 }}>
    Device Details
  </DialogTitle>
  <DialogContent sx={{ padding: 3 }}>
    {selectedDevice && (
      <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", boxShadow: 3 }}>
        <CardContent sx={{ textAlign: "center", paddingBottom: 3 }}>
          <Avatar
            alt={selectedDevice.name}
            src={getDivecePhotoUrl(selectedDevice.devicePhoto)}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: "4px solid #1976d2", // border around avatar for contrast
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#333", mb: 1 }}>
            {selectedDevice.name}
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
            <strong>Type:</strong> {selectedDevice.type}
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
            <strong>Serial Number:</strong> {selectedDevice.serialNumber}
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
            <strong>Commissioning Date:</strong> {selectedDevice.commissioningDate}
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
            <strong>Calibration Interval:</strong> {selectedDevice.calibrationInterval}
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 3 }}>
            <strong>Current Status:</strong> {selectedDevice.currentStatus}
          </Typography>
        </CardContent>
      </Card>
    )}
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center", paddingTop: 2 }}>
    <Button onClick={handleCardClose} color="primary" variant="contained" sx={{ textTransform: "none" }}>
      Close
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default DeviceTable;
