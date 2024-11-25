import {ScanbotSDK} from "capacitor-plugin-scanbot-sdk";

async function createDocumentFromPDF(pdfUri: string) {
  /**
   * Create a document with an uuid
   * Extract images from the PDF file and add them as document pages
   */
  const document = await ScanbotSDK.Document.createDocumentFromPDF({pdfUri});
}
