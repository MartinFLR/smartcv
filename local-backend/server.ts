import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
// @ts-ignore
import { CvPayload, TailoredCvResponse } from '../shared/types/types';

// --- Configuración del servidor ---
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

// --- Gemini ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// --- Endpoint ---
app.post('/api/generate-cv', async (req: Request, res: Response) => {
  const body: CvPayload = req.body;

  if (!body?.baseCv || !body?.jobDesc) {
    return res.status(400).json({ error: 'Faltan datos (baseCv, jobDesc).' });
  }

  const { baseCv, jobDesc } = body;
  const jobTitle = baseCv.personalInfo.job || 'Puesto sin especificar';

  const prompt = buildPrompt(JSON.stringify(baseCv, null, 2), jobDesc, jobTitle);

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Limpieza del texto y parseo seguro
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let parsed: TailoredCvResponse;
    try {
      parsed = JSON.parse(cleaned);

      // --- Normalización ---
      // Experience siempre array, dateIn/dateFin opcionales
      parsed.experience = Array.isArray(parsed.experience) ? parsed.experience : [];
      parsed.experience = parsed.experience.map((e) => ({
        role: e.role ?? null,
        company: e.company ?? null,
        bullets: Array.isArray(e.bullets) ? e.bullets : [],
        dateIn: e.dateIn ?? null,
        dateFin: e.dateFin ?? null,
      }));

      // Education siempre array, dateIn/dateFin opcionales
      if (!Array.isArray(parsed.education)) {
        // Si Gemini devuelve objeto en vez de array
        parsed.education = parsed.education ? [parsed.education as any] : [];
      }
      parsed.education = parsed.education.map((e) => ({
        title: e.title ?? null,
        institution: e.institution ?? '',
        bullets: Array.isArray(e.bullets) ? e.bullets : [],
        dateIn: e.dateIn ?? null,
        dateFin: e.dateFin ?? null,
      }));

    } catch (parseError) {
      console.error('❌ Error al parsear respuesta de Gemini:', parseError);
      console.log('Texto recibido:', cleaned);
      return res.status(500).json({ error: 'La IA devolvió una respuesta no válida.' });
    }

    res.status(200).json(parsed as TailoredCvResponse);
  } catch (error) {
    console.error('❌ Error llamando a la API de Gemini:', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar la IA.' });
  }
});

// --- Prompt Builder ---
function buildPrompt(baseCv: string, jobDesc: string, jobTitle: string): string {
  return `
Actúa como un experto en reclutamiento IT y optimización de CVs para sistemas ATS (Applicant Tracking Systems).
Tu objetivo es generar un CV adaptado, altamente compatible con la siguiente oferta laboral, maximizando coincidencia con palabras clave, competencias y responsabilidades.

**Tareas principales:**
1. Analiza cuidadosamente el CV base y la descripción del puesto "${jobTitle}".
2. Optimiza el CV para maximizar la coincidencia con las keywords técnicas, competencias y responsabilidades del puesto.
3. Aumenta la relevancia y claridad del perfil profesional sin inventar experiencia no sustentada en el CV original.
4. Introduce métricas cuantificables siempre que sea posible (mejoras de rendimiento, tiempo, eficiencia, calidad, etc.).
5. Adapta habilidades y logros existentes para reflejar compatibilidad con el puesto, aunque la experiencia no sea idéntica.
6. Reescribe logros usando la fórmula Acción + Tecnología + Resultado, manteniendo un enfoque en resultados medibles.
7. Prioriza la inclusión de palabras clave exactas de la oferta laboral para asegurar que el CV pase los filtros ATS.
8. Coloca las keywords estratégicamente en el perfil profesional y en los bullets de experiencia y educación.
9. Prioriza claridad y legibilidad ATS (frases cortas, sin adornos).
10. Todo el contenido debe caber en una sola página y mantener coherencia temporal con el CV base.
11. Revisa que el resultado final sea coherente, legible y naturalmente humano, evitando repeticiones o exceso de keywords.
12. Si el CV tiene muchas experiencias, resalta las más relevantes para la oferta y resume las menos relacionadas en bullets concisos.

**Reglas estrictas:**
- Escribe en **primera persona**, tono profesional y enfocado al sector IT.
- Destaca únicamente skills, logros y tecnologías presentes en el CV que coincidan con la oferta.
- Cada bullet debe comenzar con un **verbo de acción** y expresar un **resultado o impacto**.
- Evita expresiones débiles como “ayudé” o “participé”, reemplázalas por “diseñé”, “implementé”, “optimizé”.
- Formato obligatorio: **JSON válido estricto**, sin texto adicional, markdown, negritas, emojis ni decoraciones.
- Cada bullet debe ser una **frase completa, clara y orientada a resultados**.
- Longitud máxima por bullet: 25 palabras.
- No uses formato Markdown, negritas, emojis ni texto decorativo.
- Prohibido usar "**" u otros símbolos de formato.
- Prioriza densidad semántica (cada frase debe aportar información útil y alineada con la oferta).
- Mantén consistencia en fechas y títulos según el CV original.
- Evita el uso de pronombres (“yo”, “mi”) para mantener estilo profesional conciso.

**Entrada**
---CV BASE---
${baseCv}
---FIN CV BASE---

---OFERTA LABORAL---
${jobDesc}
---FIN OFERTA LABORAL---

**Salida (solo JSON válido):**
{
  "profileSummary": "Resumen breve y optimizado del perfil profesional enfocado al puesto.",
  "job": "Título del puesto optimizado según oferta y perfil del candidato.",
  "experience": [
    {
      "role": "Título del puesto del CV base",
      "company": "Nombre de la empresa del CV base",
      "bullets": [
        "Logro relevante adaptado a la oferta.",
        "Otro logro relevante adaptado a la oferta."
      ],
      "dateIn": "Fecha de inicio del CV base",
      "dateFin": "Fecha de fin del CV base"
    }
  ],
  "projects": [
    {
      "name": "Nombre del proyecto",
      "subtitle": "Subtítulo opcional o breve descripción",
      "bullets": [
        "Logro o resultado relevante del proyecto con tecnología usada.",
        "Otro logro relevante del proyecto."
      ],
      "dateIn": "Fecha de inicio del proyecto",
      "dateFin": "Fecha de fin del proyecto"
    }
  ],
  "education": [
    {
      "title": "Título del grado",
      "institution": "Nombre de la institución",
      "bullets": [
        "Detalle relevante adaptado a la oferta."
      ],
      "dateIn": "Fecha de inicio del CV base",
      "dateFin": "Fecha de fin del CV base"
    }
  ],
  "skills": [
    {
      "skills": ["Skill1 relevante", "Skill2 relevante"],
      "languages": ["Lenguaje del CV base 1", "Lenguaje del CV base 2"],
      "certifications": [
        { "name": "Certificación A", "date": "2024" },
        { "name": "Certificación B", "date": "2023" }
      ],
      "additional": ["Metodologías, herramientas u otros"]
    }
  ]
}
`;
}

// --- Iniciar servidor ---
app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
  console.log('Asegúrate de tener GEMINI_API_KEY en tu archivo env.ts');
});
