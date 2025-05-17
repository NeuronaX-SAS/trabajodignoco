'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Box,
  SelectChangeEvent,
  Typography,
  Paper,
  Divider,
  Grid
} from '@mui/material';

interface FormValues {
  FNAME: string; // Corresponds to Mailchimp FNAME merge tag
  EMAIL: string; // Corresponds to Mailchimp EMAIL merge tag (Required)
  MMERGE2: string; // Corresponds to Mailchimp MMERGE2 merge tag (Phone)
  MMERGE7: string; // Corresponds to Mailchimp MMERGE7 merge tag (Message)
  SUPPORT_TYPE: string; // Support category
  WORKER_TYPE: string; // Type of worker
  DATA_CONSENT: boolean; // Data processing consent
}

const ContactForm: React.FC = () => {
  const router = useRouter();
  const initialValues: FormValues = {
    FNAME: '',
    EMAIL: '',
    MMERGE2: '',
    MMERGE7: '',
    SUPPORT_TYPE: '',
    WORKER_TYPE: '',
    DATA_CONSENT: false
  };

  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const legalSupportCategories = [
    { value: 'despido_injustificado', label: 'Despido Injustificado' },
    { value: 'acoso_laboral', label: 'Acoso Laboral' },
    { value: 'contrato_laboral', label: 'Contratos Laborales' },
    { value: 'afiliacion_sindical', label: 'Afiliación Sindical' },
    { value: 'seguridad_social', label: 'Seguridad Social' },
    { value: 'discriminacion', label: 'Discriminación Laboral' },
    { value: 'salario', label: 'Pago de Salarios y Prestaciones' },
    { value: 'jornada', label: 'Jornada Laboral' },
    { value: 'otro', label: 'Otro Tema Laboral' }
  ];

  const workerTypeOptions = [
    { value: 'formal', label: 'Trabajador formal (contrato)' },
    { value: 'informal', label: 'Trabajador informal' },
    { value: 'independiente', label: 'Trabajador independiente' },
    { value: 'desempleado', label: 'Desempleado' },
    { value: 'cuidado', label: 'Trabajo de cuidado no remunerado' },
    { value: 'plataforma', label: 'Trabajador de plataformas digitales' },
    { value: 'otro', label: 'Otro' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name) {
      setFormValues({
        ...formValues,
        [name]: checked
      });
    }
  };

  const validateForm = (): boolean => {
    if (!formValues.FNAME || !formValues.EMAIL || !formValues.MMERGE7) {
      setFormError('Por favor completa todos los campos requeridos');
      return false;
    }

    if (!formValues.DATA_CONSENT) {
      setFormError('Debes aceptar el tratamiento de datos para continuar');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormSubmitting(true);
    setFormError(null);
    
    // Form will submit naturally to Mailchimp
    // Just handle UI feedback
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSuccess(true);
      setFormValues(initialValues);
      
      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact-form" className="py-20 bg-[#F2F0F0] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#BFAF8F] rounded-full filter blur-3xl opacity-10 -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#BFAF8F] rounded-full filter blur-3xl opacity-10 -mr-48 -mb-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-md bg-[#BFAF8F] text-[#0E1013] text-sm font-semibold mb-4">
            Alza la voz por tus derechos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#733A19]">
            Compartir es el primer paso hacia la transformación
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Al contar tu situación laboral, no solo te estarás ayudando a ti, sino que fortaleces un movimiento colectivo 
            que busca construir un futuro laboral más justo y equitativo en Colombia.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {/* Form Column */}
            <Box sx={{ width: { xs: '100%', md: '58%' } }}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: { xs: 3, md: 5 }, 
                  border: '1px solid #BFAF8F30',
                  borderRadius: '8px'
                }}
              >
                {formSuccess ? (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-[#733A19]/10 text-[#733A19] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#733A19] mb-3">¡Mensaje Recibido!</h3>
                    <p className="text-gray-700 mb-6">Gracias por compartir tu situación. Tu experiencia es valiosa para fortalecer nuestra comunidad y luchar por condiciones laborales más justas.</p>
                    <Button
                      variant="outlined"
                      onClick={() => setFormSuccess(false)}
                      sx={{
                        borderColor: '#733A19',
                        color: '#733A19',
                        '&:hover': {
                          borderColor: '#5C2E14',
                          backgroundColor: 'rgba(115, 58, 25, 0.04)',
                        },
                      }}
                    >
                      Enviar Otro Mensaje
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    action="https://instagram.us1.list-manage.com/subscribe/post?u=c94c8f342aaef2f35a35d45d9&id=dc9cb70629&f_id=001113e1f0"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                  >
                    <Typography variant="h5" component="h3" fontWeight="bold" color="#733A19" mb={3}>
                      Cuéntanos tu situación
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <TextField
                        label="Nombre Completo *"
                        name="FNAME"
                        variant="outlined"
                        fullWidth
                        required
                        value={formValues.FNAME}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#733A19',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#733A19',
                          },
                        }}
                      />
                      
                      <TextField
                        label="Correo Electrónico *"
                        name="EMAIL"
                        type="email"
                        variant="outlined"
                        fullWidth
                        required
                        value={formValues.EMAIL}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#733A19',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#733A19',
                          },
                        }}
                      />
                      
                      <TextField
                        label="Teléfono"
                        name="MMERGE2"
                        variant="outlined"
                        fullWidth
                        value={formValues.MMERGE2}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#733A19',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#733A19',
                          },
                        }}
                      />

                      <FormControl fullWidth>
                        <InputLabel id="worker-type-label" sx={{ '&.Mui-focused': { color: '#733A19' } }}>
                          Tipo de Trabajador/a
                        </InputLabel>
                        <Select
                          labelId="worker-type-label"
                          id="worker-type"
                          name="WORKER_TYPE"
                          value={formValues.WORKER_TYPE}
                          label="Tipo de Trabajador/a"
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                              '&.Mui-focused': {
                                borderColor: '#733A19',
                              }
                            }
                          }}
                        >
                          {workerTypeOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      
                      <FormControl fullWidth sx={{ gridColumn: '1 / -1' }}>
                        <InputLabel id="support-type-label" sx={{ '&.Mui-focused': { color: '#733A19' } }}>
                          Tipo de Situación Laboral *
                        </InputLabel>
                        <Select
                          labelId="support-type-label"
                          id="support-type"
                          name="SUPPORT_TYPE"
                          value={formValues.SUPPORT_TYPE}
                          label="Tipo de Situación Laboral *"
                          required
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                              '&.Mui-focused': {
                                borderColor: '#733A19',
                              }
                            }
                          }}
                        >
                          {legalSupportCategories.map(category => (
                            <MenuItem key={category.value} value={category.value}>
                              {category.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Selecciona la categoría que mejor describe tu caso</FormHelperText>
                      </FormControl>
                    </div>
                    
                    <TextField
                      label="Describe tu situación laboral (sé específico/a) *"
                      name="MMERGE7"
                      multiline
                      rows={6}
                      variant="outlined"
                      fullWidth
                      required
                      placeholder="Cuéntanos en detalle lo que te está ocurriendo, incluyendo fechas relevantes, nombre de la empresa si aplica, y cualquier información que consideres importante."
                      value={formValues.MMERGE7}
                      onChange={handleChange}
                      sx={{
                        marginBottom: 3,
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#733A19',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#733A19',
                        },
                      }}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          name="DATA_CONSENT"
                          checked={formValues.DATA_CONSENT}
                          onChange={handleCheckboxChange}
                          sx={{
                            color: '#733A19',
                            '&.Mui-checked': {
                              color: '#733A19',
                            },
                          }}
                          required
                        />
                      }
                      label={
                        <Typography variant="body2" color="textSecondary">
                          Acepto el tratamiento de mis datos personales para recibir comunicaciones y 
                          asesoría conforme a la política de privacidad *
                        </Typography>
                      }
                      sx={{ mb: 3, alignItems: 'flex-start' }}
                    />
                    
                    {/* Hidden Mailchimp Input */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                      <input type="text" name="b_c94c8f342aaef2f35a35d45d9_dc9cb70629" tabIndex={-1} defaultValue="" />
                    </div>
                    
                    {formError && (
                      <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md mb-4">
                        {formError}
                      </div>
                    )}

                    <div className="text-center">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={formSubmitting}
                        sx={{
                          backgroundColor: '#733A19',
                          padding: '12px 30px',
                          borderRadius: '6px',
                          textTransform: 'none',
                          fontWeight: 600,
                          boxShadow: '0 4px 8px rgba(115, 58, 25, 0.2)',
                          '&:hover': {
                            backgroundColor: '#5C2E14',
                            boxShadow: '0 6px 12px rgba(115, 58, 25, 0.3)',
                          },
                        }}
                      >
                        {formSubmitting ? (
                          <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                          'Enviar mi Situación'
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </Paper>
            </Box>

            {/* Information Column */}
            <Box sx={{ width: { xs: '100%', md: '38%' } }}>
              <div className="bg-[#BFAF8F]/10 p-6 rounded-md border border-[#BFAF8F]/30 h-full">
                <h3 className="text-xl font-bold text-[#733A19] mb-4">
                  ¿Por qué es importante compartir tu experiencia?
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#733A19] text-[#F2F0F0] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0E1013]">Fuerza colectiva</h4>
                      <p className="text-gray-700 text-sm">Tu testimonio fortalece la lucha por los derechos laborales en Colombia, sumándose a otras voces para lograr un cambio significativo.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#733A19] text-[#F2F0F0] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0E1013]">Asesoría especializada</h4>
                      <p className="text-gray-700 text-sm">Recibirás orientación sobre los pasos a seguir según tu caso específico, con información clara sobre tus derechos.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#733A19] text-[#F2F0F0] flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0E1013]">Comunidad solidaria</h4>
                      <p className="text-gray-700 text-sm">Te conectarás con una red de apoyo de trabajadores que enfrentan situaciones similares, compartiendo experiencias y soluciones.</p>
                    </div>
                  </div>
                </div>

                <Divider sx={{ my: 4, borderColor: '#BFAF8F50' }} />

                <div className="mb-4">
                  <h4 className="font-bold text-[#733A19] mb-2">Tus datos están seguros</h4>
                  <p className="text-gray-700 text-sm">Tu información será tratada con confidencialidad y solo se utilizará para brindarte el apoyo que necesitas.</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#733A19] mb-2">¿Necesitas apoyo inmediato?</h4>
                  <div className="bg-[#733A19]/10 p-4 rounded-md">
                    <p className="text-[#733A19] font-medium mb-2">Línea de atención:</p>
                    <p className="font-bold text-lg">+57 300 123 4567</p>
                    <p className="text-gray-700 text-xs mt-1">Lunes a viernes de 8am a 6pm</p>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
          
          {/* Educational resources section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-[#733A19] mb-6">Recursos para trabajadores</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-white rounded-md shadow-md border border-[#BFAF8F]/20 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0 }}
              >
                <div className="h-3 bg-[#733A19]"></div>
                <div className="p-5">
                  <h4 className="font-bold text-[#0E1013] mb-3">Conoce tus derechos</h4>
                  <p className="text-gray-700 text-sm mb-4">Descarga guías básicas sobre derechos laborales fundamentales en Colombia.</p>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => router.push('/#resources')}
                    sx={{ 
                      color: '#733A19',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      '&:hover': { backgroundColor: 'rgba(115, 58, 25, 0.04)' }
                    }}
                  >
                    Descargar guías
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white rounded-md shadow-md border border-[#BFAF8F]/20 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="h-3 bg-[#733A19]"></div>
                <div className="p-5">
                  <h4 className="font-bold text-[#0E1013] mb-3">Historia sindical</h4>
                  <p className="text-gray-700 text-sm mb-4">Explora la historia del movimiento sindical colombiano y sus mayores logros.</p>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => router.push('/#news')}
                    sx={{ 
                      color: '#733A19',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      '&:hover': { backgroundColor: 'rgba(115, 58, 25, 0.04)' }
                    }}
                  >
                    Ver más
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white rounded-md shadow-md border border-[#BFAF8F]/20 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="h-3 bg-[#733A19]"></div>
                <div className="p-5">
                  <h4 className="font-bold text-[#0E1013] mb-3">Formación laboral</h4>
                  <p className="text-gray-700 text-sm mb-4">Cursos y talleres sobre autogestión, sindicalismo y defensa de derechos.</p>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => router.push('/#education')}
                    sx={{ 
                      color: '#733A19',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      '&:hover': { backgroundColor: 'rgba(115, 58, 25, 0.04)' }
                    }}
                  >
                    Explorar cursos
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

// Mailchimp Scripts
<>
  <Script src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js" strategy="lazyOnload" />
  <Script id="mc-validate-inline-script" strategy="lazyOnload">
    {`
      (function($) {
        if (typeof $ === 'undefined') return; // Ensure jQuery is loaded
        window.fnames = new Array();
        window.ftypes = new Array();
        fnames[0]='EMAIL';ftypes[0]='email';
        fnames[1]='FNAME';ftypes[1]='text';
        fnames[2]='MMERGE2';ftypes[2]='number'; // Match Mailchimp type
        fnames[7]='MMERGE7';ftypes[7]='text';
        
        // Optional: Keep Spanish validation messages if needed by mc-validate.js
        if ($.validator) {
          $.extend($.validator.messages, {
            required: "Este campo es obligatorio.",
            remote: "Por favor, rellena este campo.",
            email: "Por favor, escribe una dirección de correo válida",
            url: "Por favor, escribe una URL válida.",
            date: "Por favor, escribe una fecha válida.",
            dateISO: "Por favor, escribe una fecha (ISO) válida.",
            number: "Por favor, escribe un número entero válido.", // Keep if MMERGE2 validation needed
            digits: "Por favor, escribe sólo dígitos.",
            creditcard: "Por favor, escribe un número de tarjeta válido.",
            equalTo: "Por favor, escribe el mismo valor de nuevo.",
            accept: "Por favor, escribe un valor con una extensión aceptada.",
            maxlength: $.validator.format("Por favor, no escribas más de {0} caracteres."),
            minlength: $.validator.format("Por favor, no escribas menos de {0} caracteres."),
            rangelength: $.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
            range: $.validator.format("Por favor, escribe un valor entre {0} y {1}."),
            max: $.validator.format("Por favor, escribe un valor menor o igual a {0}."),
            min: $.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
          });
        }
        
        // Ensure mcj is defined if mc-validate needs it
        if (typeof jQuery !== 'undefined') {
           var $mcj = jQuery.noConflict(true);
        }
      }(window.jQuery)); // Pass jQuery if available
    `}
  </Script>
</>