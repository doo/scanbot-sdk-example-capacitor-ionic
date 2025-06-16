import { ScanbotSDK, TiffGeneratorParameters } from 'capacitor-plugin-scanbot-sdk';

async function createDocumentTIFF() {
  try {
    /** Load a document from storage or create a new one */
    const document = await ScanbotSDK.Document.loadDocument({
      documentID: 'SOME_STORED_DOCUMENT_ID',
    });

    const tiffConfig = new TiffGeneratorParameters();
    tiffConfig.dpi = 300;
    /** Configure params as needed **/

    /** Create a TIFF file with the provided options */
    const tiffUriResult = await ScanbotSDK.Document.createTIFF({
      documentID: document.uuid,
      configuration: tiffConfig,
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
