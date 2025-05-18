'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#F2F0F0] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#BFAF8F] rounded-full filter blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#153959] rounded-full filter blur-3xl opacity-20 -ml-48 -mb-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#BFAF8F]/30 text-[#733A19] text-sm font-semibold mb-4">
            Quiénes Somos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0E1013]">
            Organización defensora de los trabajadores colombianos
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            En Trabajo Digno promovemos la dignificación del trabajo como elemento esencial para una vida digna.
            Somos una organización comprometida con la educación y el empoderamiento de los trabajadores colombianos.
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
              <div className="absolute -inset-4 bg-[#733A19]/10 rounded-2xl blur-xl"></div>
              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                <div className="w-full h-96 bg-gradient-to-br from-[#733A19] to-[#5C2E14] flex items-center justify-center">
                  {/* Organization identity image placeholder */}
                  <Image 
                    src="/organization-image.jpg" 
                    alt="Trabajadores unidos por el trabajo digno" 
                    layout="fill"
                    objectFit="cover"
                    className="opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0E1013]/30">
                    {/* Logo removed as requested */}
                  </div>
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
              <h3 className="text-2xl font-bold text-[#733A19] mb-3">Nuestra Misión</h3>
              <p className="text-gray-700">
                Empoderar a los trabajadores colombianos mediante la educación, el acompañamiento colectivo
                y el desarrollo de herramientas para la defensa de sus derechos, construyendo juntos un
                futuro laboral más digno y justo.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-[#733A19] mb-3">Nuestros Valores</h3>
              <ul className="space-y-3">
                {[
                  {
                    title: 'Dignidad',
                    description: 'Reconocemos el valor inherente de cada trabajador y su derecho a condiciones laborales justas.'
                  },
                  {
                    title: 'Colectividad',
                    description: 'Creemos en el poder de la organización y la acción colectiva para generar transformaciones.'
                  },
                  {
                    title: 'Educación',
                    description: 'Compartimos conocimientos para que cada trabajador conozca y defienda sus derechos.'
                  }
                ].map((value, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#153959] flex-shrink-0 flex items-center justify-center mt-1 mr-3">
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
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const resourcesElement = document.getElementById('resources');
                  if (resourcesElement) {
                    resourcesElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-[#733A19] hover:bg-[#5C2E14] text-white font-semibold py-3 px-8 rounded-md shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto"
              >
                Explorar Recursos
              </button>
              <button 
                onClick={() => {
                  const contactFormElement = document.getElementById('contact-form');
                  if (contactFormElement) {
                    contactFormElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-transparent hover:bg-[#BFAF8F]/20 text-[#733A19] border border-[#733A19] font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out w-full sm:w-auto"
              >
                Únete a Nosotros
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 