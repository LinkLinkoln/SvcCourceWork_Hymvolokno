import React, { useState } from "react";
import "./clientMain.css";
import icon1 from "../../../img/icons/event.png";
import icon2 from "../../../img/icons/cart.png";
import icon3 from "../../../img/icons/book.png";
import icon4 from "../../../img/icons/review.png";
import LogoutModal from "../modal/exitAccountModal/logoutModal";
import Cookies from "js-cookie";
import { Button } from "@mui/material"; 
import EditClientModal from "../../_components/modal/clientModal/clientModal";

const ClientMain = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const userid = localStorage.getItem("id");

  const handleToggleLogoutModal = () => {
    setOpenLogoutModal((prev) => !prev);
  };

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleToggleEditClientModal = () => {
    setOpenEditClientModal((prev) => !prev);
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
          <a href="/DeviceList">
            <img alt="icon" src={icon2}></img>
          </a>
          <div className="blockText">
            <a href="/DeviceList">СПИСОК ПРИБОРОВ</a>
            <p>Рассчитать параметры для ваших измерений (в один клик)</p>
          </div>
        </div>
        <div className="block">
          <a onClick={handleToggleEditClientModal}>
            <img alt="icon" src={icon3}></img>
          </a>
          <div className="blockText">
            <a onClick={handleToggleEditClientModal} >ИНФОРМАЦИЯ</a>
            <p>Просмотр информации о пользователе</p>
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
          <a href="/client/Documents">
            <img alt="icon" src={icon4}></img>
          </a>
          <div className="blockText">
            <a href="/client/Documents">Список документов</a>
            <p>Просмотреть список документов</p>
          </div>
        </div>
      </div>
        <EditClientModal clientId={userid} open={openEditClientModal} onClose={handleToggleEditClientModal} />

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
