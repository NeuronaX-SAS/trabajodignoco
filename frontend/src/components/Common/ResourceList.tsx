'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent,
  CardMedia, 
  Typography, 
  Grid as MuiGrid, 
  Button,
  Skeleton,
  Pagination,
  Chip,
  Stack,
  Divider,
  Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Resource } from '@/lib/resourcesApi';

// Create a Grid component that satisfies TypeScript
const Grid = MuiGrid as React.ComponentType<any>;

// Function to get icon based on category
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

// Function to get random background color
const getBackgroundColor = (id: string): string => {
  const colors = [
    '#f3f0ff', '#fff0f6', '#f8f9fa', '#f4fce3', '#e3fafc', '#fff9db', '#f8f0fc'
  ];
  const hash = id.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colors[hash % colors.length];
};

interface ResourceListProps {
  resources: Resource[];
  loading?: boolean;
  itemsPerPage?: number;
}

const ResourceList: React.FC<ResourceListProps> = ({ 
  resources, 
  loading = false,
  itemsPerPage = 6
}) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResources = resources.slice(startIndex, endIndex);
  
  const handleResourceClick = (resourceId: string) => {
    router.push(`/portal/recurso/${resourceId}`);
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(itemsPerPage)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Skeleton variant="rectangular" height={140} />
              <CardContent>
                <Skeleton variant="rectangular" height={28} width="80%" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={20} width="60%" sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={16} width="90%" sx={{ mb: 0.5 }} />
                <Skeleton variant="rectangular" height={16} width="80%" sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={30} width={100} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (resources.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No se encontraron recursos disponibles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Intenta con otra búsqueda o categoría diferente
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {displayedResources.map((resource, index) => {
          const categoryIcon = getCategoryIcon(resource.category);
          const backgroundColor = getBackgroundColor(resource.id);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                  onClick={() => handleResourceClick(resource.id)}
                >
                  <Box 
                    sx={{ 
                      height: 180, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor,
                      position: 'relative',
                      overflow: 'hidden',
                      borderTopLeftRadius: 'inherit',
                      borderTopRightRadius: 'inherit'
                    }}
                  >
                    <Typography 
                      sx={{ 
                        fontSize: '4rem',
                        position: 'relative',
                        zIndex: 2,
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                      }}
                    >
                      {categoryIcon}
                    </Typography>
                    
                    {/* Decorative elements */}
                    <Box sx={{ 
                      position: 'absolute',
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      top: -60,
                      right: -40,
                      backdropFilter: 'blur(5px)'
                    }} />
                    <Box sx={{ 
                      position: 'absolute',
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      bottom: -30,
                      left: 30,
                      backdropFilter: 'blur(5px)'
                    }} />
                    
                    {/* Category badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        borderRadius: 10,
                        backgroundColor: 'rgba(255,255,255,0.85)',
                        px: 1.5,
                        py: 0.5,
                        backdropFilter: 'blur(5px)'
                      }}
                    >
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          color: 'rgba(0,0,0,0.7)',
                          textTransform: 'uppercase',
                          letterSpacing: 0.5
                        }}
                      >
                        {resource.category}
                      </Typography>
                    </Box>
                    
                    {resource.subcategory && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 52,
                          left: 16,
                          borderRadius: 10,
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          px: 1.5,
                          py: 0.5,
                          backdropFilter: 'blur(5px)'
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: '0.7rem',
                            color: 'rgba(0,0,0,0.6)'
                          }}
                        >
                          {resource.subcategory}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 700, 
                        lineHeight: 1.3,
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {resource.title || resource.question}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        lineHeight: 1.6
                      }}
                    >
                      {resource.content?.substring(0, 150)}
                      {resource.content && resource.content.length > 150 ? '...' : ''}
                    </Typography>
                  </CardContent>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    pt: 0,
                    borderTop: '1px solid rgba(0,0,0,0.03)'
                  }}>
                    <Button 
                      variant="text"
                      size="small"
                      sx={{ 
                        fontWeight: 600,
                        textTransform: 'none',
                        color: getColorByCategory(resource.category)
                      }}
                    >
                      Leer más
                    </Button>
                    
                    {resource.tags && resource.tags.length > 0 && (
                      <Chip 
                        label={resource.tags[0]} 
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          height: 24
                        }}
                      />
                    )}
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
      
      {resources.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination 
            count={Math.ceil(resources.length / itemsPerPage)} 
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '1rem',
                fontWeight: 500
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

// Helper function to get color based on category
const getColorByCategory = (category: string): string => {
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

export default ResourceList; 