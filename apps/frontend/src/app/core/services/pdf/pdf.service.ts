import { inject, Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { CvForm } from '@smartcv/types';
import { TranslocoService } from '@jsverse/transloco';

type ItemSectionKey = 'experience' | 'projects' | 'education';
type ItemType =
  | CvForm['experience'][number]
  | CvForm['projects'][number]
  | CvForm['education'][number];

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
  private readonly transloco = inject(TranslocoService);

  private readonly MARGIN = 40;
  private readonly FONT_SIZE_NORMAL = 10;
  private readonly FONT_SIZE_TITLE = 12;
  private readonly FONT_SIZE_HEADER = 18;
  private readonly LINE_HEIGHT_NORMAL = 12;
  private readonly SECTION_SPACING = 12;
  private readonly ITEM_SPACING = 15;
  private readonly BULLET_INDENT = 18;

  private doc!: jsPDF;
  private currentY = 0;
  private pageWidth = 0;
  private pageHeight = 0;
  private usableWidth = 0;

  private itemSectionsMap: ItemMap[] = [];

  private initializeSectionTitles(): void {
    this.itemSectionsMap = [
      {
        title: this.transloco.translate('view.experience'),
        dataKey: 'experience',
        subtitleKey: 'company',
        roleKey: 'role',
      },
      {
        title: this.transloco.translate('view.projects'),
        dataKey: 'projects',
        subtitleKey: 'subtitle',
        roleKey: 'name',
      },
      {
        title: this.transloco.translate('view.education'),
        dataKey: 'education',
        subtitleKey: 'institution',
        roleKey: 'title',
      },
    ];
  }

  public downloadPdf(data: CvForm): void {
    this.createAtsPdf(data);
  }

  private createAtsPdf(data: CvForm): void {
    this.initializeSectionTitles();

    this.doc = new jsPDF('p', 'pt', 'a4');
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.usableWidth = this.pageWidth - this.MARGIN * 2;
    this.currentY = this.MARGIN;

    this.doc.setFont('times', 'normal');
    this.doc.setFontSize(this.FONT_SIZE_NORMAL);

    this.drawPersonalInfo(data.personalInfo);
    this.drawProfileSummary(
      data.personalInfo.profileSummary,
      this.transloco.translate('view.resume'),
    );
    this.drawItemSections(data);
    this.drawSkillsSection(data.skills?.[0], this.transloco.translate('view.skills'));

    this.doc.save('CV_Optimizado_ATS.pdf');
  }

  private checkPageBreak(requiredHeight: number): void {
    if (this.currentY + requiredHeight > this.pageHeight - this.MARGIN - 20) {
      this.doc.addPage();
      this.currentY = this.MARGIN;
      this.doc.setFont('times', 'normal');
      this.doc.setFontSize(this.FONT_SIZE_NORMAL);
    }
  }

  private drawSectionTitle(title: string): void {
    this.checkPageBreak(this.SECTION_SPACING * 2);
    this.currentY += this.SECTION_SPACING;

    this.doc.setFontSize(this.FONT_SIZE_TITLE);
    this.doc.setFont('times', 'bold');
    this.doc.text(title.toUpperCase(), this.MARGIN, this.currentY);

    this.currentY += 2;
    this.doc.setDrawColor(209, 213, 219);
    this.doc.line(this.MARGIN, this.currentY, this.pageWidth - this.MARGIN, this.currentY);

    this.currentY += 16;
    this.doc.setFontSize(this.FONT_SIZE_NORMAL);
    this.doc.setFont('times', 'normal');
  }

  private drawPersonalInfo(info: CvForm['personalInfo']): void {
    const midPage = this.pageWidth / 2;

    if (info.name) {
      this.doc.setFontSize(this.FONT_SIZE_HEADER);
      this.doc.setFont('times', 'bold');
      this.doc.text(info.name.trim(), midPage, this.currentY, {
        align: 'center',
      });
      this.currentY += this.FONT_SIZE_HEADER + 1;
    }

    if (info.job) {
      this.doc.setFontSize(this.FONT_SIZE_TITLE);
      this.doc.setFont('times', 'italic');
      this.doc.text(info.job.trim(), midPage, this.currentY, {
        align: 'center',
      });
      this.currentY += this.FONT_SIZE_TITLE + 2;
    }

    const normalizeUrl = (url: string) =>
      url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

    const row1: { label: string }[] = [];
    if (info.email) row1.push({ label: info.email });
    if (info.phone) row1.push({ label: info.phone });
    if (info.location) row1.push({ label: info.location });

    const row2: { label: string; link: string }[] = [];
    if (info.linkedin) row2.push({ label: info.linkedin, link: normalizeUrl(info.linkedin) });
    if (info.web) row2.push({ label: info.web, link: normalizeUrl(info.web) });
    if (info.github) row2.push({ label: info.github, link: normalizeUrl(info.github) });

    const colCount = 3;
    const startY = this.currentY + 3;
    const rowGap = this.FONT_SIZE_NORMAL - 1;

    this.doc.setFontSize(this.FONT_SIZE_NORMAL);
    this.doc.setFont('times', 'normal');

    row1.forEach((item, col) => {
      const y = startY + 0 * rowGap;
      const xCenter =
        colCount > 0 ? (this.pageWidth / colCount) * col + this.pageWidth / colCount / 2 : 0;
      const textWidth = this.doc.getTextWidth(item.label);
      const xText = xCenter - textWidth / 2;
      this.doc.setTextColor(0, 0, 0);
      this.doc.text(item.label, xText, y);
    });

    row2.forEach((item, col) => {
      const y = startY + 1 * rowGap;
      const xCenter =
        colCount > 0 ? (this.pageWidth / colCount) * col + this.pageWidth / colCount / 2 : 0;
      const textWidth = this.doc.getTextWidth(item.label);
      const xText = xCenter - textWidth / 2;
      this.doc.setTextColor(40, 80, 160);
      this.doc.textWithLink(item.label, xText, y, { url: item.link });
    });

    this.doc.setTextColor(0, 0, 0);
    this.currentY = startY + 2 * rowGap + this.SECTION_SPACING - 4;
  }

  private drawProfileSummary(summary: string | null, title: string): void {
    if (!summary) return;

    this.drawSectionTitle(title);

    const lines = this.doc.splitTextToSize(summary, this.usableWidth) as string[];
    const requiredHeight = lines.length * this.LINE_HEIGHT_NORMAL;

    this.checkPageBreak(requiredHeight);

    this.doc.setFont('times', 'normal');
    this.doc.setFontSize(this.FONT_SIZE_NORMAL);
    this.doc.text(lines, this.MARGIN, this.currentY);

    this.currentY += requiredHeight + 4;
  }

  private drawItemSections(data: CvForm): void {
    this.itemSectionsMap.forEach((section) => {
      const items = data[section.dataKey] as ItemType[] | undefined;

      if (!items?.length) return;

      this.drawSectionTitle(section.title);

      items.forEach((item) => {
        const mainKey = section.roleKey as keyof ItemType;
        if (!item[mainKey]) return;

        const titleText = item[mainKey] as string;
        const dates = [item.dateIn, item.dateFin].filter(Boolean).join(' - ');

        this.doc.setFont('times', 'italic');
        const datesWidth = this.doc.getTextWidth(dates) + 5;

        const titleMaxWidth = this.usableWidth - datesWidth;

        this.doc.setFont('times', 'bold');
        const titleLines = this.doc.splitTextToSize(titleText, titleMaxWidth) as string[];

        const requiredHeight =
          Math.max(titleLines.length, 1) * this.LINE_HEIGHT_NORMAL + this.ITEM_SPACING;
        this.checkPageBreak(requiredHeight);

        this.doc.setFontSize(this.FONT_SIZE_NORMAL);
        this.doc.setFont('times', 'bold');

        this.doc.text(titleLines, this.MARGIN, this.currentY);

        this.doc.setFont('times', 'italic');
        this.doc.text(dates, this.pageWidth - this.MARGIN, this.currentY, {
          align: 'right',
        });

        this.currentY += titleLines.length * this.LINE_HEIGHT_NORMAL;

        const subKey = section.subtitleKey as keyof ItemType;
        if (item[subKey]) {
          this.doc.setFont('times', 'normal');
          const subtitleLines = this.doc.splitTextToSize(
            item[subKey] as string,
            this.usableWidth,
          ) as string[];
          this.checkPageBreak(subtitleLines.length * this.LINE_HEIGHT_NORMAL);
          this.doc.text(subtitleLines, this.MARGIN, this.currentY);
          this.currentY += subtitleLines.length * this.LINE_HEIGHT_NORMAL;
        } else {
          this.currentY += 2;
        }

        this.doc.setFont('times', 'normal');
        const bulletsContent = item.bullets as string | null | undefined;

        const bullets = (bulletsContent || '').split('\n').filter((b: string) => b.trim());
        const bulletUsableWidth = this.usableWidth - this.BULLET_INDENT;

        bullets.forEach((b: string) => {
          const bulletText = `• ${b
            .trim()
            .replace(/^[•–-]/, '')
            .trim()}`;
          const lines = this.doc.splitTextToSize(bulletText, bulletUsableWidth) as string[];

          this.checkPageBreak(lines.length * this.LINE_HEIGHT_NORMAL + 2);

          this.doc.text(lines, this.MARGIN + this.BULLET_INDENT, this.currentY);
          this.currentY += lines.length * this.LINE_HEIGHT_NORMAL + 2;
        });

        this.currentY += this.ITEM_SPACING;
      });

      this.currentY -= this.ITEM_SPACING;
      this.currentY += this.SECTION_SPACING;
    });
  }

  private drawSkillsSection(skillGroup: CvForm['skills'][number] | undefined, title: string): void {
    if (!skillGroup) return;

    this.drawSectionTitle(title);

    const printSkillCategory = (label: string, values?: string[]): void => {
      if (!values?.length) return;

      const labelText = label;
      const valuesText = values.join(' | ');

      this.doc.setFont('times', 'bold');
      const labelWidth = this.doc.getTextWidth(labelText);
      const spaceWidth = this.doc.getTextWidth(' ');

      const valuesX = this.MARGIN + labelWidth + spaceWidth;

      const valuesMaxWidth = this.pageWidth - this.MARGIN - valuesX;

      this.doc.setFont('times', 'normal');
      const valueLines = this.doc.splitTextToSize(valuesText, valuesMaxWidth) as string[];

      const requiredHeight = valueLines.length * this.LINE_HEIGHT_NORMAL;
      this.checkPageBreak(requiredHeight + 4);

      this.doc.setFont('times', 'bold');
      this.doc.text(labelText, this.MARGIN, this.currentY);

      this.doc.setFont('times', 'normal');
      valueLines.forEach((line: string, index: number) => {
        if (index > 0) {
          this.checkPageBreak(this.LINE_HEIGHT_NORMAL);
          this.currentY += this.LINE_HEIGHT_NORMAL;
        }
        this.doc.text(line, valuesX, this.currentY);
      });

      this.currentY += this.LINE_HEIGHT_NORMAL;
      this.currentY += 4;
    };

    if (skillGroup.skills?.length) {
      printSkillCategory(this.transloco.translate('view.tech'), skillGroup.skills);
    }
    if (skillGroup.languages?.length) {
      printSkillCategory(this.transloco.translate('view.languages'), skillGroup.languages);
    }
    if (skillGroup.certifications?.length) {
      const certs: string[] = skillGroup.certifications.map(
        (cert) => `${cert.name}${cert.date ? ` (${cert.date})` : ''}`,
      );
      printSkillCategory(this.transloco.translate('view.certifications'), certs);
    }
    if (skillGroup.additional?.length) {
      printSkillCategory(this.transloco.translate('view.additional'), skillGroup.additional);
    }
  }
}
