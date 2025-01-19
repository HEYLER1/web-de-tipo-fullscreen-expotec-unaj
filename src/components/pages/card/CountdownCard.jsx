import React, { useState, useEffect } from 'react';
import './CountdownCard.css'

const FlipNumber = ({ number }) => {
  const [animation, setAnimation] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(number);
  
  useEffect(() => {
    if (currentNumber !== number) {
      setAnimation(true);
      setTimeout(() => {
        setCurrentNumber(number);
        setAnimation(false);
      }, 300);
    }
  }, [number]);

  return (
    <div className="relative w-6 h-10 sm:w-8 sm:h-12 md:w-10 md:h-14 lg:w-12 lg:h-16 xl:w-16 xl:h-24 rounded-sm shadow-md overflow-hidden bg-[rgba(0,0,0,0.8)]">
      {/* Línea en el medio */}
      <div className="absolute top-1/2 w-full h-[1px] bg-gray-400"></div>

      {/* Parte superior */}
      <div className="absolute w-full h-1/2 flex items-end justify-center overflow-hidden">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mb-0 font-mono text-white" style={{ 
          transform: 'translateY(50%)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>{currentNumber}</span>
      </div>
      
      {/* Parte inferior con animación */}
      <div className={`absolute top-1/2 w-full h-1/2 flex items-start justify-center overflow-hidden 
        ${animation ? 'animate-flip-up' : ''}`}>
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mt-0 font-mono text-white" style={{ 
          transform: 'translateY(-50%)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>{currentNumber}</span>
      </div>
    </div>
  );
};

const FlipCounter = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2024-11-22T00:00:00'); // Fecha del 24 de noviembre de 2024
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // Si la fecha ya ha pasado
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center p-2 md:p-4 lg:p-8 bg-transparent">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Días */}
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
            <FlipNumber number={Math.floor(timeLeft.days / 10)} />
            <FlipNumber number={timeLeft.days % 10} />
          </div>
          <span className="text-[8px] sm:text-xs md:text-sm lg:text-lg font-medium tracking-wider text-white">Días</span>
        </div>
        
        {/* Separador */}
        <div className="flex items-center text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mx-1 text-white">:</div>
        
        {/* Horas */}
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
            <FlipNumber number={Math.floor(timeLeft.hours / 10)} />
            <FlipNumber number={timeLeft.hours % 10} />
          </div>
          <span className="text-[8px] sm:text-xs md:text-sm lg:text-lg font-medium tracking-wider text-white">Horas</span>
        </div>
        
        {/* Separador */}
        <div className="flex items-center text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mx-1 text-white">:</div>
        
        {/* Minutos */}
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
            <FlipNumber number={Math.floor(timeLeft.minutes / 10)} />
            <FlipNumber number={timeLeft.minutes % 10} />
          </div>
          <span className="text-[8px] sm:text-xs md:text-sm lg:text-lg font-medium tracking-wider text-white">Minutos</span>
        </div>
        
        {/* Separador */}
        <div className="flex items-center text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mx-1 text-white">:</div>
        
        {/* Segundos */}
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
            <FlipNumber number={Math.floor(timeLeft.seconds / 10)} />
            <FlipNumber number={timeLeft.seconds % 10} />
          </div>
          <span className="text-[8px] sm:text-xs md:text-sm lg:text-lg font-medium tracking-wider text-white">Segundos</span>
        </div>
      </div>
    </div>
  );
};

// Agregar los estilos de la animación
const style = document.createElement('style');
style.textContent = `
  @keyframes flipUp {
    0% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(-80deg);
    }
  }
  
  .animate-flip-up {
    animation: flipUp 0.3s ease-in-out;
    transform-origin: top;
    backface-visibility: hidden;
  }
`;
document.head.appendChild(style);

export default FlipCounter;