'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FBE0D8] rounded-full filter blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FBE0D8] rounded-full filter blur-3xl opacity-20 -ml-48 -mb-48"></div>
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
            Sobre Nosotros
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Defendemos los derechos laborales en Colombia
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            En Trabajo Digno creemos que todos los trabajadores merecen respeto, reconocimiento y protección legal. 
            Somos una organización comprometida con la justicia laboral y los derechos de los trabajadores colombianos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#DE735B]/10 rounded-2xl blur-xl"></div>
              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                <div className="w-full h-96 bg-gradient-to-br from-[#DE735B] to-[#C35D45] flex items-center justify-center">
                  {/* This is a placeholder for an actual image */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Nuestra Misión</h3>
              <p className="text-gray-600">
                Empoderar a los trabajadores colombianos proporcionándoles herramientas legales, representación y una comunidad 
                donde encontrar apoyo para defender sus derechos laborales y mejorar sus condiciones de trabajo.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Nuestros Valores</h3>
              <ul className="space-y-3">
                {[
                  {
                    title: 'Justicia',
                    description: 'Luchamos por un trato justo y equitativo para todos los trabajadores.'
                  },
                  {
                    title: 'Solidaridad',
                    description: 'Creemos en el poder colectivo y en apoyarnos mutuamente.'
                  },
                  {
                    title: 'Transparencia',
                    description: 'Actuamos con honestidad y claridad en todas nuestras acciones.'
                  }
                ].map((value, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#DE735B] flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{value.title}</h4>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={() => {
                  const contactFormElement = document.getElementById('contact-form');
                  if (contactFormElement) {
                    contactFormElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-[#DE735B] hover:bg-[#C35D45] text-white font-semibold py-3 px-8 rounded-full shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                Únete a Nuestra Causa
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 