'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Sample union data
const unionData = [
  {
    id: 'u1',
    name: 'Sindicato Nacional de Trabajadores',
    location: 'Bogotá',
    coordinates: { lat: 4.624335, lng: -74.063644 },
    type: 'Industrial',
    members: 3500
  },
  {
    id: 'u2',
    name: 'Central Unitaria de Trabajadores',
    location: 'Medellín',
    coordinates: { lat: 6.244338, lng: -75.573553 },
    type: 'Confederación',
    members: 12000
  },
  {
    id: 'u3',
    name: 'Unión de Trabajadores Agrícolas',
    location: 'Cali',
    coordinates: { lat: 3.451647, lng: -76.532024 },
    type: 'Sectorial',
    members: 4200
  },
  {
    id: 'u4',
    name: 'Asociación de Trabajadores Informales',
    location: 'Barranquilla',
    coordinates: { lat: 10.963889, lng: -74.796387 },
    type: 'Asociación',
    members: 2100
  },
  {
    id: 'u5',
    name: 'Federación de Educadores',
    location: 'Bucaramanga',
    coordinates: { lat: 7.119349, lng: -73.122742 },
    type: 'Federación',
    members: 5800
  }
];

const UnionsMapSection: React.FC = () => {
  const [selectedUnion, setSelectedUnion] = React.useState<string | null>(null);
  
  return (
    <section id="unions-map" className="py-20 bg-[#F2F0F0] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#BFAF8F]/20 rounded-full filter blur-3xl opacity-20 -mr-48 -mb-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-md bg-[#BFAF8F]/30 text-[#733A19] text-sm font-semibold mb-4">
            Organizaciones de Trabajadores
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0E1013]">
            Red de organizaciones por el trabajo digno
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Conoce las diferentes organizaciones sindicales y colectivos de trabajadores que 
            luchan por condiciones laborales dignas en todo el territorio colombiano.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Union List */}
          <div className="space-y-4">
            <motion.h3
              className="text-xl font-bold text-[#733A19] mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              Organizaciones destacadas
            </motion.h3>
            
            {unionData.map((union, index) => (
              <motion.div
                key={union.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="cursor-pointer"
                onClick={() => setSelectedUnion(union.id === selectedUnion ? null : union.id)}
              >
                <div 
                  className={`p-4 rounded-lg transition-all ${
                    selectedUnion === union.id 
                      ? 'bg-[#733A19] text-white shadow-md' 
                      : 'bg-white hover:bg-[#BFAF8F]/10 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${selectedUnion === union.id ? 'text-white' : 'text-[#0E1013]'}`}>
                        {union.name}
                      </h4>
                      <div className="flex items-center mt-1">
                        <LocationOnIcon sx={{ fontSize: '0.875rem' }} className={`${selectedUnion === union.id ? 'text-[#BFAF8F]' : 'text-[#733A19]'} mr-1`} />
                        <span className={`text-xs ${selectedUnion === union.id ? 'text-[#BFAF8F]' : 'text-gray-500'}`}>
                          {union.location}
                        </span>
                      </div>
                    </div>
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        selectedUnion === union.id ? 'bg-[#BFAF8F]/20' : 'bg-[#733A19]/10' 
                      }`}
                    >
                      <span className={`text-xs font-bold ${selectedUnion === union.id ? 'text-[#BFAF8F]' : 'text-[#733A19]'}`}>
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  {selectedUnion === union.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-3 border-t border-[#BFAF8F]/30"
                    >
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div>
                          <span className="text-[#BFAF8F] block text-xs">Tipo</span>
                          <span>{union.type}</span>
                        </div>
                        <div>
                          <span className="text-[#BFAF8F] block text-xs">Miembros</span>
                          <span>{union.members.toLocaleString()}</span>
                        </div>
                      </div>
                      <Button
                        variant="text"
                        size="small"
                        sx={{ 
                          color: '#F2F0F0',
                          px: 0,
                          '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } 
                        }}
                      >
                        Ver más información
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
            
            <div className="pt-4 text-center">
              <Button
                variant="outlined"
                size="medium"
                sx={{ 
                  borderColor: '#733A19',
                  color: '#733A19',
                  '&:hover': { 
                    borderColor: '#5C2E14',
                    backgroundColor: 'rgba(115, 58, 25, 0.04)'
                  } 
                }}
              >
                Ver todas las organizaciones
              </Button>
            </div>
          </div>
          
          {/* Right Column - Map */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#BFAF8F]/20 h-[500px] relative">
              {/* This would be an actual map in a production environment */}
              <div className="absolute inset-0 bg-[#BFAF8F]/10 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Colombia map outline - simplified representation */}
                  <svg
                    viewBox="0 0 800 800"
                    className="absolute inset-0 w-full h-full p-8"
                    fill="none"
                    stroke="#153959"
                    strokeWidth="2"
                  >
                    <path d="M400,100 Q500,150 550,250 T600,450 Q550,600 450,700 Q350,750 250,650 Q200,500 220,350 Q250,200 350,120 Z" />
                  </svg>
                  
                  {/* Union location markers */}
                  {unionData.map((union, index) => (
                    <div
                      key={union.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                        selectedUnion === union.id ? 'z-20' : 'z-10'
                      }`}
                      style={{
                        left: `${(union.coordinates.lng + 80) * 3}px`,  // Simple mapping for demo
                        top: `${(union.coordinates.lat - 2) * 60}px`,   // Simple mapping for demo
                      }}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full ${
                          selectedUnion === union.id 
                            ? 'bg-[#733A19] ring-4 ring-[#733A19]/30 animate-pulse' 
                            : 'bg-[#153959] hover:bg-[#733A19]'
                        }`}
                      ></div>
                      
                      {selectedUnion === union.id && (
                        <div className="absolute mt-2 bg-white rounded-md shadow-lg p-2 text-xs font-medium text-[#0E1013] whitespace-nowrap">
                          {union.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md p-3">
                  <div className="text-xs text-gray-500 mb-2">Leyenda</div>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-[#153959] mr-2"></div>
                    <span className="text-xs">Organización sindical</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#733A19] mr-2"></div>
                    <span className="text-xs">Seleccionado</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              Mapa interactivo de organizaciones que luchan por el trabajo digno en Colombia
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UnionsMapSection; 