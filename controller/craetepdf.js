import  PDFDocument from 'pdfkit';
export default function buildPDF (dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);
  
    doc.fontSize(20).text("<h1>fjgjkgj<h1>");
  
    doc
      .fontSize(12)
      .text(
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, saepe.`
      );
    doc.end();
  }
  