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
              
              <div className="flex mt-6 mb-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`mr-2 w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-[#BFAF8F] w-8' : 'bg-white/40'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
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
              
              <div className="flex items-center space-x-6 text-[#F2F0F0] mt-12">
                <a href="https://www.facebook.com/profile.php?id=61575746772724" target="_blank" rel="noopener noreferrer" 
                   className="hover:text-[#BFAF8F] transition-colors transform hover:scale-110 duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/trabajodigno.col/" target="_blank" rel="noopener noreferrer" 
                   className="hover:text-[#BFAF8F] transition-colors transform hover:scale-110 duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-11 13h10a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3zm-1-11a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@trabajodigno.col" target="_blank" rel="noopener noreferrer" 
                   className="hover:text-[#BFAF8F] transition-colors transform hover:scale-110 duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                   className="hover:text-[#BFAF8F] transition-colors transform hover:scale-110 duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* Right Side Form Card */}
          <div className="w-full md:w-1/2 lg:w-6/12 xl:w-6/12 px-4">
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