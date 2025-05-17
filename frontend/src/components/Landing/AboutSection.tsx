'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const staggerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeInUpAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section 
      id="about-section" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-[#F7F5F2] to-[#F2F0F0] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BFAF8F] rounded-full filter blur-[100px] opacity-10 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#733A19] rounded-full filter blur-[100px] opacity-10 -ml-48 -mb-48"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-24 h-24 rounded-full border-4 border-[#BFAF8F]/20"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full border-4 border-[#733A19]/20"></div>
        <div className="absolute top-40 right-[20%] w-12 h-12 rounded-full bg-[#BFAF8F]/10"></div>
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5" 
             style={{ 
               backgroundImage: 'radial-gradient(#733A19 0.5px, transparent 0.5px)', 
               backgroundSize: '24px 24px' 
             }}>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#BFAF8F]/30 to-[#733A19]/20 text-[#733A19] text-sm font-semibold mb-6">
              Quiénes Somos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#0E1013]">
              Impulsando la dignidad <span className="text-[#733A19]">laboral en Colombia</span>
            </h2>
            <div className="mx-auto w-24 h-1.5 rounded-full bg-gradient-to-r from-[#BFAF8F] to-[#733A19] mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              En Trabajo Digno promovemos la dignificación del trabajo como elemento esencial para una vida digna.
              Somos una organización comprometida con la educación y el empoderamiento de los trabajadores colombianos.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-[#BFAF8F]/30 to-[#733A19]/30 rounded-3xl blur-2xl opacity-60"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="w-full aspect-[4/3] relative">
                  {/* Organization image (replace with your actual image) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#733A19] to-[#5C2E14] opacity-90"></div>
                  <Image 
                    src="/ISOTIPO (5).png" 
                    alt="Trabajo Digno Logo" 
                    layout="fill"
                    objectFit="contain"
                    className="p-10"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-16 h-16 rounded-full border-4 border-white opacity-20"></div>
                <div className="absolute bottom-6 right-6 w-24 h-24 rounded-full border-4 border-white opacity-10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white opacity-20"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerAnimation}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10"
          >
            <motion.div variants={fadeInUpAnimation}>
              <h3 className="text-2xl font-bold text-[#733A19] mb-4">Nuestra Misión</h3>
              <p className="text-gray-700 leading-relaxed">
                Empoderar a los trabajadores colombianos mediante la educación, el acompañamiento colectivo
                y el desarrollo de herramientas para la defensa de sus derechos, construyendo juntos un
                futuro laboral más digno y justo.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUpAnimation}>
              <h3 className="text-2xl font-bold text-[#733A19] mb-4">Nuestros Valores</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {[
                  {
                    title: 'Dignidad',
                    description: 'Reconocemos el valor inherente de cada trabajador y su derecho a condiciones laborales justas.',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )
                  },
                  {
                    title: 'Colectividad',
                    description: 'Creemos en el poder de la organización y la acción colectiva para generar transformaciones.',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )
                  },
                  {
                    title: 'Educación',
                    description: 'Compartimos conocimientos para que cada trabajador conozca y defienda sus derechos.',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    )
                  }
                ].map((value, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUpAnimation}
                    className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#BFAF8F] to-[#733A19] flex items-center justify-center text-white mb-4">
                      {value.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUpAnimation} className="pt-4">
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  onClick={() => {
                    const resourcesElement = document.getElementById('resources');
                    if (resourcesElement) {
                      resourcesElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-gradient-to-r from-[#733A19] to-[#5C2E14] text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    Explorar Recursos
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </motion.button>
                <motion.button 
                  onClick={() => {
                    const contactFormElement = document.getElementById('contact-form');
                    if (contactFormElement) {
                      contactFormElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-transparent hover:bg-[#BFAF8F]/20 text-[#733A19] border-2 border-[#733A19] font-semibold py-3.5 px-8 rounded-lg transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Únete a Nosotros
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 