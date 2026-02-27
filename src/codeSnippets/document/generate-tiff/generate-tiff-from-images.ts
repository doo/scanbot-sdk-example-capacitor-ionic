import { ScanbotTiffGenerator, TiffGeneratorParameters } from 'capacitor-plugin-scanbot-sdk';
import { ImageUtils } from '../../../app/utils/image-utils';

async function generateTiffFromImages() {
  try {
    /**
     * Select an image from the Image Library
     * Return early if no image is selected or there is an issue with selecting an image
     **/
    const selectedImageResult = await new ImageUtils().selectImageFromLibrary();
    if (!selectedImageResult) {
      return;
    }

    const tiffGeneratorParameters = new TiffGeneratorParameters();
    tiffGeneratorParameters.dpi = 300;
    /** Configure params as needed **/

    /** Create a TIFF file with the provided options */
    const tiffCreationResult = await ScanbotTiffGenerator.generateFromImages({
      images: [selectedImageResult],
      tiffGeneratorParameters: tiffGeneratorParameters,
    });
    /** Handle the result */
  } catch (e: any) {}
}
