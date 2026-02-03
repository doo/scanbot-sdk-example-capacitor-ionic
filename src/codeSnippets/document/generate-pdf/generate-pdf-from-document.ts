import {
  PdfConfiguration,
  ScanbotDocument,
  ScanbotPdfGenerator,
} from 'capacitor-plugin-scanbot-sdk';

async function generatePdfFromDocument() {
  try {
    /** Load a document from storage or create a new one */
    const document = await ScanbotDocument.loadDocument('SOME_STORED_DOCUMENT_ID');

    const pdfConfiguration = new PdfConfiguration();
    pdfConfiguration.pageSize = 'A4';
    /** Configure params as needed **/

    /** Create a PDF file with the provided options */
    const pdfUriResult = await ScanbotPdfGenerator.generateFromDocument({
      documentUuid: document.uuid,
      pdfConfiguration: pdfConfiguration,
      ocrConfiguration: {
        engineMode: 'SCANBOT_OCR',
      },
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
