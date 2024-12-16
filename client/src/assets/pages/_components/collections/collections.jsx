import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Grid2";
import React from "react";
import "./collections.css";
import collection1 from "../../../img/collection/collection1.png";
import collection2 from "../../../img/collection/collection2.png";
import collection3 from "../../../img/collection/collection3.png";
import collection4 from "../../../img/collection/collection4.png";
import collection5 from "../../../img/collection/collection5.png";
import collection6 from "../../../img/collection/collection6.png";
import collection7 from "../../../img/collection/collection7.png";
import collection8 from "../../../img/collection/collection8.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f5f5f5", 
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.primary,
  borderRadius: "8px", 
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease", 
  "&:hover": {
    transform: "scale(1.05)", 
  },
}));

const Collections = () => {
  const collections = [
    { image: collection1, text: "Методики измерений" },
    { image: collection7, text: "Техники калибровки" },
    { image: collection3, text: "Инструменты для анализа" },
    { image: collection4, text: "Процесс измерений" },
    { image: collection5, text: "Интерфейсы приложений" },
    { image: collection6, text: "Обработка данных" },
    { image: collection2, text: "Последние обновления" },
    { image: collection8, text: "Корпоративные решения" },
  ];

  return (
    <div className="collectionsContainer">
      <p className="collections" style={{ fontSize: "24px", fontWeight: "bold", color: "#3E4E59" }}>
        НАШИ КОЛЛЕКЦИИ
      </p>
      <Grid2
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {collections.map((item, index) => (
          <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>
              <div style={{ textDecoration: "none", color: "#3E4E59" }}>
                <img
                  className="collectionPhoto"
                  src={item.image}
                  alt={item.text}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <p className="description" style={{ fontSize: "14px", color: "#3E4E59", marginTop: "10px" }}>
                  {item.text}
                </p>
              </div>
            </Item>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Collections;
