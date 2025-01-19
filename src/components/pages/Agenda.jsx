import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CountdownCard from './card/CountdownCard';
import AgendaCard from './card/Calender';
import LocationCard from './card/LocationCard';

const ElegantCountdownAgenda = () => {
  const [days, setDays] = useState(15);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDays(prev => {
        if (prev > 0) {
          setFlipping(true);
          setTimeout(() => setFlipping(false), 600);
          return prev - 1;
        }
        return 0;
      });
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const agendaItems = [
    { time: "01/11/2024", description: "inicio de inscripciones" },
    { time: "22/11/2024 8:30AM", description: "cierre de inscripciones" },
    { time: "22/11/2024 9:00AM", description: "inicio de competencia" },
    
  ];

  return (
    <Box 
      sx={{
        height: '100vh',
        background: 'transparent',
        overflowY: 'auto',
        padding: 2,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '10px',
        }
      }}
    >
      <Box 
        display="flex" 
        flexDirection={{ xs: 'column', md: 'row' }} 
        gap={8} 
        maxWidth="lg" 
        mx="auto" 
        sx={{ flex: 1 }}
      >
        <Box flex={2} gap={8}>
          <CountdownCard days={days} flipping={flipping} />
          <AgendaCard agendaItems={agendaItems} />
        </Box>
        <Box width={{ xs: '100%', md: 320 }} sx={{ marginBottom: 35 }}> {/* Margen en el último componente */}
          <LocationCard />
        </Box>
      </Box>
    </Box>
  );
};

export default ElegantCountdownAgenda;
