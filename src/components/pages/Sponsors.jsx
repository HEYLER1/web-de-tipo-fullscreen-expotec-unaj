
import React from "react";
import "./inicio.css";
import logo from "../image/expo12.svg";

// Lista de imágenes de los logos
const sponsors = [
  { id: 1, name: 'mihava', src: logo },
  { id: 2, name: 'IEEE', src: logo },
  { id: 3, name: 'Lattice', src: logo },
  { id: 4, name: 'Folius Ventures', src: logo },
  { id: 5, name: 'Mirana', src: logo },
  { id: 6, name: 'Solana Ventures', src: logo },
];

const Sponsors = () => {
  // Duplicamos la lista de logos para crear un loop continuo
  const logos = [...sponsors, ...sponsors];

  return (
    <div className="overflow-hidden py-4">
      <p className="text-center mb-4 text-lg custom-font">
</p>

      <div className="flex items-center space-x-8 animate-scroll w-max">
        {logos.map((sponsor, index) => (
          <img key={index} src={sponsor.src} alt={sponsor.name} className="h-16 object-contain" />
        ))}
      </div>
    </div>
  );
};

export default Sponsors;