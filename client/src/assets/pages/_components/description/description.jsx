import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Delivery from "../../../img/icons/delivery.png";
import Plant from "../../../img/icons/plant.png";
import Talk from "../../../img/icons/talk.png";
import Heart from "../../../img/icons/heart.png";

// Переменные для описаний
const descriptions = [
  {
    image: Delivery,
    title: "ДОСТАВКА СЛЕДУЮЩЕГО ДНЯ",
    text: "Точное и своевременное предоставление измерительных приборов и оборудования, доступное до 15:00 ежедневно.",
  },
  {
    image: Plant,
    title: "СОВРЕМЕННЫЕ ИНСТРУМЕНТЫ И ТЕХНОЛОГИИ",
    text: "Мы предоставляем самое передовое оборудование для точных измерений в любой отрасли.",
  },
  {
    image: Talk,
    title: "НЕПРЕВЗОШЕННОЕ ОБСЛУЖИВАНИЕ",
    text: "Поддержка на всех этапах работы — от консультирования до точной настройки приборов.",
  },
  {
    image: Heart,
    title: "НАВИГАЦИЯ ПО РЕШЕНИЯМ",
    text: "Интуитивно понятный интерфейс для мониторинга и настройки оборудования, адаптированного под потребности вашего бизнеса.",
  },
];

const Description = () => {
  return (
    <div className="descriptionContainer">
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        justifyContent="space-around"
        gap={2} // Используем gap для отступов между карточками
      >
        {descriptions.map((item, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: "100%", sm: "45%", md: "22%" }, // Ширина карточки
              display: "flex",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Тень для карточек
              backgroundColor: "#f7f7f7", // Легкий серый фон
              borderRadius: "10px", // Закругленные углы
              overflow: "hidden", // Чтобы содержимое не выходило за края
              transition: "transform 0.3s, box-shadow 0.3s", // Эффект при наведении
              "&:hover": {
                transform: "translateY(-10px)", // Подъем карточки при наведении
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)", // Увеличение тени
              },
            }}
          >
            <CardMedia
              component="img"
              height="40" // Поддержим визуальный стиль для иконок
              image={item.image}
              alt={item.title}
              sx={{
                width: "40px",
                height: "40px",
                margin: "20px",
                objectFit: "contain", // Убедимся, что изображения не искажаются
              }}
            />
            <CardContent sx={{ padding: "15px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: "16px",
                  color: "#2c3e50", // Темно-синий для текста заголовка
                  fontWeight: "bold", // Добавим жирное начертание
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  color: "#7f8c8d", // Слегка приглушенный цвет для текста
                  lineHeight: 1.5,
                }}
              >
                {item.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Description;
