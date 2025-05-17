'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample news data - in a real application, this would come from an API or CMS
const newsItems = [
  {
    id: '1',
    title: 'Nueva reforma laboral en Colombia: Lo que debes saber',
    excerpt: 'Las recientes modificaciones a la legislación laboral colombiana traen cambios significativos para trabajadores y empresas. Analizamos sus implicaciones.',
    date: '15 Jun 2023',
    imageUrl: '/placeholder-news-1.jpg',
    category: 'Legislación'
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
    title: 'Cómo afiliarte a un sindicato y por qué es importante',
    excerpt: 'La afiliación sindical es un derecho fundamental del trabajador. Te explicamos el proceso y los beneficios que puede aportarte.',
    date: '27 Abr 2023',
    imageUrl: '/placeholder-news-3.jpg',
    category: 'Sindicalismo'
  }
];

const NewsSection: React.FC = () => {
  return (
    <section id="news" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FBE0D8] rounded-full filter blur-3xl opacity-20 -ml-48 -mt-48"></div>
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
            Noticias y Artículos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Mantente informado sobre tus derechos
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nuestros expertos en derecho laboral analizan las noticias más relevantes y comparten información
            clave para que conozcas y puedas defender tus derechos como trabajador.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="h-48 bg-gradient-to-br from-[#DE735B]/90 to-[#C35D45]/90 relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id={`grid-${item.id}`}
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="5" cy="5" r="1" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#grid-${item.id})`} />
                  </svg>
                </div>
                <span className="text-white font-semibold px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm">
                  {item.category}
                </span>
              </div>
              
              <div className="p-6">
                <div className="text-xs text-gray-500 mb-2">{item.date}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 mb-5 text-sm line-clamp-3">{item.excerpt}</p>
                <Link 
                  href={`#`} // This would point to the full article in a real application
                  className="inline-flex items-center text-[#DE735B] font-medium hover:text-[#C35D45] transition-colors"
                >
                  Leer más
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="#" // This would point to the blog archive in a real application
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-full transition duration-300"
          >
            Ver Todas las Noticias
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 