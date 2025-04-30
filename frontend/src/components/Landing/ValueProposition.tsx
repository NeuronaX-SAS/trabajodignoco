'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ValueProposition: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const benefits = [
    {
      title: "Eficiencia Máxima",
      description: "Genera documentos legales completos en minutos, no días o semanas. Nuestra IA agiliza cada paso del proceso.",
      icon: "⚡",
      color: "bg-[#DE735B]/10",
      textColor: "text-[#DE735B]",
      highlight: "¡85% menos tiempo!",
      metric: "Reduce el tiempo de creación de documentos legales hasta en un 85%"
    },
    {
      title: "Accesibilidad Total",
      description: "Accede a asesoría legal profesional a una fracción del costo tradicional, sin compromiso y desde cualquier lugar.",
      icon: "🔓",
      color: "bg-[#517FA3]/10",
      textColor: "text-[#517FA3]",
      highlight: "¡90% más económico!",
      metric: "Ahorra hasta un 90% en comparación con servicios legales tradicionales"
    },
    {
      title: "Precisión Garantizada",
      description: "Documentos legalmente válidos adaptados a la normativa colombiana vigente y a tu situación específica.",
      icon: "✓",
      color: "bg-[#DE735B]/10",
      textColor: "text-[#DE735B]",
      highlight: "100% válidos",
      metric: "Documentos verificados y aprobados por expertos legales colombianos"
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Top section with gradient line */}
        <div className="relative mb-16">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-1 w-24 bg-gradient-to-r from-[#DE735B] to-[#E58976] rounded-full"></div>
          <motion.div 
            className="text-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              La Revolución Legal en Colombia
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              <span className="font-semibold">TrabajoDigno.co</span> transforma la manera en que accedes a servicios legales, ofreciéndote una plataforma intuitiva impulsada por IA que garantiza documentos eficientes, económicos y precisos.
            </p>
          </motion.div>
        </div>

        {/* Benefits section */}
        <motion.div 
          className="grid md:grid-cols-3 gap-x-8 gap-y-12 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-full ${benefit.color} flex items-center justify-center text-2xl shadow-md`}>
                {benefit.icon}
              </div>
              <div className="bg-white rounded-xl p-6 pl-14 shadow-lg border border-gray-100 h-full hover:shadow-xl transition-shadow duration-300">
                <div className="absolute -right-2 -top-2 bg-[#DE735B] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {benefit.highlight}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 mt-1">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">
                  {benefit.description}
                </p>
                <div className={`text-sm font-medium ${benefit.textColor} border-t border-gray-100 pt-3 mt-auto`}>
                  {benefit.metric}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Before and After comparison */}
        <motion.div 
          className="mt-12 pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-10 text-center text-gray-800">
            Compare la Diferencia
          </h3>
          
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Traditional Process */}
            <div className="lg:w-1/2 bg-gradient-to-b from-red-50 to-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-red-500 text-white py-4 px-6">
                <h4 className="font-bold text-lg">Proceso Legal Tradicional</h4>
                <p className="text-red-100 text-sm">Costoso, lento e ineficiente</p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    { text: "Citas iniciales que cuestan entre $100.000 - $300.000 COP", icon: "💰" },
                    { text: "Semanas o meses de espera para documentos finalizados", icon: "⏳" },
                    { text: "Múltiples visitas presenciales a oficinas de abogados", icon: "🏢" },
                    { text: "Honorarios legales impredecibles y elevados", icon: "📈" },
                    { text: "Comunicación lenta y burocrática", icon: "📞" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                        {item.icon}
                      </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 bg-red-50 p-4 rounded-lg border border-red-100">
                  <p className="font-medium text-red-700 text-center">
                    Costo promedio: $1,000,000+ COP<br />
                    Tiempo promedio: 2-4 semanas
                  </p>
                </div>
              </div>
            </div>
            
            {/* TrabajoDigno.co Process */}
            <div className="lg:w-1/2 bg-gradient-to-b from-[#FBE0D8] to-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-[#DE735B] text-white py-4 px-6">
                <h4 className="font-bold text-lg">Proceso con TrabajoDigno.co</h4>
                <p className="text-[#FBE0D8] text-sm">Rápido, económico y confiable</p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    { text: "Empieza gratis, paga solo por lo que necesitas", icon: "🆓" },
                    { text: "Documentos generados en minutos, no semanas", icon: "⚡" },
                    { text: "Acceso 24/7 desde cualquier dispositivo", icon: "🌐" },
                    { text: "Precios transparentes y accesibles", icon: "💎" },
                    { text: "Asistencia inmediata por IA", icon: "🤖" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-8 h-8 rounded-full bg-[#FBE0D8] flex items-center justify-center mr-3 flex-shrink-0">
                        {item.icon}
                      </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 bg-[#FBE0D8]/50 p-4 rounded-lg border border-[#DE735B]/20">
                  <p className="font-medium text-[#C35D45] text-center">
                    Costo promedio: $50,000 - $150,000 COP<br />
                    Tiempo promedio: 10-30 minutos
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Final CTA */}
          <div className="text-center mt-12">
            <motion.button 
              className="bg-[#DE735B] hover:bg-[#C35D45] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:shadow-xl transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactFormElement = document.getElementById('contact-form');
                if (contactFormElement) {
                  contactFormElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Prueba la Diferencia Hoy
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;