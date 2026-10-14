import {
  DocumentCustomUIComponent,
  DocumentCustomUIConfiguration,
  DocumentCustomUIResultCallbacks,
  DocumentDetectionResult,
  DocumentScannerConfiguration,
  ImageRef,
} from 'capacitor-plugin-scanbot-sdk';

async function createAndAttachScannerView(
  element: HTMLElement,
): Promise<DocumentCustomUIComponent> {
  const documentCustomUIComponent = new DocumentCustomUIComponent();

  const resultCallbacks: DocumentCustomUIResultCallbacks = {
    onSnappedDocumentResult: (
      originalImage: ImageRef,
      documentImage?: ImageRef,
      detectionResult?: DocumentDetectionResult,
    ) => {
      // Handle document detection result
    },
    onFrameDetectionResult: (frameDetectionStatus) => {
      // Handle frame detection result
    },
    onError: (error) => {
      //Handle errors during scanning
    },
  };

  const initialConfiguration: DocumentCustomUIConfiguration = {
    // Camera related configurations
    cameraConfiguration: {
      touchToFocusEnabled: true,
    },
    // Finder related configurations
    finderConfiguration: {
      viewFinderEnabled: true,
      finderLineColor: '#00CFA6CC',
      finderLineWidth: 2,
    },
    // AR Polygon Overlay related configurations
    polygonConfiguration: {
      polygonBackgroundColor: '#00CFA6CC',
      polygonBackgroundColorOK: '#FF0000A9',
      polygonColor: '#00CFA6CC',
      polygonColorOK: '#FF0000A9',
      polygonEnabled: true,
      polygonLineWidth: 4.0,
    },
    // Document Scanner configurations
    scannerConfiguration: new DocumentScannerConfiguration(),
  };

  documentCustomUIComponent.attachScannerOnElement(
    element,
    false,
    resultCallbacks,
    initialConfiguration,
  );

  return documentCustomUIComponent;
}
