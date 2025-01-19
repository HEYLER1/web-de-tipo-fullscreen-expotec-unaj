import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';

// Importa las imágenes locales (para la tarjeta)
import imagen1 from '../image/expo12.png';
import imagen2 from '../image/expo12.png';
import imagen3 from '../image/expo12.png';

import archivo1 from "../basespdf/BASES_SUMO.pdf";
import archivo2 from "../basespdf/BASES_SOCCER.pdf";
import archivo3 from "../basespdf/BASES_SEGUIDOR_DE_LINEA.pdf";
import archivo4 from "../basespdf/RAS-BASES_DE_MINISUMO.pdf";
import archivo5 from "../basespdf/BASES_MINIHUMANOIDE.pdf";
import archivo6 from "../basespdf/BASES_CATEGORIA_LIBRE.pdf";

// Los datos de las noticias con rutas de descarga específicas
const newsData = [
  {
    title: "SUMO AUTONOMO",
    category: "MAYORES DE 17 AÑOS",
    description: "Un Robot Sumo Autónomo es un robot móvil capaz de detectar y empujar de forma autónoma a un robot rival de un ring circular en un enfrentamiento cuerpo a cuerpo, haciendo uso de sensores, tanto para ubicar y dar seguimiento a la posición del rival, como para mantenerse dentro del ring en su búsqueda",
    imageUrl: imagen1,
    downloadUrl: archivo1, // Ruta a un archivo PDF
  },
  {
    title: "SOCCER",
    category: "MENORES DE 16 Y MAYORES DE 17 AÑOS",
    description: "El Robot Soccer Bluetooth/RC es un robot que compite en partidos de fútbol entre dos equipos de tres robots. Controlados inalámbricamente por un usuario mediante un smartphone, su diseño enfatiza la habilidad del piloto. No deben usar sensores ni rutinas preprogramadas, ya que el objetivo es evaluar la destreza del manejo.",
    imageUrl: imagen2,
    downloadUrl: archivo2,
  },
  {
    title: "SEGUIDOR DE LINEA",
    category: "MENORES DE 16 Y MAYORES DE 17 AÑOS",
    description: "Un Seguidor de Línea es un robot móvil capaz de seguir un recorrido de forma autónoma, haciendo uso de sensores y un algoritmo de programación, buscando realizar su recorrido de la manera más rápida posible.",
    imageUrl: imagen3,
    downloadUrl: archivo3, // Ruta a un archivo Excel
  },
  {
    title: "MINISUMO",
    category: "MENORES DE 16 Y MAYORES DE 17 AÑOS",
    description: "Un Robot MiniSumo Bluetooth/RC es un robot móvil capaz de empujar a un robot rival de un ring circular en un enfrentamiento cuerpo a cuerpo, siendo su movimiento controlado por su piloto a través de un control inalámbrico.",
    imageUrl: imagen3,
    downloadUrl: archivo4, // Ruta a un archivo Excel
  },
  {
    title: "MINIHUMANOIDE",
    category: "MENORES DE 16 Y MAYORES DE 17 AÑOS",
    description: "",
    imageUrl: imagen3,
    downloadUrl: archivo5, // Ruta a un archivo Excel
  },
  {
    title: "CATEGORIA LIBRE",
    category: "MENORES DE 16 Y MAYORES DE 17 AÑOS",
    description: "libre",
    imageUrl: imagen3,
    downloadUrl: archivo6, // Ruta a un archivo Excel
  },
];

const NewsCard = ({ news }) => {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#1e1e2f', color: 'white' }}>
      <CardMedia
        component="img"
        alt={news.title}
        height="140"
        image={news.imageUrl}
      />
      <CardContent>
        <Typography variant="subtitle2" color="primary">
          {news.category.toUpperCase()}
        </Typography>
        
        <Typography variant="h6" component="div" gutterBottom>
          {news.title}
        </Typography>
        <Typography variant="body2">
          {news.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          href={news.downloadUrl} // Usa la ruta de descarga correcta
          download
        >
          Descargar
        </Button>
      </CardContent>
    </Card>
  );
};

const Bases = () => {
  return (
    <Box
      sx={{
        maxHeight: '100vh',  // Establece una altura máxima
        overflowY: 'auto',    // Permite desplazamiento
        p: 4,
        pb: 35,               // Agrega espacio en la parte inferior
        backgroundColor: 'transparent',
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: 'rgba(0, 0, 0, 0)', // Fondo transparente para el track
        },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.2)', // Color semitransparente para el scrollbar
          borderRadius: '8px',
        },
      }}
    >
      <Typography variant="h4" gutterBottom align="center" color="white">
        INFORMACION DE LAS BASES
      </Typography>
      <Typography variant="subtitle1" align="center" color="white" gutterBottom>
        leer bien las bases
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {newsData.map((news, index) => (
          <Grid item key={index}>
            <NewsCard news={news} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Bases;
