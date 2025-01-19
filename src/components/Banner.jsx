import React, { useEffect, useState } from "react";
import { supabase } from "../components/services/supabaseClient";
import { Link } from 'react-router-dom';
import bannerRight from "../assets/bannerRight.png";

const TypewriterText = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timeout;
    
    if (!isDeleting && displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, delay);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length - 1));
      }, delay / 2);
    } else if (!isDeleting && displayText.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length === 0) {
      timeout = setTimeout(() => setIsDeleting(false), 500);
    }

    return () => clearTimeout(timeout);
  }, [text, displayText, isDeleting, delay]);

  return <span className="border-r-2 border-blue-400">{displayText}</span>;
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Logo y Encabezado */}
        <div className="flex items-center justify-between py-6">
          <img 
            src={bannerRight} 
            alt="Logo UNAJ" 
            className="w-32 h-32 object-contain animate-pulse"
          />
          <div className="text-right">
            <h1 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              UNIVERSIDAD NACIONAL
            </h1>
            <h1 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              DE JULIACA
            </h1>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className={`text-3xl font-bold text-blue-400 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              <TypewriterText text="III OLIMPIADA DE ROBÓTICA - UNAJ" delay={150} />
            </div>
            
            <div className={`text-xl text-cyan-300 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              {user ? (
                <TypewriterText 
                  text={`¡Bienvenido de nuevo, ${user.user_metadata?.full_name || 'amigo'}!`} 
                  delay={100}
                />
              ) : (
                <TypewriterText text="¡Hola, querido visitante!" delay={100} />
              )}
            </div>

            <p className={`text-gray-300 text-lg transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              <TypewriterText 
                text="Reúne a tu equipo y diviértanse enfrentando pruebas donde cada habilidad cuenta." 
                delay={50}
              />
            </p>

            <Link 
              to="/inscripcion" 
              className={`inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-full transform transition-all duration-1000 delay-1000 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
            >
              ¡INSCRÍBETE YA!
            </Link>
          </div>

          <div className={`flex items-center justify-center transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <img 
              src={bannerRight} 
              alt="Robótica UNAJ" 
              className="w-full max-w-md object-contain animate-float"
            />
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-1 h-32 bg-blue-400/20 left-1/4 animate-pulse"></div>
        <div className="absolute w-1 h-48 bg-blue-400/20 left-3/4 animate-pulse delay-100"></div>
        <div className="absolute w-32 h-1 bg-blue-400/20 top-1/4 animate-pulse delay-200"></div>
        <div className="absolute w-48 h-1 bg-blue-400/20 top-3/4 animate-pulse delay-300"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
