# Portal Educativo de Derechos Laborales

Este proyecto es un portal educativo que brinda información sobre derechos laborales, diseñado para proporcionar recursos accesibles y estructurados para trabajadores.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- **Frontend**: Aplicación Next.js que sirve como interfaz para los usuarios
- **Backend**: API para manejar la autenticación y otras funcionalidades

## Cómo Agregar Nuevos Recursos Educativos

El portal utiliza un sistema de procesamiento automático para convertir archivos de texto plano en recursos estructurados en formato JSON. A continuación se detalla el proceso para agregar nuevos recursos:

### 1. Crear un Nuevo Archivo de Texto

1. Crea un nuevo archivo de texto (.txt) en la carpeta `frontend/public/educontent/Legal questions and what to do/`
2. Nombra el archivo con el título del recurso (por ejemplo, `¿Cómo solicitar una licencia?.txt`)

### 2. Formato del Contenido

Sigue esta estructura en el archivo de texto:

```
(Categoría; Subcategoría opcional)

¿Pregunta principal?

Contenido introductorio con ejemplos concretos del tema.

¿Qué hacer?
Instrucciones paso a paso sobre qué hacer en esta situación.

¿Dónde acudir?
Entidades o lugares donde la persona puede buscar ayuda.

Alternativas
Opciones alternativas o diferentes caminos que puede tomar.

Tenga en cuenta...
Consideraciones importantes que la persona debe conocer.

Normativa
Marco legal aplicable a este tema.

¿Tiene costo?: Sí/No/Variable
¿Necesita abogado?: Sí/No/Recomendable
¿Trámite en línea?: Sí/No/Parcialmente
```

### 3. Regenerar el archivo resources.json

Después de agregar o modificar los archivos de texto, debes ejecutar el script de procesamiento:

```bash
node process_legal_files.js
```

Este script:
- Lee todos los archivos .txt de la carpeta
- Extrae la información estructurada
- Genera un archivo `resources.json` en `frontend/public/educontent/`

### 4. Verificar el Portal

Una vez regenerado el archivo JSON:

1. Inicia la aplicación (`npm run dev`)
2. Verifica que los nuevos recursos aparezcan en el portal
3. Comprueba que se muestren correctamente en las secciones de categorías y búsqueda

### Ejemplo de un Buen Recurso

```
(Laboral; Licencias)

¿Cómo puedo solicitar una licencia por luto?

María perdió recientemente a su padre y necesita ausentarse del trabajo para asistir al funeral y realizar los trámites correspondientes. No sabe cuántos días puede tomar ni cómo solicitarlos.

¿Qué hacer?
1) Informe inmediatamente a su empleador sobre el fallecimiento del familiar.
2) Presente los documentos que acrediten el fallecimiento y el parentesco.
3) Solicite por escrito la licencia, indicando la fecha del fallecimiento.

¿Dónde acudir?
DEPARTAMENTO DE RECURSOS HUMANOS
MINISTERIO DEL TRABAJO

Tenga en cuenta...
La licencia por luto es de 5 días hábiles, independientemente del tipo de contrato.
Aplica para el fallecimiento de cónyuge, compañero permanente o familiar hasta el segundo grado de consanguinidad, primero de afinidad y primero civil.

Normativa
• Ley 1280 de 2009
• Artículo 57 del Código Sustantivo del Trabajo

¿Tiene costo?: No
¿Necesita abogado?: No
¿Trámite en línea?: No
```

### Recomendaciones Adicionales

- **Categorías**: Utiliza categorías consistentes para facilitar la navegación
- **Contenido**: Mantén el lenguaje claro y directo
- **Ejemplos**: Incluye ejemplos concretos para facilitar la comprensión
- **Actualizaciones**: Revisa periódicamente la información para mantenerla actualizada

## Ejecutar el Proyecto

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador. 