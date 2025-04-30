'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  currency: string;
  buttonText: string;
  features: PlanFeature[];
  highlighted: boolean;
  badge?: string;
}

const MembershipPlans: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  // Function to handle button styling
  const getButtonStyles = (planId: string) => {
    if (planId === 'professional') {
      return 'bg-[#DE735B] hover:bg-[#C35D45] text-white shadow-lg shadow-[#DE735B]/20';
    } else if (planId === 'business') {
      return 'bg-[#517FA3] hover:bg-[#3E6A80] text-white shadow-lg shadow-[#517FA3]/20';
    } else {
      return 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm';
    }
  };

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Básico',
      description: 'Ideal para individuos con necesidades legales ocasionales',
      priceMonthly: 0,
      priceAnnual: 0,
      currency: 'COP',
      buttonText: 'Comenzar gratis',
      highlighted: false,
      features: [
        { name: 'Generación de 1 documento básico al mes', included: true },
        { name: 'Acceso a plantillas estándar', included: true },
        { name: 'Asistente IA básico', included: true },
        { name: 'Guías legales básicas', included: true },
        { name: 'Soporte por correo electrónico', included: false },
        { name: 'Revisión por expertos', included: false },
        { name: 'Documentos personalizados', included: false },
        { name: 'Prioridad en asistencia', included: false },
      ],
    },
    {
      id: 'professional',
      name: 'Profesional',
      description: 'Perfecto para profesionales independientes y autónomos',
      priceMonthly: 49900,
      priceAnnual: 499000,
      currency: 'COP',
      buttonText: 'Empezar ahora',
      highlighted: true,
      badge: 'Más popular',
      features: [
        { name: 'Documentos ilimitados mensuales', included: true },
        { name: 'Todas las plantillas premium', included: true },
        { name: 'Asistente IA avanzado', included: true },
        { name: 'Biblioteca completa de guías legales', included: true },
        { name: 'Soporte prioritario 24/7', included: true },
        { name: 'Revisión por expertos (2 al mes)', included: true },
        { name: 'Documentos personalizados', included: true },
        { name: 'Almacenamiento seguro en la nube', included: false },
      ],
    },
    {
      id: 'business',
      name: 'Empresarial',
      description: 'Solución completa para empresas y equipos legales',
      priceMonthly: 99900,
      priceAnnual: 999000,
      currency: 'COP',
      buttonText: 'Contactar ventas',
      highlighted: false,
      features: [
        { name: 'Documentos ilimitados', included: true },
        { name: 'Todas las plantillas premium', included: true },
        { name: 'Asistente IA empresarial', included: true },
        { name: 'Biblioteca completa de guías legales', included: true },
        { name: 'Soporte prioritario 24/7', included: true },
        { name: 'Revisión por expertos ilimitada', included: true },
        { name: 'Documentos altamente personalizados', included: true },
        { name: 'Acceso para múltiples usuarios', included: true },
      ],
    },
  ];

  // Animation variants
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

  return (
    <section id="pricing" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FBE0D8] rounded-full filter blur-3xl opacity-20 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E5EFFA] rounded-full filter blur-3xl opacity-30 -ml-32 -mb-32"></div>
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
            Planes Flexibles
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Elige el Plan que Mejor se Adapte a Ti
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Ofrecemos diferentes opciones para satisfacer tus necesidades legales, desde individuos hasta empresas, con planes económicos y flexibles.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`text-sm font-medium mr-3 ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Facturación Mensual
            </span>
            <button 
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#DE735B] focus:ring-offset-2"
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingPeriod === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`} 
              />
            </button>
            <span className={`text-sm font-medium ml-3 flex items-center ${billingPeriod === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
              Facturación Anual
              <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                20% ahorro
              </span>
            </span>
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan) => (
            <motion.div 
              key={plan.id}
              variants={itemVariants}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden border ${
                plan.highlighted ? 'border-[#DE735B] ring-2 ring-[#DE735B]/20 transform md:-translate-y-4' : 'border-gray-100'
              }`}
            >
              {plan.badge && (
                <div className="bg-[#DE735B] text-white text-center text-sm font-semibold py-1.5">
                  {plan.badge}
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 mb-6 h-12">{plan.description}</p>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.priceMonthly === 0 ? 'Gratis' : 
                      new Intl.NumberFormat('es-CO', { 
                        style: 'currency', 
                        currency: 'COP',
                        maximumFractionDigits: 0
                      }).format(billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceAnnual / 12)}
                  </span>
                  {plan.priceMonthly > 0 && (
                    <span className="text-gray-500 ml-2">/ mes</span>
                  )}
                </div>
                
                <motion.button 
                  className={`w-full py-3 px-4 rounded-full font-semibold transition duration-200 ${getButtonStyles(plan.id)}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const contactFormElement = document.getElementById('contact-form');
                    if (contactFormElement) {
                      contactFormElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {plan.buttonText}
                </motion.button>
                
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 ${feature.included ? 'text-[#DE735B]' : 'text-gray-300'}`}>
                        {feature.included ? (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <span className={`ml-3 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-500 line-through'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Preguntas Frecuentes</h3>
          
          <div className="space-y-6">
            {[
              {
                question: '¿Los documentos generados son legalmente válidos?',
                answer: 'Sí, todos los documentos generados por TrabajoDigno.co cumplen con la legislación colombiana vigente y son legalmente válidos para su uso en contextos oficiales.'
              },
              {
                question: '¿Puedo actualizar o cambiar mi plan después?',
                answer: 'Por supuesto, puedes actualizar, bajar de categoría o cancelar tu plan en cualquier momento. Los cambios se aplicarán al siguiente período de facturación.'
              },
              {
                question: '¿Qué medios de pago aceptan?',
                answer: 'Aceptamos todas las tarjetas de crédito y débito principales, PSE, transferencias bancarias y varios métodos de pago locales colombianos.'
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-md border border-gray-100 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;