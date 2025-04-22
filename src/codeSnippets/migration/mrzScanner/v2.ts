import { MrzScannerScreenConfiguration, startMRZScanner } from 'capacitor-plugin-scanbot-sdk/ui_v2';

async function mrzScanner() {
  const configiration = new MrzScannerScreenConfiguration();

  // Set a finder view guidance title
  configiration.finderViewUserGuidance.title.text = 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.';

  configiration.cameraConfiguration.orientationLockMode = 'PORTRAIT'
  
  // Configure other parameters as needed.

  const result = await startMRZScanner(configiration);
}
