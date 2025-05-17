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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#733A19] to-[#5C2E14] text-[#F2F0F0] py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(#F2F0F0 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
        
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#BFAF8F] rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#BFAF8F] rounded-full filter blur-3xl opacity-20"></div>
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
            <div className="inline-block bg-[#BFAF8F]/20 backdrop-blur-sm rounded-md px-4 py-1 text-sm font-semibold mb-6">
              Por la dignificación de la vida laboral
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Construyendo<br />
              <span className="text-[#BFAF8F]">juntos el trabajo digno</span>
            </h1>
            <p className="text-lg md:text-xl text-[#F2F0F0]/90 mb-8 max-w-xl">
              Somos una organización defensora de los trabajadores colombianos que promueve el trabajo digno para lograr la dignificación de la vida.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                onClick={handleScrollToContact}
                className="bg-[#BFAF8F] text-[#0E1013] hover:bg-[#D0C7AF] font-semibold py-3 px-8 rounded-md shadow-lg transition duration-300 ease-in-out"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Únete a la Causa
              </motion.button>
              <motion.button
                onClick={() => router.push('/#resources')}
                className="bg-transparent hover:bg-[#F2F0F0]/10 text-[#F2F0F0] border border-[#F2F0F0] font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Recursos Laborales
              </motion.button>
            </div>
            
            <div className="flex items-center space-x-6 text-[#F2F0F0]">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#BFAF8F] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#BFAF8F] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-11 13h10a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3zm-1-11a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#BFAF8F] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#BFAF8F] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </motion.div>
          
          {/* Right Side Card */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#BFAF8F]/20 rounded-md blur-xl opacity-30"></div>
              <div className="relative bg-[#F2F0F0]/5 backdrop-blur-sm p-6 rounded-md shadow-2xl border border-[#F2F0F0]/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Comparte tu Situación</h3>
                  <p className="text-[#F2F0F0]/80">Cuéntanos sobre tu experiencia laboral y cómo podemos ayudarte</p>
                </div>
                
                <form 
                  className="space-y-4" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleScrollToContact();
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <input 
                      type="text"
                      placeholder="Nombre completo"
                      className="bg-[#F2F0F0]/10 border border-[#F2F0F0]/30 rounded-md p-3 text-[#F2F0F0] placeholder:text-[#F2F0F0]/50 focus:outline-none focus:ring-1 focus:ring-[#BFAF8F]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <input 
                      type="email"
                      placeholder="Correo electrónico"
                      className="bg-[#F2F0F0]/10 border border-[#F2F0F0]/30 rounded-md p-3 text-[#F2F0F0] placeholder:text-[#F2F0F0]/50 focus:outline-none focus:ring-1 focus:ring-[#BFAF8F]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <select 
                      className="bg-[#F2F0F0]/10 border border-[#F2F0F0]/30 rounded-md p-3 text-[#F2F0F0] focus:outline-none focus:ring-1 focus:ring-[#BFAF8F]"
                    >
                      <option value="" className="text-[#0E1013]">Selecciona tu situación</option>
                      <option value="despido" className="text-[#0E1013]">Despido injustificado</option>
                      <option value="acoso" className="text-[#0E1013]">Acoso laboral</option>
                      <option value="salario" className="text-[#0E1013]">Problemas salariales</option>
                      <option value="contrato" className="text-[#0E1013]">Irregularidad contractual</option>
                      <option value="sindical" className="text-[#0E1013]">Afiliación sindical</option>
                      <option value="otro" className="text-[#0E1013]">Otro</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-[#BFAF8F] hover:bg-[#D0C7AF] text-[#0E1013] font-semibold py-3 rounded-md transition duration-300 ease-in-out"
                  >
                    Continuar
                  </button>
                  
                  <p className="text-[#F2F0F0]/70 text-xs text-center">
                    Al enviar este formulario aceptas nuestra política de privacidad y tratamiento de datos.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;