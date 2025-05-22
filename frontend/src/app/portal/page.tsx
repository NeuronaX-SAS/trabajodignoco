'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Grid as MuiGrid, 
  Card, 
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
  useTheme,
  useMediaQuery,
  Chip,
  CardContent
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ResourceList from '@/components/Common/ResourceList';
import { Resource, getResources, searchResources, ensureResourcesForAllCategories } from '@/lib/resourcesApi';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Create a Grid component that satisfies TypeScript
const Grid = MuiGrid as React.ComponentType<{
  container?: boolean;
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  spacing?: number;
  children?: React.ReactNode;
}>;

const PortalPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [featuredResources, setFeaturedResources] = useState<Resource[]>([]);
  const [displayedResources, setDisplayedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [categoryStartIndex, setCategoryStartIndex] = useState(0);
  const [resourceStartIndex, setResourceStartIndex] = useState(0);

  const ITEMS_PER_VIEW = isMobile ? 2 : 3;

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      try {
        const resources = await getResources();
        setAllResources(resources);
        
        // Also ensure we have resources for all categories
        await ensureResourcesForAllCategories();
        
        // Get 6 random resources for featuring
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
      description: 'Conoce tus derechos fundamentales como trabajador',
      icon: '⚖️',
      color: '#733A19',
      category: 'Derechos',
      count: allResources.filter(r => r.category === 'Derechos').length
    },
    {
      title: 'Contratos Laborales',
      description: 'Todo sobre contratos y relaciones laborales',
      icon: '📋',
      color: '#153959',
      category: 'Laboral',
      count: allResources.filter(r => r.category === 'Laboral').length
    },
    {
      title: 'Seguridad Social',
      description: 'Salud, pensiones y riesgos laborales',
      icon: '🏥',
      color: '#733A19',
      category: 'Seguridad Social',
      count: allResources.filter(r => r.category === 'Seguridad Social').length
    },
    {
      title: 'Terminación Laboral',
      description: 'Despidos y terminación de contratos',
      icon: '📤',
      color: '#153959',
      category: 'Terminación de contrato laboral',
      count: allResources.filter(r => r.category === 'Terminación de contrato laboral').length
    },
    {
      title: 'Pensiones',
      description: 'Sistema pensional y jubilación',
      icon: '💰',
      color: '#BFAF8F',
      category: 'Pensión',
      count: allResources.filter(r => r.category === 'Pensión').length
    },
    {
      title: 'Trámites Laborales',
      description: 'Procedimientos y gestiones laborales',
      icon: '📝',
      color: '#733A19',
      category: 'Trámites laborales',
      count: allResources.filter(r => r.category === 'Trámites laborales').length
    }
  ];

  const navigateToCategory = (category: { category: string }) => {
    router.push(`/portal/categoria/${encodeURIComponent(category.category)}`);
  };

  const nextCategories = () => {
    const maxIndex = Math.max(0, resourceCategories.length - ITEMS_PER_VIEW);
    setCategoryStartIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevCategories = () => {
    setCategoryStartIndex(prev => Math.max(prev - 1, 0));
  };

  const nextResources = () => {
    const maxIndex = Math.max(0, displayedResources.length - ITEMS_PER_VIEW);
    setResourceStartIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevResources = () => {
    setResourceStartIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleCategories = resourceCategories.slice(categoryStartIndex, categoryStartIndex + ITEMS_PER_VIEW);
  const visibleResources = displayedResources.slice(resourceStartIndex, resourceStartIndex + ITEMS_PER_VIEW);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#F2F0F0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(115,58,25,0.08) 0%, transparent 70%)',
        zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -150,
        left: -150,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(21,57,89,0.06) 0%, transparent 70%)',
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, md: 6 } }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{ 
              display: 'inline-block',
              px: 4,
              py: 1,
              borderRadius: 50,
              background: 'rgba(191,175,143,0.3)',
              color: '#733A19',
              fontSize: '0.9rem',
              fontWeight: 600,
              mb: 3
            }}>
              Centro Educativo
            </Box>
            
            <Typography 
              variant={isMobile ? "h3" : "h2"} 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                color: '#733A19',
                mb: 2,
                lineHeight: 1.2
              }}
            >
              Portal de Conocimiento
              <Box component="span" sx={{ color: '#153959' }}> Laboral</Box>
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#5C2E14',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 400
              }}
            >
              Recursos expertos para conocer y defender tus derechos laborales en Colombia
            </Typography>

            {/* Stats */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 4,
              flexWrap: 'wrap',
              mb: 6
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#733A19' }}>
                  {allResources.length}+
                </Typography>
                <Typography variant="body2" sx={{ color: '#5C2E14' }}>
                  Recursos
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#153959' }}>
                  {resourceCategories.length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#5C2E14' }}>
                  Categorías
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#BFAF8F' }}>
                  24/7
                </Typography>
                <Typography variant="body2" sx={{ color: '#5C2E14' }}>
                  Disponible
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper
            elevation={2}
            sx={{
              mb: 8,
              p: 4,
              borderRadius: 3,
              background: 'white',
              border: '1px solid rgba(191,175,143,0.3)',
              boxShadow: '0 4px 20px rgba(115,58,25,0.08)'
            }}
          >
            <Typography variant="h5" sx={{ 
              fontWeight: 600, 
              mb: 3, 
              color: '#733A19',
              textAlign: 'center'
            }}>
              🔍 Buscar en nuestros recursos
            </Typography>
            
            <TextField
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Busca por tema: despido, contrato, pensión, liquidación..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#733A19' }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch} edge="end" size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'rgba(115,58,25,0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#733A19',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#733A19',
                  }
                }
              }}
            />
            
            {/* Quick search suggestions */}
            <Box sx={{ display: 'flex', gap: 1, mt: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Despido injustificado', 'Liquidación', 'Contrato temporal', 'Pensión', 'EPS'].map((term) => (
                <Chip
                  key={term}
                  label={term}
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSearchQuery(term);
                    setTimeout(() => handleSearch(), 100);
                  }}
                  sx={{ 
                    borderColor: 'rgba(115,58,25,0.3)',
                    color: '#733A19',
                    '&:hover': {
                      borderColor: '#733A19',
                      bgcolor: 'rgba(115,58,25,0.05)',
                    },
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* Search Results or Main Content */}
        <AnimatePresence mode="wait">
          {isSearchMode ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ mb: 8 }}>
                <Typography variant="h4" sx={{ 
                  mb: 4, 
                  fontWeight: 600, 
                  color: '#733A19',
                  textAlign: 'center'
                }}>
                  📋 Resultados de búsqueda
                </Typography>
                {error && (
                  <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>
                    {error}
                  </Alert>
                )}
                <ResourceList 
                  resources={displayedResources} 
                  loading={searching}
                  itemsPerPage={6}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={handleClearSearch}
                    sx={{ 
                      borderColor: '#733A19', 
                      color: '#733A19',
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': { 
                        borderColor: '#5C2E14', 
                        backgroundColor: 'rgba(115,58,25,0.05)'
                      }
                    }}
                  >
                    ← Volver al inicio
                  </Button>
                </Box>
              </Box>
            </motion.div>
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Horizontal Categories Navigation */}
              <Box sx={{ mb: 8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    color: '#733A19'
                  }}>
                    🎯 Explora por Categorías
                  </Typography>
                  <Button 
                    variant="text"
                    onClick={() => router.push('/portal/recursos/todos')}
                    sx={{ 
                      color: '#153959',
                      fontWeight: 600,
                      display: { xs: 'none', md: 'flex' }
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Ver todas
                  </Button>
                </Box>
                
                <Box sx={{ position: 'relative' }}>
                  {/* Navigation Arrows */}
                  {categoryStartIndex > 0 && (
                    <IconButton
                      onClick={prevCategories}
                      sx={{
                        position: 'absolute',
                        left: -20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'white',
                        boxShadow: 2,
                        zIndex: 2,
                        '&:hover': { bgcolor: '#F2F0F0' }
                      }}
                    >
                      <NavigateBeforeIcon />
                    </IconButton>
                  )}
                  
                  {categoryStartIndex + ITEMS_PER_VIEW < resourceCategories.length && (
                    <IconButton
                      onClick={nextCategories}
                      sx={{
                        position: 'absolute',
                        right: -20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'white',
                        boxShadow: 2,
                        zIndex: 2,
                        '&:hover': { bgcolor: '#F2F0F0' }
                      }}
                    >
                      <NavigateNextIcon />
                    </IconButton>
                  )}
                  
                  {/* Categories Grid */}
                  <Grid container spacing={3}>
                    {visibleCategories.map((category, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <Card
                            onClick={() => navigateToCategory(category)}
                            sx={{
                              height: '200px',
                              cursor: 'pointer',
                              borderRadius: 3,
                              border: `2px solid ${category.color}20`,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: `0 8px 25px ${category.color}20`,
                                borderColor: `${category.color}40`
                              }
                            }}
                          >
                            <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box sx={{ 
                                  fontSize: '2rem', 
                                  mr: 2,
                                  width: 50,
                                  height: 50,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '50%',
                                  bgcolor: `${category.color}15`
                                }}>
                                  {category.icon}
                                </Box>
                                <Box>
                                  <Typography variant="h6" sx={{ fontWeight: 700, color: category.color }}>
                                    {category.title}
                                  </Typography>
                                  <Chip
                                    label={`${category.count} recursos`}
                                    size="small"
                                    sx={{
                                      bgcolor: `${category.color}10`,
                                      color: category.color,
                                      fontSize: '0.7rem'
                                    }}
                                  />
                                </Box>
                              </Box>
                              
                              <Typography variant="body2" sx={{ 
                                color: '#5C2E14',
                                flex: 1,
                                lineHeight: 1.4
                              }}>
                                {category.description}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <ArrowForwardIcon sx={{ color: category.color }} />
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>

              {/* Horizontal Resources Navigation */}
              <Box sx={{ mb: 8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    color: '#733A19'
                  }}>
                    ⭐ Recursos Destacados
                  </Typography>
                  <Button 
                    variant="text"
                    onClick={() => router.push('/portal/recursos/todos')}
                    sx={{ 
                      color: '#153959',
                      fontWeight: 600,
                      display: { xs: 'none', md: 'flex' }
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Ver todos
                  </Button>
                </Box>
                
                {error && (
                  <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>
                    {error}
                  </Alert>
                )}
                
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress sx={{ color: '#733A19' }} />
                  </Box>
                ) : (
                  <Box sx={{ position: 'relative' }}>
                    {/* Navigation Arrows */}
                    {resourceStartIndex > 0 && (
                      <IconButton
                        onClick={prevResources}
                        sx={{
                          position: 'absolute',
                          left: -20,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'white',
                          boxShadow: 2,
                          zIndex: 2,
                          '&:hover': { bgcolor: '#F2F0F0' }
                        }}
                      >
                        <NavigateBeforeIcon />
                      </IconButton>
                    )}
                    
                    {resourceStartIndex + ITEMS_PER_VIEW < displayedResources.length && (
                      <IconButton
                        onClick={nextResources}
                        sx={{
                          position: 'absolute',
                          right: -20,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'white',
                          boxShadow: 2,
                          zIndex: 2,
                          '&:hover': { bgcolor: '#F2F0F0' }
                        }}
                      >
                        <NavigateNextIcon />
                      </IconButton>
                    )}
                    
                    {/* Resources Grid */}
                    <Grid container spacing={3}>
                      {visibleResources.map((resource, index) => {
                        const getCategoryColor = (category: string): string => {
                          const categoryColors: {[key: string]: string} = {
                            'Laboral': '#153959',
                            'Pensión': '#BFAF8F',
                            'Seguridad Social': '#733A19',
                            'Terminación de contrato laboral': '#153959',
                            'Trámites laborales': '#733A19',
                            'Derechos': '#733A19',
                            'Default': '#733A19'
                          };
                          return categoryColors[category] || categoryColors['Default'];
                        };
                        
                        return (
                          <Grid item xs={12} sm={6} md={4} key={resource.id}>
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              whileHover={{ y: -5 }}
                            >
                              <Card
                                onClick={() => router.push(`/portal/recurso/${resource.id}`)}
                                sx={{
                                  height: '280px',
                                  cursor: 'pointer',
                                  borderRadius: 3,
                                  border: '1px solid rgba(191,175,143,0.3)',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 8px 25px rgba(115,58,25,0.15)',
                                    borderColor: getCategoryColor(resource.category)
                                  }
                                }}
                              >
                                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Chip
                                      label={resource.category}
                                      size="small"
                                      sx={{
                                        bgcolor: `${getCategoryColor(resource.category)}15`,
                                        color: getCategoryColor(resource.category),
                                        fontWeight: 600,
                                        fontSize: '0.7rem'
                                      }}
                                    />
                                  </Box>
                                  
                                  <Typography variant="h6" sx={{ 
                                    fontWeight: 700, 
                                    mb: 2, 
                                    color: '#733A19',
                                    lineHeight: 1.3,
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2
                                  }}>
                                    {resource.title || resource.question}
                                  </Typography>
                                  
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      mb: 3,
                                      flex: 1,
                                      display: '-webkit-box',
                                      overflow: 'hidden',
                                      WebkitBoxOrient: 'vertical',
                                      WebkitLineClamp: 3,
                                      color: '#5C2E14',
                                      lineHeight: 1.4
                                    }}
                                  >
                                    {resource.content?.substring(0, 120)}
                                    {resource.content && resource.content.length > 120 ? '...' : ''}
                                  </Typography>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Button
                                      size="small"
                                      sx={{
                                        color: getCategoryColor(resource.category),
                                        fontWeight: 600,
                                        textTransform: 'none'
                                      }}
                                    >
                                      Leer más
                                    </Button>
                                    <ArrowForwardIcon sx={{ color: getCategoryColor(resource.category), fontSize: 18 }} />
                                  </Box>
                                </CardContent>
                              </Card>
                            </motion.div>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Button 
                    variant="contained"
                    size="large"
                    onClick={() => router.push('/portal/recursos/todos')}
                    sx={{ 
                      bgcolor: '#733A19',
                      color: 'white',
                      px: 6,
                      py: 2,
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      '&:hover': { 
                        bgcolor: '#5C2E14'
                      }
                    }}
                  >
                    📚 Ver todos los recursos
                  </Button>
                </Box>
              </Box>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 6,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #733A19 0%, #5C2E14 100%)',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Decorative elements */}
                  <Box sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    bgcolor: 'rgba(191,175,143,0.2)',
                    zIndex: 0
                  }} />
                  
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                      🤝 ¿Quieres contribuir?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
                      Invitamos a expertos legales y activistas a compartir conocimiento con nuestra comunidad de trabajadores
                    </Typography>
                    <Button 
                      variant="contained"
                      size="large"
                      sx={{ 
                        bgcolor: '#BFAF8F',
                        color: '#0E1013',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        '&:hover': { 
                          bgcolor: '#D0C7AF'
                        }
                      }}
                      onClick={() => router.push('/#contact-form')}
                    >
                      📬 Contáctanos
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default PortalPage; 