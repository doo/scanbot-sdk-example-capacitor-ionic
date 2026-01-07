import { CreateDocumentOptions, ScanbotDocument } from 'capacitor-plugin-scanbot-sdk';

async function createDocumentFromPdf(pdfUri: string) {
  /**
   * Create a document with an uuid
   * Extract images from the PDF file and add them as document pages
   */
  const document = await ScanbotDocument.createDocumentFromPdf({
    pdfFileUri: pdfUri,
    options: new CreateDocumentOptions({
      documentDetection: true,
      documentImageSizeLimit: 2000,
    }),
  });
}
