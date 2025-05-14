import { PdfConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';
import { ImageUtils } from '../../../app/utils/image-utils';

async function createPDFFromImages() {
  try {
    /**
     * Select an image from the Image Library
     * Return early if no image is selected or there is an issue with selecting an image
     **/
    const selectedImageResult = await new ImageUtils().selectImageFromLibrary();
    if (!selectedImageResult) {
      return;
    }

    const pdfConfig = new PdfConfiguration();
    pdfConfig.pageSize = 'A4';
    pdfConfig.pageDirection = 'PORTRAIT';
    /** Configure params as needed **/

    /** Create a PDF file with the provided options */
    const pdfCreationResult = await ScanbotSDK.createPDF({
      imageFileUris: [selectedImageResult],
      pdfConfiguration: pdfConfig,
      ocrConfiguration: {
        engineMode: 'SCANBOT_OCR',
      },
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
