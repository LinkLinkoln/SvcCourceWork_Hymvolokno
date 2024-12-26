import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Link } from '@mui/material';
import DesignLine from "../../_components/designLine/DesignLine.js";

// Данные новостей
const newsData = [
  {
    date: 'Май 13, 2022',
    title: 'Наша телега',
    author: 'Могилёвхимволокно',
    category: 'Новости',
    description: 'На нашем ютуб-канале вышло первое видео',
    link: '#',
  },
  {
    date: 'Май 11, 2022',
    title: 'Тесты',
    author: 'Могилёвхимволокно',
    category: 'Новости',
    description: 'Мы подготовили для вас 2 теста для проверки знаний:',
    link: '#',
  },
  {
    date: 'Май 6, 2022',
    title: 'Ищем спикеров на конференцию',
    author: 'Могилёвхимволокно',
    category: 'Новости',
    description:
      'Мы начинаем набор спикеров на конференцию для работников лабораторий Laboratorika 2022.',
    link: '#',
  },
];

// Компонент карточки новости
const NewsCard = ({ date, title, author, category, description, link }) => (
  <Card sx={{ maxWidth: 345, padding: '20px', margin: '10px', boxShadow: 3 }}>
    <CardContent>
      <Box sx={{ backgroundColor: '#1a73e8', display: 'inline-block', padding: '4px 8px', borderRadius: '4px', marginBottom: '10px' }}>
        <Typography sx={{ color: '#fff' }}>
          {date}
        </Typography>
      </Box>
      <Typography variant="h5" component="div" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography sx={{ color: 'gray', marginBottom: '10px' }} variant="body2">
        Автор {author}  в <span style={{ fontWeight: 'bold' }}>{category}</span>
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '10px' }}>
        {description}
      </Typography>
      <Link href={link} underline="none" sx={{ fontWeight: 'bold', color: '#1a73e8' }}>
        Читать далее →
      </Link>
    </CardContent>
  </Card>
);

const NewsGrid = () => (
  <Box 
    sx={{ 
      backgroundColor: '#f5f5f5', 
      width: {
        xs: '96vw',  
        sm: '97vw',   
        md: '98vw',    
        lg: '99vw',    
      },
      display: 'flex', 
      flexDirection: 'column', 
      marginLeft: "-2px",
      alignItems: 'center', 
      justifyContent: 'center'
    }}
  >
    <Typography variant="h4" component="h2" gutterBottom>
      Последние новости компании
    </Typography>
    <DesignLine />
    <Grid container spacing={2} justifyContent="center">
      {newsData.map((news, index) => (
        <Grid item key={index}>
          <NewsCard {...news} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default NewsGrid;