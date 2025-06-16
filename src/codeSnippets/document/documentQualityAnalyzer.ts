import { DocumentQualityAnalyzerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';
import { ImageUtils } from '../../app/utils/image-utils';

async function documentQualityAnalyzer() {
  try {
    /**
     * Select an image from the Image Library
     * Return early if no image is selected or there is an issue with selecting an image
     **/
    const selectedImageResult = await new ImageUtils().selectImageFromLibrary();
    if (!selectedImageResult) {
      return;
    }

    const configiration = new DocumentQualityAnalyzerConfiguration();
    configiration.maxImageSize = 2100;
    /** Configure params as needed **/

    /** Detect the quality of the document on image **/
    const quality = await ScanbotSDK.documentQualityAnalyzer(selectedImageResult, configiration);
  } catch (e: any) {
    console.error(e.message);
  }
}
