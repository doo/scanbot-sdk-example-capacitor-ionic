import { CreateDocumentOptions, ScanbotDocument } from 'capacitor-plugin-scanbot-sdk';

async function createDocumentFromPdf(pdfUri: string) {
  /**
   * Create a document with an uuid
   * Extract images from the PDF file and add them as document pages
   */
  const options = new CreateDocumentOptions();
  options.documentDetection = true;
  options.documentImageSizeLimit = 2000;

  const document = await ScanbotDocument.createDocumentFromPdf({
    pdfFileUri: pdfUri,
    options: options,
  });
}
