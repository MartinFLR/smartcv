import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { CvFormShape } from '../../../shared/types/types'; // Asumimos esta es tu interfaz de datos

// --- INTERFACES AUXILIARES PARA EL CÓDIGO (Mejora la legibilidad) ---

// Define las claves genéricas para la sección de items (Experiencia, Proyectos, Educación)
type ItemSectionKey = 'experience' | 'projects' | 'education';
type ItemType = CvFormShape['experience'][number] | CvFormShape['projects'][number] | CvFormShape['education'][number];

interface ItemMap {
  title: string;
  dataKey: ItemSectionKey;
  subtitleKey: 'company' | 'subtitle' | 'institution';
  roleKey: 'role' | 'name' | 'title';
}

@Injectable({
  providedIn: 'root',
})
export class PdfService {

  // --- Propiedades y Constantes (ATS-friendly) ---
  private readonly MARGIN = 40;            // Márgenes claros y simétricos
  private readonly FONT_SIZE_NORMAL = 10;
  private readonly FONT_SIZE_TITLE = 12;
  private readonly FONT_SIZE_HEADER = 18;
  private readonly LINE_HEIGHT_NORMAL = 12; // Un poco más de espacio para la legibilidad
  private readonly SECTION_SPACING = 12;    // Espacio generoso entre secciones
  private readonly ITEM_SPACING = 15;
  private readonly BULLET_INDENT = 18;

  private doc!: jsPDF;
  private currentY = 0;
  private pageWidth = 0;
  private pageHeight = 0;
  private usableWidth = 0;

  // Mapa de secciones de items para reutilizar la lógica de dibujado.
  private readonly itemSectionsMap: ItemMap[] = [
    { title: 'EXPERIENCIA LABORAL', dataKey: 'experience', subtitleKey: 'company', roleKey: 'role' },
    { title: 'PROYECTOS RELEVANTES', dataKey: 'projects', subtitleKey: 'subtitle', roleKey: 'name' },
    { title: 'EDUCACIÓN', dataKey: 'education', subtitleKey: 'institution', roleKey: 'title' },
  ];

  /**
   * Punto de entrada para descargar el CV.
   * @param data Los datos del formulario del CV.
   */
  downloadPdf(data: CvFormShape): void {
    this.createAtsPdf(data);
  }

  // ---------------------------------------------
  // --- LÓGICA PRINCIPAL DE GENERACIÓN DEL PDF ---
  // ---------------------------------------------

  private createAtsPdf(data: CvFormShape): void {
    // 1. Inicialización de jsPDF
    this.doc = new jsPDF('p', 'pt', 'a4');
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.usableWidth = this.pageWidth - this.MARGIN * 2;
    this.currentY = this.MARGIN; // Comenzamos desde el margen superior

    // **IMPORTANTE ATS:** Usar fuentes estándar (Times, Helvetica) y tamaños consistentes.
    this.doc.setFont('times', 'normal');
    this.doc.setFontSize(this.FONT_SIZE_NORMAL);

    // 2. Dibujar las secciones en orden de importancia
    this.drawPersonalInfo(data.personalInfo);
    this.drawProfileSummary(data.personalInfo.profileSummary);
    this.drawItemSections(data);
    this.drawSkillsSection(data.skills?.[0]); // Asumimos que la primera entrada tiene todas las habilidades

    // 3. Finalización
    this.doc.save('CV_Optimizado_ATS.pdf');
  }

  // ----------------------------------
  // --- FUNCIONES AUXILIARES CLAVE ---
  // ----------------------------------

  /**
   * Chequea si queda espacio para un bloque de contenido. Si no, agrega una nueva página.
   * @param requiredHeight La altura requerida para el próximo bloque.
   */
  private checkPageBreak(requiredHeight: number): void {
    // Se añade un buffer extra para evitar cortes incómodos al final de página.
    if (this.currentY + requiredHeight > this.pageHeight - this.MARGIN - 20) {
      this.doc.addPage();
      this.currentY = this.MARGIN;
      // Reiniciar fuentes y estilos post-salto de página
      this.doc.setFont('times', 'normal');
      this.doc.setFontSize(this.FONT_SIZE_NORMAL);
    }
  }

  /**
   * Dibuja el título de una sección principal.
   * **ATS:** Títulos en mayúsculas, subrayado simple para separar.
   * @param title El título de la sección.
   */
  private drawSectionTitle(title: string): void {
    this.checkPageBreak(this.SECTION_SPACING * 2);

    this.currentY += this.SECTION_SPACING;

    this.doc.setFontSize(this.FONT_SIZE_TITLE);
    this.doc.setFont('times', 'bold');
    this.doc.text(title, this.MARGIN, this.currentY); // Sin pasar a mayúsculas si ya está definido

    this.currentY += 2;
    // Línea divisora
    this.doc.setDrawColor(209, 213, 219);
    this.doc.line(this.MARGIN, this.currentY, this.pageWidth - this.MARGIN, this.currentY);

    this.currentY += 16;
    this.doc.setFontSize(this.FONT_SIZE_NORMAL);
    this.doc.setFont('times', 'normal');
  }

