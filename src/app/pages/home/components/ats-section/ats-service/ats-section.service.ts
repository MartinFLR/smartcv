import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CvAtsPayload, CvAtsResponse} from '../../../../../../../shared/types/AtsTypes';
import {delay, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtsSectionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/ats';

  getAtsScore(payload: CvAtsPayload): Observable<CvAtsResponse> {
    console.log('Enviando payload a la API de ATS:', payload);

    const mockScore = Math.floor(Math.random() * (95 - 40 + 1)) + 40;
    let fitLevel: 'Low' | 'Medium' | 'High' = 'Medium';
    if (mockScore < 50) fitLevel = 'Low';
    if (mockScore >= 80) fitLevel = 'High';

    const mockResponse: CvAtsResponse = {
      text: 'Análisis completo del CV contra la descripción del puesto.',
      matchScore: mockScore,
      matchedKeywords: ['React', 'TypeScript', 'Angular', 'Tailwind CSS', 'Signals'],
      missingKeywords: ['Node.js', 'Jest', 'CI/CD', 'Azure'],
      sections: {
        summary: { content: '...', score: 85, highlights: ['Claro y conciso'], issues: [] },
        experience: { content: '...', score: mockScore - 5, highlights: ['Experiencia relevante en 3 proyectos'], issues: ['Falta cuantificar logros'] },
        education: { content: '...', score: 90, highlights: [], issues: [] },
        skills: { content: '...', score: mockScore + 10 > 100 ? 95 : mockScore + 10, highlights: ['Buena mezcla de hard y soft skills'], issues: [] },
      },
      sectionScores: {
        summary: 85,
        experience: mockScore - 5,
        education: 90,
        skills: mockScore + 10 > 100 ? 95 : mockScore + 10,
      },
      recommendations: [
        'Cuantificar los logros en la sección de experiencia (ej. "aumenté las ventas un 20%").',
        'Agregar las keywords "Node.js" y "Jest" si tenés experiencia en ellas.',
        'Mover la sección de "Skills" antes que "Educación".',
      ],
      warnings: [
        'El formato de fechas no es consistente en toda la sección de experiencia.',
      ],
      fitLevel: fitLevel,
      skillAnalysis: {
        hardSkills: ['Angular', 'React', 'TypeScript', 'Tailwind CSS', 'Signals', 'RxJS'],
        softSkills: ['Comunicación', 'Trabajo en equipo', 'Proactividad'],
      },
    };

    return of(mockResponse).pipe(delay(1500)); // Simula 1.5 seg de red
  }

}
