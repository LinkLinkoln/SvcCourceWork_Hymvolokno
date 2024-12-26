import React, { useEffect, useState } from "react";
import { getDevices, getDivecePhotoUrl, downloadDeviceHistoryReport } from "../../../api/deviceApi/deviceApi";
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
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { saveAs } from "file-saver";
import * as docx from "docx";


const DeviceTable = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCard, setOpenCard] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);

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
    setOpenCard(true);
  };

  const handleCardClose = () => {
    setOpenCard(false);
    setSelectedDevice(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const generateTextReport = () => {
    const reportContent = devices
      .map(
        (device) =>
          `Name: ${device.name}, Type: ${device.type}, Serial: ${device.serialNumber}, Status: ${device.currentStatus}`
      )
      .join("\n");
    const blob = new Blob([reportContent], { type: "text/plain" });
    saveAs(blob, "device_report.txt");
  };
  
  const generateWordReport = async () => {
    const doc = new docx.Document({
      sections: [
        {
          children: devices.map(
            (device, index) =>
              new docx.Paragraph(
                `${index + 1}. Name: ${device.name}, Type: ${device.type}, Serial: ${device.serialNumber}`
              )
          ),
        },
      ],
    });
    const blob = await docx.Packer.toBlob(doc);
    saveAs(blob, "device_report.docx");
  };
  
  

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedDevices = () => {
    if (!orderBy) return devices;
    return devices.slice().sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (order === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  const handleDownloadReport = async () => {
    const result = await downloadDeviceHistoryReport();
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "device_history.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ width: "100%", padding: 0, marginBottom: 4, marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
        Device List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadReport}
        sx={{ marginBottom: 2 }}
      >
        Download Device History Report
      </Button>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Button variant="contained" color="secondary" onClick={generateTextReport}>
          Generate Text Report
        </Button>
        <Button variant="contained" color="success" onClick={generateWordReport}>
          Generate Word Report
        </Button>

      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="device table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "commissioningDate"}
                  direction={orderBy === "commissioningDate" ? order : "asc"}
                  onClick={() => handleRequestSort("commissioningDate")}
                >
                  Commissioning Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "calibrationInterval"}
                  direction={orderBy === "calibrationInterval" ? order : "asc"}
                  onClick={() => handleRequestSort("calibrationInterval")}
                >
                  Calibration Interval
                </TableSortLabel>
              </TableCell>
              <TableCell>Current Status</TableCell>
              <TableCell>Device Photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDevices()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((device) => (
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
                      onClick={() => handleCardOpen(device)}
                      sx={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[6, 12, 18]}
          component="div"
          count={devices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openCard} onClose={handleCardClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: { xs: 20, sm: 26 },
            color: "#333",
            paddingBottom: 2,
          }}
        >
          Device Details
        </DialogTitle>
        <DialogContent
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 3,
          }}
        >
          {selectedDevice && (
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                boxShadow: 3,
                width: "100%",
              }}
            >
              <Avatar
                alt={selectedDevice.name}
                src={getDivecePhotoUrl(selectedDevice.devicePhoto)}
                sx={{
                  width: { xs: 100, sm: 150 },
                  height: { xs: 100, sm: 150 },
                  marginBottom: { xs: 2, sm: 0 },
                  marginRight: { xs: 0, sm: 3 },
                  border: "4px solid #1976d2",
                }}
              />
              <CardContent sx={{ textAlign: "left" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: "#333", mb: 1 }}>
                  {selectedDevice.name}
                </Typography>
                <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                  <strong>Тип:</strong> {selectedDevice.type}
                </Typography>
                <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                  <strong>Серийный номер:</strong> {selectedDevice.serialNumber}
                </Typography>
                <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                  <strong>Дата ввода в эксплуатацию:</strong> {selectedDevice.commissioningDate}
                </Typography>
                <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                  <strong>Интервал калибровки:</strong> {selectedDevice.calibrationInterval}
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  <strong>Текущий статус:</strong> {selectedDevice.currentStatus}
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
