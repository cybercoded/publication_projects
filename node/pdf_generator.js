// pdf_generator.js
import { PDFDocument, StandardFonts } from 'pdf-lib';
import fs from 'fs';

export default async function generatePDF(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const form = pdfDoc.getForm();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { title, summary, author } = data;

  page.drawText('Title:', { x: 50, y: 750, size: 12, font });
  page.drawText('Summary:', { x: 50, y: 700, size: 12, font });
  page.drawText('Author:', { x: 50, y: 650, size: 12, font });

  const titleField = form.createTextField('title');
  titleField.setText(title);
  titleField.addToPage(page, { x: 120, y: 740, width: 400, height: 20 });

  const summaryField = form.createTextField('summary');
  summaryField.setText(summary);
  summaryField.addToPage(page, { x: 120, y: 690, width: 400, height: 20 });

  const authorField = form.createTextField('author');
  authorField.setText(author);
  authorField.addToPage(page, { x: 120, y: 640, width: 400, height: 20 });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('report.pdf', pdfBytes);

  
}
