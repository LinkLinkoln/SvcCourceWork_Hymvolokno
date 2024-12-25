import React, { useState } from "react";
import { Button, Card, CardContent, Grid, Typography, IconButton, Dialog, DialogActions, DialogContent } from "@mui/material";
import icon1 from "../../../../img/icons/user.png";
import icon2 from "../../../../img/icons/order.png";
import icon3 from "../../../../img/icons/book.png";
import icon4 from "../../../../img/icons/delivery.png";
import LogoutModal from "../../modal/exitAccountModal/logoutModal";
import CourierInfoModal from "../../modal/courierModal/courierModal";
import Cookies from "js-cookie";

const CourierMain = () => {
  const userId = localStorage.getItem("id");

  /* Модальное окно для выхода */
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const handleToggleLogoutModal = () => setOpenLogoutModal((prev) => !prev);

  /* Модальное окно для информации */
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleToggleInfoModal = () => setOpenInfoModal((prev) => !prev);

  const handleLogOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    Cookies.remove("refreshToken");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              <IconButton onClick={handleToggleInfoModal}>
                <img src={icon1} alt="icon" style={{ width: "50px", height: "50px" }} />
              </IconButton>
              <Typography variant="h6" gutterBottom>
                Информация администратора
              </Typography>
              <Typography variant="body2">Инфо</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              <a href="/courier/availableDeliveries">
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
              <a href="/courier/currentDeliveries">
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
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              <a href="/courier/deliveryHistory">
                <IconButton>
                  <img alt="icon" src={icon3} style={{ width: "50px", height: "50px" }} />
                </IconButton>
              </a>
              <Typography variant="h6" gutterBottom>
                History of Deliveries
              </Typography>
              <Typography variant="body2">See history of your deliveries (with downloading)</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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

      {/* Info Modal */}
      <CourierInfoModal
        open={openInfoModal}
        onClose={handleToggleInfoModal}
        userId={userId}
      />
    </div>
  );
};

export default CourierMain;
