'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Grid, Card, CardContent, Chip, IconButton, Tab, Tabs } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

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

// TikTok videos data
const tiktokVideos = [
  {
    id: 'v1',
    title: 'Conoce tus derechos ante un despido injustificado',
    embedId: '7250560678448450821',
    thumbnail: '/tiktok-thumbnail-1.jpg',
    views: '24.5K',
    likes: '1.2K',
    duration: '0:58'
  },
  {
    id: 'v2',
    title: '3 pasos para denunciar acoso laboral correctamente',
    embedId: '7242283115496344837',
    thumbnail: '/tiktok-thumbnail-2.jpg',
    views: '18.3K',
    likes: '876',
    duration: '1:15'
  },
  {
    id: 'v3',
    title: 'Diferencias entre contrato laboral y prestación de servicios',
    embedId: '7235791999221050629',
    thumbnail: '/tiktok-thumbnail-3.jpg',
    views: '32.1K',
    likes: '1.5K',
    duration: '1:08'
  },
  {
    id: 'v4',
    title: 'Lo que debes saber sobre horas extras y recargos',
    embedId: '7229836422613426437',
    thumbnail: '/tiktok-thumbnail-4.jpg',
    views: '15.7K',
    likes: '943',
    duration: '0:45'
  }
];

const FormationSection: React.FC = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

        {/* Tabs for switching between workshops and videos */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            centered
            sx={{
              '& .MuiTab-root': { 
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                mx: 2,
                color: '#0E1013',
                '&.Mui-selected': { color: '#733A19' }
              },
              '& .MuiTabs-indicator': { 
                backgroundColor: '#733A19',
                height: 3,
                borderRadius: '3px'
              }
            }}
          >
            <Tab label="Próximos Talleres" />
            <Tab label="Videos Educativos" />
          </Tabs>
        </Box>

        {/* Workshop Content */}
        {tabValue === 0 && (
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
                            onClick={() => {
                              const contactFormElement = document.getElementById('contact-form');
                              if (contactFormElement) {
                                contactFormElement.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
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
        )}

        {/* TikTok Videos Content */}
        {tabValue === 1 && (
          <div>
            <div className="mb-8">
              <motion.p 
                className="text-center text-gray-600 max-w-3xl mx-auto mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Aprende sobre tus derechos laborales a través de nuestros videos educativos. Visita nuestro canal de TikTok <a href="https://www.tiktok.com/@trabajodigno.col" target="_blank" rel="noopener noreferrer" className="text-[#733A19] font-semibold hover:underline">@trabajodigno.col</a> para más contenido.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiktokVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md border border-[#BFAF8F]/20 h-full flex flex-col"
                >
                  <div className="relative aspect-[9/16] w-full bg-black">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.tiktok.com/embed/v2/${video.embedId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                        style={{ maxHeight: '500px' }}
                      ></iframe>
                    </div>
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-bold text-[#0E1013] mb-2 line-clamp-2">{video.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {video.views} vistas
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        {video.likes}
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {video.duration}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <Button
                      variant="text"
                      fullWidth
                      href={`https://www.tiktok.com/@trabajodigno.col/video/${video.embedId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#733A19',
                        '&:hover': { backgroundColor: 'rgba(115, 58, 25, 0.04)' }
                      }}
                    >
                      Ver en TikTok
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button
                variant="contained"
                href="https://www.tiktok.com/@trabajodigno.col"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  bgcolor: '#733A19',
                  color: 'white',
                  fontWeight: 600,
                  px: 4,
                  '&:hover': {
                    bgcolor: '#5C2E14',
                  }
                }}
              >
                Ver más videos en TikTok
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormationSection; 