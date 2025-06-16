import { ScanbotSDK, TiffGeneratorParameters } from 'capacitor-plugin-scanbot-sdk';
import { ImageUtils } from '../../../app/utils/image-utils';

async function createTIFFFromImages() {
  try {
    /**
     * Select an image from the Image Library
     * Return early if no image is selected or there is an issue with selecting an image
     **/
    const selectedImageResult = await new ImageUtils().selectImageFromLibrary();
    if (!selectedImageResult) {
      return;
    }

    const tiffConfig = new TiffGeneratorParameters();
    tiffConfig.dpi = 300;
    /** Configure params as needed **/

    /** Create a TIFF file with the provided options */
    const tiffCreationResult = await ScanbotSDK.writeTIFF({
      imageFileUris: [selectedImageResult],
      configuration: tiffConfig,
    });
    /** Handle the result */
  } catch (e: any) {}
}
