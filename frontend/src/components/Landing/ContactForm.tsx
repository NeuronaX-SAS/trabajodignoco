'use client';

import React, { useState } from 'react';
import Script from 'next/script';
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
  Typography
} from '@mui/material';

interface FormValues {
  FNAME: string; // Corresponds to Mailchimp FNAME merge tag
  EMAIL: string; // Corresponds to Mailchimp EMAIL merge tag (Required)
  MMERGE2: string; // Corresponds to Mailchimp MMERGE2 merge tag (Phone)
  MMERGE7: string; // Corresponds to Mailchimp MMERGE7 merge tag (Message)
  SUPPORT_TYPE: string; // Support category
  DATA_CONSENT: boolean; // Data processing consent
}

const ContactForm: React.FC = () => {
  const initialValues: FormValues = {
    FNAME: '',
    EMAIL: '',
    MMERGE2: '',
    MMERGE7: '',
    SUPPORT_TYPE: '',
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
    { value: 'otro', label: 'Otro Tema Laboral' }
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
    <section id="contact-form" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FBE0D8] rounded-full filter blur-3xl opacity-30 -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FBE0D8] rounded-full filter blur-3xl opacity-30 -mr-48 -mb-48"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#FBE0D8] text-[#DE735B] text-sm font-semibold mb-4">
            Solicita Apoyo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            ¿Necesitas Asesoría Legal Laboral?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Tu experiencia es fundamental. Al compartir tu situación, no solo das un paso hacia la solución, sino que 
            fortaleces un movimiento colectivo que busca construir un futuro laboral más justo y equitativo en Colombia.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
            {formSuccess ? (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">¡Mensaje Enviado!</h3>
                <p className="text-gray-600 mb-6">Gracias por contactarnos. Un miembro de nuestro equipo se pondrá en contacto contigo pronto.</p>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setFormSuccess(false)}
                  sx={{
                    borderColor: '#DE735B',
                    color: '#DE735B',
                    '&:hover': {
                      borderColor: '#C35D45',
                      backgroundColor: 'rgba(222, 115, 91, 0.1)',
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
                          borderColor: '#DE735B',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#DE735B',
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
                          borderColor: '#DE735B',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#DE735B',
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
                          borderColor: '#DE735B',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#DE735B',
                      },
                    }}
                  />
                  
                  <FormControl fullWidth>
                    <InputLabel id="support-type-label" sx={{ '&.Mui-focused': { color: '#DE735B' } }}>
                      Tipo de Apoyo Legal
                    </InputLabel>
                    <Select
                      labelId="support-type-label"
                      id="support-type"
                      name="SUPPORT_TYPE"
                      value={formValues.SUPPORT_TYPE}
                      label="Tipo de Apoyo Legal"
                      onChange={handleChange}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          '&.Mui-focused': {
                            borderColor: '#DE735B',
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
                  label="Describe tu situación laboral *"
                  name="MMERGE7"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  required
                  value={formValues.MMERGE7}
                  onChange={handleChange}
                  sx={{
                    marginBottom: 3,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#DE735B',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#DE735B',
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
                        color: '#DE735B',
                        '&.Mui-checked': {
                          color: '#DE735B',
                        },
                      }}
                      required
                    />
                  }
                  label={
                    <Typography variant="body2" color="textSecondary">
                      Acepto el tratamiento de mis datos personales para recibir comunicaciones y 
                      asesoría legal conforme a la política de privacidad *
                    </Typography>
                  }
                  sx={{ mb: 3, alignItems: 'flex-start' }}
                />
                
                {/* Hidden Mailchimp Input */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                  <input type="text" name="b_c94c8f342aaef2f35a35d45d9_dc9cb70629" tabIndex={-1} defaultValue="" />
                </div>
                
                {formError && (
                  <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {formError}
                  </div>
                )}

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={formSubmitting}
                    sx={{
                      backgroundColor: '#DE735B',
                      padding: '12px 30px',
                      borderRadius: '28px',
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: '0 8px 16px rgba(222, 115, 91, 0.15)',
                      '&:hover': {
                        backgroundColor: '#C35D45',
                        boxShadow: '0 12px 20px rgba(222, 115, 91, 0.2)',
                      },
                    }}
                  >
                    {formSubmitting ? (
                      <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                      'Enviar Solicitud'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
          
          {/* Additional Contact Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Correo Electrónico',
                content: 'contacto@trabajodigno.co',
                icon: '📧'
              },
              {
                title: 'Horario de Atención',
                content: 'Lunes a Viernes, 8am - 6pm',
                icon: '⏱️'
              },
              {
                title: 'Soporte prioritario',
                content: '+57 300 123 4567',
                icon: '📱'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#FBE0D8] flex items-center justify-center text-xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </motion.div>
            ))}
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