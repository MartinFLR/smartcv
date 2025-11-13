export function cleanJson<T>(raw: string): T {
  const cleaned = raw
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('❌ Error al parsear JSON:', err);
    throw new Error('Respuesta no válida del modelo');
  }
}
