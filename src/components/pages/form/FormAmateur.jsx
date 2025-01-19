import React, { useState } from 'react';
import { useUserData } from '../../Auth/Auth';
import './ComponenteScroll.css';
import YapeQR from './yapeqr.png'; // Ajusta la ruta según la ubicación de tu imagen

import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  FormHelperText,
} from '@mui/material';
import CategoryIcon from "@mui/icons-material/Category";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';

const FormInput = ({ label, name, value, onChange, type = "text", required = false, error = false, helperText = "" }) => (
  <TextField
    fullWidth
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    required={required}
    variant="outlined"
    sx={{ mb: 3 }}
    error={error}
    helperText={helperText}
  />
);

const CategorySelect = ({ categories, value, onChange, error = false, helperText = "" }) => (
  <FormControl fullWidth sx={{ mb: 3 }} error={error}>
    <InputLabel sx={{ color: "#333" }}>Categoría</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      label="Categoría"
      required
      sx={{
        backgroundColor: "#f7f3eb", // Fondo beige suave que combina con un azul medio rosado
        color: "#333",              // Color del texto oscuro para buena visibilidad
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#999" },
      }}
    >
      <MenuItem value="">
        <em>Seleccione una categoría</em>
      </MenuItem>
      {categories.map((cat) => (
        <MenuItem
          key={cat.id}
          value={cat.id}
          sx={{
            backgroundColor: "#ffffff",         // Fondo blanco por defecto en cada opción
            color: "#333",                      // Color del texto oscuro para buena visibilidad
            "&:hover": {
              backgroundColor: "rgba(0, 128, 0, 0.2)", // Verde opaco en el hover
            },
          }}
        >
          {cat.name} - S/. {cat.price}
        </MenuItem>
      ))}
    </Select>
    {error && (
      <FormHelperText sx={{ color: "#d32f2f" }}>{helperText}</FormHelperText> // Color de error específico
    )}
  </FormControl>
);
const PaymentMethod = ({ value, onChange, error = false, helperText = "" }) => (
  <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }} error={error}>
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      Método de Pago
    </Typography>
    <RadioGroup
      row
      name="paymentMethod"
      value={value}
      onChange={onChange}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 2
      }}
    >
      {/* Opción BCP */}
      <Paper
        elevation={value === 'BCP' ? 3 : 1}
        sx={{
          border: theme => `2px solid ${value === 'BCP' ? theme.palette.primary.main : theme.palette.divider}`,
          borderRadius: 1,
          transition: 'all 0.2s',
          backgroundColor: value === 'BCP' ? 'rgba(0, 0, 255, 0.05)' : '#fff'
        }}
      >
        <FormControlLabel
          value="BCP"
          control={<Radio />}
          label="BCP"
          sx={{ width: '100%', m: 0, p: 2 }}
        />
      </Paper>
      
      {/* Opción Yape */}
      <Paper
        elevation={value === 'Yape' ? 3 : 1}
        sx={{
          border: theme => `2px solid ${value === 'Yape' ? theme.palette.primary.main : theme.palette.divider}`,
          borderRadius: 1,
          transition: 'all 0.2s',
          backgroundColor: value === 'Yape' ? 'rgba(0, 0, 255, 0.05)' : '#fff'
        }}
      >
        <FormControlLabel
          value="Yape"
          control={<Radio />}
          label="Yape"
          sx={{ width: '100%', m: 0, p: 2 }}
        />
      </Paper>
    </RadioGroup>
    {error && <FormHelperText>{helperText}</FormHelperText>}

    {/* Información adicional para BCP */}
    {value === 'BCP' && (
      <Box sx={{ mt: 3, textAlign: 'center', p: 2, borderRadius: 1, backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
        <Typography variant="subtitle2" gutterBottom>
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Realiza la transferencia al número de cuenta BCP. Asegúrate de que el remitente sea el correcto.
          <h3>REMITENTE: JOHAR MAG**R </h3>
          <h3>NUMERO DE CUENTA BCP 40593665485087</h3>
          <h3>NÚMERO DE CUENTA INTERBANCARIA 00240519366548508798</h3>
        </Typography>
      </Box>
    )}

    {/* Información adicional para Yape */}
    {value === 'Yape' && (
      <Box sx={{ mt: 3, textAlign: 'center', p: 2, borderRadius: 1, backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
        <Typography variant="subtitle2" gutterBottom>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Realiza el pago a través de Yape escaneando el siguiente número o código QR. Asegúrate de que el remitente sea el correcto.
          <h3>REMITENTE: JOHAR MAG**R </h3>
          <h3>NUMERO: +51 961585284</h3>
        </Typography>
        <Box sx={{ mt: 2 }}>
          <img src={YapeQR} alt="QR Yape" style={{ width: '150px', height: '150px' }} />
        </Box>
      </Box>
    )}
  </FormControl>
);



const FileInput = ({ onChange, fileName, error = false, helperText = "" }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      Voucher de Pago
    </Typography>
    <Box
      sx={{
        border: '2px dashed',
        borderColor: error ? 'error.main' : 'divider',
        borderRadius: 1,
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': {
          borderColor: error ? 'error.main' : 'primary.main',
          boxShadow: error ? '0 0 5px rgba(211, 47, 47, 0.5)' : '0 0 5px rgba(33, 150, 243, 0.5)',
        },
      }}
    >
      <input
        accept="image/*,.pdf"
        id="file-upload"
        type="file"
        onChange={onChange}
        style={{ display: 'none' }}
        required
      />
      <label htmlFor="file-upload">
        <CloudUploadIcon sx={{ fontSize: 48, color: error ? 'error.main' : 'text.secondary', mb: 1 }} />
        <Typography variant="body1" color={error ? 'error.main' : 'primary'} sx={{ mb: 1 }}>
          {fileName || "Subir comprobante de pago"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          PNG, JPG, PDF hasta 4MB
        </Typography>
      </label>
    </Box>
    {error && (
      <FormHelperText error>{helperText}</FormHelperText>
    )}
  </Box>
);
const ResultDialog = ({ open, success, onClose, onNewRegistration }) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2
        }
      }}
    >
      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        {success ? (
          <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
        ) : (
          <ErrorIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
        )}
        <Typography variant="h6" gutterBottom>
          {success ? 'Registro Exitoso' : 'Error al Registrar'}
        </Typography>
        <Typography color="text.secondary">
          {success 
            ? 'Tu registro ha sido completado correctamente.' 
            : 'Hubo un problema al procesar tu registro. Por favor, inténtalo nuevamente.'}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          variant="outlined"
          onClick={() => {
            onClose();
            navigate('/');
          }}
        >
          Ir al Inicio
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onClose();
            onNewRegistration();
          }}
        >
          Nueva Inscripción
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const RegistrationForm = ({ categories }) => {
  const { emailUsuario = "" } = useUserData() || {};
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    phone: '',
    email: emailUsuario,
    institution: '',
    visitPlace: '',
    robotNames: '',
    category: '',
    paymentMethod: '',
    voucher: null
  });

  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Validar campos requeridos
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'voucher') {
        newErrors[key] = 'Este campo es requerido';
      }
    });

    // Validar voucher
    if (!formData.voucher) {
      newErrors.voucher = 'Debe subir un voucher';
    }

    // Validaciones específicas
    if (formData.dni && !/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = 'DNI debe tener 8 dígitos';
    }

    if (formData.phone && !/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono debe tener 9 dígitos';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando se modifica
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        voucher: file
      }));
      setFileName(file.name);
      if (errors.voucher) {
        setErrors(prev => ({
          ...prev,
          voucher: ''
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch('./register_amateur.php', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      setSubmitSuccess(result.success);
      setShowResult(true);
    } catch (err) {
      setSubmitSuccess(false);
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRegistration = () => {
    setFormData({
      fullName: '',
      dni: '',
      phone: '',
      email: '',
      institution: '',
      visitPlace: '',
      robotNames: '',
      category: '',
      paymentMethod: '',
      voucher: null
    });
    setFileName('');
    setErrors({});
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);
  const amount = selectedCategory ? selectedCategory.price : 0;

  return (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 'md',
            mx: 'auto',
            p: 4,
            backgroundColor: 'transparet', // Fondo suave para el formulario
          }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: '#ffffff' }}>
            <FormInput
              label="Nombre y Apellido (Representante)"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              error={!!errors.fullName}
              helperText={errors.fullName}
              sx={{ bgcolor: 'rgba(63, 81, 181, 0.1)' }} // Fondo suave para el input
            />

            <FormInput
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required
              error={!!errors.dni}
              helperText={errors.dni}
            />

            <FormInput
              label="Teléfono (WhatsApp)"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              error={!!errors.phone}
              helperText={errors.phone}
            />

            <FormInput
              label="Correo"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />

            <FormInput
              label="Institución de Procedencia"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              error={!!errors.institution}
              helperText={errors.institution}
            />

            <FormInput
              label="Lugar de visita"
              name="visitPlace"
              value={formData.visitPlace}
              onChange={handleChange}
              required
              error={!!errors.visitPlace}
              helperText={errors.visitPlace}
            />

            <FormInput
              label="Nombre de los Robots"
              name="robotNames"
              value={formData.robotNames}
              onChange={handleChange}
              required
              error={!!errors.robotNames}
              helperText={errors.robotNames}
            />

            <CategorySelect
              categories={categories}
              value={formData.category}
              onChange={e => handleChange({
                target: { name: 'category', value: e.target.value }
              })}
              error={!!errors.category}
              helperText={errors.category}
              sx={{
                '& .MuiSelect-root': {
                  backgroundColor: '#e3f2fd', // Color de fondo del select
                },
                '&:hover .MuiSelect-root': {
                  backgroundColor: '#bbdefb', // Color de fondo al pasar el ratón
                },
              }}
            />

            <Paper sx={{ p: 2, mb: 3, bgcolor: '#e0f7fa' }}>
              <Typography variant="subtitle1" gutterBottom>
                Monto a Pagar
              </Typography>
              <Typography variant="h4" color="primary">
                S/. {amount}
              </Typography>
            </Paper>

            <PaymentMethod
              value={formData.paymentMethod}
              onChange={e => handleChange({
                target: { name: 'paymentMethod', value: e.target.value }
              })}
              error={!!errors.paymentMethod}
              helperText={errors.paymentMethod}
              sx={{
                '& .MuiFormControlLabel-root': {
                  color: '#424242', // Color del texto de las opciones de pago
                },
                '& .MuiRadio-root': {
                  color: '#2196f3', // Color de los radios
                  '&.Mui-checked': {
                    color: '#1976d2', // Color del radio seleccionado
                  },
                },
              }}
            />

            <FileInput 
              onChange={handleFileChange}
              fileName={fileName}
              error={!!errors.voucher}
              helperText={errors.voucher}
              sx={{ borderColor: 'primary.main' }} // Color del borde del input de archivo
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                height: 48,
                backgroundColor: '#4caf50', // Color de fondo del botón
                '&:hover': {
                  backgroundColor: '#388e3c', // Color al pasar el ratón
                },
                color: '#ffffff', // Color del texto del botón
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Enviar Registro'}
            </Button>
          </Paper>

          <ResultDialog
            open={showResult}
            success={submitSuccess}
            onClose={() => setShowResult(false)}
            onNewRegistration={handleNewRegistration}
          />
        </Box>
    );
  };

  export const Principal = () => {
    const categories = [
      { id: 'SUMO AUTONOMO 17+', name: 'SUMO AUTONOMO', price: 25 },
      { id: 'SEGUIDOR DE LINEA 17+', name: 'SEGUIDOR DE LINEA', price: 25 },
      { id: 'MINISUMO 17+', name: 'MINISUMO', price: 25 },
      { id: 'MINIHUMANOIDE 17+', name: 'MINIHUMANOIDE', price: 25 },
      { id: 'LIBRE 17+', name: 'LIBRE', price: 25 },
    ];
  
    return (
      <div className="parent-container">
        <div className="scroll-container">
          <Box 
            sx={{ 
              py: 4,
              bgcolor: 'transparent',
              minHeight: '100vh',
              overflow: 'hidden',
              maxWidth: '120%', // Ajusta este valor para el ancho deseado
              mx: 'auto' // Centra el contenedor horizontalmente
            }} 
          >
            <Typography 
              component="h1" 
              id="robotic-header"
              textAlign="center" 
              gutterBottom 
            >
              Registro de Competencia mayores de 17 años
            </Typography>
            <Box>
              <RegistrationForm categories={categories} />
            </Box>
            <Box sx={{ pb: 20 }} /> {/* Espacio adicional en la parte inferior */}
          </Box>
        </div>
      </div>
    );
  };
  
  export default Principal;
  