'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button } from '@mui/material';

const tiktokVideos = [
  // Replace these with real TikTok video URLs or IDs from @trabajodigno.col
  'https://www.tiktok.com/@trabajodigno.col/video/7502177431537601847',
  'https://www.tiktok.com/@trabajodigno.col/video/7498864575362731319',
  'https://www.tiktok.com/@trabajodigno.col/video/7497274830006340870',
];

const getTikTokEmbedUrl = (url: string) => {
  // Extract video ID from URL
  const match = url.match(/video\/(\d+)/);
  return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : '';
};

const FormationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#BFAF8F]/20 rounded-full filter blur-3xl opacity-20 -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#733A19]/20 rounded-full filter blur-3xl opacity-20 -mr-48 -mb-48"></div>
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
            Formación para Trabajadores
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0E1013]">
            Talleres y capacitaciones gratuitas
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Participa en nuestros espacios formativos diseñados para empoderar a los trabajadores con 
            conocimientos y habilidades que fortalezcan su capacidad de acción individual y colectiva.
          </p>
        </motion.div>
        {/* TikTok Video Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4, mb: 8 }}>
          {tiktokVideos.map((url, idx) => (
            <Box key={idx} sx={{ aspectRatio: '9/16', borderRadius: 2, overflow: 'hidden', boxShadow: 2, background: '#000' }}>
              <iframe
                src={getTikTokEmbedUrl(url)}
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`TikTok Video ${idx + 1}`}
                style={{ border: 0, width: '100%', height: '100%' }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Button
            variant="contained"
            color="primary"
            href="https://www.tiktok.com/@trabajodigno.col"
            target="_blank"
            sx={{ background: '#000', color: '#fff', fontWeight: 600, '&:hover': { background: '#222' } }}
          >
            Ver más en TikTok
          </Button>
          
          {/* Social Media Icons - Added below the TikTok button */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 3, 
            mt: 3,
            p: 2,
            borderRadius: 2,
            background: 'rgba(191, 175, 143, 0.1)'
          }}>
            <a href="https://www.instagram.com/trabajodigno.col/" target="_blank" rel="noopener noreferrer">
              <img src="/social/instagram-1-svgrepo-com.svg" alt="Instagram" width={36} height={36} />
            </a>
            <a href="https://www.tiktok.com/@trabajodigno.col" target="_blank" rel="noopener noreferrer">
              <img src="/social/tiktok-icon-white-1-logo-svgrepo-com.svg" alt="TikTok" width={36} height={36} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575746772724" target="_blank" rel="noopener noreferrer">
              <img src="/social/facebook-color-svgrepo-com.svg" alt="Facebook" width={36} height={36} />
            </a>
          </Box>
        </Box>
        {/* Info Card (keep as is) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-[#153959] to-[#0E1013] text-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Formación para la acción</h3>
            <p className="text-white/80 mb-6">
              Nuestros talleres están diseñados bajo principios de educación popular y aprendizaje colectivo,
              privilegiando el saber y las experiencias de los y las trabajadoras.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="w-8 h-8 rounded-full bg-[#BFAF8F]/20 text-[#BFAF8F] flex items-center justify-center mr-3 font-bold">1</span>
                <div>
                  <h4 className="font-semibold text-white">Formación gratuita</h4>
                  <p className="text-white/70 text-sm">Todos nuestros talleres son gratuitos y accesibles para trabajadores de cualquier sector.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-8 h-8 rounded-full bg-[#BFAF8F]/20 text-[#BFAF8F] flex items-center justify-center mr-3 font-bold">2</span>
                <div>
                  <h4 className="font-semibold text-white">Formato híbrido</h4>
                  <p className="text-white/70 text-sm">Realizamos talleres presenciales y virtuales para facilitar la participación desde cualquier lugar.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-8 h-8 rounded-full bg-[#BFAF8F]/20 text-[#BFAF8F] flex items-center justify-center mr-3 font-bold">3</span>
                <div>
                  <h4 className="font-semibold text-white">Aprendizaje colectivo</h4>
                  <p className="text-white/70 text-sm">Fomentamos el intercambio de experiencias y saberes entre trabajadores.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FormationSection; 