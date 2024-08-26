import { BarcodeScannerConfiguration, startBarcodeScanner } from 'capacitor-plugin-scanbot-sdk/dist/esm/ui_v2';

async function statRtuUiV2WithDefaultConfiguration() {
    // Create the default configuration object.
    const config = new BarcodeScannerConfiguration();

    // See further customization configs...

    const result = await startBarcodeScanner(config);
}
