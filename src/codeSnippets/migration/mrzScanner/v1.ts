import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

async function mrzScanner() {
  const configuration: MrzScannerConfiguration = {
    // Customize colors, text resources, behavior, etc..
    finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
    orientationLockMode: 'PORTRAIT',
    // see further configs ...
  };

  const result = await ScanbotSDK.startMrzScanner(configuration);
}
