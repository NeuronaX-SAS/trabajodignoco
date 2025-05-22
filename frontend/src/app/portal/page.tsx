'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Grid as MuiGrid, 
  Card, 
  CardContent, 
  CardActions, 
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ResourceList from '@/components/Common/ResourceList';
import { Resource, getResources, searchResources, ensureResourcesForAllCategories } from '@/lib/resourcesApi';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SwipeIcon from '@mui/icons-material/Swipe';

// Create a Grid component that satisfies TypeScript
const Grid = MuiGrid as React.ComponentType<any>;

const PortalPage = () => {
  const router = useRouter();
  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [featuredResources, setFeaturedResources] = useState<Resource[]>([]);
  const [displayedResources, setDisplayedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      try {
        const resources = await getResources();
        setAllResources(resources);
        
        // Also ensure we have resources for all categories
        await ensureResourcesForAllCategories();
        
        // Get 3 random resources for featuring
        if (resources.length > 0) {
          const shuffled = [...resources].sort(() => 0.5 - Math.random());
          setFeaturedResources(shuffled.slice(0, 6));
          setDisplayedResources(shuffled.slice(0, 6));
        }
      } catch (error) {
        console.error('Error loading resources:', error);
        setError('No se pudieron cargar los recursos. Intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setIsSearchMode(false);
      setDisplayedResources(featuredResources);
      return;
    }
    
    setSearching(true);
    setIsSearchMode(true);
    
    try {
      const results = await searchResources(searchQuery);
      setDisplayedResources(results);
    } catch (error) {
      console.error('Error searching resources:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearchMode(false);
    setDisplayedResources(featuredResources);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const resourceCategories = [
    {
      title: 'Derechos Laborales',
      description: 'Conoce tus derechos laborales básicos garantizados por la Constitución y el Código Sustantivo del Trabajo.',
      icon: '📜',
      color: '#DE735B',
      category: 'Derechos'
    },
    {
      title: 'Contratos de Trabajo',
      description: 'Aprende sobre los diferentes tipos de contratos, sus características y protecciones legales.',
      icon: '📝',
      color: '#517FA3',
      category: 'Laboral'
    },
    {
      title: 'Seguridad Social',
      description: 'Información sobre tus derechos de acceso a salud, pensión y riesgos laborales.',
      icon: '🏥',
      color: '#733A19',
      category: 'Seguridad Social'
    },
    {
      title: 'Terminación de Contratos',
      description: 'Guías sobre cómo proceder ante un despido con o sin justa causa.',
      icon: '🤝',
      color: '#153959',
      category: 'Terminación de contrato laboral'
    },
    {
      title: 'Pensión',
      description: 'Recursos para entender tus derechos pensionales y cómo acceder a ellos.',
      icon: '⚖️',
      color: '#BFAF8F',
      category: 'Pensión'
    },
    {
      title: 'Trámites',
      description: 'Ayuda para realizar trámites laborales comunes en Colombia.',
      icon: '💻',
      color: '#516A39',
      category: 'Trámites laborales'
    }
  ];

  const navigateToCategory = (index: number) => {
    const category = resourceCategories[index];
    router.push(`/portal/categoria/${encodeURIComponent(category.category)}`);
  };

  return (
    <Box sx={{ py: 6, minHeight: '100vh', backgroundColor: '#F9F9F9' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h1" sx={{ mb: 1, fontWeight: 700, color: '#153959' }}>
            Portal Educativo Laboral
          </Typography>
          <Typography variant="h5" sx={{ mb: 5, color: '#733A19' }}>
            Recursos para la defensa de tus derechos laborales
          </Typography>
        </motion.div>

        {/* Featured Carousel */}
        {!isSearchMode && !loading && featuredResources.length > 0 && (
          <FeaturedCarousel resources={featuredResources.slice(0, 5)} />
        )}

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card 
            elevation={0}
            sx={{ 
              mb: 6,
              p: { xs: 2, md: 4 },
              border: '1px solid #e0e0e0',
              borderRadius: 3,
              backgroundColor: 'white',
              backgroundImage: 'linear-gradient(135deg, rgba(21,57,89,0.02) 0%, rgba(115,58,25,0.02) 100%)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative elements */}
            <Box sx={{ 
              position: 'absolute',
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: 'rgba(21,57,89,0.03)',
              top: -75,
              right: -50,
              zIndex: 0
            }} />
            
            <Box sx={{ 
              position: 'absolute',
              width: 100,
              height: 100,
              borderRadius: '50%',
              backgroundColor: 'rgba(115,58,25,0.03)',
              bottom: -30,
              left: 50,
              zIndex: 0
            }} />
          
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, textAlign: { xs: 'center', md: 'left' } }}>
                Busca información sobre tus derechos laborales
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: 2
              }}>
                <TextField
                  fullWidth
                  placeholder="Contratos, pensión, despido, seguridad social..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                      <InputAdornment position="end">
                        {searching ? (
                          <CircularProgress size={20} />
                        ) : (
                          <IconButton onClick={handleClearSearch} edge="end" size="small">
                            <ClearIcon />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                    sx: { 
                      borderRadius: 3,
                      bgcolor: 'white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      '&.Mui-focused': {
                        boxShadow: '0 4px 12px rgba(21,57,89,0.15)'
                      }
                    }
                  }}
                />
                
                <Button 
                  variant="contained"
                  onClick={handleSearch}
                  disabled={searching}
                  sx={{ 
                    bgcolor: '#153959',
                    '&:hover': {
                      bgcolor: '#0c2438'
                    },
                    minWidth: { xs: '100%', md: 120 },
                    height: 56,
                    borderRadius: 3,
                    boxShadow: '0 3px 8px rgba(21,57,89,0.3)',
                    px: 3,
                    fontWeight: 600
                  }}
                >
                  {searching ? <CircularProgress size={24} color="inherit" /> : 'Buscar'}
                </Button>
              </Box>
              
              {/* Popular search terms */}
              <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  Búsquedas populares:
                </Typography>
                {['Contratos', 'Despido', 'Liquidación', 'Pensión', 'Licencias'].map((term, index) => (
                  <Chip 
                    key={index}
                    label={term} 
                    size="small"
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch();
                    }}
                    sx={{ 
                      bgcolor: 'rgba(21,57,89,0.08)',
                      '&:hover': {
                        bgcolor: 'rgba(21,57,89,0.15)',
                      },
                      fontWeight: 500
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Card>
        </motion.div>

        {/* Search results or Resource Categories */}
        {isSearchMode ? (
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#153959' }}>
              Resultados de búsqueda
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 4 }}>
                {error}
              </Alert>
            )}
            <ResourceList 
              resources={displayedResources} 
              loading={searching}
              itemsPerPage={6}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="outlined" 
                onClick={handleClearSearch}
                sx={{ 
                  borderColor: '#733A19', 
                  color: '#733A19',
                  '&:hover': { 
                    borderColor: '#5c2e14', 
                    backgroundColor: 'rgba(115, 58, 25, 0.04)' 
                  }
                }}
              >
                Volver al inicio
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            {/* Resource Categories */}
            <Box sx={{ mb: 7, mt: 2 }}>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: '#153959', textAlign: 'center' }}>
                Categorías
              </Typography>
              
              <Box 
                sx={{ 
                  position: 'relative',
                  width: '100%',
                  overflow: 'hidden',
                  py: 2
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    overflow: { xs: 'auto', md: 'visible' },
                    pb: 2,
                    px: { xs: 2, md: 0 },
                    justifyContent: { xs: 'flex-start', md: 'center' },
                    '&::-webkit-scrollbar': {
                      height: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#f1f1f1',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#c1c1c1',
                      borderRadius: '10px',
                    }
                  }}
                >
                  {resourceCategories.map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ 
                        scale: 1.03,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Box 
                        onClick={() => navigateToCategory(index)}
                        sx={{ 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          mx: { xs: 1, md: 2 },
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          borderRadius: 2,
                          p: { xs: 1.5, md: 2 },
                          backgroundColor: 'white',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          border: `1px solid ${category.color}20`,
                          flex: { xs: '0 0 auto', md: 1 },
                          minWidth: { xs: '130px', md: '140px' },
                          maxWidth: { md: '160px' },
                          height: { xs: '120px', md: '130px' },
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.06)',
                            backgroundColor: `${category.color}05`,
                            borderColor: `${category.color}40`
                          }
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: { xs: 40, md: 48 },
                            height: { xs: 40, md: 48 },
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            fontSize: { xs: '1.2rem', md: '1.3rem' },
                            mb: 1.5,
                            boxShadow: `0 3px 6px ${category.color}20`,
                            border: `1px solid ${category.color}30`,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {category.icon}
                        </Box>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontWeight: 600, 
                            color: '#333',
                            mb: 0.5,
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            lineHeight: 1.2
                          }}
                        >
                          {category.title}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
                
                {/* Scroll indicator for mobile */}
                <Box 
                  sx={{ 
                    display: { xs: 'flex', md: 'none' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 1
                  }}
                >
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.7rem'
                    }}
                  >
                    <SwipeIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                    Desliza para ver más categorías
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 5 }} />
            </Box>

            {/* Featured Resources Section */}
            <Box sx={{ mb: 8 }}>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: '#153959', textAlign: 'center' }}>
                Recursos Destacados
              </Typography>
              
              <Box sx={{ position: 'relative' }}>
                <Box 
                  sx={{ 
                    position: 'absolute',
                    width: { xs: 0, md: 200 },
                    height: { xs: 0, md: '100%' },
                    left: { xs: 0, md: -70 },
                    top: 0,
                    background: 'linear-gradient(135deg, rgba(115,58,25,0.03) 0%, rgba(115,58,25,0) 70%)',
                    borderRadius: '50%',
                    zIndex: 0,
                    display: { xs: 'none', md: 'block' }
                  }} 
                />
                
                <Box 
                  sx={{ 
                    position: 'absolute',
                    width: { xs: 0, md: 300 },
                    height: { xs: 0, md: '100%' },
                    right: { xs: 0, md: -100 },
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(21,57,89,0.03) 0%, rgba(21,57,89,0) 70%)',
                    borderRadius: '50%',
                    zIndex: 0,
                    display: { xs: 'none', md: 'block' }
                  }} 
                />
                
                {error && (
                  <Alert severity="error" sx={{ mb: 4 }}>
                    {error}
                  </Alert>
                )}
                
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <ResourceList 
                    resources={displayedResources} 
                    loading={loading}
                    itemsPerPage={6}
                  />
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => router.push('/portal/recursos/todos')}
                  sx={{ 
                    borderColor: '#733A19', 
                    color: '#733A19',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 3,
                    '&:hover': { 
                      borderColor: '#5c2e14', 
                      backgroundColor: 'rgba(115, 58, 25, 0.04)',
                      boxShadow: '0 4px 10px rgba(115,58,25,0.1)'
                    }
                  }}
                >
                  Ver todos los recursos
                </Button>
              </Box>
            </Box>

            {/* Bottom Section */}
            <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
              <Divider sx={{ mb: 6 }} />
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#153959' }}>
                ¿Quieres contribuir con material educativo?
              </Typography>
              <Typography sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
                Invitamos a expertos en derecho laboral, dirigentes sindicales y activistas a compartir sus conocimientos con nuestra comunidad de trabajadores.
              </Typography>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  borderColor: '#153959', 
                  color: '#153959',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  '&:hover': { 
                    borderColor: '#0c2438',
                    backgroundColor: 'rgba(21,57,89,0.04)',
                    boxShadow: '0 4px 10px rgba(21,57,89,0.1)'
                  }
                }}
                onClick={() => router.push('/#contact-form')}
              >
                Contáctanos
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

