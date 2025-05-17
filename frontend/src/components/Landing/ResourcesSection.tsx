'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Grid, Button, Typography, Card, CardContent, CardMedia, IconButton, Chip, TextField, InputAdornment } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GavelIcon from '@mui/icons-material/Gavel';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

// Sample resources data
const resourcesData = [
  {
    id: 'r1',
    title: 'Guía Básica de Derechos Laborales',
    description: 'Todo lo que necesitas saber sobre tus derechos fundamentales como trabajador/a en Colombia.',
    type: 'PDF',
    category: 'Derechos Básicos',
    icon: <ArticleIcon />,
    downloadUrl: '#',
    popular: true
  },
  {
    id: 'r2',
    title: 'Acoso Laboral: Cómo Identificarlo y Denunciarlo',
    description: 'Cartilla práctica sobre el acoso laboral, sus formas y los mecanismos legales para enfrentarlo.',
    type: 'PDF',
    category: 'Problemas Laborales',
    icon: <ArticleIcon />,
    downloadUrl: '#',
    popular: true
  },
  {
    id: 'r3',
    title: 'Contratación Laboral vs. Prestación de Servicios',
    description: 'Diferencias, ventajas y riesgos de cada modalidad de contratación en Colombia.',
    type: 'PDF',
    category: 'Contratos',
    icon: <ArticleIcon />,
    downloadUrl: '#',
    popular: false
  },
  {
    id: 'r4',
    title: 'Video: Los Principios del Trabajo Digno',
    description: 'Charla educativa sobre los fundamentos del trabajo digno según estándares internacionales.',
    type: 'Video',
    category: 'Formación',
    icon: <OndemandVideoIcon />,
    downloadUrl: '#',
    popular: false
  },
  {
    id: 'r5',
    title: 'Manual de Organización Colectiva',
    description: 'Herramientas prácticas para organizarse con compañeros/as de trabajo por derechos comunes.',
    type: 'PDF',
    category: 'Organización',
    icon: <MenuBookIcon />,
    downloadUrl: '#',
    popular: true
  },
  {
    id: 'r6',
    title: 'Seguridad Social para Trabajadores Independientes',
    description: 'Todo lo que debes saber sobre afiliación y pago de aportes al sistema de seguridad social.',
    type: 'PDF',
    category: 'Seguridad Social',
    icon: <ArticleIcon />,
    downloadUrl: '#',
    popular: false
  }
];

