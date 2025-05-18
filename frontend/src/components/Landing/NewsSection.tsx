'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Box, Typography, Modal, IconButton, Button, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { marked } from 'marked';

// Sample news data - in a real application, this would come from an API or CMS
const newsItems = [
  {
    id: '1',
    title: 'Cartilla: Conozca sus derechos laborales fundamentales',
    excerpt: 'Guía práctica sobre los derechos laborales más importantes que todo trabajador colombiano debe conocer para defender su dignidad en el trabajo.',
    content: `<h2>Defiende tu Dignidad: Guía Esencial de Derechos Laborales en Colombia</h2>

<p>En el complejo mundo laboral, conocer tus derechos es el primer paso para asegurar un trato justo y defender tu dignidad. En Colombia, la legislación laboral establece un marco de protección para los trabajadores que es fundamental comprender. Esta guía práctica te presentará los derechos más importantes que todo empleado colombiano debe conocer.</p>

<h3>Pilares Fundamentales de tus Derechos Laborales:</h3>

<p>La Constitución Política de Colombia y el Código Sustantivo del Trabajo son los cimientos sobre los cuales se construyen tus derechos laborales. Estos buscan garantizar un equilibrio en la relación empleado-empleador, protegiéndote de abusos y asegurando condiciones dignas.</p>

<h3>Derechos Esenciales que Debes Conocer:</h3>

<ul>
  <li>
    <strong>A un Trabajo Digno y Justo:</strong> Toda persona tiene derecho a acceder a un empleo en condiciones de dignidad, sin discriminación de ningún tipo (género, raza, religión, condición social). Esto implica un ambiente laboral respetuoso y libre de acoso.
  </li>
  <li>
    <strong>Remuneración Justa y Salario Mínimo:</strong> Tienes derecho a recibir un salario proporcional a la cantidad y calidad de tu trabajo. En Colombia, existe un salario mínimo legal que debe ser respetado.
  </li>
  <li>
    <strong>Jornada Laboral y Descansos:</strong> La ley establece una jornada laboral máxima, que actualmente se está reduciendo gradualmente. También tienes derecho a descansos diarios, semanales y a vacaciones remuneradas.
  </li>
  <li>
    <strong>Seguridad Social Integral:</strong> Es un derecho fundamental que tu empleador te afilie al sistema de seguridad social, que cubre salud, pensión y riesgos laborales. Esto te protege en caso de enfermedad, accidentes laborales, vejez o invalidez.
  </li>
  <li>
    <strong>Prestaciones Sociales:</strong> Además de tu salario, tienes derecho a recibir prestaciones sociales como la prima de servicios, las cesantías y los intereses a las cesantías.
  </li>
  <li>
    <strong>Estabilidad Laboral y Protección Contra el Despido Injustificado:</strong> Se busca protegerte contra despidos arbitrarios. Un despido debe tener una justa causa legalmente válida; de lo contrario, puedes tener derecho a una indemnización.
  </li>
  <li>
    <strong>Libertad de Asociación y Sindicalización:</strong> Tienes el derecho de asociarte libremente en sindicatos para la defensa de tus intereses laborales y negociar colectivamente las condiciones de trabajo.
  </li>
  <li>
    <strong>Irrenunciabilidad de Derechos:</strong> No puedes renunciar a los beneficios mínimos establecidos en las normas laborales. Cualquier acuerdo que pretenda desconocerlos es inválido.
  </li>
  <li>
    <strong>Primacía de la Realidad sobre las Formalidades:</strong> Lo que realmente sucede en la relación laboral prevalece sobre lo que esté escrito en un contrato si esto último va en detrimento de tus derechos.
  </li>
  <li>
    <strong>Protección Contra el Acoso Laboral:</strong> La Ley 1010 de 2006 te protege contra diversas formas de maltrato y hostigamiento en el entorno laboral, buscando garantizar un ambiente de trabajo armonioso y respetuoso.
  </li>
</ul>

<h3>¿Por Qué es Crucial Conocer tus Derechos?</h3>

<p>Entender tus derechos laborales te empodera. Te permite:</p>

<ul>
  <li><strong>Exigir condiciones justas:</strong> Desde un salario adecuado hasta un trato respetuoso.</li>
  <li><strong>Prevenir abusos:</strong> El conocimiento es tu primera línea de defensa.</li>
  <li><strong>Tomar decisiones informadas:</strong> Sobre tu contrato, tus condiciones y tu futuro laboral.</li>
  <li>
    <strong>Buscar ayuda cuando sea necesario:</strong> Si sientes que tus derechos son vulnerados, saber cuáles son te permitirá acudir a las instancias correspondientes, como el Ministerio de Trabajo o buscar asesoría legal.
  </li>
</ul>

<p>Defender tu dignidad en el trabajo comienza por estar informado. Investiga, pregunta y no dudes en hacer valer los derechos que la ley colombiana te otorga. Un trabajador informado es un trabajador respetado.</p>`,
    date: '18 May 2025',
    author: 'Redacción Trabajo Digno',
    imageUrl: '/placeholder-news-1.jpg',
    category: 'Recursos Educativos'
  },
  {
    id: '2',
    title: 'Derechos de los trabajadores en plataformas digitales',
    excerpt: 'Los trabajadores de aplicaciones como Rappi, Uber y otras plataformas digitales tienen derechos laborales que deben ser respetados. Conoce cuáles son.',
    content: `<h2>Trabajadores de Plataformas Digitales en Colombia: ¿Cuáles son tus Derechos?</h2>

<p>El auge de aplicaciones como Rappi, Uber, DiDi, Picap y otras plataformas digitales ha transformado la manera en que accedemos a servicios y, fundamentalmente, ha creado nuevas formas de trabajo. Miles de colombianos encuentran en estas plataformas una fuente de ingresos, pero surge una pregunta crucial: ¿cuáles son sus derechos laborales? Si eres uno de ellos, esta información te interesa.</p>

<h3>El Debate Central: ¿Trabajador Dependiente o Contratista Independiente?</h3>

<p>La naturaleza de la relación entre los trabajadores y estas plataformas es el epicentro del debate. Las empresas suelen argumentar que los repartidores, conductores o prestadores de servicios son "socios" o "contratistas independientes", lo que, bajo la legislación tradicional, los excluiría de muchos derechos laborales básicos. Sin embargo, cada vez más voces y análisis jurídicos señalan elementos de subordinación (control sobre horarios, tarifas, asignación de tareas, calificaciones, sanciones) que podrían configurar una relación laboral encubierta.</p>

<h3>Derechos que Deberían Ser Respetados (y por los que se Lucha):</h3>

<p>Independientemente de la figura contractual, existen derechos fundamentales y condiciones mínimas que deberían ser garantizados para asegurar la dignidad de quienes laboran a través de estas aplicaciones:</p>

<ul>
  <li>
    <strong>A una Remuneración Justa y Transparente:</strong> Esto incluye el derecho a conocer claramente cómo se calculan las tarifas, qué comisiones se deducen y a recibir un pago que permita cubrir las necesidades básicas y los costos operativos (gasolina, mantenimiento del vehículo/moto, datos móviles, etc.). Se debate la necesidad de ingresos mínimos garantizados por hora de conexión o trabajo efectivo.
  </li>
  <li>
    <strong>Seguridad Social Integral:</strong> Este es uno de los puntos más críticos. Los trabajadores de plataformas deberían tener acceso a la cobertura en salud, pensión y, crucialmente, a Riesgos Laborales (ARL), especialmente considerando los peligros a los que se exponen (accidentes de tránsito, robos, etc.). Actualmente, muchos deben asumir estos costos de forma individual, si es que pueden.
  </li>
  <li>
    <strong>Condiciones de Trabajo Seguras y Saludables:</strong> Las plataformas deberían tener un rol más activo en promover la seguridad de sus trabajadores, ofreciendo elementos de protección, seguros contra accidentes, y canales efectivos para reportar incidentes o situaciones de riesgo.
  </li>
  <li>
    <strong>Jornadas de Trabajo Razonables y Descansos:</strong> Aunque la flexibilidad es un atractivo, la presión por generar ingresos puede llevar a jornadas extenuantes. Se discute la necesidad de límites para prevenir la fatiga y proteger la salud.
  </li>
  <li>
    <strong>Protección Contra Decisiones Arbitrarias (Desactivaciones):</strong> Los trabajadores deben tener derecho a un debido proceso antes de ser desactivados o suspendidos de la plataforma, con la posibilidad de apelar y conocer las razones de dichas decisiones. La transparencia en los sistemas de calificación y sanción es fundamental.
  </li>
  <li>
    <strong>Libertad de Asociación y Negociación Colectiva:</strong> El derecho a organizarse para defender sus intereses y negociar mejores condiciones de trabajo es un pilar fundamental en cualquier relación laboral.
  </li>
  <li>
    <strong>No Discriminación y Trato Justo:</strong> Al igual que en cualquier entorno laboral, se debe garantizar un trato libre de discriminación por cualquier motivo.
  </li>
  <li>
    <strong>Transparencia Algorítmica:</strong> Es importante que los trabajadores entiendan cómo los algoritmos de la plataforma asignan tareas, fijan precios y evalúan su desempeño, para evitar sesgos o prácticas injustas.
  </li>
</ul>

<h3>Un Panorama en Evolución</h3>

<p>Es importante destacar que el marco legal para los trabajadores de plataformas digitales en Colombia y en el mundo está en constante evolución. Ya existen discusiones legislativas y pronunciamientos judiciales que buscan aclarar la naturaleza de esta relación laboral y otorgar mayores protecciones. Proyectos de ley han sido presentados buscando regular estas nuevas formas de empleo.</p>

<h3>¿Qué Puedes Hacer?</h3>

<ul>
  <li>
    <strong>Infórmate:</strong> Conoce los debates actuales, las propuestas legislativas y los pronunciamientos de las cortes.
  </li>
  <li>
    <strong>Documenta tu Actividad:</strong> Guarda registros de tus horas de conexión, ingresos, comunicaciones con la plataforma y cualquier incidente.
  </li>
  <li>
    <strong>Busca Asesoría:</strong> Si sientes que tus derechos están siendo vulnerados, considera buscar asesoría legal o acercarte a organizaciones que defienden los derechos de los trabajadores de plataformas.
  </li>
  <li>
    <strong>Participa:</strong> Si te es posible, únete a discusiones o grupos que buscan mejorar las condiciones laborales en el sector.
  </li>
</ul>

<p>El trabajo en plataformas digitales es una realidad que llegó para quedarse. Asegurar que este modelo sea sostenible y justo para quienes lo hacen posible es un desafío que involucra a trabajadores, empresas, gobierno y sociedad en general. Conocer tus derechos es el primer paso para defender tu dignidad en este nuevo entorno laboral.</p>`,
    date: '18 May 2025',
    author: 'Redacción Trabajo Digno',
    imageUrl: '/placeholder-news-2.jpg',
    category: 'Derechos Laborales'
  },
  {
    id: '3',
    title: 'Cómo organizarse colectivamente en tu lugar de trabajo',
    excerpt: 'Guía práctica para la organización colectiva de los trabajadores: cómo fortalecer lazos de solidaridad y construir poder desde la base.',
    content: `<h2>Construyendo Poder desde la Base: Guía Práctica para la Organización Colectiva de Trabajadores</h2>

<p>En un mundo laboral que a menudo puede parecer desigual, la unión hace la fuerza. La organización colectiva es una herramienta poderosa que permite a los trabajadores y trabajadoras no solo defender sus derechos, sino también mejorar sus condiciones laborales y construir un futuro más justo. Esta guía práctica te mostrará cómo puedes empezar a fortalecer lazos de solidaridad y construir poder desde la base junto a tus compañeros.</p>

<h3>¿Por Qué Organizarse? El Poder de la Unidad</h3>

<p>Individualmente, la voz de un trabajador puede ser fácilmente ignorada. Colectivamente, esa voz se convierte en un coro imposible de silenciar. Organizarse permite:</p>
<ul>
  <li><strong>Negociar en Igualdad de Condiciones:</strong> Frente al poder del empleador, la organización colectiva equilibra la balanza.</li>
  <li><strong>Mejorar Salarios y Beneficios:</strong> Históricamente, los trabajadores organizados han logrado mejores condiciones salariales y prestaciones.</li>
  <li><strong>Garantizar Condiciones de Trabajo Seguras y Dignas:</strong> La seguridad y la salud en el trabajo son preocupaciones comunes que se abordan mejor en conjunto.</li>
  <li><strong>Combatir la Discriminación y el Abuso:</strong> Un frente unido es más fuerte para denunciar y erradicar prácticas injustas.</li>
  <li><strong>Tener una Voz en las Decisiones que Afectan tu Trabajo:</strong> La participación en la toma de decisiones es fundamental para la democracia laboral.</li>
  <li><strong>Fomentar la Solidaridad y el Apoyo Mutuo:</strong> Saber que no estás solo y que cuentas con el respaldo de tus colegas es invaluable.</li>
</ul>

<h3>Pasos Clave para Empezar a Organizarte Desde la Base:</h3>

<p>La organización no siempre significa crear un sindicato formal desde el primer día (aunque puede ser un objetivo). Comienza con la construcción de relaciones y la identificación de metas comunes:</p>

<ol>
  <li>
    <strong>Habla con tus Colegas (Discretamente al Inicio):</strong>
    Comienza conversaciones informales uno a uno con compañeros de confianza. Escucha sus preocupaciones, comparte las tuyas y sondea el interés en mejorar las cosas. La discreción inicial puede ser importante dependiendo del ambiente laboral.
  </li>
  <li>
    <strong>Identifica Problemas y Objetivos Comunes:</strong>
    ¿Cuáles son los problemas que más afectan al grupo? ¿Salarios bajos, largas jornadas, falta de seguridad, trato injusto? Definir claramente los problemas y los objetivos que se quieren alcanzar unirá al grupo.
  </li>
  <li>
    <strong>Edúquense Juntos sobre sus Derechos:</strong>
    Conocer el Código Sustantivo del Trabajo, la Constitución y otras normativas laborales es fundamental. Investiguen juntos cuáles son sus derechos y las obligaciones del empleador.
  </li>
  <li>
    <strong>Construyan Confianza y Solidaridad:</strong>
    Este es el cimiento de cualquier organización. Organicen reuniones informales (fuera del trabajo si es necesario), compartan experiencias y apoyense mutuamente. La confianza es clave para superar el miedo.
  </li>
  <li>
    <strong>Formen un Comité Organizador o Grupo Núcleo:</strong>
    Un pequeño grupo de personas comprometidas puede empezar a coordinar los esfuerzos, planificar reuniones y distribuir tareas. Aseguren que sea representativo.
  </li>
  <li>
    <strong>Definan una Estructura y Reglas Básicas (Incluso Informales):</strong>
    ¿Cómo se tomarán las decisiones? ¿Cómo se comunicarán? ¿Quiénes serán los voceros si es necesario? Establecer reglas claras, aunque sean sencillas, ayuda a la cohesión.
  </li>
  <li>
    <strong>Comuniquen de Manera Efectiva e Inclusiva:</strong>
    Mantengan a todos los interesados informados. Usen canales de comunicación seguros y accesibles para todos. Asegúrense de que todas las voces sean escuchadas.
  </li>
  <li>
    <strong>Planifiquen Acciones (Comiencen con Pequeñas Victorias):</strong>
    No es necesario empezar con una huelga. Una primera acción podría ser una carta firmada por varios trabajadores solicitando una mejora específica, o una reunión con la gerencia para plantear inquietudes. Las pequeñas victorias construyen moral y demuestran el poder del colectivo.
  </li>
  <li>
    <strong>Consideren Formas Más Estructuradas (Como un Sindicato):</strong>
    A medida que el grupo crece y se consolida, pueden explorar la posibilidad de formar un sindicato, que es la forma de organización laboral con mayor reconocimiento legal y capacidad de negociación colectiva formal. Investiguen los requisitos y procesos.
  </li>
  <li>
    <strong>Busquen Apoyo Externo si es Necesario:</strong>
    Existen organizaciones, federaciones sindicales y abogados laboralistas que pueden ofrecer asesoría, capacitación y apoyo en el proceso de organización.
  </li>
</ol>

<h3>Fortaleciendo los Lazos de Solidaridad:</h3>
<ul>
  <li><strong>Escucha Activa:</strong> Presta atención genuina a las preocupaciones de tus compañeros.</li>
  <li><strong>Empatía:</strong> Intenta comprender las diferentes situaciones y perspectivas.</li>
  <li><strong>Respeto Mutuo:</strong> Incluso cuando haya desacuerdos, el respeto es fundamental.</li>
  <li><strong>Inclusión:</strong> Asegúrate de que todos se sientan parte del grupo, sin importar su cargo, género, edad u origen.</li>
  <li><strong>Celebración de los Logros:</strong> Reconozcan y celebren juntos cada paso adelante, por pequeño que sea.</li>
</ul>

<h3>Retos Comunes y Cómo Afrontarlos:</h3>
<p>Organizarse no siempre es fácil. Pueden surgir miedos a represalias, desconfianza, o intentos por parte de la empresa para desmotivar la organización. Es crucial:</p>
<ul>
  <li><strong>Actuar con Unidad:</strong> Un grupo unido es más difícil de intimidar.</li>
  <li><strong>Conocer y Ejercer el Derecho de Asociación:</strong> Es un derecho fundamental protegido por la ley.</li>
  <li><strong>Documentar Todo:</strong> Cualquier intento de represalia o práctica antisindical debe ser documentado.</li>
  <li><strong>Mantener la Moral Alta:</strong> Recordar constantemente los objetivos y el poder de la solidaridad.</li>
</ul>

<h3>El Futuro Está en sus Manos</h3>
<p>La organización colectiva de los trabajadores es un derecho y una necesidad para construir relaciones laborales más justas y equitativas. Fortalecer los lazos de solidaridad y construir poder desde la base no es una tarea sencilla, pero sus frutos –dignidad, respeto y mejores condiciones para todos– hacen que el esfuerzo valga la pena. ¡El poder de cambiar las cosas reside en su unidad!</p>`,
    date: '18 May 2025',
    author: 'Invitado: Sindicalista',
    imageUrl: '/placeholder-news-3.jpg',
    category: 'Organización'
  }
];

