'use client';

import React from 'react';
import { Box, Container, Typography, Button, TextField, Stack, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navega',
      links: [
        { name: 'Inicio', href: '/' },
        { name: 'Quiénes Somos', href: '/#about-section' },
        { name: 'Recursos', href: '/#resources' },
        { name: 'Formación', href: '/#education' },
        { name: 'Noticias', href: '/#news' },
        { name: 'Contacto', href: '/#contact-form' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { name: 'Derechos Laborales', href: '/recursos/derechos' },
        { name: 'Guías Prácticas', href: '/recursos/guias' },
        { name: 'Formatos y Plantillas', href: '/recursos/formatos' },
        { name: 'Preguntas Frecuentes', href: '/recursos/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Términos y Condiciones', href: '/legal/terminos' },
        { name: 'Política de Privacidad', href: '/legal/privacidad' },
        { name: 'Aviso Legal', href: '/legal/aviso' },
      ],
    },
  ];

  return (
    <Box component="footer" sx={{ 
      bgcolor: '#0E1013',
      color: '#F2F0F0',
      pt: 8,
      pb: 4,
      position: 'relative',
      overflow: 'hidden',
      clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
      mt: -8,
    }}>
      {/* Background Elements */}
      <Box sx={{ 
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: 0.05
      }}>
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[#BFAF8F]/20 blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-[#733A19]/20 blur-3xl"></div>
        <div style={{ 
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#F2F0F0 0.5px, transparent 0.5px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </Box>
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 6, md: 2 } }}>
        {/* Grid using Tailwind classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
          {/* Logo and about */}
          <div className="lg:col-span-4">
            <Box sx={{ mb: 4 }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center mb-4"
              >
                <Box 
                  sx={{ 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #BFAF8F 0%, #A69977 100%)',
                    p: 1,
                    mr: 2,
                    display: 'flex',
                  }}
                >
                  <Image
                    src="/ICONO (5).png"
                    alt="Trabajo Digno Logo"
                    width={44}
                    height={44}
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <Typography 
                  variant="h5" 
                  component="div"
                  sx={{ fontWeight: 700 }}
                >
                  Trabajo<Box component="span" sx={{ color: '#BFAF8F' }}>Digno</Box>
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Typography variant="body2" sx={{ color: '#F2F0F0', opacity: 0.8, mb: 3, maxWidth: 340 }}>
                  Organización defensora de los trabajadores colombianos que promueve el trabajo digno para lograr la dignificación de la vida.
                </Typography>
                
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  {[
                    { icon: '/logos/instagram.svg', href: 'https://www.instagram.com/trabajodigno.col/' },
                    { icon: '/logos/facebook.svg', href: 'https://www.facebook.com/profile.php?id=61575746772724' },
                    { icon: '/logos/tiktok.svg', href: 'https://www.tiktok.com/@trabajodigno.col' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#222327] hover:bg-[#733A19] transition-colors duration-300"
                    >
                      <img src={social.icon} alt="Social Media" width={20} height={20} />
                    </motion.a>
                  ))}
                </Stack>
              </motion.div>
            </Box>
          </div>
          
          {/* Links */}
          {footerLinks.map((section, i) => (
            <div key={i} className="lg:col-span-2 sm:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 3,
                    position: 'relative',
                    display: 'inline-block',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '30%',
                      height: '2px',
                      bottom: -8,
                      left: 0,
                      backgroundColor: '#BFAF8F',
                      borderRadius: '3px'
                    }
                  }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={1.5}>
                  {section.links.map((link, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <Link 
                        href={link.href} 
                        passHref
                        style={{ textDecoration: 'none' }}
                      >
                        <Typography 
                          component="span" 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(242, 240, 240, 0.7)',
                            transition: 'color 0.2s',
                            '&:hover': { color: '#BFAF8F' },
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Box 
                            component="span" 
                            sx={{ 
                              width: 5, 
                              height: 5, 
                              borderRadius: '50%', 
                              bgcolor: '#BFAF8F', 
                              display: 'inline-block',
                              mr: 1.5
                            }} 
                          />
                          {link.name}
                        </Typography>
                      </Link>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </div>
          ))}
          
          {/* Newsletter */}
          <div className="lg:col-span-4 sm:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
                Suscríbete a nuestro boletín
              </Typography>
              
              <Typography variant="body2" sx={{ color: '#F2F0F0', opacity: 0.8, mb: 3 }}>
                Recibe actualizaciones sobre tus derechos laborales y nuestros recursos
              </Typography>
              
              <Box 
                component="form" 
                onSubmit={(e) => e.preventDefault()}
                sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1 
                }}
              >
                <TextField
                  placeholder="Tu email"
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#BFAF8F',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#F2F0F0',
                    },
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    type="submit"
                    variant="contained" 
                    sx={{
                      background: 'linear-gradient(135deg, #BFAF8F 0%, #A69977 100%)',
                      color: '#0E1013',
                      fontWeight: 600,
                      height: '100%',
                      minWidth: { xs: '100%', sm: '120px' },
                      mt: { xs: 1, sm: 0 }
                    }}
                  >
                    Suscribirme
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </div>
        </div>
        
        {/* Divider and copyright */}
        <Box 
          sx={{ 
            borderTop: '1px solid rgba(242, 240, 240, 0.1)', 
            mt: 6, 
            pt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 2
          }}
        >
          <Typography 
            variant="body2" 
            align="center"
            sx={{ color: 'rgba(242, 240, 240, 0.6)' }}
          >
            © {currentYear} Trabajo Digno. Todos los derechos reservados.
          </Typography>
          
          <Typography 
            variant="body2" 
            align="center"
            sx={{ color: 'rgba(242, 240, 240, 0.6)' }}
          >
            Diseñado con 
            <Box 
              component="span" 
              sx={{ 
                color: '#BFAF8F',
                mx: 0.5,
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 0.6 },
                  '50%': { opacity: 1 },
                  '100%': { opacity: 0.6 }
                }
              }}
            >
              ♥
            </Box>
            para los trabajadores colombianos
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;