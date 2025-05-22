import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function FirestoreForm() {
  const [formData, setFormData] = useState({
    FNAME: '',
    EMAIL: '',
    MMERGE2: '',
    WORKER_TYPE: 'informal',
    SUPPORT_TYPE: 'seguridad_social',
    MMERGE7: '',
    DATA_CONSENT: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dbStatus, setDbStatus] = useState('Verificando estado de Firebase...');
  
  // Verificar conexión a Firebase al cargar el componente
  useEffect(() => {
    // Verificar si db es nulo
    if (!db) {
      console.error('ERROR CRÍTICO: La instancia de Firestore es nula');
      setDbStatus('Error: No se pudo conectar a la base de datos');
      return;
    }
    
    console.log('Instancia de Firestore:', db);
    setDbStatus('Firebase inicializado correctamente');
    
    // Intentar acceder a una colección para verificar conexión
    try {
      const colRef = collection(db, 'test_connection');
      console.log('Referencia a colección test creada:', colRef);
      setDbStatus('Conexión a Firestore validada');
    } catch (error) {
      console.error('Error al crear referencia:', error);
      setDbStatus(`Error de conexión: ${error.message}`);
    }
  }, []);
  
  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario interceptado, iniciando envío a Firestore");
    
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      // Verificar si Firebase está disponible
      if (!db) {
        throw new Error('La conexión a Firebase no está disponible');
      }
      
      console.log("Intentando guardar en Firestore:", formData);
      
      // Crear el objeto de datos para Firestore
      const contactData = {
        fullName: formData.FNAME,
        email: formData.EMAIL,
        phone: formData.MMERGE2,
        workerType: formData.WORKER_TYPE,
        supportType: formData.SUPPORT_TYPE,
        situation: formData.MMERGE7,
        dataConsent: formData.DATA_CONSENT,
        createdAt: new Date().toISOString(), // Usamos una fecha en formato ISO para garantizar compatibilidad
        timestamp: serverTimestamp() // Mantenemos el serverTimestamp pero añadimos un backup
      };
      
      // Intentar guardar en Firestore
      console.log("Conectando con Firestore...");
      console.log("Referencia db:", db);
      
      // Verificación adicional de seguridad
      if (!collection || typeof collection !== 'function') {
        throw new Error('La función "collection" no está disponible');
      }
      
      try {
        // Crear referencia a la colección
        const contactsCollection = collection(db, "contact_forms");
        console.log("Referencia a colección creada:", contactsCollection);
        
        // Intentar guardar el documento
        console.log("Intentando añadir documento...");
        const docRef = await addDoc(contactsCollection, contactData);
        console.log("¡Éxito! Documento guardado con ID:", docRef.id);
        
        setSubmitSuccess(true);
        setFormData({
          FNAME: '',
          EMAIL: '',
          MMERGE2: '',
          WORKER_TYPE: 'informal',
          SUPPORT_TYPE: 'seguridad_social',
          MMERGE7: '',
          DATA_CONSENT: false
        });
      } catch (innerError) {
        console.error("Error específico al guardar documento:", innerError);
        throw innerError; // Re-lanzar para el manejador de errores general
      }
      
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      console.error("Tipo de error:", error.constructor.name);
      console.error("Código de error:", error.code);
      console.error("Mensaje de error:", error.message);
      console.error("Error completo:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      setSubmitError(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Si el formulario se envió correctamente
  if (submitSuccess) {
    return (
      <div className="p-4 bg-green-50 rounded-md">
        <h3 className="text-lg font-medium text-green-800">¡Gracias por contactarnos!</h3>
        <p className="mt-2 text-sm text-green-700">
          Hemos recibido tu información y nos pondremos en contacto contigo pronto.
        </p>
      </div>
    );
  }

  return (
    <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation3 mui-lo47nl-MuiPaper-root" style={{ "--Paper-shadow": "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)" }}>
      {/* Estado de la conexión a Firebase */}
      <div className={`text-sm p-2 ${dbStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
        Estado de Firebase: {dbStatus}
      </div>
      
      <form onSubmit={handleSubmit}>
        <h3 className="MuiTypography-root MuiTypography-h5 mui-18dv9an-MuiTypography-root">Cuéntanos tu situación</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root mui-n4bpaj-MuiFormControl-root-MuiTextField-root">
            <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined mui-hpb757-MuiFormLabel-root-MuiInputLabel-root" data-shrink="true" htmlFor="nombre-completo" id="nombre-completo-label">
              Nombre Completo *
              <span aria-hidden="true" className="MuiFormLabel-asterisk MuiInputLabel-asterisk mui-hdbwj7-MuiFormLabel-asterisk"> *</span>
            </label>
            <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl mui-c3f0x-MuiInputBase-root-MuiOutlinedInput-root">
              <input 
                aria-invalid="false" 
                id="nombre-completo" 
                required 
                className="MuiInputBase-input MuiOutlinedInput-input mui-1h10i36-MuiInputBase-input-MuiOutlinedInput-input" 
                type="text" 
                name="FNAME"
                value={formData.FNAME}
                onChange={handleChange}
              />
              <fieldset aria-hidden="true" className="MuiOutlinedInput-notchedOutline mui-1ll44ll-MuiOutlinedInput-notchedOutline">
                <legend className="mui-w1u3ce"><span>Nombre Completo * *</span></legend>
              </fieldset>
            </div>
          </div>
          
          <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root mui-n4bpaj-MuiFormControl-root-MuiTextField-root">
            <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined mui-hpb757-MuiFormLabel-root-MuiInputLabel-root" data-shrink="true" htmlFor="email" id="email-label">
              Correo Electrónico *
              <span aria-hidden="true" className="MuiFormLabel-asterisk MuiInputLabel-asterisk mui-hdbwj7-MuiFormLabel-asterisk"> *</span>
            </label>
            <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl mui-c3f0x-MuiInputBase-root-MuiOutlinedInput-root">
              <input 
                aria-invalid="false" 
                id="email" 
                required 
                className="MuiInputBase-input MuiOutlinedInput-input mui-1h10i36-MuiInputBase-input-MuiOutlinedInput-input" 
                type="email" 
                name="EMAIL"
                value={formData.EMAIL}
                onChange={handleChange}
              />
              <fieldset aria-hidden="true" className="MuiOutlinedInput-notchedOutline mui-1ll44ll-MuiOutlinedInput-notchedOutline">
                <legend className="mui-w1u3ce"><span>Correo Electrónico * *</span></legend>
              </fieldset>
            </div>
          </div>
          
          <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root mui-n4bpaj-MuiFormControl-root-MuiTextField-root">
            <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined mui-hpb757-MuiFormLabel-root-MuiInputLabel-root" data-shrink="true" htmlFor="telefono" id="telefono-label">
              Teléfono
            </label>
            <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl mui-c3f0x-MuiInputBase-root-MuiOutlinedInput-root">
              <input 
                aria-invalid="false" 
                id="telefono" 
                className="MuiInputBase-input MuiOutlinedInput-input mui-1h10i36-MuiInputBase-input-MuiOutlinedInput-input" 
                type="text" 
                name="MMERGE2"
                value={formData.MMERGE2}
                onChange={handleChange}
              />
              <fieldset aria-hidden="true" className="MuiOutlinedInput-notchedOutline mui-1ll44ll-MuiOutlinedInput-notchedOutline">
                <legend className="mui-w1u3ce"><span>Teléfono</span></legend>
              </fieldset>
            </div>
          </div>
          
          <div className="MuiFormControl-root MuiFormControl-fullWidth mui-ytlejw-MuiFormControl-root">
            <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined mui-1ds9vru-MuiFormLabel-root-MuiInputLabel-root" data-shrink="true" id="worker-type-label">
              Tipo de Trabajador/a
            </label>
            <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiSelect-root mui-a801br-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root">
              <select 
                id="worker-type" 
                className="MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input mui-ha35im-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input" 
                name="WORKER_TYPE"
                value={formData.WORKER_TYPE}
                onChange={handleChange}
              >
                <option value="informal">Trabajador informal</option>
                <option value="formal">Trabajador formal</option>
                <option value="independiente">Trabajador independiente</option>
                <option value="desempleado">Desempleado</option>
              </select>
              <fieldset aria-hidden="true" className="MuiOutlinedInput-notchedOutline mui-1ll44ll-MuiOutlinedInput-notchedOutline">
                <legend className="mui-w1u3ce"><span>Tipo de Trabajador/a</span></legend>
              </fieldset>
            </div>
          </div>
          
          <div className="MuiFormControl-root MuiFormControl-fullWidth mui-synn9f-MuiFormControl-root">
            <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined mui-1ds9vru-MuiFormLabel-root-MuiInputLabel-root" data-shrink="true" id="support-type-label">
              Tipo de Situación Laboral *
            </label>
            <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiSelect-root mui-a801br-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root">
              <select 
                id="support-type" 
                className="MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input mui-ha35im-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input" 
                name="SUPPORT_TYPE"
                required
                value={formData.SUPPORT_TYPE}
                onChange={handleChange}
              >
                <option value="seguridad_social">Seguridad Social</option>
                <option value="acoso_laboral">Acoso Laboral</option>
                <option value="despido_injusto">Despido Injusto</option>
                <option value="salarios">Salarios y Compensaciones</option>
                <option value="condiciones">Condiciones Laborales</option>
                <option value="otro">Otro</option>
              </select>
              <fieldset aria-hidden="true" className="MuiOutlinedInput-notchedOutline mui-1ll44ll-MuiOutlinedInput-notchedOutline">
                <legend className="mui-w1u3ce"><span>Tipo de Situación Laboral * *</span></legend>
              </fieldset>
            </div>
            <p className="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled mui-58zinl-MuiFormHelperText-root">
              Selecciona la categoría que mejor describe tu caso
            </p>
          </div>
        </div>
        
        <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root mui-plf0qt-MuiFormControl-root-MuiTextField-root">
          <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined mui-hpb757-MuiFormLabel-root-MuiInputLabel-root" data-shrink="true" htmlFor="situacion" id="situacion-label">
            Describe tu situación laboral (sé específico/a) *
            <span aria-hidden="true" className="MuiFormLabel-asterisk MuiInputLabel-asterisk mui-hdbwj7-MuiFormLabel-asterisk"> *</span>
          </label>
          <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-multiline mui-68jq9h-MuiInputBase-root-MuiOutlinedInput-root">
            <textarea 
              rows="6" 
              aria-invalid="false" 
              id="situacion" 
              name="MMERGE7" 
              placeholder="Cuéntanos en detalle lo que te está ocurriendo, incluyendo fechas relevantes, nombre de la empresa si aplica, y cualquier información que consideres importante." 
              required 
              className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMultiline mui-doh88j-MuiInputBase-input-MuiOutlinedInput-input" 
              style={{ height: "138px" }}
              value={formData.MMERGE7}
              onChange={handleChange}
            ></textarea>
            <fieldset aria-hidden="true" className="MuiOutlinedInput-notchedOutline mui-1ll44ll-MuiOutlinedInput-notchedOutline">
              <legend className="mui-w1u3ce"><span>Describe tu situación laboral (sé específico/a) * *</span></legend>
            </fieldset>
          </div>
        </div>
        
        <label className="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd Mui-required mui-2fm56q-MuiFormControlLabel-root">
          <span className="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium mui-1hpzj9h-MuiButtonBase-root-MuiCheckbox-root">
            <input 
              required 
              className="PrivateSwitchBase-input mui-j8yymo" 
              type="checkbox" 
              name="DATA_CONSENT"
              checked={formData.DATA_CONSENT}
              onChange={handleChange}
            />
            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mui-1umw9bq-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckBoxIcon">
              <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
            </svg>
          </span>
          <div>
            <p className="MuiTypography-root MuiTypography-body2 mui-1r0jykd-MuiTypography-root">
              Acepto el tratamiento de mis datos personales para recibir comunicaciones y asesoría conforme a la política de privacidad *
            </p>
            <span aria-hidden="true" className="MuiFormControlLabel-asterisk mui-lw8gz-MuiFormControlLabel-asterisk"> *</span>
          </div>
        </label>
        
        {submitError && (
          <div className="text-red-600 mt-2 mb-4 text-center">
            {submitError}
          </div>
        )}
        
        <div className="text-center mt-4">
          <button 
            className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary mui-17fwzki-MuiButtonBase-root-MuiButton-root" 
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Enviando...' : 'Enviar mi Situación'}
          </button>
        </div>
      </form>
    </div>
  );
} 