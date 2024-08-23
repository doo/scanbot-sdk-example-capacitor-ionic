import { BarcodeScannerConfiguration } from 'capacitor-plugin-scanbot-sdk/dist/esm/ui_v2';

async function statRtuUiV2WithUserGuidanceConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // Hide/unhide the user guidance.
  config.userGuidance.visible = true;

  // Configure the title.
  config.userGuidance.title.text = 'Move the finder over a barcode';
  config.userGuidance.title.color = '#FFFFFF';

  // Configure the background.
  config.userGuidance.background.fillColor = '#0000007A';

  // Configure other parameters as needed.
}
