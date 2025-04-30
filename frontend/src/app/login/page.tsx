'use client';

import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../lib/redux/slices/authSlice'; // Corrected path assuming slices folder
import type { RootState, AppDispatch } from '../../lib/redux/store';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Local state for inputs remains
  // const [error, setError] = useState<string | null>(null); // Replaced by Redux state
  // const [loading, setLoading] = useState(false); // Replaced by Redux state

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, isAuthenticated, token } = useSelector((state: RootState) => state.auth); // Added isAuthenticated and token

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setLoading(true); // Handled by Redux slice
    // setError(null); // Handled by Redux slice

    console.log('Dispatching loginUser with:', { email, password });
    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      // Login successful
      console.log('Login successful, redirecting...');
      // Token persistence might be handled within the slice or a subscriber
      // For now, just redirect
      router.push('/dashboard'); // Redirect to dashboard on success
    } else {
      // Error is handled by the slice and displayed via useSelector
      console.error('Login failed:', resultAction.payload || resultAction.error);
      // setError is handled by the slice, no need to set it here
    }
    // setLoading(false); // Handled by Redux slice
  };

  // Optional: Redirect if already authenticated (e.g., on page load)
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Already authenticated, redirecting...');
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{typeof error === 'string' ? error : JSON.stringify(error)}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading === 'pending'}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading === 'pending'}
          />
          {/* Add Remember me checkbox later if needed */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading === 'pending'}
          >
            {loading === 'pending' ? <CircularProgress size={24} /> : 'Ingresar'}
          </Button>
          {/* Add Forgot password / Sign up links later */}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;