/**
 * SmartCV PDF Generator - Standalone (no Angular dependencies)
 * Supports Harvard (classic) and Creative (modern) templates
 * Uses jsPDF loaded via UMD bundle
 */

 
const SmartCvPdfGenerator = (() => {
    // =================== SHARED CONSTANTS ===================
    const MARGIN = 40;

    // =================== HARVARD TEMPLATE ===================
    function generateHarvardPdf(data, translations = {}) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const usableWidth = pageWidth - MARGIN * 2;
        let currentY = MARGIN;

        const FONT_SIZE_NORMAL = 10;
        const FONT_SIZE_TITLE = 12;
        const FONT_SIZE_HEADER = 18;
        const LINE_HEIGHT = 12;
        const SECTION_SPACING = 12;
        const ITEM_SPACING = 15;
        const BULLET_INDENT = 18;

        doc.setFont('times', 'normal');
        doc.setFontSize(FONT_SIZE_NORMAL);

        function checkPageBreak(h) {
            if (currentY + h > pageHeight - MARGIN - 20) {
                doc.addPage();
                currentY = MARGIN;
                doc.setFont('times', 'normal');
                doc.setFontSize(FONT_SIZE_NORMAL);
            }
        }

        function drawSectionTitle(title) {
            checkPageBreak(SECTION_SPACING * 2);
            currentY += SECTION_SPACING;
            doc.setFontSize(FONT_SIZE_TITLE);
            doc.setFont('times', 'bold');
            doc.text(title.toUpperCase(), MARGIN, currentY);
            currentY += 2;
            doc.setDrawColor(209, 213, 219);
            doc.line(MARGIN, currentY, pageWidth - MARGIN, currentY);
            currentY += 16;
            doc.setFontSize(FONT_SIZE_NORMAL);
            doc.setFont('times', 'normal');
        }

        // Personal Info
        const info = data.personalInfo || {};
        const midPage = pageWidth / 2;

        if (info.name) {
            doc.setFontSize(FONT_SIZE_HEADER);
            doc.setFont('times', 'bold');
            doc.text(info.name.trim(), midPage, currentY, { align: 'center' });
            currentY += FONT_SIZE_HEADER + 1;
        }

        if (info.job) {
            doc.setFontSize(FONT_SIZE_TITLE);
            doc.setFont('times', 'italic');
            doc.text(info.job.trim(), midPage, currentY, { align: 'center' });
            currentY += FONT_SIZE_TITLE + 2;
        }

        const normalizeUrl = (url) =>
            url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

        const row1 = [];
        if (info.email) row1.push({ label: info.email });
        if (info.phone) row1.push({ label: info.phone });
        if (info.location) row1.push({ label: info.location });

        const row2 = [];
        if (info.linkedin) row2.push({ label: info.linkedin, link: normalizeUrl(info.linkedin) });
        if (info.web) row2.push({ label: info.web, link: normalizeUrl(info.web) });
        if (info.github) row2.push({ label: info.github, link: normalizeUrl(info.github) });

        const colCount = 3;
        const startY = currentY + 3;
        const rowGap = FONT_SIZE_NORMAL - 1;

        doc.setFontSize(FONT_SIZE_NORMAL);
        doc.setFont('times', 'normal');

        row1.forEach((item, col) => {
            const y = startY;
            const xCenter = colCount > 0 ? (pageWidth / colCount) * col + pageWidth / colCount / 2 : 0;
            const tw = doc.getTextWidth(item.label);
            doc.setTextColor(0, 0, 0);
            doc.text(item.label, xCenter - tw / 2, y);
        });

        row2.forEach((item, col) => {
            const y = startY + rowGap;
            const xCenter = colCount > 0 ? (pageWidth / colCount) * col + pageWidth / colCount / 2 : 0;
            const tw = doc.getTextWidth(item.label);
            doc.setTextColor(40, 80, 160);
            doc.textWithLink(item.label, xCenter - tw / 2, y, { url: item.link });
        });

        doc.setTextColor(0, 0, 0);
        currentY = startY + 2 * rowGap + SECTION_SPACING - 4;

        // Profile Summary
        if (info.profileSummary) {
            drawSectionTitle((translations.summary || 'SUMMARY').toUpperCase());
            const lines = doc.splitTextToSize(info.profileSummary, usableWidth);
            checkPageBreak(lines.length * LINE_HEIGHT);
            doc.setFont('times', 'normal');
            doc.setFontSize(FONT_SIZE_NORMAL);
            doc.text(lines, MARGIN, currentY);
            currentY += lines.length * LINE_HEIGHT + 4;
        }

        // Item Sections (Experience, Projects, Education)
        const sections = [
            { title: (translations.experience || 'EXPERIENCE').toUpperCase(), dataKey: 'experience', subtitleKey: 'company', roleKey: 'role' },
            { title: (translations.projects || 'PROJECTS').toUpperCase(), dataKey: 'projects', subtitleKey: 'subtitle', roleKey: 'name' },
            { title: (translations.education || 'EDUCATION').toUpperCase(), dataKey: 'education', subtitleKey: 'institution', roleKey: 'title' },
        ];

        sections.forEach((section) => {
            const items = data[section.dataKey];
            if (!items || !items.length) return;

            drawSectionTitle(section.title);

            items.forEach((item) => {
                if (!item[section.roleKey]) return;

                const titleText = item[section.roleKey];
                const dates = [item.dateIn, item.dateFin].filter(Boolean).join(' - ');

                doc.setFont('times', 'italic');
                const datesWidth = doc.getTextWidth(dates) + 5;
                const titleMaxWidth = usableWidth - datesWidth;

                doc.setFont('times', 'bold');
                const titleLines = doc.splitTextToSize(titleText, titleMaxWidth);

                checkPageBreak(Math.max(titleLines.length, 1) * LINE_HEIGHT + ITEM_SPACING);

                doc.setFontSize(FONT_SIZE_NORMAL);
                doc.setFont('times', 'bold');
                doc.text(titleLines, MARGIN, currentY);

                doc.setFont('times', 'italic');
                doc.text(dates, pageWidth - MARGIN, currentY, { align: 'right' });
                currentY += titleLines.length * LINE_HEIGHT;

                if (item[section.subtitleKey]) {
                    doc.setFont('times', 'normal');
                    const subLines = doc.splitTextToSize(item[section.subtitleKey], usableWidth);
                    checkPageBreak(subLines.length * LINE_HEIGHT);
                    doc.text(subLines, MARGIN, currentY);
                    currentY += subLines.length * LINE_HEIGHT;
                } else {
                    currentY += 2;
                }

                doc.setFont('times', 'normal');
                const bulletsContent = item.bullets || '';
                const bullets = bulletsContent.split('\n').filter((b) => b.trim());
                const bulletUsableWidth = usableWidth - BULLET_INDENT;

                bullets.forEach((b) => {
                    const bulletText = `• ${b
                        .trim()
                        .replace(/^[•–-]/, '')
                        .trim()}`;
                    const lines = doc.splitTextToSize(bulletText, bulletUsableWidth);
                    checkPageBreak(lines.length * LINE_HEIGHT + 2);
                    doc.text(lines, MARGIN + BULLET_INDENT, currentY);
                    currentY += lines.length * LINE_HEIGHT + 2;
                });

                currentY += ITEM_SPACING;
            });

            currentY -= ITEM_SPACING;
            currentY += SECTION_SPACING;
        });

        // Skills
        const skillGroup = data.skills && data.skills[0];
        if (skillGroup) {
            drawSectionTitle((translations.skills || 'SKILLS').toUpperCase());

            function printSkillCategory(label, values) {
                if (!values || !values.length) return;
                const valuesText = values.join(' | ');
                doc.setFont('times', 'bold');
                const labelWidth = doc.getTextWidth(label);
                const spaceWidth = doc.getTextWidth(' ');
                const valuesX = MARGIN + labelWidth + spaceWidth;
                const valuesMaxWidth = pageWidth - MARGIN - valuesX;
                doc.setFont('times', 'normal');
                const valueLines = doc.splitTextToSize(valuesText, valuesMaxWidth);
                checkPageBreak(valueLines.length * LINE_HEIGHT + 4);
                doc.setFont('times', 'bold');
                doc.text(label, MARGIN, currentY);
                doc.setFont('times', 'normal');
                valueLines.forEach((line, index) => {
                    if (index > 0) {
                        checkPageBreak(LINE_HEIGHT);
                        currentY += LINE_HEIGHT;
                    }
                    doc.text(line, valuesX, currentY);
                });
                currentY += LINE_HEIGHT + 4;
            }

            if (skillGroup.skills && skillGroup.skills.length) {
                printSkillCategory(translations.techSkills || 'Technical Skills:', skillGroup.skills);
            }
            if (skillGroup.languages && skillGroup.languages.length) {
                printSkillCategory(translations.languages || 'Languages:', skillGroup.languages);
            }
            if (skillGroup.certifications && skillGroup.certifications.length) {
                const certs = skillGroup.certifications.map(
                    (c) => `${c.name}${c.date ? ` (${c.date})` : ''}`,
                );
                printSkillCategory(translations.certifications || 'Certifications:', certs);
            }
            if (skillGroup.additional && skillGroup.additional.length) {
                printSkillCategory(translations.additional || 'Additional:', skillGroup.additional);
            }
        }

        return doc;
    }

    // =================== CREATIVE TEMPLATE ===================
    function generateCreativePdf(data, translations = {}) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const FONT = 'helvetica';
        let currentY = MARGIN;

        function checkPageBreak(h) {
            if (currentY + h > pageHeight - MARGIN) {
                doc.addPage();
                currentY = MARGIN;
                doc.setFillColor(248, 250, 252);
                doc.rect(0, 0, pageWidth * 0.4, pageHeight, 'F');
                return true;
            }
            return false;
        }

        // Header Background
        doc.setFillColor(30, 41, 59);
        doc.rect(0, 0, pageWidth, 120, 'F');
        currentY = 40;

        // Name
        if (data.personalInfo.name) {
            doc.setFont(FONT, 'bold');
            doc.setFontSize(24);
            doc.setTextColor(255, 255, 255);
            doc.text(data.personalInfo.name.toUpperCase(), pageWidth / 2, currentY, { align: 'center' });
            currentY += 25;
        }

        // Job
        if (data.personalInfo.job) {
            doc.setFont(FONT, 'normal');
            doc.setFontSize(14);
            doc.setTextColor(203, 213, 225);
            doc.text(data.personalInfo.job, pageWidth / 2, currentY, { align: 'center' });
            currentY += 30;
        }

        // Decorative Line
        doc.setDrawColor(45, 212, 191);
        doc.setLineWidth(3);
        doc.line(pageWidth / 2 - 30, currentY, pageWidth / 2 + 30, currentY);

        currentY = 140;

        // Column Layout
        const usableW = pageWidth - MARGIN * 2;
        const leftColWidth = usableW * 0.35;
        const rightColWidth = usableW * 0.6;
        const colGap = usableW * 0.05;
        const leftX = MARGIN;
        const rightX = MARGIN + leftColWidth + colGap;

        // Left sidebar background
        doc.setFillColor(248, 250, 252);
        doc.rect(0, 120, pageWidth * 0.4, pageHeight - 120, 'F');

        const startY = currentY;

        // --- LEFT COLUMN ---
        currentY = startY;

        // Photo
        if (data.personalInfo.photo) {
            const photoSize = 80;
            const photoX = leftX + (leftColWidth - photoSize) / 2;
            try {
                doc.addImage(data.personalInfo.photo, photoX, currentY, photoSize, photoSize);
                doc.setDrawColor(255, 255, 255);
                doc.setLineWidth(3);
                doc.rect(photoX, currentY, photoSize, photoSize, 'S');
                doc.setDrawColor(20, 184, 166);
                doc.setLineWidth(1);
                doc.rect(photoX - 2, currentY - 2, photoSize + 4, photoSize + 4, 'S');
                currentY += photoSize + 25;
            } catch (e) {
                console.error('Error adding photo', e);
            }
        }

        // Contact Info
        doc.setFont(FONT, 'bold');
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text((translations.contact || 'CONTACT').toUpperCase(), leftX, currentY);
        currentY += 5;
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(1);
        doc.line(leftX, currentY, leftX + leftColWidth, currentY);
        currentY += 15;

        doc.setFont(FONT, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(51, 65, 85);

        const contactItems = [
            { icon: 'Email', text: data.personalInfo.email },
            { icon: 'Phone', text: data.personalInfo.phone },
            { icon: 'Location', text: data.personalInfo.location },
            { icon: 'LinkedIn', text: data.personalInfo.linkedin },
            { icon: 'Portfolio', text: data.personalInfo.web },
        ].filter((i) => i.text);

        contactItems.forEach((item) => {
            checkPageBreak(15);
            doc.setFont(FONT, 'bold');
            doc.text(`${item.icon}:`, leftX, currentY);
            const labelW = doc.getTextWidth(`${item.icon}: `);
            const textLines = doc.splitTextToSize(item.text, leftColWidth - labelW);
            doc.setFont(FONT, 'normal');
            doc.text(textLines, leftX + labelW, currentY);
            currentY += textLines.length * 12 + 2;
        });

        currentY += 20;

        // Skills (Left Column)
        const skillGrp = data.skills && data.skills[0];
        if (skillGrp) {
            doc.setFont(FONT, 'bold');
            doc.setFontSize(10);
            doc.setTextColor(100, 116, 139);
            doc.text((translations.skills || 'SKILLS').toUpperCase(), leftX, currentY);
            currentY += 5;
            doc.setDrawColor(226, 232, 240);
            doc.line(leftX, currentY, leftX + leftColWidth, currentY);
            currentY += 15;

            function drawPills(skills) {
                if (!skills || !skills.length) return;
                doc.setFontSize(9);
                doc.setFont(FONT, 'bold');
                let cursorX = leftX;
                const gapX = 5, gapY = 8, padX = 6, padY = 4, lineH = 12;

                skills.forEach((skill) => {
                    const tw = doc.getTextWidth(skill);
                    const pillW = tw + padX * 2;
                    const pillH = lineH + padY * 2;
                    if (cursorX + pillW > leftX + leftColWidth) {
                        cursorX = leftX;
                        currentY += pillH + gapY;
                    }
                    checkPageBreak(pillH + gapY);
                    doc.setFillColor(240, 253, 250);
                    doc.setDrawColor(204, 251, 241);
                    doc.roundedRect(cursorX, currentY - lineH + 2, pillW, pillH, 3, 3, 'FD');
                    doc.setTextColor(15, 118, 110);
                    doc.text(skill, cursorX + padX, currentY + padY);
                    cursorX += pillW + gapX;
                });
                currentY += 25;
            }

            drawPills(skillGrp.skills);
            drawPills(skillGrp.languages);
        }

        // --- RIGHT COLUMN ---
        doc.setPage(1);
        currentY = startY;

        // Summary
        if (data.personalInfo.profileSummary) {
            checkPageBreak(40);
            doc.setFont(FONT, 'bold');
            doc.setFontSize(12);
            doc.setTextColor(15, 23, 42);
            doc.setDrawColor(20, 184, 166);
            doc.setLineWidth(2);
            doc.line(rightX - 5, currentY - 10, rightX - 5, currentY + 2);
            doc.text((translations.summary || 'SUMMARY').toUpperCase(), rightX, currentY);
            currentY += 15;
            doc.setFont(FONT, 'normal');
            doc.setFontSize(10);
            doc.setTextColor(71, 85, 105);
            const lines = doc.splitTextToSize(data.personalInfo.profileSummary, rightColWidth);
            checkPageBreak(lines.length * 12);
            doc.text(lines, rightX, currentY);
            currentY += lines.length * 12 + 20;
        }

        // Right Column Sections
        function drawRightSection(title, items, roleKey, subtitleKey) {
            if (!items || !items.length) return;
            checkPageBreak(40);
            doc.setFont(FONT, 'bold');
            doc.setFontSize(12);
            doc.setTextColor(15, 23, 42);
            doc.setDrawColor(20, 184, 166);
            doc.setLineWidth(2);
            doc.line(rightX - 5, currentY - 10, rightX - 5, currentY + 2);
            doc.text(title, rightX, currentY);
            currentY += 20;

            items.forEach((item) => {
                if (!item[roleKey]) return;
                checkPageBreak(50);
                doc.setFont(FONT, 'bold');
                doc.setFontSize(10);
                doc.setTextColor(30, 41, 59);
                doc.text(item[roleKey], rightX, currentY);

                const date = [item.dateIn, item.dateFin].filter(Boolean).join(' - ');
                doc.setFont(FONT, 'normal');
                doc.setFontSize(9);
                doc.setTextColor(148, 163, 184);
                const dw = doc.getTextWidth(date);
                doc.text(date, rightX + rightColWidth - dw, currentY);
                currentY += 12;

                if (item[subtitleKey]) {
                    doc.setTextColor(20, 184, 166);
                    const subLines = doc.splitTextToSize(item[subtitleKey], rightColWidth);
                    doc.text(subLines, rightX, currentY);
                    currentY += subLines.length * 12 + 3;
                } else {
                    currentY += 15;
                }

                if (item.bullets) {
                    doc.setTextColor(71, 85, 105);
                    const bullets = item.bullets.split('\n').filter((b) => b.trim());
                    bullets.forEach((b) => {
                        const lines = doc.splitTextToSize(`• ${b}`, rightColWidth);
                        checkPageBreak(lines.length * 11);
                        doc.text(lines, rightX + 5, currentY);
                        currentY += lines.length * 11;
                    });
                }
                currentY += 10;
            });
            currentY += 10;
        }

        drawRightSection((translations.experience || 'EXPERIENCE').toUpperCase(), data.experience, 'role', 'company');
        drawRightSection((translations.projects || 'PROJECTS').toUpperCase(), data.projects, 'name', 'subtitle');
        drawRightSection((translations.education || 'EDUCATION').toUpperCase(), data.education, 'title', 'institution');

        return doc;
    }

    // =================== PUBLIC API ===================
    return {
        /**
         * Generate and download a PDF from CvForm data
         * @param {Object} data - CvForm object
         * @param {string} template - 'harvard' or 'creative'
         * @param {Object} translations - translated section titles
         */
        downloadPdf(data, template = 'harvard', translations = {}) {
            const doc =
                template === 'creative' ? generateCreativePdf(data, translations) : generateHarvardPdf(data, translations);

            const name = data.personalInfo?.name || 'CV';
            const templateLabel = template === 'creative' ? 'Creative' : 'Harvard';
            doc.save(`CV_${templateLabel}_${name.replace(/\s+/g, '_')}.pdf`);
        },

        /**
         * Generate PDF and return as blob (for preview or other uses)
         * @param {Object} data - CvForm object
         * @param {string} template - 'harvard' or 'creative'
         * @param {Object} translations - translated section titles
         * @returns {Blob}
         */
        generateBlob(data, template = 'harvard', translations = {}) {
            const doc =
                template === 'creative' ? generateCreativePdf(data, translations) : generateHarvardPdf(data, translations);
            return doc.output('blob');
        },
    };
})();
