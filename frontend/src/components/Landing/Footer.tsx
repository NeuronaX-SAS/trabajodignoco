'use client';

import React from 'react';
import { Box, Container, Typography, Link, IconButton, Divider } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TikTokIcon from '@mui/icons-material/MusicNote';

const footerLinks = [
  {
    title: 'Servicios',
    links: [
      { text: 'Contratos Laborales', href: '/#contact-form' },
      { text: 'Despidos Injustificados', href: '/#contact-form' },
      { text: 'Liquidaciones', href: '/#contact-form' },
      { text: 'Acoso Laboral', href: '/#contact-form' },
      { text: 'Contratación por Servicios', href: '/#contact-form' }
    ]
  },
  {
    title: 'Empresa',
    links: [
      { text: 'Sobre Nosotros', href: '/#contact-form' },
      { text: 'Equipo Legal', href: '/#contact-form' },
      { text: 'Testimonios', href: '/#contact-form' },
      { text: 'Blog', href: '/#contact-form' },
      { text: 'Carreras', href: '/#contact-form' }
    ]
  },
  {
    title: 'Recursos',
    links: [
      { text: 'Centro de Ayuda', href: '/#contact-form' },
      { text: 'Preguntas Frecuentes', href: '/#contact-form' },
      { text: 'Documentación Legal', href: '/#contact-form' },
      { text: 'Glosario', href: '/#contact-form' },
      { text: 'Calculadoras', href: '/#contact-form' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { text: 'Términos de Servicio', href: '/#contact-form' },
      { text: 'Política de Privacidad', href: '/#contact-form' },
      { text: 'Política de Cookies', href: '/#contact-form' },
      { text: 'Aviso Legal', href: '/#contact-form' }
    ]
  }
];

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#2B4B5C',
        color: 'white',
        pt: 8,
        pb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Elements */}
      
      <Box 
        sx={{
          position: 'absolute',
          top: '-15%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(222,115,91,0.3) 0%, rgba(222,115,91,0) 70%)',
          zIndex: 0
        }}
      />
      
      <Box 
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(222,115,91,0.2) 0%, rgba(222,115,91,0) 70%)',
          zIndex: 0
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, px: 1.5, mb: 3 }}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ width: 35, height: 35, mr: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image 
                    src="/fleur-de-lis.svg" 
                    alt="TrabajoDigno.co Logo" 
                    width={25} 
                    height={25}
                    priority
                  />
                </Box>
                <Typography 
                  variant="h6" 
                  component={Link} 
                  href="/"
                  sx={{ 
                    fontWeight: 700, 
                    letterSpacing: '0.5px',
                    textDecoration: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center' 
                  }}
                >
                  TrabajoDigno<Box component="span" sx={{ color: 'rgba(255,255,255,0.9)' }}>.co</Box>
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.7)', maxWidth: 300 }}>
                Protegemos tus derechos laborales con tecnología avanzada e inteligencia artificial.
                Nuestra plataforma te brinda acceso a herramientas legales de calidad.
              </Typography>
              
              <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <IconButton 
                    component="a" 
                    href="https://www.facebook.com/profile.php?id=61575746772724" 
                    target="_blank" 
                    rel="noopener"
                    sx={{ 
                      color: 'white', 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': { backgroundColor: '#DE735B' }
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <IconButton 
                    component="a" 
                    href="https://www.instagram.com/trabajodigno.col/" 
                    target="_blank" 
                    rel="noopener"
                    sx={{ 
                      color: 'white', 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': { backgroundColor: '#DE735B' }
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <IconButton 
                    component="a" 
                    href="https://www.tiktok.com/@trabajodigno.col" 
                    target="_blank" 
                    rel="noopener"
                    sx={{ 
                      color: 'white', 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': { backgroundColor: '#DE735B' }
                    }}
                  >
                    <TikTokIcon />
                  </IconButton>
                </motion.div>
              </Box>
            </Box>
          </Box>
          
          {footerLinks.map((group, index) => (
            <Box key={index} sx={{ width: { xs: '50%', md: '25%' }, px: 1.5, mb: 3 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 30,
                    height: 3,
                    backgroundColor: '#DE735B',
                    borderRadius: 3
                  }
                }}
              >
                {group.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {group.links.map((link, linkIndex) => (
                  <Box component="li" key={linkIndex} sx={{ mb: 1.5 }}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link 
                        href={link.href}
                        sx={{ 
                          color: 'rgba(255,255,255,0.7)', 
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          transition: 'color 0.2s',
                          '&:hover': {
                            color: '#DE735B'
                          }
                        }}
                      >
                        {link.text}
                      </Link>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        
        <Divider sx={{ my: 5, bgcolor: 'rgba(255,255,255,0.1)' }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', sm: 'flex-start' }, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: { xs: 2, sm: 0 } }}>
            © {new Date().getFullYear()} TrabajoDigno.co | Todos los derechos reservados
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
            <Link href="/#contact-form" sx={{ color: 'rgba(255,255,255,0.6)', mx: 1, fontSize: '0.75rem', textDecoration: 'none', '&:hover': { color: '#DE735B' } }}>
              Contáctanos
            </Link>
            <Link href="/#contact-form" sx={{ color: 'rgba(255,255,255,0.6)', mx: 1, fontSize: '0.75rem', textDecoration: 'none', '&:hover': { color: '#DE735B' } }}>
              Soporte
            </Link>
            <Link href="/#contact-form" sx={{ color: 'rgba(255,255,255,0.6)', mx: 1, fontSize: '0.75rem', textDecoration: 'none', '&:hover': { color: '#DE735B' } }}>
              Mapa del Sitio
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;