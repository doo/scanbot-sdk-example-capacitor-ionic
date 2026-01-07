import {
  ScanbotDocument,
  ScanbotTiffGenerator,
  TiffGeneratorParameters,
} from 'capacitor-plugin-scanbot-sdk';

async function generateTiffFromDocument() {
  try {
    /** Load a document from storage or create a new one */
    const document = await ScanbotDocument.loadDocument('SOME_STORED_DOCUMENT_ID');

    const tiffConfig = new TiffGeneratorParameters();
    tiffConfig.dpi = 300;
    /** Configure params as needed **/

    /** Create a TIFF file with the provided options */
    const tiffUriResult = await ScanbotTiffGenerator.generateFromDocument({
      documentID: document.uuid,
      configuration: tiffConfig,
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
