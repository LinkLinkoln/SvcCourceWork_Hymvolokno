import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./about.css";

const About = ({ title, description, moreInfo }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      className="aboutContainer"
      sx={{
        backgroundColor: "#eaf2f8", // светлый фон для страницы метрологии
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // легкая тень
        margin: "20px auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#34495e", // насыщенный цвет текста для заголовка
          marginBottom: "10px",
          "@media(max-width:500px)": {
            fontSize: "22px",
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          color: "#7f8c8d",
          fontSize: "16px",
          lineHeight: "1.8",
          marginBottom: "20px",
          "@media(max-width:500px)": {
            fontSize: "14px",
          },
        }}
      >
        {description}
      </Typography>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        sx={{
          backgroundColor: expanded ? "#d1f7ff" : "#ffffff", // измененный фон при раскрытии
          border: "1px solid #b0c4de", // более легкая граница
          borderRadius: "8px",
          "&:before": {
            display: "none", // скрыть линию MUI
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#34495e" }} />}
          sx={{
            color: "#2d3436",
            fontWeight: "500",
            justifyContent: "center",
            "& .MuiAccordionSummary-content": {
              justifyContent: "center",
              textAlign: "center",
            },
          }}
        >
          <Typography>
            {expanded ? "Скрыть детали" : "Показать детали"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography
              sx={{
                textAlign: "center",
                color: "#2c3e50",
                fontSize: "15px",
                lineHeight: "1.6",
                padding: "10px 0",
                transition: "opacity 0.5s ease",
              }}
            >
              {moreInfo}
            </Typography>
          </Collapse>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default About;