const categories = ['Todos', ...Array.from(new Set(newsItems.map(item => item.category)))];
const POSTS_PER_PAGE = 6;

const NewsSection: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof newsItems[0] | null>(null);
  const [category, setCategory] = useState('Todos');
  const [page, setPage] = useState(1);

  const filtered = category === 'Todos' ? newsItems : newsItems.filter(item => item.category === category);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleOpen = (item: typeof newsItems[0]) => {
    setSelected(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };
  const handleContactClick = () => {
    const contactFormElement = document.getElementById('contact-form');
    if (contactFormElement) {
      contactFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleCategory = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };
  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <section id="news" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#BFAF8F]/30 rounded-full filter blur-2xl opacity-20 -ml-32 -mt-32"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-md bg-[#BFAF8F]/30 text-[#733A19] text-sm font-semibold mb-4">
            Noticias y Recursos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0E1013]">
            Educación para la acción
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nuestra biblioteca de recursos educativos y noticias está diseñada para empoderar a los trabajadores
            con conocimientos prácticos sobre sus derechos y herramientas para la acción colectiva.
          </p>
        </motion.div>
        {/* Category Filter */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 6 }}>
          {categories.map(cat => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={cat === category ? 'primary' : 'default'}
              onClick={() => handleCategory(cat)}
              sx={{ fontWeight: 600, fontSize: 16, px: 2, bgcolor: cat === category ? '#733A19' : '#F2F0F0', color: cat === category ? 'white' : '#733A19', '&:hover': { bgcolor: '#BFAF8F' } }}
            />
          ))}
        </Box>
        {/* Blog Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
          {paginated.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box
                tabIndex={0}
                role="button"
                aria-label={`Leer artículo: ${item.title}`}
                onClick={() => handleOpen(item)}
                onKeyPress={e => { if (e.key === 'Enter') handleOpen(item); }}
                sx={{
                  cursor: 'pointer',
                  background: 'white',
                  borderRadius: 3,
                  boxShadow: 2,
                  border: '1px solid #BFAF8F40',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 420,
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: 6 }
                }}
              >
                <Box sx={{ height: 180, width: '100%', position: 'relative', overflow: 'hidden', background: '#eee' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <Box sx={{ position: 'absolute', top: 0, left: 0, bgcolor: '#733A19', color: 'white', px: 2, py: 0.5, fontWeight: 700, fontSize: 13, borderBottomRightRadius: 8 }}>
                    {item.category}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>{item.date} {item.author && <>· {item.author}</>}</Typography>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#0E1013' }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>{item.excerpt}</Typography>
                  <Button variant="text" sx={{ color: '#733A19', alignSelf: 'flex-start', fontWeight: 600 }} onClick={e => { e.stopPropagation(); handleOpen(item); }}>
                    Leer más
                  </Button>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 6 }}>
            <Button variant="outlined" onClick={handlePrev} disabled={page === 1} sx={{ fontWeight: 600 }}>
              Anterior
            </Button>
            <Typography variant="body1" sx={{ mx: 2 }}>{page} / {totalPages}</Typography>
            <Button variant="outlined" onClick={handleNext} disabled={page === totalPages} sx={{ fontWeight: 600 }}>
              Siguiente
            </Button>
          </Box>
        )}
        {/* Modal for full article */}
        <Modal open={open} onClose={handleClose} aria-labelledby="blog-modal-title" aria-describedby="blog-modal-content">
          <Box sx={{ maxWidth: 600, bgcolor: 'white', mx: 'auto', my: 8, borderRadius: 3, boxShadow: 24, p: 4, outline: 'none', position: 'relative' }}>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 12, right: 12 }} aria-label="Cerrar">
              <CloseIcon />
            </IconButton>
            {selected && (
              <>
                <Box sx={{ height: 220, width: '100%', mb: 2, borderRadius: 2, overflow: 'hidden', background: '#eee' }}>
                  <img
                    src={selected.imageUrl}
                    alt={selected.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>{selected.date} {selected.author && <>· {selected.author}</>}</Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#0E1013' }}>{selected.title}</Typography>
                <Box sx={{ mb: 3 }}>
                  <div dangerouslySetInnerHTML={{ __html: marked.parse(selected.content) }} />
                </Box>
              </>
            )}
          </Box>
        </Modal>
        {/* CTA to publish in the blog */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ background: '#733A19', color: 'white', fontWeight: 600, px: 5, py: 2, borderRadius: 2, fontSize: 18, '&:hover': { background: '#5C2E14' } }}
            onClick={handleContactClick}
          >
            ¿Quieres publicar en nuestro blog? Contáctanos
          </Button>
        </Box>
      </div>
    </section>
  );
};

export default NewsSection; 