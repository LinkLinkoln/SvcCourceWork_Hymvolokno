import React, { useState } from "react";
import "./clientMain.css";
import icon1 from "../../../img/icons/event.png";
import icon2 from "../../../img/icons/cart.png";
import icon3 from "../../../img/icons/book.png";
import icon4 from "../../../img/icons/review.png";
import LogoutModal from "../modal/exitAccountModal/logoutModal";
import Cookies from "js-cookie";
import { Button } from "@mui/material"; 

const ClientMain = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleToggleLogoutModal = () => {
    setOpenLogoutModal((prev) => !prev);
  };

  const handleLogOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    Cookies.remove("refreshToken");
  };

  return (
    <div>
      <div className="clientContainer">
        <div className="block">
          <a href="/cart">
            <img alt="icon" src={icon2}></img>
          </a>
          <div className="blockText">
            <a href="/cart">СПИСОК УСЛУГ</a>
            <p>Рассчитать параметры для ваших измерений (в один клик)</p>
          </div>
        </div>
        <div className="block">
          <a href="/client/orderHistory">
            <img alt="icon" src={icon3}></img>
          </a>
          <div className="blockText">
            <a href="/client/orderHistory">ИСТОРИЯ ИЗМЕРЕНИЙ</a>
            <p>Просмотр истории измерений и параметров</p>
          </div>
        </div>
        <div className="block">
          <a href="/client/current">
            <img alt="icon" src={icon3}></img>
          </a>
          <div className="blockText">
            <a href="/client/current">ТЕКУЩИЕ ИЗМЕРЕНИЯ</a>
            <p>Смотрите текущие процессы измерений</p>
          </div>
        </div>
        <div className="block">
          <button>
            <a href="/client/eventHistory">
              <img src={icon1} alt="icon"></img>
            </a>
          </button>
          <div className="blockText">
            <a className="modalTextClient" href="/client/eventHistory">
              СОБЫТИЯ ИЗМЕРЕНИЙ
            </a>
            <p>Просмотрите информацию о событиях и проверках</p>
          </div>
        </div>
        <div className="block">
          <a href="/client/addReview">
            <img alt="icon" src={icon4}></img>
          </a>
          <div className="blockText">
            <a href="/client/addReview">ОТЗЫВЫ О ПРИБОРАХ</a>
            <p>Добавьте отзыв по завершении измерений.</p>
          </div>
        </div>
      </div>

      {}
      <Button
        variant="contained"
        onClick={handleToggleLogoutModal}
        sx={{
          width: "200px",
          marginTop: "20px",
          marginBottom: "50px",
          fontSize: "15px",
          backgroundColor: "#2d3e50", 
          color: "#fff", 
          textTransform: "none", 
          padding: "12px 24px",
          borderRadius: "40px", 
          fontWeight: "bold", 
          transition: "background-color 0.3s ease", 
          "&:hover": {
            backgroundColor: "#003366", 
          },
          display: "block", 
          marginLeft: "auto", 
          marginRight: "auto", 
        }}

      >
        Вернуться на главную
      </Button>

      <LogoutModal
        open={openLogoutModal}
        handleClose={handleToggleLogoutModal}
        onLogout={handleLogOut}
      />
    </div>
  );
};

export default ClientMain;
