'use client';

export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Chip,
  Grid as MuiGrid,
  CircularProgress,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Resource, getResourceById, getRelatedResources } from '@/lib/resourcesApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Use MuiGrid directly to avoid TypeScript issues
const Grid = MuiGrid as React.ComponentType<any>;

// Split text into paragraphs
const formatText = (text?: string) => {
  if (!text) return [];
  return text.split('\r\n\r\n').filter(Boolean);
};

interface PageProps {
  params: Promise<{ resourceId: string }>;
}

export default function ResourcePage({ params }: PageProps) {
  const router = useRouter();
  const [resource, setResource] = useState<Resource | null>(null);
  const [relatedResources, setRelatedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResource = async () => {
      setLoading(true);
      try {
        const resolvedParams = await params;
        const data = await getResourceById(decodeURIComponent(resolvedParams.resourceId));
        if (data) {
          setResource(data);
          
          // Cargar recursos relacionados
          const related = await getRelatedResources(data.id, 3);
          setRelatedResources(related);
        } else {
          setError("Recurso no encontrado");
        }
      } catch (err) {
        setError("Error cargando el recurso");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadResource();
  }, [params]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !resource) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error || "Recurso no encontrado"}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/portal')}
        >
          Volver al portal
        </Button>
      </Container>
    );
  }

  // Format the content sections
  const contentParagraphs = formatText(resource.content);
  const whatToDoParagraphs = formatText(resource.whatToDo);
  const whereToParagraphs = formatText(resource.whereTo);
  const alternativesParagraphs = formatText(resource.alternatives);
  const considerationsParagraphs = formatText(resource.considerations);
  const regulationsParagraphs = formatText(resource.regulations);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box 
        sx={{ 
          bgcolor: '#f5f5f5', 
          py: 3,
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link href="/portal" passHref legacyBehavior>
              <MuiLink underline="hover" color="inherit">Portal</MuiLink>
            </Link>
            <Link href={`/portal/categoria/${encodeURIComponent(resource.category)}`} passHref legacyBehavior>
              <MuiLink underline="hover" color="inherit">{resource.category}</MuiLink>
            </Link>
            <Typography color="text.primary">Recurso</Typography>
          </Breadcrumbs>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ mb: 3 }}
          >
            Volver
          </Button>

          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              color: '#333',
              mb: 1
            }}
          >
            {resource.title || resource.question}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
            <Chip 
              label={resource.category} 
              color="primary" 
              variant="outlined" 
              size="medium"
            />
            {resource.subcategory && (
              <Chip 
                label={resource.subcategory} 
                size="medium" 
                sx={{ backgroundColor: '#f0f7ff', color: '#0057b7' }}
              />
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                mb: 4, 
                border: '1px solid #e0e0e0',
                borderRadius: 2
              }}
            >
              {contentParagraphs.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#333',
                      pb: 2,
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    Descripción
                  </Typography>
                  {contentParagraphs.map((paragraph, index) => (
                    <Typography key={index} paragraph>
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              )}

              {whatToDoParagraphs.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#333',
                      pb: 2,
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    ¿Qué hacer?
                  </Typography>
                  {whatToDoParagraphs.map((paragraph, index) => (
                    <Typography key={index} paragraph>
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              )}

              {whereToParagraphs.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#333',
                      pb: 2,
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    ¿Dónde acudir?
                  </Typography>
                  {whereToParagraphs.map((paragraph, index) => (
                    <Typography key={index} paragraph>
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              )}

              {alternativesParagraphs.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#333',
                      pb: 2,
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    Alternativas
                  </Typography>
                  {alternativesParagraphs.map((paragraph, index) => (
                    <Typography key={index} paragraph>
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {regulationsParagraphs.length > 0 && (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    mb: 4, 
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    bgcolor: '#f9f9f9'
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#333'
                    }}
                  >
                    Normativa aplicable
                  </Typography>
                  {regulationsParagraphs.map((paragraph, index) => (
                    <Typography key={index} paragraph variant="body2">
                      {paragraph}
                    </Typography>
                  ))}
                </Paper>
              )}

              {considerationsParagraphs.length > 0 && (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    mb: 4, 
                    border: '1px solid #e0e0e0',
                    borderRadius: 2
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#333'
                    }}
                  >
                    Tenga en cuenta
                  </Typography>
                  {considerationsParagraphs.map((paragraph, index) => (
                    <Typography key={index} paragraph variant="body2">
                      {paragraph}
                    </Typography>
                  ))}
                </Paper>
              )}

              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  border: '1px solid #e0e0e0',
                  borderRadius: 2
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    color: '#333'
                  }}
                >
                  Información adicional
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {resource.costs && (
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" fontWeight={500}>Tiene costo:</Typography>
                        <Typography variant="body2">{resource.costs}</Typography>
                      </Box>
                    </Grid>
                  )}

                  {resource.requiresLawyer && (
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" fontWeight={500}>Necesita abogado:</Typography>
                        <Typography variant="body2">{resource.requiresLawyer}</Typography>
                      </Box>
                    </Grid>
                  )}

                  {resource.isOnline && (
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" fontWeight={500}>Trámite en línea:</Typography>
                        <Typography variant="body2">{resource.isOnline}</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>
        
        {/* Recursos relacionados */}
        {relatedResources.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4, 
                fontWeight: 600,
                color: '#333'
              }}
            >
              Recursos relacionados
            </Typography>
            
            <Grid container spacing={3}>
              {relatedResources.map((relatedResource) => {
                // Determine color based on category
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
                
                // Determine icon based on category
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
                  <Grid item xs={12} sm={6} md={4} key={relatedResource.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card 
                        sx={{ 
                          height: '100%', 
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer',
                          borderRadius: 2,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                          }
                        }}
                        onClick={() => router.push(`/portal/recurso/${relatedResource.id}`)}
                      >
                        <Box 
                          sx={{ 
                            p: 2, 
                            display: 'flex', 
                            alignItems: 'center',
                            borderBottom: '1px solid #f0f0f0'
                          }}
                        >
                          <Box 
                            sx={{ 
                              width: 40, 
                              height: 40, 
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                              bgcolor: `${getCategoryColor(relatedResource.category)}22`
                            }}
                          >
                            {getCategoryIcon(relatedResource.category)}
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {relatedResource.category}
                          </Typography>
                        </Box>
                        
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography 
                            variant="h6" 
                            component="h3" 
                            gutterBottom
                            sx={{ 
                              fontWeight: 600, 
                              lineHeight: 1.3,
                              mb: 2
                            }}
                          >
                            {relatedResource.title || relatedResource.question}
                          </Typography>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 2,
                              display: '-webkit-box',
                              overflow: 'hidden',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 3
                            }}
                          >
                            {relatedResource.content?.substring(0, 120)}
                            {relatedResource.content && relatedResource.content.length > 120 ? '...' : ''}
                          </Typography>
                        </CardContent>
                        
                        <Box sx={{ 
                          p: 2, 
                          pt: 0,
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }}>
                          <Button 
                            size="small"
                            sx={{ 
                              color: getCategoryColor(relatedResource.category),
                              fontWeight: 600
                            }}
                          >
                            Ver recurso
                          </Button>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Container>
    </motion.div>
  );
} 