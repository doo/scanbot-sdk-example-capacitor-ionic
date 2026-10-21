import {
  AspectRatio,
  DocumentScanningFlow,
  NoButtonMode,
  PageSnapFunnelAnimation,
  ScanbotDocument,
} from 'capacitor-plugin-scanbot-sdk';

async function finderDocumentScanner() {
  const configuration = new DocumentScanningFlow();

  //Equivalent to topBarBackgroundColor: '#ffffff', using palete
  const palette = configuration.palette;
  palette.sbColorPrimary = '#ffffff';
  palette.sbColorOnPrimary = '#0027ff';
  // ..

  const cameraScreenConfiguration = configuration.screens.camera;

  const viewFinder = cameraScreenConfiguration.viewFinder;
  viewFinder.visible = true;
  viewFinder.aspectRatio = new AspectRatio({ width: 3, height: 4 });

  const toolbar = cameraScreenConfiguration.toolbar;
  toolbar.previewButton = new NoButtonMode({});
  toolbar.autoSnappingModeButton.visible = false;
  toolbar.importButton.visible = false;

  cameraScreenConfiguration.acknowledgement.acknowledgementMode = 'NONE';
  cameraScreenConfiguration.captureFeedback.snapFeedbackMode = new PageSnapFunnelAnimation();

  configuration.screens.review.enabled = false;
  configuration.outputSettings.pagesScanLimit = 1;

  const documentData = await ScanbotDocument.startScanner(configuration);
}
