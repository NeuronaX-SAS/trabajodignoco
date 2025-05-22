const fs = require('fs');
const path = require('path');

// Directorio donde se encuentran los archivos
const dirPath = 'frontend/public/educontent/Legal questions and what to do';

// Función para extraer información de un archivo
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    // Objeto para almacenar la información estructurada
    let resourceData = {
      id: fileName.replace('.txt', ''),
      title: '',
      category: 'Laboral',
      subcategory: '',
      question: '',
      content: '',
      whatToDo: '',
      whereTo: '',
      alternatives: '',
      considerations: '',
      regulations: '',
      costs: '',
      requiresLawyer: '',
      isOnline: ''
    };
    
    // Encontrar categorías entre paréntesis
    const categoryMatch = content.match(/\(([^)]+)\)/);
    if (categoryMatch) {
      const categories = categoryMatch[1].split(';').map(cat => cat.trim());
      resourceData.category = categories[0] || 'Laboral';
      resourceData.subcategory = categories.slice(1).join(', ');
    }
    
    // Buscar la pregunta principal
    const questionMatch = content.match(/¿[^?]+\?/);
    if (questionMatch) {
      resourceData.question = questionMatch[0].trim();
      resourceData.title = resourceData.question;
    } else {
      // Si no hay pregunta, usar el nombre del archivo como título
      resourceData.title = fileName.replace('.txt', '').replace(/^[¿​]+|[?​]+$/g, '');
    }
    
    // Extraer el contenido introductorio (ejemplos)
    const contentParts = content.split('¿Qué hacer?');
    if (contentParts.length > 1) {
      // El contenido es todo antes de "¿Qué hacer?" pero después de la pregunta
      let introContent = contentParts[0];
      if (resourceData.question) {
        introContent = introContent.split(resourceData.question)[1] || introContent;
      }
      resourceData.content = introContent.trim();
    }
    
    // Extraer "¿Qué hacer?"
    const whatToDoMatch = content.match(/¿Qué hacer\?([^¿]+)/);
    if (whatToDoMatch) {
      resourceData.whatToDo = whatToDoMatch[1].trim();
    }
    
    // Extraer "¿Dónde acudir?"
    const whereToMatch = content.match(/¿Dónde acudir\?([^¿]+)(?=Tenga en cuenta|Alternativas|Normativa|$)/s);
    if (whereToMatch) {
      resourceData.whereTo = whereToMatch[1].trim();
    }
    
    // Extraer "Alternativas"
    const alternativesMatch = content.match(/Alternativas([^¿]+)(?=Tenga en cuenta|Normativa|$)/s);
    if (alternativesMatch) {
      resourceData.alternatives = alternativesMatch[1].trim();
    }
    
    // Extraer "Tenga en cuenta"
    const considerationsMatch = content.match(/Tenga en cuenta\.\.\.([^¿]+)(?=Normativa|$)/s);
    if (considerationsMatch) {
      resourceData.considerations = considerationsMatch[1].trim();
    }
    
    // Extraer "Normativa"
    const regulationsMatch = content.match(/Normativa([^¿]+)(?=¿Dónde acudir\?|Tenga en cuenta|Alternativas|$)/s);
    if (regulationsMatch) {
      resourceData.regulations = regulationsMatch[1].trim();
    }
    
    // Extraer "¿Tiene costo?"
    const costMatch = content.match(/¿Tiene costo\?:\s*([^.]+)/);
    if (costMatch) {
      resourceData.costs = costMatch[1].trim();
    }
    
    // Extraer "¿Necesita abogado?"
    const lawyerMatch = content.match(/¿Necesita abogado\?:\s*([^.]+)/);
    if (lawyerMatch) {
      resourceData.requiresLawyer = lawyerMatch[1].trim();
    }
    
    // Extraer "¿Trámite en línea?"
    const onlineMatch = content.match(/¿Trámite en línea\?:\s*([^.]+)/);
    if (onlineMatch) {
      resourceData.isOnline = onlineMatch[1].trim();
    }
    
    return resourceData;
  } catch (error) {
    console.error(`Error procesando archivo ${filePath}: ${error.message}`);
    return null;
  }
}

// Función principal para leer todos los archivos y generar el JSON
function generateResourcesJson() {
  try {
    // Leer archivos en el directorio
    const files = fs.readdirSync(dirPath);
    const textFiles = files.filter(file => file.endsWith('.txt'));
    
    // Procesar cada archivo
    const resources = [];
    textFiles.forEach(file => {
      const filePath = path.join(dirPath, file);
      const resourceData = processFile(filePath);
      if (resourceData) {
        resources.push(resourceData);
      }
    });
    
    // Crear el objeto JSON final
    const jsonData = {
      resources: resources
    };
    
    // Escribir el archivo JSON
    fs.writeFileSync('frontend/public/educontent/resources.json', JSON.stringify(jsonData, null, 2));
    console.log(`Se ha generado el archivo resources.json con ${resources.length} recursos.`);
  } catch (error) {
    console.error(`Error generando resources.json: ${error.message}`);
  }
}

// Ejecutar la función principal
generateResourcesJson(); 