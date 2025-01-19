import React, { useState, useEffect } from 'react';
import Banner from "../Banner";
import Sponsors from "./Anuncio";
import Auth from '../Auth/Auth';
import { supabase } from '../services/supabaseClient';

function Inicio() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsModalOpen(false);
      }
    };

    checkSession();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      paddingBottom: '60px', // Reserva espacio para el pie de página
    }}>
      {isModalOpen && <Auth setIsModalOpen={setIsModalOpen} />}

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Banner />
      </div>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'transparent',
        padding: '10px 0',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Sponsors />
      </div>
    </div>
  );
}

export default Inicio;