  // --------------------------------------
  // --- FUNCIONES DE DIBUJADO DE SECCIÓN ---
  // --------------------------------------

  private drawPersonalInfo(info: CvFormShape['personalInfo']): void {
    const midPage = this.pageWidth / 2;

    // === Nombre ===
    if (info.name) {
      this.doc.setFontSize(this.FONT_SIZE_HEADER);
      this.doc.setFont('times', 'bold');
      this.doc.text(info.name.trim(), midPage, this.currentY, { align: 'center' });
      this.currentY += this.FONT_SIZE_HEADER + 1;
    }

    // === Rol ===
    if (info.job) {
      this.doc.setFontSize(this.FONT_SIZE_TITLE);
      this.doc.setFont('times', 'italic');
      this.doc.text(info.job.trim(), midPage, this.currentY, { align: 'center' });
      this.currentY += this.FONT_SIZE_TITLE + 2;
    }

    // === Contacto ===
    const normalizeUrl = (url: string) =>
      url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

    // Fila 1: email, phone, location (SIN LINK)
    const row1: { label: string }[] = [];
    if (info.email) row1.push({ label: info.email });
    if (info.phone) row1.push({ label: info.phone });
    if (info.location) row1.push({ label: info.location });

    // Fila 2: LinkedIn, web, GitHub (CON LINK)
    const row2: { label: string; link: string }[] = [];
    if (info.linkedin) row2.push({ label: info.linkedin, link: normalizeUrl(info.linkedin) });
    if (info.web) row2.push({ label: info.web, link: normalizeUrl(info.web) });
    if (info.github) row2.push({ label: info.github, link: normalizeUrl(info.github) });

    const colCount = 3;
    const startY = this.currentY + 3;
    const rowGap = this.FONT_SIZE_NORMAL - 1;

    this.doc.setFontSize(this.FONT_SIZE_NORMAL);
    this.doc.setFont('times', 'normal');

    // --- Render fila 1 (solo texto plano) ---
    row1.forEach((item, col) => {
      const y = startY + 0 * rowGap; // fila1
      const xCenter = colCount > 0 ? (this.pageWidth / colCount) * col + (this.pageWidth / colCount) / 2 : 0;
      const textWidth = this.doc.getTextWidth(item.label);
      const xText = xCenter - textWidth / 2;
      this.doc.setTextColor(0, 0, 0);
      this.doc.text(item.label, xText, y);
    });

    // --- Render fila 2 (links) ---
    row2.forEach((item, col) => {
      const y = startY + 1 * rowGap; // fila2
      const xCenter = colCount > 0 ? (this.pageWidth / colCount) * col + (this.pageWidth / colCount) / 2 : 0;
      const textWidth = this.doc.getTextWidth(item.label);
      const xText = xCenter - textWidth / 2;
      this.doc.setTextColor(40, 80, 160); // azul para links
      this.doc.textWithLink(item.label, xText, y, { url: item.link });
    });

    this.doc.setTextColor(0, 0, 0);
    this.currentY = startY + 2 * rowGap + this.SECTION_SPACING - 4;
  }

  /**
   * Dibuja el Resumen Profesional.
   * **ATS:** Esto es clave para los 'keywords'. Texto sin formato complicado.
   * @param summary El resumen del perfil.
   */
  private drawProfileSummary(summary: string | null): void {
    if (!summary) return;

    this.drawSectionTitle('PERFIL PROFESIONAL');

    const lines = this.doc.splitTextToSize(summary, this.usableWidth) as string[];
    const requiredHeight = lines.length * this.LINE_HEIGHT_NORMAL;

    this.checkPageBreak(requiredHeight);

    this.doc.setFont('times', 'normal');
    this.doc.setFontSize(this.FONT_SIZE_NORMAL);
    this.doc.text(lines, this.MARGIN, this.currentY);

    this.currentY += requiredHeight + 4;
  }

