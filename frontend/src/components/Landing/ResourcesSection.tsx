'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Grid, Button, Typography, Card, CardContent, CardMedia, IconButton, Chip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

// Sample resources data
const resourcesData = [
  {
    id: 'r1',
    title: 'Guía Básica de Derechos Laborales',
    description: 'Todo lo que necesitas saber sobre tus derechos fundamentales como trabajador/a en Colombia.',
    type: 'PDF',
    category: 'Derechos Básicos',
    icon: <ArticleIcon />,
    downloadUrl: '#',
    popular: true
  },
  {
    id: 'r2',
    title: 'Acoso Laboral: Cómo Identificarlo y Denunciarlo',
    description: 'Cartilla práctica sobre el acoso laboral, sus formas y los mecanismos legales para enfrentarlo.',
    type: 'PDF',
    category: 'Problemas Laborales',
    icon: <ArticleIcon />,
    downloadUrl: '#',
    popular: true
  },
  {
    id: 'r3',
    title: 'Contratación Laboral vs. Prestación de Servicios',
    description: 'Diferencias, ventajas y riesgos de cada modalidad de contratación en Colombia.',
    type: 'PDF',
    category: 'Contratos',
    icon: <ArticleIcon />,
    downloadUrl: '#',
    popular: false
  },
  {
    id: 'r4',
    title: 'Video: Los Principios del Trabajo Digno',
    description: 'Charla educativa sobre los fundamentos del trabajo digno según estándares internacionales.',
    type: 'Video',
    category: 'Formación',
    icon: <OndemandVideoIcon />,
    downloadUrl: '#',
    popular: false
  },
  {
    id: 'r5',
    title: 'Manual de Organización Colectiva',
    description: 'Herramientas prácticas para organizarse con compañeros/as de trabajo por derechos comunes.',
    type: 'PDF',
    category: 'Organización',
    icon: <MenuBookIcon />,
    downloadUrl: '#',
    popular: true
  },
  {
    id: 'r6',
    title: 'Seguridad Social para Trabajadores Independientes',
    description: 'Todo lo que debes saber sobre afiliación y pago de aportes al sistema de seguridad social.',
    type: 'PDF',
    category: 'Seguridad Social',
    icon: <ArticleIcon />,
    downloadUrl: '#',
    popular: false
  }
];

const ResourcesSection: React.FC = () => {
  const router = useRouter();
  
  return (
    <section id="resources" className="py-20 bg-[#F2F0F0] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#153959] rounded-full filter blur-3xl opacity-10 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#733A19] rounded-full filter blur-3xl opacity-10 -ml-48 -mb-48"></div>
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
            Recursos Educativos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0E1013]">
            Herramientas para la defensa de tus derechos
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Accede a nuestra biblioteca de recursos gratuitos diseñados para empoderar a los trabajadores
            con conocimientos prácticos sobre sus derechos laborales y cómo defenderlos colectivamente.
          </p>
        </motion.div>

        {/* Resource Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['Todos', 'Derechos Básicos', 'Organización', 'Problemas Laborales', 'Formación'].map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                category === 'Todos' ? 
                'bg-[#733A19] text-white' : 
                'bg-[#BFAF8F]/20 text-[#0E1013] hover:bg-[#BFAF8F]/30'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resourcesData.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-[#BFAF8F]/20 h-full flex flex-col">
                <div className={`h-3 ${
                  resource.category === 'Derechos Básicos' ? 'bg-[#733A19]' : 
                  resource.category === 'Organización' ? 'bg-[#153959]' :
                  'bg-[#BFAF8F]'
                }`}></div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <span className={`inline-block text-xs font-bold px-2 py-1 rounded-sm mb-2 ${
                        resource.type === 'PDF' ? 'bg-[#733A19]/10 text-[#733A19]' :
                        resource.type === 'Video' ? 'bg-[#153959]/10 text-[#153959]' :
                        'bg-[#BFAF8F]/20 text-[#0E1013]'
                      }`}>
                        {resource.type}
                      </span>
                      <h3 className="text-lg font-bold text-[#0E1013] leading-tight">{resource.title}</h3>
                    </div>
                    <div className="ml-4">
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
                        resource.type === 'PDF' ? 'bg-[#733A19]/10 text-[#733A19]' :
                        resource.type === 'Video' ? 'bg-[#153959]/10 text-[#153959]' :
                        'bg-[#BFAF8F]/20 text-[#0E1013]'
                      }`}>
                        {resource.icon}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {resource.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-[#0E1013]/60 font-medium">
                      {resource.category}
                    </span>
                    <Button
                      variant="text"
                      startIcon={<DownloadIcon />}
                      size="small"
                      href={resource.downloadUrl}
                      sx={{ 
                        color: '#733A19',
                        '&:hover': { backgroundColor: 'rgba(115, 58, 25, 0.04)' }
                      }}
                    >
                      Descargar
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="bg-gradient-to-br from-[#733A19] to-[#5C2E14] rounded-lg p-8 md:p-10 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(#F2F0F0 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
            }}></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="mb-6 md:mb-0 md:mr-10">
              <h3 className="text-2xl md:text-3xl font-bold text-[#F2F0F0] mb-3">¿No encuentras lo que buscas?</h3>
              <p className="text-[#F2F0F0]/80 max-w-xl">
                Contacta con nuestro equipo para solicitar recursos específicos o compartir tus propias experiencias
                y conocimientos que puedan ayudar a otros trabajadores.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  const contactFormElement = document.getElementById('contact-form');
                  if (contactFormElement) {
                    contactFormElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                sx={{ 
                  bgcolor: '#F2F0F0',
                  color: '#733A19',
                  fontWeight: 600,
                  px: 4,
                  '&:hover': {
                    bgcolor: '#BFAF8F',
                  }
                }}
              >
                Contáctanos
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesSection; 