import { PDFDocument, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import fetch from 'node-fetch';

export default async function generatePDF(data) {
  // A4 size in points: 595.28 x 841.89
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const form = pdfDoc.getForm();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Load PNG image from external link (letterhead-style)
  const imageUrl = 'https://raw.githubusercontent.com/cybercoded/publication_projects/refs/heads/main/img_header.jpg';
  const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
  const embeddedImage = await pdfDoc.embedJpg(imageBytes);

  // Scale to page width minus margins
  const pageWidth = 595.28;
  const margin = 40;
  const targetWidth = pageWidth - 2 * margin;
  const scaled = embeddedImage.scaleToFit(targetWidth, 100); // 100pt height max

  // Draw image at top of page (letterhead style)
  page.drawImage(embeddedImage, {
    x: margin,
    y: page.getHeight() - scaled.height - 20, // 20pt from top
    width: scaled.width + 130,
    height: scaled.height,
  });

  // Position form content below image
  const contentStartY = page.getHeight() - scaled.height - 60;

  const { title, summary, author } = data;

  page.drawText('Title:', { x: 50, y: contentStartY, size: 12, font });
  page.drawText('Summary:', { x: 50, y: contentStartY - 50, size: 12, font });
  page.drawText('Author:', { x: 50, y: contentStartY - 100, size: 12, font });

  const titleField = form.createTextField('title');
  titleField.setText(title);
  titleField.addToPage(page, { x: 120, y: contentStartY - 10, width: 400, height: 20 });

  const summaryField = form.createTextField('summary');
  summaryField.setText(summary);
  summaryField.addToPage(page, { x: 120, y: contentStartY - 60, width: 400, height: 20 });

  const authorField = form.createTextField('author');
  authorField.setText(author);
  authorField.addToPage(page, { x: 120, y: contentStartY - 110, width: 400, height: 20 });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('report.pdf', pdfBytes);
}
