import { ScanbotSDK, SdkConfiguration } from 'capacitor-plugin-scanbot-sdk';

async function initialize() {
  try {
    const configuration = new SdkConfiguration({
      licenseKey: '<YOUR_LICENSE_KEY_HERE>',
      loggingEnabled: true,
    });

    const initResult = await ScanbotSDK.initialize(configuration);
    console.log(initResult);
  } catch (error: any) {
    console.error(error);
  }
}
