import React, { useEffect, useState } from "react";
import { getDevices, getDivecePhotoUrl } from "../../../api/deviceApi/deviceApi";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Avatar, Box } from "@mui/material";

const DeviceTable = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>Device List</Typography>
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
                  <Avatar alt={device.name} src={getDivecePhotoUrl(device.devicePhoto)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DeviceTable;
