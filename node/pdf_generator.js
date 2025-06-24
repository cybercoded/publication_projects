import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import fetch from 'node-fetch'; // Required for Node.js

export default async function generatePDF(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const form = pdfDoc.getForm();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Fetch and embed the image
  const imageUrl = 'https://images.unsplash.com/photo-1581091012184-d8b07bff4d79?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
  const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
  const embeddedImage = await pdfDoc.embedJpg(imageBytes);
  const scaledImage = embeddedImage.scale(0.25);

  // Draw the image at the top of the page
  page.drawImage(embeddedImage, {
    x: 150,
    y: 750,
    width: scaledImage.width,
    height: scaledImage.height,
  });

  // Adjust content placement below image
  const baseY = 700 - scaledImage.height;

  const { title, summary, author } = data;

  page.drawText('Title:', { x: 50, y: baseY, size: 12, font });
  page.drawText('Summary:', { x: 50, y: baseY - 50, size: 12, font });
  page.drawText('Author:', { x: 50, y: baseY - 100, size: 12, font });

  const titleField = form.createTextField('title');
  titleField.setText(title);
  titleField.addToPage(page, { x: 120, y: baseY - 10, width: 400, height: 20 });

  const summaryField = form.createTextField('summary');
  summaryField.setText(summary);
  summaryField.addToPage(page, { x: 120, y: baseY - 60, width: 400, height: 20 });

  const authorField = form.createTextField('author');
  authorField.setText(author);
  authorField.addToPage(page, { x: 120, y: baseY - 110, width: 400, height: 20 });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('report.pdf', pdfBytes);
}
