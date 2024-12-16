import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Divider, Link, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./header.css";
import Logo from "../../../img/logo.png";
import MapModal from "../../_components/modal/mapModal/mapModal";
import EditClientModal from "../../_components/modal/clientModal/clientModal";
import EditCourierModal from "../../_components/modal/courierModal/courierModal";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditCourierModal, setOpenEditCourierModal] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
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
          flexWrap: "wrap",  // Allow flex items to wrap for small screens
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
          className={`auth-section ${userRole === "client" || userRole === "courier" ? "highlight" : ""}` }
          sx={{   marginRight: "500px" }}
        >
          {userRole === "client" || userRole === "courier" ? (
            <>
              <Typography variant="body2" color="white" >
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

      {userRole !== "courier" && (
        <Box
          className="navigation-links"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: "#fff",
            padding: "20px 0px",
            borderTop: "1px solid #ddd",
            flexWrap: "wrap", // Wrap links on small screens
          }}
        >
          <Link className="nav-item" href="/" underline="hover" color="#806044" sx={{ paddingRight: "20px", marginLeft: "20px" }}>
            Main
          </Link>
          <Link className="nav-item" href="/dishes" underline="hover" color="#806044" sx={{ paddingRight: "20px" }}>
            Dishes
          </Link>
          <Link
            className="nav-item"
            href={userRole === "client" ? "/client" : "/reviews"}
            underline="hover"
            color="#806044"
            sx={{ paddingRight: "20px" }}
          >
            {userRole === "client" ? "Cabinet" : "Reviews"}
          </Link>
          <Link className="nav-item" href="/event" underline="hover" color="#806044" sx={{ paddingRight: "20px" }}>
            Events
          </Link>
          <Link
            className="nav-item"
            underline="hover"
            onClick={handleToggleModal}
            color="#806044"
            sx={{
              display: { xs: "none", md: "block" },
              paddingRight: "20px",
            }}
          >
            Map
          </Link>
        </Box>
      )}
    </header>
  );
};

export default Header;