// Carrusel destacado
const FeaturedCarousel = ({ resources }: { resources: Resource[] }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === resources.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? resources.length - 1 : prev - 1));
  };
  
  const goToResource = (resourceId: string) => {
    router.push(`/portal/recurso/${resourceId}`);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Get category color
  const getCategoryColor = (category: string): string => {
    const categoryColors: {[key: string]: string} = {
      'Laboral': '#517FA3',
      'Pensión': '#BFAF8F',
      'Seguridad Social': '#733A19',
      'Terminación de contrato laboral': '#153959',
      'Trámites laborales': '#516A39',
      'Derechos': '#DE735B',
      'Default': '#517FA3'
    };
    
    return categoryColors[category] || categoryColors['Default'];
  };
  
  // Get category icon
  const getCategoryIcon = (category: string): string => {
    const categoryIcons: {[key: string]: string} = {
      'Laboral': '📝',
      'Pensión': '⚖️',
      'Seguridad Social': '🏥',
      'Terminación de contrato laboral': '🤝',
      'Trámites laborales': '💻',
      'Derechos': '📜',
      'Default': '📚'
    };
    
    return categoryIcons[category] || categoryIcons['Default'];
  };
  
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#153959', textAlign: 'center' }}>
        Destacados
      </Typography>
      
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          mb: 4,
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
        }}
      >
        {resources.map((resource, index) => (
          <Box
            key={resource.id}
            sx={{
              display: index === activeSlide ? 'block' : 'none',
              position: 'relative',
              bgcolor: 'white',
              height: { xs: '300px', md: '240px' },
              cursor: 'pointer',
            }}
            onClick={() => goToResource(resource.id)}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(to right, ${getCategoryColor(resource.category)}11, ${getCategoryColor(resource.category)}05)`,
                zIndex: 1,
              }}
            />
            
            <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', zIndex: 2 }}>
              <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item xs={12} md={7} sx={{ py: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        backgroundColor: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        border: `1px solid ${getCategoryColor(resource.category)}20`,
                      }}
                    >
                      {getCategoryIcon(resource.category)}
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {resource.category}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
                    {resource.title || resource.question}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 3,
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      color: '#666'
                    }}
                  >
                    {resource.content?.substring(0, 150)}
                    {resource.content && resource.content.length > 150 ? '...' : ''}
                  </Typography>
                  
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: getCategoryColor(resource.category),
                      color: getCategoryColor(resource.category),
                      borderRadius: 5,
                      px: 2,
                      alignSelf: 'flex-start',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: getCategoryColor(resource.category),
                        backgroundColor: `${getCategoryColor(resource.category)}10`,
                      }
                    }}
                  >
                    Leer más
                  </Button>
                </Grid>
                
                <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                  <Box
                    sx={{
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '4rem',
                      background: `radial-gradient(circle, ${getCategoryColor(resource.category)}15 0%, ${getCategoryColor(resource.category)}05 70%)`,
                      border: `1px dashed ${getCategoryColor(resource.category)}30`,
                    }}
                  >
                    {getCategoryIcon(resource.category)}
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        ))}
        
        {/* Navigation arrows */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          sx={{
            position: 'absolute',
            left: { xs: 10, md: 20 },
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            width: 36,
            height: 36,
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.95)' },
            zIndex: 3,
          }}
        >
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>
        
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          sx={{
            position: 'absolute',
            right: { xs: 10, md: 20 },
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            width: 36,
            height: 36,
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.95)' },
            zIndex: 3,
          }}
        >
          <NavigateNextIcon fontSize="small" />
        </IconButton>
        
        {/* Dots navigation */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 3,
          }}
        >
          {resources.map((_, index) => (
            <Box
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(index);
              }}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: index === activeSlide ? '#153959' : 'rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default PortalPage; 