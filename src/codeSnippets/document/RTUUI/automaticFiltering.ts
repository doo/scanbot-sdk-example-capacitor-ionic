import { ScanbotBinarizationFilter } from 'capacitor-plugin-scanbot-sdk';
import { DocumentScanningFlow, startDocumentScanner } from 'capacitor-plugin-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Set any `ParametricFilter` type to default filter.*/
    configuration.outputSettings.defaultFilter = new ScanbotBinarizationFilter();
    /** Start the Document Scanner UI */
    const documentResult = await startDocumentScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
