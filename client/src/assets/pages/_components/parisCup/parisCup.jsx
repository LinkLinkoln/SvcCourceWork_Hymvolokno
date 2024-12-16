import React from "react";
import { Container } from "@mui/material";
import "./parisCup.css"; // Оставим файл стилей без изменений
import parisCup from "../../../img/paris_cup.png"; // Картинка не меняется

const MetrologyApp = () => {
  return (
    <Container
      sx={{
        paddingLeft: "0 !important",
        paddingRight: "0 !important",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "none !important",
        "@media (max-width:767px)": {
          flexDirection: "column-reverse",
        },
      }}
    >
      <div className="parisText">
        <p className="dynamic-text">Metrology Tools</p>
        <p>for precise measurements</p>
        <p>Discover our calibration services!</p>
        <a className="shopButton" href="/services">
          <p className="shopNow">EXPLORE NOW</p>
        </a>
      </div>
      <div className="parisPhoto">
        <img src={parisCup} alt="Metrology Equipment"></img>
      </div>
    </Container>
  );
};
export default MetrologyApp;