// Legal FAQ based on LegalApp data
const legalFaqData = [
  {
    id: 'faq1',
    question: '¿Qué hacer en caso de despido sin justa causa?',
    answer: 'Si te despidieron sin justa causa, tienes derecho a una indemnización. El monto depende del tipo de contrato y tiempo laborado. Para contratos a término indefinido con salarios menores a 10 SMLMV, si llevabas menos de un año, recibirás 30 días de salario; si era más tiempo, serán 30 días por el primer año más 20 días por cada año adicional. Puedes presentar una querella ante el Ministerio de Trabajo o demandar ante un Juez Laboral dentro de los 3 años siguientes.',
    category: 'Terminación laboral',
    icon: <GavelIcon />
  },
  {
    id: 'faq2',
    question: '¿Cómo denunciar acoso laboral?',
    answer: 'Primero, documenta todos los incidentes con fechas y testigos. Puedes presentar una queja ante el Comité de Convivencia Laboral de tu empresa. Si no hay respuesta, puedes acudir al Ministerio de Trabajo o interponer una acción de tutela si están vulnerando tus derechos fundamentales. La Ley 1010 de 2006 protege contra el acoso laboral y establece sanciones para los responsables.',
    category: 'Acoso laboral',
    icon: <HelpOutlineIcon />
  },
  {
    id: 'faq3',
    question: '¿Cuáles son mis derechos si trabajo por horas?',
    answer: 'Incluso trabajando por horas tienes derecho a: afiliación a seguridad social (salud, pensión, riesgos laborales), pago de prestaciones sociales proporcional al tiempo laborado, descansos obligatorios y vacaciones. El salario no puede ser inferior al mínimo legal proporcional al tiempo trabajado. Todos estos derechos aplican independientemente de si existe un contrato escrito.',
    category: 'Modalidades laborales',
    icon: <BusinessCenterIcon />
  },
  {
    id: 'faq4',
    question: '¿Qué es el fuero de estabilidad laboral reforzada?',
    answer: 'Es una protección especial para trabajadores en condiciones de vulnerabilidad que impide su despido sin autorización previa. Aplica a mujeres embarazadas o en lactancia (hasta 6 meses después del parto), trabajadores con discapacidad o enfermedad que afecte significativamente su labor, y representantes sindicales. Si te despiden teniendo esta protección, puedes solicitar tu reintegro mediante acción de tutela.',
    category: 'Estabilidad laboral',
    icon: <GavelIcon />
  },
  {
    id: 'faq5',
    question: '¿Cómo calculo las prestaciones sociales a las que tengo derecho?',
    answer: 'Las prestaciones sociales básicas incluyen: 1) Prima de servicios: un salario mensual al año pagado en dos cuotas (junio y diciembre), 2) Cesantías: un mes de salario por año que se consigna en un fondo, 3) Intereses de cesantías: 12% anual sobre las cesantías, 4) Vacaciones: 15 días hábiles remunerados por año. Todas se calculan proporcionalmente al tiempo laborado y sobre el salario total incluyendo comisiones y recargos.',
    category: 'Prestaciones sociales',
    icon: <BusinessCenterIcon />
  },
  {
    id: 'faq6',
    question: '¿Qué hacer si no me han afiliado a la seguridad social?',
    answer: 'La afiliación a salud, pensión y riesgos laborales es obligatoria. Si tu empleador no te ha afiliado, puedes: 1) Solicitar por escrito tu afiliación, 2) Denunciar ante el Ministerio de Trabajo, que puede imponer multas, 3) Presentar una tutela si esto afecta tus derechos fundamentales. El empleador debe asumir las consecuencias de cualquier accidente o enfermedad mientras no estés afiliado.',
    category: 'Seguridad social',
    icon: <HealthAndSafetyIcon />
  },
  {
    id: 'faq7',
    question: '¿Qué es un contrato realidad y cómo probarlo?',
    answer: 'El contrato realidad es aquel que, independientemente de su forma o denominación (como prestación de servicios), cumple con los elementos de una relación laboral: prestación personal del servicio, subordinación y remuneración. Para probarlo se requieren evidencias de horarios, órdenes recibidas, pagos periódicos, y exclusividad. Puedes reclamar el reconocimiento de tus derechos laborales mediante una demanda ordinaria laboral dentro de los 3 años siguientes.',
    category: 'Contratos',
    icon: <ArticleIcon />
  },
  {
    id: 'faq8',
    question: '¿Cuánto deben pagarme por horas extras, dominicales y festivos?',
    answer: 'Hora extra diurna: recargo del 25% sobre el valor de la hora ordinaria. Hora extra nocturna: recargo del 75%. Trabajo en domingo o festivo: recargo del 75% por cada hora. El recargo nocturno ordinario (9pm a 6am) es del 35%. Estos valores se suman al salario base y deben pagarse en la nómina. La jornada máxima es de 48 horas semanales y puedes trabajar hasta 2 horas extras diarias o 12 semanales.',
    category: 'Jornada laboral',
    icon: <BusinessCenterIcon />
  },
  {
    id: 'faq9',
    question: '¿Qué es una demanda laboral y cómo presentarla?',
    answer: 'Una demanda laboral es el mecanismo legal para reclamar derechos laborales vulnerados. Primero, agota la vía gubernativa presentando una reclamación directa a tu empleador. Si no hay respuesta favorable, puedes presentar la demanda ante los jueces laborales con los siguientes requisitos: designación del juez, identificación de las partes, pretensiones, hechos, fundamentos de derecho, cuantía, pruebas y notificaciones. Aunque no es obligatorio tener abogado para procesos de única instancia, es recomendable contar con asesoría legal.',
    category: 'Procesos judiciales',
    icon: <GavelIcon />
  },
  {
    id: 'faq10',
    question: '¿Qué derechos tengo si trabajo en plataformas digitales como Rappi o Uber?',
    answer: 'Los trabajadores de plataformas digitales están luchando por el reconocimiento de sus derechos laborales en Colombia. Aunque estas empresas suelen alegar que son contratistas independientes, existen elementos de subordinación que podrían configurar una relación laboral: control algorítmico, calificaciones, imposibilidad de negociar tarifas. Si hay subordinación, deberías tener todos los derechos laborales: contrato, prestaciones sociales, seguridad social y salario mínimo proporcional. Actualmente hay proyectos legislativos para regular específicamente este trabajo.',
    category: 'Nuevas modalidades laborales',
    icon: <BusinessCenterIcon />
  }
];

