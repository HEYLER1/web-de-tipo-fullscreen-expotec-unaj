// App.js
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { supabase } from './components/services/supabaseClient';
import Navbar from './components/NavBar';
import Inicio from './components/pages/Inicio';
import Categorias from './components/pages/Agenda';
import Bases from './components/pages/Bases';
import Inscripcion from './components/pages/Inscripcion';
import Sponsors from './components/pages/Sponsors';
import Contacto from './components/pages/Contacto';
import Perfil from './components/pages/Perfil';
import FormGrupo from './components/pages/form/FormGrupo';
import FormJunior from './components/pages/form/FormJunior';
import FormAmateur from './components/pages/form/FormAmateur';
import Design from './components/Design';
import Auth from './components/Auth/Auth';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Tema personalizado con fondo transparente
const theme = createTheme({
  
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'transparent',
        },
      },
    },
  },
});

const UserDataContext = React.createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserDataProvider>
        <div className="w-full min-h-screen bg-banner-bg bg-no-repeat bg-center bg-cover relative">
          <div className="max-w-6xl mx-auto text-white z-10">
            <Router>
              <Navbar />
              <div className="app-background pb-20">
                <Routes>
                  {isAuthenticated ? (
                    <>
                      <Route path="/" element={<Inicio />} />
                      <Route path="/agenda" element={<Categorias />} />
                      <Route path="/bases" element={<Bases />} />
                      <Route path="/inscripcion" element={<Inscripcion />} />
                      <Route path="/sponsors" element={<Sponsors />} />
                      <Route path="/contacto" element={<Contacto />} />
                      <Route path="/form/FormJunior" element={<FormJunior />} />
                      <Route path="/form/FormGrupo" element={<FormGrupo />} />
                      <Route path="/form/FormAmateur" element={<FormAmateur />} />
                      <Route path="/perfil" element={<Perfil />} />
                    </>
                  ) : (
                    <Route path="*" element={<Navigate to="/auth" replace />} />
                  )}
                  <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
                </Routes>
              </div>
            </Router>
          </div>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <Design />
          </div>
        </div>
      </UserDataProvider>
    </ThemeProvider>
  );
};

export default App;