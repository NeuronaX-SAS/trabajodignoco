'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Container } from '@mui/material';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScrollToContact = () => {
    const contactFormElement = document.getElementById('contact-form');
    if (contactFormElement) {
      contactFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#DE735B] via-[#E58976] to-[#C35D45] text-white py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-20"></div>
        {/* Added geometric patterns */}
        <div className="hidden md:block absolute bottom-20 right-20">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="60" fill="white" fillOpacity="0.1"/>
            <circle cx="60" cy="60" r="40" stroke="white" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="20" fill="white" fillOpacity="0.1"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <Container maxWidth="lg" className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-semibold mb-6">
              Comunidad Laboral en Colombia
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Tu Voz, <br />
              <span className="text-white/90">Tu Poder Laboral</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
              Somos una comunidad dedicada a defender los derechos laborales en Colombia. Únete y encuentra apoyo legal, conecta con otros trabajadores y fortalece tu posición laboral.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                onClick={handleScrollToContact}
                className="bg-white text-[#DE735B] hover:bg-white/90 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buscar Apoyo Legal
              </motion.button>
              <motion.button
                onClick={handleScrollToContact}
                className="bg-transparent hover:bg-white/10 text-white border border-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conoce la Comunidad
              </motion.button>
            </div>
            
            <div className="flex items-center space-x-6 text-white">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-11 13h10a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3zm-1-11a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </motion.div>
          
          {/* Right Side Image/Illustration */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Únete a la Comunidad</h3>
                  <p className="text-white/90">Conecta con trabajadores y defiende tus derechos</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Comunidad de Trabajadores</h4>
                      <p className="text-white/80 text-sm">Conecta con otros trabajadores</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Apoyo Legal</h4>
                      <p className="text-white/80 text-sm">Asesoría legal especializada</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Sindicatos</h4>
                      <p className="text-white/80 text-sm">Conecta con sindicatos locales</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleScrollToContact}
                  className="w-full bg-white text-[#DE735B] hover:bg-white/90 font-semibold py-3 rounded-full transition duration-300 ease-in-out"
                >
                  Unirse Ahora
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;