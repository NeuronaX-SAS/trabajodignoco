'use client';

import React from 'react';
import { motion } from 'framer-motion';

const UnionsMapSection: React.FC = () => {
  return (
    <section id="unions-map" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FBE0D8] rounded-full filter blur-3xl opacity-20 -mr-48 -mb-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#FBE0D8] text-[#DE735B] text-sm font-semibold mb-4">
            Sindicatos Cerca de Ti
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Encuentra sindicatos en Bogotá
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Localiza los sindicatos más cercanos a tu ubicación y conecta con comunidades 
            laborales que defienden intereses similares a los tuyos.
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Using OpenStreetMap through an iframe - more accessible than Google Maps */}
          <iframe 
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.1977%2C4.5951%2C-74.0291%2C4.7260&amp;layer=mapnik&amp;marker=4.6605%2C-74.1134" 
            width="100%" 
            height="500" 
            frameBorder="0" 
            style={{ border: 0 }} 
            title="Mapa de sindicatos en Bogotá"
            className="w-full"
            loading="lazy"
          ></iframe>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Unión Sindical Obrera de la Industria del Petróleo (USO)',
              address: 'Calle 35 #7-25, Bogotá',
              phone: '+57 1 288 1100',
              type: 'Industrial'
            },
            {
              name: 'CUT - Central Unitaria de Trabajadores',
              address: 'Calle 44 #53-37, Bogotá',
              phone: '+57 1 288 1508',
              type: 'Confederación'
            },
            {
              name: 'FECODE - Federación Colombiana de Educadores',
              address: 'Carrera 13A #34-36, Bogotá',
              phone: '+57 1 338 1711',
              type: 'Sectorial'
            }
          ].map((union, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
            >
              <div className="w-10 h-10 rounded-full bg-[#FBE0D8] text-[#DE735B] flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{union.name}</h3>
              <div className="text-sm text-[#DE735B] font-medium mb-3">{union.type}</div>
              <div className="space-y-2 text-gray-600 text-sm">
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {union.address}
                </p>
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {union.phone}
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(union.address)}`, '_blank')}
                  className="text-[#DE735B] hover:text-[#C35D45] text-sm font-medium flex items-center transition-colors"
                >
                  Ver en el mapa
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white mt-10 p-8 rounded-xl shadow-md border border-gray-100 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">¿Representas a un sindicato?</h3>
          <p className="text-gray-600 mb-6">
            Si representas a un sindicato y deseas aparecer en este mapa, contáctanos para incluirte en nuestra red
            y aumentar tu visibilidad en la comunidad laboral.
          </p>
          <button
            onClick={() => {
              const contactFormElement = document.getElementById('contact-form');
              if (contactFormElement) {
                contactFormElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-[#DE735B] hover:bg-[#C35D45] text-white font-semibold py-3 px-8 rounded-full shadow transition duration-300 ease-in-out"
          >
            Contactar para Inclusión
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default UnionsMapSection; 