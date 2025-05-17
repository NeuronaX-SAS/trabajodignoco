'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';

// Sample workshops data
const workshopData = [
  {
    id: 'w1',
    title: 'Conoce tus Derechos Laborales Fundamentales',
    description: 'Taller práctico donde aprenderás a identificar y defender tus derechos fundamentales en el trabajo.',
    date: '15 Jun 2023',
    time: '18:00 - 20:00',
    location: 'Virtual (Zoom)',
    instructor: 'María González',
    spots: 25,
    available: true
  },
  {
    id: 'w2',
    title: 'Cómo Organizarse en el Lugar de Trabajo',
    description: 'Aprende estrategias efectivas para la organización colectiva y la defensa de derechos comunes.',
    date: '22 Jun 2023',
    time: '17:00 - 19:30',
    location: 'Sede Central Bogotá',
    instructor: 'Carlos Rodríguez',
    spots: 15,
    available: true
  },
  {
    id: 'w3',
    title: 'Negociación Colectiva: Bases y Estrategias',
    description: 'Herramientas y tácticas para lograr negociaciones efectivas en defensa de los derechos laborales.',
    date: '05 Jul 2023',
    time: '18:00 - 21:00',
    location: 'Virtual (Zoom)',
    instructor: 'Laura Martínez',
    spots: 30,
    available: false
  }
];

const FormationSection: React.FC = () => {
  const router = useRouter();
  
  return (
    <section id="education" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#BFAF8F]/20 rounded-full filter blur-3xl opacity-20 -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#733A19]/20 rounded-full filter blur-3xl opacity-20 -mr-48 -mb-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-md bg-[#BFAF8F]/30 text-[#733A19] text-sm font-semibold mb-4">
            Formación para Trabajadores
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0E1013]">
            Talleres y capacitaciones gratuitas
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Participa en nuestros espacios formativos diseñados para empoderar a los trabajadores con 
            conocimientos y habilidades que fortalezcan su capacidad de acción individual y colectiva.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Workshop List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {workshopData.map((workshop, index) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md border border-[#BFAF8F]/20 p-6 relative">
                    {!workshop.available && (
                      <div className="absolute top-0 right-0 bg-[#0E1013]/80 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        Completo
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Date Column */}
                      <div className="flex-shrink-0 w-full md:w-auto flex md:flex-col items-center justify-center md:justify-start gap-2 md:gap-0">
                        <div className="w-16 h-16 rounded-full bg-[#733A19]/10 text-[#733A19] flex items-center justify-center">
                          <CalendarMonthIcon />
                        </div>
                        <div className="text-center md:mt-2">
                          <div className="text-sm text-gray-500">
                            {workshop.date.split(' ')[0]}
                          </div>
                          <div className="text-xl font-bold text-[#733A19]">
                            {workshop.date.split(' ')[1]}
                          </div>
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#0E1013] mb-2">{workshop.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{workshop.description}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center text-gray-600 text-sm">
                            <AccessTimeIcon fontSize="small" className="mr-1 text-[#733A19]" />
                            {workshop.time}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <LocationOnIcon fontSize="small" className="mr-1 text-[#733A19]" />
                            {workshop.location}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <PeopleIcon fontSize="small" className="mr-1 text-[#733A19]" />
                            {workshop.spots} cupos
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#733A19] mr-2"></span>
                            Por {workshop.instructor}
                          </div>
                        </div>
                        
                        <Button
                          variant="outlined"
                          size="small"
                          disabled={!workshop.available}
                          sx={{ 
                            borderColor: workshop.available ? '#733A19' : 'rgba(0,0,0,0.12)',
                            color: workshop.available ? '#733A19' : 'rgba(0,0,0,0.38)',
                            '&:hover': {
                              borderColor: '#5C2E14',
                              backgroundColor: 'rgba(115, 58, 25, 0.04)',
                            },
                          }}
                        >
                          {workshop.available ? 'Inscribirme' : 'Sin cupos disponibles'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[#153959] to-[#0E1013] text-white p-8 rounded-lg shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-4">Formación para la acción</h3>
              <p className="text-white/80 mb-6">
                Nuestros talleres están diseñados bajo principios de educación popular y aprendizaje colectivo,
                privilegiando el saber y las experiencias de los y las trabajadoras.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#BFAF8F]/20 text-[#BFAF8F] flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Formación gratuita</h4>
                    <p className="text-white/70 text-sm">Todos nuestros talleres son gratuitos y accesibles para trabajadores de cualquier sector.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#BFAF8F]/20 text-[#BFAF8F] flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Formato híbrido</h4>
                    <p className="text-white/70 text-sm">Realizamos talleres presenciales y virtuales para facilitar la participación desde cualquier lugar.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#BFAF8F]/20 text-[#BFAF8F] flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Materiales incluidos</h4>
                    <p className="text-white/70 text-sm">Proporcionamos todos los recursos y materiales necesarios para el aprendizaje.</p>
                  </div>
                </div>
              </div>
              
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  const contactElement = document.getElementById('contact-form');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                sx={{ 
                  bgcolor: '#BFAF8F',
                  color: '#0E1013',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#D0C7AF',
                  }
                }}
              >
                Solicitar un taller
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormationSection; 