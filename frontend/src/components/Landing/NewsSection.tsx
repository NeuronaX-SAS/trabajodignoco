'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Box, Typography, Modal, IconButton, Button, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { marked } from 'marked';

// Sample news data - in a real application, this would come from an API or CMS
const newsItems = [
  {
    id: '1',
    title: 'Cartilla: Conozca sus derechos laborales fundamentales',
    excerpt: 'Guía práctica sobre los derechos laborales más importantes que todo trabajador colombiano debe conocer para defender su dignidad en el trabajo.',
    content: 'Guía práctica sobre los derechos laborales más importantes que todo trabajador colombiano debe conocer para defender su dignidad en el trabajo. (Aquí iría el contenido completo del artículo, puedes expandirlo en el futuro)',
    date: '15 Jun 2023',
    author: 'Equipo Trabajo Digno',
    imageUrl: '/placeholder-news-1.jpg',
    category: 'Recursos Educativos'
  },
  {
    id: '2',
    title: 'Derechos de los trabajadores en plataformas digitales',
    excerpt: 'Los trabajadores de aplicaciones como Rappi, Uber y otras plataformas digitales tienen derechos laborales que deben ser respetados. Conoce cuáles son.',
    content: 'Los trabajadores de aplicaciones como Rappi, Uber y otras plataformas digitales tienen derechos laborales que deben ser respetados. Conoce cuáles son. (Aquí iría el contenido completo del artículo, puedes expandirlo en el futuro)',
    date: '03 May 2023',
    author: 'Redacción Trabajo Digno',
    imageUrl: '/placeholder-news-2.jpg',
    category: 'Derechos Laborales'
  },
  {
    id: '3',
    title: 'Cómo organizarse colectivamente en tu lugar de trabajo',
    excerpt: 'Guía práctica para la organización colectiva de los trabajadores: cómo fortalecer lazos de solidaridad y construir poder desde la base.',
    content: 'Guía práctica para la organización colectiva de los trabajadores: cómo fortalecer lazos de solidaridad y construir poder desde la base. (Aquí iría el contenido completo del artículo, puedes expandirlo en el futuro)',
    date: '27 Abr 2023',
    author: 'Invitado: Sindicalista',
    imageUrl: '/placeholder-news-3.jpg',
    category: 'Organización'
  }
];

const categories = ['Todos', ...Array.from(new Set(newsItems.map(item => item.category)))];
const POSTS_PER_PAGE = 6;

const NewsSection: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof newsItems[0] | null>(null);
  const [category, setCategory] = useState('Todos');
  const [page, setPage] = useState(1);

  const filtered = category === 'Todos' ? newsItems : newsItems.filter(item => item.category === category);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleOpen = (item: typeof newsItems[0]) => {
    setSelected(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };
  const handleContactClick = () => {
    const contactFormElement = document.getElementById('contact-form');
    if (contactFormElement) {
      contactFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleCategory = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };
  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <section id="news" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#BFAF8F]/30 rounded-full filter blur-3xl opacity-20 -ml-48 -mt-48"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-md bg-[#BFAF8F]/30 text-[#733A19] text-sm font-semibold mb-4">
            Noticias y Recursos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0E1013]">
            Educación para la acción
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nuestra biblioteca de recursos educativos y noticias está diseñada para empoderar a los trabajadores
            con conocimientos prácticos sobre sus derechos y herramientas para la acción colectiva.
          </p>
        </motion.div>
        {/* Category Filter */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 6 }}>
          {categories.map(cat => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={cat === category ? 'primary' : 'default'}
              onClick={() => handleCategory(cat)}
              sx={{ fontWeight: 600, fontSize: 16, px: 2, bgcolor: cat === category ? '#733A19' : '#F2F0F0', color: cat === category ? 'white' : '#733A19', '&:hover': { bgcolor: '#BFAF8F' } }}
            />
          ))}
        </Box>
        {/* Blog Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
          {paginated.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box
                tabIndex={0}
                role="button"
                aria-label={`Leer artículo: ${item.title}`}
                onClick={() => handleOpen(item)}
                onKeyPress={e => { if (e.key === 'Enter') handleOpen(item); }}
                sx={{
                  cursor: 'pointer',
                  background: 'white',
                  borderRadius: 3,
                  boxShadow: 2,
                  border: '1px solid #BFAF8F40',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 420,
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: 6 }
                }}
              >
                <Box sx={{ height: 180, width: '100%', position: 'relative', overflow: 'hidden', background: '#eee' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <Box sx={{ position: 'absolute', top: 0, left: 0, bgcolor: '#733A19', color: 'white', px: 2, py: 0.5, fontWeight: 700, fontSize: 13, borderBottomRightRadius: 8 }}>
                    {item.category}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>{item.date} {item.author && <>· {item.author}</>}</Typography>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#0E1013' }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>{item.excerpt}</Typography>
                  <Button variant="text" sx={{ color: '#733A19', alignSelf: 'flex-start', fontWeight: 600 }} onClick={e => { e.stopPropagation(); handleOpen(item); }}>
                    Leer más
                  </Button>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 6 }}>
            <Button variant="outlined" onClick={handlePrev} disabled={page === 1} sx={{ fontWeight: 600 }}>
              Anterior
            </Button>
            <Typography variant="body1" sx={{ mx: 2 }}>{page} / {totalPages}</Typography>
            <Button variant="outlined" onClick={handleNext} disabled={page === totalPages} sx={{ fontWeight: 600 }}>
              Siguiente
            </Button>
          </Box>
        )}
        {/* Modal for full article */}
        <Modal open={open} onClose={handleClose} aria-labelledby="blog-modal-title" aria-describedby="blog-modal-content">
          <Box sx={{ maxWidth: 600, bgcolor: 'white', mx: 'auto', my: 8, borderRadius: 3, boxShadow: 24, p: 4, outline: 'none', position: 'relative' }}>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 12, right: 12 }} aria-label="Cerrar">
              <CloseIcon />
            </IconButton>
            {selected && (
              <>
                <Box sx={{ height: 220, width: '100%', mb: 2, borderRadius: 2, overflow: 'hidden', background: '#eee' }}>
                  <img
                    src={selected.imageUrl}
                    alt={selected.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>{selected.date} {selected.author && <>· {selected.author}</>}</Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#0E1013' }}>{selected.title}</Typography>
                <Box sx={{ mb: 3 }}>
                  <div dangerouslySetInnerHTML={{ __html: marked.parse(selected.content) }} />
                </Box>
              </>
            )}
          </Box>
        </Modal>
        {/* CTA to publish in the blog */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ background: '#733A19', color: 'white', fontWeight: 600, px: 5, py: 2, borderRadius: 2, fontSize: 18, '&:hover': { background: '#5C2E14' } }}
            onClick={handleContactClick}
          >
            ¿Quieres publicar en nuestro blog? Contáctanos
          </Button>
        </Box>
      </div>
    </section>
  );
};

export default NewsSection; 