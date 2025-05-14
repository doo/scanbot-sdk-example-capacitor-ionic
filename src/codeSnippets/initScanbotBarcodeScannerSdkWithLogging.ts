import { ScanbotSDK, ScanbotSdkConfiguration } from 'capacitor-plugin-scanbot-sdk';

async function initScanbotDocumentScannerSdkWithLogging() {
  const configiration: ScanbotSdkConfiguration = {
    licenseKey: '',
    loggingEnabled: true,
  };

  try {
    const initResult = await ScanbotSDK.initializeSDK(configiration);
    console.log(initResult);
  } catch (error: any) {
    console.error(error);
  }
}
