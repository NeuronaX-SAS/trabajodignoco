'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface UseCaseProps {
  title: string;
  problem: string;
  solution: string;
  icon: string;
  category: 'trabajador' | 'empleador' | 'freelancer';
}

const UseCases: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'trabajador' | 'empleador' | 'freelancer'>('all');
  
  const scenarios: UseCaseProps[] = [
    {
      title: 'Contrato Laboral Legal',
      problem: 'No estoy seguro si mi contrato de trabajo respeta mis derechos mínimos en cuanto a salario, jornada, prestaciones sociales.',
      solution: 'Nuestra IA analiza tu contrato según el Código Sustantivo del Trabajo, identifica cláusulas potencialmente desfavorables o ilegales y te explica tus derechos básicos.',
      icon: '📝',
      category: 'trabajador',
    },
    {
      title: 'Despido Sin Justa Causa',
      problem: 'Me despidieron y creo que fue injustificado. No sé cómo calcular mi liquidación ni qué acciones legales puedo tomar.',
      solution: 'Calculamos tu liquidación por despido injusto y te guiamos en la redacción de un derecho de petición o reclamación formal con documentos listos para presentar.',
      icon: '⚖️',
      category: 'trabajador',
    },
    {
      title: 'Contratos para PyMEs',
      problem: 'Necesito contratar personal para mi pequeña empresa, pero no sé cómo redactar contratos que cumplan la ley y protejan mi negocio.',
      solution: 'Genera contratos de trabajo personalizados a término fijo o indefinido adaptados a la normativa colombiana, listos para firmar en minutos.',
      icon: '🏢',
      category: 'empleador',
    },
    {
      title: 'Cálculo de Prestaciones',
      problem: 'Quiero saber cuánto me corresponde por cesantías, intereses, prima de servicios y vacaciones, pero las fórmulas son complejas.',
      solution: 'Nuestra calculadora interactiva te da una estimación clara de tus prestaciones sociales acumuladas según la ley colombiana, con explicaciones paso a paso.',
      icon: '🧮',
      category: 'trabajador',
    },
    {
      title: 'Contrato de Prestación de Servicios',
      problem: 'Trabajo como independiente y necesito un contrato profesional para ofrecer mis servicios que me proteja legalmente.',
      solution: 'Crea un contrato de prestación de servicios personalizado que delimite claramente el alcance del trabajo, pagos, propiedad intelectual y cláusulas de terminación.',
      icon: '🤝',
      category: 'freelancer',
    },
    {
      title: 'Reclamación de Acoso Laboral',
      problem: 'Estoy sufriendo situaciones de acoso en mi trabajo y no sé cómo documentarlo o qué pasos seguir para que cese.',
      solution: 'Te ayudamos a documentar los incidentes, redactar una queja formal según la Ley 1010 de 2006 y preparar la presentación ante el Comité de Convivencia Laboral.',
      icon: '🛡️',
      category: 'trabajador',
    },
  ];

  const filteredScenarios = activeFilter === 'all' 
    ? scenarios 
    : scenarios.filter(scenario => scenario.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Category backgrounds and colors
  const categoryStyles = {
    trabajador: {
      bg: 'bg-[#FBE0D8]',
      text: 'text-[#C35D45]',
      label: 'Para Trabajadores'
    },
    empleador: {
      bg: 'bg-[#E5EFFA]',
      text: 'text-[#517FA3]',
      label: 'Para Empleadores'
    },
    freelancer: {
      bg: 'bg-[#EDE8FD]',
      text: 'text-[#6B46C1]',
      label: 'Para Independientes'
    }
  };

  // Category filter button styling
  const getFilterButtonStyles = (category: 'all' | 'trabajador' | 'empleador' | 'freelancer') => {
    const isActive = activeFilter === category;
    if (category === 'all') {
      return isActive 
        ? 'bg-[#DE735B] text-white' 
        : 'bg-white text-gray-700 hover:bg-gray-50';
    }
    
    const styles = categoryStyles[category];
    return isActive 
      ? `bg-[${category === 'trabajador' ? '#DE735B' : category === 'empleador' ? '#517FA3' : '#6B46C1'}] text-white` 
      : `bg-white ${styles.text} hover:bg-gray-50`;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FBE0D8] opacity-30 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#E5EFFA] opacity-30 -ml-32 -mb-32"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#FBE0D8] text-[#DE735B] text-sm font-semibold mb-4">
            Soluciones Prácticas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Resolvemos tus Problemas Legales
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            TrabajoDigno.co te ofrece soluciones legales instantáneas para las situaciones más comunes que enfrentan trabajadores, empleadores y freelancers en Colombia.
          </p>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 mb-12">
            <motion.button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm ${
                getFilterButtonStyles('all')
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Todos los casos
            </motion.button>
            <motion.button 
              onClick={() => setActiveFilter('trabajador')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm ${
                activeFilter === 'trabajador' 
                  ? 'bg-[#DE735B] text-white' 
                  : 'bg-white text-[#DE735B] hover:bg-[#FBE0D8]/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Para Trabajadores
            </motion.button>
            <motion.button 
              onClick={() => setActiveFilter('empleador')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm ${
                activeFilter === 'empleador' 
                  ? 'bg-[#517FA3] text-white' 
                  : 'bg-white text-[#517FA3] hover:bg-[#E5EFFA]/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Para Empleadores
            </motion.button>
            <motion.button 
              onClick={() => setActiveFilter('freelancer')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm ${
                activeFilter === 'freelancer' 
                  ? 'bg-[#6B46C1] text-white' 
                  : 'bg-white text-[#6B46C1] hover:bg-[#EDE8FD]/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Para Independientes
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredScenarios.map((scenario, index) => {
            const categoryStyle = categoryStyles[scenario.category];
            
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
              >
                <div className="p-6">
                  <div className="w-14 h-14 rounded-full bg-[#FBE0D8] flex items-center justify-center text-2xl mb-5">
                    {scenario.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{scenario.title}</h3>
                  
                  <div className="mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">El problema</span>
                    <p className="text-gray-600 mt-1">{scenario.problem}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#DE735B]">Nuestra solución</span>
                    <p className="text-gray-700 mt-1">{scenario.solution}</p>
                  </div>
                </div>
                
                <div className={`${categoryStyle.bg} p-4 flex items-center justify-between`}>
                  <span className={`text-sm font-medium ${categoryStyle.text}`}>
                    {categoryStyle.label}
                  </span>
                  <motion.button 
                    className={`${categoryStyle.text} hover:underline text-sm font-semibold flex items-center`}
                    whileHover={{ x: 3 }}
                    onClick={() => {
                      const contactFormElement = document.getElementById('contact-form');
                      if (contactFormElement) {
                        contactFormElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Ver ejemplo
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-[#DE735B] to-[#C35D45] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="md:max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Tienes un caso especial?</h3>
                <p className="text-white/90">
                  Nuestro equipo conoce a profundidad el Código Sustantivo del Trabajo y toda la legislación laboral colombiana vigente. Podemos orientarte con tu situación laboral específica.
                </p>
              </div>
              <div>
                <motion.button 
                  className="bg-white text-[#DE735B] hover:bg-white/90 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const contactFormElement = document.getElementById('contact-form');
                    if (contactFormElement) {
                      contactFormElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Consulta tu caso ahora
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;