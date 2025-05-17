'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample news data - in a real application, this would come from an API or CMS
const newsItems = [
  {
    id: '1',
    title: 'Cartilla: Conozca sus derechos laborales fundamentales',
    excerpt: 'Guía práctica sobre los derechos laborales más importantes que todo trabajador colombiano debe conocer para defender su dignidad en el trabajo.',
    date: '15 Jun 2023',
    imageUrl: '/placeholder-news-1.jpg',
    category: 'Recursos Educativos'
  },
  {
    id: '2',
    title: 'Derechos de los trabajadores en plataformas digitales',
    excerpt: 'Los trabajadores de aplicaciones como Rappi, Uber y otras plataformas digitales tienen derechos laborales que deben ser respetados. Conoce cuáles son.',
    date: '03 May 2023',
    imageUrl: '/placeholder-news-2.jpg',
    category: 'Derechos Laborales'
  },
  {
    id: '3',
    title: 'Cómo organizarse colectivamente en tu lugar de trabajo',
    excerpt: 'Guía práctica para la organización colectiva de los trabajadores: cómo fortalecer lazos de solidaridad y construir poder desde la base.',
    date: '27 Abr 2023',
    imageUrl: '/placeholder-news-3.jpg',
    category: 'Organización'
  }
];

const NewsSection: React.FC = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md border border-[#BFAF8F]/20 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-[#153959] relative overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#733A19] text-white text-xs font-bold px-3 py-1">
                  {item.category}
                </div>
                <div className="w-full h-full bg-gradient-to-br from-[#733A19]/20 to-[#153959]/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs text-gray-500 mb-2">{item.date}</div>
                <h3 className="text-xl font-bold text-[#0E1013] mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 mb-5 text-sm line-clamp-3">{item.excerpt}</p>
                <Link 
                  href={`#`} // This would point to the full article in a real application
                  className="inline-flex items-center text-[#733A19] font-medium hover:text-[#5C2E14] transition-colors"
                >
                  Descargar recurso
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/#resources" 
            className="inline-block bg-[#733A19] hover:bg-[#5C2E14] text-white font-semibold py-3 px-8 rounded-md transition duration-300"
          >
            Explorar Todos los Recursos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 