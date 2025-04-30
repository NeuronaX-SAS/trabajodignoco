'use client';

import React from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/Auth/ProtectedRoute';
import { logout } from '../../lib/redux/slices/authSlice';
import { AppDispatch } from '../../lib/redux/store';
import ChatInterface from '../../components/AiAssistant/ChatInterface';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard (Protected)
        </Typography>
        <Typography paragraph>
          Bienvenido al dashboard. Solo los usuarios autenticados pueden ver esta página.
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Box>
        {/* Add dashboard content here */}
        <ChatInterface />
      </Container>
    </ProtectedRoute>
  );
};

export default DashboardPage;