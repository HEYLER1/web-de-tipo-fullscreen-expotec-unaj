import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationCard = () => (
  <Card sx={{
    backdropFilter: 'blur(10px)',
    borderRadius: 4,
    boxShadow: 6,
    border: '1px solid rgba(255, 255, 255, 0.5)',
    position: 'sticky',
    top: 32,
    overflow: 'hidden',
    background: 'rgba(25, 25, 112, 0.8)',
  }}>
    <Box sx={{
      p: 2,
      background: 'transparent',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color="white" display="flex" alignItems="center">
        <LocationOnIcon sx={{ marginRight: 1, color: 'white' }} />
        Ubicación
      </Typography>
    </Box>
    <CardContent>
    <Typography variant="body1" color="white">Fecha del evento: 22 de noviembre del 2024</Typography>
      <Typography variant="body2" color="white">Dirección del evento: Nueva Zelanda 631</Typography>
      <Typography variant="body2" color="white">Juliaca 21101</Typography>

      <Box mt={4} pt={2} borderTop="1px solid rgba(255, 255, 255, 0.2)">
        <Typography variant="body2" color="white">
          Acceso por la puerta principal
        </Typography>
        <Typography variant="body2" color="textSecondary">
        Lugar: Campus de la UNAJ
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default LocationCard;
