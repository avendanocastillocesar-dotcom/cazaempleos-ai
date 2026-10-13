export interface SampleProfilePreset {
  id: string;
  name: string;
  headline: string;
  email: string;
  targetRole: string;
  experienceYears: string;
  cvText: string;
}

export const SAMPLE_PROFILES: SampleProfilePreset[] = [
  {
    id: 'fullstack-dev',
    name: 'Carlos Mendoza',
    headline: 'Desarrollador Full Stack Senior | React, Node.js, TypeScript & AWS',
    email: 'carlos.mendoza.dev@gmail.com',
    targetRole: 'Desarrollador Full Stack / Tech Lead',
    experienceYears: '6 años',
    cvText: `CARLOS MENDOZA
Email: carlos.mendoza.dev@gmail.com | Ubicación: Ciudad de México / Remoto LATAM | LinkedIn: /in/carlosmendozadev

PERFIL PROFESIONAL:
Ingeniero de Software Full Stack con 6+ años de experiencia construyendo aplicaciones web escalables, arquitecturas de microservicios y sistemas SaaS de alto rendimiento. Especializado en React, TypeScript, Node.js, bases de datos PostgreSQL/MongoDB y despliegues en la nube con AWS y Docker. Historial probado de optimizar tiempos de carga en un 40% y liderar squads ágiles multidisciplinarios.

HABILIDADES TÉCNICAS:
- Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, Vue.js
- Backend: Node.js, Express, NestJS, Python (FastAPI), RESTful APIs, GraphQL
- Bases de Datos & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, Lambda, EC2), Docker, CI/CD GitHub Actions
- Metodologías: Scrum, TDD, Clean Architecture, Optimización ATS

EXPERIENCIA LABORAL:
Senior Full Stack Developer | FinTech Soluciones Global (2022 - Presente)
- Lideré el desarrollo del módulo transaccional para pagos B2B procesando más de $2M USD mensuales con disponibilidad del 99.9%.
- Rediseñé la interfaz del cliente en React y TypeScript reduciendo la tasa de rebote en un 28% y mejorando los tiempos de respuesta API en un 35%.
- Implementé pipelines de CI/CD automatizados reduciendo los ciclos de despliegue de 3 días a 40 minutos.

Full Stack Web Developer | InnovaTech Digital (2019 - 2022)
- Desarrollé más de 12 aplicaciones web para clientes corporativos usando React y Node.js.
- Diseñé esquemas relacionales en PostgreSQL optimizando consultas complejas y tiempos de reporte.
- Colaboré estrechamente con equipos de producto y diseño UX/UI para cumplir plazos de entrega estrictos.

EDUCACIÓN:
- Licenciatura en Ingeniería en Sistemas Computacionales | Instituto Politécnico Nacional (2015 - 2019)
- Certificación AWS Certified Solutions Architect Associate (2023)

IDIOMAS:
- Español: Nativo | Inglés: Profesional Avanzado (C1)`,
  },
  {
    id: 'sales-lead',
    name: 'Mariana Gómez',
    headline: 'Líder Comercial B2B & Account Executive Senior | Expansión de Cuentas y Cierre Enterprise',
    email: 'mariana.gomez.ventas@outlook.com',
    targetRole: 'Gerente de Ventas / Account Executive B2B',
    experienceYears: '7 años',
    cvText: `MARIANA GÓMEZ
Email: mariana.gomez.ventas@outlook.com | Ubicación: Bogotá, Colombia / Remoto | LinkedIn: /in/marianagomezsales

RESUMEN PROFESIONAL:
Líder Comercial B2B y Account Executive con más de 7 años de trayectoria en prospección, negociación y cierre de contratos Enterprise en sectores SaaS, tecnología y servicios corporativos. Superación constante de cuota de ventas (promedio 125% anual). Experta en metodologías MEDDPIC, SPIN Selling y gestión de pipelines complejos en HubSpot y Salesforce.

COMPETENCIAS CLAVE:
- Estrategias de prospección Outbound e Inbound, Venta Consultiva B2B
- Cierre de clientes corporativos Enterprise, Negociación C-Level (CEOs, CFOs, CTOs)
- CRM & Herramientas: Salesforce, HubSpot, Apollo.io, LinkedIn Sales Navigator
- Liderazgo de equipos comerciales y entrenamiento en técnicas de objeciones

EXPERIENCIA PROFESIONAL:
Senior Enterprise Account Executive | CloudScale SaaS LATAM (2021 - Presente)
- Generé más de $1.8M USD en Nuevo Negocio Anual (ARR) en los mercados de Colombia, México y Perú.
- Aumenté el tamaño promedio del ticket de venta en un 42% mediante empaquetamiento de soluciones modulares.
- Logré una tasa de conversión de demostración a cierre del 34%, la más alta del equipo comercial regional.

Key Account Manager B2B | Consultores Empresariales Andinos (2018 - 2021)
- Administré cartera de 45 cuentas corporativas asegurando una tasa de retención del 94% y crecimiento de Up-selling del 22%.
- Implementé programa de prospección en frío que generó 15 reuniones cualificadas semanales para el equipo.

EDUCACIÓN:
- Profesional en Administración de Empresas y Negocios Internacionales | Universidad de los Andes (2014 - 2018)
- Diplomado en Negociación Estratégica y Venta Consultiva (2022)

IDIOMAS:
- Español: Nativo | Inglés: Fluido de Negocios (B2+)`,
  },
  {
    id: 'growth-marketing',
    name: 'Andrea Morales',
    headline: 'Especialista en Marketing Digital, Growth & Performance | ROI, Paid Media y SEO',
    email: 'andrea.morales.growth@gmail.com',
    targetRole: 'Growth Marketing Manager / Especialista en Performance',
    experienceYears: '5 años',
    cvText: `ANDREA MORALES
Email: andrea.morales.growth@gmail.com | Ubicación: Santiago, Chile / Remoto | Portafolio: andreamorales.marketing

PERFIL:
Growth Marketer orientada a datos con 5 años gestionando campañas de adquisición pagada (Google Ads, Meta Ads, TikTok), funnels de conversión y SEO para startups en etapa de escalamiento y e-commerce. Experta en optimización del CAC (Costo de Adquisición de Clientes), maximización del ROAS (Return On Ad Spend) y retención.

HABILIDADES:
- Performance Marketing: Meta Ads Manager, Google Ads (Search, Performance Max, Display), TikTok Ads
- Analítica: Google Analytics 4 (GA4), Mixpanel, Google Tag Manager, Looker Studio
- Growth & Funnels: A/B Testing, Optimización de Landing Pages (CRO), Automatización de Email Marketing (Klaviyo, Brevo)
- SEO técnico y estrategia de contenidos orientada a palabras clave con intención comercial

EXPERIENCIA LABORAL:
Growth Marketing Lead | E-Commerce Brands Hub (2022 - Presente)
- Administré un presupuesto publicitario mensual de $45,000 USD logrando un ROAS promedio de 4.2x.
- Reduje el Costo por Adquisición (CAC) en un 27% a través de optimizaciones en landing pages y pruebas multivariables A/B.
- Diseñé flujos de retención y recompra vía email marketing que aumentaron el LTV (Customer Lifetime Value) en un 19%.

Digital Marketing Specialist | Agencia MediaPower (2020 - 2022)
- Planifiqué y ejecuté campañas multicanal para más de 10 marcas del sector retail y educación online.
- Logré un crecimiento del 150% en tráfico orgánico en 10 meses mediante auditorías SEO y marketing de contenidos.

EDUCACIÓN:
- Licenciatura en Publicidad y Mercadeo Digital | Universidad de Santiago (2016 - 2020)
- Certificación Oficial Google Ads Search & GA4

IDIOMAS:
- Español: Nativo | Inglés: B2`,
  },
  {
    id: 'data-analyst',
    name: 'Diego Rivas',
    headline: 'Analista de Datos & Business Intelligence | SQL, Power BI, Python & Storytelling',
    email: 'diego.rivas.analytics@gmail.com',
    targetRole: 'Data Analyst / Business Intelligence Specialist',
    experienceYears: '4 años',
    cvText: `DIEGO RIVAS
Email: diego.rivas.analytics@gmail.com | Ubicación: Buenos Aires, Argentina / Remoto

PERFIL PROFESIONAL:
Analista de Datos con 4 años de experiencia transformando datos desestructurados en tableros interactivos de decisión para gerencias de operaciones y finanzas. Dominio avanzado de SQL para consultas complejas, modelado en Power BI / Tableau y scripts de automatización ETL en Python (Pandas, NumPy). Pasión por descubrir oportunidades de ahorro de costos y eficiencia operativa.

HERRAMIENTAS:
- SQL (PostgreSQL, MySQL, BigQuery), Python (Pandas, NumPy, Seaborn)
- Visualización: Power BI (DAX avanzado, Power Query), Tableau, Looker
- ETL y automatización: Airflow básico, Excel avanzado (Power Pivot, Macros VBA)
- Habilidades blandas: Storytelling con datos, comunicación con stakeholders de negocio

EXPERIENCIA:
Business Intelligence Analyst | RetailCorp LATAM (2022 - Presente)
- Creé la suite de dashboards ejecutivos en Power BI utilizada por directores para monitorear $12M USD en inventario.
- Detecté ineficiencias en la cadena de distribución mediante análisis de regresión en Python, ahorrando $80,000 USD anuales.
- Reduje el tiempo de reportería manual semanal de 14 horas a un proceso automatizado de 5 minutos en BigQuery.

Data Analyst Junior | Finanzas Seguras (2020 - 2022)
- Mantenimiento y limpieza de bases de datos de clientes con SQL y Python.
- Elaboración de informes mensuales de riesgo crediticio y métricas de retención de clientes.

EDUCACIÓN:
- Licenciatura en Economía y Estadística | Universidad de Buenos Aires (2016 - 2020)
- Certificación Microsoft Certified: Power BI Data Analyst Associate (PL-300)

IDIOMAS:
- Español: Nativo | Inglés: Intermedio (B1+)`,
  },
];