  /**
   * Itera sobre Experiencia, Proyectos y Educación.
   * @param data Todos los datos del CV.
   */
  private drawItemSections(data: CvFormShape): void {
    this.itemSectionsMap.forEach(section => {
      // TypeScript nos obliga a un casting seguro ya que 'data' es CvFormShape
      const items = data[section.dataKey] as ItemType[] | undefined;

      if (!items?.length) return;

      this.drawSectionTitle(section.title);

      items.forEach(item => {
        // Validación del campo principal
        const mainKey = section.roleKey as keyof ItemType;
        if (!item[mainKey]) return;

        // Estimamos altura mínima (para el encabezado del ítem)
        this.checkPageBreak(this.ITEM_SPACING + this.LINE_HEIGHT_NORMAL * 3);

        // --- 1. Título/Rol y Fechas ---
        this.doc.setFontSize(this.FONT_SIZE_NORMAL);
        this.doc.setFont('times', 'bold');
        this.doc.text(item[mainKey] as string, this.MARGIN, this.currentY);

        // Fechas (Alineado a la derecha, en cursiva)
        this.doc.setFont('times', 'italic');
        const dates = [item.dateIn, item.dateFin].filter(Boolean).join(' - ');
        this.doc.text(dates, this.pageWidth - this.MARGIN, this.currentY, { align: 'right' });
        this.currentY += this.LINE_HEIGHT_NORMAL;

        // --- 2. Subtítulo/Empresa/Institución ---
        const subKey = section.subtitleKey as keyof ItemType;
        if (item[subKey]) {
          this.doc.setFont('times', 'normal');
          this.doc.text(item[subKey] as string, this.MARGIN, this.currentY);
          this.currentY += this.LINE_HEIGHT_NORMAL;
        } else {
          this.currentY += 2; // Pequeño espacio si no hay subtítulo
        }

        // --- 3. Descripción con Viñetas (Bullets) ---
        this.doc.setFont('times', 'normal');
        // Usamos 'as any' para acceder a 'bullets' si no está en todas las uniones de ItemType
        const bulletsContent = (item as any).bullets as string | null | undefined;

        // Preparamos los bullets (limpiando y separando por nueva línea)
        const bullets = (bulletsContent || '').split('\n').filter((b: string) => b.trim());
        const bulletUsableWidth = this.usableWidth - this.BULLET_INDENT;

        bullets.forEach((b: string) => {
          // **ATS Tip:** Usar el caracter de viñeta simple '•' y texto sin formato.
          const bulletText = `• ${b.trim().replace(/^[•–-]/, '').trim()}`;
          const lines = this.doc.splitTextToSize(bulletText, bulletUsableWidth) as string[];

          this.checkPageBreak(lines.length * this.LINE_HEIGHT_NORMAL + 2);

          this.doc.text(lines, this.MARGIN + this.BULLET_INDENT, this.currentY);
          this.currentY += lines.length * this.LINE_HEIGHT_NORMAL + 2;
        });

        this.currentY += this.ITEM_SPACING;
      });

      this.currentY -= this.ITEM_SPACING; // Eliminar el último espacio extra del loop
      this.currentY += this.SECTION_SPACING;
    });
  }

  /**
   * Dibuja la sección de Habilidades Clave.
   * **ATS CRUCIAL:** Presentar las habilidades como listas de texto plano separadas por comas/barras.
   * @param skillGroup El objeto con las habilidades.
   */
  private drawSkillsSection(skillGroup: CvFormShape['skills'][number] | undefined): void {
    if (!skillGroup) return;

    this.drawSectionTitle('HABILIDADES CLAVE');

    // Función auxiliar local para dibujar una categoría de habilidad
    const printSkillCategory = (label: string, values?: string[]): void => {
      if (!values?.length) return;

      // 1. Preparamos el texto completo
      const labelText = `${label.toUpperCase()}: `;
      const fullText = labelText + values.join(' | ');

      // 2. Calculamos las líneas y la altura total
      const lines = this.doc.splitTextToSize(fullText, this.usableWidth) as string[];
      const requiredHeight = lines.length * this.LINE_HEIGHT_NORMAL;

      this.checkPageBreak(requiredHeight + 4);

      // --- AJUSTE CLAVE DE DIBUJADO DE LA PRIMERA LÍNEA ---

      const firstLine: string = lines[0];
      let currentX = this.MARGIN;

      // 3. DIBUJAR ETIQUETA EN NEGRITA
      this.doc.setFont('times', 'bold');
      this.doc.text(labelText, currentX, this.currentY);

      // Actualizar la posición X basada en el ancho del texto negrita
      const labelWidth = this.doc.getTextWidth(labelText);
      currentX += labelWidth;

      // 4. DIBUJAR EL RESTO DE LA PRIMERA LÍNEA EN NORMAL
      this.doc.setFont('times', 'normal');
      const restOfLine = firstLine.slice(labelText.length);

      if (restOfLine.trim()) {
        // Dibujamos el texto normal exactamente donde termina el texto negrita.
        this.doc.text(restOfLine, currentX, this.currentY);
      }

      // **IMPORTANTE:** Mover el cursor Y después de la primera línea dibujada.
      this.currentY += this.LINE_HEIGHT_NORMAL;

      // 5. Dibujamos las líneas restantes (si las hay)
      if (lines.length > 1) {
        const remaining: string[] = lines.slice(1);
        remaining.forEach((line: string) => {
          this.doc.text(line, this.MARGIN, this.currentY);
          this.currentY += this.LINE_HEIGHT_NORMAL;
        });
      }

      // 6. Espaciado final de categoría
      this.currentY += 4;
    };

    // ... (Llamadas a printSkillCategory se mantienen)
    if (skillGroup.skills?.length) {
      printSkillCategory('Skills Técnicas', skillGroup.skills);
    }
    if (skillGroup.languages?.length) {
      printSkillCategory('Idiomas', skillGroup.languages);
    }
    if (skillGroup.certifications?.length) {
      const certs: string[] = skillGroup.certifications.map(
        (cert: any) => `${cert.name}${cert.date ? ` (${cert.date})` : ''}`
      );
      printSkillCategory('Certificaciones', certs);
    }
    if (skillGroup.additional?.length) {
      printSkillCategory('Habilidades Adicionales', skillGroup.additional);
    }
  }
}

