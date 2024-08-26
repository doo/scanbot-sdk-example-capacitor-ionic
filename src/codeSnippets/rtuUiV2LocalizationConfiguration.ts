import { BarcodeScannerConfiguration } from 'capacitor-plugin-scanbot-sdk/dist/esm/ui_v2';

function rtuUiV2LocalizationConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // Configure localization parameters.
  config.localization.barcodeInfoMappingErrorStateCancelButton =
    'Custom Cancel title';
  config.localization.cameraPermissionCloseButton = 'Custom Close title';
  // Configure other strings as needed.

  // Configure other parameters as needed.
}
