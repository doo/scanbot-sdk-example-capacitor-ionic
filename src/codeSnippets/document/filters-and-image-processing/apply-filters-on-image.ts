import { ScanbotBinarizationFilter, ScanbotImageProcessor } from 'capacitor-plugin-scanbot-sdk';
import { ImageUtils } from '../../../app/utils/image-utils';

async function applyFiltersOnImages() {
  try {
    /**
     * Select an image from the Image Library
     * Return early if no image is selected or there is an issue with selecting an image
     **/
    const selectedImageResult = await new ImageUtils().selectImageFromLibrary();
    if (!selectedImageResult) {
      return;
    }
    /** Apply ScanbotBinarizationFilter to the image */
    const imageWithFilters = await ScanbotImageProcessor.applyFiltersOnImageFile({
      imageFileUri: selectedImageResult,
      filters: [new ScanbotBinarizationFilter()],
    });
    /** Rotate the page counterclockwise by 90 degrees */
    const rotatedImage = await ScanbotImageProcessor.rotateImageFile({
      imageFileUri: imageWithFilters,
      rotation: 'COUNTERCLOCKWISE_90',
    });
  } catch (e: any) {
    console.error(e.message);
  }
}
