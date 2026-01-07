import { ScanbotImageProcessor, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

async function readImageData(imageFileUri: string) {
  try {
    // Always make sure you have a valid license at runtime via ScanbotSDK.getLicenseInfo()
    if (!(await ScanbotSDK.getLicenseInfo()).isValid) {
      return;
    }

    // Returns the image data as a base64-encoded string
    return await ScanbotImageProcessor.readImageData(imageFileUri);
  } catch (error: any) {
    console.error(error);
    return;
  }
}
