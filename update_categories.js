const fs = require('fs');
const path = require('path');

// Ruta al archivo resources.json
const resourcesPath = path.join('frontend', 'public', 'educontent', 'resources.json');

// Categorías principales
const mainCategories = {
  'Derechos Laborales': 'Derechos',
  'Contratos de Trabajo': 'Laboral',
  'Seguridad Social': 'Seguridad Social',
  'Terminación de Contratos': 'Terminación de contrato laboral',
  'Pensión': 'Pensión',
  'Trámites': 'Trámites laborales'
};

// Función para clasificar recursos en la categoría adecuada
function categorizeResource(resource) {
  const title = resource.title || '';
  const question = resource.question || '';
  const content = resource.content || '';
  const subcategory = resource.subcategory || '';
  const originalCategory = resource.category || '';
  
  // Palabras clave para cada categoría
  const keywords = {
    'Derechos': ['derecho', 'derechos', 'constitucional', 'garantía', 'protección', 'constitución'],
    'Laboral': ['contrato', 'trabajo', 'laboral', 'empleo', 'trabajador', 'empleador', 'vinculación'],
    'Seguridad Social': ['salud', 'seguridad social', 'eps', 'incapacidad', 'enfermedad', 'médico', 'clínica', 'hospital'],
    'Terminación de contrato laboral': ['despido', 'terminación', 'finalización', 'indemnización', 'liquidación', 'finalizar'],
    'Pensión': ['pensión', 'jubilación', 'vejez', 'pensional', 'pensionado', 'colpensiones', 'fondo de pensiones'],
    'Trámites laborales': ['trámite', 'procedimiento', 'solicitud', 'formulario', 'gestión', 'documento', 'certificado']
  };

  // Verificar coincidencias exactas primero
  if (originalCategory === 'Derechos' || originalCategory.includes('Derecho')) {
    return 'Derechos';
  }
  
  if (originalCategory === 'Pensión' || subcategory === 'Pensión' || originalCategory.includes('Pensión') || subcategory.includes('Pensión')) {
    return 'Pensión';
  }
  
  if (originalCategory === 'Seguridad Social' || originalCategory.includes('Seguridad') || originalCategory.includes('Salud')) {
    return 'Seguridad Social';
  }
  
  if (originalCategory === 'Terminación de contrato laboral' || 
      originalCategory.includes('Terminación') || 
      subcategory === 'Terminación de contrato laboral' || 
      subcategory.includes('Terminación')) {
    return 'Terminación de contrato laboral';
  }
  
  if (originalCategory.includes('Trámites') || subcategory.includes('Trámites') || 
      originalCategory.includes('Tramite') || subcategory.includes('Tramite')) {
    return 'Trámites laborales';
  }

  // Buscar palabras clave en el contenido
  const allText = (title + ' ' + question + ' ' + content + ' ' + subcategory).toLowerCase();
  
  for (const [category, keywordList] of Object.entries(keywords)) {
    for (const keyword of keywordList) {
      if (allText.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  // Por defecto, si no hay coincidencias, asignar a Laboral
  return 'Laboral';
}

// Leer el archivo resources.json
try {
  const data = fs.readFileSync(resourcesPath, 'utf8');
  const resourcesData = JSON.parse(data);
  
  if (!resourcesData.resources || !Array.isArray(resourcesData.resources)) {
    console.error('El formato del archivo resources.json no es válido');
    process.exit(1);
  }
  
  // Actualizar las categorías
  const updatedResources = resourcesData.resources.map(resource => {
    const newCategory = categorizeResource(resource);
    return {
      ...resource,
      category: newCategory
    };
  });
  
  // Contar recursos por categoría
  const categoryCounts = {};
  updatedResources.forEach(resource => {
    const category = resource.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });
  
  // Guardar el archivo actualizado
  const updatedData = {
    resources: updatedResources
  };
  
  fs.writeFileSync(resourcesPath, JSON.stringify(updatedData, null, 2), 'utf8');
  
  console.log('✅ Archivo resources.json actualizado exitosamente');
  console.log('\nDistribución de recursos por categoría:');
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`- ${category}: ${count} recursos`);
    });
  
} catch (error) {
  console.error('Error al procesar el archivo:', error);
} 