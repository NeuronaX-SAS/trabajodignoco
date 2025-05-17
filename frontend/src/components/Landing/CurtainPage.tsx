import React from 'react';
import { Container, Box, Typography, TextField, Button, Link } from '@mui/material';

const CurtainPage: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  return (
    <Container
      maxWidth={false} // Use full width
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#1a237e', // Deep blue/purple base
        color: 'white',
        textAlign: 'center',
        py: 4, // Add some vertical padding
      }}
    >
      {/* Close Button */}
      {onClose && (
        <Button onClick={onClose} sx={{ position: 'absolute', top: 24, right: 24, color: 'white', fontWeight: 'bold', fontSize: 20, zIndex: 10 }}>X</Button>
      )}
      <Box sx={{ maxWidth: 'md', mx: 'auto' }}> {/* Center content */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Tu Voz, Tu Poder: Defendemos Tus Derechos Laborales en Colombia
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Somos una plataforma naciente comprometida con la dignidad y la justicia en el trabajo para todos los colombianos y colombianas. Creemos firmemente que la unión y la información son claves para transformar nuestras realidades laborales. Este es un espacio seguro para alzar tu voz.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Tu experiencia es fundamental. Al compartir tu situación, no solo das un paso hacia la solución, sino que fortaleces un movimiento colectivo que busca construir un futuro laboral más justo y equitativo en Colombia. ¡No estás solo/a!
        </Typography>

        <Box
          component="form"
          action="https://instagram.us1.list-manage.com/subscribe/post?u=c94c8f342aaef2f35a35d45d9&id=dc9cb70629&f_id=001113e1f0"
          method="post"
          target="_blank"
          noValidate
          autoComplete="off"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2, // Spacing between form elements
            bgcolor: 'rgba(255, 255, 255, 0.1)', // Slightly lighter background for form area
            p: 3, // Padding inside the form area
            borderRadius: 2, // Rounded corners
            mb: 4, // Margin below the form
          }}
          onSubmit={e => { e.preventDefault(); if (onClose) onClose(); }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Comparte tu contacto para iniciar el camino hacia la defensa de tus derechos.
          </Typography>
          <TextField
            label="Nombre"
            variant="filled"
            required
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }, name: 'FNAME' }}
            sx={{ '& .MuiFilledInput-root': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}
          />
          <TextField
            label="Correo"
            variant="filled"
            type="email"
            required
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }, name: 'EMAIL' }}
             sx={{ '& .MuiFilledInput-root': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}
          />
          <TextField
            label="Teléfono"
            variant="filled"
            type="tel"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }, name: 'MMERGE2' }}
             sx={{ '& .MuiFilledInput-root': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}
          />
          <TextField
            label="Alza tu voz: Describe tu situación laboral."
            variant="filled"
            multiline
            rows={4}
            required
            helperText="Tu relato es confidencial y será revisado por nuestro equipo para buscar caminos de acción y apoyo."
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }, name: 'MMERGE7' }}
            FormHelperTextProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
             sx={{ '& .MuiFilledInput-root': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}
          />
          <Button
            variant="contained"
            type="submit" // Ensure button submits the form
            sx={{
              mt: 2,
              bgcolor: '#ff9800', // Vibrant accent color (e.g., orange)
              '&:hover': {
                bgcolor: '#f57c00', // Darker shade on hover
              },
              color: 'black', // Ensure text is readable on accent color
              fontWeight: 'bold'
            }}
          >
            Enviar Mensaje
          </Button>
          {/* Mailchimp hidden bot field */}
          <input type="hidden" name="b_c94c8f342aaef2f35a35d45d9_dc9cb70629" tabIndex={-1} value="" />
        </Box>
      </Box>

      <Box sx={{ position: 'absolute', bottom: 16, width: '100%', textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Desarrollado por{' '}
          <Link href="https://neuronax.net/" target="_blank" rel="noopener noreferrer" sx={{ color: 'white', textDecoration: 'underline' }}>
            NeuronaX S.A.S
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default CurtainPage;