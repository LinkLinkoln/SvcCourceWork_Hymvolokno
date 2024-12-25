import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Divider, Link, Typography, Slide } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu"; // Иконка для выезда меню
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Добавляем иконку выхода
import "./header.css";
import Logo from "../../../img/logo.png";
import MapModal from "../../_components/modal/mapModal/mapModal";
import EditClientModal from "../../_components/modal/clientModal/clientModal";
import EditCourierModal from "../../_components/modal/courierModal/courierModal";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditCourierModal, setOpenEditCourierModal] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const userid = localStorage.getItem("id");

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleToggleEditCourierModal = () => {
    setOpenEditCourierModal((prev) => !prev);
  };

  const handleToggleEditClientModal = () => {
    setOpenEditClientModal((prev) => !prev);
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <header>
      <Box
        className="announcement-bar"
        sx={{
          width: "100%",
          height: "40px",
          backgroundColor: "#f4f4f4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          NEXT DAY DELIVERY, MINIMUM $100 + GST
        </Typography>
      </Box>

      <Divider />

      <Box
        className="header-container"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#333",
          boxSizing: "border-box",
          flexWrap: "wrap",
        }}
      >
        <img
          className={`logo ${userRole === "client" || userRole === "courier" ? "logo-user" : ""}`}
          src={Logo}
          alt="Logo"
          style={{ height: "auto" }}
        />

        <div
          className={`search-container ${userRole === "client" || userRole === "courier" ? "search-user" : ""}`}
          style={{
            display: userRole === "courier" ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "5px 10px",
            width: "250px",
            margin: "10px 0",
          }}
        >
          {/* Search Input */}
        </div>

        <div
          className={`auth-section ${userRole === "client" || userRole === "courier" ? "highlight" : ""}`}
          sx={{ marginRight: "500px" }}
        >
          {userRole === "client" || userRole === "courier" ? (
            <>
              <Typography variant="body2" color="white">
                Welcome
              </Typography>
              <Link
                className="gotoAuthorization"
                onClick={userRole === "client" ? handleToggleEditClientModal : handleToggleEditCourierModal}
                underline="hover"
                color="white"
                sx={{
                  cursor: "pointer",
                  marginLeft: "px",
                  fontWeight: "bold",
                }}
              >
                My account
              </Link>
              <IconButton
                onClick={handleLogout}
                sx={{ color: "white", marginLeft: "16px" }}
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : (
            <a
              href="/login"
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              Login/SignUp
            </a>
          )}
        </div>

        <Box className="icons-container" sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleToggleMenu} sx={{ color: "white", marginRight: "16px" }}>
            <MenuIcon /> {/* Иконка для выезда меню */}
          </IconButton>

          <IconButton onClick={handleToggleModal} sx={{ color: "white", marginRight: "16px" }}>
            <MapIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              if (userRole === "client") {
                handleToggleEditClientModal();
              } else if (userRole === "courier") {
                handleToggleEditCourierModal();
              } else {
                navigate("/login");
              }
            }}
            sx={{ color: "white", marginRight: "16px" }}
          >
            <PersonIcon />
          </IconButton>

          {userRole === "client" && (
            <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
              <ShoppingCartIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Modal components */}
      <MapModal open={openModal} onClose={handleToggleModal} />
      {userRole === "client" && (
        <EditClientModal clientId={userid} open={openEditClientModal} onClose={handleToggleEditClientModal} />
      )}
      {userRole === "courier" && (
        <EditCourierModal open={openEditCourierModal} onClose={handleToggleEditCourierModal} />
      )}

      <Slide direction="left" in={menuOpen} mountOnEnter unmountOnExit>
        <Box
          className="navigation-icons"
          sx={{
            position: "absolute",
            top: "140px", // Отступ сверху, чтобы меню не перекрывало другие элементы
            right: "30px", // Размещение меню от правой стороны
            backgroundColor: "#333",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "row", // Горизонтальное выезжание
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            zIndex: 500
          }}
        >
          <IconButton component={Link} href="/" sx={{ color: "white", marginRight: "10px" }}>
            <MapIcon />
          </IconButton>
          <IconButton component={Link} href="/dishes" sx={{ color: "white", marginRight: "10px" }}>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton
            component={Link}
            href={
              userRole === "courier"
                ? "http://localhost:3000/courier"
                : userRole === "client"
                ? "/client"
                : "/reviews"
            }
            sx={{ color: "white", marginRight: "10px" }}
          >
            <PersonIcon />
          </IconButton>
          <IconButton component={Link} href="/event" sx={{ color: "white", marginRight: "10px" }}>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton component={Link} href="/map" sx={{ color: "white" }}>
            <MapIcon />
          </IconButton>
        </Box>
      </Slide>
    </header>
  );
};

export default Header;