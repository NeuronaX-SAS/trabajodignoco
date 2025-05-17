'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, TextField, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const faqData = [
  {
    question: '¿Qué hacer ante un despido injustificado?',
    answer: 'Si consideras que tu despido fue injustificado, tienes derecho a demandar ante un juez laboral. Reúne pruebas, solicita asesoría legal y contacta a Trabajo Digno para recibir acompañamiento.',
  },
  {
    question: '¿Cómo denunciar acoso laboral?',
    answer: 'Debes documentar los hechos, buscar apoyo en tu entorno laboral y presentar una queja ante el empleador o el Ministerio de Trabajo. Trabajo Digno puede orientarte en el proceso.',
  },
  {
    question: '¿Cuáles son mis derechos como trabajador independiente?',
    answer: 'Tienes derecho a la seguridad social, a recibir un pago justo y a condiciones dignas. Si tienes dudas sobre tu contrato o aportes, contáctanos para asesoría.',
  },
  {
    question: '¿Qué hacer si no me pagan mi salario?',
    answer: 'Puedes reclamar ante tu empleador y, si no hay respuesta, acudir al Ministerio de Trabajo o iniciar una acción legal. Trabajo Digno te apoya en la gestión de tu caso.',
  },
  {
    question: '¿Cómo afiliarme a un sindicato?',
    answer: 'Busca un sindicato del sector, solicita información y afíliate. Tienes derecho a la libre asociación sindical. Si necesitas orientación, contáctanos.',
  },
  {
    question: '¿Qué es un contrato de prestación de servicios?',
    answer: 'Es un acuerdo civil, no laboral, donde no hay subordinación ni prestaciones sociales. Si tienes dudas sobre tu modalidad contractual, podemos ayudarte.',
  },
  {
    question: '¿Qué hacer ante discriminación laboral?',
    answer: 'La discriminación laboral es ilegal. Documenta los hechos y busca asesoría para presentar una queja o demanda. Trabajo Digno te acompaña en el proceso.',
  },
  {
    question: '¿Cómo reclamar horas extras no pagadas?',
    answer: 'Debes llevar un registro de tus horas trabajadas y reclamar ante tu empleador. Si no hay solución, puedes acudir a la autoridad laboral. Contáctanos para apoyo.',
  },
  // Puedes agregar más preguntas frecuentes aquí
];

const ResourcesSection: React.FC = () => {
  const [search, setSearch] = useState('');
  const filteredFaq = faqData.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  const handleContactClick = () => {
    const contactFormElement = document.getElementById('contact-form');
    if (contactFormElement) {
      contactFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="resources" className="py-20 bg-[#F2F0F0] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#153959] rounded-full filter blur-3xl opacity-10 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#733A19] rounded-full filter blur-3xl opacity-10 -ml-48 -mb-48"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-md bg-[#BFAF8F]/30 text-[#733A19] text-sm font-semibold mb-4">
            Diccionario Laboral & Preguntas Frecuentes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0E1013]">
            Herramientas para la defensa de tus derechos
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Encuentra respuestas claras y orientación sobre los problemas laborales más comunes en Colombia. Si necesitas ayuda personalizada, contáctanos.
          </p>
        </motion.div>
        <Box sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar pregunta o tema..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ background: 'white', borderRadius: 2 }}
          />
        </Box>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {filteredFaq.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
              No se encontraron resultados para tu búsqueda.
            </Typography>
          ) : (
            filteredFaq.map((faq, idx) => (
              <Accordion key={idx} sx={{ mb: 2, borderRadius: 2, boxShadow: 'none', border: '1px solid #BFAF8F40' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight={600}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ mb: 2 }}>{faq.answer}</Typography>
                  <Button variant="contained" sx={{ background: '#733A19', color: 'white', '&:hover': { background: '#5C2E14' } }} onClick={handleContactClick}>
                    Contactar para ayuda
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      </div>
    </section>
  );
};

export default ResourcesSection; 