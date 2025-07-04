import {
  AspectRatio,
  FinderDocumentScannerConfiguration,
  ScanbotSDK,
} from 'capacitor-plugin-scanbot-sdk';

async function finderDocumentScanner() {
  const configuration: FinderDocumentScannerConfiguration = {
    topBarBackgroundColor: '#ffffff',
    finderAspectRatio: new AspectRatio({
      width: 3,
      height: 4,
    }),
    shutterButtonHidden: true,
  };

  const pageResult = await ScanbotSDK.startFinderDocumentScanner(configuration);
}
