import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
// @ts-ignore
import {CvPayload, TailoredCvResponse} from '../shared/types/types';

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
    } catch (parseError) {
      console.error('❌ Error al parsear respuesta de Gemini:', parseError);
      console.log('Texto recibido:', cleaned);
      return res.status(500).json({ error: 'La IA devolvió una respuesta no válida.' });
    }
    console.log(res.statusMessage)
    res.status(200).json(parsed as TailoredCvResponse);
  } catch (error) {
    console.error('❌ Error llamando a la API de Gemini:', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar la IA.' });
  }
});

// --- Prompt Builder ---
function buildPrompt(baseCv: string, jobDesc: string, jobTitle: string): string {
  return `
Actúa como un experto en selección de personal de TI y copywriter especializado en CVs optimizados para sistemas ATS.

Tu tarea:
1. Analizar el CV base del candidato.
2. Analizar la descripción del puesto al que aplica: "${jobTitle}".
3. Reescribir el CV para maximizar la coincidencia de palabras clave (keywords) con la oferta laboral y aumentar la probabilidad de pasar un ATS.

Reglas importantes:
- No inventes experiencia profesional que no esté en el CV base.
- Puedes destacar habilidades, tecnologías y logros relevantes a la posición, usando lo que ya existe en el CV.
- Si no tienes experiencia directa en algo requerido por la oferta, adapta logros existentes y habilidades relacionadas para mostrar compatibilidad.
- Mantén coherencia: no agregues empresas, fechas o roles que no existan en el CV.
- Reescribe los logros de experiencia en formato "Acción + Resultado Cuantificable" siempre que sea posible.
- Prioriza la relevancia de las skills: incluye principalmente aquellas que coincidan entre el CV y la oferta.
- Incluye una breve sección "education", puede ser null si no aplica.
- La respuesta debe ser **estrictamente JSON válido**, sin explicaciones ni markdown.

ENTRADA:
---CV BASE---
${baseCv}
---FIN CV BASE---

---OFERTA LABORAL---
${jobDesc}
---FIN OFERTA LABORAL---

RESPUESTA (solo JSON válido):
{
  "profileSummary": "...",
  "experience": [
    {
      "role": "Título del Puesto (del CV base)",
      "company": "Nombre de la Empresa (del CV base)",
      "bullets": [
        "Logro 1 reescrito y optimizado para la oferta.",
        "Logro 2 reescrito y optimizado para la oferta."
      ]
    }
  ],
  "education": {
    "bullets": "Texto breve o null"
  },
  "skills": ["Habilidad clave 1", "Habilidad clave 2"]
}
`;
}


// --- Iniciar servidor ---
app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
  console.log('Asegúrate de tener GEMINI_API_KEY en tu archivo .env');
});
