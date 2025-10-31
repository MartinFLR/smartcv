import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {CvPayload, TailoredCvResponse} from './types';

// --- Configuración del servidor ---
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

// --- Gemini ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

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

    res.status(200).json(parsed);
  } catch (error) {
    console.error('❌ Error llamando a la API de Gemini:', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar la IA.' });
  }
});

// --- Prompt Builder ---
function buildPrompt(baseCv: string, jobDesc: string, jobTitle: string): string {
  return `
Actúa como un reclutador experto en selección de personal de TI y un copywriter profesional
especializado en crear CVs optimizados para sistemas ATS.

Tu tarea es analizar tres elementos:
1. El CV base del candidato.
2. El título del puesto al que aplica: "${jobTitle}".
3. La descripción de la oferta laboral.

Debes reescribir el CV base para alinearlo perfectamente con la oferta laboral.

REGLAS:
- Maximiza la coincidencia de palabras clave (keywords) entre el CV y la oferta.
- Adapta el "Resumen de Perfil" (profileSummary) para reflejar lo que busca la oferta.
- Reescribe los logros de experiencia con formato "Acción + Resultado Cuantificable".
- No inventes experiencia, habilidades o fechas que no estén en el CV base.
- La lista de "skills" debe priorizar las de la oferta que también estén en el CV base.
- Incluye también una breve sección "education" (puede ser null si no aplica).
- El formato debe ser texto plano y estrictamente JSON válido.

ENTRADA:
---CV BASE---
${baseCv}
---FIN CV BASE---

---OFERTA LABORAL---
${jobDesc}
---FIN OFERTA LABORAL---

RESPUESTA (solo devuelve JSON válido sin explicaciones, ni markdown):
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
