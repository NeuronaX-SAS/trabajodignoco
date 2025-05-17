'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Container, useMediaQuery, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Construyendo juntos el trabajo digno",
      description: "Somos una organización defensora de los derechos de los trabajadores colombianos."
    },
    {
      title: "Asesoría laboral especializada",
      description: "Te orientamos para proteger tus derechos y resolver conflictos laborales."
    },
    {
      title: "Comunidad de apoyo",
      description: "Únete a una red de trabajadores comprometidos con la dignificación laboral."
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleScrollToContact = () => {
    const contactFormElement = document.getElementById('contact-form');
    if (contactFormElement) {
      contactFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#733A19] via-[#68351A] to-[#5C2E14] text-[#F2F0F0]">
      {/* Background particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(#F2F0F0 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }}>
        </div>
        
        {/* Animated background shapes */}
        <motion.div 
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#BFAF8F]/20"
          animate={{ 
            y: [0, 30, 0], 
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 left-[5%] w-80 h-80 rounded-full bg-[#733A19]/20"
          animate={{ 
            y: [0, -40, 0], 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div 
          className="absolute top-[60%] left-[50%] w-40 h-40 rounded-full bg-[#BFAF8F]/20"
          animate={{ 
            x: [0, 30, 0], 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main Content */}
      <Container maxWidth="xl" className="relative z-10 py-16 md:py-28">
        <div className="flex flex-wrap -mx-4">
          {/* Text Content */}
          <div className="w-full md:w-1/2 lg:w-5/12 xl:w-5/12 px-4 mb-8 md:mb-0">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-block bg-[#BFAF8F]/20 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="mr-2 inline-block w-2 h-2 rounded-full bg-[#BFAF8F]"></span>
                Por la dignificación de la vida laboral
              </motion.div>
              
              <div className="overflow-hidden h-32 md:h-40">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.7 }}
                    className="mb-6"
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      {slides[currentSlide].title.split(' ').map((word, i, arr) => 
                        i === arr.length - 1 ? 
                          <span key={i} className="text-[#BFAF8F]"> {word}</span> : 
                          <span key={i}>{i > 0 ? ' ' : ''}{word}</span>
                      )}
                    </h1>
                    <p className="text-lg md:text-xl text-[#F2F0F0]/90 mt-6 max-w-xl">
                      {slides[currentSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex mt-6 mb-6">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`mr-2 w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-[#BFAF8F] w-8' : 'bg-white/40'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <motion.button
                  onClick={handleScrollToContact}
                  className="bg-[#BFAF8F] text-[#0E1013] hover:bg-[#D0C7AF] font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
                  whileHover={{ scale: 1.02, boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Únete a la Causa
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => router.push('/#resources')}
                  className="bg-transparent hover:bg-[#F2F0F0]/10 text-[#F2F0F0] border-2 border-[#F2F0F0] font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Recursos Laborales
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          {/* Right Side Form Card */}
          <div className="w-full md:w-1/2 lg:w-7/12 xl:w-7/12 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-[#BFAF8F]/40 to-[#733A19]/40 rounded-xl blur-xl opacity-70"></div>
                <div className="relative bg-gradient-to-br from-[#F2F0F0]/10 to-[#F2F0F0]/5 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#F2F0F0]/20">
                  <div className="text-center mb-8">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-2">Comparte tu Situación</h3>
                      <div className="w-16 h-1 bg-[#BFAF8F] mx-auto my-3 rounded-full"></div>
                      <p className="text-[#F2F0F0]/90">Cuéntanos sobre tu experiencia laboral y cómo podemos ayudarte</p>
                    </motion.div>
                  </div>
                  
                  <form 
                    className="space-y-5" 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleScrollToContact();
                    }}
                  >
                    <motion.div 
                      className="group relative z-0 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <input 
                        type="text"
                        name="name"
                        id="name"
                        className="peer block w-full appearance-none border-0 border-b-2 border-[#F2F0F0]/30 bg-transparent py-2.5 px-0 text-white focus:border-[#BFAF8F] focus:outline-none focus:ring-0"
                        placeholder=" "
                        required
                      />
                      <label 
                        htmlFor="name"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-[#F2F0F0]/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#BFAF8F]"
                      >
                        Nombre completo
                      </label>
                    </motion.div>
                    
                    <motion.div 
                      className="group relative z-0 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <input 
                        type="email"
                        name="email"
                        id="email"
                        className="peer block w-full appearance-none border-0 border-b-2 border-[#F2F0F0]/30 bg-transparent py-2.5 px-0 text-white focus:border-[#BFAF8F] focus:outline-none focus:ring-0"
                        placeholder=" "
                        required
                      />
                      <label 
                        htmlFor="email"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-[#F2F0F0]/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#BFAF8F]"
                      >
                        Correo electrónico
                      </label>
                    </motion.div>
                    
                    <motion.div 
                      className="group relative z-0 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <select 
                        name="situation"
                        id="situation"
                        className="peer block w-full appearance-none border-0 border-b-2 border-[#F2F0F0]/30 bg-transparent py-2.5 px-0 text-white focus:border-[#BFAF8F] focus:outline-none focus:ring-0"
                        required
                      >
                        <option value="" disabled selected className="bg-[#733A19]"></option>
                        <option value="despido" className="bg-[#733A19]">Despido injustificado</option>
                        <option value="acoso" className="bg-[#733A19]">Acoso laboral</option>
                        <option value="salario" className="bg-[#733A19]">Problemas salariales</option>
                        <option value="contrato" className="bg-[#733A19]">Irregularidad contractual</option>
                        <option value="sindical" className="bg-[#733A19]">Afiliación sindical</option>
                        <option value="otro" className="bg-[#733A19]">Otro</option>
                      </select>
                      <label 
                        htmlFor="situation"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-[#F2F0F0]/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#BFAF8F]"
                      >
                        Selecciona tu situación
                      </label>
                    </motion.div>
                    
                    <motion.button 
                      type="submit"
                      className="w-full mt-8 bg-gradient-to-r from-[#BFAF8F] to-[#D0C7AF] text-[#0E1013] font-semibold py-3.5 px-6 rounded-md shadow-lg transition duration-300 ease-in-out overflow-hidden relative group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      <span className="relative">Continuar</span>
                    </motion.button>
                    
                    <motion.p 
                      className="text-[#F2F0F0]/70 text-xs text-center mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 1.1, duration: 0.5 }}
                    >
                      Al enviar este formulario aceptas nuestra política de privacidad y tratamiento de datos.
                    </motion.p>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          onClick={scrollToNextSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
        >
          <p className="text-sm mb-2 opacity-70">Descubre más</p>
          <KeyboardArrowDownIcon fontSize="medium" className="animate-bounce" />
        </motion.div>
      </Container>
    </section>
  );
};

export default HeroSection;