import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './RoboticEventCard.module.css';
import { Box, Paper, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MemoryIcon from '@mui/icons-material/Memory';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const RoboticEventCard = () => {
  const navigate = useNavigate();

  const events = [
    {
      title: "INSCRIPCIÓN PARA MENORES DE 16 AÑOS",
      description: "Demuestra tu ingenio y supera a tus rivales en cada prueba diseñada para retarte. (EN LIBRE NO IMPORTA EN QUE SECION TE INSCRIBAS YA QUE ES PARA TODA LAS EDADES)",
      icon: <SmartToyIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      items: [
        { text: "SEGUIDOR DE LINEA", icon: <PrecisionManufacturingIcon sx={{ color: '#757575' }} /> },
        { text: "MINISUMO", icon: <StarIcon sx={{ color: '#757575' }} /> },
        { text: "MINIHUMANOIDE", icon: <MemoryIcon sx={{ color: '#757575' }} /> },
        { text: "LIBRE", icon: <CodeIcon sx={{ color: '#757575' }} /> }
      ],
      color: "#4CAF50",
      gradient: "linear-gradient(135deg, rgba(76, 175, 80, 0.7), rgba(255, 255, 255, 0.2))",
      hoverGradient: "linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(255, 255, 255, 0.4))",
      registerLink: "/form/FormJunior",
      infoLink: "/Bases"
    },
    {
      title: "INSCRIPCIÓN PARA MAYORES DE 17 AÑOS",
      description: "Demuestra tu ingenio y supera a tus rivales en cada prueba diseñada para retarte.",
      icon: <MemoryIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
      items: [
        { text: "SUMO AUTONOMO", icon: <SettingsIcon sx={{ color: '#757575' }} /> },
        { text: "SEGUIDOR DE LINEA", icon: <MemoryIcon sx={{ color: '#757575' }} /> },
        { text: "MINISUMO", icon: <StarIcon sx={{ color: '#757575' }} /> },
        { text: "MINIHUMANOIDE", icon: <PrecisionManufacturingIcon sx={{ color: '#757575' }} /> },
        { text: "LIBRE", icon: <CodeIcon sx={{ color: '#757575' }} /> }
      ],
      color: "#2196F3",
      gradient: "linear-gradient(135deg, rgba(33, 150, 243, 0.7), rgba(255, 255, 255, 0.2))",
      hoverGradient: "linear-gradient(135deg, rgba(33, 150, 243, 0.9), rgba(255, 255, 255, 0.4))",
      registerLink: "/form/FormAmateur",
      infoLink: "/Bases"
    },
    {
      title: "INSCRIBE A TU GRUPO DE SOCCER",
      description: "Juntos, conquisten cada desafío y demuestren que el trabajo en equipo es su mejor herramienta.",
      icon: <SportsEsportsIcon sx={{ fontSize: 40, color: '#FF9800' }} />,
      items: [
        { text: "ES TANTO PARA MENORES DE 16 Y MAYORES DE 17 AÑOS", icon: <SportsEsportsIcon sx={{ color: '#757575' }} /> },
      ],
      color: "#FF9800",
      gradient: "linear-gradient(135deg, rgba(255, 152, 0, 0.7), rgba(255, 255, 255, 0.2))",
      hoverGradient: "linear-gradient(135deg, rgba(255, 152, 0, 0.9), rgba(255, 255, 255, 0.4))",
      registerLink: "/form/FormGrupo",
      infoLink: "/Bases"
    }
    
  ];

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh', // Asegura que tome al menos toda la altura de la ventana
      maxHeight: '100vh', // Limita la altura máxima a la altura de la ventana
      overflow: 'auto', // Habilita el scroll cuando sea necesario
      py: 4, // Añade padding vertical
      bgcolor: 'transparent', // Un fondo sutil para mejor contraste
    }}>
      <Box sx={{
        pb: 15,
        maxWidth: '1200px', // Limita el ancho máximo del contenedor
        mx: 'auto', // Centra el contenedor horizontalmente
        px: 2, // Añade padding horizontal
      }}>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          width: '100%',
        }}>
          {events.map((event, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                width: { xs: '100%', sm: '300px', md: '320px', lg: '350px' },
                height: 'flex', // Altura fija para todos los eventos
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s, background 0.3s',
                background: event.gradient,
                color: '#1E1E1E',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                  background: event.hoverGradient,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{
                  p: 1,
                  borderRadius: 1,
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {event.icon}
                </Box>
                <Typography variant="h5" component="h2" fontWeight="bold">
                  {event.title}
                </Typography>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                {event.description}
              </Typography>

              <List sx={{ mb: 2, flexGrow: 1, paddingLeft: 0 }}>
                {event.items.map((item, i) => (
                  <ListItem key={i} sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 'auto' }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate(event.registerLink)}
                  sx={{
                    bgcolor: event.color,
                    color: '#fff',
                    '&:hover': {
                      bgcolor: event.color,
                      filter: 'brightness(0.9)',
                    }
                  }}
                >
                  Inscribirse Ahora
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<InfoIcon />}
                  onClick={() => navigate(event.infoLink)}
                  sx={{
                    borderColor: '#757575',
                    color: '#1E1E1E',
                    '&:hover': {
                      borderColor: event.color,
                      color: event.color,
                    }
                  }}
                >
                  INFORMACIÓN DE BASES
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RoboticEventCard;
