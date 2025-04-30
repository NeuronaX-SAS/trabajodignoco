'use client';

import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../lib/redux/slices/authSlice';
import { RootState, AppDispatch } from '../../lib/redux/store';
const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Add confirmPassword state later if needed
  // Local error and loading state removed, now using Redux state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Clear previous messages
    setSuccessMessage(null);
    // Error is cleared automatically by the slice/thunk lifecycle if a new attempt starts

    // TODO: Add confirm password validation

    console.log('Dispatching registerUser with:', { email, password });
    const resultAction = await dispatch(registerUser({ email, password }));

    if (registerUser.fulfilled.match(resultAction)) {
      // Registration successful
      console.log('Registration successful');
      setSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
      // Optionally clear form fields
      setEmail('');
      setPassword('');
      // Optionally redirect to login after a delay
      // setTimeout(() => router.push('/login'), 3000);
    } else {
      // Error is handled by the slice and displayed via useSelector
      console.error('Registration failed:', resultAction.payload || resultAction.error);
      // No need to set local error state or loading state manually
    }
  };

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
          Crear Cuenta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Display Redux error or local success message */}
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          {successMessage && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{successMessage}</Alert>}
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
            autoComplete="new-password" // Use new-password for registration
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading === 'pending'}
            helperText="Mínimo 8 caracteres"
          />
          {/* Add Confirm Password field later */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading === 'pending'}
          >
            {loading === 'pending' ? <CircularProgress size={24} /> : 'Registrarse'}
          </Button>
          {/* Add Link to Login page later */}
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;