'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ResourceList from '@/components/Common/ResourceList';
import { searchResources, Resource } from '@/lib/resourcesApi';
import { useSearchParams, useRouter } from 'next/navigation';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('query') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [debouncedTerm, setDebouncedTerm] = useState(initialQuery);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(!!initialQuery);

  // Debounce search term to reduce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      if (searchTerm) {
        // Update URL with search term
        const params = new URLSearchParams();
        params.set('query', searchTerm);
        router.replace(`/portal/search?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, router]);

  // Perform search when debounced term changes
  useEffect(() => {
    if (debouncedTerm) {
      const performSearch = async () => {
        setLoading(true);
        try {
          const results = await searchResources(debouncedTerm);
          setResources(results);
          setSearched(true);
        } catch (error) {
          console.error('Error searching resources:', error);
        } finally {
          setLoading(false);
        }
      };

      performSearch();
    } else if (searched) {
      // Clear results if search term was cleared and there was a previous search
      setResources([]);
    }
  }, [debouncedTerm, searched]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedTerm(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedTerm('');
    router.replace('/portal/search');
  };

  return (
    <Box sx={{ py: 6, backgroundColor: '#F9F9F9', minHeight: '100vh' }}>
      <Container>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3, color: '#153959' }}>
            Buscar recursos
          </Typography>

          <Box component="form" onSubmit={handleSearch} sx={{ mb: 5 }}>
            <TextField
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por palabra clave, tema o derecho laboral..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={clearSearch} edge="end">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  bgcolor: '#FFF',
                  '& fieldset': {
                    borderColor: 'rgba(0,0,0,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#733A19',
                  },
                }
              }}
            />
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {debouncedTerm && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6">
                  {resources.length === 0
                    ? `No se encontraron resultados para "${debouncedTerm}"`
                    : `${resources.length} resultado${resources.length !== 1 ? 's' : ''} para "${debouncedTerm}"`}
                </Typography>
              </Box>
            )}

            {resources.length > 0 && (
              <ResourceList
                resources={resources}
                itemsPerPage={6}
              />
            )}

            {!debouncedTerm && !searched && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  Ingresa términos de búsqueda para encontrar recursos
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default SearchPage; 