'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/Common/Modal';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'register' | 'login'>('register');
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openModal = (type: 'register' | 'login') => {
    setModalType(type);
    setIsModalOpen(true);
  };
  
  const closeModal = () => setIsModalOpen(false);

  const handleScrollToContact = () => {
    closeModal();
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
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-semibold mb-6">
              Innovación Legal en Colombia
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              El poder de un bufete<br />
              <span className="text-white/90">en la palma de tu mano</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
              Primera plataforma legal de Colombia impulsada por IA que te ayuda a crear documentos legales y agilizar trámites burocráticos de forma rápida, económica y 100% válida.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                onClick={() => handleScrollToContact()}
                className="bg-white text-[#DE735B] hover:bg-white/90 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Comenzar Ahora
              </motion.button>
              <motion.button
                onClick={() => handleScrollToContact()}
                className="bg-transparent hover:bg-white/10 text-white border border-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Saber Más
              </motion.button>
            </div>
            
            <div className="flex items-center space-x-2 text-white/90">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white border-2 border-[#DE735B] overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  </div>
                ))}
              </div>
              <span className="text-sm">+1,000 usuarios confían en nosotros</span>
            </div>
          </motion.div>
          
          {/* Image/Illustration */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 relative">
                      <Image 
                        src="/fleur-de-lis.svg" 
                        alt="TrabajoDigno.co Logo" 
                        width={20} 
                        height={20}
                        className="text-white"
                      />
                    </div>
                    <div className="text-xs text-white/90">AsistenteJuridico.ai</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Image src="/file.svg" width={16} height={16} alt="Document" className="text-white" />
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-left text-sm">
                      <p className="text-white">Necesito una demanda laboral por despido injustificado</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#DE735B]/80 flex items-center justify-center flex-shrink-0">
                      <Image src="/window.svg" width={16} height={16} alt="AI Assistant" />
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-left text-sm">
                      <p className="text-white">Estoy generando una demanda por despido injustificado basada en el Código Sustantivo del Trabajo colombiano. Por favor, proporcione los siguientes detalles:</p>
                      <ul className="list-disc list-inside mt-2 text-white/80 text-xs">
                        <li>Fecha de inicio y terminación del contrato</li>
                        <li>Tipo de contrato laboral</li>
                        <li>Motivo alegado para la terminación</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative h-10">
                    <div className="absolute bottom-0 left-0 right-0">
                      <div className="flex items-center">
                        <input 
                          type="text" 
                          placeholder="Escriba su consulta legal aquí..." 
                          className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                          disabled
                        />
                        <button className="ml-2 bg-white/20 p-2 rounded-lg disabled:opacity-50" disabled>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-30"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#DE735B]/60 flex items-center justify-center">
                        <Image src="/globe.svg" width={16} height={16} alt="Global" className="text-white" />
                      </div>
                      <div className="text-xs font-medium text-white">Compatible con toda Colombia</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {modalType === 'register' ? '¡Únete a nosotros!' : 'Bienvenido de nuevo'}
        </h2>
        <p className="text-gray-600 mb-6">
          Estamos finalizando los últimos detalles de nuestra plataforma. ¡Muy pronto tendrás acceso!
        </p>
        <div className="space-y-4">
          <button
            onClick={handleScrollToContact}
            className="w-full bg-[#DE735B] hover:bg-[#C35D45] text-white font-semibold py-3 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Recibir acceso anticipado
          </button>
          <button
            onClick={closeModal}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Volver más tarde
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default HeroSection;