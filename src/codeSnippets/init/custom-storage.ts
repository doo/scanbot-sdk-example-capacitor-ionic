import { ScanbotSDK, SdkConfiguration } from 'capacitor-plugin-scanbot-sdk';

async function initialize() {
  try {
    const configuration = new SdkConfiguration({
      licenseKey: '<YOUR_LICENSE_KEY_HERE>',
      storageBaseDirectory: 'file:///some/custom/storage-dir/',
    });

    const result = await ScanbotSDK.initialize(configuration);
  } catch (error: any) {
    console.error(error);
  }
}
