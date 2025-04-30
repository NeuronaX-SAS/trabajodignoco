'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert, Paper } from '@mui/material';
import axiosInstance from '../../lib/axios'; // Adjust path as needed

const ChatInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axiosInstance.post('/ai/generate', { prompt });
      setResponse(res.data.response);
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      const message = err.response?.data?.message || err.message || 'Ocurrió un error al contactar la IA.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Asistente AI (Beta)
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          label="Escribe tu consulta legal aquí..."
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading || !prompt.trim()}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Generando...' : 'Enviar Consulta'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {response && (
        <Paper elevation={2} sx={{ p: 2, mt: 2, whiteSpace: 'pre-wrap' }}>
          <Typography variant="subtitle2" gutterBottom>Respuesta:</Typography>
          <Typography variant="body2">{response}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ChatInterface;