import React, { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

// Crear el contexto para los datos del usuario
const UserDataContext = createContext();

// Hook personalizado para acceder a los datos del usuario
export const useUserData = () => useContext(UserDataContext);

// Componente proveedor que contendrá los datos del usuario
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    nameUsuario: 'amigo',
    emailUsuario: '',
    avatarUsuario: '/default-avatar.png',
    phoneUsuario: '',
    roleUsuario: 'user',
    idUsuario: '',
    firstNameUsuario: '',
    lastNameUsuario: '',
    bioUsuario: '',
    locationUsuario: '',
    websiteUsuario: '',
    githubUsuario: '',
    twitterUsuario: '',
    linkedinUsuario: '',
    themeUsuario: 'light',
    languageUsuario: 'es',
  });

  useEffect(() => {
    const updateUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserData({
          nameUsuario: session.user.user_metadata?.full_name || 'amigo',
          emailUsuario: session.user.email || '',
          avatarUsuario: session.user.user_metadata?.avatar_url || '/default-avatar.png',
          phoneUsuario: session.user.user_metadata?.phone || '',
          roleUsuario: session.user.user_metadata?.role || 'user',
          idUsuario: session.user.id || '',
          firstNameUsuario: session.user.user_metadata?.first_name || '',
          lastNameUsuario: session.user.user_metadata?.last_name || '',
          bioUsuario: session.user.user_metadata?.bio || '',
          locationUsuario: session.user.user_metadata?.location || '',
          websiteUsuario: session.user.user_metadata?.website || '',
          githubUsuario: session.user.user_metadata?.github || '',
          twitterUsuario: session.user.user_metadata?.twitter || '',
          linkedinUsuario: session.user.user_metadata?.linkedin || '',
          themeUsuario: session.user.user_metadata?.theme || 'light',
          languageUsuario: session.user.user_metadata?.language || 'es',
        });
      }
    };

    updateUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUserData({
          nameUsuario: session.user.user_metadata?.full_name || 'amigo',
          emailUsuario: session.user.email || '',
          avatarUsuario: session.user.user_metadata?.avatar_url || '/default-avatar.png',
          phoneUsuario: session.user.user_metadata?.phone || '',
          roleUsuario: session.user.user_metadata?.role || 'user',
          idUsuario: session.user.id || '',
          firstNameUsuario: session.user.user_metadata?.first_name || '',
          lastNameUsuario: session.user.user_metadata?.last_name || '',
          bioUsuario: session.user.user_metadata?.bio || '',
          locationUsuario: session.user.user_metadata?.location || '',
          websiteUsuario: session.user.user_metadata?.website || '',
          githubUsuario: session.user.user_metadata?.github || '',
          twitterUsuario: session.user.user_metadata?.twitter || '',
          linkedinUsuario: session.user.user_metadata?.linkedin || '',
          themeUsuario: session.user.user_metadata?.theme || 'light',
          languageUsuario: session.user.user_metadata?.language || 'es',
        });
      } else {
        setUserData({
          nameUsuario: 'amigo',
          emailUsuario: '',
          avatarUsuario: '/default-avatar.png',
          phoneUsuario: '',
          roleUsuario: 'user',
          idUsuario: '',
          firstNameUsuario: '',
          lastNameUsuario: '',
          bioUsuario: '',
          locationUsuario: '',
          websiteUsuario: '',
          githubUsuario: '',
          twitterUsuario: '',
          linkedinUsuario: '',
          themeUsuario: 'light',
          languageUsuario: 'es',
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};
// Funciones para manejar cookies
const setAuthCookie = (session, days = 30) => {
  const cookieName = 'auth_session';
  const cookieValue = JSON.stringify(session);
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000); // Duración en días
  const cookieString = `${cookieName}=${encodeURIComponent(cookieValue)}; expires=${expires.toUTCString()}; path=/`;

  document.cookie = cookieString;
};

const checkAuthCookie = () => {
  const cookieName = 'auth_session=';
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookies.split(';');

  for (let cookie of cookiesArray) {
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return true; // Cookie de sesión existe
    }
  }
  return false; // Cookie no existe
};

const removeAuthCookie = () => {
  document.cookie = 'auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Eliminar cookie
};

// Componente de autenticación
const Auth = ({ setIsModalOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState('login');
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();

    // Verificar cookies de autenticación antes de continuar
    if (checkAuthCookie()) {
      setMessage('Ya estás autenticado.');
      return; // Si ya estás autenticado, salir de la función
    }

    if (authType === 'register') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setMessage('Error al registrar: ' + error.message);
      } else {
        setMessage('Registro exitoso. Revisa tu correo para verificar tu cuenta.');
        setIsModalOpen(false);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage('Error al iniciar sesión: ' + error.message);
      } else {
        setAuthCookie(data.session); // Guardar cookies de autenticación para el inicio de sesión
        setMessage('Inicio de sesión exitoso. Bienvenido.');
        setIsModalOpen(false);
      }
    }
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`, // Asegúrate de que esta URI esté registrada
      },
    });
    if (error) {
      setMessage('Error al iniciar sesión con Google: ' + error.message);
    } else {
      // Guardar la sesión de Google en cookies
      setAuthCookie(data.session);
    }
  };

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}`, // Asegúrate de que esta URI esté registrada
      },
    });
    if (error) {
      setMessage('Error al iniciar sesión con GitHub: ' + error.message);
    } else {
      // Guardar la sesión de GitHub en cookies
      setAuthCookie(data.session);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl w-full max-w-[420px] p-8 mx-4 shadow-2xl shadow-black/20 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 tracking-tight">
            {authType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </h2>
        </div>
        
        <form onSubmit={handleAuth} className="flex flex-col gap-5 mb-8">
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-base transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 bg-white/90 focus:bg-white placeholder-slate-400 text-black"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-base transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 bg-white/90 focus:bg-white placeholder-slate-400 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/20 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {authType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-slate-500 font-medium bg-white">
              o continúa con
            </span>
          </div>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full mb-3 flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-[#ea4335] font-semibold py-3.5 px-6 rounded-xl hover:bg-red-50 hover:border-red-100 transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
          </svg>
          Continuar con Google
        </button>

        <button
          onClick={signInWithGitHub}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-[#24292e] font-semibold py-3.5 px-6 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
          </svg>
          Continuar con GitHub
        </button>

        {message && (
          <div className="mt-4 text-red-500 text-center">
            {message}
          </div>
        )}

        <div className="mt-4 text-center text-sm text-slate-500">
          {authType === 'login' ? (
            <p>
              ¿No tienes una cuenta?{' '}
              <button
                onClick={() => setAuthType('register')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Regístrate
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes una cuenta?{' '}
              <button
                onClick={() => setAuthType('login')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Inicia sesión
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;