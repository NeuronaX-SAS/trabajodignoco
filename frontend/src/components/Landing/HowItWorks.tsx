'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Describe tu Necesidad',
      description: 'Explica en lenguaje natural qué información necesitas o qué tema laboral te interesa conocer más a fondo.',
      icon: '💬'
    },
    {
      number: '02',
      title: 'Encuentra Recursos Educativos',
      description: 'Accede a nuestra biblioteca de recursos educativos sobre derechos laborales, organizados por temas y situaciones específicas.',
      icon: '📚'
    },
    {
      number: '03',
      title: 'Consulta el Material Relevante',
      description: 'Revisa guías, documentos informativos y material educativo adaptado a la legislación colombiana vigente.',
      icon: '📄'
    },
    {
      number: '04',
      title: 'Conéctate con la Comunidad',
      description: 'Participa en espacios de formación y encuentra apoyo en nuestra comunidad de trabajadores organizados.',
      icon: '✅'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#FBE0D8] rounded-full filter blur-3xl opacity-30 -ml-48"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#FBE0D8] rounded-full filter blur-3xl opacity-30 -mr-48"></div>
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
            Proceso Simple
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            ¿Cómo Funciona TrabajoDigno.co?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nuestra plataforma te conecta con recursos educativos y una comunidad comprometida con la defensa de los derechos laborales en Colombia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 relative">
          {/* Connecting Line */}
          <div className="absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-[#DE735B]/0 via-[#DE735B] to-[#DE735B]/0 hidden lg:block"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Dot */}
              <div className="absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#DE735B] z-10 hidden lg:block"></div>
              
              <motion.div 
                className="text-center px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#DE735B] text-white flex items-center justify-center text-2xl mb-6">
                  {step.icon}
                </div>
                
                <div className="inline-block text-xs font-bold bg-[#FBE0D8] text-[#DE735B] rounded-full px-3 py-1 mb-3">
                  Paso {step.number}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Testimonial Section */}
        <motion.div 
          className="mt-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-6 left-10">
            <div className="bg-[#DE735B] text-white px-4 py-2 rounded-lg font-medium">
              Experiencia Real
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 pt-4">
            <div className="w-24 h-24 rounded-full bg-[#FBE0D8] flex-shrink-0 flex items-center justify-center text-4xl">
              👨‍💼
            </div>
            
            <div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              
              <p className="text-lg text-gray-700 italic mb-4">
                "Enfrentaba un despido injustificado y no podía pagar un abogado. Con TrabajoDigno.co generé una carta de reclamación en 15 minutos que mi empleador tomó en serio. Logré una indemnización justa sin gastar una fortuna."
              </p>
              
              <div>
                <h4 className="font-bold text-gray-800">Carlos Rodriguez</h4>
                <p className="text-gray-500 text-sm">Ingeniero de Sistemas, Medellín</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <motion.button 
              className="bg-[#DE735B] hover:bg-[#C35D45] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactFormElement = document.getElementById('contact-form');
                if (contactFormElement) {
                  contactFormElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Prueba TrabajoDigno.co Hoy
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;