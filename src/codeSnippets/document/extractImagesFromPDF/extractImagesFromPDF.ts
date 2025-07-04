import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';
import { FileUtils } from '../../../app/utils/file-utils';

async function extractImagesFromPDF() {
  try {
    /**
     * Select a PDF file
     * Return early if no file is selected or there is an issue with selecting a file
     **/
    const fileUrl = await new FileUtils().selectPdfFile();
    if (!fileUrl) {
      return;
    }
    /**
     * Extract the images from the PDF with the desired configuration options
     * Check if the resulting Page Array is returned
     */
    const imagesResult = await ScanbotSDK.extractImagesFromPdf({
      pdfFilePath: fileUrl,
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
