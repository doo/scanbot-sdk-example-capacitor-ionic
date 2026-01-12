import {
  ModifyPageOptions,
  ScanbotBinarizationFilter,
  ScanbotDocument,
} from 'capacitor-plugin-scanbot-sdk';

async function applyFiltersAndRotateScannedPage() {
  try {
    /** Load a document from storage or create a new one */
    const document = await ScanbotDocument.loadDocument('SOME_STORED_DOCUMENT_ID');
    /** Get the first page of the document */
    const page = document.pages[0];
    /**
     * Apply ScanbotBinarizationFilter to the page
     * Rotate the page clockwise by 90 degrees
     */
    const documentResultWithModifiedPage = await ScanbotDocument.modifyPage({
      documentID: document.uuid,
      pageID: page.uuid,
      options: new ModifyPageOptions({
        filters: [new ScanbotBinarizationFilter()],
        rotation: 'CLOCKWISE_90',
      }),
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
