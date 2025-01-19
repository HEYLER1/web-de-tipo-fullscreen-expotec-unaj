import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

const TimelineCard = ({ title, description }) => (
  <Box
    sx={{
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '20px',
      padding: '15px',
      boxShadow: '0 0 15px rgba(0, 209, 255, 0.8)',
      color: '#fff',
      textAlign: 'left',
      maxWidth: '350px',
      width: '100%',
      backdropFilter: 'blur(8px)',
      border: '2px solid rgba(0, 209, 255, 0.6)',
      position: 'relative',
      marginBottom: '5px',
      transition: 'transform 0.5s ease, opacity 0.5s ease',
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00d1ff' }}>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>
      {description}
    </Typography>
  </Box>
);

const Timeline = () => {
  const [filter, setFilter] = useState(null);
  const [universidadIndex, setUniversidadIndex] = useState(0);
  const [colegioIndex, setColegioIndex] = useState(0);

  const universidadEvents = [
    { title: 'sumo', description: 'hola como estas' },
    { title: 'Universidad - Año 2', description: 'Continuación de estudios universitarios.' },
    { title: 'Universidad - Año 3', description: 'Especialización en la carrera.' },
    { title: 'sumo', description: 'hola como estas' },
    { title: 'Universidad - Año 2', description: 'Continuación de estudios universitarios.' },
    { title: 'Universidad - Año 3', description: 'Especialización en la carrera.' },
    { title: 'sumo', description: 'hola como estas' },
    { title: 'Universidad - Año 2', description: 'Continuación de estudios universitarios.' },
    { title: 'Universidad - Año 3', description: 'Especialización en la carrera.' },
  ];

  const colegioEvents = [
    { title: 'Colegio - Grado 10', description: 'Penúltimo año de educación secundaria.' },
    { title: 'Colegio - Grado 11', description: 'Último año de educación secundaria.' },
    { title: 'Colegio - Graduación', description: 'Finalización de estudios secundarios.' },
  ];

  useEffect(() => {
    const universidadInterval = setInterval(() => {
      setUniversidadIndex((prevIndex) => (prevIndex + 1) % universidadEvents.length);
    }, 3000);
    return () => clearInterval(universidadInterval);
  }, []);

  useEffect(() => {
    const colegioInterval = setInterval(() => {
      setColegioIndex((prevIndex) => (prevIndex + 1) % colegioEvents.length);
    }, 3000);
    return () => clearInterval(colegioInterval);
  }, []);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        minHeight: '100vh',
        maxWidth: '100vw',
        overflow: 'hidden',
        backgroundColor: '#000',
        position: 'relative'
      }}
    >
      {/* Contenedor de botones */}
      <Box 
        sx={{ 
          width: '100%',
          padding: '16px',
          display: 'flex',
          justifyContent: 'center',
          gap: 2
        }}
      >
        <Button 
          onClick={() => setFilter('universidad')} 
          sx={{ 
            color: filter === 'universidad' ? '#00d1ff' : '#fff',
            borderBottom: filter === 'universidad' ? '2px solid #00d1ff' : 'none',
          }}
        >
          Universidad
        </Button>
        <Button 
          onClick={() => setFilter('colegio')} 
          sx={{ 
            color: filter === 'colegio' ? '#00d1ff' : '#fff',
            borderBottom: filter === 'colegio' ? '2px solid #00d1ff' : 'none'
          }}
        >
          Colegio
        </Button>
      </Box>

      {/* Vista inicial con cards animados */}
      {!filter ? (
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 2, md: 4 },
            width: '100%',
            padding: '20px',
            flex: 1
          }}
        >
          {/* Contenedor Universidad */}
          <Box
            sx={{
              width: { xs: '100%', md: '45%' },
              maxWidth: '400px',
              height: '250px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <Box sx={{ position: 'absolute' }}>
              <TimelineCard
                title={universidadEvents[universidadIndex].title}
                description={universidadEvents[universidadIndex].description}
              />
            </Box>
          </Box>

          {/* Contenedor Colegio */}
          <Box
            sx={{
              width: { xs: '100%', md: '45%' },
              maxWidth: '400px',
              height: '250px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <Box sx={{ position: 'absolute' }}>
              <TimelineCard
                title={colegioEvents[colegioIndex].title}
                description={colegioEvents[colegioIndex].description}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        /* Vista de timeline */
        <Box 
          sx={{ 
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            position: 'relative',
            flex: 1,
            overflowY: 'auto', // Añadir scrollbar vertical
            maxHeight: '1200px', // Limitar la altura para que el scrollbar aparezca
            '&::-webkit-scrollbar': {
              width: '8px', // Ancho del scrollbar
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent', // Fondo del track
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 209, 255, 0.6)', // Color del thumb
              borderRadius: '10px', // Bordes redondeados
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(0, 209, 255, 0.8)', // Color del thumb al pasar el mouse
            },
            scrollbarWidth: 'thin', // Para Firefox
            scrollbarColor: 'rgba(0, 209, 255, 0.6) transparent', // Color del thumb y del track
          }}
        >
          {/* Línea central */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              backgroundColor: '#00d1ff',
              transform: 'translateX(-50%)'
            }}
          />
          
          {/* Eventos */}
          {(filter === 'universidad' ? universidadEvents : colegioEvents).map((event, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                padding: '0 10px',
              }}
            >
              <Box sx={{ 
                flex: 1, 
                display: 'flex',
                justifyContent: 'flex-end',
                pr: 2,
              }}>
                {index % 2 === 0 && <TimelineCard {...event} />}
              </Box>
              
              <Box
                sx={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#00d1ff',
                  flexShrink: 0,
                  boxShadow: '0 0 10px #00d1ff',
                  zIndex: 1
                }}
              />
              
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                pl: 2,
              }}>
                {index % 2 !== 0 && <TimelineCard {...event} />}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Timeline;
