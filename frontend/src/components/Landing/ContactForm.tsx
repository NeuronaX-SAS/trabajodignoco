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
  SelectChangeEvent
} from '@mui/material';

interface FormValues {
  FNAME: string; // Corresponds to Mailchimp FNAME merge tag
  EMAIL: string; // Corresponds to Mailchimp EMAIL merge tag (Required)
  MMERGE2: string; // Corresponds to Mailchimp MMERGE2 merge tag (Phone)
  MMERGE7: string; // Corresponds to Mailchimp MMERGE7 merge tag (Message)
  MMERGE8: string; // New: Category of support
  termsAccepted: boolean; // New: Consent
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  termsAccepted?: string;
}

const ContactForm: React.FC = () => {
  const initialValues: FormValues = {
    FNAME: '',
    EMAIL: '',
    MMERGE2: '',
    MMERGE7: '',
    MMERGE8: '',
    termsAccepted: false
  };

  const [formValues, setFormValues] = useState<FormValues>(initialValues);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setFormValues({
        ...formValues,
        [name]: value
      });
      
    }
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
            Comienza Hoy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Contáctanos para iniciar
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Completa el formulario a continuación y un asesor se pondrá en contacto contigo para ayudarte con tus necesidades legales o resolver cualquier duda que tengas.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
            
            <form
              action="https://instagram.us1.list-manage.com/subscribe/post?u=c94c8f342aaef2f35a35d45d9&id=dc9cb70629&f_id=001113e1f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate" // Keep Mailchimp class for validation script
              target="_blank" // Opens Mailchimp confirmation in new tab
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <TextField
                  label="Nombre Completo"
                  name="FNAME"
                  variant="outlined"
                  fullWidth
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
                  label="Correo Electrónico"
                  name="EMAIL"
                  type="email"
                  required
                  variant="outlined"
                  fullWidth
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
                  label="Teléfono (opcional)"
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
                
                <FormControl fullWidth required sx={{ gridColumn: 'span 2' }}>
                  <InputLabel id="category-label">Tipo de ayuda legal</InputLabel>
                  <Select
                    labelId="category-label"
                    name="MMERGE8"
                    value={formValues.MMERGE8}
                    label="Tipo de ayuda legal"
                    onChange={handleChange}
                  >
                    <MenuItem value="">Selecciona una opción</MenuItem>
                    <MenuItem value="Despido injustificado">Despido injustificado</MenuItem>
                    <MenuItem value="Acoso laboral">Acoso laboral</MenuItem>
                    <MenuItem value="Liquidación">Liquidación</MenuItem>
                    <MenuItem value="Contratación por servicios">Contratación por servicios</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </Select>
                  <FormHelperText>Selecciona el tipo de apoyo que necesitas</FormHelperText>
                </FormControl>
              </div>
              
              <TextField
                label="Mensaje"
                name="MMERGE7"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
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
                control={<Checkbox name="termsAccepted" checked={formValues.termsAccepted} onChange={e => setFormValues({ ...formValues, termsAccepted: e.target.checked })} required />}
                label={<span>Acepto el <a href="/privacidad" target="_blank" rel="noopener noreferrer">tratamiento de datos</a></span>}
                sx={{ mb: 2 }}
              />
              
              {/* Hidden Mailchimp Input */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                <input type="text" name="b_c94c8f342aaef2f35a35d45d9_dc9cb70629" tabIndex={-1} defaultValue="" />
              </div>
              
              <div className="text-center">
                <Button
                  type="submit"
                  variant="contained"
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
                  Suscribir
                </Button>
              </div>
            </form>
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