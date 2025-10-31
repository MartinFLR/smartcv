import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import {CvFormShape} from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class PdfService {

  downloadPdf(data:CvFormShape): void {
    this.createAtsPdf(data);
  }

  private createAtsPdf(data: CvFormShape): void {
    const doc = new jsPDF('p', 'pt', 'a4');
    const margin = 40;
    let currentY = margin;
    const pageWidth = doc.internal.pageSize.getWidth();
    const usableWidth = pageWidth - (margin * 2);
    const midPage = pageWidth / 2; // Para centrar

    doc.setFont('times', 'normal');

    // --- 1. Encabezado Personal (Corregido con text-center) ---
    if(data.personalInfo.name) {
      doc.setFontSize(18);
      doc.setFont('times', 'bold');
      doc.text(data.personalInfo.name, midPage, currentY, { align: 'center' });
      currentY += 20;
    }

    if (data.personalInfo.job) {
      doc.setFontSize(12);
      doc.setFont('times', 'italic');
      doc.text(data.personalInfo.job, midPage, currentY, { align: 'center' });
      currentY += 20;
    }

    doc.setFontSize(10);
    doc.setFont('times', 'normal');
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.linkedin
    ].filter(Boolean).join(' | ');
    if (contactInfo) {
      doc.text(contactInfo, midPage, currentY, { align: 'center' });
      currentY += 30; // Más espacio después del header
    }

    // --- Función Helper para Títulos de Sección (con border-b) ---
    const drawSectionTitle = (title: string) => {
      doc.setFontSize(12);
      doc.setFont('times', 'bold');
      doc.text(title, margin, currentY);
      currentY += 14; // Espacio para el texto
      doc.setDrawColor(209, 213, 219); // Gris de Tailwind (border-gray-300)
      doc.line(margin, currentY, pageWidth - margin, currentY); // Dibuja la línea
      currentY += 20; // Espacio post-línea (equivale a mb-[15pt])
    };

    // --- 2. Perfil Profesional (Corregido con Título de Sección) ---
    if(data.personalInfo.profileSummary) {
      drawSectionTitle('Perfil Profesional');
      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      const summaryLines = doc.splitTextToSize(data.personalInfo.profileSummary, usableWidth);
      doc.text(summaryLines, margin, currentY);
      currentY += (summaryLines.length * 12) + 15;
    }

    // --- 3. Experiencia Laboral (Corregido con Layout y Título de Sección) ---
    if(data.experience?.length > 0 && data.experience.some(e => e.role)) {
      drawSectionTitle('Experiencia Laboral');

      data.experience.forEach((exp) => {
        if (!exp.role) return;

        doc.setFont('times', 'bold');
        doc.setFontSize(10);
        // Rol (Izquierda)
        doc.text(exp.role, margin, currentY);

        doc.setFont('times', 'italic');
        // Fecha (Derecha)
        const dateRange = [exp.dateIn, exp.dateFin].filter(Boolean).join(' - ');
        doc.text(dateRange, pageWidth - margin, currentY, { align: 'right' });
        currentY += 14;

        // Compañía (Izquierda, Itálica)
        doc.setFont('times', 'italic');
        doc.text(exp.company || '', margin, currentY);
        currentY += 14;

        // Bullets
        doc.setFont('times', 'normal');
        const bullets = (exp.bullets || '').split('\n').filter((b: string) => b.trim().length > 0);
        bullets.forEach((bullet: string) => {
          // Lógica robusta para asegurar que el bullet se vea
          let bulletText = bullet.trim().replace(/^-/, '').trim();
          bulletText = `\u2022 ${bulletText}`; // \u2022 es el caracter '•'

          const bulletLines = doc.splitTextToSize(bulletText, usableWidth - 10); // Indentado
          doc.text(bulletLines, margin + 10, currentY);
          currentY += (bulletLines.length * 12) + 4; // Espacio entre bullets
        });
        currentY += 10; // Espacio entre experiencias
      });
    }

    // --- 4. Educación (Corregido con Layout y Título de Sección) ---
    if(data.education?.length > 0 && data.education.some(e => e.title)) {
      drawSectionTitle('Educación');

      data.education.forEach((edu) => {
        if (!edu.title) return;

        doc.setFont('times', 'bold');
        doc.setFontSize(10);
        // Título (Izquierda)
        doc.text(edu.title, margin, currentY);

        doc.setFont('times', 'italic');
        // Fecha (Derecha)
        const dateRange = [edu.dateIn, edu.dateFin].filter(Boolean).join(' - ');
        doc.text(dateRange, pageWidth - margin, currentY, { align: 'right' });
        currentY += 14;

        // Institución (Izquierda, Itálica)
        doc.setFont('times', 'italic');
        doc.text(edu.institution || '', margin, currentY);
        currentY += 14;

        // Bullets de Educación
        if (edu.bullets) {
          doc.setFont('times', 'normal');
          const bullets = (edu.bullets || '').split('\n').filter((b: string) => b.trim().length > 0);
          bullets.forEach((bullet: string) => {
            let bulletText = bullet.trim().replace(/^-/, '').trim();
            bulletText = `\u2022 ${bulletText}`;

            const bulletLines = doc.splitTextToSize(bulletText, usableWidth - 10);
            doc.text(bulletLines, margin + 10, currentY);
            currentY += (bulletLines.length * 12) + 4;
          });
        }
        currentY += 10; // Espacio entre educaciones
      });
    }

    // --- 5. Habilidades (Corregido con Título de Sección) ---
    if(data.skills && data.skills.length > 0) {
      drawSectionTitle('Habilidades');
      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      const skillsText = doc.splitTextToSize((data.skills || []).join(' | '), usableWidth);
      doc.text(skillsText, margin, currentY);
    }

    doc.save('CV_Optimizado_ATS.pdf');
  }

}
