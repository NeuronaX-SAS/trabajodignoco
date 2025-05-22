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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  InputAdornment,
  IconButton,
  Grid as MuiGrid,
  Divider,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ResourceList from '@/components/Common/ResourceList';
import { Resource, getResources, searchResources } from '@/lib/resourcesApi';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';

// Create a Grid component that satisfies TypeScript
const Grid = MuiGrid as React.ComponentType<any>;

export default function AllResourcesPage() {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      try {
        const allResources = await getResources();
        setResources(allResources);
        setFilteredResources(allResources);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(allResources.map(r => r.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error loading resources:', error);
        setError('No se pudieron cargar los recursos. Intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const applyFilters = () => {
    setSearching(true);
    
    let filtered = [...resources];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const searchTerms = searchQuery.toLowerCase().split(' ');
      filtered = filtered.filter(resource => {
        const searchableText = [
          resource.title,
          resource.question,
          resource.category,
          resource.subcategory,
          resource.content
        ].filter(Boolean).join(' ').toLowerCase();
        
        return searchTerms.some(term => searchableText.includes(term));
      });
    }
    
    setFilteredResources(filtered);
    setSearching(false);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setFilteredResources(resources);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategory]); // Auto-filter when category changes

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      applyFilters();
    }
  };

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
            <Typography color="text.primary">Todos los recursos</Typography>
          </Breadcrumbs>

          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              color: '#333',
              mb: 2
            }}
          >
            Todos los recursos educativos
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 2, maxWidth: 800 }}>
            Explora nuestra biblioteca completa de recursos sobre derechos laborales, seguridad social, 
            contratos de trabajo y más.
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Filters */}
        <Box 
          sx={{ 
            mb: 5, 
            p: 3, 
            borderRadius: 2, 
            border: '1px solid #e0e0e0',
            bgcolor: 'white'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Buscar recursos"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setSearchQuery('')} edge="end">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-select-label">Categoría</InputLabel>
                <Select
                  labelId="category-select-label"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Categoría"
                >
                  <MenuItem value="all">Todas las categorías</MenuItem>
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', sm: 'flex-end' }, width: '100%' }}>
                <Button 
                  variant="contained" 
                  onClick={applyFilters}
                  startIcon={<FilterListIcon />}
                  sx={{ 
                    bgcolor: '#153959',
                    '&:hover': {
                      bgcolor: '#0c2438'
                    },
                    flex: { xs: 1, sm: 'none' }
                  }}
                >
                  Filtrar
                </Button>
                
                <Button 
                  variant="outlined" 
                  onClick={handleClearFilters}
                  sx={{ flex: { xs: 1, sm: 'none' } }}
                >
                  Limpiar
                </Button>
              </Box>
            </Grid>
          </Grid>
          
          {/* Active filters */}
          {(selectedCategory !== 'all' || searchQuery) && (
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f0f0f0' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Filtros activos:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {selectedCategory !== 'all' && (
                  <Chip 
                    label={`Categoría: ${selectedCategory}`}
                    size="small"
                    onDelete={() => setSelectedCategory('all')}
                  />
                )}
                {searchQuery && (
                  <Chip 
                    label={`Búsqueda: ${searchQuery}`}
                    size="small"
                    onDelete={() => setSearchQuery('')}
                  />
                )}
              </Box>
            </Box>
          )}
        </Box>
        
        {/* Results */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Resultados
            </Typography>
            
            <Box>
              <Typography variant="body2" color="text.secondary">
                {filteredResources.length} {filteredResources.length === 1 ? 'recurso encontrado' : 'recursos encontrados'}
              </Typography>
            </Box>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}
          
          <ResourceList 
            resources={filteredResources} 
            loading={loading || searching}
            itemsPerPage={9}
          />
        </Box>
        
        {/* No results */}
        {!loading && !searching && filteredResources.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              No se encontraron recursos que coincidan con tu búsqueda
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Intenta con otros términos o elimina algunos filtros
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleClearFilters}
            >
              Limpiar filtros
            </Button>
          </Box>
        )}
      </Container>
    </motion.div>
  );
} 