// Resource categories
const categories = ['Todos', 'Derechos Básicos', 'Organización', 'Problemas Laborales', 'Formación', 'Contratos', 'Seguridad Social'];

const ResourcesSection: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [view, setView] = useState<'resources' | 'faq'>('resources');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredFaqs = legalFaqData.filter(faq => {
    if (searchQuery) {
      return faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
             faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
             faq.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });
  
  return (
    <section id="resources" className="py-20 bg-[#F2F0F0] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#153959] rounded-full filter blur-3xl opacity-10 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#733A19] rounded-full filter blur-3xl opacity-10 -ml-48 -mb-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-md bg-[#BFAF8F]/30 text-[#733A19] text-sm font-semibold mb-4">
            Recursos Educativos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0E1013]">
            Herramientas para la defensa de tus derechos
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Accede a nuestra biblioteca de recursos gratuitos diseñados para empoderar a los trabajadores
            con conocimientos prácticos sobre sus derechos laborales y cómo defenderlos colectivamente.
          </p>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-sm inline-flex">
            <Button 
              onClick={() => setView('resources')}
              variant={view === 'resources' ? 'contained' : 'text'}
              sx={{ 
                borderRadius: '9999px',
                px: 3,
                bgcolor: view === 'resources' ? '#733A19' : 'transparent',
                color: view === 'resources' ? 'white' : '#733A19',
                '&:hover': {
                  bgcolor: view === 'resources' ? '#5C2E14' : 'rgba(115, 58, 25, 0.04)',
                },
                boxShadow: view === 'resources' ? 2 : 0,
              }}
            >
              Recursos
            </Button>
            <Button 
              onClick={() => setView('faq')}
              variant={view === 'faq' ? 'contained' : 'text'}
              sx={{ 
                borderRadius: '9999px',
                px: 3,
                bgcolor: view === 'faq' ? '#733A19' : 'transparent',
                color: view === 'faq' ? 'white' : '#733A19',
                '&:hover': {
                  bgcolor: view === 'faq' ? '#5C2E14' : 'rgba(115, 58, 25, 0.04)',
                },
                boxShadow: view === 'faq' ? 2 : 0,
              }}
            >
              Diccionario Legal
            </Button>
          </div>
        </div>

        {view === 'resources' ? (
          <>
            {/* Resource Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    category === selectedCategory ? 
                    'bg-[#733A19] text-white' : 
                    'bg-[#BFAF8F]/20 text-[#0E1013] hover:bg-[#BFAF8F]/30'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {resourcesData.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md border border-[#BFAF8F]/20 h-full flex flex-col">
                    <div className={`h-3 ${
                      resource.category === 'Derechos Básicos' ? 'bg-[#733A19]' : 
                      resource.category === 'Organización' ? 'bg-[#153959]' :
                      'bg-[#BFAF8F]'
                    }`}></div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <span className={`inline-block text-xs font-bold px-2 py-1 rounded-sm mb-2 ${
                            resource.type === 'PDF' ? 'bg-[#733A19]/10 text-[#733A19]' :
                            resource.type === 'Video' ? 'bg-[#153959]/10 text-[#153959]' :
                            'bg-[#BFAF8F]/20 text-[#0E1013]'
                          }`}>
                            {resource.type}
                          </span>
                          <h3 className="text-lg font-bold text-[#0E1013] leading-tight">{resource.title}</h3>
                        </div>
                        <div className="ml-4">
                          <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
                            resource.type === 'PDF' ? 'bg-[#733A19]/10 text-[#733A19]' :
                            resource.type === 'Video' ? 'bg-[#153959]/10 text-[#153959]' :
                            'bg-[#BFAF8F]/20 text-[#0E1013]'
                          }`}>
                            {resource.icon}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 flex-1">
                        {resource.description}
                      </p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-[#0E1013]/60 font-medium">
                          {resource.category}
                        </span>
                        <Button
                          variant="text"
                          startIcon={<DownloadIcon />}
                          size="small"
                          onClick={() => {
                            const contactFormElement = document.getElementById('contact-form');
                            if (contactFormElement) {
                              contactFormElement.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          sx={{ 
                            color: '#733A19',
                            '&:hover': { backgroundColor: 'rgba(115, 58, 25, 0.04)' }
                          }}
                        >
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* FAQ Search */}
            <div className="mb-8 max-w-2xl mx-auto">
              <TextField
                fullWidth
                placeholder="Busca por palabra clave o pregunta específica..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#733A19' }} />
                    </InputAdornment>
                  ),
                  sx: { 
                    borderRadius: 2,
                    bgcolor: 'white',
                    '& fieldset': { 
                      borderColor: '#BFAF8F50',
                    },
                    '&:hover fieldset': { 
                      borderColor: '#BFAF8F',
                    },
                  }
                }}
              />
              <p className="text-sm text-gray-500 mt-2">
                Ejemplos: "despido", "acoso laboral", "horas extras", "prestaciones sociales"
              </p>
            </div>

            {/* FAQ List */}
            <div className="max-w-4xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-10">
                  <HelpOutlineIcon sx={{ fontSize: 60, color: '#BFAF8F', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>No encontramos resultados</Typography>
                  <Typography color="textSecondary">
                    Intenta con otra búsqueda o contacta con nuestro equipo para una consulta personalizada
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      const contactElement = document.getElementById('contact-form');
                      if (contactElement) {
                        contactElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    sx={{ 
                      mt: 3,
                      bgcolor: '#733A19',
                      color: 'white',
                      '&:hover': { bgcolor: '#5C2E14' }
                    }}
                  >
                    Contactar asesores
                  </Button>
                </div>
              ) : (
                <>
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-[#BFAF8F]/20">
                        <div className="p-6">
                          <div className="flex items-start mb-4">
                            <div className={`w-10 h-10 rounded-md flex items-center justify-center mr-4 flex-shrink-0 bg-[#733A19]/10 text-[#733A19]`}>
                              {faq.icon}
                            </div>
                            <div>
                              <div className="flex items-center mb-1">
                                <Chip 
                                  size="small" 
                                  label={faq.category} 
                                  sx={{ 
                                    backgroundColor: '#BFAF8F30', 
                                    color: '#733A19',
                                    fontWeight: 500,
                                    fontSize: '0.7rem',
                                    height: 20,
                                    mr: 1
                                  }} 
                                />
                              </div>
                              <h3 className="text-lg font-bold text-[#0E1013] mb-3">{faq.question}</h3>
                              <p className="text-gray-600 whitespace-pre-line leading-relaxed">{faq.answer}</p>
                              <div className="mt-4 flex justify-end">
                                <Button
                                  variant="text"
                                  size="small"
                                  onClick={() => {
                                    const contactFormElement = document.getElementById('contact-form');
                                    if (contactFormElement) {
                                      contactFormElement.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }}
                                  sx={{ 
                                    color: '#733A19',
                                    '&:hover': { backgroundColor: 'rgba(115, 58, 25, 0.04)' }
                                  }}
                                >
                                  Más información
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
        
        {/* Call to Action */}
        <motion.div 
          className="bg-gradient-to-br from-[#733A19] to-[#5C2E14] rounded-lg p-8 md:p-10 shadow-lg relative overflow-hidden mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(#F2F0F0 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
            }}></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="mb-6 md:mb-0 md:mr-10">
              <h3 className="text-2xl md:text-3xl font-bold text-[#F2F0F0] mb-3">¿Necesitas asesoría legal personalizada?</h3>
              <p className="text-[#F2F0F0]/80 max-w-xl">
                Contacta con nuestro equipo para recibir orientación específica sobre tu caso laboral
                o para agendar una cita con nuestros asesores legales especializados en derecho laboral.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  const contactFormElement = document.getElementById('contact-form');
                  if (contactFormElement) {
                    contactFormElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                sx={{ 
                  bgcolor: '#F2F0F0',
                  color: '#733A19',
                  fontWeight: 600,
                  px: 4,
                  '&:hover': {
                    bgcolor: '#BFAF8F',
                  }
                }}
              >
                Contáctanos
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesSection; 