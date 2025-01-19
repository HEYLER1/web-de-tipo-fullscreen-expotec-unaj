import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import {
  Box,
  Paper,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Link,
  useTheme,
  useMediaQuery,
  Stack,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import {
  Search,
  Download,
  Close,
  CalendarToday,
  Person,
  Email,
  Phone,
  Category,
  Description,
  AccessTime,
  LocationOn,
  Refresh
} from '@mui/icons-material';

const RegistrationViewer = () => {
  const [userEmail, setUserEmail] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Estilos personalizados
  const containerStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    padding: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  };

  const tableContainerStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    '& .MuiTableCell-head': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#fff',
      fontWeight: 'bold'
    },
    '& .MuiTableCell-body': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#fff'
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  };

  const dialogStyle = {
    '& .MuiDialog-paper': {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    }
  };

  const detailItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px'
  };

  // Obtener el email del usuario al cargar el componente
  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) throw error;

        if (user) {
          setUserEmail(user.email);
          fetchRegistrations(user.email);
        } else {
          throw new Error('No se encontró usuario autenticado');
        }
      } catch (error) {
        setError('Error al obtener información del usuario: ' + error.message);
      }
    };

    getUserEmail();
  }, []);

  const fetchRegistrations = async (email) => {
    if (!email) {
      setError('No se encontró un correo electrónico asociado');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `./get_registrations.php?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      if (data.success) {
        setRegistrations(data.data);
        setMessage(data.message);
      } else {
        setError(data.message);
        setRegistrations([]);
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetails = (registration) => {
    setSelectedRegistration(registration);
    setOpenDialog(true);
  };

  const getStatusChip = (estado) => {
    let label;
    let color;

    switch (estado) {
      case '0':
        label = 'Pendiente';
        color = 'warning';
        break;
      case '1':
        label = 'Aprobado';
        color = 'success';
        break;
      case '-1':
        label = 'Denegado';
        color = 'error';
        break;
      default:
        label = 'Desconocido';
        color = 'default';
    }

    return <Chip label={label} color={color} size="small" />;
  };

  const renderMobileRegistrationCard = (reg) => (
    <Card key={reg.id} sx={{ ...cardStyle, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">{reg.codigo}</Typography>
        <Stack spacing={1}>
          <Box>
            <Typography variant="body2" color="text.secondary">Nombre</Typography>
            <Typography color="white">{reg.full_name}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Categoría</Typography>
            <Typography color="white">{reg.category}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Estado</Typography>
            {getStatusChip(reg.estado)}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Fecha</Typography>
            <Typography color="white">{new Date(reg.created_at).toLocaleDateString()}</Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleOpenDetails(reg)}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(5px)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)'
              }
            }}
          >
            Ver Detalles
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );

  const renderDetailsContent = () => {
    if (!selectedRegistration) return null;

    return (
      <Box sx={{ p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={detailItemStyle}>
              <Person />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Nombre Completo
                </Typography>
                <Typography variant="body1">
                  {selectedRegistration.full_name}
                </Typography>
              </Box>
            </Box>

            <Box sx={detailItemStyle}>
              <Email />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Correo Electrónico
                </Typography>
                <Typography variant="body1">
                  {selectedRegistration.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={detailItemStyle}>
              <Phone />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Teléfono
                </Typography>
                <Typography variant="body1">
                  {selectedRegistration.phone}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={detailItemStyle}>
              <Category />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Categoría
                </Typography>
                <Typography variant="body1">
                  {selectedRegistration.category}
                </Typography>
              </Box>
            </Box>

            <Box sx={detailItemStyle}>
              <AccessTime />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Estado
                </Typography>
                {getStatusChip(selectedRegistration.estado)}
              </Box>
            </Box>

            <Box sx={detailItemStyle}>
              <CalendarToday />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Fecha de Registro
                </Typography>
                <Typography variant="body1">
                  {new Date(selectedRegistration.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {selectedRegistration.notes && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={detailItemStyle}>
                <Description />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Notas
                  </Typography>
                  <Typography variant="body1">
                    {selectedRegistration.notes}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    );
  };

  return (
    <div className="parent-container" style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      padding: '20px'
    }}>
      <div className="scroll-container">
        <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 1, sm: 2 } }}/>
          <Box sx={containerStyle}>
            {/* Header con email y botón de actualizar */}
            <Box sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              p: 2,
              borderRadius: '8px',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: 'white' }} />
                <Typography color="white">
                  {userEmail || 'Cargando información del usuario...'}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => fetchRegistrations(userEmail)}
                startIcon={<Refresh />}
                sx={{
                  ml: 'auto',
                  background: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                Actualizar
              </Button>
            </Box>

            {loading && (
              <Box display="flex" justifyContent="center" my={2}>
                <CircularProgress sx={{ color: 'white' }} />
              </Box>
            )}

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 2, 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white'
                }}
              >
                {error}
              </Alert>
            )}

            {message && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 2, 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white'
                }}
              >
                {message}
              </Alert>
            )}
            
            {!loading && registrations.length === 0 && (
              <Box sx={{ 
                textAlign: 'center', 
                py: 4,
                px: 2,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.18)'
              }}>
                <Typography variant="h6" color="white" gutterBottom>
                  Aún no tienes inscripciones
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  Las inscripciones que realices aparecerán aquí
                </Typography>
              </Box>
            )}

            {registrations.length > 0 && (
              <Box>
                {isMobile ? (
      registrations.map(reg => renderMobileRegistrationCard(reg))
    ) : (
      <TableContainer sx={tableContainerStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrations.map((reg) => (
              <TableRow key={reg.id} hover>
                <TableCell>{reg.codigo}</TableCell>
                <TableCell>{reg.full_name}</TableCell>
                <TableCell>{reg.category}</TableCell>
                <TableCell>{getStatusChip(reg.estado)}</TableCell>
                <TableCell>{new Date(reg.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => handleOpenDetails(reg)}
                    variant="contained"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.3)'
                      }
                    }}
                  >
                    Ver Detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </Box>
)}

{/* Modal de Detalles */}
<Dialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  maxWidth="md"
  fullWidth
  sx={dialogStyle}
>
  {selectedRegistration && (
    <>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.18)'
      }}>
        <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Detalles del Registro #{selectedRegistration.codigo}
        </Typography>
        <IconButton onClick={() => setOpenDialog(false)} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        {renderDetailsContent()}
        
        {/* Botones de acción en el diálogo */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 2, 
          mt: 3,
          pt: 2,
          borderTop: '1px solid rgba(0, 0, 0, 0.12)' 
        }}>
          {selectedRegistration.estado === '1' && (
            <Button
              variant="contained"
              startIcon={<Download />}
              sx={{
                bgcolor: 'success.main',
                '&:hover': {
                  bgcolor: 'success.dark',
                }
              }}
            >
              Descargar Comprobante
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            startIcon={<Close />}
          >
            Cerrar
          </Button>
        </Box>
      </DialogContent>
    </>
  )}
</Dialog>

{/* Espacio adicional al final */}
<Box sx={{ pb: 20 }} />
    </Box>
  </div>
</div>
);
};

export default RegistrationViewer;