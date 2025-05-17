'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button, Tabs, Tab, Box, Chip, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';
import GavelIcon from '@mui/icons-material/Gavel';
import GroupsIcon from '@mui/icons-material/Groups';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Blog categories
const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'derechos', name: 'Derechos Laborales', icon: <GavelIcon /> },
  { id: 'organizacion', name: 'Organización', icon: <GroupsIcon /> },
  { id: 'recursos', name: 'Recursos Educativos', icon: <BookIcon /> },
  { id: 'seguridad', name: 'Seguridad Social', icon: <HealthAndSafetyIcon /> },
  { id: 'contratos', name: 'Contratos', icon: <BusinessCenterIcon /> },
];

// Expanded news/blog data
const blogItems = [
  {
    id: '1',
    title: 'Cartilla: Conozca sus derechos laborales fundamentales',
    excerpt: 'Guía práctica sobre los derechos laborales más importantes que todo trabajador colombiano debe conocer para defender su dignidad en el trabajo.',
    content: 'En Colombia, todo trabajador tiene derecho a un salario mínimo, afiliación a seguridad social, horarios justos y protección contra el acoso laboral. Esta guía explica en detalle los derechos fundamentales y proporciona herramientas prácticas para defenderlos en casos de vulneración.',
    date: '15 Jun 2023',
    author: 'María Gómez',
    readTime: '10 min',
    imageUrl: '/placeholder-news-1.jpg',
    category: 'Recursos Educativos',
    tags: ['derechos laborales', 'guía práctica', 'dignidad laboral']
  },
  {
    id: '2',
    title: 'Derechos de los trabajadores en plataformas digitales',
    excerpt: 'Los trabajadores de aplicaciones como Rappi, Uber y otras plataformas digitales tienen derechos laborales que deben ser respetados. Conoce cuáles son.',
    content: 'Los trabajadores de plataformas digitales enfrentan desafíos particulares debido a su clasificación como "contratistas independientes". Sin embargo, existen elementos de subordinación que pueden configurar una relación laboral. Esta guía explora los derechos que deben exigir y las acciones legales disponibles.',
    date: '03 May 2023',
    author: 'Carlos Rodríguez',
    readTime: '8 min',
    imageUrl: '/placeholder-news-2.jpg',
    category: 'Derechos Laborales',
    tags: ['economía digital', 'rappi', 'uber', 'plataformas']
  },
  {
    id: '3',
    title: 'Cómo organizarse colectivamente en tu lugar de trabajo',
    excerpt: 'Guía práctica para la organización colectiva de los trabajadores: cómo fortalecer lazos de solidaridad y construir poder desde la base.',
    content: 'La organización colectiva es fundamental para la defensa efectiva de los derechos laborales. Este artículo explica estrategias prácticas para iniciar comités en el lugar de trabajo, mapear aliados potenciales y desarrollar acciones colectivas efectivas que puedan conducir a mejoras concretas.',
    date: '27 Abr 2023',
    author: 'Laura Martínez',
    readTime: '12 min',
    imageUrl: '/placeholder-news-3.jpg',
    category: 'Organización',
    tags: ['organización', 'acción colectiva', 'solidaridad']
  },
  {
    id: '4',
    title: 'Prestaciones sociales: Guía completa para trabajadores colombianos',
    excerpt: 'Todo lo que necesitas saber sobre prima, cesantías, vacaciones y demás prestaciones a las que tienes derecho como trabajador en Colombia.',
    content: 'Las prestaciones sociales son beneficios adicionales al salario que todo empleador debe pagar. Este artículo explica detalladamente cada una de ellas, cómo calcularlas y qué hacer si tu empleador no las está pagando correctamente.',
    date: '15 Mar 2023',
    author: 'Andrés López',
    readTime: '15 min',
    imageUrl: '/placeholder-news-4.jpg',
    category: 'Derechos Laborales',
    tags: ['prestaciones', 'cesantías', 'prima', 'vacaciones']
  },
  {
    id: '5',
    title: 'Sistema de riesgos laborales: Protección ante accidentes y enfermedades',
    excerpt: 'Conoce cómo funciona el sistema de riesgos laborales en Colombia y qué hacer si sufres un accidente o enfermedad relacionada con tu trabajo.',
    content: 'El Sistema General de Riesgos Laborales protege a los trabajadores contra accidentes y enfermedades relacionadas con el trabajo. Esta guía explica los procedimientos para reportar incidentes, obtener atención médica y recibir compensación por incapacidades temporales o permanentes.',
    date: '08 Feb 2023',
    author: 'Patricia Ramírez',
    readTime: '9 min',
    imageUrl: '/placeholder-news-5.jpg',
    category: 'Seguridad Social',
    tags: ['riesgos laborales', 'ARL', 'accidentes', 'enfermedades laborales']
  },
  {
    id: '6',
    title: 'Entendiendo las modalidades de contratación en Colombia',
    excerpt: 'Diferencias clave entre contrato laboral, prestación de servicios y otras modalidades utilizadas en Colombia.',
    content: 'Existen importantes diferencias legales entre las distintas modalidades de contratación. Este artículo explora las ventajas, desventajas y derechos asociados con cada tipo de contrato, ayudándote a entender cuál deberías tener según tus circunstancias laborales actuales.',
    date: '20 Ene 2023',
    author: 'Fernando Castro',
    readTime: '11 min',
    imageUrl: '/placeholder-news-6.jpg',
    category: 'Contratos',
    tags: ['contratos', 'prestación de servicios', 'contrato a término fijo', 'contrato a término indefinido']
  }
];

const NewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter blogs based on category and search query
  const filteredBlogs = blogItems.filter(blog => {
    const matchesCategory = selectedCategory === 'todos' || blog.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <section id="news" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#BFAF8F]/30 rounded-full filter blur-3xl opacity-20 -ml-48 -mt-48"></div>
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
            Noticias y Recursos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0E1013]">
            Educación para la acción
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nuestra biblioteca de recursos educativos y noticias está diseñada para empoderar a los trabajadores
            con conocimientos prácticos sobre sus derechos y herramientas para la acción colectiva.
          </p>
        </motion.div>

        {/* Search and filters */}
        <div className="mb-10">
          <div className="max-w-lg mx-auto mb-8">
            <TextField
              fullWidth
              placeholder="Buscar artículos, guías, recursos..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#733A19' }} />
                  </InputAdornment>
                ),
                sx: { 
                  borderRadius: 2,
                  bgcolor: 'white',
                  '& fieldset': { 
                    borderColor: '#BFAF8F50',
                  },
                  '&:hover fieldset': { 
                    borderColor: '#BFAF8F',
                  },
                }
              }}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  category.id === selectedCategory ? 
                  'bg-[#733A19] text-white' : 
                  'bg-[#BFAF8F]/20 text-[#0E1013] hover:bg-[#BFAF8F]/30'
                }`}
              >
                {category.icon && <span className="mr-2">{category.icon}</span>}
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Blog grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <BookIcon sx={{ fontSize: 60, color: '#BFAF8F', mb: 2 }} />
            <h3 className="text-2xl font-bold text-[#0E1013] mb-2">No se encontraron resultados</h3>
            <p className="text-gray-600 mb-6">
              No hemos encontrado artículos que coincidan con tu búsqueda. 
              Intenta con otros términos o explora todas las categorías.
            </p>
            <Button
              variant="outlined"
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              sx={{ 
                borderColor: '#733A19', 
                color: '#733A19',
                '&:hover': { borderColor: '#5C2E14', backgroundColor: 'rgba(115, 58, 25, 0.04)' }
              }}
            >
              Ver todos los artículos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md border border-[#BFAF8F]/20 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
              >
                <div className="h-48 bg-[#153959] relative overflow-hidden">
                  <div className="absolute top-0 left-0 bg-[#733A19] text-white text-xs font-bold px-3 py-1 z-10">
                    {blog.category}
                  </div>
                  <div className="w-full h-full bg-gradient-to-br from-[#733A19]/20 to-[#153959]/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4 flex items-center text-xs text-gray-500">
                    <CalendarMonthIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    {blog.date}
                    <span className="mx-2">•</span>
                    <span>{blog.readTime} lectura</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0E1013] mb-3 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-5 text-sm line-clamp-3 flex-grow">{blog.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <Chip 
                        key={tag}
                        label={tag} 
                        size="small"
                        sx={{ 
                          backgroundColor: '#BFAF8F20', 
                          color: '#733A19',
                          fontSize: '0.7rem',
                          height: 22
                        }} 
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#BFAF8F]/30 flex items-center justify-center text-[#733A19] font-bold text-sm">
                        {blog.author.split(' ').map(name => name[0]).join('')}
                      </div>
                      <span className="text-xs text-gray-600 ml-2">{blog.author}</span>
                    </div>
                    <Button
                      variant="text"
                      onClick={() => {
                        const contactFormElement = document.getElementById('contact-form');
                        if (contactFormElement) {
                          contactFormElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      sx={{ 
                        color: '#733A19',
                        fontWeight: 500,
                        '&:hover': { backgroundColor: 'rgba(115, 58, 25, 0.04)' }
                      }}
                    >
                      Leer más
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {filteredBlogs.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="contained"
              onClick={() => {
                const contactFormElement = document.getElementById('contact-form');
                if (contactFormElement) {
                  contactFormElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              sx={{ 
                bgcolor: '#733A19', 
                color: 'white', 
                fontWeight: 600,
                '&:hover': { bgcolor: '#5C2E14' }
              }}
            >
              Explorar Todos los Recursos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection; 