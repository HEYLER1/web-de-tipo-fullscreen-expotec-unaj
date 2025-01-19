import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  LinearProgress,
  styled
} from '@mui/material';
import { 
  Mail as MailIcon,
  Phone as PhoneIcon,
  AccessTime as ClockIcon,
  Memory as CpuIcon,
  BatteryFull as BatteryIcon, // Cambiado a BatteryFull
  Power as PowerIcon
} from '@mui/icons-material';

// Estilos personalizados
const StyledCard = styled(Card)(({ theme }) => ({
  background: 'transparent', // Cambiado a transparente
  backdropFilter: 'blur(12px)', // Mantener el desenfoque
  border: '1px solid rgba(0, 255, 255, 0.125)', // Mantener el borde
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    padding: '1px',
    background: 'linear-gradient(180deg, rgba(0, 255, 255, 0.3), rgba(0, 255, 255, 0.1))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'destination-out',
    maskComposite: 'exclude',
  }
}));


const InfoSection = styled(Box)(({ theme }) => ({
  background: 'rgba(17, 25, 40, 0.9)',
  borderRadius: theme.spacing(1),
  border: '1px solid rgba(0, 255, 255, 0.2)',
  padding: theme.spacing(2),
  position: 'relative',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    '& .glow': {
      opacity: 0.3,
    }
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(0, 255, 255, 0.1)',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const GlowEffect = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'rgba(0, 255, 255, 0.2)',
  filter: 'blur(8px)',
  opacity: 0.2,
  transition: 'opacity 0.3s ease-in-out'
});

const ContactInfoCard = () => {
  return (
    <StyledCard sx={{ maxWidth: 'lg', mx: 'auto', my: 4 }}>
      <CardContent>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <CpuIcon sx={{ color: 'cyan', animation: 'pulse 2s infinite' }} />
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              EXPOTEC.CONTACT
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <BatteryIcon sx={{ color: 'cyan' }} /> {/* Cambiado a BatteryFull */}
            <LinearProgress
              variant="determinate"
              value={75}
              sx={{
                width: 120,
                height: 8,
                bgcolor: 'rgba(0, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'cyan',
                }
              }}
            />
          </Box>
          
          <Typography 
            sx={{ 
              color: 'cyan',
              fontFamily: 'monospace',
              '&::after': {
                content: "'|'",
                animation: 'blink 1s infinite'
              }
            }}
          >
            {'>> INITIALIZING SUPPORT PROTOCOLS_'}
          </Typography>
        </Box>

        {/* Info Sections Grid */}
        <Grid container spacing={3}>
          {/* Email Section */}
          <Grid item xs={12}>
            <InfoSection>
              <GlowEffect className="glow" />
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <PowerIcon sx={{ color: 'cyan', animation: 'pulse 2s infinite' }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconContainer>
                  <MailIcon sx={{ color: 'cyan' }} />
                </IconContainer>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                    /EMAIL_
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'cyan', fontFamily: 'monospace' }}>
                    {'>'} consulta sobre bases: miguelmayta154@gmail.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'cyan', fontFamily: 'monospace', mt: 1 }}>
                    {'>'} Support de inscripciones: soporte@olimpiadarobotica.website
                  </Typography>
                </Box>
              </Box>
            </InfoSection>
          </Grid>

          {/* Phone Section */}
          <Grid item xs={12}>
            <InfoSection>
              <GlowEffect className="glow" />
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <PowerIcon sx={{ color: 'cyan', animation: 'pulse 2s infinite' }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconContainer>
                  <PhoneIcon sx={{ color: 'cyan' }} />
                </IconContainer>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                    /TELEFONOS_
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'cyan', fontFamily: 'monospace' }}>
                    {'>'} consulta sobre bases: +51 951647596
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'cyan', fontFamily: 'monospace', mt: 1 }}>
                    {'>'} Support de inscripciones: +51 929558033
                  </Typography>
                </Box>
              </Box>
            </InfoSection>
          </Grid>

          {/* Hours Section */}
          <Grid item xs={12}>
            <InfoSection>
              <GlowEffect className="glow" />
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <PowerIcon sx={{ color: 'cyan', animation: 'pulse 2s infinite' }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconContainer>
                  <ClockIcon sx={{ color: 'cyan' }} />
                </IconContainer>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                    /HORARIO_
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'cyan', fontFamily: 'monospace' }}>
                    {'>'} Monday - Friday: 09:00AM - 6:00PM
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'cyan', fontFamily: 'monospace', mt: 1 }}>
                    {'>'} Saturday - Sunday: SYSTEM.OFFLINE
                  </Typography>
                </Box>
              </Box>
            </InfoSection>
          </Grid>
        </Grid>

        {/* Footer Progress */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{
              width: 120,
              height: 8,
              bgcolor: 'rgba(0, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'cyan',
              }
            }}
          />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ContactInfoCard;
