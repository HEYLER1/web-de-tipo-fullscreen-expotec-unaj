// components/LoadingSpinner.js
import React from 'react';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Fade,
  Backdrop 
} from '@mui/material';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.3;
  }
`;

const LoadingSpinner = () => {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Backdrop
      open={true}
      sx={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Fade in={true}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Círculos de fondo con efecto glass */}
          <Box
            sx={{
              position: 'absolute',
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'rgba(96, 165, 250, 0.1)',
              backdropFilter: 'blur(8px)',
              animation: `${pulse} 2s infinite ease-in-out`,
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'rgba(96, 165, 250, 0.15)',
              backdropFilter: 'blur(8px)',
              animation: `${pulse} 2s infinite ease-in-out`,
              animationDelay: '0.5s',
            }}
          />

          {/* Spinner principal */}
          <CircularProgress 
            size={70}
            thickness={4}
            sx={{
              color: '#60A5FA',
              mb: 3,
            }}
          />

          {/* Texto de carga */}
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontWeight: 'medium',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              animation: `${pulse} 2s infinite ease-in-out`,
            }}
          >
            Cargando{dots}
          </Typography>
        </Box>
      </Fade>
    </Backdrop>
  );
};

export default LoadingSpinner;