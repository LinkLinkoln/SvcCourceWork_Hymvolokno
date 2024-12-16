import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Grid, ButtonBase } from "@mui/material";
import './MainPageGrid.css';
import Settings from '../../../img/MainPageGridIcons/setting.png';
import LaunchForKey from '../../../img/MainPageGridIcons/flask.png';
import Check from '../../../img/MainPageGridIcons/check.png';
import Conveyor from '../../../img/MainPageGridIcons/conveyor-belt.png';
import Museum from '../../../img/MainPageGridIcons/museum.png';
import Automatization from '../../../img/MainPageGridIcons/robotics.png';
import Audit from '../../../img/MainPageGridIcons/audit.png';
import Customer from '../../../img/MainPageGridIcons/customer-service.png';
import Conference from '../../../img/MainPageGridIcons/conference.png';
import Forum from '../../../img/MainPageGridIcons/scientist.png';
import Buy from '../../../img/MainPageGridIcons/checklist.png';
import Presentation from '../../../img/MainPageGridIcons/presentation.png';

const services = [
  {
    icon: Settings, 
    title: "Квалификация лабораторного оборудования",
    description: "Квалификация / валидация любого лабораторного оборудования"
  },
  {
    icon: LaunchForKey, 
    title: "Запуск лабораторий (под ключ)",
    description: "Запуск физико-химических и микробиологических испытательных лабораторий"
  },
  {
    icon: Check, 
    title: "Проверка работоспособности приборов",
    description: "Поверка, аттестация, валидация, калификация приборов"
  },
  {
    icon: Conveyor, 
    title: "Собственное производство товаров для лабораторий",
    description: "ООО 'Научно-производственный центр 'Референс' является нашим производством инновационных товаров Беларуси"
  },
  {
    icon: Museum, 
    title: "Утверждение типа СИ",
    description: "Организация всех задач при утверждении типа средств измерений"
  },
  {
    icon: Automatization, 
    title: "Автоматизация лабораторий LIMS (ЛИМС)",
    description: "Автоматизация работы испытательных лабораторий"
  },
  {
    icon: Audit, 
    title: "Метрологический аудит",
    description: "Метрологический аудит с целью проверки соответствия законодательству"
  },
  {
    icon: Customer, 
    title: "Авторизованный сервисный центр",
    description: "Сервисное обслуживание и ремонт лабораторного оборудования"
  },
  {
    icon: Conference, 
    title: "LABORATORIKA",
    description: "Ежегодная международная конференция для работников лабораторий"
  },
  {
    icon: Forum, 
    title: "ПЕРВЫЙ МЕТРОЛОГИЧЕСКИЙ",
    description: "Ежегодный форум для метрологов"
  },
  {
    icon: Buy, 
    title: "Купить лабораторное оборудование",
    description: "Проект, посвященный продаже премиального лабораторного оборудования"
  },
  {
    icon: Presentation,
    title: "Центр обучения",
    description: "Проект, направленный на обучение специалистов"
  }
];

const ServiceText = () => {
  return (
    <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { xs: '25px', sm: '35px', md: '40px' },
          fontWeight: 'bold', 
          marginBottom: { xs: '15px', sm: '20px', md: '20px' },
          color: '#262626'
        }}
      >
        Мы специализируемся на испытательных лабораториях
      </Typography>
      <Typography 
        variant="h2" 
        sx={{ 
          fontSize: { xs: '12px', sm: '14px', md: '16px' },
          fontWeight: 'normal', 
          marginBottom: { xs: '50px', sm: '60px', md: '70px' },
          color: '#969696' 
        }}
      >
        И предоставляем широкий перечень услуг для наших клиентов
      </Typography>
    </Box>
  );
};

const ServiceCard = ({ icon, title, description }) => {
  return (
    <ButtonBase
      sx={{
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: "6%"

      }}

    >
      <Card
        sx={{
          maxWidth: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: 2,
          boxShadow: 3,
          height: '240px',
          transition: 'transform 0.3s ease', // Smooth transition for the transform effect
          '&:active': {
            transform: 'scale(0.98)', // Ensures smooth scaling on click
          },
        }}
      >
        <CardMedia
          component="img"
          image={icon}
          alt={title}
          sx={{
            width: { xs: 50, sm: 60, md: 90 }, // Adjust the icon size
            height: { xs: 50, sm: 60, md: 90 },
            marginTop: 2,
          }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};


const ServicesGrid = () => {
  return (
    <Box sx={{ paddingX: 6, width: 'auto' }}>
      <ServiceText/>
      <Grid
        container
        rowSpacing={5}
        justifyContent="center"
      >
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServicesGrid;
