import { Injectable, inject } from '@angular/core';
import { PdfGeneratorStrategy } from '../pdf-strategy.interface';
import { CvForm } from '@smartcv/types';
import jsPDF from 'jspdf';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class CreativePdfStrategy implements PdfGeneratorStrategy {
  private readonly transloco = inject(TranslocoService);

  private readonly MARGIN = 40;
  // Using Helvetica (sans-serif)
  private readonly FONT = 'helvetica';

  private doc!: jsPDF;
  private currentY = 0;
  private pageWidth = 0;
  private pageHeight = 0;
  private usableWidth = 0;

  private checkPageBreak(height: number) {
    if (this.currentY + height > this.pageHeight - this.MARGIN) {
      this.doc.addPage();
      this.currentY = this.MARGIN;

      // Re-draw Left Sidebar Background on new page
      this.doc.setFillColor(248, 250, 252); // Slate 50
      this.doc.rect(0, 0, this.pageWidth * 0.4, this.pageHeight, 'F');

      return true;
    }
    return false;
  }

  generatePdf(data: CvForm): void {
    this.doc = new jsPDF('p', 'pt', 'a4');
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.usableWidth = this.pageWidth - this.MARGIN * 2;
    this.currentY = this.MARGIN;

    // Header Background
    this.doc.setFillColor(30, 41, 59); // Slate 800
    this.doc.rect(0, 0, this.pageWidth, 120, 'F');

    this.currentY = 40;

    // Name
    if (data.personalInfo.name) {
      this.doc.setFont(this.FONT, 'bold');
      this.doc.setFontSize(24);
      this.doc.setTextColor(255, 255, 255);
      this.doc.text(data.personalInfo.name.toUpperCase(), this.pageWidth / 2, this.currentY, {
        align: 'center',
      });
      this.currentY += 25;
    }

    // Job
    if (data.personalInfo.job) {
      this.doc.setFont(this.FONT, 'normal');
      this.doc.setFontSize(14);
      this.doc.setTextColor(203, 213, 225); // Slate 300
      this.doc.text(data.personalInfo.job, this.pageWidth / 2, this.currentY, { align: 'center' });
      this.currentY += 30;
    }

    // Decorative Line
    this.doc.setDrawColor(45, 212, 191); // Teal 400
    this.doc.setLineWidth(3);
    this.doc.line(this.pageWidth / 2 - 30, this.currentY, this.pageWidth / 2 + 30, this.currentY);

    this.currentY = 140; // Start content below header

    // Columns
    const leftColWidth = (this.pageWidth - this.MARGIN * 2) * 0.35;
    const rightColWidth = (this.pageWidth - this.MARGIN * 2) * 0.6;
    const colGap = (this.pageWidth - this.MARGIN * 2) * 0.05;

    const leftX = this.MARGIN;
    const rightX = this.MARGIN + leftColWidth + colGap;

    // Draw First Page Sidebar Background (Partial)
    this.doc.setFillColor(248, 250, 252); // Slate 50
    this.doc.rect(0, 120, this.pageWidth * 0.4, this.pageHeight - 120, 'F');

    // Capture starting Y for both columns
    const startY = this.currentY;

    // --- LEFT COLUMN RENDER ---
    this.currentY = startY;

    // Photo
    const personalInfo = data.personalInfo as CvForm['personalInfo'];
    if (personalInfo.photo) {
      const photoSize = 80;
      const photoX = leftX + (leftColWidth - photoSize) / 2;

      // No page break check needed for photo (it's at top)
      try {
        this.doc.addImage(personalInfo.photo, photoX, this.currentY, photoSize, photoSize);

        this.doc.setDrawColor(255, 255, 255);
        this.doc.setLineWidth(3);
        this.doc.rect(photoX, this.currentY, photoSize, photoSize, 'S');

        this.doc.setDrawColor(20, 184, 166);
        this.doc.setLineWidth(1);
        this.doc.rect(photoX - 2, this.currentY - 2, photoSize + 4, photoSize + 4, 'S');

        this.currentY += photoSize + 25;
      } catch (e) {
        console.error('Error adding photo to PDF', e);
      }
    }

    this.drawContactInfo(data.personalInfo, leftX, leftColWidth);
    this.currentY += 20;
    this.drawSkills(data.skills?.[0], leftX, leftColWidth);

    // --- RIGHT COLUMN RENDER ---
    // Reset Y to start again for right column, but we must track pagination carefully.
    // JS PDF is sequential. We cannot easily jump back to page 1 for the right column if the left column spanned multiple pages.
    // HOWEVER, standard CVs usually fit or flow naturally. Multicolumn PDF generation is tricky.
    // A simple approach for this strategy:
    // We will render the Right Column content. If it triggers a page break, we must handle the sidebar background logic.

    // Reset to top for Right Column
    this.currentY = startY;
    // But if we are on a new page from Left Column, we have a problem.
    // Assumption: Left column (Contact/Skills) usually fits on Page 1.
    // If it doesn't, this simple strategy breaks.
    // For now, let's assume Left fits. We reset currentY to startY (140) and page to 1?
    // No, doc.setPage(1) would be needed.

    // BETTER APPROACH:
    // Since the layout is strictly 2-column, but left column is short (Contact/Skills),
    // and right column is long (Exp/Edu/Projects),
    // we can render Left Column, remember its max Y.
    // Then go back to Page 1, render Right Column.
    // If Right Column extends to Page 2, we ensure Sidebar Background is drawn on Page 2 (handled by checkPageBreak).

    // Go back to Page 1 for Right Column start
    this.doc.setPage(1);
    this.currentY = startY;

    this.drawSummary(data.personalInfo.profileSummary, rightX, rightColWidth);
    this.drawExperience(data.experience, rightX, rightColWidth);
    this.drawProjects(data.projects, rightX, rightColWidth);
    this.drawEducation(data.education, rightX, rightColWidth);

    this.doc.save('CV_Creative.pdf');
  }

  private drawContactInfo(info: CvForm['personalInfo'], x: number, width: number) {
    const titleHeight = 25;
    this.checkPageBreak(titleHeight);

    this.doc.setFont(this.FONT, 'bold');
    this.doc.setFontSize(10);
    this.doc.setTextColor(100, 116, 139);
    this.doc.text(this.transloco.translate('view.contact').toUpperCase(), x, this.currentY);
    this.currentY += 5;
    this.doc.setDrawColor(226, 232, 240);
    this.doc.setLineWidth(1);
    this.doc.line(x, this.currentY, x + width, this.currentY);
    this.currentY += 15;

    this.doc.setFont(this.FONT, 'normal');
    this.doc.setFontSize(10); // Match HTML text-sm
    this.doc.setTextColor(51, 65, 85);

    const items = [
      { icon: 'Email', text: info.email },
      { icon: 'Phone', text: info.phone },
      { icon: 'Location', text: info.location },
      { icon: 'LinkedIn', text: info.linkedin },
      { icon: 'Portfolio', text: info.web },
    ].filter((i) => i.text);

    items.forEach((item) => {
      this.checkPageBreak(15);
      this.doc.setFont(this.FONT, 'bold');
      this.doc.text(`${item.icon}:`, x, this.currentY);
      // Wrap text if needed
      const labelWidth = this.doc.getTextWidth(`${item.icon}: `);
      const textLines = this.doc.splitTextToSize(item.text as string, width - labelWidth);

      this.doc.setFont(this.FONT, 'normal');
      this.doc.text(textLines, x + labelWidth, this.currentY);

      this.currentY += textLines.length * 12 + 2;
    });
  }

  private drawSkills(skillGroup: CvForm['skills'][number], x: number, width: number) {
    if (!skillGroup) return;

    const titleHeight = 25;
    this.checkPageBreak(titleHeight);

    this.doc.setFont(this.FONT, 'bold');
    this.doc.setFontSize(10);
    this.doc.setTextColor(100, 116, 139);
    this.doc.text(this.transloco.translate('view.skills').toUpperCase(), x, this.currentY);
    this.currentY += 5;
    this.doc.setDrawColor(226, 232, 240);
    this.doc.line(x, this.currentY, x + width, this.currentY);
    this.currentY += 15;

    const drawPills = (skills: string[]) => {
      if (!skills?.length) return;

      this.doc.setFontSize(9);
      this.doc.setFont(this.FONT, 'bold'); // Medium font

      let cursorX = x;
      const gapX = 5;
      const gapY = 8;
      const paddingX = 6; // px-2
      const paddingY = 4; // py-1
      const lineHeight = 12;

      skills.forEach((skill) => {
        const textWidth = this.doc.getTextWidth(skill);
        const pillWidth = textWidth + paddingX * 2;
        const pillHeight = lineHeight + paddingY * 2;

        // Check horizontal fit
        if (cursorX + pillWidth > x + width) {
          cursorX = x;
          this.currentY += pillHeight + gapY;
        }

        // Check vertical fit (page break)
        this.checkPageBreak(pillHeight + gapY);

        // Draw Pill Background
        this.doc.setFillColor(240, 253, 250); // teal-50
        this.doc.setDrawColor(204, 251, 241); // teal-100
        this.doc.roundedRect(
          cursorX,
          this.currentY - lineHeight + 2,
          pillWidth,
          pillHeight,
          3,
          3,
          'FD',
        );

        // Draw Text
        this.doc.setTextColor(15, 118, 110); // teal-700
        this.doc.text(skill, cursorX + paddingX, this.currentY + paddingY);

        cursorX += pillWidth + gapX;
      });
      this.currentY += 25; // Space after category
    };

    drawPills(skillGroup.skills);
    drawPills(skillGroup.languages);
  }

  private drawSummary(summary: string | null, x: number, width: number) {
    if (!summary) return;

    this.checkPageBreak(40);

    this.doc.setFont(this.FONT, 'bold');
    this.doc.setFontSize(12);
    this.doc.setTextColor(15, 23, 42); // Slate 900

    // Border left design
    this.doc.setDrawColor(20, 184, 166); // Teal 500
    this.doc.setLineWidth(2);
    this.doc.line(x - 5, this.currentY - 10, x - 5, this.currentY + 2);

    this.doc.text(this.transloco.translate('view.resume'), x, this.currentY);
    this.currentY += 15;

    this.doc.setFont(this.FONT, 'normal');
    this.doc.setFontSize(10);
    this.doc.setTextColor(71, 85, 105);

    const lines = this.doc.splitTextToSize(summary, width);
    this.checkPageBreak(lines.length * 12);
    this.doc.text(lines, x, this.currentY);

    this.currentY += lines.length * 12 + 20;
  }

  private drawExperience(experience: CvForm['experience'], x: number, width: number) {
    if (!experience?.length) return;

    this.checkPageBreak(40);

    this.doc.setFont(this.FONT, 'bold');
    this.doc.setFontSize(12);
    this.doc.setTextColor(15, 23, 42);
    this.doc.setDrawColor(20, 184, 166);
    this.doc.setLineWidth(2);
    this.doc.line(x - 5, this.currentY - 10, x - 5, this.currentY + 2);

    this.doc.text(this.transloco.translate('view.experience'), x, this.currentY);
    this.currentY += 20;

    experience.forEach((exp) => {
      if (!exp.role) return;

      this.checkPageBreak(50);

      this.doc.setFont(this.FONT, 'bold');
      this.doc.setFontSize(10);
      this.doc.setTextColor(30, 41, 59);
      this.doc.text(exp.role, x, this.currentY);

      const date = [exp.dateIn, exp.dateFin].filter(Boolean).join(' - ');
      this.doc.setFont(this.FONT, 'normal');
      this.doc.setFontSize(9);
      this.doc.setTextColor(148, 163, 184);
      const dateWidth = this.doc.getTextWidth(date);
      this.doc.text(date, x + width - dateWidth, this.currentY);

      this.currentY += 12;

      this.doc.setTextColor(20, 184, 166);
      this.doc.text(exp.company!, x, this.currentY);
      this.currentY += 15;

      if (exp.bullets) {
        this.doc.setTextColor(71, 85, 105);
        const bullets = exp.bullets.split('\n').filter((b) => b.trim());
        bullets.forEach((b) => {
          const lines = this.doc.splitTextToSize(`• ${b}`, width);
          this.checkPageBreak(lines.length * 11);
          this.doc.text(lines, x + 5, this.currentY);
          this.currentY += lines.length * 11;
        });
      }
      this.currentY += 10;
    });

    this.currentY += 10;
  }

  private drawProjects(projects: CvForm['projects'], x: number, width: number) {
    if (!projects?.length) return;

    this.checkPageBreak(40);

    this.doc.setFont(this.FONT, 'bold');
    this.doc.setFontSize(12);
    this.doc.setTextColor(15, 23, 42);
    this.doc.setDrawColor(20, 184, 166);
    this.doc.setLineWidth(2);
    this.doc.line(x - 5, this.currentY - 10, x - 5, this.currentY + 2);

    this.doc.text(this.transloco.translate('view.projects'), x, this.currentY);
    this.currentY += 20;

    projects.forEach((proj) => {
      if (!proj.name) return;

      this.checkPageBreak(50);

      this.doc.setFont(this.FONT, 'bold');
      this.doc.setFontSize(10);
      this.doc.setTextColor(30, 41, 59);
      this.doc.text(proj.name, x, this.currentY);

      const date = [proj.dateIn, proj.dateFin].filter(Boolean).join(' - ');
      this.doc.setFont(this.FONT, 'normal');
      this.doc.setFontSize(9);
      this.doc.setTextColor(148, 163, 184);
      const dateWidth = this.doc.getTextWidth(date);
      this.doc.text(date, x + width - dateWidth, this.currentY);

      this.currentY += 12;

      this.doc.setTextColor(20, 184, 166);

      // Fix: Wrap subtitle text
      if (proj.subtitle) {
        const subLines = this.doc.splitTextToSize(proj.subtitle, width);
        this.doc.text(subLines, x, this.currentY);
        this.currentY += subLines.length * 12 + 3;
      } else {
        this.currentY += 15;
      }

      if (proj.bullets) {
        this.doc.setTextColor(71, 85, 105);
        const bullets = proj.bullets.split('\n').filter((b: string) => b.trim());
        bullets.forEach((b: string) => {
          const lines = this.doc.splitTextToSize(`• ${b}`, width);
          this.checkPageBreak(lines.length * 11);
          this.doc.text(lines, x + 5, this.currentY);
          this.currentY += lines.length * 11;
        });
      }
      this.currentY += 10;
    });

    this.currentY += 10;
  }

  private drawEducation(education: CvForm['education'], x: number, width: number) {
    if (!education?.length) return;

    this.checkPageBreak(40);

    this.doc.setFont(this.FONT, 'bold');
    this.doc.setFontSize(12);
    this.doc.setTextColor(15, 23, 42);
    this.doc.setDrawColor(20, 184, 166);
    this.doc.setLineWidth(2);
    this.doc.line(x - 5, this.currentY - 10, x - 5, this.currentY + 2);

    this.doc.text(this.transloco.translate('view.education'), x, this.currentY);
    this.currentY += 20;

    education.forEach((edu) => {
      if (!edu.title) return;

      this.checkPageBreak(40);

      this.doc.setFont(this.FONT, 'bold');
      this.doc.setFontSize(10);
      this.doc.setTextColor(30, 41, 59);
      this.doc.text(edu.title, x, this.currentY);

      const date = [edu.dateIn, edu.dateFin].filter(Boolean).join(' - ');
      this.doc.setFont(this.FONT, 'normal');
      this.doc.setFontSize(9);
      this.doc.setTextColor(148, 163, 184);
      const dateWidth = this.doc.getTextWidth(date);
      this.doc.text(date, x + width - dateWidth, this.currentY);

      this.currentY += 12;

      this.doc.setTextColor(20, 184, 166);
      this.doc.text(edu.institution!, x, this.currentY);
      this.currentY += 15;

      if (edu.bullets) {
        this.doc.setTextColor(71, 85, 105);
        const bullets = edu.bullets.split('\n').filter((b: string) => b.trim());
        bullets.forEach((b: string) => {
          const lines = this.doc.splitTextToSize(`• ${b}`, width);
          this.checkPageBreak(lines.length * 11);
          this.doc.text(lines, x + 5, this.currentY);
          this.currentY += lines.length * 11;
        });
      }
      this.currentY += 10;
    });
  }
}
