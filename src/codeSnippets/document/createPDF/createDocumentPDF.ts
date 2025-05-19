import { PdfConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

async function createDocumentPDF() {
  try {
    /** Load a document from storage or create a new one */
    const document = await ScanbotSDK.Document.loadDocument('SOME_STORED_DOCUMENT_ID');

    const pdfConfiguration = new PdfConfiguration();
    pdfConfiguration.pageSize = 'A4';
    /** Configure params as needed **/

    /** Create a PDF file with the provided options */
    const pdfUriResult = await ScanbotSDK.Document.createPDF({
      documentID: document.uuid,
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
