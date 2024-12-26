import React, { useState } from "react";
import { Button, Card, CardContent, Grid, Typography, IconButton, } from "@mui/material";
import icon1 from "../../../../img/icons/user.png";
import icon2 from "../../../../img/icons/order.png";
import icon4 from "../../../../img/icons/delivery.png";
import LogoutModal from "../../modal/exitAccountModal/logoutModal";
import Cookies from "js-cookie";
import EditClientModal from "../../modal/clientModal/clientModal";

const AdminMain = () => {

  /* Модальное окно для выхода */
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const handleToggleLogoutModal = () => setOpenLogoutModal((prev) => !prev);

  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const userid = localStorage.getItem("id");

  const handleLogOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    Cookies.remove("refreshToken");
  };

  const handleToggleEditClientModal = () => {
    setOpenEditClientModal((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              <IconButton onClick={handleToggleEditClientModal}>
                <img src={icon1} alt="icon" style={{ width: "50px", height: "50px" }} />
              </IconButton>
              <Typography variant="h6">
                Информация администратора
              </Typography>
              <Typography variant="body2">Инфо</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              <a href="/AdminDeviceList">
                <IconButton>
                  <img alt="icon" src={icon2} style={{ width: "50px", height: "50px" }} />
                </IconButton>
              </a>
              <Typography variant="h6" gutterBottom>
                Список доступных приборов
              </Typography>
              <Typography variant="body2">Добавить или удалить приборы</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              <a href="/AdminEvents">
                <IconButton>
                  <img alt="icon" src={icon4} style={{ width: "50px", height: "50px" }} />
                </IconButton>
              </a>
              <Typography variant="h6" gutterBottom>
                Запросы пользователей
              </Typography>
              <Typography variant="body2">Запросы пользователей на калибровку</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      <EditClientModal clientId={userid} open={openEditClientModal} onClose={handleToggleEditClientModal} />

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px", width: "100%" }}
        onClick={handleToggleLogoutModal}
      >
        Back to Home
      </Button>

      {/* Logout Modal */}
      <LogoutModal
        open={openLogoutModal}
        handleClose={handleToggleLogoutModal}
        onLogout={handleLogOut}
      />

    </div>
  );
};

export default AdminMain;
