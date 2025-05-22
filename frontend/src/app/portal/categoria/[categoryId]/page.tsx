'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Breadcrumbs,
  Link as MuiLink,
  Button,
  CircularProgress,
  Alert,
  Chip,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ResourceList from '@/components/Common/ResourceList';
import { Resource, getResourcesByCategory, ensureResourcesForAllCategories } from '@/lib/resourcesApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Icons for categories
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

// Background colors for categories
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

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      try {
        const resolvedParams = await params;
        const categoryId = decodeURIComponent(resolvedParams.categoryId);
        setCategoryName(categoryId);
        
        // Try the regular way first
        let categoryResources = await getResourcesByCategory(categoryId);
        
        // If no resources found, use the ensureResourcesForAllCategories function
        if (categoryResources.length === 0) {
          const categorizedResources = await ensureResourcesForAllCategories();
          if (categorizedResources[categoryId]) {
            categoryResources = categorizedResources[categoryId];
          }
        }
        
        setResources(categoryResources);
      } catch (error) {
        console.error('Error loading resources by category:', error);
        setError('No se pudieron cargar los recursos. Intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [params]);
  
  const categoryIcon = getCategoryIcon(categoryName);
  const categoryColor = getCategoryColor(categoryName);

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
            <Typography color="text.primary">Categoría</Typography>
          </Breadcrumbs>
          
          <IconButton
            onClick={() => router.back()}
            sx={{ mb: 2 }}
            aria-label="Volver"
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box 
              sx={{ 
                fontSize: '2.5rem', 
                mr: 2,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {categoryIcon}
            </Box>
            
            <Box>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  color: '#333'
                }}
              >
                {categoryName}
              </Typography>
              
              <Chip 
                label={`${resources.length} recursos`}
                size="small"
                sx={{ mt: 1, bgcolor: 'rgba(0,0,0,0.05)' }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : resources.length > 0 ? (
          <ResourceList 
            resources={resources} 
            loading={loading}
            itemsPerPage={9}
          />
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              No se encontraron recursos en esta categoría
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Actualmente no hay recursos disponibles para &quot;{categoryName}&quot;. 
              Si deseas contribuir con contenido educativo para esta categoría, 
              consulta las instrucciones en el README.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => router.push('/portal')}
              sx={{ 
                bgcolor: categoryColor,
                '&:hover': {
                  bgcolor: categoryColor,
                  filter: 'brightness(0.9)'
                }
              }}
            >
              Volver al Portal
            </Button>
          </Box>
        )}
      </Container>
    </motion.div>
  );
} 